/**
 * Created by Administrator on 2019/2/18 0018.
 */

// Promise 新建后立即执行，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行。
// reject方法的作用，等同于抛出错误

/*function timeout(ms) {
 return new Promise((resolve, reject) => {
 setTimeout(resolve, ms);
 });
 }

 timeout(1000).then(() => {
 console.log('aaa');
 });*/

/*var promise = new Promise((resolve,reject)=>{
 console.log(1);
 resolve('promise');
 });

 promise.then((value)=>{
 console.log(value);
 });

 console.log('hi');  // 1 hi promise*/

/*
 function getJSON(url) {
 return new Promise((resolve, reject) => {

 const handler = () => {
 try {
 // 请求响应过程的当前活动阶段（0未初始化，1启动，2发送，3已接收部分数据，4已接收全部数据且可在客户端使用）
 if (this.readyState !== 4) {
 return;
 }
 // status为响应的状态码，statusText为响应的状态码的说明
 if (this.status == 200) {
 resolve(this.response);
 } else {
 reject(new Error(this.statusText));
 }
 } catch (e) {
 console.log('error');
 }

 };

 var xhr = new XMLHttpRequest();
 // 不会真正发送请求，而是启动一个请求，以备发送；第3个参数表示是否发送异步请求；
 // get传参: xhr.open('GET', 'url?name1=value1&name2=value2', true)；查询参数的名和值都要经过encodeURIComponent编码
 // post传参: 把数据作为请求主体提交，xhr.send(new FormData(form));
 xhr.open('GET', url, true);
 xhr.onreadystatechange = handler;
 xhr.timeout = 1000;
 xhr.ontimeout = function () {
 console.log('timeout');
 };
 xhr.responseType = 'json';
 xhr.setRequestHeader('Accept', 'application/json');
 // 参数为作为请求主体发送的数据，若不需要，则须传入null（此参数对某些浏览器来说是必须的）
 xhr.send(null);
 });
 }

 getJSON("/posts.json").then(function(json) {
 console.log('Contents: ' + json);
 }, function(error) {
 console.error('出错了', error);
 });*/


/*
 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，
 Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。Promise 内部的错误不会影响到 Promise 外部的代码。
 */
 /*const someAsyncThing = function() {
 return new Promise(function(resolve, reject) {
 // 下面一行会报错，因为x没有声明，但不会退出进程或者终止脚本的执行
 resolve(x + 2);
 });
 };
 someAsyncThing().then(function() {
 console.log('everything is great');
 });
 setTimeout(() => { console.log(123) }, 2000);
 // Uncaught (in promise) ReferenceError: x is not defined
 // 123*/

/*
 Promise 指定在下一轮“事件循环”再抛出错误。到了那个时候，Promise 的运行已经结束了，
 所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误。
 * */
/*const promise = new Promise(function (resolve, reject) {
    resolve('ok');
    setTimeout(function () {
        throw new Error('test')
    }, 0)
});
promise.then(function (value) {
    console.log(value)
});*/
// ok
// Uncaught Error: test

//finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

/*//all方法将多个 Promise 实例，包装成一个新的 Promise 实例，所有promise实例状态变为resolved新promise才会变为resolved，
 //只要有一个promise状态变为rejected,新promise才会变为rejected
 // 生成一个Promise对象的数组
 const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
 return getJSON('/post/' + id + ".json");
 });
 Promise.all(promises).then(function (posts) {
 console.log('上述6个请求均完成，结果是：',posts);
 }).catch(function(reason){
 console.log('error');
 });*/

/*
 如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
 p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上
 是这个实例。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，
 因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。 如果p2没有自己的catch方法，就会调用
 Promise.all()的catch方法
 * */
/*
 const p1 = new Promise((resolve, reject) => {
 resolve('hello');
 }).then(result => result)
 .catch(e => e);

 const p2 = new Promise((resolve, reject) => {
 throw new Error('报错了');
 }).then(result => result)
 .catch(e => e);

 Promise.all([p1, p2])
 .then(result => console.log(result))
 .catch(e => console.log(e));
 // ["hello", Error: 报错了]*/

/*
//race将多个 Promise 实例，包装成一个新的 Promise 实例。只要有一个promise实例的状态发生改变，新promise的状态就会
//跟着改变。如下如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。
const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
    })
]);

p.then(console.log)
  .catch(console.error);*/

/*Promise.resolve将现有对象转为 Promise 对象。
  立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。
  4种参数情况：
     1.如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
     2.参数是一个thenable对象，Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
     3.参数不是具有then方法的对象，或根本就不是对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
     4.不带有任何参数，直接返回一个resolved状态的 Promise 对象。
*/
/*let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value);  // 42
});

const p = Promise.resolve('Hello');
p.then(function (s){
    console.log(s)
});
// Hello

setTimeout(function () {
    console.log('three');
}, 0);
Promise.resolve().then(function () {
    console.log('two');
});
console.log('one');
// one
// two
// three*/

/*
* Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
* Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数
* */
/*
const thenable = {
    then(resolve, reject) {
        reject('出错了');
    }
};
Promise.reject(thenable)
    .catch(e => {
        console.log(e === thenable)
    })
// true*/

// 使用立即执行的匿名函数，执行new Promise()。这种情况下，同步函数也是同步执行的。
const f = () => console.log('now');
(
    () => new Promise(
        resolve => resolve(f())
    )
)();
console.log('next');
