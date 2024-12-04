$(document).ready(function () {
    // 메인 슬라이드
    var main_slide01 = new Swiper(".main_slide01", {
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        speed: 800,
        loop: true,
        navigation: {
            nextEl: ".main_slide01 .swiper-button-next",
            prevEl: ".main_slide01 .swiper-button-prev",
        },
        pagination: {
            el: ".main_slide01 .swiper-pagination",
            type: "fraction",
        },
    });
    var main_slide02 = new Swiper(".main_slide02", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
    });
    main_slide01.controller.control = main_slide02;
    main_slide02.controller.control = main_slide01;

    // 티켓 영역 내 공지사항 슬라이드
    var notice_slide = new Swiper(".notice_slide", {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 800,
        spaceBetween: 30,
        loop: true,
        observer: true,
        observeParents: true,
    });

    // 컨텐츠 슬라이드1
    var main_cont_slide01 = new Swiper(".main_cont_slide01", {
        slidesPerView: 1,
        spaceBetween: 30,
    });

    // 컨텐츠 슬라이드2
    var main_cont_slide02 = new Swiper(".main_cont_slide02", {
        slidesPerView: 2,
        spaceBetween: 20,
    });

    // 컨텐츠 슬라이드3
    var main_cont_slide02 = new Swiper(".main_cont_slide03", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: ".main_cont_slide03 + .pagination",
            clickable: true,
        },
    });

    // 컨텐츠 슬라이드4
    var main_cont_slide04 = new Swiper(".main_cont_slide04", {
        slidesPerView: 1,
        pagination: {
            el: ".main_cont_slide04 + .pagination",
            clickable: true,
        },
    });

    //faq
    $(".faq_q").click(function () {
        $(this).toggleClass("on").siblings(".faq_a").slideToggle();
        return false;
    });
});
