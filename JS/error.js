function throwError(errorcode)
{
    switch(errorcode)
    {
        case ERR_notInt: console.error("请输入整数！");break;
        case ERR_yearZero: console.error("公元0年不存在！");break;
        case ERR_dateOverflow: console.error("此日期尚未达到！");break;
        case ERR_monthNotAllowed: console.error("此月份不存在！");break;
        case ERR_dayNotAllowed: console.error("此日不存在！");break;
        case ERR_timeMistake: console.error("非正常比赛时长！");break;
        case ERR_teamNotFound: console.error("该队伍不在系统中！");break;
        case ERR_teamRepeat: console.error("对战双方不能是同一支队伍！");break;

        case ERR_dataMiss_Matchinfo_Date_Year: alert("比赛年份不能为空！");break;
        case ERR_dataMiss_Matchinfo_Date_Month: alert("比赛月份不能为空！");break;
        case ERR_dataMiss_Matchinfo_Date_Day: alert("比赛日期不能为空！");break;
        case ERR_dataMiss_Matchinfo_Time_Min: alert("比赛用时分钟不能为空！");break;
        case ERR_dataMiss_Matchinfo_Time_Sec: alert("比赛用时秒数不能为空！");break;
        case ERR_dataMiss_Matchinfo_Team0: alert("主队名不能为空！");break;
        case ERR_dataMiss_Matchinfo_Team1: alert("客队名不能为空！");break;
        case ERR_dataMiss_Matchinfo_Score0: alert("主队名不能为空！");break;
        case ERR_dataMiss_Matchinfo_Score1: alert("客队名不能为空！");break;
        case ERR_dataMiss_Matchinfo_Video: alert("视频不能为空！");break;
    }
}

var ERR_notInt = 0x70;
var ERR_yearZero = 0x71;
var ERR_dateOverflow = 0x72;
var ERR_monthNotAllowed = 0x73;
var ERR_dayNotAllowed = 0x74;
var ERR_timeMistake = 0x75;
var ERR_teamRepeat = 0x76;
var ERR_teamNotFound = 0x77;

var ERR_dataMiss_Matchinfo_Date_Year = 0x100;
var ERR_dataMiss_Matchinfo_Date_Month = 0x101;
var ERR_dataMiss_Matchinfo_Date_Day = 0x102;
var ERR_dataMiss_Matchinfo_Time_Min = 0x103;
var ERR_dataMiss_Matchinfo_Time_Sec = 0x104;
var ERR_dataMiss_Matchinfo_Team0 = 0x105;
var ERR_dataMiss_Matchinfo_Team1 = 0x106;
var ERR_dataMiss_Matchinfo_Score0 = 0x107;
var ERR_dataMiss_Matchinfo_Score1 = 0x108;
var ERR_dataMiss_Matchinfo_Video = 0x109;