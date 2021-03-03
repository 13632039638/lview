import tpl from './drag.tpl'
import './drag.scss'

import { tplReplace } from '../../utils/tools'

export default _ => {
    let _obj = [
        {
            id: 34,
            title: '贵州茅台'
        },
        {
            id: 35,
            title: '五粮液'
        },
        {
            id: 36,
            title: '山西汾酒'
        },
        {
            id: 37,
            title: '剑南春'
        }
    ];
    let dragIndex = -1,
        idx = -1,
        isflag = false;
    return {
        name: 'drag',
        tpl() {
            let list = '';
            _obj.forEach( ( item, index ) => {
                list += tplReplace( tpl, {
                    id: item.id,
                    title: item.title,
                    index
                })
            })
            
            return list;
        },

        bindEvent( fn ) {
            const drag = document.querySelector('.container ');
            drag.addEventListener( 'touchmove', this.touchMove.bind(this), false );
            drag.addEventListener( 'touchend', this.touchEnd.bind(this, fn ), false );
            // drag.addEventListener( 'click', this.Change.bind(this), false );
        },

        touchMove( ev ) {
            let tag = ev.target,
                start = ev.changedTouches[0].clientY - ev.target.offsetHeight,          // 滑动的高度减去盒子的高度
                tophg = document.getElementsByClassName('head')[0].offsetHeight,        // 顶部导航的高度
                Index = Math.floor( (ev.changedTouches[0].clientY - tophg) / ev.target.offsetHeight ),          // 滑动的距离 - 顶部高度 / 盒子高度 = 当前下标
                Afterhg = document.getElementById(`hg_${Index}`);                       // 当前鼠标经过的盒子

            // 存储拖拽的盒子下标
            idx = tag.id;      
            // 存储鼠标经过的盒子的下标
            dragIndex = Index;
            // 先吧折叠的盒子高度初始化
            this.defaluthg();

            if ( Afterhg == null ) return

            // 拖拽经过列表时 将对应的折叠高度展开
            Afterhg.style.height = ev.target.offsetHeight + 'px';
            
            tag.style.position = 'absolute';
            tag.style.top = `${start}px`;
            tag.style.left = '0px'
            tag.style.right = '0px'
        },

        touchEnd( ev ) {
            let data = _obj[idx];
            _obj.splice( idx, 1 );
            _obj.splice( dragIndex, 0, data );
            // 执行父组件的事件  重新渲染列表
            arguments[0]();
        },

        defaluthg() {
            for( let i = 0; i < _obj.length; i++ ) {
                let era = document.getElementById(`hg_${i}`);
                era.style.height = 0;
            }
        },

        Change() {
            console.log( '冲突' );
        }

    }
}