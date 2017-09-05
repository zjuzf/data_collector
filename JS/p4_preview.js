preview = function() {
    this.div = document.getElementById("preview_text");
    this.refresh();
};

preview.prototype.refresh = function() {
    var i;

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
    // if(flag && isNull(data.)) existERR();

    return flag;

    function isNull(data) {return data===""||data===null||data===undefined;}
    function existERR(error) {throwError(error);flag=0;}
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
