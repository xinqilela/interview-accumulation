/*
https://juejin.im/post/5bdfd3e151882516c6432c32
执行上下文:
      执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念，JavaScript 中运行任何的代码都是在执行上下文中运行。
      1.全局执行上下文: 不在任何函数中的代码都位于全局执行上下文中。
         它做了两件事：创建一个全局对象，在浏览器中这个全局对象就是 window 对象。将 this 指针指向这个全局对象。
         一个程序中只能存在一个全局执行上下文。
      2.函数执行上下文: 每次调用函数时，都会为该函数创建一个新的执行上下文。
        每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。
      3.Eval函数执行上下文: 运行在 eval 函数中的代码也获得了自己的执行上下文
      分2个阶段创建:
        创建阶段:在任意的 JavaScript 代码被执行前，执行上下文处于创建阶段(确定this的值,词法环境被创建,变量环境被创建)
        执行阶段:在此阶段，完成对所有变量的分配，最后执行代码
this：this要在执行时才能确认值，定义时无法确认.
      在全局执行上下文中，this 的值指向全局对象，浏览器中，this指向 window 对象。
      在函数执行上下文中，this 的值取决于函数的调用方式。如果它被一个对象引用调用，那么 this 的值被设置为该对象，
      否则 this 的值被设置为全局对象或 undefined（严格模式下）。
      场景:作为构造函数执行;作为对象属性执行;作为普通函数执行；call\apply\bind;
      this 的指向: 【this永远指向最后调用它的那个对象】
作用域:JavaScript 不是块级作用域而是通过函数来管理作用域，在函数内部声明的变量只能在这个函数内部使用。
* */

/*
* 立即执行函数:自执行函数，就是不需要调用就立马执行的函数
*   目的：
*     不必为函数命名，避免了污染全局变量
*     IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。
* */

/*
* 当 JS 解释器在遇到非匿名的立即执行函数时，会创建一个辅助的特定对象，然后将函数名称作为这个对象的属性，因此函数内部才可以访问到 foo，但是这又个值
* 是只读的，所以对它的赋值并不生效。
* */
var foo = 1;
(function foo() {
    foo = 10
    // console.log(foo)
}()) // -> ƒ foo() { foo = 10 ; console.log(foo) }

/*
闭包:能够读取其他函数内部变量的函数,在Javascript中，只有函数内部的子函数才能读取局部变量，
     可以把闭包理解成"定义在一个函数内部的函数"。在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
作用:
     1.可以读取函数内部的变量
     2.让这些变量的值始终保持在内存中
注意:
     1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题。
     所以在退出函数之前，将不使用的局部变量全部删除。
     2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，
     把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），要小心，
     不要随便改变父函数内部变量的值。
* */

/*function f1() {

    var n = 999;

    nAdd = function () {
        n += 1
    }

    function f2() {
        console.log(n);
    }

    return f2;

}

var result = f1();

result(); // 999

nAdd();

result(); // 1000

console.log('------------------------');*/

//在这段代码中，result实际上就是闭包f2函数。函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。
//原因在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，
// 不会在调用结束后，被垃圾回收机制（garbage collection）回收。

/*
var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc: function () {
        return function () {
            return this.name;
        };

    }

};

console.log(object.getNameFunc()());  //The Window
console.log('------------------------');

var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };

    }

};

console.log(object.getNameFunc()()); //My Object
*/


/*
* 背景:
*    当需要绑定一些持续触发的事件时，如 resize、scroll、mousemove 等，但我们并不希望在事件持续触发的过程中那么频繁地去执行函数。
* 解决：
*    1.函数防抖:触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
*    2.函数节流:连续触发事件但是在 n 秒中只执行一次函数。
* */


//防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行
/*
函数防抖:
    非立即执行:触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
    立即执行:触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
*/
/*let content = document.getElementById('content');

function debounce(func, awit, immediate) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) {
            clearTimeout(timeout);
        }
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, awit);
            if (callNow) func.apply(context, args);
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, awit);
        }
    }
}

let num = 0;

function count() {
    num++;
    content.innerHTML = num;
}

// content.onmousemove = debounce(count, 1000, true);

/!*
函数节流
*!/
function throttle(func, wait, type) {
    if (type == 1) {
        let previous = 0;
    } else if (type == 2) {
        let timeout;
    }
    return function () {
        let context = this;
        let args = arguments;
        if (type == 1) {
            let now = new Date();
            if (now - previous > wait) {
                func.apply(context, args);
            }
        } else if (type == 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            }
        }
    }
}

content.onmousemove = debounce(count, 1000, 2);*/

/*
* apply、call、bind 区别
      apply 和 call 基本类似,apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。
      bind 是创建一个新的函数，我们必须要手动去调用。
* */

/*var a = {
    name: "Cherry",
    fn: function (a, b) {
        console.log(a + b)
    }
}

var b = a.fn;
b.apply(a, [1, 2]);    // 3
b.call(a, 1, 2);
b.bind(a, 1, 2)();           // 3*/

function deepCopy(source) {
    if (!source || typeof source != 'object') {
        return;
    }
    let target = source.constructor == Array ? [] : {};
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            var item = source[key];
            if (typeof item == 'object') {
                target[key] = deepCopy(item);
            } else {
                target[key] = item;
            }
        }
    }
    return target;
}

var source = {
    array: [1, 2, 3],
    obj: {a: 1},
    num: 1
};
var deepclone = deepCopy(source);
source.array.push(4);
// console.log(deepclone);
var lightclone = lightCopy(source);
// console.log(lightclone);

function lightCopy(source) {
    if (!source || typeof source != 'object') {
        return;
    }
    var target = source.constructor == Array ? [] : {};
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

/*
* 数组和类数组的区别：
* 类数组不能调用数组原型上的方法。如push、slice、indexOf。
* 转换：(把类数组对象转换成数组)
* Array.prototype.slice.call(likeArray);
* Array.from(likeArray);
* */
function isArray(data) {
    return Object.prototype.toString.call(data) == 'object Array';
}

const a = ['Hello', 'Howard'];
const b = {0: 'Hello', 1: 'Howard'};
const c = 'Hello Howard';
// console.log(Object.prototype.toString.call(a));//"[object Array]"
// console.log(Object.prototype.toString.call(b));//"[object Object]"
// console.log(Object.prototype.toString.call(c));//"[object String]"

/*
map && flatMap && reduce
map:
flatMap: 使用映射函数映射每个元素，然后将结果压平一层
reduce:
* */
var arr = [1, 3, 5, 7, 9];
var test1 = arr.map((item, index, array) => ([item * 2])); // [ [ 2 ], [ 6 ], [ 10 ], [ 14 ], [ 18 ] ]
// var test2 = arr.flatMap((item,index,array)=>([item*2])); // [2,6,10,14,18]
console.log(test1);
var sum = arr.reduce((pre, cur, index, array) => {
    return pre + cur;
}, 100);
console.log(sum);
