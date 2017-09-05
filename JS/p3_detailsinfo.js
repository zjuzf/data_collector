detailsinfo = function(constData, data)
{
    this.div = d3.select("#collapseThree").select("div")
    this.constData = constData
    this.data = data
    this.phaseGroup = new phaseGroup()
    $(document).ready(()=>{
        this.updateTime()
        this.addDropDown()
        this.updateDropdown("dropdown-player")
        this.updateDropdown("dropdown-action")
        this.updateDropdown("dropdown-detail")
        this.detailAction()
        this.clickEvent()
        this.disableButton()
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

    this.disableButton()
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
    let that = this
    let newName = `#${id} ul li`
    $(newName).on("click", function () {
        let val = $(this).text()
        $(`#${id} button.dropdown-toggle`).text(`${val} `).append(`<span class="caret"></span>`)
        that.disableButton()
    })
}

detailsinfo.prototype.detailAction = function () {
    $('#addAction').on("click", function () {
        if($('#addAction').hasClass('.disabled') === false){
            $('#detailList').append(`<li></li>`)
            $('#detailList li:last').addClass("list-group-item").text(function () {
                let qidStr = $(`#dropdown-detail button.dropdown-toggle`).text()
                let qidValue = $('#input-qvalue').val()
                return `${qidStr}: ${qidValue}`
            }).append(`<button type="button" class="close closeListGroup" aria-label="Close"><span aria-hidden="true">&times;</span></button>`)
        
            $('.closeListGroup').on("click", function () {
                $(this).parent().remove()
            })
        }
    })
}

detailsinfo.prototype.addDropDown = function()
{
    for(const eid of this.constData.eid){
        $('#dropdown-action ul').append(`<li><a>${eid}</a></li>`)
    }
    for(const qid of this.constData.qid){
        $('#dropdown-detail ul').append(`<li><a>${qid}</a></li>`)
    }
}

detailsinfo.prototype.disableButton = function()
{
    const playerVal = $.trim($('#dropdownMenu-player').text())
    const actionVal = $.trim($('#dropdownMenu-action').text())
    const detailVal = $.trim($('#dropdownMenu-detail').text())
    if(detailVal === `动作细节`)
        $('#addAction').prop('disabled', true)
    else
        $('#addAction').prop('disabled', false)

    if(playerVal === `球员` || actionVal === `动作`)
        $('#save-button').prop('disabled', true)
    else
        $('#save-button').prop('disabled', false)
}

phaseGroup = function() {
    this.phaseItem = `<a class="list-group-item"></a>`
    this.closeButton = `<button type="button" class="close closeListGroup" aria-label="Close"><span aria-hidden="true">×</span></button>`
    this.spanBadge = `<span class="badge">0</span>`
    this.phaseNum = 0
    this.phaseSelectedId = ""
    this.sequences = new Array()
    this.createPhase()
}

phaseGroup.prototype.createPhase = function() {
    let that = this
    $('#phase-group a:first').on("click", ()=>{
        this.phaseNum += 1
        $('#phase-group a:first').after(this.phaseItem)
        $('#phase-group a').removeClass('active')
        $('#phase-group a:nth-child(2)').addClass("phase-list").addClass("active").attr("id", `phase${this.phaseNum}`)
        .on("click", function(){
            $('#phase-group a').removeClass('active')
            $(this).addClass('active')
            that.phaseSelectedId = $(this).attr("id")
        })
        .append(`<div class="phaseText">阶段${this.phaseNum}</div>`).append(this.closeButton).append(this.spanBadge)

        this.sequences.push({'actions':new Array(), 'time':{'start':'', 'end':''}})

        $('#phase-group a:nth-child(2) .closeListGroup').on("click", function(){
            let id = parseInt(that.getLastChar($(this).parent().attr("id")))
            that.sequences.splice(id, 1)

            $(this).parent().remove()

            that.updatePhaseId()

            console.log(that.sequences)
        })
    })
}

phaseGroup.prototype.getLastChar = function(str){
    return str.charAt(str.length - 1)
}

phaseGroup.prototype.updatePhaseId = function(){
    let that = this
    let idLength = $('#phase-group').children(".phase-list").length
    $('#phase-group').children(".phase-list").each(function(index, element){
        let newId = idLength - index
        $(element).attr("id", `phase${newId}`)
        $(element).children(".phaseText").text(`阶段${newId}`)
    })
    this.phaseNum--
}


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