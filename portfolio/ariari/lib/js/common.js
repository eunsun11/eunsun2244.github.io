$(document).ready(function () {
    // 메뉴 탭
    $(".menu a").click(function () {
        $(this).addClass("on").parent("div").siblings("div").children("a").removeClass("on");
        $($.attr(this, "href")).show().siblings().hide();
        $("html, body").stop().animate({ scrollTop: 0 });
        return false;
    });
    $(".btn a").click(function () {
        $($.attr(this, "href")).show().siblings().hide();
        $("html, body").stop().animate({ scrollTop: 0 });
        return false;
    });
    $(".sec04_wrap .btn a").click(function () {
        $("header .menu div:nth-child(2)").find("a").addClass("on").parent("div").siblings().children("a").removeClass("on");
        return false;
    });
    $("footer .btn a").click(function () {
        $("header .menu div:nth-child(3)").find("a").addClass("on").parent("div").siblings().children("a").removeClass("on");
        return false;
    });
    //제품 소개 슬라이드
    var swiper1 = new Swiper(".slide01 .swiper", {
        slidesPerView: 2.2,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        speed: 800,
        navigation: {
            nextEl: ".sec04 .left .swiper-button .swiper-button-next",
            prevEl: ".sec04 .left .swiper-button .swiper-button-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
            994: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
            576: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
        },
    });

    //헤더고정, fade이벤트
    $(window).scroll(function () {
        var $contents = $(".sec03 .note"),
            scltop = $(window).scrollTop(),
            windowH = $(window).innerHeight();
        if (scltop > 1) {
            $("header").css({ background: "#FFF", borderBottom: "1px solid #f4f0ea" });
        } else {
            $("header").css({ background: "transparent", borderBottom: "none" });
        }
        $.each($contents, function (idx, item) {
            var $target = $contents.eq(idx),
                targetTop = $target.offset().top - windowH;
            if (targetTop <= scltop) {
                $(this).removeClass("op0").addClass("fadeInUp");
            }
            if (!(200 <= scltop)) {
                $(this).removeClass("fadeInUp").addClass("op0");
            }
        });
    });

    //textarea 글씨제한, input focus스타일
    $(".txt_length").keyup(function (e) {
        let content = $(this).val();
        if (content.length == 0 || content == "") {
            $(".txt_count").text("0");
        } else {
            $(".txt_count").text(content.length + "");
        }
    });
    $(".txt_area").focusin(function () {
        $(this).addClass("focus");
    });
    $(".txt_area").focusout(function () {
        $(this).removeClass("focus");
    });
    $(".input_txt input").focusin(function () {
        $(this).parent(".input_txt").addClass("focus");
    });
    $(".input_txt input").focusout(function () {
        $(this).parent(".input_txt").removeClass("focus");
    });

    //팝업열기
    $(".popup_btn").click(function () {
        $($.attr(this, "href")).show();
    });
    //팝업닫기
    $(".popup_close").click(function () {
        $(this).closest(".popup").hide();
    });
});
