preview = function() {
    this.div = document.getElementById("preview_text");
    this.refresh();
};

preview.prototype.refresh = function() {
    var i, j, k;

    this.str = '';
    this.str += '{<br>';
    this.str += '"matchinfo":{<br>';
    this.str += '　　"date":{<br>';
    this.str += '　　　　"year":"'+data.matchinfo.date.year+'",<br>';
    this.str += '　　　　"month":"'+data.matchinfo.date.month+'",<br>';
    this.str += '　　　　"day":"'+data.matchinfo.date.day+'"<br>';
    this.str += '　　},<br>';
    this.str += '　　"time":{<br>';
    this.str += '　　　　"min":"'+data.matchinfo.time.min+'",<br>';
    this.str += '　　　　"sec":"'+data.matchinfo.time.sec+'"<br>';
    this.str += '　　},<br>';
    this.str += '　　"team0":"'+data.matchinfo.team0+'",<br>';
    this.str += '　　"team1":"'+data.matchinfo.team1+'",<br>';
    this.str += '　　"score0":"'+data.matchinfo.score0+'",<br>';
    this.str += '　　"score1":"'+data.matchinfo.score1+'",<br>';
    this.str += '　　"video":{<br>';
    this.str += '　　　　"path":"'+data.matchinfo.video.path+'",<br>';
    this.str += '　　　　"name":"'+data.matchinfo.video.name+'"<br>';
    this.str += '　　}<br>';
    this.str += '},<br>';
    this.str += '"players":{<br>';
    this.str += '　　"team0":[<br>';
for(i = 0; i < data.players.team0.length; i++) {
    this.str += '　　　　{"pid":"'+data.players.team0[i].pid+'",<br>';
    this.str += '　　　　"name":"'+data.players.team0[i].name+'",<br>';
    this.str += '　　　　"tid":"'+data.players.team0[i].tid+'",<br>';
    this.str += '　　　　"jersey":"'+data.players.team0[i].jersey+'",<br>';
    this.str += '　　　　"position":"'+data.players.team0[i].position+'"}';
    if(i != data.players.team0.length-1) this.str += ',';
    this.str += '<br>';
}
    this.str += '　　],<br>';
    this.str += '　　"team1":[<br>';
for(i = 0; i < data.players.team1.length; i++) {
    this.str += '　　　　{"pid":"'+data.players.team1[i].pid+'",<br>';
    this.str += '　　　　"name":"'+data.players.team1[i].name+'",<br>';
    this.str += '　　　　"tid":"'+data.players.team1[i].tid+'",<br>';
    this.str += '　　　　"jersey":"'+data.players.team1[i].jersey+'",<br>';
    this.str += '　　　　"position":"'+data.players.team1[i].position+'"}';
    if(i != data.players.team1.length-1) this.str += ',';
    this.str += '<br>';
}
    this.str += '　　]<br>';
    this.str += '},<br>';
    this.str += '"sequences":[<br>';
for(i = 0; i < data.sequences.length; i++) {
    this.str += '　　{<br>';
    this.str += '　　　　"actions":[<br>';
for(j = 0; j < data.sequences[i].actions.length; j++) {
    this.str += '　　　　　　{<br>';
    this.str += '　　　　　　　　"eid":"'+data.sequences[i].actions[j].eid+'",<br>';
    this.str += '　　　　　　　　"pid":"'+data.sequences[i].actions[j].pid+'",<br>';
    this.str += '　　　　　　　　"time":{<br>';
    this.str += '　　　　　　　　　　"min":"'+data.sequences[i].actions[j].time.min+'",<br>';
    this.str += '　　　　　　　　　　"sec":"'+data.sequences[i].actions[j].time.sec+'"<br>';
    this.str += '　　　　　　　　"},<br>';
    this.str += '　　　　　　　　"pos":{<br>';
    this.str += '　　　　　　　　　　"x":"'+data.sequences[i].actions[j].pos.x+'",<br>';
    this.str += '　　　　　　　　　　"y":"'+data.sequences[i].actions[j].pos.y+'"<br>';
    this.str += '　　　　　　　　},<br>';
    this.str += '　　　　　　　　"qualifiers":[<br>';
for(k = 0; k < data.sequences[i].actions[j].qualifiers.length; k++) {
    this.str += '　　　　　　　　　　{"qid":"'+data.sequences[i].actions[j].qualifiers[k].qid+'"<br>';
    this.str += '　　　　　　　　　　"value":"'+data.sequences[i].actions[j].qualifiers[k].value+'"}';
    if(k != data.sequences[i].actions[j].qualifiers.length-1) this.str += ',';
    this.str += '<br>';
}
    this.str += '　　　　　　　　"]<br>';
    this.str += '　　　　　　}';
    if(j != data.sequences[i].actions.length-1) this.str += ',';
    this.str += '<br>';
}
    this.str += '　　　　],<br>';
    this.str += '　　　　"time":{<br>';
    this.str += '　　　　　　"start":{<br>';
    this.str += '　　　　　　　　"min":"'+data.sequences[i].time.start.min+'",<br>';
    this.str += '　　　　　　　　"sec":"'+data.sequences[i].time.start.sec+'"<br>';
    this.str += '　　　　　　},<br>';
    this.str += '　　　　　　"end":{<br>';
    this.str += '　　　　　　　　"min":"'+data.sequences[i].time.start.min+'",<br>';
    this.str += '　　　　　　　　"sec":"'+data.sequences[i].time.start.sec+'"<br>';
    this.str += '　　　　　　}<br>';
    this.str += '　　　　}<br>';
    this.str += '　　}';
    if(i != data.sequences.length-1) this.str += ',';
    this.str += '<br>';
}
    this.str += ']<br>';
    this.str += '}<br>';

    this.div.innerHTML = this.str;

    this.isCommited = 0;
};

preview.prototype.commit = function() {
    if(this.check())
    {
        this.generateFile();
        this.isCommited = 1;
    }
};

preview.prototype.commited = function() {
    return this.isCommited;
};

preview.prototype.check = function() {
    var flag = 1;
    var ts;

    //check matchinfo
    if(flag && isNull(data.matchinfo.date.year)) existERR(ERR_dataMiss_Matchinfo_Date_Year);
    if(flag && isNull(data.matchinfo.date.month)) existERR(ERR_dataMiss_Matchinfo_Date_Month);
    if(flag && isNull(data.matchinfo.date.day)) existERR(ERR_dataMiss_Matchinfo_Date_Day);
    if(flag && isNull(data.matchinfo.time.min)) existERR(ERR_dataMiss_Matchinfo_Time_Min);
    if(flag && isNull(data.matchinfo.time.sec)) existERR(ERR_dataMiss_Matchinfo_Time_Sec);
    if(flag && isNull(data.matchinfo.team0)) existERR(ERR_dataMiss_Matchinfo_Team0);
    if(flag && isNull(data.matchinfo.team1)) existERR(ERR_dataMiss_Matchinfo_Team1);
    if(flag && isNull(data.matchinfo.score0)) existERR(ERR_dataMiss_Matchinfo_Score0);
    if(flag && isNull(data.matchinfo.score1)) existERR(ERR_dataMiss_Matchinfo_Score1);
    if(flag && isNull(data.matchinfo.video.name)) existERR(ERR_dataMiss_Matchinfo_Video);

    //check players
    if(flag) {
        ts = TeamStruct(0);
        if(ts.forward + ts.middle + ts.back + ts.goalkeeper == 0) existERR(ERR_dataMiss_Players_Team0);
        else
        {
            if(ts.forward + ts.middle + ts.back + ts.goalkeeper < 11 && ts.substitute > 0) existWNG(WNG_teamLackPlayers0);
            if(ts.forward == 0) existWNG(WNG_teamLackForward0);
            if(ts.middle == 0) existWNG(WNG_teamLackMiddle0);
            if(ts.back == 0) existWNG(WNG_teamLackBack0);
            if(ts.goalkeeper == 0) existWNG(WNG_teamLackGoalkeeper0);
        }
    }
    if(flag) {
        ts = TeamStruct(1);
        if(ts.forward + ts.middle + ts.back + ts.goalkeeper == 0) existERR(ERR_dataMiss_Players_Team1);
        else
        {
            if(ts.forward + ts.middle + ts.back + ts.goalkeeper < 11 && ts.substitute > 0) existWNG(WNG_teamLackPlayers1);
            if(ts.forward == 0) existWNG(WNG_teamLackForward1);
            if(ts.middle == 0) existWNG(WNG_teamLackMiddle1);
            if(ts.back == 0) existWNG(WNG_teamLackBack1);
            if(ts.goalkeeper == 0) existWNG(WNG_teamLackGoalkeeper1);
        }
    }

    // if(flag && isNull(data.)) existERR();

    return flag;

    function isNull(data) {return data===""||data===null||data===undefined;}
    function TeamStruct(team) {
        var players = team?data.players.team1:data.players.team0;
        var num = new Array(5);
        num[0]=num[1]=num[2]=num[3]=num[4]=0;
        for(var i = 0; i < players.length; i++)
            switch (players[i].position)
            {
                case "前锋": num[0]++;break;
                case "中场": num[1]++;break;
                case "后卫": num[2]++;break;
                case "守门员": num[3]++;break;
                case "替补": num[4]++;break;
            }
        return {
            forward: num[0],
            middle: num[1],
            back: num[2],
            goalkeeper: num[3],
            substitute: num[4]
        };
    }
    function existERR(error) {throwError(error);flag=0;}
    function existWNG(warning) {throwError(warning);}
};

preview.prototype.generateFile = function() {
    var point_idx = data.matchinfo.video.name.lastIndexOf('.');
    var filename = "MatchData_"+data.matchinfo.video.name.substring(0, point_idx);

    var filetype = ".json";

    var fileContent = this.str;
    try{
        fileContent=fileContent.replace(/<br>/g,"\n");
        fileContent=fileContent.replace(/　/g,"  ");
    }catch(e) {
        alert(e.message);
    }

    var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});

    saveAs(blob, filename+filetype);
};
