<div class="mx-4 my-4 fold bg-white" id="fold_{{index}}" >      
    <!-- 时间标题 -->
    <div class="fold-main d-flex jc-between ai-center mx-5" id="{{index}}">
        <span class="fold-main--title fs-lg text-grey-0">{{ time }}</span>
        <div class="fold-main--info" @click="ObtainHg(index)">
            <span class="fs-lg text-grey-0 mr-1">{{ num }}支</span>
        </div>
    </div>
    <!-- 时间标题 -->

    <div class="quiz mx-5 pb-5" id="main_{{index}}">
    　　<div>1、沉着、勇猛，有辨别，不自私。</div>
        <div>2、凡事总须研究，才会明白。</div>
    </div>
</div>