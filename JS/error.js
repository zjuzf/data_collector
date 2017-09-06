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
        case ERR_playersExtra: alert("队伍首发阵容不能超过11人");break;

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
        case ERR_dataMiss_Players_Team0: alert("主队未选择首发球员！");break;
        case ERR_dataMiss_Players_Team1: alert("客队未选择首发球员！");break;

        case ERR_notSelectPhase: alert("尚未选择阶段");break;

        case WNG_teamLackPlayers0: console.warn("主队不足11人！");break;
        case WNG_teamLackForward0: console.warn("主队缺少前锋！");break;
        case WNG_teamLackMiddle0: console.warn("主队缺少中场！");break;
        case WNG_teamLackBack0: console.warn("主队缺少后卫！");break;
        case WNG_teamLackGoalkeeper0: console.warn("主队缺少守门员！");break;
        case WNG_teamLackPlayers1: console.warn("客队不足11人！");break;
        case WNG_teamLackForward1: console.warn("客队缺少前锋！");break;
        case WNG_teamLackMiddle1: console.warn("客队缺少中场！");break;
        case WNG_teamLackBack1: console.warn("客队缺少后卫！");break;
        case WNG_teamLackGoalkeeper1: console.warn("客队缺少守门员！");break;
    }
}

const ERR_notInt = 0x70;
const ERR_yearZero = 0x71;
const ERR_dateOverflow = 0x72;
const ERR_monthNotAllowed = 0x73;
const ERR_dayNotAllowed = 0x74;
const ERR_timeMistake = 0x75;
const ERR_teamRepeat = 0x76;
const ERR_teamNotFound = 0x77;
const ERR_playersExtra = 0x78;

const ERR_dataMiss_Matchinfo_Date_Year = 0x100;
const ERR_dataMiss_Matchinfo_Date_Month = 0x101;
const ERR_dataMiss_Matchinfo_Date_Day = 0x102;
const ERR_dataMiss_Matchinfo_Time_Min = 0x103;
const ERR_dataMiss_Matchinfo_Time_Sec = 0x104;
const ERR_dataMiss_Matchinfo_Team0 = 0x105;
const ERR_dataMiss_Matchinfo_Team1 = 0x106;
const ERR_dataMiss_Matchinfo_Score0 = 0x107;
const ERR_dataMiss_Matchinfo_Score1 = 0x108;
const ERR_dataMiss_Matchinfo_Video = 0x109;
const ERR_dataMiss_Players_Team0 = 0x10a;
const ERR_dataMiss_Players_Team1 = 0x10b;

const ERR_notSelectPhase = 0x200;

const WNG_teamLackPlayers0 = 0x300;
const WNG_teamLackForward0 = 0x301;
const WNG_teamLackMiddle0 = 0x302;
const WNG_teamLackBack0 = 0x303;
const WNG_teamLackGoalkeeper0 = 0x304;
const WNG_teamLackPlayers1 = 0x305;
const WNG_teamLackForward1 = 0x306;
const WNG_teamLackMiddle1 = 0x307;
const WNG_teamLackBack1 = 0x308;
const WNG_teamLackGoalkeeper1 = 0x309;