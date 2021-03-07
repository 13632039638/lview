import tpl from './drag.tpl'
import './drag.scss'
import $ from 'jquery'

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
        eletop = 0,
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
            drag.addEventListener( 'click', this.Change.bind(this, fn), false );
        },

        touchMove( ev ) {
            let tag = ev.target,
                start = ev.changedTouches[0].clientY - ev.target.offsetHeight,          // 滑动的高度减去盒子的高度
                tophg = document.getElementsByClassName('head')[0].offsetHeight,        // 顶部导航的高度
                Index = Math.floor( (ev.changedTouches[0].clientY - tophg) / ev.target.offsetHeight ),          // 滑动的距离 - 顶部高度 / 盒子高度 = 当前下标
                Afterhg = document.getElementById(`hg_${Index}`);                       // 当前鼠标经过的盒子

            // 如果触发了滑动 则能触发结束事件
            isflag = true;
            // 存储拖拽的盒子下标
            idx = tag.id;      
            // 存储鼠标经过的盒子的下标
            dragIndex = Index < 0 ? 0 : Index;
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
            // isflag 为假的话 直接退出
            if ( !isflag ) return;
            console.log( '去时候进行', dragIndex );

            let data = _obj[idx];
            _obj.splice( idx, 1 );
            _obj.splice( dragIndex, 0, data );
            // 执行父组件的事件  重新渲染列表
            arguments[0]();
            isflag = false;
        },

        defaluthg() {
            for( let i = 0; i < _obj.length; i++ ) {
                let era = document.getElementById(`hg_${i}`);
                era.style.height = 0;
            }
        },

        Change() {

            arguments[1].preventDefault();
            const Index = arguments[1].target.id,
                    elehg = $(`.lg_${Index}`).height();

            if ( Index == '' ) return;

            for( let i = 0; i < Index; i++) {
                eletop += elehg;
                $(`.lg_${i}`).css({ "transition": "all .3s", "transform": `translateY(${elehg}px)` });
            }

            $(`.lg_${Index}`).css({ "transition": 'all .3s', "transform": `translateY(-${eletop}px)` });

            let data = _obj[Index];
            setTimeout( _ => {
                _obj.splice( Index, 1 );
                _obj.unshift( data );
                eletop = 0;
                arguments[0]();
            },500);

        }

    }
}