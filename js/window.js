$(document).ready(() => {
    var Window = {
        addWindow: function() {
            var container = $("<div>").addClass("window").draggable({
                containment: 'body',
                handle: '.header'
            }).css({
                position: 'absolute',
                top:'calc(100% / 2 - 175px)',
                left:'calc(100% / 2 - 250px)',
            }).attr({
                'id': 'testwindow'
            });
            var closeWindowButton = $("<div>").text('Close').css({
                'color': 'red',
                'font-weight': 'bold',
                'cursor': 'pointer'
            }).attr({
                'title': 'Close'
            }).click(function() {
                container.hide();
            });
            var headerActions = $("<div>").addClass("actions").append(closeWindowButton);
            var headerText = $("<div>").addClass("text").text("Test Window");
            var header = $("<div>").addClass('header').append(headerText).append(headerActions);
            var content = $("<div>").addClass('content').text("Well hello there! This is small 'window' example. It can be moved by using the handle (the green part). Click 'close' to close the window. Pretty self explanatory, I guess. Anyhow, enjoy some Lorem Ipsum.");          
            
            content.append("<br><br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi facilis mollitia placeat blanditiis omnis, asperiores eveniet nulla. Quae dolore officiis quod blanditiis hic. Qui repellendus natus omnis quae? Iusto, nobis?");
            content.append("<br><br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi facilis mollitia placeat blanditiis omnis, asperiores eveniet nulla. Quae dolore officiis quod blanditiis hic. Qui repellendus natus omnis quae? Iusto, nobis?");
            content.append("<br><br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi facilis mollitia placeat blanditiis omnis, asperiores eveniet nulla. Quae dolore officiis quod blanditiis hic. Qui repellendus natus omnis quae? Iusto, nobis?");
            content.append("<br><br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi facilis mollitia placeat blanditiis omnis, asperiores eveniet nulla. Quae dolore officiis quod blanditiis hic. Qui repellendus natus omnis quae? Iusto, nobis?");
            content.append("<br><br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi facilis mollitia placeat blanditiis omnis, asperiores eveniet nulla. Quae dolore officiis quod blanditiis hic. Qui repellendus natus omnis quae? Iusto, nobis?");
            content.append("<br><br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi facilis mollitia placeat blanditiis omnis, asperiores eveniet nulla. Quae dolore officiis quod blanditiis hic. Qui repellendus natus omnis quae? Iusto, nobis?");
            
            container.append(header).append(content).hide();
            
            $('body').append(container);
        }
    }
    Window.addWindow();
    $('#openWindow').click(() => {
        $('#testwindow').show();
    })

});