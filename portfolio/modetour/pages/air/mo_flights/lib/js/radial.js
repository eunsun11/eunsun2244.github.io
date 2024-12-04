$(document).ready(function () {
    let dialCurrentRotation = 0;
    const dataRadialMenu = ["", "", "", "", "", "", ""];
    const sliceSize = 360 / dataRadialMenu.length;
    const initialOffset = 372.857;

    const $radialMenu = $(".radial_menu");
    const $sideMenu = $(".m_side_menu");
    const $centerBtn = $(".m_center");

    let startAngle = 0;
    let lastAngle = 0;
    let isAnimating = false;

    const applyRotation = (rotation) => {
        $sideMenu.css("transform", `rotate(${rotation}deg)`);
        const $sideMenuItems = $(".m_side_menu .item");
        $sideMenuItems.each(function (index, item) {
            let newRotationValue = -initialOffset - index * sliceSize - rotation;
            $(item)
                .find(".de")
                .css({
                    transform: `skewY(45deg) rotate(${newRotationValue}deg)`,
                });
        });
    };

    const updateBoldText = () => {
        const $sideMenuItems = $(".m_side_menu .item");
        $sideMenuItems.find("span").css({ "font-weight": "normal", color: "#111" });

        // 1시 방향에 위치한 항목의 인덱스 계산
        let boldIndex = Math.round(dialCurrentRotation / sliceSize) % dataRadialMenu.length;
        boldIndex = (dataRadialMenu.length - boldIndex) % dataRadialMenu.length;

        $sideMenuItems.eq(boldIndex).find("span").css({ "font-weight": "bold", color: "#009c75" });
    };

    const getAngle = (x, y, rect) => {
        return (Math.atan2(y - (rect.top + rect.height / 2), x - (rect.left + rect.width / 2)) * 180) / Math.PI;
    };

    const normalizeAngle = (angle) => {
        return ((angle % 360) + 360) % 360;
    };

    const animateRotation = (start, end, duration) => {
        const startTime = performance.now();
        isAnimating = true;

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;

            const currentRotation = start + (end - start) * easedProgress;
            applyRotation(currentRotation);
            dialCurrentRotation = currentRotation;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                isAnimating = false;
                updateBoldText();
                updateSelectedItem();
            }
        };

        requestAnimationFrame(animate);
    };

    const updateSelectedItem = () => {
        let selectedIndex = Math.round(normalizeAngle(-dialCurrentRotation) / sliceSize) % dataRadialMenu.length;
        selectedIndex = (selectedIndex + dataRadialMenu.length) % dataRadialMenu.length;

        const selectedItem = dataRadialMenu[selectedIndex];

        console.log("Selected index:", selectedIndex);
        console.log("Selected item:", selectedItem);
    };

    $radialMenu.on("touchstart", function (e) {
        if (isAnimating) return;
        const centerBtnRect = $centerBtn[0].getBoundingClientRect();
        startAngle = getAngle(e.touches[0].clientX, e.touches[0].clientY, centerBtnRect);
        lastAngle = startAngle;
    });

    $radialMenu.on("touchmove", function (e) {
        if (isAnimating) return;
        e.preventDefault();

        const centerBtnRect = $centerBtn[0].getBoundingClientRect();
        const currentAngle = getAngle(e.touches[0].clientX, e.touches[0].clientY, centerBtnRect);

        let deltaAngle = currentAngle - lastAngle;
        if (deltaAngle > 180) deltaAngle -= 360;
        if (deltaAngle < -180) deltaAngle += 360;

        dialCurrentRotation += deltaAngle;
        applyRotation(dialCurrentRotation);

        lastAngle = currentAngle;
    });

    $radialMenu.on("touchend", function () {
        if (isAnimating) return;
        const targetRotation = Math.round(dialCurrentRotation / sliceSize) * sliceSize;
        animateRotation(dialCurrentRotation, targetRotation, 200);
    });

    applyRotation(0);
    updateBoldText();
});
