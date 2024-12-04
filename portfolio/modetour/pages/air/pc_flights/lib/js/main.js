(function ($) {
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
        });
        main_slide01.controller.control = main_slide02;
        main_slide02.controller.control = main_slide01;

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
        $(document).mouseup(function (e) {
            var LayerPopup = $(".layer_popup");
            if (LayerPopup.has(e.target).length === 0) {
                LayerPopup.hide();
            }
        });

        // 인원 팝업 툴팁
        $(".ico_tooltip").mouseover(function () {
            $(this).parent("p").siblings(".tooltip").stop().fadeIn();
        });
        $(".ico_tooltip").mouseleave(function () {
            $(this).parent("p").siblings(".tooltip").stop().fadeOut();
        });

        // 티켓 영역 내 공지사항 슬라이드
        var notice_slide = new Swiper(".notice_slide", {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            speed: 800,
            spaceBetween: 30,
            loop: true,
        });

        // 최근 검색 슬라이드
        var notice_slide = new Swiper(".history_slide", {
            observer: true,
            observeParents: true,
            slidesPerView: "auto",
            freeMode: true,
            spaceBetween: 5,
            navigation: {
                nextEl: ".history_area .swiper-button-next",
                prevEl: ".history_area .swiper-button-prev",
            },
        });
        $(".swiper-button-next").click(function () {
            $(".blur").css({
                right: "auto",
                left: "34px",
                background: "linear-gradient(to left, rgba(255, 255, 255, 0), rgb(255, 255, 255))",
            });
        });

        // 컨텐츠 슬라이드1
        var main_cont_slide01 = new Swiper(".main_cont_slide01", {
            slidesPerView: "auto",
            spaceBetween: 30,
        });

        // 컨텐츠 슬라이드2
        var main_cont_slide02 = new Swiper(".main_cont_slide02", {
            slidesPerView: "auto",
            spaceBetween: 20,
        });

        // 컨텐츠 슬라이드3
        var main_cont_slide02 = new Swiper(".main_cont_slide03", {
            slidesPerView: 2,
            spaceBetween: 20,
            pagination: {
                el: ".main_cont_slide03 + .pagination",
                clickable: true,
            },
        });

        // 컨텐츠 슬라이드4
        var main_cont_slide04 = new Swiper(".main_cont_slide04", {
            slidesPerView: "auto",
            spaceBetween: 25,
        });

        //fly banner
        $(window).scroll(function () {
            var scltop = $(window).scrollTop(),
                fly = $(".fly").first(),
                contTop = $(".main_container").offset().top - 115;

            fly.css({
                position: scltop > contTop ? "fixed" : "absolute",
                top: scltop > contTop ? "120px" : "",
            });
        });

        //top button
        $(".top_btn").click(function () {
            $("html, body").stop().animate(
                {
                    scrollTop: 0,
                },
                800
            );
            return false;
        });

        //메인팝업
        var main_popup_slide = new Swiper(".main_popup_slide", {
            slidesPerView: 1,
            spaceBetween: 20,
            watchOverflow: true,
        });
        $(".main_popup .close").click(function () {
            $(this).closest(".main_popup").hide();
            return false;
        });
    });
})(jQuery);
