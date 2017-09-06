matchinfo = function(database) {
    this.database = database;

    this.div = d3.select("#collapseOne").select("div");

    this.handleData();
    this.createElements();
};
matchinfo.prototype.handleData = function() {
    var i;

    this.teamList = this.database.teams;
};
matchinfo.prototype.createElements = function() {
    var i;

    //date input
    this.date = this.div.append("div")
        .attr("class", "input-group");
    this.date.append("span")
        .attr("class", "input-group-addon")
        .text("比赛日期");
    this.date.append("span")
        .attr("class", "input-group-addon")
        .text("年");
    this.date.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_date_year")
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","yyyy")
        .attr("onchange","changeDate()");
    this.date.append("span")
        .attr("class", "input-group-addon")
        .text("月");
    this.date.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_date_month")
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","mm")
        .attr("onchange","changeDate()");
    this.date.append("span")
        .attr("class", "input-group-addon")
        .text("日");
    this.date.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_date_day")
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","dd")
        .attr("onchange","changeDate()");

    this.div.append("br");

    //time input
    this.time = this.div.append("div")
        .attr("class", "input-group");
    this.time.append("span")
        .attr("class", "input-group-addon")
        .text("比赛用时");
    this.time.append("span")
        .attr("class", "input-group-addon")
        .text("分");
    this.time.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_time_min")
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","mm")
        .attr("onchange","changeTime()");
    this.time.append("span")
        .attr("class", "input-group-addon")
        .text("秒");
    this.time.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_time_sec")
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","ss")
        .attr("onchange","changeTime()");

    this.div.append("br");

    //team select & score
    this.teams = this.div.append("div")
        .attr("class", "row box");
    this.team0 = this.teams.append("div")
        .attr("class", "col-md-6")
        .append("div")
        .attr("class", "input-group");
    this.team0.append("span")
        .attr("class", "input-group-addon")
        .text("主队");
    this.team0.append("span")
        .attr("class", "input-group-addon")
        .text("队名");
    this.team0.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_team0")
        .attr("aria-describedby","basic-addon3")
        .attr("onchange","changeTeam()");
    this.team0_sel = this.team0.append("div")
        .attr("class", "input-group-btn");
    this.team0_sel.append("button")
        .attr("type","button")
        .attr("class","btn btn-default dropdown-toggle")
        .attr("data-toggle","dropdown")
        .attr("aria-haspopup","true")
        .attr("aria-expanded","false")
        .append("span")
        .attr("class","caret");
    this.team0_sel.append("ul")
        .attr("class", "dropdown-menu");
    for(i=0;i<this.teamList.length;i++)
        this.team0_sel.select("ul")
            .append("li")
            .attr("class","team_list")
            .attr("onclick", "clickTeam(0,"+i+")")
            .append("a")
            .text(this.teamList[i].tid + "　" +this.teamList[i].name);
    this.team0.append("span")
        .attr("class", "input-group-addon")
        .text("比分");
    this.team0.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_score0")
        .attr("aria-describedby","basic-addon3")
        .attr("onchange","changeScore()");
    this.team1 = this.teams.append("div")
        .attr("class", "col-md-6")
        .append("div")
        .attr("class", "input-group");
    this.team1.append("span")
        .attr("class", "input-group-addon")
        .text("客队");
    this.team1.append("span")
        .attr("class", "input-group-addon")
        .text("队名");
    this.team1.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_team1")
        .attr("aria-describedby","basic-addon3")
        .attr("onchange","changeTeam()");
    this.team1_sel = this.team1.append("div")
        .attr("class", "input-group-btn");
    this.team1_sel.append("button")
        .attr("type","button")
        .attr("class","btn btn-default dropdown-toggle")
        .attr("data-toggle","dropdown")
        .attr("aria-haspopup","true")
        .attr("aria-expanded","false")
        .append("span")
        .attr("class","caret");
    this.team1_sel.append("ul")
        .attr("class", "dropdown-menu");
    for(i=0;i<this.teamList.length;i++)
        this.team1_sel.select("ul")
            .append("li")
            .attr("class","team_list")
            .attr("onclick", "clickTeam(1,"+i+")")
            .append("a")
            .text(this.teamList[i].tid + "　" +this.teamList[i].name);
    this.team1.append("span")
        .attr("class", "input-group-addon")
        .text("比分");
    this.team1.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_score1")
        .attr("aria-describedby","basic-addon3")
        .attr("onchange","changeScore()");
    this.div.append("br");

    //video select
    this.video = this.div.append("div")
        .attr("class","input-group");
    this.video.append("span")
        .attr("class", "input-group-addon")
        .text("视频数据");
    this.video.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "input_txt_fileName")
        .attr("aria-describedby","basic-addon3");
    this.uploadFile = this.video.append("span")
        .attr("class", "input-group-btn");
    this.uploadFile.append("label")
        .attr("class", "btn btn-default")
        .attr("for","input_file_uploadFile")
        .text("选择");
    this.uploadFile.append("form")
        .append("input")
        .attr("type","file")
        .attr("id","input_file_uploadFile")
        .attr("style","position:absolute;clip:rect(0 0 0 0);")
        .attr("accept","video/mp4")
        .attr("onchange","changeFile()");
};

function changeDate() {
    var year = document.getElementById("input_txt_date_year").value;
    var month = document.getElementById("input_txt_date_month").value;
    var day = document.getElementById("input_txt_date_day").value;

    var r = /^[-+]?\d*$/;
    var current_date = new Date();
    var current_year = current_date.getFullYear();
    var current_month = current_date.getMonth() + 1;
    var current_day = current_date.getDate();
    var flag = 1;

    data.matchinfo.date.year = "";
    data.matchinfo.date.month = "";
    data.matchinfo.date.day = "";
    document.getElementById("input_txt_date_year").value = "";
    document.getElementById("input_txt_date_month").value = "";
    document.getElementById("input_txt_date_day").value = "";

    if(flag && year != null && year != "") {
        year = +year;
        if(flag && !r.test(year))
        {
            throwError(ERR_notInt);
            flag = 0;
        }
        if(flag && year > current_year)
        {
            throwError(ERR_dateOverflow);
            flag = 0;
        }
        if(flag && year == 0)
        {
            throwError(ERR_yearZero);
            flag = 0;
        }

        if(flag)
        {
            data.matchinfo.date.year = year;
            document.getElementById("input_txt_date_year").value = year;
        }
    }
    if(flag && month != null && month != "") {
        month = +month;
        if(flag && !r.test(month))
        {
            throwError(ERR_notInt);
            flag = 0;
        }
        if(flag && (month < 1 || month > 12))
        {
            throwError(ERR_monthNotAllowed);
            flag = 0;
        }
        if(flag && year == current_year && month > current_month)
        {
            throwError(ERR_dateOverflow);
            flag = 0;
        }

        if(flag)
        {
            data.matchinfo.date.month = month;
            document.getElementById("input_txt_date_month").value = month;
        }

    }
    if(flag && day != null && day != "") {
        day = +day;
        if(flag && !r.test(day))
        {
            throwError(ERR_notInt);
            flag = 0;
        }
        if(flag &&
            (day<1 ||
            day>31 ||
            ((month==4 || month==6 || month==9 || month==11) && day>30) ||
            (month==2 && (((year%4==0 && year%100!=0)||(year%400==0))?(day>29):(day>28)))))
        {
            throwError(ERR_dayNotAllowed);
            flag = 0;
        }
        if(flag && (year == current_year && month == current_month && day > current_day))
        {
            throwError(ERR_dateOverflow);
            flag = 0;
        }

        if(flag)
        {
            data.matchinfo.date.day = day;
            document.getElementById("input_txt_date_day").value = day;
        }
    }

    p4.refresh();
}
function changeTime() {
    var min = document.getElementById("input_txt_time_min").value;
    var sec = document.getElementById("input_txt_time_sec").value;

    var r = /^[-+]?\d*$/;
    var flag;

    data.matchinfo.time.min = "";
    data.matchinfo.time.sec = "";
    document.getElementById("input_txt_time_min").value = "";
    document.getElementById("input_txt_time_sec").value = "";

    if(min != null && min != "")
    {
        min = +min;
        flag = 1;
        if(!r.test(min))
        {
            throwError(ERR_notInt);
            flag = 0;
        }
        if(flag && min < 0)
        {
            throwError(ERR_timeMistake);
            flag = 0;
        }

        if(flag)
        {
            data.matchinfo.time.min = min;
            document.getElementById("input_txt_time_min").value = min;
        }
    }
    if(sec != null && sec != "")
    {
        sec = +sec;
        flag = 1;
        if(!r.test(sec))
        {
            throwError(ERR_notInt);
            flag = 0;
        }
        if(flag && (sec < 0 || sec > 60))
        {
            throwError(ERR_timeMistake);
            flag = 0;
        }

        if(flag)
        {
            data.matchinfo.time.sec = sec;
            document.getElementById("input_txt_time_sec").value = sec;
        }
    }

    p4.refresh();
}
function clickTeam(team, id) {
    if(team == 0)
        if(p1.teamList[id].tid != data.matchinfo.team1)
        {
            data.matchinfo.team0 = p1.teamList[id].tid;
            document.getElementById("input_txt_team0").value = p1.teamList[id].name;
        }
        else throwError(ERR_teamRepeat);
    if(team == 1)
        if(p1.teamList[id].tid != data.matchinfo.team0)
        {
            data.matchinfo.team1 = p1.teamList[id].tid;
            document.getElementById("input_txt_team1").value = p1.teamList[id].name;
        }
        else throwError(ERR_teamRepeat);

    p2.changeTeam();
    p3.addPlayer();
}
function changeTeam() {
    var team0 = document.getElementById("input_txt_team0").value;
    var team1 = document.getElementById("input_txt_team1").value;
    var origin_team0 = data.matchinfo.team0;
    var origin_team1 = data.matchinfo.team1;

    var flag;
    var i;

    data.matchinfo.team0 = "";
    data.matchinfo.team1 = "";
    document.getElementById("input_txt_team0").value = "";
    document.getElementById("input_txt_team1").value = "";

    if(team0 != null && team0 != "" && team1 != null && team1 != "" && (team0 == team1 || team0 == origin_team1 || team1 == origin_team0))
    {
        throwError(ERR_teamRepeat);
        recovery(0);
        recovery(1);
    }
    else
    {
        if(team0 != null && team0 != "")
        {
            for(i = 0; i < p1.teamList.length; i++)
                if(p1.teamList[i].name == team0 || p1.teamList[i].tid == team0) break;
            if(i == p1.teamList.length)
            {
                throwError(ERR_teamNotFound);
                recovery(0);
            }
            else
            {
                data.matchinfo.team0 = p1.teamList[i].tid;
                document.getElementById("input_txt_team0").value = p1.teamList[i].name;
            }
        }
        if(team1 != null && team1 != "")
        {
            for(i = 0; i < p1.teamList.length; i++)
                if(p1.teamList[i].name == team1 || p1.teamList[i].tid == team1) break;
            if(i == p1.teamList.length)
            {
                throwError(ERR_teamNotFound);
                recovery(1);
            }
            else
            {
                data.matchinfo.team1 = p1.teamList[i].tid;
                document.getElementById("input_txt_team1").value = p1.teamList[i].name;
            }
        }
    }

    p2.changeTeam();
    p3.addPlayer();

    function recovery(id)
    {
        switch(id)
        {
            case 0:
                for(i = 0; i < p1.teamList.length; i++)
                    if(p1.teamList[i].tid == origin_team0) break;
                if(i != p1.teamList.length)
                {
                    data.matchinfo.team0 = p1.teamList[i].tid;
                    document.getElementById("input_txt_team0").value = p1.teamList[i].name;
                }
                break;
            case 1:
                for(i = 0; i < p1.teamList.length; i++)
                    if(p1.teamList[i].tid == origin_team1) break;
                if(i != p1.teamList.length)
                {
                    data.matchinfo.team1 = p1.teamList[i].tid;
                    document.getElementById("input_txt_team1").value = p1.teamList[i].name;
                }
                break;
        }
    }
}
function changeScore() {
    var score0 = document.getElementById("input_txt_score0").value;
    var score1 = document.getElementById("input_txt_score1").value;

    var r = /^[-+]?\d*$/;
    var flag;

    data.matchinfo.score0 = "";
    data.matchinfo.score1 = "";
    document.getElementById("input_txt_score0").value = "";
    document.getElementById("input_txt_score1").value = "";

    if(score0 != null && score0 != "") {
        score0 = +score0;
        flag = 1;
        if(!r.test(score0))
        {
            throwError(ERR_notInt);
            flag = 0;
        }
        if(flag && score0 < 0)
        {
            throwError(ERR_scoreOverflow);
            flag = 0;
        }

        if(flag)
        {
            data.matchinfo.score0 = score0;
            document.getElementById("input_txt_score0").value = score0;
        }
    }
    if(score1 != null && score1 != "") {
        score1 = +score1;
        flag = 1;
        if(!r.test(score1))
        {
            throwError(ERR_notInt);
            flag = 0;
        }
        if(flag && score1 < 0)
        {
            throwError(ERR_scoreOverflow);
            flag = 0;
        }

        if(flag)
        {
            data.matchinfo.score1 = score1;
            document.getElementById("input_txt_score1").value = score1;
        }
    }

    p4.refresh();
}
function changeFile() {
    var file = document.getElementById("input_file_uploadFile").value;
    var name_idx = file.lastIndexOf("\\");
    var name = file.substring(name_idx+1);
    var path = "./Matches/";

    var txt = document.getElementById("input_txt_fileName");

    txt.value = name;

    data.matchinfo.video.path = path;
    data.matchinfo.video.name = name;

    document.getElementById("videoplayer").src = path+name;

    p4.refresh();
}