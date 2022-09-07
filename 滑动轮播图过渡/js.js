
window.onload = function(){
    // 获取元素
    var container = document.querySelector('.container');
    var leftBox = document.querySelector('.arrow a:first-child');
    var rightBox = document.querySelector('.arrow a:last-child');

    // 需求1：鼠标经过大盒子，展示左右的按钮
    container.onmouseenter = function (){
        leftBox.style.display = 'block';
        rightBox.style.display = 'block';

        // 鼠标移入清除定时任务
        // clearInterval(timer);
    }
    container.onmouseleave = function (){
        leftBox.style.display = 'none'
        rightBox.style.display = 'none'

        // clearInterval(timer);
        // timer = setInterval( rightBox.onclick,1500)
    }

    // 需求2：点击下标小圆点，滑动图片
    var olLis = document.querySelectorAll('ol li');
    var ulBox = document.querySelector('ul');
    // 设置一张图片移动的距离
    var imgWidth = ulBox.children[0].offsetWidth;
    // 自定义ul的宽度
    ulBox.style.width = ulBox.children.length * imgWidth +'px';

    // 设置单张图片展示
    ulBox.style.left = -imgWidth + 'px' ;
    
    olLis.forEach(function(el,index){
        el.onclick = function(){

            paita(index);
            // olLis.forEach(function(ev,i){
            //     ev.removeAttribute('class');
            // })
            // this.className = 'active';
            // 移动的是ul 的长度
            // ulBox.style.left = -imgWidth + 'px';

            // 通过js方式添加过渡效果,目的是避免在css中首页造成不好的滑动效果
            // ulBox.style.transition = 'left 0.3S ease-in'
            // ulBox.style.left = -imgWidth *(index+1) + 'px';
            move(index)
            count = index;
            
        }
    })
    // 封装排他
    function paita(n){
           // 小圆点的排他
        olLis.forEach(function(item){
            item.removeAttribute('class');
        })
        olLis[n].className = 'active';
    }
    // 封装过渡和移动效果
    function move(n){
        ulBox.style.transition = 'left 0.3S ease-in'
        ulBox.style.left = -imgWidth *(n+1) + 'px';
    }

    // 需求3：左右按钮触发滑动
    var count = 0;
    var flag = true;
    rightBox.onclick = function(){
        if(flag){
            flag =false;

            count++ ;
            // 小圆点的排他
            // paita(count);
              // ulBox.style.transition = 'left 0.3S ease-in'
                // ulBox.style.left = -imgWidth *(index+1) + 'px';
            move(count);
            console.log(count);    
            // 判断：如果大于图片长度，切换至第一张
            if(count >= ulBox.children.length - 2) return paita(0);
                paita(count);
            
        }
    }

    leftBox.onclick = function(){
        count-- ;
        if(flag){
            flag = false;
            move(count);
            // 小圆点的排他
            if(count < 0) return paita(5);
            paita(count);
        }    
    }
    // 监听最后一张跳转
    var lastIndex = ulBox.children.length -2;
    ulBox.ontransitionend = function () {
        if (count < 0) {
            // 已经去往复制的最后一张了
            ulBox.style.transition = 'none';
            ulBox.style.left = -imgWidth * lastIndex + 'px';
            count = lastIndex - 1;
        } else if (count >= lastIndex) {
            // 已经去往复制的第一张了
            ulBox.style.transition = 'none';
            ulBox.style.left = -imgWidth + 'px';
            count = 0;
        }
        flag = true;
    }


    // 需求4:  自动轮播

    // var timer = setInterval( rightBox.onclick,1500);

    // var timer = setInterval(function(){
    //     rightBox.onclick();
    // },1500)
    

    // 设置节流阀，处理因点击过快到时图片无法显示问题
    // 在切换图片的时候，使用回调函数，当钱图片播放完毕后，才进行下一章

}