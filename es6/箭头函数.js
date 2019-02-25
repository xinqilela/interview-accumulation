/*
* 注意：
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
     注：this对象的指向是可变的，但是在箭头函数中，它是固定的。
         this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，
         导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
* */

/*
* Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），
* 后者的this指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。
* */
function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function () {
        this.s2++;
    }, 1000);
}
var timer = new Timer();
// setTimeout(() => console.log('s1: ', timer.s1), 3100);
// setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0

function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}

var f = foo.call({id: 1});
// 上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，
// 都没有自己的this，它们的this其实都是最外层foo函数的this。
// var t1 = f.call({id: 2})()(); // id: 1
// var t2 = f().call({id: 3})(); // id: 1
// var t3 = f()().call({id: 4}); // id: 1

// 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
function goo() {
    setTimeout(() => {
        console.log('args:', arguments);
    }, 100);
}

// goo(2, 4, 6, 8)
// args: [2, 4, 6, 8]

// 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
(function() {
    return [
        (() => void console.log(this.x)).bind({ x: 'inner' })()
    ];
}).call({ x: 'outer' });
// ['outer']