/*
http://www.ruanyifeng.com/blog/2014/10/event-loop.html
https://segmentfault.com/a/1190000012258592
* */

/*
同步任务:在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
异步任务:不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，
         该任务才会进入主线程执行。
* */

/*
js 异步执行的运行机制:
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，
     结束等待状态，进入执行栈，开始执行。
（4）主线程不断重复上面的第三步。
* */

/*
浏览器事件循环:
主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。
* */

/*
定时器:
1.除了放置异步任务的事件，"任务队列"还可以放置定时事件，即指定某些代码在多少时间之后执行。
2.setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。
它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。
3.setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。
要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。
* */

/*
https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
Node.js的事件循环:
        在进程启动时，Node会创建一个类似于while(true)的循环，每执行一次循环体的过程，称为tick，每个tick的过程就是查看
    是否有事件待处理，如果有就取出事件及相关回调函数，若存在回调函数，就执行他们。然后进入下次循环，若不再有事件需要
    处理，就退出进程。
        如何判断是否有事件需要处理？每个事件循环中，有一个或多个观察者，判断是否有事件要处理的过程，就是向这些观察者
    询问是否有要处理的事件。Node中事件主要来源于网络请求、文件IO等，这些事件对应的观察者有文件IO观察者，网络IO观察者等，
    事件循环是生产者/消费者模型，异步IO、网络请求是事件的生产者，为Node提供不同类型的事件，这些事件被传递到对应的观察者
    那里，事件循环从观察者那里取出事件并处理。
    6个阶段：
      1.timer阶段：执行已经到点的setTimeout()和setInterval()的回调函数
      2.IO阶段：执行延迟到下一个循环迭代的 I/O 回调
      3.idle、prepare阶段（内部实现）
      4.poll阶段：
        计算应该阻塞和轮询I/O的时间
        执行poll队列中的事件
          并且当 poll 中没有定时器的情况下，会发现以下两件事情：
          (1)如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者系统限制
          (2)如果 poll 队列为空，会有两件事发生:
             如果有 setImmediate 需要执行，poll 阶段会停止并且进入到 check 阶段执行 setImmediate
             如果没有 setImmediate 需要执行，会等待回调被加入到队列中并立即执行回调
             一旦poll队列为空，事件循环将检查是否有到点的定时器需要被执行，如果有，则会回到 timer 阶段执行回调
      5.check阶段：setImmediate() 回调函数在这里执行
      6.close callbacks阶段：一些准备关闭的回调函数
* */
/*
* Node.js异步IO的过程：
*   1.发起异步调用；
*   2.包装请求对象，设置参数和回调函数；
*   3.请求对象包装完成后，将其推入线程池等待执行。
*   4.若线程可用，执行请求对象中的IO操作，将执行完的结果放在请求对象中，通知IOCP调用完成。最后归还线程。
*   5.当IOCP调用完成时，时间循环会获取到完成的IO，交给IO观察者。
*   6.当Node进程启动时就会创建事件循环，每次循环中，会从IO观察者取出可用的请求对象，从请求对象中取出回调函数和
*   结果调用执行。
* */


/*
process.nextTick:  在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。
                   它指定的任务总是发生在所有异步任务之前。
setImmediate：在当前"任务队列"的尾部添加事件，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。
区别：
1.多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。
2.由于process.nextTick指定的回调函数是在本次"事件循环"触发，而setImmediate指定的是在下次"事件循环"触发，所以，前者总是比后者发生得早，而且执行效率也高（因为不用检查"任务队列"）。
* */

process.nextTick(function A() {
    console.log(1);
    process.nextTick(function B(){console.log(2);});
});

setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
}, 0)
// 1
// 2
// TIMEOUT FIRED

setImmediate(function A() {
    console.log(1);
    setImmediate(function B(){console.log(2);});
});

setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
}, 0);
//哪个回调函数先执行呢？答案是不确定。运行结果可能是1--TIMEOUT FIRED--2，也可能是TIMEOUT FIRED--1--2。

setImmediate(function (){
    setImmediate(function A() {
        console.log(1);
        setImmediate(function B(){console.log(2);});
    });

    setTimeout(function timeout() {
        console.log('TIMEOUT FIRED');
    }, 0);
});
// 1
// TIMEOUT FIRED
// 2