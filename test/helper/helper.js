/*
* 1.js bridge
*   简单来讲，主要是给js提供调用Native功能的接口，让混合开发的前端部分可以方便的使用地址位置、摄像头、支付等Native功能，实际上，JSBridge是Native和非Native之间的桥梁，他的核心是构建
*   Native和非Native间的消息通信的通道，而且是双向通信的通道。
* 2.https的安全机制,中间人攻击
* 3.react native和h5的区别
* 4.移动端适配
*   字体大小单位:em、rem、%
*     em: 1em 等于当前的字体尺寸;2em 等于当前字体尺寸的两倍。
*     %: 相对于当前字体尺寸的百分比，注意浏览器有一个下限制，chrome为12px;
*     rem: 是相对于根元素来确定当前尺寸的大小，只需要给根元素设置一个px则其他元素都是根据根元素字体尺寸大小来计算。
*   元素大小单位: vw、vh、vmin、vmax
*     vw: 视窗宽度的百分比(1vw代表视窗宽度的1%)
*     vh: 视窗高度的百分比
*     vmin: vw和vh中较大的一个值
*     vmax: vw和vh中较小的一个值
* 5.document fragment
*   文档片段，被作为一个轻量级的document使用。和document最大的区别是DocumentFragment不是真实DOM树的一部分，它的变化不会触发 DOM 树的（重新渲染) ，
*   且不会导致性能等问题。
* 6.函数中的arguments是数组吗？如何转化为数组?和数组有什么区别?
*   是类数组;
*   Array.from(likeArray)、Array.prototype.slice.call(likeArray);
*   可以用for循环遍历，但是无法使用数组原型上的方法;
* */
/*
function Foo() {

}

var foo = new Foo();
console.log(foo instanceof Foo);         //ok
console.log(foo instanceof Function);    //false
console.log(foo instanceof Object);      //ok
console.log(Foo instanceof Object);      //ok
console.log(Object instanceof Function); //ok
console.log(Foo instanceof Function);    //ok
console.log(Function instanceof Object); //ok*/

/*console.log([] == false); //true
console.log([].valueOf().toString());  //''
console.log({} == false); //false
console.log({}.valueOf().toString());  //[object Object]
if ([]) {
    console.log('aaa');  //'aaa'
}
console.log([1] == [1]); //false*/

/*async function async1() {
    console.log('async1 start');
    await async2();
    //await	async2相当于then为空，所以先输出了空，后输出了promise2.然后promise队列为空，输出同步async1	end
    console.log('async1 end');
}

async function async2() {
    console.log('async 2');
}

console.log('script start');
setTimeout(() => {
    console.log('setTimeout');
}, 0);
async1();
new Promise((resolve) => {
    console.log('promise1');
    resolve();
}).then(() => {
    console.log('promise 2');
});
console.log('script end');

//script start
//async1 start
//async 2
//promise1
//script end
//promise 2
//async1 end
//setTimeout*/

/*
const obj = {
    name: 'jsCoder',
    skill: ['es6', 'react', 'angular'],
    say: function () {
        for (let i = 1; i <= this.skill.length; i++) {
            setTimeout(() => {
                console.log('No.', +i + this.name);
                console.log(this.skill[i]);
                console.log('----');
            }, 0);
            console.log(i);
        }
    }
};

obj.say();*/

/*function Animal(name, color) {
    this.name = name;
    this.color = color;
}

Animal.prototype.say = function () {
    return `I am ${this.color} ${this.name}`;
}

const Cat = Animal.bindFunc(null, 'cat');
const cat = new Cat('white');

Function.prototype.bindFunc = function (thisArg) {
    var self = this;
    var args = [].slice.call(arguments, 1);
    return function () {
        var bindArgs = [].slice.call(arguments, 1);
        return self.apply(thisArg, [...args, ...bindArgs]);
    }
};

if (cat.say() == 'I am white cat' && cat instanceof Cat && cat instanceof Animal) {
    console.log('success');
}*/

/*function repeat(wait, text) {
    var count = 1;
    console.log(text);
    var interval = setInterval(() => {
        if (count >= 3) {
            clearInterval(interval);
            return;
        }
        console.log(text);
        count++;
    }, wait);
}

repeat(3000, 'hello');*/

var arr = [{a: 1}, {a: 2}, {a: 3}];
var res = arr.reduce((pre, item, index, array) => {
    item.a = item.a * 2;
    pre.push(item);
    return pre;
}, []);
console.log(res);

/*
* 1.html标签的property和attribute的区别
*
* */