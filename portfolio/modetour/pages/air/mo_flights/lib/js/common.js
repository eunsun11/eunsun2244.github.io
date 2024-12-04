$(document).ready(function () {
    // 공통팝업 열기
    $(".pop_btn").click(function () {
        $($.attr(this, "href")).show();
        $("html,body").css({ overflow: "hidden" });
        return false;
    });
    // 공통팝업 닫기
    $(".pop_top .icon_x").click(function () {
        $(this).closest(".pop_cont").toggle();
        $("html,body").removeAttr("style");
        return false;
    });

    // 셀렉트 박스
    $(".select_layer").click(function () {
        $(this).toggleClass("on").next(".select_option").slideToggle();
        return false;
    });

    //헤더 메뉴
    $(".menu_btn").click(function () {
        $(".menu_nav").animate({ left: "0" });
        $("html,body").css({ overflow: "hidden" });
    });
    $(".menu_nav .close").click(function () {
        $(".menu_nav").animate({ left: "-100%" });
        $("html,body").removeAttr("style");
    });

    // 레이어팝업 열기
    $(".layer_popup_btn").click(function () {
        $(this).closest(".popup_container").find(".layer_popup").show();
        return false;
    });
    // 레이어팝업 닫기
    $(".icon_x button").click(function () {
        $(this).closest(".layer_popup").toggle();
        return false;
    });

    //탭
    $(".btn_group .btn").click(function () {
        var idx = $(this).index();
        $(this).addClass("on").siblings().removeClass("on").closest(".tab_area").find(".con_group").children(".con").eq(idx).addClass("on").siblings().removeClass("on");
        return false;
    });
    //탭 라인
    $(".line_tab a").click(function () {
        var position = $(this).position();
        var width = $(this).width();
        $(this).closest(".btn_group").siblings(".line").css({ left: +position.left, width: width });
    });

    //슬라이드 메뉴
    $(".slide_btn").click(function () {
        $(this).toggleClass("on");
        $(this).siblings(".slide_view").stop().slideToggle(150);
        return false;
    });
    //슬라이드 메뉴2
    $(".fade_btn").click(function () {
        $(this).toggleClass("on");
        $(this).siblings(".fade_view").stop().toggle();
        return false;
    });

    //하단 M버튼
    $(".center").click(function () {
        $(".m_side_menu, .nav_bar .left, .nav_bar .right, .nav_bar .center, .radial_menu .dim").toggleClass("on");
    });
    var prevScrollTop = 0;
    $(window).scroll(function () {
        var nowScrollTop = $(window).scrollTop();
        if (nowScrollTop > prevScrollTop) {
            $(".bt_nav").addClass("st"); //스크롤 내렸을때
        } else {
            $(".bt_nav").removeClass("st"); //스크롤 올렸을때
        }
        prevScrollTop = nowScrollTop;

        //top버튼
        if (nowScrollTop < 500) {
            $(".top_btn").hide();
        } else {
            $(".top_btn").show();
        }
    });

    //top버튼
    $(".top_btn").click(function () {
        $("html, body").stop().animate({ scrollTop: 0 }, 800);
    });
});
