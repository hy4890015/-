

$(function(){
    var timer = null;
    var flag = true;

    //  1. 小圆点切换
    $('ol li').click(function(){
        tabs($(this).index());

        // 统一索引
        count = $(this).index();
    })


    //tabs
    function tabs(n){
        $('ol li').eq(n).addClass('current')
            .siblings().removeClass('current');

        // 切换图片 
        console.log(100);
        $('ul li').eq(n).fadeIn(1000,function(){
            flag = true;
        }).siblings().fadeOut(1000);

    }

    // 2. 左右按钮显示
    $('.container').hover(function(){
        $('.arrow a').show();

        // 清除定时任务
        clearInterval(timer);
    },function(){
        $('.arrow a').hide();

        // 鼠标移除继续执行定时器
        clearInterval(timer);
        timer = setInterval(function () {
            $('.arrow a').last().click();
        }, 1500)
    })
        
    // 3. 左右按钮的点击切换
    var count = 0;
    $('.arrow a').first().click(function(){
        count--;
        if(count < 0) count = $('ol li').length -1;
        tabs(count);
    })
    $('.arrow a').last().click(function(){
        if(flag){
            flag =false;
            count++;
            if(count > $('ol li').length -1) count = 0;
            tabs(count);
        }
    })

    // 4.自动轮播
    timer = setInterval(function () {
        $('.arrow a').last().click();
    }, 1500)




})



