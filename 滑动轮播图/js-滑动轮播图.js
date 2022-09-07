
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
        clearInterval(timer);
    }
    container.onmouseleave = function (){
        leftBox.style.display = 'none'
        rightBox.style.display = 'none'

        clearInterval(timer);
        timer = setInterval( rightBox.onclick,1500)
    }

    // 需求2：点击下标小圆点，滑动图片
    var olLis = document.querySelectorAll('ol li');
    var ulBox = document.querySelector('ul');
    // 设置一张图片移动的距离
    var imgWidth = ulBox.children[0].offsetWidth;
    // 设置单张图片展示
    ulBox.style.left = -imgWidth + 'px' ;
    // 自定义ul的宽度
    ulBox.style.width = ulBox.children.length * imgWidth;

    olLis.forEach(function(item,index){
        item.onclick = function(){

            paita(index);
            // olLis.forEach(function(ev,i){
            //     ev.removeAttribute('class');

            // })
            // this.className = 'active';
            // 移动的是ul 的长度
            // ulBox.style.left = -imgWidth + 'px';
            // ulBox.style.left = -imgWidth *(index+1) + 'px';
            // 引入封装好的动画，来设置移动的距离
            animate(ulBox,{left:-imgWidth *(index+1)})
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
    

    // 需求3：左右按钮触发滑动
    var count = 0;
    var flag = true;
    rightBox.onclick = function(){
        if(flag){
            flag =false;

            count++ ;
            console.log(120);
            // 小圆点的排他
            // paita(count);
            // 判断：如果大于图片长度，切换至第一张
            if(count >=ulBox.children.length-2 ){
                
                animate(ulBox,{left:-imgWidth *(count+1)},function(){
                    // 最后一张播放完毕之后立马跳转到第一张的位置(其实是第2张)
                    ulBox.style.left = -imgWidth +'px';
                    count =0;
                    flag = true;
                })
                paita(0);
            }else {
                animate(ulBox,{left:-imgWidth *(count+1)},function(){
                    flag = true;
                })
                paita(count);
                
            }
        }
    }

    leftBox.onclick = function(){
        count-- ;
        if(flag){
            flag = false;
            // 小圆点的排他
            if(count < 0){
                animate(ulBox,{left: - imgWidth*(count+1)},function(){
                    var lastIndex = ulBox.children.length-2;
                    ulBox.style.left = -imgWidth * lastIndex +'px';
                    count = lastIndex -1;
                    flag = true;
                })
                paita(5);
            }else{
                animate(ulBox,{left:-imgWidth*(count +1)},function(){
                    flag = true;
                });
                paita(count);
            }
        }
    }

    // 需求4:  自动轮播

    var timer = setInterval( rightBox.onclick,1500)

    // var timer = setInterval(function(){
    //     rightBox.onclick();
    // },1500)
    

    // 设置节流阀，处理因点击过快到时图片无法显示问题
    // 在切换图片的时候，使用回调函数，当钱图片播放完毕后，才进行下一章

}