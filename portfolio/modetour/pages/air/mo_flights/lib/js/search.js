$(document).ready(function () {
    $(".pay_option").click(function () {
        $(this).toggleClass("on").siblings(".pay_select").slideToggle();
    });
    // 필터 아코디언
    $(".filter_list .tit").click(function () {
        $(this).toggleClass("on").next(".filter_details").stop().slideToggle();
        return false;
    });

    // 필터 열기
    $(".filter_btn").click(function () {
        $(".filter_cont").toggleClass("on");
        $("body").css({ overflow: "hidden" });
        return false;
    });
    // 필터 닫기
    $(".filter_tit .close").click(function () {
        $(".filter_cont").toggleClass("on");
        $("body").removeAttr("style");
        return false;
    });

    //재검색 닫기
    $(".air_search_area .close").click(function () {
        $(this).closest(".air_search_area").toggle();
    });

    //필터
    $("#price_range").asRange({
        range: true,
        limit: true,
        step: 0.1,
        tip: {
            active: "onMove",
        },
        keyboard: true,
        format: function (value) {
            return value + "원";
        },
    });

    // 배너 2024-10-17 추가
    var banner_swiper = new Swiper(".banner_area .swiper", {
        slidesPerView: 1,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });
});
