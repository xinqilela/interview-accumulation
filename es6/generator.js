/*
* Generator 函数是一个普通函数，有两个特征:function关键字与函数名之间有一个星号；函数体内部使用yield表达式，定义不同的内部状态
* */

function* aa() {
    yield 'hello';
    yield 'world';
    return 'end';
}

var gen1 = aa();
// console.log(gen1.next());
// console.log(gen1.next());
// console.log(gen1.next());
// console.log(gen1[Symbol.iterator]() === gen1); //Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。

// yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
// (function (){
//     yield 1;
// })()

var arr = [1, [2, 3], [4, 5, [6, 7]]];
var bb = function* (a) {
    var len = a.length;
    for (var i = 0; i < len; i++) {
        var item = a[i];
        if (typeof item == 'number') {
            yield item;
        } else {
            yield* bb(item);
        }
    }
};
// for(var item of bb(arr)){
//     console.log(item);
// }

//yield表达式如果用在另一个表达式之中，必须放在圆括号里面；用作函数参数或放在赋值表达式的右边，可以不加括号
function foo(a, b) {
    console.log('foo', a, b);
}

function* cc() {
    console.log('start');
    console.log('hello' + (yield));
    console.log('hello' + (yield 123));
    foo(yield 'a',yield 'b');
    let a = yield;
}

// var gen = cc();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

//任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
// console.log([...myIterable]); // [1, 2, 3]

//yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。