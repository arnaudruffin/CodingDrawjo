"use strict";
function prepareToDraw(socket) {
    var context,
        canvasDom;

    var personalColor = '#'+Math.floor(Math.random()*16777215).toString(16);

    initCanvas();

    function initCanvas() {
        //personalColour, holding the sample color
        var personalContext = $('#personalColour')[0].getContext('2d');
        personalContext.rect(0,0,10,10);
        personalContext.fillStyle=personalColor;
        personalContext.fill();

        canvasDom = $('#drawCanvas')[0];
        context = canvasDom.getContext('2d');
        context.fillStyle = "solid";
        context.strokeStyle = personalColor;
        context.lineWidth = 5;
        context.lineCap = "round";
    }

    var isPainting=false;
    function draw(x, y, type, color) {
        context.strokeStyle = color;
        if (type === "mousedown") {
            isPainting = true;
            context.beginPath();
            return context.moveTo(x, y);
        } else if (type === "mousemove" && isPainting) {
            context.lineTo(x, y);
            return context.stroke();
        } else {
            isPainting = false;
            return context.closePath();
        }
    }

    $('#drawCanvas').on('mousedown mousemove mouseup mouseleave', function (e) {
        context.strokeStyle = personalColor;
        var type = e.handleObj.type;
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        draw(x, y, type, personalColor);
        socket.emit('ijustdrewsomething', {
            x: x,
            y: y,
            type: type,
            color : personalColor
        });
    });

    socket.on('remoteuserdrewsomething', function (data) {
        return draw(data.x, data.y, data.type, data.color);
    });


    /*
     function clearDraw(){
     console.log("clearing (0,0) -> ("+canvasDom.width+","+canvasDom.height+")");
     context.clearRect(0, 0, canvasDom.width, canvasDom.height);
     }
     $("#clearBtn").on("click", function(e){
     e.preventDefault();
     clearDraw();
     socket.emit('clear_all');
     });
     */
}
