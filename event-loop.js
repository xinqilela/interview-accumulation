/*
http://lynnelv.github.io/js-event-loop-browser
http://lynnelv.github.io/js-event-loop-nodejs
* */

/*
浏览器的事件循环：
单线程：js引擎中负责解析执行js代码的线程只有一个（主线程）。
同步任务: 在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
异步任务: 不进入主线程、而进入"任务队列"（task queue）的任务，若有多个异步任务则要在任务队列中排队等待，任务队列类似一个缓冲区，任务下一步会被移到调用栈，然后主线程执行调用栈的任务。
任务队列：
  宏任务队列：整体js代码、事件回调、xhr回调、定时器（setTimeout,setInterval,setImmediate）、IO操作、UI渲染
  微任务队列：promise回调、process.nextTick、Object.observer
事件循环：
  1.检查宏任务队列是否为空，若不为空，执行宏任务队列中的一个任务，否则检查微任务队列是否为空
  2.若微任务队列不为空，取出一个微任务执行，然后继续循环检测微任务队列，直到微任务队列为空，若微任务队列为空，判断是否需要更新视图
  3.若需要更新则更新视图，完成更新后进入下一轮事件循环，若不需要更新视图直接进入下一轮事件循环
总结：
  每轮事件循环步骤：执行macrotask中的一个任务 --> 执行microtask中的所有任务 --> UI render
  浏览器只保证requestAnimationFrame的回调在重绘之前执行，没有确定的时间，何时重绘由浏览器决定
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
Node.js的事件循环:
Node.js采用v8作为js的解析引擎，在IO处理方面使用了自己设计的libuv,libuv是一个机遇事件驱动的跨平台抽象层，封装了不同操作系统的底层特性，对外提供同一的api,事件循环就是由他实现的。
事件循环（6个阶段）：
  1.timer阶段：执行timer（setTimeout/setInterval）的回调
  2.IO callbacks：执行一些系统调用错误，如网络通信错误回调
  3.idle,prepare：仅内部使用
  4.poll阶段：获取新的IO事件，适当条件下node将会阻塞在这里
    2个主要功能：
      处理poll队列的事件
      当有已超时的timer,执行他们的回调
    even loop将同步执行poll队列里的回调，直到队列为空或执行的回调达到系统上限，接下来even loop会去检查有无预设的setImmediate，分两种情况：
      若有预设的setImmediate(), event loop将结束poll阶段进入check阶段，并执行check阶段的任务队列；
      若没有预设的setImmediate()，event loop将阻塞在该阶段等待。
      在poll阶段event loop会有一个检查机制，检查timer队列是否为空，如果timer队列非空，event loop就开始下一轮事件循环，即重新进入到timer阶段
  5.check阶段：执行setImmediate回调
  6.close callbacks阶段：执行close事件的回调
总结：
  1.event loop 的每个阶段都有一个任务队列
  2.当事件循环到达某个阶段，执行该阶段的任务队列，直到队列清空或达到系统上限，才会进入下一阶段
  3.当所有阶段被顺序执行一次时，被称为一次tick
* */

/*
* 浏览器时间循环 vs Node.js时间循环：
  2种环境下，微任务的执行时机不同，浏览器中，微任务队列在每个宏任务执行完毕后执行，Node环境中，微任务队列在时间循环的各个阶段进行
  注：递归的调用process.nextTick()会导致I/O starving，官方推荐使用setImmediate()
* */

/*
* Node.js异步IO的过程：
*   1.发起异步调用；
*   2.包装请求对象，设置参数和回调函数；
*   3.请求对象包装完成后，将其推入线程池等待执行。
*   4.若线程可用，执行请求对象中的IO操作，将执行完的结果放在请求对象中，通知IOCP调用完成。最后归还线程。
*   5.当IOCP调用完成时，事件循环会获取到完成的IO，交给IO观察者。
*   6.当Node进程启动时就会创建事件循环，每次循环中，会从IO观察者取出可用的请求对象，从请求对象中取出回调函数和结果调用执行。
* */


/*
process.nextTick:  在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。
                   它指定的任务总是发生在所有异步任务之前。
setImmediate：在当前"任务队列"的尾部添加事件，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。
区别：
1.多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。
2.由于process.nextTick指定的回调函数是在本次"事件循环"触发，而setImmediate指定的是在下次"事件循环"触发，所以，
  前者总是比后者发生得早，而且执行效率也高（因为不用检查"任务队列"）。
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