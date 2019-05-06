/*
https://juejin.im/post/5b18fd93f265da6e1b5548e0#heading-9
https://www.cnblogs.com/cencenyue/p/7604651.html
* 1.cookie:
*   https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies
*   https://segmentfault.com/a/1190000004556040
*   是服务器发送到用户浏览器并保存在本地的一小块数据,会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
*   作用：
*      (1)会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
*      (2)个性化设置（如用户自定义设置、主题等）
*   用法:
*     服务端向客户端发送的cookie(HTTP头，带参数)：Set-Cookie: <cookie-name>=<cookie-value>;(可选参数1);(可选参数2)
*     客户端设置cookie：document.cookie = "<cookie-name>=<cookie-value>;(可选参数1);(可选参数2)"
*     可选参数:
*       Expires=<date>：cookie的最长有效时间，若不设置则cookie生命期与会话期相同
*       Max-Age=<non-zero-digit>：cookie生成后失效的秒数
*       Domain=<domain-value>：指定cookie可以送达的主机域名，若一级域名设置了则二级域名也能获取
*       Secure：必须在请求使用SSL或HTTPS协议的时候cookie才回被发送到服务器
*       HttpOnly：客户端无法更改Cookie，客户端设置cookie时不能使用这个参数，一般是服务器端使用
*   缺点：
*      (1)服务器指定Cookie后，浏览器的每次请求都会携带Cookie数据，会带来额外的性能开销
*      (2)存储数量有限,大小限制为4KB左右
*      (3)原生API不如storage友好，需要自己封装函数
* 2.localStorage
*   用法:
*     localStorage.setItem('myCat', 'Tom');
*     localStorage.getItem('myCat');
*     localStorage.removeItem('myCat');
*     localStorage.clear();
*   优点:
*     localStorage拓展了cookie的4K限制，且不会随着请求发送
*   缺点：
*     (1)所有的浏览器中都会把localStorage的值类型限定为string类型，这个在对我们日常比较常见的JSON对象类型需要一些转换
*     (2)localStorage在浏览器的隐私模式下面是不可读取的
*     (3)localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡
* 3.sessionStorage：
*   存储在 sessionStorage 里面的数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会
*   保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。
*   用法:
*     sessionStorage.setItem('key', 'value');
*     let data = sessionStorage.getItem('key');
*     sessionStorage.removeItem('key');
*     sessionStorage.clear();
*  4.indexDB：HTML5规范里新出现的浏览器里内置的数据库
*    提供了类似数据库风格的数据存储和使用方式。但IndexedDB里的数据是永久保存，适合于储存大量结构化数据，有些数据本应该存在服务器，
*    但是通过indexedDB，可以减轻服务器的大量负担，实现本地读取修改使用，以对象的形式存储，每个对象都有一个key值索引。IndexedDB里
*    的操作都是事务性的。一种对象存储在一个object store里，object store就相当于关系数据库里的表。IndexedDB可以有很多object store，
*    object store里可以有很多对象。
*    优点：
*      可以实现离线访问
*      数据储存量无限大，Chrome规定了最多只占硬盘可用空间的1/3，可以储存结构化数据带来的好处是可以节省服务器的开支
*    缺点：
*      兼容性问题
*      API类似SQL比较复杂，操作大量数据的时候，可能存在性能上的消耗。
*      用户在清除浏览器缓存时，可能会清除IndexedDB中相关的数据。
*      同源策略，部分浏览器如Safari手机版隐私模式在访问IndexedDB时，可能会出现由于没有权限而导致的异常（LocalStorage也会），
*      需要进行异常处理。
*  5.ServiceWorker：
*      本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够
*      创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知
*      和后台同步API。Service worker运行在worker上下文，因此它不能访问DOM。相对于驱动应用的主JavaScript线程，它运行在其他线程中，
*      所以不会造成阻塞。
*      注册: 使用 navigator.serviceWorker.register() 方法首次注册service worker。如果注册成功，service worker就会被下载到客户端并尝试安装或激活.
*      生命周期: 下载、安装、激活
* */

/*
* localStorage && sessionStorage
* 共同点：
*   (1)存储大小均为5M左右
*   (2)都有同源策略限制
*   (3)仅在客户端中保存，不参与和服务器的通信
* 不同点：
*   (1)localStorage: 存储的数据是永久性的，除非用户人为删除否则会一直存在。
*      sessionStorage: 与存储数据的脚本所在的标签页的有效期是相同的。一旦窗口或者标签页被关闭，那么所有通过 sessionStorage 存储
*                      的数据也会被删除。
*   (2)localStorage: 在同一个浏览器内，同源文档之间共享 localStorage 数据，可以互相读取、覆盖。
*      sessionStorage: 与 localStorage 一样需要同一浏览器同源文档这一条件。不仅如此，sessionStorage 的作用域还被限定在了窗口中，
*      只有同一浏览器、同一窗口的同源文档才能共享数据。
* */

//给localStorage加过期时间
const set = function (key, value, expired = 0) {
    if (expired) {
        expired = Date.now() + 1000 * expired;
    }
    let obj = {value: value, expired: expired};
    localStorage.setItem(key, JSON.stringify(obj));
    return value;
};
const get = function (key) {
    let obj = JSON.parse(localStorage.getItem(key));
    var expired = obj.expired || Date.now() + 1;
    var now = Date.now();
    console.log(expired, now);
    if (now >= expired) {
        localStorage.removeItem(key);
        return;
    }
    return obj.value;
};
const remove = function (key) {
    var obj = JSON.parse(localStorage.getItem(key));
    localStorage.removeItem(key);
    return obj.value;
};
//
// set('aaa', 'aaaaaaaaaaa', 3);
// setTimeout(function () {
//     console.log('6s', get('aaa'));
// }, 6000);
// console.log('now', get('aaa'));

//indexDb
//注意：创建object store对象只能从onupgradeneeded版本变化回调中进行。
var my = {
    name: 'juejin',
    version: '1',
    db: null
};
var request = window.indexedDB.open(my.name);  //创建打开仓库
request.onupgradeneeded = function () {//更新版本回调
    var db = request.result;
    var objectStore = db.createObjectStore("LOL", {keyPath: "isbn"});
    var heroIndex = objectStore.createIndex("by_hero", "hero", {unique: true});
    var authorIndex = objectStore.createIndex("by_author", "author");
    objectStore.put({hero: "亚索", author: "Roit", isbn: 123456});
    objectStore.put({hero: "提莫", author: "Roit", isbn: 234567});
    objectStore.put({hero: "诺手", author: "Hang", isbn: 345678});
};
request.onsuccess = function (event) {//成功回调
    my.db = event.target.result || request.result;
    //IndexedDB中，使用事务来进行数据库的操作。事务有三个模式: readOnly只读、readwrite读写、versionchange数据库版本变化
    var transaction = my.db.transaction('LOL', 'readwrite');
    var targetObjectStore = transaction.objectStore('LOL');
    var obj = targetObjectStore.get(345678);
    //如果获取成功，执行回调
    obj.onsuccess = function (e) {
        console.log('数据成功获取' + e.target.result)
    }
    //获取失败
    obj.onerror = function (e) {
        console.error('获取失败:' + e.target.result)
    }
    targetObjectStore.add({hero: "盖伦", author: "Yuan", isbn: 163632});
    targetObjectStore.add({hero: "德邦", author: "Dema", isbn: 131245});
    targetObjectStore.add({hero: "皇子", author: "King", isbn: 435112});
    targetObjectStore.delete(345678);
    //bound('边界值',Boolean);匹配key>22000&&key<=400000;
    var index = IDBKeyRange.bound(220000,400000,true,false);
    var eachData = targetObjectStore.openCursor(index,IDBCursor.NEXT);
    eachData.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            console.log(cursor);
            cursor.continue();
        }
    };
    eachData.onerror = function (event) {
        console.error('each all data fail reason:' + event.target.result);
    };
};
request.onerror = function () {//失败回调
    console.warn(`${my.name} indexedDB is fail open  Version ${my.version}`);
};




