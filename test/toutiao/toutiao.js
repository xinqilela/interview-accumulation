/*
* √ 1.如何实现链式操作                           操作完返回this
* √ 2.css实现寛高比例布局                        padding-top設置為百分比
* 3.日期操作
* √ 4.es6装饰器的编写(让某个方法只执行一次)      使用高阶函数实现
* √ 5.css裁剪图片                                clip-path，border-radius
* √ 6.css动画                                    @keyframes定义动画，animation引用动画；transition
* √7.正则表达式（邮箱正则、提取字符串中的单引号和双引号）
* √ 8.发布订阅模式的实现、单例模式的实现
* √ 9.如何实现一根0.3px的细线                    line-gradient和transform
* √ 10.媒体查询表达式的使用                      @media screen and (min-width:768px) and (max-width:1366px){}
* √ 11.line-height的使用(为百分比时)
*      number(2)      此数字会与当前的字体尺寸相乘来设置行间距
*      length(16px)   设置固定的行间距
*      percent(110%)  基于当前字体尺寸的百分比行间距
* √ 12.padding-top的使用(为百分比时)             此时padding-top是根据父容器的宽度进行动态计算
* √ 13.fetch实现：超时1s进入重试；出错进入重试；重试一次以上进入error
* √ 14.实现promoise
* √ 15.在不适用es6的情况下实现多个请求的依赖调用   eg:回调函数
* √ 16.列表结构转为树形结构
* */
/*
function Queue() {
    this.funcArrs = [];
}
Queue.prototype.task = function (ms, callback) {
     this.funcArrs.push([ms,callback]);
     return this;
};
Queue.prototype.start = function () {
    this.funcArrs.forEach((item,index)=>{
        var ms = item[0];
        var func = item[1];
        setTimeout(()=>{
            func.call(this);
        },ms);
    });
};
new Queue()
    .task(1000, () => {
        console.log(1);
    }).task(2000, () => {
    console.log(2);
}).task(3000, () => {
    console.log(3);
}).start();*/

/*
function once(fn) {
    var result;
    return function() {
        let context = this;
        let args = arguments;
        if(fn) {
            result = fn.apply(context, args);
            fn = null;
        }
        return result;
    };
}

var test = function () {
    console.log(1);
}

var res = once(test);
res();
res();
res();*/

// var str = 'xx\'xx\'yyy"xxx"xx"xxx\'';
// // var regx = /('[^']*')|("[^"]*")/g;
// var regx = /(')|(")/g;
// var test = regx.exec(str);
// while (test){
//     console.log(test);
//     test = regx.exec(str);
// }

function getDelayDay(number,startDate) {

}

console.log(getDelayDay(10,new Date(2019,8,30)));
