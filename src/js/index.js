import $ from 'jquery'

import '../style/style.scss'

import collapse from '../view/Collapse/index'

;( ($) => {

    const $app = $('#root'),
            $container = $('<div class="container pt-6">');
    
    const fold = collapse();

    function init() {
        render();
        bindEvent();
    }

    function render() {
        $container.append( fold.tpl() );

        $app.append( $container );
    }

    function bindEvent() {
        fold.bindEvent();
    }

    init();

})($)