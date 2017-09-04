$(document).ready(function(){
    $("#videoplayer").on(
        "timeupdate",
        function(event){
            onTrackedVideoFrame(this.currentTime, this.duration);
        });

    $("#pause").on("click", function(){
        let player = $("#videoplayer")[0];
        if(player.paused){
            player.play()
        }
        else{
            player.pause()
        }
    })
    $("#field").on("click",function(){
        let player = $("#videoplayer")[0];
        if(player.paused){
            setTimeout(player.play(), 500);
        }
        else{
            player.pause()
        }

        mouseMove(event)

        function mouseMove(ev)
        {
            Ev= ev || window.event;
            var mousePos = mouseCoords(ev);
            $("#xxx").text (((mousePos.x-816)/6.8).toFixed(1));
            $("#yyy").text (((mousePos.y-204.5)/4.5).toFixed(1));
        }
        function mouseCoords(ev)
        {
            if(ev.pageX || ev.pageY){
                return {x:ev.pageX, y:ev.pageY};
            }
            return{
                x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y:ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        }
    })
});

function onTrackedVideoFrame(currentTime, duration){
    $("#current").text(currentTime);
    $("#duration").text(duration);
}