/*
http://www.ruanyifeng.com/blog/2016/04/cors.html
http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
* */

/*
同源策略(一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。):
    限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。
    所谓同源是指域名，协议，端口相同。
    解决方案:CORS、JSONP、WebSocket
* */

/*
CORS: 是一个W3C标准，全称是"跨域资源共享"，它允许浏览器向跨源服务器发出XMLHttpRequest请求，从而克服跨域问题，它需要浏览器和服务器的同时支持。
   注：浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
   解决方案：
     浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。
         对于简单请求，浏览器直接发出CORS请求，在头信息之中，增加一个Origin字段，说明该请求来自哪个源。服务器根据这个值，决定是否同意这次请求。
     如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段，
     就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。但这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。
     如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段
     （[必须]Access-Control-Allow-Origin:表示接受哪个域名的请求、
     [可选]Access-Control-Allow-Credentials:表示是否允许发送Cookie[只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可]、
     [可选]Access-Control-Expose-Headers:CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。想拿到其他字段，就必须在Access-Control-Expose-Headers指定）。
     注：
     CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定Access-Control-Allow-Credentials字段。另一方面，开发者必须在AJAX请求中打开withCredentials属性。
     如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名
         对于非简单请求,会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）,浏览器先询问服务器，
     当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。。
     "预检"请求的头信息包括两个特殊字段:     [必须]Access-Control-Request-Method:列出浏览器的CORS请求会用到哪些HTTP方法、Access-Control-Request-Headers:指定浏览器CORS请求会额外发送的头信息字段。
     服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
     如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。
     一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。
     服务器回应的其他CORS相关字段:
         [必须]Access-Control-Allow-Methods：表明服务器支持的所有跨域请求的方法（避免多次"预检"请求）、
         [若请求包括Access-Control-Request-Headers，则Access-Control-Allow-Headers必须]Access-Control-Allow-Headers：表明服务器支持的所有头信息字段、
         [可选]Access-Control-Max-Age:指定本次预检请求的有效期（s）。
* */

/*
JSONP:利用script标签没有跨域限制，通过script标签的src属性发送GET请求,服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。
    怎么拿到请求的数据呢？方法就是前后端约定一个callback字段名，来传递函数名，前端通过该函数来拿到数据。
    由于<script>元素请求的脚本，直接作为代码运行。只要浏览器定义了callback指定的函数，该函数就会立即调用。
    作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用JSON.parse的步骤。
* */

/*
比较：
CORS与JSONP的使用目的相同，但是比JSONP更强大。
JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
* */

/*
* document.domain:可用来得到当前网页的域名。
* 可以给document.domain属性赋值，不过是有限制的，你只能赋成当前的域名或者基础域名。这是为了防止有人恶意修改document.domain来实现跨域偷取数据。
* 实现跨域:
*   前提条件：这两个域名必须属于同一个基础域名!而且所用的协议，端口都要一致，否则无法利用document.domain进行跨域.
*   该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。
*   只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域
* */
<!-- foo.com/a.html -->
/*
<iframe id="ifr" src="http://img.foo.com/b.html"></iframe>
<script>
document.domain = 'foo.com';
function aa(str) {
    console.log(str);
}
window.onload = function () {
        document.querySelector('#ifr').contentWindow.bb('aaa');
}
</script>
*/

/*
https://juejin.im/entry/57d7c8005bbb50005bd0de1e
* window.postMessage(message, targetOrigin, [transfer])：方法可以安全地实现跨源通信。
* 1.message事件的属性：data(从其他window中传来的对象)，origin(调用postMessage时发送窗口的origin)，source(对发送消息的窗口对象的引用)
* 2.如果不是使用 window.open() 打开的页面或者 iframe 嵌入的页面，就跟当前页面扯不上任何关系，是无法使用 window.postMessage() 进行跨域通信的！
* 3.window.postMessage() 中的 window 到底是什么呢？是你要通信的目标页面的 window！！！
*   eg1: PageA 页面内嵌入 iframe PageB 页面
*        -PageA 页面向 PageB 页面发送跨域信息，window 为 PageB 页面的 window，即 iframe.contentWindow。
*        -PageB 页面向 PageA 页面发送跨域信息，window 为 PageA 页面的 window，即 top 或者 parent。
*   eg2: PageA 页面内代码使用 window.open() 打开 PageB 页面
*        -PageA页面向PageB页面发送跨域信息，window 为 var pageB = window.open('http://192.168.197.157:3000/pageB.html') 中的变量 pageB。
*        -PageB页面无法主动给PageA页面发送跨域信息，必须先接收到PageA页面发送过来的 message然后再通过event.source发送给 PageA，此时的 window 就是 event.source，
*         即 PageA 的 window。
* 4.如果有两个页面 PageA 和 PageB，PageA 页面内嵌入 iframe PageB，那么理论上是应该可以实现双向通信的，如何实现？
*      PageA 通过 window.postMessage() 发送一个信息给 PageB，PageB 在 window 上添加一个事件监听绑定 message 事件可以接收到来自任何
* 不同域名通过 postMessage 方法发送过来的信息，当 PageB 接收到 PageA 发送过来的信息时执行监听事件就 OK，在监听事件的 event 参数中
* 包含了所有 message 事件接收到的相关数据。包括发送信息的内容 event.data，发送信息的域名 event.origin 等等。同样的，在 PageA 内添加
* 一个事件监听绑定 message 事件，在 PageB 内通过 postMessage 方法发送信息给 PageA 一样可以进行跨域通信。
* */


/*
WebSocket：
    一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。
* */