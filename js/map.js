$(document).ready(function () {

    class MapEntity {
        constructor(id, name, imagePath, width, height, posX, posY, clickEvent) {
            this.id = id;
            this.name = name;
            this.imagePath = imagePath;
            this.posX = posX;
            this.posY = posY;
            this.width = width;
            this.height = height;
            this.clickEvent = clickEvent;
        }

        getImageHtml() {
            return $('<div>').css({
                position: 'absolute',
                top: this.posX,
                left: this.posY,
                background: `url("${this.imagePath}")`,
                'background-size': '100%',
                width: this.width,
                height: this.height
            }).attr({
                id: this.id
            }).click(() => {
                if (this.clickEvent)
                    this.clickEvent();
            });
        }
    }

    var Map = {
        entities: {},
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
        utils: {
            setPosition: function (x, y) {
                Map.selectors.container.scrollLeft(x);
                Map.selectors.container.scrollTop(y);
            },
            centerMap: function () {
                Map.selectors.container.scrollLeft(5000 / 2 - Map.properties.minLimit / 2);
                Map.selectors.container.scrollTop(5000 / 2 - $(document).height() / 2)
            },
            setProperties: (obj) => {
                Map.properties.startX = (obj['x']) ? obj['x'] : Map.properties.startX;
                Map.properties.startY = (obj['y']) ? obj['y'] : Map.properties.startY;
                Map.properties.scrollTop = (obj['scrollTop']) ? obj['scrollTop'] : Map.properties.scrollTop;
                Map.properties.scrollLeft = (obj['scrollLeft']) ? obj['scrollLeft'] : Map.properties.scrollLeft;
            },
            initMove: function () {
                Map.properties.isDown = true;
                Map.selectors.container.addClass('active');
            }, 
            stopMove: function () {
                Map.properties.isDown = false;
                Map.selectors.container.removeClass('active');
            }
        },
        registerEvents: {
            move: function () {
                Map.selectors.container.mousedown((e) => {
                    Map.utils.initMove();
                    Map.utils.setProperties({
                        x: e.pageX - Map.selectors.container.offset().left,
                        y: e.pageY - Map.selectors.container.offset().top,
                        scrollTop: Map.selectors.container.scrollTop(),
                        scrollLeft: Map.selectors.container.scrollLeft()
                    });
                }).mousemove((e) => {
                    if (!Map.properties.isDown) return;
                    e.preventDefault();
                    const x = e.pageX - Map.selectors.container.offset().left;
                    const walkX = x - Map.properties.startX;
                    const y = e.pageY - Map.selectors.container.offset().top;
                    const walkY = y - Map.properties.startY;
                    Map.utils.setPosition(Map.properties.scrollLeft - walkX, Map.properties.scrollTop - walkY);
                }).mouseleave(Map.utils.stopMove).mouseup(Map.utils.stopMove);
            },
            touch: function () {
                Map.selectors.container.on('touchstart', (e) => {
                    Map.utils.initMove();
                    Map.utils.setProperties({
                        x: e.originalEvent.touches[0].pageX - Map.selectors.container.offset().left,
                        y: e.originalEvent.touches[0].pageY - Map.selectors.container.offset().top,
                        scrollTop: Map.selectors.container.scrollTop(),
                        scrollLeft: Map.selectors.container.scrollLeft()
                    });
                }).on('touchmove', (e) => {
                    if (!Map.properties.isDown) return;
                    e.preventDefault();
                    const x = e.originalEvent.touches[0].pageX - Map.selectors.container.offset().left;
                    const walkX = x - Map.properties.startX;
                    const y = e.originalEvent.touches[0].pageY - Map.selectors.container.offset().top;
                    const walkY = y - Map.properties.startY;
                    Map.utils.setPosition(Map.properties.scrollLeft - walkX, Map.properties.scrollTop - walkY);
                }).on('touchcancel', Map.utils.stopMove).on('touchend', Map.utils.stopMove);
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
        spawnEntity: function (id, name, imagepath, width, height, posX, posY, event) {
            this.entities[id] = new MapEntity(id, name, imagepath, width, height, posX, posY, event);
            Map.selectors.container.append(this.entities[id].getImageHtml());
        },
        init: function () {
            Map.registerEvents.move();
            Map.registerEvents.touch();
            Map.registerEvents.resizeWindow();
            //Map.registerEvents.scroll();
            Map.spawnEntity("test", "Placeholder", "images/entity.png", 200, 200, 2500, 2500, () => {
                WindowManager.initialisedWindows['entity-1'].show()
            });
            Map.utils.centerMap();
        }
    }

    Map.init();

});