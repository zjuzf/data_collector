playersinfo = function(database){
    this.database = database;

    this.div = document.getElementById("collapseTwoBody");
    this.players = new Array(2);
    this.players[0] = new Array();
    this.players[1] = new Array();
    this.teams = new Array(2);
    this.teams[0] = "";
    this.teams[1] = "";

    this.createElements();
};
playersinfo.prototype.createElements = function() {
    this.div.innerHTML =
        "<div class='container-fluid'>" +
        "   <div class='row box'>" +
        "       <div class='col-md-6'>" +
        "           <div class=\"panel panel-default\">\n" +
        "                <div class=\"panel-heading\">\n" +
        "                    <h3 id=\"team0_title\" class=\"panel-title\">主队</h3>\n" +
        "                </div>\n" +
        "                <div id=\"team0_players\" class=\"panel-body team_players\">\n" +
        "                </div>\n" +
        "           </div>" +
        "       </div>" +
        "       <div class='col-md-6'>" +
        "           <div class=\"panel panel-default\">\n" +
        "                <div class=\"panel-heading\">\n" +
        "                    <h3 id=\"team1_title\" class=\"panel-title\">客队</h3>\n" +
        "                </div>\n" +
        "                <div id=\"team1_players\" class=\"panel-body team_players\">\n" +
        "                </div>\n" +
        "           </div>" +
        "       </div>" +
        "   </div>" +
        "</div>";
};
playersinfo.prototype.changeTeam = function() {
    var team0 = data.matchinfo.team0;
    var team1 = data.matchinfo.team1;

    if(team0 != this.teams[0])
    {
        renewTitle(0, team0, this.database.teams);
        renewPlayers(0, team0, this.database.players);
        this.teams[0] = team0;
    }
    else
    {
        renewTitle(1, team1, this.database.teams);
        renewPlayers(1, team1, this.database.players);
        this.teams[1] = team1;
    }
};

function renewTitle(team, tid, teamList) {
    var i;
    var temp_team = document.getElementById("team"+team+"_title");
    var temp_title = team == 0?"主队":"客队";

    for(i = 0; i < teamList.length; i++)
        if(teamList[i].tid == tid) break;

    if(i != teamList.length) temp_title = temp_title + "(" + teamList[i].name + ")";

    temp_team.innerHTML = temp_title;
}
function renewContent(team) {
    var i;
    var players = p2.players[team];

    var innerhtml = "";
    innerhtml += '<div class="panel-group" id="team'+team+'_players_group">';
    for(i=0; i<players.length; i++)
        if(players[i].sf == 1 && players[i].position == "前锋")
            innerhtml += players[i].html;
    for(i=0; i<players.length; i++)
        if(players[i].sf == 1 && players[i].position == "中场")
            innerhtml += players[i].html;
    for(i=0; i<players.length; i++)
        if(players[i].sf == 1 && players[i].position == "后卫")
            innerhtml += players[i].html;
    for(i=0; i<players.length; i++)
        if(players[i].sf == 1 && players[i].position == "守门员")
            innerhtml += players[i].html;
    innerhtml += '<br>';
    for(i=0; i<players.length; i++)
        if(players[i].sf == 0 && players[i].position == "前锋")
            innerhtml += players[i].html;
    for(i=0; i<players.length; i++)
        if(players[i].sf == 0 && players[i].position == "中场")
            innerhtml += players[i].html;
    for(i=0; i<players.length; i++)
        if(players[i].sf == 0 && players[i].position == "后卫")
            innerhtml += players[i].html;
    for(i=0; i<players.length; i++)
        if(players[i].sf == 0 && players[i].position == "守门员")
            innerhtml += players[i].html;
    innerhtml += '</div>';

    var div = document.getElementById("team"+team+"_players");
    div.innerHTML = innerhtml;

    renewData(team, players);
}
function generateHTML(team, i) {
    var players = p2.players[team];
    var sf;
    var ck;
    players[i].html = "";

    if(players[i].sf) {
        sf = '<p class="players_sf">首发</p>';
        ck = '<input type="checkbox" class="players_checkbox" onclick="changeSF('+team+','+i+')" checked="checked"/>';
    } else {
        sf = '<p class="players_sf">替补</p>';
        ck = '<input type="checkbox" class="players_checkbox" onclick="changeSF('+team+','+i+')"/>';
    }

    players[i].html += '<div class="panel panel-default">';
    players[i].html += '<div class="panel-heading">';
    players[i].html += '<h4 class="panel-title">';
    players[i].html += '<a data-toggle="collapse" data-parent="#team'+team+'_players_group" href="#team'+team+'_player'+i+'_detailInfo">';
    players[i].html += (players[i].position + "：" + players[i].jersey + "　" + players[i].name);
    players[i].html += '</a>';
    players[i].html += '</h4>';
    players[i].html += sf;
    players[i].html += ck;
    players[i].html += '</div>';
    players[i].html += '<div id="team'+team+'_player'+i+'_detailInfo" class="panel-collapse collapse">';
    players[i].html += '<div class="panel-body">';
    players[i].html += '球员id：'+players[i].pid;
    players[i].html += '</div>';
    players[i].html += '</div>';
    players[i].html += '</div>';
}
function changeSF(team, i) {
    var players = p2.players[team];
    var sf_num = 0;
    for(var j = 0; j < players.length; j++)
        if(players[j].sf) sf_num++;
    if(sf_num == 11 && players[i].sf == 0) throwError(ERR_playersExtra);
    else
    {
        players[i].sf = 1-players[i].sf;
        generateHTML(team, i);
    }

    renewContent(team);
}
function renewPlayers(team, tid, playerList) {
    var i;
    var players = p2.players[team];

    players.splice(0,players.length);
    for(i = 0; i < playerList.length; i++)
        if(playerList[i].tid == tid) players.push(
            {
                name:playerList[i].name,
                jersey:playerList[i].jersey,
                position:playerList[i].position,
                tid:playerList[i].tid,
                pid:playerList[i].pid,
                sf:0,
                html: ""
            });
    for(i = 0; i < players.length; i++) generateHTML(team,i);

    renewContent(team);
}
function renewData(team, players) {
    var i;
    var playerList = team==0?data.players.team0:data.players.team1;
    playerList.splice(0,playerList.length);

    for(i = 0; i < players.length; i++)
        playerList.push({
            name:players[i].name,
            jersey:players[i].jersey,
            position:players[i].sf?players[i].position:'替补',
            tid:players[i].tid,
            pid:players[i].pid
        });

    p4.refresh();
}