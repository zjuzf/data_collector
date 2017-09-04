$(document).ready(function(){
    updateTime()
    updateDropdown("dropdown-player")
    updateDropdown("dropdown-action")

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
        player.pause();
        let coor = mouseMove(event);
        popModal(coor)
    })

});

function popModal(coor)
{
    $('#collector').modal({backdrop: 'static', keyboard: false})

    let time = dealTime()
    $('#input-min').val(time.min)
    $('#input-sec').val(time.sec)

    $('#input-x').val(coor.x)
    $('#input-y').val(coor.y)

}

function dealTime() {
    let time = $('#current').text()
    let min = (time / 60).toFixed(0)
    let sec = (time % 60).toFixed(1)
    return {min, sec}
}

function updateTime()
{
    $("#videoplayer").on(
        "timeupdate",
        function(event){
            onTrackedVideoFrame(this.currentTime, this.duration);
        });
}

function updateDropdown(id) {
    let newName = `#${id} ul li`
    $(newName).on("click", function () {
        let val = $(this).text()
        $(this).parent().prev().text(`${val} `).append(`<span class="caret"></span>`)
        console.log($(this).text())
    })
}

function mouseMove(ev)
{
    Ev= ev || window.event;
    let mousePos = mouseCoords(ev);
    let fieldPos = {x:((mousePos.x-816)/6.8).toFixed(1), y:((mousePos.y-204.5)/4.5).toFixed(1)}
    $("#xxx").text(fieldPos.x);
    $("#yyy").text(fieldPos.y);
    return fieldPos
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

function onTrackedVideoFrame(currentTime, duration){
    $("#current").text(currentTime.toFixed(1));
    $("#duration").text(duration.toFixed(1));
}