function model() {
    document.getElementById("input_txt_date_year").value = 2017;
    document.getElementById("input_txt_date_month").value = 8;
    document.getElementById("input_txt_date_day").value = 31;
    changeDate();

    document.getElementById("input_txt_time_min").value = 90;
    document.getElementById("input_txt_time_sec").value = 0;
    changeTime();

    document.getElementById("input_txt_team0").value = "10000";
    changeTeam();

    document.getElementById("input_txt_team1").value = "10001";
    changeTeam();

    document.getElementById("input_txt_score0").value = 1;
    document.getElementById("input_txt_score1").value = 0;
    changeScore();
}