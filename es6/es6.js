/*
* 异步编程的方法:
    回调函数
    事件监听
    发布/订阅
    Promise 对象
    generator函数
    async函数
* */
/*
promise:异步编程的一种解决方案。
  1.Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
  2.特点:
     （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
          只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
     （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
          只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
          如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果
          的。
   3.优缺点:
      优点：可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数；Promise对象提供统一的接口，使得控制异步操作更加容易。
      缺点: 无法取消Promise，一旦新建它就会立即执行，无法中途取消；如果不设置回调函数，Promise内部抛出的错误，不会反应到外部；
            当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
   4.原理:观察者模式
     通过Promise.prototype.then和Promise.prototype.catch方法将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以链式调用。
* */

function MyPromise(executor){
    var that = this
    this.status = 'pending' // 当前状态
    this.data = undefined
    this.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    this.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

    // 更改状态 => 绑定数据 => 执行回调函数集
    function resolve(value){
        if(that.status === 'pending'){
            that.status = 'resolved'
            that.data = value
            for(var i = 0; i < that.onResolvedCallback.length; ++i){
                that.onResolvedCallback[i](value)
            }
        }
    }

    function reject(reason){
        if(that.status === 'pending'){
            that.status = 'rejected'
            that.data = reason
            for(var i = 0; i < that.onResolvedCallback.length; ++i){
                that.onRejectedCallback[i](reason)
            }
        }
    }

    try{
        executor(resolve, reject) // resolve, reject两个函数可以在外部传入的函数（executor）中调用
    } catch(e) { // 考虑到执行过程可能有错
        reject(e)
    }
}

// 注册Promise状态确定后的回调，then方法会返回一个Promise
// 我们需要在then里面执行onResolved或者onRejected，并根据返回值来确定promise2的结果，并且，如果onResolved/onRejected返回的是一个Promise，promise2将直接取
// 这个Promise的结果
MyPromise.prototype.then = function(onResolved, onRejected){
    var that = this
    var promise2=null;

    // 值穿透
    onResolved = typeof onResolved === 'function' ? onResolved : function(v){ return v }
    onRejected = typeof onRejected === 'function' ? onRejected : function(r){ return r }

    if(that.status === 'resolved'){
        return promise2 = new MyPromise(function(resolve, reject){
            try{
                var x = onResolved(that.data)
                if(x instanceof MyPromise){ // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
                    x.then(resolve, reject)
                }
                resolve(x) // 否则，以它的返回值做为promise2的结果
            } catch(e) {
                reject(e) // 如果出错，以捕获到的错误做为promise2的结果
            }
        })
    }

    if(that.status === 'rejected'){
        return promise2 = new MyPromise(function(resolve, reject){
            try{
                var x = onRejected(that.data)
                if(x instanceof MyPromise){
                    x.then(resolve, reject)
                }
            } catch(e) {
                reject(e)
            }
        })
    }

    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的两种情况的处理逻辑做为callback放入promise1的回调数组里
    if(that.status === 'pending'){
        return promise2 = new MyPromise(function(resolve, reject){
            self.onResolvedCallback.push(function(reason){
                try{
                    var x = onResolved(that.data)
                    if(x instanceof MyPromise){
                        x.then(resolve, reject)
                    }
                } catch(e) {
                    reject(e)
                }
            })

            self.onRejectedCallback.push(function(value){
                try{
                    var x = onRejected(that.data)
                    if(x instanceof MyPromise){
                        x.then(resolve, reject)
                    }
                } catch(e) {
                    reject(e)
                }
            })
        })
    }
}

MyPromise.prototype.catch = function(onRejected){
    return this.then(null, onRejected)
}

// 以下是简单的测试样例：
new MyPromise(resolve => resolve(8)).then(value => {
    console.log(value)
})

/*
* Generator:ES6 提供的一种异步编程解决方案
* 1.特征：function关键字与函数名之间有一个星号；函数体内部使用yield表达式，定义不同的内部状态；
* 2.理解：Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
*         调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
*         value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
* 3.yield表达式：
*   （暂停标志）只能用在 Generator 函数里面，用在其他地方都会报错。
*    yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。
* 4.for...of循环可以自动遍历 Generator 函数执行时生成的Iterator对象，且此时不再需要调用next方法。一旦next方法的返回对象的done属性为true，for...of循环就会中止
* 5.方法：
*    next()是将yield表达式替换成一个值
*    throw()是将yield表达式替换成一个throw语句
*    return()是将yield表达式替换成一个return语句
* 6.this:
*   Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。
* 7.上下文:【与js执行上下文不同】
*   它执行产生的上下文环境，一旦遇到yield命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行next命令时，
*   这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
* 8.应用：
*   异步操作的同步化表达、控制流程管理等
* */

function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for (let v of foo()) {
    console.log(v);
}
// 1 2 3 4 5

const g = function* (x, y) {
    let result = yield x + y;
    return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;
gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;


function* g() {}

g.prototype.hello = function () {
    return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'

/*
* async函数: Generator 函数的语法糖
* async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。
* async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
* 不同：
*     内置执行器:async函数的执行，与普通函数一模一样,不像 Generator 函数，需要调用next方法
*     更好的语义
*     更广的适用性:yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值
*     返回值是 Promise
* await命令:
*     后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
* 原理：
*     async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
* 注意:
*     await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
*     多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
*     wait命令只能用在async函数之中，如果用在普通函数，就会报错。
*     async 函数可以保留运行堆栈。
* */

async function getStockPriceByName(name) {
    const symbol = await getStockSymbol(name);
    const stockPrice = await getStockPrice(symbol);
    return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
    console.log(result);
});

//b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()，错误堆栈将包括a()。
const a = async () => {
    await b();
    c();
};
