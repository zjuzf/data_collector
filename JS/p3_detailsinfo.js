detailsinfo = function(constData, data)
{
    this.div = d3.select("#collapseThree").select("div")
    this.constData = constData
    this.data = data
    $(document).ready(()=>{
        this.updateTime()
        this.addDropDown()
        this.updateDropdown("dropdown-player")
        this.updateDropdown("dropdown-action")
        this.updateDropdown("dropdown-detail")
        this.detailAction()
        this.clickEvent()
    })

};



detailsinfo.prototype.clickEvent = function()
{
    $("#pause").on("click", ()=>{
        let player = $("#videoplayer")[0]
        if(player.paused){
            player.play()
        }
        else{
            player.pause()
        }
    })

    $("#field").on("click",()=>{
        let player = $("#videoplayer")[0]
        player.pause()
        let coor = mouseMove(event)
        this.popModal(coor)
    })
}

detailsinfo.prototype.popModal = function(coor)
{
    $('#collector').modal({backdrop: 'static', keyboard: false})

    let time = this.dealTime()
    $('#input-min').val(time.min)
    $('#input-sec').val(time.sec)

    $('#input-x').val(coor.x)
    $('#input-y').val(coor.y)

    $('#detailList').children().remove()

}

detailsinfo.prototype.dealTime = function () {
    let time = $('#current').text()
    let min = (time / 60).toFixed(0)
    let sec = (time % 60).toFixed(1)
    return {min, sec}
}

detailsinfo.prototype.updateTime = function ()
{
    $("#videoplayer").on(
        "timeupdate",
        function(){
            onTrackedVideoFrame(this.currentTime, this.duration)
        });
}

detailsinfo.prototype.updateDropdown = function (id) {
    let newName = `#${id} ul li`
    $(newName).on("click", function () {
        let val = $(this).text()
        $(`#${id} button.dropdown-toggle`).text(`${val} `).append(`<span class="caret"></span>`)
    })
}

detailsinfo.prototype.detailAction = function () {
    $('#addAction').on("click", function () {
        $('#detailList').append(`<li></li>`)
        $('#detailList li:last').addClass("list-group-item").text(function () {
            return $(`#dropdown-detail button.dropdown-toggle`).text()
        }).append(`<button type="button" class="close closeListGroup" aria-label="Close"><span aria-hidden="true">&times;</span></button>`)
        $('.closeListGroup').on("click", function () {
            $(this).parent().remove()
        })
    })
}

detailsinfo.prototype.addDropDown = function()
{
    for(const eid of this.constData.eid){
        $('#dropdown-action ul').append(`<li><a href="#">${eid}</a></li>`)
    }
    for(const qid of this.constData.qid){
        $('#dropdown-detail ul').append(`<li><a href="#">${qid}</a></li>`)    
    }
}

function mouseMove(ev)
{
    Ev= ev || window.event
    let mousePos = mouseCoords(ev)
    let fieldPos = {x:((mousePos.x-816)/6.8).toFixed(1), y:((mousePos.y-204.5)/4.5).toFixed(1)}
    $("#xxx").text(fieldPos.x)
    $("#yyy").text(fieldPos.y)
    return fieldPos
}

function mouseCoords(ev)
{
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:ev.pageY}
    }
    return{
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.body.scrollTop - document.body.clientTop
    }
}

function onTrackedVideoFrame(currentTime, duration){
    $("#current").text(currentTime.toFixed(1))
    $("#duration").text(duration.toFixed(1))
}