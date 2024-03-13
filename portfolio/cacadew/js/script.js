
(function($){							
	$(document).ready(function(){

		// header nav
		$("header").load("header.html", function () {		
			$('.depth1 span').click(function(){
				$(this).siblings('ul').stop().slideToggle().parent('li').siblings('li').children('ul').slideUp();
				return false;
			});
			$(document).mouseup(function (e){
				if($('.depth1').has(e.target).length === 0){
					$('.depth1').children('ul').stop().slideUp();
				}
			});
			$('.hamburger_btn').click(function(){
				$(this).toggleClass('active');
				$('nav').toggleClass('active');
				return false;
			});
		});
		
		//explore
		$('.explore').click(function(){
			let mainT = $('main').offset().top,
				headerH = $('header').innerHeight();
			$('html,body').animate({
				scrollTop : mainT - headerH
			}, 1000); 
		});

		//menu list
		$('.menu_list li').mouseenter(function(){
			$(this).stop().animate({
				top : '-10px'
			});
		});
		$('.menu_list li').mouseleave(function(){
			$(this).stop().animate({
				top : '0'
			});
		});

		//slider
		

		//footer top_btn   
		$("footer").load("footer.html", function () {		
			$(window).scroll(function() {     
				if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height()) {
					$('.top_btn').addClass('on').stop().animate({'top':'-50px'},500);
				} else {
					$('.top_btn').removeClass('on').stop().animate({'top':'0'})
				}
			});
			$('.top_btn').click(function(){
				$('html,body').animate({
					scrollTop: 0
				}, 500); 
			});
		});

		//slide1
		var select = $('.slide_item');
		var idx = 0;
		$('.btn_next').click(function(){	
			var imgW = select.eq(idx).width();
			select.eq(idx).stop().animate({left:-imgW}).next().css({display:'block',left:imgW}).animate({left:0});
			idx++;
			if(idx == select.length){
				idx=0;
				select.eq(idx).css({left:imgW}).animate({left:0});
			}
		});
		$('.btn_prev').click(function(){
			var imgW = select.eq(idx).width();
			select.eq(idx).stop().animate({left:imgW}).prev().css({display:'block',left:-imgW}).animate({left:0});
			idx = idx - 1;
			if(idx == -1){
				idx = select.length-1;
				select.eq(idx).css({display:'block',left:-imgW}).animate({left:0});
			}
		});
		$(window).resize(function(){
			var select = $('.slide_item');
			var idx = 0;
			var imgW = select.eq(idx).width();
			select.eq(idx).stop().css({left:-imgW}).next().stop().css({display:'block',left:imgW}).stop().css({left:0});
		});

		$('.menu_item li').click(function(){
			var thisText = $(this).html();
			$('.menu_item').after('<div class="popup">' + thisText + '</div>');
			$('body').css('overflow','hidden');
		});
		
		$(document).on("click", ".popup", function(){
			$(this).hide();
			$('body').removeAttr('style');
		});
		
		

		
		/* header gnb */
		// $("#header").load("header.html", function () {		
		// 	$('.depth1').mouseover(function(){
		// 		$(this).children('.depth2').css('display','block').parent('.depth1').siblings('li').children('.depth2').css('display','none')
		// 	});
		// 	$('.depth1').mouseleave(function(){
		// 		$('.depth2').css('display','none');
		// 	});
		// });
			
		/* footer */
		// $("#footer").load("footer.html", function () {		
		// 	$(window).scroll(function() { 
		// 		if($(window).scrollTop() == $(document).height() - $(window).height()){
		// 			showTopBottom();
		// 		}else{
		// 			hideTopBottom();
		// 		}
		// 	});
			
		// 	function showTopBottom(){
		// 		$('#Layer_1').stop().animate({
		// 			'top' : '-48'
		// 		}).css({
		// 			'display' : 'block',
		// 			'transform' : 'scale(1)'
		// 		});
				
		// 		$('.btn-top').stop().animate({
		// 			'top' : '0'
		// 		}).css({
		// 			'display' : 'block'
		// 		});
		// 	};
			
		// 	function hideTopBottom(){
		// 		$('#Layer_1').stop().animate({
		// 			'top' : '0'
		// 		}).css({
		// 			'transform' : 'scale(0.8, 0.8)'
		// 		});
				
		// 		$('.btn-top').css({
		// 			'display' : 'none'
		// 		}).stop().animate({
		// 			'top' : '10'
		// 		});
		// 	}

		// 	$('.btn--top_text').on('click', function(){
		// 		var Wtop = $('.wrap').offset().top;
		// 		$('html,body').animate({
		// 			scrollTop:Wtop
		// 		}, 500); 
		// 		return false;
		// 	});
		// });

		// /* main title */
		// $('.tit1').addClass('fadeIn animated');
		// $('.tit_box button').on('click',function(){
		// 	var headerH = $('.header').height();
		// 	var con_h = $('.cont2').offset().top-headerH
		// 	$('html,body').animate({
		// 		scrollTop:con_h
		// 	}, 500); 
		// 	return false;
		// });

		// /* home_collabo */
		// $('.home_collabo li').mouseover(function(){
		// 	$(this).find('img').css('transform','scale(1.05)')
		// });
		// $('.home_collabo li').mouseleave(function(){
		// 	$(this).find('img').css('transform','scale(1)')
		// });

		// /* home_menu_list */
		// $('.home_menu_list li').mouseover(function(){
		// 	$(this).stop().animate({marginTop:"-10px"}, 400);
		// });
		// $('.home_menu_list li').mouseleave(function(){
		// 	$(this).stop().animate({marginTop:"0"}, 400);
		// });

		// /* 메뉴 팝업 */
		// $('.popup_list').click(function(){
		// 	$(this).siblings('div').fadeIn();
		// 	$('.wrap').append("<div class='dim'></div>");
		// 	$('.dim').fadeTo(1000,0.7);
		// });	
		// $(document).mouseup(function (e) {
		// 	var container = $(".popup_view");
		// 	if (!container.is(e.target) && container.has(e.target).length === 0){
		// 	container.fadeOut();
		//        $('.dim').remove();
		// 	}	
		// });


		// $('.menu_cont .subtit').addClass('slideInDown animated');


	});
})(jQuery);