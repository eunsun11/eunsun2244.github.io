$(document).ready(function () {
    //메뉴
    $(".depth1").mouseover(function () {
        $(this).find(".depth2").show();
    });
    $(".depth1").mouseleave(function () {
        $(this).find(".depth2").hide();
    });
    $(".depth2 li").mouseover(function () {
        $(this).find(".depth3").show();
    });
    $(".depth2 li").mouseleave(function () {
        $(this).find(".depth3").hide();
    });

    // input layer
    $(".search_panel .btn01").click(function () {
        $(this).toggleClass("on").parent().siblings().find(".btn01").removeClass("on");
        $(this).next("div").toggle();
        $(this).parent().siblings().find(".area_cont01").hide();
    });
    $(".search_panel .btn02").click(function () {
        $(this).parent("li").addClass("on").siblings("li").removeClass("on");
        $(this).next("div").toggle().parent("li").siblings("li").find(".area_cont02").hide();
    });
    $(".search_panel .btn03").click(function () {
        $(this).toggleClass("on").next("div").toggle();
        $(this).parent("li").siblings("li").find(".btn03").removeClass("on").next(".area_cont03").hide();
    });
    $(".search_panel .area_cont03 > ul > li").click(function () {
        $(this).addClass("on").siblings("li").removeClass("on");
        $(this).parents("li").siblings("li").find("li").removeClass("on");
    });
    $(".layer_popup_btn").click(function () {
        $(this).toggleClass("on");
        return false;
    });

    //최근검색 슬라이드
    var swiper = new Swiper(".recent_search_list", {
        pagination: {
            el: ".recent_search_list .swiper-pagination",
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        spaceBetween: 30,
    });

    //인기검색어
    var keyword_slide = new Swiper(".keyword_slide", {
        direction: "vertical",
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: this.SwioperLength > 1,
        watchOverflow: true,
    });
    $(".search_keyword").mouseover(function () {
        $(this).find(".layer_popup").show();
    });
    $(".search_keyword").mouseout(function () {
        $(this).find(".layer_popup").hide();
    });

    //메인로고
    var main_logo = new Swiper(".main_logo", {
        slidesPerView: 1,
        loop: true,
    });
});
