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
//注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
function *dd(){
    for(var i=0;true;i++){
        var rest = yield i;
        if(rest) i=-1;
    }
}
var gen = dd();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next(true));

function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}
var a = foo(5);
// console.log(a.next()) // Object{value:6, done:false}
// console.log(a.next()) // Object{value:NaN, done:false}
// console.log(a.next()) // Object{value:NaN, done:true}
var b = foo(5);
// console.log(b.next()) // { value:6, done:false }
// console.log(b.next(12)) // { value:8, done:false }
// console.log(b.next(13)) // { value:42, done:true }

function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result';
}

let genObj = dataConsumer();
// genObj.next();
// Started
// genObj.next('a')
// 1. a
// genObj.next('b')
// 2. b

//for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
//注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
// for (let v of foo()) {
    // console.log(v);
// }
// 1 2 3 4 5

//原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了
var obj = {a:1,b:2};
function * getInterator(obj) {
    for(var key in obj){
        yield [key,obj[key]];
    }
}
var newObj = getInterator(obj);
// for(let item of newObj){
//     console.log(item);
// }

function* objectEntries() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}
let jane = { first: 'Jane', last: 'Doe' };
jane[Symbol.iterator] = objectEntries;
// for (let [key, value] of jane) {
//     console.log(`${key}: ${value}`);
// }

// Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
// function* gen() {
//     yield 1;
//     yield 2;
//     yield 3;
// }
// var g = gen();
// g.next()        // { value: 1, done: false }
// g.return('foo') // { value: "foo", done: true }
// g.next()        // { value: undefined, done: true }

function* numbers () {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.return(7)) // { value: 4, done: false }
console.log(g.next()) // { value: 5, done: false }
console.log(g.next()) // { value: 7, done: true }