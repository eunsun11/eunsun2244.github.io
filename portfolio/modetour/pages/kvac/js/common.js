(function ($) {
    $(document).ready(function () {
        // menu
        $("#nav").mouseenter(function () {
            $(".depth_02").show();
            $(this).css("height", "213px");
        });
        $("#nav").mouseleave(function () {
            $(".depth_02").hide();
            $(this).css("height", "auto");
        });

        //FAQ
        $(".question_t").on("click", function () {
            $(this).parent("div").toggleClass("on").siblings(".answer").slideToggle();
        });

        //selectbox
        $(document).on("click", ".select_tit p", function () {
            if ($(this).attr("class") != "open") {
                $(this).parent(".select_tit").siblings("ul").show();
                $(this).addClass("open");
            } else {
                $(this).removeClass("open");
                $(this).parent(".select_tit").siblings("ul").show();
            }
        });
        $(document).on("click", ".select_bar li", function () {
            var selectBox = $(this).parent("ul");
            selectBox.siblings(".select_tit").children("p").text($(this).text());
            selectBox.siblings(".select_tit").children("p").removeClass("open");
            selectBox.hide();
        });
    });
})(jQuery);
