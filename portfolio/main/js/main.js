window.onload = function () {
    //gnb 애니메이션

    const menuOpen = document.querySelector(".gnb .menu_open");
    const menuBox = document.querySelector(".gnb .menu_box");

    menuOpen.addEventListener("click", () => {
        menuBox.classList.toggle("on");
    });

    gsap.registerPlugin(ScrollTrigger);

    // 01.visual

    ScrollTrigger.matchMedia({
        // desktop
        "(min-width: 800px)": function () {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".visual",
                    start: "100% 100%",
                    end: "100% 0",
                    scrub: 1,
                    // markers: true,
                },
            })
                .to(".logo_wrap .e", { x: -150, y: 350, rotate: 20, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .u1", { x: -30, y: 450, rotate: -10, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .n1", { x: 0, y: 400, rotate: -10, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .s", { x: 50, y: 500, rotate: 10, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .u2", { x: 100, y: 200, rotate: -10, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .n2", { x: -20, y: 450, rotate: 20, ease: "none", duration: 5 }, 0);
        },

        // mobile
        "(max-width: 799px)": function () {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".visual",
                    start: "0 0",
                    end: "100% 0",
                    scrub: 1,
                    // markers: true,
                },
            })
                .to(".logo_wrap .e", { x: -20, y: 70, rotate: 20, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .u1", { x: -15, y: 110, rotate: -10, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .n1", { x: 0, y: 100, rotate: -10, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .s", { x: 15, y: 120, rotate: 10, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .u2", { x: 0, y: 80, rotate: -10, ease: "none", duration: 5 }, 0)
                .to(".logo_wrap .n2", { x: -10, y: 110, rotate: 20, ease: "none", duration: 5 }, 0);
        },
    });

    // 공통
    gsap.utils.toArray(".main_txt_box .title i").forEach((selector) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: selector,
                start: "100% 100%",
                end: "100% 100%",
                scrub: 1,
            },
        }).fromTo(selector, { y: 150 }, { y: 0, ease: "none", duration: 5 }, 0);
    });
    gsap.utils.toArray(".sub_txt p").forEach((selector) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: selector,
                start: "100% 100%",
                end: "100% 100%",
                scrub: 3,
            },
        }).fromTo(selector, { opacity: 0, y: 150 }, { opacity: 1, y: 0, ease: "none", duration: 5 }, 0);
    });

    // 텍스트 체인지
    let txtAniList = document.querySelectorAll(".con1 .txt_ani li");
    let txtAni = gsap.timeline({ repeat: -1 });

    for (let i = 0; i < txtAniList.length; i++) {
        txtAni.to(txtAniList[i], 0.8, { opacity: 1, repeat: 1, delay: 0, x: 0, yoyo: true, ease: "power4.out" });
    }
    txtAni.play();

    gsap.utils.toArray(".con2 .list_box li").forEach((selector, i) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: selector,
                start: "100% 100%",
                end: "100% 100%",
                scrub: 1,
                // markers: true,
            },
        }).fromTo(selector, { rotationX: "-65deg", z: "-500px", opacity: 0 }, { rotationX: 0, z: 0, opacity: 1, delay: (i % 3) * 0.5 }, 0);
    });

    // list_box
    gsap.utils.toArray(".con3 .list_box .box").forEach((selector) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: selector,
                start: "0% 20%",
                end: "0% 0%",
                scrub: 1,
            },
        }).to(selector, { transform: "rotateX(-10deg) scale(0.9)", transformOrigin: "top", filter: "brightness(0.3)" }, 0);
    });

    // con4
    let listBox = document.querySelectorAll(".con4 .list_box li");
    let imgBox = document.querySelector(".con4 .img_box");
    let img = document.querySelector(".con4 .img_box img");

    for (let i = 0; i < listBox.length; i++) {
        listBox[i].addEventListener("mouseover", () => {
            img.src = `../images2/img${i}.jpg`;
            gsap.set(imgBox, { scale: 0, opacity: 0, duration: 0.3 }), gsap.to(imgBox, { scale: 1, opacity: 1, duration: 0.3 });
        });
        listBox[i].addEventListener("mousemove", (e) => {
            let imgBoxX = e.pageX + 20;
            let imgBoxY = e.pageY - 20;
            imgBox.style.left = imgBoxX + "px";
            imgBox.style.top = imgBoxY + "px";
        });
        listBox[i].addEventListener("mouseout", () => {
            gsap.to(imgBox, { scale: 0, opacity: 0, duration: 0.3 });
        });
    }
    gsap.timeline({
        scrollTrigger: {
            trigger: ".con4",
            start: "0% 100%",
            end: "100% 0",
            toggleClass: { targets: ".wrap", className: "on" },
        },
    });

    // footer
    gsap.timeline({
        scrollTrigger: {
            trigger: "footer",
            start: "0 100%",
            end: "100% 0",
            scrub: 1,
            // markers: true,
        },
    }).to(".logo_wrap", { top: "20%", ease: "none", duration: 3 }, 0);

    // loading
    let loading = document.querySelector(".loading");
    let rotate = document.querySelectorAll(".rotate");
    let opacity = document.querySelectorAll(".opacity");

    setTimeout(() => loading.classList.add("scene1"), 0),
        setTimeout(() => loading.classList.add("scene2"), 1500),
        setTimeout(() => loading.classList.remove("scene1", "scene2"), 2500),
        setTimeout(
            () =>
                rotate.forEach((rotate) => {
                    rotate.classList.add("on");
                }),
            2500
        ),
        setTimeout(
            () =>
                opacity.forEach((opacity) => {
                    opacity.classList.add("on");
                }),
            2500
        ),
        setTimeout(() => loading.classList.add("dn"), 2500);
    $("html,body").css({ overflow: "hidden" });
    setTimeout(() => $("html,body").removeAttr("style"), 4100);

    $(".menu_box a, .btn").click(function () {
        $("html,body").animate(
            {
                scrollTop: $(this.hash).offset().top,
            },
            500
        );
        $(".menu_box").removeClass("on");
        return false;
    });

    // 메뉴 배경
    $(window).scroll(function () {
        let con4Top = $(".con4").offset().top,
            viewH = $(window).height() / 2;
        scltop = $(window).scrollTop();

        if (con4Top - viewH <= scltop) {
            $("header .menu_box").css({
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                color: "#FFF",
            });
        } else {
            $("header .menu_box").css({
                backgroundColor: "rgba(55, 55, 55, 0.4)",
                color: "#a9a9a9",
            });
        }
    });
};
