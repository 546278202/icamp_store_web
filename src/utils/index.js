/**
 * Created by wanlong on 19/08/18.
 */

// 毫秒转时间
export function formatTime(date) {
    var date = new Date(date);
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    var aa = date.getHours();       //获取当前小时数(0-23)
    var bb = date.getMinutes();     //获取当前分钟数(0-59)
    var cc = date.getSeconds();     //获取当前秒数(0-59)

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return year + "-" + month + "-" + strDate
}
