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
        function getTop(e){
            var offset=e.offsetTop;
            if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
            return offset;
        }
        function getLeft(e){
            var offset=e.offsetLeft;
            if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
            return offset;
        }
        function mouseMove(ev)
        {
            Ev= ev || window.event;
            var mousePos = mouseCoords(ev);
            var e = document.getElementById("field")
            var width = e.offsetWidth ;
            var height =e.offsetHeight;
            var x=getLeft(e)
            var y=getTop(e)
            $("#xxx").text (((mousePos.x-x)/width*100).toFixed(1));
            $("#yyy").text (((mousePos.y-y)/height*100).toFixed(1));
            console.log("width height",width, height)
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
    $("#current").text(currentTime.toFixed(1));
    $("#duration").text(duration.toFixed(1));
}