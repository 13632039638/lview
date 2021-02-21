import tpl from './index.tpl'
import './index.scss'
import $ from 'jquery'

import { tplReplace } from '../../utils/tools'

export default() => {
    let record = [{
        time: '2020年05月08日',
        num: 2,
        hg: 62,
        main: [{
            title: '上证指数',
            code: '000001',
            active: '猜涨',
            status: 'SZ'
        },{
            title: '宁德时代',
            code: '600048',
            active: '猜跌',
            status: 'SH'
        }]
    },
    {
        time: '2020年05月08日',
        num: 2,
        hg: 62,
        main: [{
            title: '上证指数',
            code: '000001',
            active: '猜涨',
            status: 'SZ'
        },{
            title: '宁德时代',
            code: '600048',
            active: '猜跌',
            status: 'SH'
        }]
    }];
    return {
        name: 'collapse',
        
        tpl() {
            let list = '';
            record.forEach( ( item, index ) => {
                list += tplReplace( tpl, {
                    time: item.time,
                    num: item.num,
                    index: index,
                    hg: item.hg,
                })
            })
            return list;
        },

        bindEvent() {
            const fold = document.querySelector('.container ');
            fold.addEventListener('click', this.open.bind( this ), false );
        },

        open( ev ) {
            
            let tag = ev.target,
                fold_hg = document.getElementById(`fold_${tag.id}`),
                vm = document.getElementById(`main_${tag.id}`);
            
            if ( fold_hg == null || vm == null ) return;

            if ( fold_hg.offsetHeight == 64 ) {
                fold_hg.style.height = vm.offsetHeight + tag.offsetHeight + 'px';
            } else {
                fold_hg.style.height = 64 + 'px';
            }
        }

    }
}