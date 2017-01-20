;(function($){
	$.fn.myswiper = function(opt){
		var _this = this;
		var $contains,
			c_left,//contains 的 left值
			$dots,
			item_num,
			curr_index=0,
			timer;
		var defaults = {
			'width' : 600,
			'height' : 300,
			'speed' : 500,
			'interval' : 1000,
			'autoplay' : false
		}

		var setting = $.extend({},defaults,opt);
		
		function init(){

			//初始化 容器尺寸
			$(_this).css({width:setting.width,height:setting.height,overflow:'hidden'});

			//增加container
			$contains = $('<div class="swiper-contains"></div>');
			$contains.html($(_this).html());
			$(_this).html($contains);

			//获得图片的数量
			item_num = $contains.find('ul li').size();
			//计算contianes的宽度
			$contains.css({width:item_num * setting.width,height:setting.height,position:'relative'});

			//创建小点点
			$dots = $('<ol class="dots"></ol>');
			var dots_html = '';
			for (var i = item_num-1; i >= 0; i--) {
				dots_html += '<li></li>';
			}
			$dots.html(dots_html);
			$(_this).append($dots);
			$dots.find('li').eq(curr_index).addClass('active');	
			$dots.find('li').click(dotClick);

			//自动播放动画
			if(setting.autoplay){

				autoPlay();
			}	
		} 	
		//小点点 点击事件
		function dotClick(){
			
			if(timer){	

				clearInterval(timer);
			}

			curr_index = $(this).index();

			$dots.find('li').eq(curr_index).addClass('active').siblings('li').removeClass('active');

			slideImage();

			if(setting.autoplay){

				autoPlay();
			}
		}	

		//滑动图片
		function slideImage(){

			c_left = curr_index * -setting.width;

			$contains.animate({left:c_left},setting.speed);
		}

		//自动播放图片	
		function autoPlay(){
			
			timer = setInterval(function(){

				curr_index ++;
				if(curr_index > item_num - 1){
					curr_index = 0;
				}

				$dots.find('li').eq(curr_index).addClass('active').siblings('li').removeClass('active');

				slideImage();
			},setting.interval);
		}

		init();

	}

})(jQuery);