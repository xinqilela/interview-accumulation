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
    foo(yield 'a', yield 'b');
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
function* dd() {
    for (var i = 0; true; i++) {
        var rest = yield i;
        if (rest) i = -1;
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
var obj = {a: 1, b: 2};

function* getInterator(obj) {
    for (var key in obj) {
        yield [key, obj[key]];
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

let jane = {first: 'Jane', last: 'Doe'};
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

// 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会推迟到finally代码块执行完再执行。
// 调用return方法后，就开始执行finally代码块，然后等到finally代码块执行完，再执行return方法。
function* numbers() {
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
// console.log(g.next()) // { value: 1, done: false }
// console.log(g.next()) // { value: 2, done: false }
// console.log(g.return(7)) // { value: 4, done: false }
// console.log(g.next()) // { value: 5, done: false }
// console.log(g.next()) // { value: 7, done: true }

/*
* next()、throw()、return() 的共同点
* 让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式；
* 1.next()是将yield表达式替换成一个值。
* 2.throw()是将yield表达式替换成一个throw语句
* */
const hh = function* (x, y) {
    let result = yield x + y;
    return result;
};

const ghh = hh(1, 2);
// console.log(ghh.next()); // Object {value: 3, done: false}
// console.log(ghh.next(1)); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;
// ghh.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
// console.log(ghh.return(2)); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;

//在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的,yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。
//如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。
//yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。
function* foo() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}

// for (let v of bar()){
//     console.log(v);
// }
// "x"
// "y"

function* gg() {
    yield* ["a", "b", "c"];
}

// console.log(gg().next()) // { value:"a", done:false }

//如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
function* foo() {
    yield 2;
    yield 3;
    return "foo";
}

function* bar() {
    yield 1;
    var v = yield* foo();
    console.log("v: " + v);
    yield 4;
}

var it = bar();
// console.log(it.next())
// // {value: 1, done: false}
// console.log(it.next())
// // {value: 2, done: false}
// console.log(it.next())
// // {value: 3, done: false}
// console.log(it.next())
// // "v: foo"
// // {value: 4, done: false}
// console.log(it.next())
// {value: undefined, done: true}

/*
* Generator 函数的this:
* Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。
* 但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。
* Generator 函数也不能跟new命令一起用，会报错。
* */
function* kk() {
    this.a = 1;
}

kk.prototype.hello = function () {
    console.log('aaa');
};

var kkg = kk();
// kkg.hello();
// console.log(kkg instanceof kk);
// console.log(kkg.a);
// new kk(); //报错

//有没有办法让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this？
//首先，生成一个空对象，使用call方法绑定 Generator 函数内部的this。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。
function* gen() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}

function F() {
    // return gen.call(gen.prototype);
}

var f = new F();

// f.next();  // Object {value: 2, done: false}
// f.next();  // Object {value: 3, done: false}
// f.next();  // Object {value: undefined, done: true}
//
// f.a // 1
// f.b // 2
// f.c // 3

//clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态
var clock = function* () {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
};

/*
Generator 与上下文:
    JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。
然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，
由此形成一个上下文环境的堆栈（context stack）。这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，
退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。
    Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，
里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
*/

function* tt() {
    yield 1;
    return 2;
}

let mm = tt();

// console.log(mm.next());
// console.log('other');
// console.log(mm.next());

/*
* 应用：
*   异步操作的同步化表达
*   控制流程管理
*   部署Interator接口
*   作为数据结构
* */
//1.异步操作的同步化表达
// function* main() {
//     var result = yield request("http://some.url");
//     var resp = JSON.parse(result);
//     console.log(resp.value);
// }
//
// function request(url) {
//     makeAjaxCall(url, function(response){
//         it.next(response);
//     });
// }
//
// var it = main();
// it.next();

//控制流程管理
//同步的流程管理
// let steps = [step1Func, step2Func, step3Func];
// function* iterateSteps(steps){
//     for (var i=0; i< steps.length; i++){
//         var step = steps[i];
//         yield step();
//     }
// }

//部署Interator接口
function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for (let i=0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
    }
}

let myObj = { foo: 3, bar: 7 };

// for (let [key, value] of iterEntries(myObj)) {
    // console.log(key, value);
// }

//Generator作为数据结构,使得数据或者操作，具备了类似数组的接口
// function* doStuff() {
//     yield fs.readFile.bind(null, 'hello.txt');
//     yield fs.readFile.bind(null, 'world.txt');
//     yield fs.readFile.bind(null, 'and-such.txt');
// }
// for (task of doStuff()) {
//     // task是一个函数，可以像回调函数那样使用它
//     task();
// }

// Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，
// 使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。
function* pp(x){
    try {
        var y = yield x + 2;
    } catch (e){
        console.log(e);
    }
    return y;
}

var g = pp(1);
// console.log(g.next());
// g.throw('出错了');
// 出错了

var fetch = require('node-fetch');

function* gen(){
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then(function(data){
    return data.json();
}).then(function(data){
    g.next(data);
});

//Generator 函数的异步流程管理
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
    var r1 = yield readFileThunk('/etc/fstab');
    console.log(r1.toString());
    var r2 = yield readFileThunk('/etc/shells');
    console.log(r2.toString());
};
function run(fn) {
    var gen = fn();
    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
run(gen);

