$(document).ready(function () {
    //헤더고정
    $(window).scroll(function () {
        var $contents = $("main").offset().top,
            scltop = $(window).scrollTop();
        if (scltop > $contents) {
            $("#header").addClass("fixed");
        } else {
            $("#header").removeClass("fixed");
        }
    });

    //슬라이드
    var swiper = new Swiper(".slide1 .swiper", {
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        loop: true,
        pagination: {
            el: ".slide1_control .swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".slide1_control .swiper-button-next",
            prevEl: ".slide1_control .swiper-button-prev",
        },
    });
});
