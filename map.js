$(document).ready(function () {
    const container = $('.container');
    const mapImage = $("#map");
    let isDown = false, startX, scrollLeft, startY, scrollUp, size = 5000, maxLimit = 6000, minLimit = $(document).width(), resizeTimer;

    //Small trick to achieve "onResizeDone"
    $(window).on('resize', function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            minLimit = $(document).width();
        }, 250);
    });

    container.mousedown((e) => {
        isDown = true;
        container.addClass('active');
        startX = e.pageX - container.offset().left;
        startY = e.pageY - container.offset().top;
        scrollUp = container.scrollTop();
        scrollLeft = container.scrollLeft();
    }).mouseleave(() => {
        isDown = false;
        container.removeClass('active');
    }).mouseup(() => {
        isDown = false;
        container.removeClass('active');
    }).mousemove((e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offset().left;
        const walkX = x - startX;
        const y = e.pageY - container.offset().top;
        const walkY = y - startY;
        container.scrollLeft(scrollLeft - walkX);
        container.scrollTop(scrollUp - walkY);
    }).on('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta > 0) {
            if (size < maxLimit)
                size += 100;
        }
        else {
            if (size > minLimit + 100)
                size -= 100;
        }
        mapImage.css({
            'width': `${size}px`,
            'height': `${size}px`
        });
    });

});