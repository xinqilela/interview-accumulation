/*
https://segmentfault.com/a/1190000006879700
* 从输入 URL 到页面展现中间发生了什么?
  1.DNS解析(浏览器查找域名的IP地址)
  2.发起TCP的3次握手
  3.建立TCP连接后,发送HTTP请求
  4.服务器处理请求并返回HTTP报文
  5.浏览器解析html代码，并请求html代码中的资源（如js、css、图片等）
  6.浏览器对页面进行渲染呈现给用户
  7.四次挥手结束
* */

/*
* DNS解析过程:
https://imweb.io/topic/55e3ba46771670e207a16bc8
* 1.查找浏览器缓存
*     浏览器会检查缓存中有没有这个域名对应的解析过的IP地址，如果缓存中有，这个解析过程就将结束。
*     在谷歌浏览第的地址栏输入about:DNS回车后可看到本地DNS缓存记录
* 2.查找系统缓存
*     如果用户的浏览器缓存中没有，浏览器会查找操作系统缓存中是否有这个域名对应的DNS解析结果。其实操作系统也会有一个域名解析的过程，
*     在Windows中可以通过C:\Windows\System32\drivers\etc\hosts文件来设置，你可以将任何域名解析到任何能够访问的IP地址。如果你在这
*     里指定了一个域名对应的IP地址，那么浏览器会首先使用这个IP地址。
*     通过ipconfig /displaydns命令查看dns系统缓存
* 3.查找路由器缓存
*     如果系统缓存中也找不到，那么查询请求就会发向路由器，它一般会有自己的DNS缓存
* 4.查找(因特网服务提供商)ISP DNS 缓存
*     若路由器缓存未命中,则查询ISP DNS 缓存服务器。在我们的网络配置中都会有"DNS服务器地址"这一项，操作系统会把这个域名发送给这里
*     设置的DNS，也就是本地区的域名服务器，通常是提供给你接入互联网的应用提供商。这个专门的域名解析服务器性能都会很好，它们一般都
*     会缓存域名解析结果。大约80%的域名解析都到这里就已经完成了，所以ISP DNS主要承担了域名的解析工作。
* 5.递归搜索
*     若前面的办法都未命中DNS缓存,则:
*     (1)本地 DNS服务器将该请求转发到互联网上的根域
*     (2)根域将所要查询域名中的顶级域（假设要查询ke.qq.com，该域名的顶级域就是com）的服务器IP地址返回到本地DNS
*     (3) 本地DNS根据返回的IP地址，再向顶级域（就是com域）发送请求
*     (4) 顶级域服务器再将域名中的二级域（即ke.qq.com中的qq）的IP地址返回给本地DNS
*     (5) 本地DNS再向二级域发送请求进行查询
*     (6) 之后不断重复这样的过程，直到本地DNS服务器得到最终的查询结果，并返回到主机。这时候主机才能通过域名访问该网站。
* */

/*
* TCP连接3次握手过程:
  1.client发送一个SYN(J)包给server，然后等待server的ACK回复，进入SYN-SENT状态。
  2.server接收到SYN(J)包后就返回一个ACK(J+1)包以及一个自己的SYN(K)包，然后等待client的ACK回复，
    server进入SYN-RECIVED状态。
  3.client接收到server发回的ACK(J+1)包后，进入ESTABLISHED状态。然后根据server发来的SYN(K)包，
    返回给等待中的server一个ACK(K+1)包。等待中的server收到ACK回复，也把自己的状态设置为ESTABLISHED。
    到此TCP三次握手完成
* TCP释放4次握手过程:
  1.client发送一个FIN(M)包，此时client进入FIN-WAIT-1状态，这表明client已经没有数据要发送了。
  2.server收到了client发来的FIN(M)包后，向client发回一个ACK(M+1)包，此时server进入CLOSE-WAIT状态，
    client进入FIN-WAIT-2状态。
  3.server向client发送FIN(N)包，请求关闭连接，同时server进入LAST-ACK状态。
  4.client收到server发送的FIN(N)包，进入TIME-WAIT状态。向server发送**ACK(N+1)**包，server收到client的ACK(N+1)包以后，
     进入CLOSE状态；
  5.client等待一段时间还没有得到回复后判断server已正式关闭，进入CLOSE状态。
* */

/*
* TCP && UDP
* 1.TCP协议是面向连接；UDP协议采用无连接；TCP用三次握手建立连接,UDP发送数据前不需要建立连接。
* 2.TCP提供可靠传输，UDP不可靠；TCP丢包会自动重传，UDP不会。
* 3.TCP传输慢，UDP传输快；因为TCP需要建立连接、保证可靠性和有序性，所以比较耗时。
* 4.TCP的头部比UDP大；TCP头部需要20字节，UDP头部只要8个字节
* 5.TCP有序，UDP无序；消息在传输过程中可能会乱序，后发送的消息可能会先到达，TCP会对其进行重排序，UDP不会。
* 6.TCP面向字节流，UDP面向报文。
* 7.TCP有流量控制（滑动窗口），UDP没有。
* 8.TCP有拥塞控制（慢开始、拥塞避免、快重传、快恢复），UDP没有。
* */

/*
https://juejin.im/post/59d489156fb9a00a571d6509
* 浏览器的渲染过程?
    1.解析 HTML 标记并构建 DOM 树。（字节->字符->令牌->节点对象->对象模型）
    2.解析 CSS 并构建 CSSOM 树。（字节->字符->令牌->节点对象->对象模型）
    3.将 DOM 与 CSSOM 合并成一个渲染树。
    4.根据渲染树来布局，以计算每个节点的几何信息。
    5.调用 GPU 绘制，合成图层，显示在屏幕上。
  从流程我们可以看出来：
    1.DOM解析和CSS解析是两个并行的进程，所以这也解释了为什么CSS加载不会阻塞DOM的解析。
    2.由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成后，才开始渲染。因此，CSS加载是会阻塞Dom的渲染的。
    3.由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕。所以css会阻塞后面js的执行。
  渲染优化：
    1.使用媒体查询。（让css资源只在特定条件下使用，这些资源就可以在首次加载时先不进行构建CSSOM树，只在复合特定条件时，浏览器才会进行阻塞构建CSSOM树）
      <link href='print.css' rel='stylesheet'  media='print'/>
    2.浏览器的html解析器遇到一个script标记时会暂停构建DOM,然后将控制权移交至js引擎，这时引擎开始执行js脚本，直到执行结束，浏览器才会从之前中断的地方恢复，然后继续构建DOM。
      deffer: 立即下载，延迟执行，html5规范要求脚本按出现的先后顺序执行，但现实环境并不一定如此（脚本会被延迟到整个页面都解析完毕后再运行）。
      async:  立即下载，立即执行，不保证脚本执行顺序。
* */

/*
* http协议、https
  https://juejin.im/entry/57ff5c5b0bd1d00058e5b2aa
  https://zhuanlan.zhihu.com/p/27395037
  请求：请求行、请求头、空行、请求体（get请求无）
  响应：状态行、消息头、空行、响应正文
  1.Connection:keep-alive
    在早期的HTTP/1.0中，每次http请求都要创建一个连接，而创建连接的过程需要消耗资源和时间，为了减少资源消耗，缩短响应
  时间，就需要重用连接。在后来的HTTP/1.0中以及HTTP/1.1中，引入了重用连接的机制，就是在http请求头中加入Connection: keep-alive来
  告诉对方这个请求响应完成后不要关闭，下一次还用这个连接继续交流。协议规定HTTP/1.0如果想要保持长连接，需要在请求头中
  加上Connection: keep-alive，而HTTP/1.1默认是支持长连接的，有没有这个请求头都行。如果HTTP/1.1版本的http请求报文不希望使用
  长连接，则要在请求头中加上Connection: close，接收到这个请求头的对端服务就会主动关闭连接。
    但是http长连接会一直保持吗？肯定是不会的。一般服务端都会设置keep-alive超时时间。超过指定的时间间隔，服务端就会主动
  关闭连接。同时服务端还会设置一个参数叫最大请求数，比如当最大请求数是300时，只要请求次数超过300次，即使还没到超时时间，
  服务端也会主动关闭连接。
  2.状态码：
    1xx：指示信息--表示请求已接收，继续处理
    2xx：成功--表示请求已被成功接收、理解、接受
    3xx：重定向--要完成请求必须进行更进一步的操作
    4xx：客户端错误--请求有语法错误或请求无法实现
    5xx：服务器端错误--服务器未能实现合法的请求
    常见状态码：
    200 OK                   客户端请求成功
    204 No Content	         无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档
    --------------------------------------------------------------------------------------------------------------------
    301 Moved Permanently    永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。
    302 Found	             临时移动。但资源只是临时被移动。客户端应继续使用原有URI
    304	Not Modified	     未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问
                             过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
    --------------------------------------------------------------------------------------------------------------------
    400 Bad Request          客户端请求有语法错误，不能被服务器所理解
    401 Unauthorized         请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
    403 Forbidden            服务器收到请求，但是拒绝提供服务
    404 Not Found            请求资源不存在，eg：输入了错误的URL
--------------------------------------------------------------------------------------------------------------------
    500 Internal Server Error服务器发生不可预期的错误
    502 Bad Gateway	         作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应
    503 Server Unavailable   由于超载或系统维护，服务器暂时的无法处理客户端的请求。
  3.Http头部：
    (1)请求头
       Accept                能够接受的回应内容类型        Accept: text/plain
       Accept-Encoding       能够接受的编码方式列表        Accept-Encoding: gzip, deflate
       Cache-Control         指定在这次的请求/响应链中的所有缓存机制      Cache-Control: no-cache
       Connection            浏览器想要优先使用的连接类型                 Connection: keep-alive
       Content-Length        请求体的长度                                 Content-Length: 348
       Content-Type          请求体的多媒体类型                           Content-Type: application/x-www-form-urlencoded
       Host                  服务器的域名                                 Host: en.wikipedia.org
       Origin                发起一个针对跨来源资源共享的请求             Origin: http://www.example-social-network.com
       If-Modified-Since     允许在对应的内容未被修改的情况下返回304未修改    If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT
       If-None-Match         允许在对应的内容未被修改的情况下返回304未修改    If-None-Match: "737060cd8c284d8af7ad3082f209582d"
       User-Agent            浏览器的浏览器身份标识字符串                     User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0
       Upgrade               要求服务器升级到另一个协议                       Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11
    (2)响应头
       Access-Control-Allow-Origin    指定哪些网站可参与到跨来源资源共享过程中    Access-Control-Allow-Origin: *
       Content-Length                 回应消息体的长度，以字节为单位              Content-Length: 348
       Last-Modified                  所请求的对象的最后修改日期                  Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT
       ETag                           对于某个资源的某个特定版本的一个标识符      ETag: "737060cd8c284d8af7ad3082f209582d"
       Expires                        指定一个日期/时间，超过该时间则认为此回应已经过期    Expires: Thu, 01 Dec 1994 16:00:00 GMT
       Keep-Alive                     允许消息发送者暗示连接的状态，可用来设置超市时长和最大请求数            timeout=5, max=1000
                                      timeout指定了一个空闲链接需要保持打开状态的最小时长(s)
                                      max表示在连接关闭前，此连接可以发送的请求的最大值
* */

/*
* GET && POST 请求的区别:
*   1.GET在浏览器回退时是无害的，而POST会再次提交请求
*   2.GET请求会被浏览器主动cache，而POST不会，除非手动设置。
*   3.GET请求只能进行url编码，而POST支持多种编码方式。
*   4.GET请求在URL中传送的参数是有长度限制的，而POST么有
*   5.对参数的数据类型，GET只接受ASCII字符，而POST没有限制
*   6.GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
*   7.GET参数通过URL传递，POST放在Request body中
*   8.GET和POST本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。
*     GET产生一个TCP数据包；POST产生两个TCP数据包。
*     对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
*     而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。
* */

/*
* 前端性能优化：
* 1.网络请求方面:
*     (1) DNS预解析     eg:<link rel="dns-prefetch" href="//yuchengkai.cn">
*     (2) 缓存          强缓存(Expires、Cache-Control )&& 协商缓存(Last-Modified 、If-Modified-Since 和 ETag、If-None-Match)
*                       eg: Expires: Wed, 22 Oct 2018 08:41:00 GMT  表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。
*                           Cache-control: max-age=30               示资源会在30 秒后过期，需要再次请求
*                           Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 LastModified 的值发送给服务器，询问服务器在该日期后资源是否有更新，
*                           有更新的话就会将新的资源发送回来
*                           ETag 类似于文件指纹，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来
*     (3)使用 HTTP / 2.0
*     (4)预加载         eg:<link rel="preload" href="http://example.com">
*     (5)预渲染         eg:<link rel="prerender" href="http://example.com">
*     (6)避免重定向
* 2.优化渲染过程:
*     (1)懒执行         eg:懒执行就是将某些逻辑延迟到使用时再计算。该技术可以用于首屏优化，对于某些耗时逻辑并不需要在首屏就使用的，就可以使用懒执行
*     (2)懒加载         eg:懒加载就是将不关键的资源延后加载
* 3.文件优化:
*     (1)图片文件优化   eg:使用字体图标、使用base64格式的图片、使用css sprite
*     (2)其他文件优化   eg:CSS 文件放在 head 中、服务端开启文件压缩功能、将 script 标签放在 body 底部、对于需要很多时间计算的代码可以考虑使用Webworker
*     (3)CDN            eg:静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名。
*                          对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 Cookie。
*     (4)监控           eg:对于代码运行错误，通常的办法是使用 window.onerror 拦截报错;
*                          对于跨域的代码运行错误会显示 Script error. 对于这种情况我们需要给script 标签添加 crossorigin 属性
*                          对于异步代码来说，可以使用 catch 的方式捕获错误
* 4.其他:
*     (1)使用 Webpack 优化项目
*                       eg:打包项目使用 production 模式，这样会自动开启代码压缩;
*                          优化图片，对于小图可以使用 base64 的方式写入文件中;
*                          按照路由拆分代码，实现按需加载;
*                          给打包出来的文件名添加哈希，实现浏览器缓存文件。
* */

//如何渲染出几万条数据而不卡住界面?
//注意:不能一次性将几万条都渲染出来，而应该一次渲染部分 DOM，那么就可以通过 requestAnimationFrame 来每 16 ms 刷新一次
//window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
//该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
setTimeout(function () {
    const total = 100000;
    const onece = 20;
    const loopCount = total/onece;
    let countOfRender = 0;
    let ul = document.querySelector('ul');
    function add() {
        const fragment = document.createDocumentFragment();
        for(let i=0;i<onece;i++){
            const li = document.createElement('li');
            li.innerHTML =  Math.floor(Math.random()*total);
            fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        countOfRender++;
        loop();
    }
    function loop() {
        if(countOfRender<loopCount){
            window.requestAnimationFrame(add);
        }
    }
    loop();
},0);

/*
http://www.ruanyifeng.com/blog/2017/05/websocket.html
https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001472780997905c8f293615c5a42eab058b6dc29936a5c000
  websocket：HTML5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，任何一方都可以主动发消息给对方。
             WebSocket并不是全新的协议，而是利用了HTTP协议来建立连接。
  （1）WebSocket链接必须由浏览器发起，因为请求协议是一个标准的Http请求，和普通Http请求有以下不同：
       get请求的地址以ws://开头；
       请求头Upgrade:websocket和Connection:Upgrade表示这个连接将要被转换为Websocket连接；
       Sec-WebSocket-Key用来标识这个连接；
       Sec-Websocket-Version制定了Websocket的协议版本；
  （2）若服务器接受该请求，会返回如下响应：
       响应码101标识本次连接的Http协议即将被更改，更改后的协议就是Upgrade:websocket指定的websocket协议；
       现在，一个WebSocket连接就建立成功，浏览器和服务器就可以随时主动发送消息给对方。
  其他特点包括：
  （1）建立在 TCP 协议之上。
  （2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议
  （3）数据格式比较轻量，性能开销小，通信高效。
  （4）可以发送文本，也可以发送二进制数据。
  （5）没有同源限制，客户端可以与任意服务器通信。
  （6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。
* */

//客户端
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');
// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});
// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
socket.addEventListener("close", function(event) {
    var code = event.code;
    var reason = event.reason;
    var wasClean = event.wasClean;
    // handle close event
});
socket.addEventListener("error", function(event) {
    // handle error event
});

/*
* 安全问题：
* https://tech.meituan.com/2018/09/27/fe-security.html
* https://tech.meituan.com/2018/10/11/fe-security-csrf.html
* 1.XSS攻击（跨站脚本）：
*   (1)是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。
*   (2)分类：
*      存储型：
*        step: 攻击者将恶意代码提交至服务器数据库中，用户打开目标网站时，网站服务端将恶意代码从数据库中去除，拼接在html中返回给浏览器，浏览器收到响应解析执行，恶意代码也被执行，
*              恶意代码窃取用户数据发送到攻击者的网站，调用目标网站接口执行攻击操作。
*          eg: 论坛发帖、商品评论、用户私信
*      反射型：
*        step: 攻击者构造出特殊url,其中包含恶意代码，用户打开该url时，网站服务端将恶意代码从url中取出，拼接在html中返回给浏览器，浏览器收到响应解析执行，恶意代码也被执行，
*              恶意代码窃取用户数据发送到攻击者的网站，调用目标网站接口执行攻击操作。
*          eg: 常见于url传递参数的功能，如网站搜索、跳转
*      DOM型：
*        step: 攻击者构造出恶意url,其中包含恶意代码，用户打开该url,用户浏览器接收到响应后解析之星，前端js取出url中的恶意代码并执行，恶意代码窃取用户数据发送到攻击者的网站，
*              调用目标网站接口执行攻击操作。
*      注：
*        反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。
*        DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。
*   (3)防御：
*         预防存储型&&反射型XSS 攻击：
*           改成纯前端渲染，把代码和数据分隔开；对 HTML 做充分转义（对& < > " ' /进行转义）；
*         预防 DOM 型 XSS 攻击：
*           在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等；
*           DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，<a> 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，
*           都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。
*         对于显示富文本来说，不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉,这种情况通常采用白名单过滤的办法.
          CSP：
*           内容安全策略 (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。
*           可以通过 CSP 来尽量减少 XSS 攻击。CSP 本质上也是建立白名单，规定了浏览器只能够执行特定来源的代码。
*           Content-Security-Policy: default-src ‘self’ 只能加载本站资源.
* 2.CSRF攻击（跨站请求伪造）：
*    (1)攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的
*    (2)分类：
*       GET类型的CSRF：
*         受害者访问含有这个img的页面后，浏览器会自动向http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker发出一次HTTP请求。bank.example就会收到包含受害者登录信息的
*         一次跨域请求。
*       POST类型的CSRF：
*         通常使用的是一个自动提交的表单,访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。
*         <form action="http://bank.example/withdraw" method=POST>
            <input type="hidden" name="account" value="xiaoming" />
            <input type="hidden" name="amount" value="10000" />
            <input type="hidden" name="for" value="hacker" />
          </form>
          <script> document.forms[0].submit(); </script>
*       链接类型的CSRF：
*         比起其他两种用户打开页面就中招的情况，这种需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招，攻击者通常会以比较夸张的
*         词语诱骗用户点击。
*         <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank"> 重磅消息！！<a/>
*         由于之前用户登录了信任的网站A，并且保存登录状态，只要用户主动访问上面的这个PHP页面，则表示攻击成功
*      (3)防御：
*         阻止不明外域的访问：
*           同源检测：（同源验证是一个相对简单的防范方法，能够防范绝大多数的CSRF攻击，但并不是万无一失的）
*             origin字段：为请求的域名(不包含路径)
*             referer字段：为请求的来源地址，对于ajax请求referer为发起请求的来源地址，对于页面跳转，referer为打开页面历史记录的前一个页面地址
*             若为外域访问，直接阻止即可，但是当一个请求是页面请求（比如网站的主页），而来源是搜索引擎的链接（例如百度的搜索结果），也会被当成疑似CSRF攻击，所以在判断的时候需要过滤掉
*             页面请求（Accept: text/html；Method: GET），但相应的，页面请求就暴露在了CSRF的攻击范围之中。
*           Samesite Cookie：（Samesite不支持子域，在topic.a.com下的Cookie，并不能使用a.com下种植的SamesiteCookie。这就导致了当我们网站有多个
*                              子域名时，不能使用SamesiteCookie在主域名存储用户登录信息。每个子域名都需要用户重新登录一次）
*             Set-Cookie响应头的Samesite属性，用来表明这个Cookie为同站cookie,同站cookie只能作为第一方cookie,不能作为第三方cookie.
*             Set-Cookie:foo=1;Samesite=Strict为严格模式，表明该Cookie在任何情况下都不能作为第三方Cookie
*             Set-Cookie:foo=1;Samesite=Lax为宽松模式，若请求为get请求且改变了当前页面或者打开了新页面，则这个Cookie可以作为第三方Cookie
*         提交时要求附加本域才能获取的信息：
*           CSRF Token：（要求所有的用户请求都携带一个CSRF攻击者无法获取到的Token。服务器通过校验请求是否携带正确的Token，来把正常的请求和攻击的请求区分开，也可以防范CSRF的攻击）
*             step：将csrf token输出到页面中；
*                   【用户打开页面时，服务器要给这个用户生成一个token，该token通过加密算法进行加密，该token保存在服务器的session中，之后每次加载页面时，使用js遍历整个DOM树，对于所有
*                   a标签和form标签尾部加入token,这样可以解决大部分的请求，但是对于在页面加载之后动态生成的HTML代码，这种方法就没有作用，还需要在编码时手动添加Token。】
*                   页面提交的请求携带这个token；
*                   服务器验证token是否正确；
*                   【当用户从客户端得到了token,再次提交给服务器时，服务器需要对token进行验证，先解密token,对比加密字符串和时间戳，若加密字符串一致且时间未过期，则token有效】
*             注：此方法的实现比较复杂，需要给每一个页面都写入Token（前端无法使用纯静态页面），每一个Form及Ajax请求都携带这个Token，后端对每一个接口都进行校验，并保证页面Token及
*                 请求Token一致，使得这个防护策略不能在通用的拦截上统一拦截处理，而需要每一个页面和接口都添加对应的输出和校验，工作量巨大。
*           双重Cookie验证：（利用csrf不能获取到用户的cookie的特点，可以要求ajax和表单请求都携带一个Cookie中的值）
*             step：用户访问网站时，向请求域名注入一个Cookie；
*                   在向后端发起请求时，取出cookie并添加到请求参数中；
*                   后端验证请求参数中的cookie和服务器设置的是否一致，不一致则拒绝。
* 3.密码安全:
*   md5: 是一个安全的散列算法，输入两个不同的明文不会得到相同的输出值，根据输出值，不能得到原始的明文，其过程不可逆。要解密md5算法，只能用穷取法把可能出现的明文，用md5算法散列后，
*        把得到的散列值和原始数据形成一个一对一的映射表，从映射表中找出破解密码所对应的原始明文。
* */

/*
https://juejin.im/post/5c0ce870f265da61171c8c66
https://juejin.im/post/5b0274ac6fb9a07aaa118f49
Http && Https:
  Https: 是一种通过计算机网络进行安全通信的传输协议。HTTPS经由HTTP进行通信，但利用SSL/TLS来加密数据包。HTTPS开发的主要目的，是提供对网站服务器的身份认证，
         保护交换数据的隐私与完整性。HTTPS连接经常用于万维网上的交易支付和企业信息系统中敏感信息的传输。
  1.HTTPS协议需要到CA申请证书，一般免费证书很少，需要交费。
  2.HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。
  3.HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
  4.HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题。
Http1.x && Http2.0
  1.新的二进制格式（二进制分帧层）
      HTTP1.x的解析是基于文本。基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合。
    基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮。
  2.多路复用
      即连接共享，即每一个request都是是用作连接共享机制的。HTTP2建立一个TCP连接，一个连接上面可以有任意多个流（stream），消息分割成一个或
    多个帧在流里面传输。帧传输过去以后，再进行重组，形成一个完整的请求或响应。这使得所有的请求或响应都无法阻塞。HTTP/2 通过让所有数据流共用同一个连接，
    可以更有效地使用 TCP 连接，让高带宽也能真正的服务于 HTTP 的性能提升。
  3.header压缩
      HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用HPACK压缩格式来压缩首部，通讯双方各自cache一份header fields表，既避免了
    重复header的传输，又减小了需要传输的大小。
  4.服务端推送
      HTTP2.0也具有server push功能
      服务端推送能把客户端所需要的资源伴随着index.html一起发送到客户端，省去了客户端重复请求的步骤。正因为没有发起请求，建立连接等操作，所以静态资源
      通过服务端推送的方式可以极大地提升速度。实现原理就是客户端发出页面请求时，服务器端能够分析这个页面所依赖的其他资源，主动推送到客户端的缓存，当客
      户端收到原始网页的请求时，它需要的资源已经位于缓存。
HTTP2.0的多路复用和HTTP1.X中的长连接复用有什么区别?
  1.HTTP/1.0 一次请求-响应，建立一个连接，用完关闭；每一个请求都要建立一个连接.
  2.HTTP/1.1 解决方式为，若干个请求排队串行化单线程处理，后面的请求等待前面请求的返回才能获得执行机会，一旦有某请求超时等，后续请求只能被阻塞，
    毫无办法，也就是人们常说的线头阻塞；
  3.HTTP/2多个请求可同时在一个连接上并行执行。某个请求任务耗时严重，不会影响到其它连接的正常执行
* */