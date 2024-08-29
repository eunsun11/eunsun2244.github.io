$(document).ready(function () {
    // 공통팝업 열기
    $(".layer_popup_btn").click(function () {
        $(this).closest(".popup_container").find(".layer_popup").show();
        return false;
    });
    // 공통팝업 닫기
    $(".icon_x button").click(function () {
        $(this).closest(".layer_popup").toggle();
        return false;
    });

    // 검색input
    $(".search_input input").focus(function () {
        $(this).parent(".input").addClass("on");
    });
    $(".search_input input").focusout(function () {
        $(this).parent(".input").removeClass("on");
    });

    // 셀렉트 박스
    $(".select_layer").click(function () {
        $(this).toggleClass("on").next(".select_option").slideToggle();
        return false;
    });
});
