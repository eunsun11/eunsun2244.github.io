
(function($){							
	$(document).ready(function(){

			$("#menu-toggle").click(function(){
		        $(this).toggleClass('open');
		        $('body, html').toggleClass('hidden');
				$('.menu_item02').stop().slideUp().removeClass('activeIn');
				$('.menu_item01 .btn').removeClass('on');
				if($('html,body').hasClass('hidden')){
					$('.header').stop().animate({height: '100%'
					});
				}else{
					$('.header').stop().delay(350).animate({height: '87px'});
				}
			});

			$('.menu_item01 .btn').click(function(){
				$(this).toggleClass('on').next('ul').stop().slideToggle().toggleClass('activeIn').parent('li').siblings('li').find('span').removeClass('on').next('ul').stop().slideUp().removeClass('activeIn');
				return false;
			});

			$('.sub_top h2').addClass("fadeInUp");

			$('.page_up').click(function(){
				$('html,body').animate({
					scrollTop: 0
				}, 500);

				return false;
			});

			$('.tab_tit').click(function(){
				var headerH = $('.h_top').height();

				$(this).parent('li').toggleClass('on').children('span').next('div').slideToggle().parent().siblings().children('.tab_con').slideUp().siblings('.tab_tit').parent().removeClass('on');
				$('html,body').animate({
					scrollTop: $(this).parents('.slide_tab').offset().top-headerH
				});
			});


			$('.filter').click(function(){
				$(this).next('.filter_popup').fadeIn();
				$('.wrap').append("<div class='dim'></div>");
				$('.dim').fadeTo(500,0.7);

				return false;
			});

			$('.filter_wrap div a').click(function(){
				$('.filter span').text($(this).text());
				$($(this).attr('href')).css('display','block').siblings('.filter_list').css('display','none');
				if($(this).attr('href') == '#'){
		            $('.filter_list').css('display', 'block')
		         }else{
		            $($(this).attr('href')).css('display', 'block').siblings('.filter_list').css('display', 'none');
		         }
				$(this).parents('.filter_popup').hide();
				$('.dim').remove();
				return false;
			});

	});
})(jQuery);