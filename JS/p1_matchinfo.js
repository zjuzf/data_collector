matchinfo = function(database, data)
{
    this.database = database;
    this.data = data;

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
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","yyyy");
    this.date.append("span")
        .attr("class", "input-group-addon")
        .text("月");
    this.date.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","mm");
    this.date.append("span")
        .attr("class", "input-group-addon")
        .text("日");
    this.date.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","dd");

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
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","mm");
    this.time.append("span")
        .attr("class", "input-group-addon")
        .text("秒");
    this.time.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("aria-describedby","basic-addon3")
        .attr("placeholder","ss");

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
        .attr("aria-describedby","basic-addon3");
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
            .append("a")
            .attr("href","#")
            .text(this.teamList[i].name);
    this.team0.append("span")
        .attr("class", "input-group-addon")
        .text("比分");
    this.team0.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("aria-describedby","basic-addon3");
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
        .attr("aria-describedby","basic-addon3");
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
            .append("a")
            .attr("href","#")
            .text(this.teamList[i].name);
    this.team1.append("span")
        .attr("class", "input-group-addon")
        .text("比分");
    this.team1.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("aria-describedby","basic-addon3");
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
        .attr("aria-describedby","basic-addon3");
    this.uploadFile = this.video.append("span")
        .attr("class", "input-group-btn");
    this.uploadFile.append("label")
        .attr("class", "btn btn-default")
        .attr("for","uploadFile")
        .text("选择");
    this.uploadFile.append("form")
        .append("input")
        .attr("type","file")
        .attr("id","uploadFile")
        .attr("style","position:absolute;clip:rect(0 0 0 0);")
        .attr("accept","video/mp4");
};