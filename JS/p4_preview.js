preview = function()
{
    this.div = document.getElementById("preview_text");
    this.refresh();
};

preview.prototype.refresh = function()
{
    this.str = "";
    this.str += "{<br>";
    this.str += "\"matchinfo\":{<br>";
    this.str += "　　\"date\":{<br>";
    this.str += "　　　　\"year\":\""+data.matchinfo.date.year+"\",<br>";
    this.str += "　　　　\"month\":\""+data.matchinfo.date.month+"\",<br>";
    this.str += "　　　　\"day\":\""+data.matchinfo.date.day+"\"<br>";
    this.str += "　　},<br>";
    this.str += "　　\"time\":{<br>";
    this.str += "　　　　\"min\":\""+data.matchinfo.time.min+"\",<br>";
    this.str += "　　　　\"sec\":\""+data.matchinfo.time.sec+"\"<br>";
    this.str += "　　},<br>";
    this.str += "　　\"team0\":\""+data.matchinfo.team0+"\",<br>";
    this.str += "　　\"team1\":\""+data.matchinfo.team1+"\",<br>";
    this.str += "　　\"score0\":\""+data.matchinfo.score0+"\",<br>";
    this.str += "　　\"score1\":\""+data.matchinfo.score1+"\",<br>";
    this.str += "　　\"video\":{<br>";
    this.str += "　　　　\"path\":\""+data.matchinfo.video.path+"\",<br>";
    this.str += "　　　　\"name\":\""+data.matchinfo.video.name+"\"<br>";
    this.str += "　　}<br>";
    this.str += "},<br>";
    this.str += "\"players\":{<br>";
    this.str += "},<br>";
    this.str += "\"sequences\":{<br>";
    this.str += "}<br>";
    this.str += "}<br>";

    this.div.innerHTML = this.str;
};

preview.prototype.commit = function() {
    if(this.check()) this.generateFile();
};

preview.prototype.check = function() {

};

preview.prototype.generateFile = function() {

};
