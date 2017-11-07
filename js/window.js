var WindowManager; //I want to access it while debugging, will keep it here for now.
$(document).ready(() => {
    class xWindow {
        constructor(id, title, content) {
            this.id = id;
            this.header = this.buildHeader(title);
            this.content = this.buildContent(content);
            this.window = this.buildWindow(id, title, content);
        }

        setActive() {
            $(`#window-${this.id}`).addClass('active');
        }

        setNotActive() {
            $(`#window-${this.id}`).removeClass('active');
        }

        setActiveGlobal() {
            WindowManager.setActive(this.id);            
        }

        buildHeader(title) {
            var that = this;
            var closeWindowButton = $("<div>").text('Close').css({
                'color': 'red',
                'font-weight': 'bold',
                'cursor': 'pointer'
            }).attr({
                'title': 'Close'
            }).click(function () {
                that.hide();
            });
            var headerActions = $("<div>").addClass("actions").append(closeWindowButton);
            var headerText = $("<div>").addClass("text").text(title);
            var header = $("<div>").addClass('header').append(headerText).append(headerActions);
            return header;
        }
        buildContent(content) {
            var content = $("<div>").addClass('content').append(content);
            return content;
        }
        buildWindow(id, title, content) {
            var container = $("<div>").addClass("window").draggable({
                containment: 'body',
                handle: '.header',
                start: () => {
                    this.setActiveGlobal();
                }
            }).css({
                position: 'absolute',
                top: 'calc(100% / 2 - 175px)',
                left: 'calc(100% / 2 - 250px)',
            }).attr({
                'id': `window-${id}`
            }).append(this.buildHeader(title)).append(this.buildContent(content));
            return container;
        }
        appendContent(content) {
            console.log(content)
            this.content.append(content);
        }
        toggle() {
            this.window.toggle();
        }
        show() {
            this.window.show();
        }
        hide() {
            this.window.hide();
        }
        init() {
            $('body').append(this.window);
        }
    }

    WindowManager = {
        initialisedWindows: {},
        toggle: function (id) { 
            WindowManager.initialisedWindows[id].toggle();
        },
        addWindow: function (id, title, body) {
            WindowManager.initialisedWindows[id] = new xWindow(id, title, body);
            WindowManager.initialisedWindows[id].init();
            WindowManager.initialisedWindows[id].hide();
        },
        setActive: function(id) {
            $('.window').removeClass('active');
            WindowManager.initialisedWindows[id].setActive();
        }
    }
    
    WindowManager.addWindow('test', 'Hello World', "Well hello there! This is small 'window' example. It can be moved by using the handle (the green part). Click 'close' to close the window. Pretty self explanatory, I guess.");
    WindowManager.addWindow('entity-1', "You found a custom entity!", "At one point I might add multiple entities. But for now, you only get one.")
    $('#openWindow').click(() => {
        WindowManager.initialisedWindows['test'].show()
    })

});