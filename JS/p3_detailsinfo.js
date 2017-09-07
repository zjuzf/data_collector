detailsinfo = function(data) {
    this.div = d3.select("#collapseThree").select("div")
    this.data = data
    this.phaseGroup = new phaseGroup()
    this.actionsGroup = new actionsGroup(this.phaseGroup)
    this.phaseGroup.setActionsGroup(this.actionsGroup)
    this.phaseGroup.createPhase()
    $(document).ready(()=>{
        this.updateTime()
        this.saveAction()
        this.addDropDown()
        this.updateDropdown("dropdown-player")
        this.updateDropdown("dropdown-action")
        this.updateDropdown("dropdown-detail")
        this.detailAction()
        this.clickEvent()
        this.cleanUpEvent()
        this.disableButton()
    })

}

detailsinfo.prototype.clickEvent = function() {
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
        this.actionsGroup.actionSelectedId = -1;
        let player = $("#videoplayer")[0]
        player.pause()
        let coor = mouseMove(event)
        if(this.phaseGroup.phaseSelectedId !== "")
            this.popModal(coor)
        else
            throwError(ERR_notSelectPhase)
    })

    this.disableButton()
}

detailsinfo.prototype.popModal = function(coor) {
    console.log(this.phaseGroup.phaseSelectedId)
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

detailsinfo.prototype.updateTime = function () {
    $("#videoplayer").on(
        "timeupdate",
        function(){
            onTrackedVideoFrame(this.currentTime, this.duration)
        })
}

detailsinfo.prototype.updateDropdown = function (id) {
    let that = this
    let newName = `#${id} ul li`
    $(newName).on("click", function () {
        let val = $(this).text()
        let liId = parseInt(getLastNum($(this).attr("id")))
        $(`#${id} button.dropdown-toggle`).text(`${val} `)
            .val(liId)
            .append(`<span class="caret"></span>`)
        that.disableButton()
    })
}

detailsinfo.prototype.detailAction = function () {
    $('#addAction').on("click", function () {
        if($('#addAction').hasClass('.disabled') === false){
            let qidStr = $(`#dropdown-detail button.dropdown-toggle`).text()
            let qidValue = $('#input-qvalue').val()

            $('#detailList').append(`<li></li>`)
            $('#detailList li:last').addClass("list-group-item")
            .val(()=>$('#dropdownMenu-detail').val())
            .attr("qvalue", qidValue)
            .text(function () {
                return `${qidStr}: ${qidValue}`
            }).append(`<button type="button" class="close closeListGroup" aria-label="Close"><span aria-hidden="true">&times;</span></button>`)
        
            $('.closeListGroup').on("click", function () {
                $(this).parent().remove()
            })
        }
    })
}

detailsinfo.prototype.saveAction = function () {
    $('#save-button').on('click', ()=>{
        this.getModalData()
        console.log(this.phaseGroup.sequences)
        $('#collector').modal('toggle')
    })
}

detailsinfo.prototype.getModalData = function () {
    let actionTime = new Time($('#input-min').val(), $('#input-sec').val())
    let actionX = $('#input-x').val()
    let actionY = $('#input-y').val()
    let actionPid = data.players.team0[$('#dropdownMenu-player').val()].pid
    let actionEid = this.data.events[$('#dropdownMenu-action').val()].eid
    let actionQualifiers = this.getQualifiers()
    let id = getLastNum(this.phaseGroup.phaseSelectedId)

    let selectSequence = this.phaseGroup.sequences[id - 1]

    if(this.actionsGroup.actionSelectedId != -1)
        selectSequence.actions.splice(this.actionsGroup.actionSelectedId,1,new Action(actionTime, actionX, actionY, actionPid, actionEid, actionQualifiers))
    else selectSequence.actions.push(new Action(actionTime, actionX, actionY, actionPid, actionEid, actionQualifiers))

    $(`#${this.phaseGroup.phaseSelectedId} .badge`).text(selectSequence.actions.length)

    selectSequence.actions.sort((a, b)=> {
        return a.time.min === b.time.min ? a.time.sec - b.time.sec : a.time.min - b.time.min
    })

    selectSequence.time.start = selectSequence.actions[0].time
    selectSequence.time.end = selectSequence.actions[selectSequence.actions.length - 1].time

    this.actionsGroup.refresh()
}

detailsinfo.prototype.cleanUpEvent = function () {
    $('#collector').on('hidden.bs.modal', ()=> {
        $('#dropdownMenu-player').html(`球员<span class="caret"></span>`)
        $('#dropdownMenu-action').html(`动作<span class="caret"></span>`)
        $('#dropdownMenu-detail').html(`动作细节<span class="caret"></span>`)
        $('#input-qvalue').val('')
    })
}

detailsinfo.prototype.getQualifiers = function () {
    let qualifiersList = []
    let qualifiersIndexList = $('#detailList').children()
    for(let i = 0; i < qualifiersIndexList.length; i++){
        let index = $(qualifiersIndexList[i]).val()
        let value = $(qualifiersIndexList[i]).attr("qvalue")
        let tempQualifier = new Qualifier(this.data.qualifiers[index].qid, value)
        qualifiersList.push(tempQualifier)
    }
    return qualifiersList
}

detailsinfo.prototype.addDropDown = function() {
    this.addPlayer()
    this.data.events.forEach((event, i)=>{
        $('#dropdown-action ul')
            .append(`<li id="action-${i}"><a>${event.name} ${event.code}</a></li>`)
    })
    this.data.qualifiers.forEach((qualifier, i)=>{
        $('#dropdown-detail ul')
            .append(`<li id="detail-${i}"><a>${qualifier.name} ${qualifier.code}</a></li>`)
    })
}

detailsinfo.prototype.addPlayer = function() {
    $('#dropdown-player ul').children().remove()
    
    data.players.team0.forEach((player, i)=>{
        $('#dropdown-player ul').append(`<li id=player-${i}><a>名字:${player.name}
            号码:${player.jersey} 位置:${player.position}</a></li>`)
    })
    this.updateDropdown("dropdown-player")
}

detailsinfo.prototype.disableButton = function() {
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
            that.actionsGroup.refresh();
        })
        .append(`<div class="phaseText">阶段${this.phaseNum}</div>`).append(this.closeButton).append(this.spanBadge)

        this.phaseSelectedId = `phase${this.phaseNum}`
        this.sequences.push(new Sequence())

        $('#phase-group a:nth-child(2) .closeListGroup').on("click", function(){
            let id = parseInt(getLastNum($(this).parent().attr("id")))
            that.sequences.splice(id - 1, 1)

            $(this).parent().remove()

            that.updatePhaseId()

            if(that.sequences.length != 0)
            {
                let selectPhaseItem = $('#phase-group a:nth-child(2)')
                selectPhaseItem.addClass('active')
                that.phaseSelectedId = selectPhaseItem.attr('id')
            }
            else
                that.phaseSelectedId = ""
            console.log(that.sequences)
            that.actionsGroup.refresh();
        })
        that.actionsGroup.refresh();
    })
}

phaseGroup.prototype.updatePhaseId = function() {
    let that = this
    let idLength = $('#phase-group').children(".phase-list").length
    $('#phase-group').children(".phase-list").each(function(index, element){
        let newId = idLength - index
        $(element).attr("id", `phase${newId}`)
        $(element).children(".phaseText").text(`阶段${newId}`)
    })
    this.phaseNum--
    this.actionsGroup.refresh()
}

phaseGroup.prototype.setActionsGroup = function(actionsGroup) {
    this.actionsGroup = actionsGroup;
}

actionsGroup = function(phaseGroup) {
    this.actionsNum = 0;
    this.actionSelectedId = -1;
    this.phaseGroup = phaseGroup;
    this.close = 0;
};

actionsGroup.prototype.refresh = function() {
    let that = this;
    let phaseSelected = getLastNum(this.phaseGroup.phaseSelectedId);
    let sequence = this.phaseGroup.sequences[phaseSelected-1];
    if(sequence == undefined) return;

    refreshTitle();
    refreshContent();

    function refreshTitle() {
        let duringTime = "";
        if(sequence.actions.length != 0)
            duringTime = "(" + sequence.time.start.min + ":" + sequence.time.start.sec + "~" +
                sequence.time.end.min + ":" + sequence.time.end.sec + ")";
        $('#actions-group')[0].innerHTML = '<a class="list-group-item">动作列表'+duringTime+'</a>';
    }
    function refreshContent() {
        let inner = "";
        for(let i = 0; i < sequence.actions.length; i++)
        {
            inner += '<a class="list-group-item" id="action'+(i+1)+'" onclick="selectAction('+i+')">';
            inner += '动作'+(i+1);
            inner += '<button type="button" class="close closeListGroup" aria-label="Close" onclick="deleteAction('+i+')">';
            inner += '<span aria-hidden="true">×</span>';
            inner += '</button>';
            inner += '</a>';
        }
        $('#actions-group')[0].innerHTML += inner;
    }
};

function getLastNum(str) {
    return str.match(/\d+$/)[0]
}

function getTop(e) {
    let offset=e.offsetTop
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent)
    return offset
}

function getLeft(e) {
    let offset=e.offsetLeft
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent)
    return offset
}

function mouseMove(ev) {
    Ev= ev || window.event
    let mousePos = mouseCoords(ev)
    let e = document.getElementById("field")
    let width = e.offsetWidth 
    let height = e.offsetHeight
    let x=getLeft(e)
    let y=getTop(e)
    let fieldPos = {x:((mousePos.x-x)/width*100).toFixed(1), y:((mousePos.y-y)/height*100).toFixed(1)}
    $("#xxx").text(fieldPos.x)
    $("#yyy").text(fieldPos.y)
    return fieldPos
}

function mouseCoords(ev) {
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

function selectAction(idx) {
    if(p3.actionsGroup.close) {
        p3.actionsGroup.close = 0;
        return;
    }

    p3.actionsGroup.actionSelectedId = idx;
    let phaseSelected = getLastNum(p3.phaseGroup.phaseSelectedId)
    let sequence = p3.phaseGroup.sequences[phaseSelected-1];
    let action = sequence.actions[idx];
    let i;

    $('#collector').modal({backdrop: 'static', keyboard: false});

    $('#input-min').val(action.time.min);
    $('#input-sec').val(action.time.sec);

    $('#input-x').val(action.x);
    $('#input-y').val(action.y);

    for(i=0;i<p3.data.players.length;i++)
        if(p3.data.players[i].pid == action.pid) break;
    let player=p3.data.players[i];
    $('#dropdownMenu-player').text(`名字:${player.name} 号码:${player.jersey} 位置:${player.position}`).append(`<span class="caret"></span>`);

    for(i=0;i<p3.data.events.length;i++)
        if(p3.data.events[i].eid == action.eid) break;
    let event=p3.data.events[i];
    $('#dropdownMenu-action').text(`${event.name} ${event.code}`).append(`<span class="caret"></span>`);

    $('#detailList').children().remove();
    for(let j=0;j<action.qualifiers.length;j++) {
        for(i=0;i<p3.data.qualifiers.length;i++)
            if(p3.data.qualifiers[i].qid == action.qualifiers[j].qid) break;
        let qualifier=p3.data.qualifiers[i];
        let qidStr = `${qualifier.name} ${qualifier.code}`;
        let qidValue = action.qualifiers[j].value;

        $('#detailList').append(`<li></li>`);
        $('#detailList li:last').addClass("list-group-item")
            .val(()=>$('#dropdownMenu-detail').val())
            .attr("qvalue", qidValue)
            .text(function () {
                return `${qidStr}: ${qidValue}`
            })
            .append(`<button type="button" class="close closeListGroup" aria-label="Close"><span aria-hidden="true">&times;</span></button>`);

        $('.closeListGroup').on("click", function () {
            $(this).parent().remove()
        });
    }
}

function deleteAction(idx) {
    p3.actionsGroup.close = 1;

    let phaseSelected = getLastNum(p3.phaseGroup.phaseSelectedId);
    let sequence = p3.phaseGroup.sequences[phaseSelected-1];

    sequence.actions.splice(idx, 1);
    $(`#${p3.phaseGroup.phaseSelectedId} .badge`).text(sequence.actions.length);
    if(sequence.actions.length != 0)
    {
        sequence.time.start = sequence.actions[0].time;
        sequence.time.end = sequence.actions[sequence.actions.length-1].time;
    }

    p3.actionsGroup.refresh();
}