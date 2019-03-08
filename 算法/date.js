/*
* getTime        返回毫秒数
* getFullYear
* getMonth
* getDate        返回日期
* getDay         返回星期几(0表示周日)
* getHours
* getMinutes
* getSeconds
* */

var now = new Date();
console.log(now);
var nowTime = now.getTime();
var target = new Date(nowTime + 1000 * 60 * 60 * 24 * 10);
console.log(target);