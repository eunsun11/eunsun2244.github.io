window.addEventListener('DOMContentLoaded', function () {
    let tl = gsap.timeline({defaults:{opacity:0, ease:'back'}});
    tl.from('.top_right1',{x:100,y:-100})
    tl.from('.bottom_left1',{x:-100,y:100},'<')
    tl.from('.top_right2',{x:100,y:-100})
    tl.from('.bottom_left2',{x:-100,y:100},'<')
    tl.from('.blue_line1',{x:-100,y:100},'<')
    tl.from('.blue_line2',{x:-100,y:100},'<')
    tl.from('.blue_line3',{x:-100,y:100},'<')
    tl.from('.blue_line4',{x:100,y:-100},'<')
    tl.from('.blue_line5',{x:100,y:-100},'<')
    tl.from('.white_line1',{x:100,y:-100},'<')
    tl.from('.white_line2',{x:100,y:-100},'<')
    tl.from('.white_line3',{x:-100,y:100},'<')
    tl.from('.white_line4',{x:-100,y:100},'<')
    tl.from('.white_line5',{x:-100,y:100},'<')
    
    tl.from('.sky_circle1',{x:-100,y:100})
    tl.from('.sky_circle2',{x:100,y:-100},'<')
    tl.from('.sky_circle3',{x:-100,y:100},'<')
    tl.from('.sky_circle4',{x:100,y:-100},'<')
    tl.from('.bule_circle1',{x:100,y:-100},'<')
    tl.from('.bule_circle2',{x:-100,y:-100},'<')
    tl.from('.bule_circle3',{x:100,y:-100},'<')
    tl.from('.white_circle1',{x:-100,y:100},'<')
    tl.from('.white_circle2',{x:100,y:-100},'<')
    tl.from('.yellow_circle1',{x:-100,y:-100},'<')
    tl.from('.yellow_circle2',{x:100,y:100},'<')
    tl.from('.yellow_circle3',{x:-100,y:-100},'<')
    tl.from('.yellow_circle4',{x:100,y:-100},'<')
    tl.from('.yellow_circle5',{x:-100,y:100},'<')
    tl.from('.yellow_circle6',{x:-100,y:100},'<')
    tl.from('.x1',{x:100,y:100},'<')
    tl.from('.x2',{x:100,y:-100},'<')
    tl.to('.x1',{duration:1,opacity:1,transformOrigin:"center",rotation:180,repeat:-1,ease:"linear"})
    tl.to('.x2',{duration:1,opacity:1,transformOrigin:"center",rotation:180,repeat:-1,ease:"linear"},'<')       
    tl.from('h1',{x:0,y:100},'<')             
});


var swiper6 = new Swiper(".e_slide6 .swiper", {
    slidesPerView: 2,
    spaceBetween: 80,
    centeredSlides: true,
    observer: true,
    observeParents: true,
    speed: 800,								
    scrollbar : {
        el : '.e_slide6 .swiper-scrollbar',
        draggable: true,
        dragSize: 28,
    },
    breakpoints: {                
        1024: {
            slidesPerView: 1.5,
            spaceBetween: 20
        }
    }
});
$(function(){   
    $(window).scroll(function(){   
        var sct = $(window).scrollTop();
        $('.fade').each(function(i){
            if($('.fade').eq(i).offset().top - 500 < sct){
                $(this).addClass('ani');
            }                
        });
        $('.fade2').each(function(i){
            if($('.fade2').eq(i).offset().top - 800 < sct){
                $(this).addClass('ani');
            }                
        });
    });
});