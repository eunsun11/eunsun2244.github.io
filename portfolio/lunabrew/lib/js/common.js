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
    var swiper1 = new Swiper(".slide1 .swiper", {
        effect: "fade",
        slidesPerView: 1,
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

    //hover
    $(".services_cont li").mouseenter(function () {
        $(this).find(".hover").css({
            opacity: 1,
            transform: "translateY(0)",
        });
    });
    $(".services_cont li").mouseleave(function () {
        $(this).find(".hover").css({
            opacity: 0,
            transform: "translateY(-50%)",
        });
    });

    //history
    var swiper2 = new Swiper(".history .swiper", {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        slidesPerView: 11,
        direction: "vertical",
        loop: "true",
    });

    gsap.utils.toArray("section").forEach((section, index) => {
        const fly = section.querySelector(".fly_img");
        const [x, xEnd] = index % 2 ? ["100%", -(fly.scrollWidth - innerWidth)] : [fly.scrollWidth, 0];

        gsap.fromTo(
            fly,
            { y: x },
            {
                y: xEnd,
                scrollTrigger: {
                    trigger: section,
                    scrub: 0.5,
                },
            }
        );
    });
});
