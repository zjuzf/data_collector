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