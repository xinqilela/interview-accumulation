var foo = {},
    F = function () {
    };
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

/*console.log(foo.a) //value a
console.log(foo.b) //undefined
console.log(F.a) //value a
console.log(F.b) //value b*/

/*
* 构造函数不需要显示的返回值。使用new来创建对象(调用构造函数)时，如果return的是非对象(数字、字符串、布尔类型等)
* 会忽而略返回值;如果return的是对象，则返回该对象(注：若return null也会忽略返回值）。
* */
function Person(name) {
    this.name = name
    return name;
}

let p = new Person('Tom');

// console.log(p); //{ name: 'Tom' }
function Person(name) {
    this.name = name
    return {}
}

let p2 = new Person('Tom');
// console.log(p2); //{}


/*
* typeof和instanceof的区别:
*   typeof 运算符把类型信息当作字符串返回。typeof 返回值有六种可能： "number," "string," "boolean," "object," "function," 和 "undefined."
*   instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置。
* */
// console.log(typeof n) //undefined
// console.log(typeof 1) //number
// console.log(typeof 'aa') //string
// console.log(typeof true) //boolean
// console.log(typeof {}) //object
// console.log(typeof null) //object
// console.log(typeof []) //object
// console.log(typeof Person) //function

for(var i = 0; i < 10; i++) {
    setTimeout(() => {
        // console.log(i)
    }, 0)
}

for(var i = 0; i < 10; i++) {
    (function(i){
        setTimeout(() => {
            // console.log(i)
        }, 0)
    })(i);
}

/*
* for of:
*   es6引入了for...of循环，作为遍历所有数据结构的统一的方法。一个数据结构只要部署了Symbol.iterator属性，就被视为
*   具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator
*   方法。
*   (1)for...of循环遍历数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、
*      字符串等拥有iterator 接口的数据结构。与forEach()不同的是，它可以正确响应break、continue和return语句。
*   (2)for-of循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用for-in循环（这也是它的本职工作）或内建的
*      Object.keys()方法
*    调用步骤：
*      or-of循环首先调用集合的Symbol.iterator方法，紧接着返回一个新的迭代器对象。迭代器对象可以是任意具有.next()方法的对象；
*      for-of循环将重复调用这个方法，每次循环调用一次。
*   注：对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。
* for in:
*   for...in循环主要是为遍历对象而设计的，不适用于遍历数组。
*   (1)数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
*   (2)使用for in会遍历数组所有的可枚举属性，包括原型。。
*   (3)遍历顺序有可能不是按照实际数组的内部顺序
* */

/*
* Macrotasks和Microtasks：
* Macrotasks【宏任务】的API: setTimeout, setInterval, setImmediate, I/O, UI rendering
* Microtasks【微任务】的API: process.nextTick, Promise, MutationObserver
* 任务队列分为 macrotasks 和 microtasks, 而promise中的then方法的函数会被推入到microtasks队列中，而setTimeout函数会被
* 推入到macrotasks任务队列中，在每一次事件循环中，macrotask只会提取一个执行，而microtask会一直提取，直到microsoft队列
* 为空为止。也就是说如果某个microtask任务被推入到执行中，那么当主线程任务执行完成后，会循环调用该队列任务中的下一个任务
* 来执行，直到该任务队列到最后一个任务为止。而事件循环每次只会入栈一个macrotask,主线程执行完成该任务后又会检查microtasks
* 队列并完成里面的所有任务后再执行macrotask的任务。
* */

/*
* react-router的实现原理：
* https://blog.csdn.net/tangzhl/article/details/79696055
* */

/*
* http缓存策略：
* 1.强缓存 & 协商缓存
*   区别：在使用本地缓存时，是否需要向服务器验证本地缓存是否依旧有效
*   -强缓存：在使用本地缓存时，不需要向服务器验证本地缓存是否依旧有效
*            (1)强缓存主要是通过http响应头中的Cache-Control和Expire两个字段控制。
*            (2)Expires是一个绝对时间，即服务器时间。浏览器检查当前时间，如果还没到失效时间就直接使用缓存文件。
*               但是该方法存在一个问题：服务器时间与客户端时间可能不一致。因此该字段已经很少使用。
*            (3)cache-control中的max-age保存一个相对时间。例如Cache-Control: max-age = 484200，表示浏览器收到文件
*               后，缓存在484200s内均有效。如果同时存在cache-control和Expires，浏览器总是优先使用cache-control。
*   -协商缓存：在使用本地缓存时，需要向服务器验证本地缓存是否依旧有效，最终确定是否使用本地缓存。
*              协商缓存需要客户端和服务端共同实现。
*             (1)协商缓存通过HTTP请求头中的的last-modified，Etag字段进行判断
*             (2)last-modified是第一次请求资源时，服务器返回的字段，表示最后一次更新的时间。下一次浏览器请求资源时
*                就发送if-modified-since字段。服务器用本地Last-modified时间与if-modified-since时间比较，如果不一致
*                则认为缓存已过期并返回新资源给浏览器；如果时间一致则发送304状态码，让浏览器继续使用缓存。
*             (3)Etag资源的实体标识（哈希字符串），当资源内容更新时，Etag会改变。下一次浏览器请求资源会发送If-None-Match
 *               字段给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来。并且 ETag 优先级比 LastModified 高
* */

function tecent() {

}
// tecent.a=1;
// tecent.b='q';
// console.log(tecent.prototype.a,',',tecent.prototype.a);

var a = 0;
var b = async () => {
    a = a + await 10
    console.log('2', a) // -> '2' 10
    a = (await 10) + a
    console.log('3', a) // -> '3' 20
}
b()
a++
console.log('1', a) // -> '1' 1

/*
1 1
2 10
3 20
* */