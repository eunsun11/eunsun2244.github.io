(function ($) {
    $(document).ready(function () {
        // 공통 탭
        $(".btn_group a").click(function () {
            var idx = $(this).index();
            $(this).addClass("on").siblings().removeClass("on").closest(".tab_area").children(".con_group").children(".con").eq(idx).addClass("on").siblings().removeClass("on");
            return false;
        });

        $(".ticket_tab span").click(function () {
            var position = $(this).parent().position();
            var width = $(this).parent().width();
            $(".ticket_tab .line").css({ left: +position.left, width: width });
        });
        var actWidth = $(".ticket_tab .btn_group").find(".active").parent("a").width();
        var actPosition = $(".ticket_tab .btn_group .active").position();
        $(".ticket_tab .line").css({ left: +actPosition.left, width: actWidth });

        // 항공권 검색 팝업
        $(".booking_start").click(function () {
            $(this).children(".trip_city_layer").show();
            $(".booking_end").children(".trip_city_layer").hide();
            return false;
        });
        $(".booking_end").click(function () {
            $(this).children(".trip_city_layer").show();
            $(".booking_start").children(".trip_city_layer").hide();
            return false;
        });

        // 캘린더
        $(".booking_date").click(function () {
            $(this).children(".calendar_layer").toggle();
            return false;
        });

        // 인원,좌석 팝업
        $(".passenger").click(function () {
            $(this).children(".passenger_layer").toggle();
            return false;
        });
        $(".seat").click(function () {
            $(this).children(".passenger_layer").toggle();
            return false;
        });

        // 팝업 외부영역 클릭 시 닫기
        // $(document).mouseup(function (e) {
        //     var LayerPopup = $(".layer_popup");
        //     if (LayerPopup.has(e.target).length === 0) {
        //         LayerPopup.hide();
        //     }
        // });

        // 인원 팝업 툴팁
        $(".ico_tooltip").mouseover(function () {
            $(this).parent("p").siblings(".tooltip").stop().fadeIn();
        });
        $(".ico_tooltip").mouseleave(function () {
            $(this).parent("p").siblings(".tooltip").stop().fadeOut();
        });

        // 최근 검색 슬라이드
        var notice_slide = new Swiper(".recent_search_slide", {
            observer: true,
            observeParents: true,
            slidesPerView: "auto",
            freeMode: true,
            spaceBetween: 20,
            navigation: {
                nextEl: ".recent_search .swiper-button-next",
                prevEl: ".recent_search .swiper-button-prev",
            },
        });

        // 검색결과 슬라이드
        $(".result_section").click(function () {
            $(this).parent(".flight_course").siblings(".flight_result").slideToggle();
            return false;
        });

        //검색 순서
        // $(".sort button").click(function () {
        //     $(this).next(".layer_popup").toggle();
        //     return false;
        // });

        // 검색 아코디언
        $(".filter_list .tit").click(function () {
            $(this).toggleClass("on").next(".filter_details").stop().slideToggle();
            return false;
        });

        // 팝업닫기
        $(".close").click(function () {
            $(this).closest(".layer_popup").hide();
            return false;
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
})(jQuery);
