
'use strict';
window.onload = function(){
	search();
	secondkill();
};
// 头部搜索
function search(){
	var search = document.querySelector('.jd_header_box');
	var banner = document.querySelector('.jd_banner');
	var h = banner.offsetHeight;
	window.onscroll = function(){
		var t = document.body.scrollTop;
		if (t > h) {
			search.style.background = "rgba(201,21,35,0.85)";
		} else{
			var op = t/h * 0.85;
			search.style.background = "rgba(201,21,35,"+op+"";
		};
	}
}
// 秒杀
function secondkill(){
	var skTime = document.querySelector('.sk_time');
	var timeList = skTime.getElementsByClassName('num');
	var times = 5 * 60 * 60;
	setInterval(function(){
		times --;
		var h = Math.floor(times / 60 / 60);
		var m = Math.floor(times / 60 % 60);
		var s = times % 60;

		timeList[0].innerHTML = h > 10 ? Math.floor(h / 10) : 0;
		timeList[1].innerHTML = h % 10;

		timeList[2].innerHTML = m > 10 ? Math.floor(m / 10) : 0;
		timeList[3].innerHTML = m % 10;

		timeList[4].innerHTML = s > 10 ? Math.floor(s / 10) : 0;
		timeList[5].innerHTML = s % 10;
	},1000);
}
//图片轮播
(function(w){
    //轮播图盒子
    var parent = document.getElementsByClassName('jd_banner')[0];
    //图片盒子
    var banner = document.getElementsByClassName('jd_banner_image'),
        banner = banner.length?banner[0]:undefined;
    //点盒子
    var point = document.getElementsByClassName('jd_banner_point'),
        point = point.length?point[0]:undefined;

    if( !banner || !point) return false;

    /*常用变量*/
    var width = parent.offsetWidth,
        transitionStr = 'all .3s linear 0s',
        manTransitionStr = 'all .5s linear 0s',
        noTransitionStr = 'all 0s linear 0s',
        timer = 0,
        index = 1,
        startX = 0,
        moveX = 0;

    //图片数组
    var liImages = banner.getElementsByTagName('li');
    //点数组
    var points = point.getElementsByTagName('li');

    //克隆第一个和最后以后分布加在头和尾
    var firstImage = liImages[liImages.length-1].cloneNode(true);
    var lastImage = liImages[0].cloneNode(true);

    banner.insertBefore(firstImage,liImages[0]);
    banner.appendChild(lastImage);

    //初始化第一张图片位子
    banner.style.webkitTransform = 'translateX('+ (- width) + 'px)';

    //改变图的位子
    var changeTransform = function(){
        banner.style.webkitTransition = transitionStr;
        banner.style.webkitTransform = 'translateX('+ (- width * index ) + 'px)';
        for(var j = 0 ; j < points.length ; j ++ ){
            points[j].className = "";
        }
        liImages = banner.getElementsByTagName('li');
        points[index<1?7:index>8?0:index-1].className = "now";
    };

    //轮播函数
    var setTimer = function(){
        if(timer)clearInterval(timer);
        timer = setInterval(function(){
            index ++ ;
            changeTransform();
        },4000);
    };
    var stopDefault = function(c) {
        if (c && c.preventDefault) {
            c.preventDefault()
        } else {
            window.event.returnValue = false
        }
        return false
    }

    /*定时轮播*/
    setTimeout(function(){
        setTimer();
    });

    //优化的一个东西
    w.addEventListener('resize',function(){
        width = document.getElementsByClassName('jd_banner')[0].offsetWidth;
    },false)

    //增加过渡结束事件
    banner.addEventListener('webkitTransitionEnd',function(){
        if(index > 8){
            if(timer)clearInterval(timer);
            index = 1;
            banner.style.webkitTransition = noTransitionStr;
            setTimeout(function(){
                banner.style.webkitTransform = 'translateX('+ (- width * index ) + 'px)';
                setTimer();
            });
        }else if(index < 1){
            if(timer)clearInterval(timer);
            index = 8;
            banner.style.webkitTransition = noTransitionStr;
            setTimeout(function(){
                banner.style.webkitTransform = 'translateX('+ (- width * index ) + 'px)';
                setTimer();
            });
        }else{
            banner.style.webkitTransition = transitionStr;
        }
    },false)
    //触摸开始函数
    banner.addEventListener('touchstart',function(e){
        startX = e.changedTouches[0].clientX;
    },false);
    //触摸滑动函数
    banner.addEventListener('touchmove',function(e){
        if(timer)clearInterval(timer);
        stopDefault(e);
        banner.style.webkitTransition = noTransitionStr;
        moveX = e.changedTouches[0].clientX - startX;
        banner.style.webkitTransform = 'translateX('+ (- (width * index - moveX ) ) + 'px)';
    },false);
    //触摸结束函数
    banner.addEventListener('touchend',function(e){
        if( moveX > 0 && moveX > width / 4 ){
            index -- ;
        }else if(moveX < 0 && -moveX > width / 4){
            index ++ ;
        }else{

        }
        banner.style.webkitTransition = manTransitionStr;
        changeTransform();
        startX = 0;
        moveX = 0;
        setTimer();
    },false);

})(window);