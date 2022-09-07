 
 
 
window.onload = function(){
    // 获取元素
    var box = document.querySelector('.box');
    var ulEl = document.querySelector('ul');
    var ulli = document.querySelectorAll('ul li');

    var olEl = document.querySelector('ol');
    var olli = document.querySelectorAll('ol li');

    var leftbox = document.querySelector('p a:first-child');
    var rightbox = document.querySelector('p a:last-child');
    
    // 需求1：鼠标经过大盒子，展示左右的按钮
    box.onmouseenter = function (){
        leftbox.style.display = 'block';
        rightbox.style.display = 'block';

        clearInterval(timer);

    }
    box.onmouseleave = function(){
        leftbox.style.display = 'none';
        rightbox.style.display = 'none';

        // 优化问题：鼠标离开自动播放
        clearInterval(timer);
        timer = setInterval(function(){
            rightbox.onclick();
        },1500)
    }

    // 需求2：点击下标小圆点，滑动图片
    olli.forEach(function(item,index){
        item.onclick = function(){
            console.log(item);
            // 排他 
            changeImg(index);  

            // 优化问题1：统一索引
            // 解决当点击小圆点后，在点击左右箭头导致图片不统一问题
             count = index;   
        }
    })
    

    // 需求3：左右按钮触发滑动
    var count = 0;
    var flag = true;
    rightbox.onclick = function (){
        // if(flag){
            // flag = false;
            count++ ;
            if(count >= ulli.length) count =0;
    
            changeImg(count);
        // }
       
    }
    leftbox.onclick = function (){
        count-- ;
        console.log(count);
        if(count <= 0) count = ulli.length-1;

        changeImg(count);
    }

    //封装排他
    function changeImg(n){
        olli.forEach(function(ev,i){
            ev.removeAttribute('class');
            ulli[i].style.opacity = 0;
        })
        olli[n].className = 'active';
        ulli[n].style.opacity = 1;
    }

    // 需求4:  自动轮播
    // 优化自动播放
    // var timer = setInterval(rightbox.onclick,1500)
    var timer = setInterval(function(){
        // 自动触发右按钮
        rightbox.onclick();
    },1500)
        
    // 优化：开启节流阀：
    // 如果使用了transition进行过渡的话，需要监听transition
    // 对左右箭头进行优化：
    // ulli.forEach(function(el){
    //     el.ontransitionend = function (){
    //         console.log('执行结束');
    //         flag = true;
    //     }
    // })

}




