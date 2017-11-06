$(document).ready(function () {
    var Map = {
        selectors: {
            container: $('.container'),
            mapImage: $("#map"),
        },
        properties: {
            isDown: false,
            startX: 0,
            scrollLeft: 0,
            startY: 0,
            scrollTop: 0,
            size: 5000,
            maxLimit: 6000,
            minLimit: $(document).width(),
            resizeTimer: null
        },
        setPosition: function (x, y) {
            Map.selectors.container.scrollLeft(x);
            Map.selectors.container.scrollTop(y);
        },
        centerMap: function () {
            Map.selectors.container.scrollLeft(5000 / 2 - Map.properties.minLimit / 2);
            Map.selectors.container.scrollTop(5000 / 2 - $(document).height() / 2)
        },
        registerEvents: {
            move: function () {
                Map.selectors.container.mousedown((e) => {
                    Map.propertiesisDown = true;
                    Map.selectors.container.addClass('active');
                    Map.properties.startX = e.pageX - Map.selectors.container.offset().left;
                    Map.properties.startY = e.pageY - Map.selectors.container.offset().top;
                    Map.properties.scrollTop = Map.selectors.container.scrollTop();
                    Map.properties.scrollLeft = Map.selectors.container.scrollLeft();
                }).mouseleave(() => {
                    Map.propertiesisDown = false;
                    Map.selectors.container.removeClass('active');
                }).mouseup(() => {
                    Map.propertiesisDown = false;
                    Map.selectors.container.removeClass('active');
                }).mousemove((e) => {
                    if (!Map.propertiesisDown) return;
                    e.preventDefault();
                    const x = e.pageX - Map.selectors.container.offset().left;
                    const walkX = x - Map.properties.startX;
                    const y = e.pageY - Map.selectors.container.offset().top;
                    const walkY = y - Map.properties.startY;
                    Map.setPosition(Map.properties.scrollLeft - walkX, Map.properties.scrollTop - walkY);
                });
            },
            touch: function() {
                Map.selectors.container.on('touchstart', (e) => {
                    Map.propertiesisDown = true;
                    Map.selectors.container.addClass('active');
                    Map.properties.startX = e.originalEvent.touches[0].pageX - Map.selectors.container.offset().left;
                    Map.properties.startY = e.originalEvent.touches[0].pageY - Map.selectors.container.offset().top;
                    Map.properties.scrollTop = Map.selectors.container.scrollTop();
                    Map.properties.scrollLeft = Map.selectors.container.scrollLeft();
                }).on('touchcancel', () => {
                    Map.propertiesisDown = false;
                    Map.selectors.container.removeClass('active');
                }).on('touchend', () => {
                    Map.propertiesisDown = false;
                    Map.selectors.container.removeClass('active');
                }).on('touchmove', (e) => {
                    if (!Map.propertiesisDown) return;
                    e.preventDefault();
                    const x = e.originalEvent.touches[0].pageX - Map.selectors.container.offset().left;
                    const walkX = x - Map.properties.startX;
                    const y = e.originalEvent.touches[0].pageY - Map.selectors.container.offset().top;
                    const walkY = y - Map.properties.startY;
                    Map.setPosition(Map.properties.scrollLeft - walkX, Map.properties.scrollTop - walkY);
                });
            },
            scroll: function () {
                Map.selectors.container.on('mousewheel', function (e) {
                    if (e.originalEvent.wheelDelta > 0) {
                        if (Map.properties.size < Map.properties.maxLimit)
                            Map.properties.size += 100;
                    }
                    else {
                        if (Map.properties.size > Map.properties.minLimit + 100)
                            Map.properties.size -= 100;
                    }
                    Map.selectors.mapImage.css({
                        'width': `${Map.properties.size}px`,
                        'height': `${Map.properties.size}px`
                    });
                });
            },
            resizeWindow: function () {
                //Small trick to achieve "onResizeDone"
                $(window).on('resize', function (e) {
                    clearTimeout(Map.properties.resizeTimer);
                    Map.properties.resizeTimer = setTimeout(function () {
                        Map.properties.minLimit = $(document).width();
                    }, 250);
                });
            }
        },
        init: function() {
            Map.registerEvents.move();
            Map.registerEvents.touch();
            Map.registerEvents.resizeWindow();
            //Map.registerEvents.scroll();
            Map.centerMap();
        }
    }

    Map.init();

});