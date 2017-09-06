playersinfo = function(database)
{
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
    var i;
    var that = this;
    var team0 = data.matchinfo.team0;
    var team1 = data.matchinfo.team1;

    if(team0 != this.teams[0])
    {
        renewTitle(0, team0, this.database.teams);
        renewPlayers(0, team0, this.database.players);
        renewData(0, this.players[0]);
        this.teams[0] = team0;
    }
    else
    {
        renewTitle(1, team1, this.database.teams);
        renewPlayers(1, team1, this.database.players);
        renewData(1, this.players[1]);
        this.teams[1] = team1;
    }

    function renewTitle(team, tid, teamList) {
        var temp_team = document.getElementById("team"+team+"_title");
        var temp_title = team == 0?"主队":"客队";

        for(i = 0; i < teamList.length; i++)
            if(teamList[i].tid == tid) break;

        if(i != teamList.length) temp_title = temp_title + "(" + teamList[i].name + ")";

        temp_team.innerHTML = temp_title;
    }
    function renewPlayers(team, tid, playerList) {
        var players = that.players[team];

        players.splice(0,players.length);
        for(i = 0; i < playerList.length; i++)
            if(playerList[i].tid == tid) players.push(playerList[i]);

        var innerhtml = "";
        innerhtml += '<div class="panel-group" id="team'+team+'_players_group">';
        for(i=0; i<players.length; i++) {
            innerhtml += '<div class="panel panel-default">';
            innerhtml += '<div class="panel-heading">';
            innerhtml += '<h4 class="panel-title">';
            innerhtml += '<a data-toggle="collapse" data-parent="#team'+team+'_players_group" href="#team'+team+'_player'+i+'_detailInfo">';
            innerhtml += (players[i].position + "：" + players[i].name);
            innerhtml += '</a>';
            innerhtml += '</h4>';
            innerhtml += '</div>';
            innerhtml += '<div id="team'+team+'_player'+i+'_detailInfo" class="panel-collapse collapse">';
            innerhtml += '<div class="panel-body">';
            innerhtml += '球员id：'+players[i].pid;
            innerhtml += '<br>';
            innerhtml += '球衣号码：'+players[i].jersey;
            innerhtml += '</div>';
            innerhtml += '</div>';
            innerhtml += '</div>';
        }
        innerhtml += '</div>';

        var div = document.getElementById("team"+team+"_players");
        div.innerHTML = innerhtml;
    }
    function renewData(team, players) {
        var playerList = team==0?data.players.team0:data.players.team1;
        playerList.splice(0,playerList.length);

        for(i = 0; i < players.length; i++)
            playerList.push({
                name:players[i].name,
                jersey:players[i].jersey,
                position:players[i].position,
                tid:players[i].tid,
                pid:players[i].pid
            });
    }
};
