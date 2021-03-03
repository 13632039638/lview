import $ from 'jquery'
import '../style/style.scss'
import drag from '../view/drag/index.js'

;( ($) => {
    
    const $app = $('#root'),
            $container = $('<div class="container">'),
            bfdrag = drag();
    

    function init() {
        render();
        bindEvent();
    }

    function render() {
        $container.append('<div class="head d-flex jc-center text-white bg-blue">自选列表</div>')
        $container.append( bfdrag.tpl() )
        $app.append( $container );
    }

    function bindEvent() {
        bfdrag.bindEvent( empty );
    }

    function empty() {
        $app.html('');
        $container.html('');
        render();
    }

    init();

})($)