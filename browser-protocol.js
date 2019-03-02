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
* 1.当用户在浏览器输入一个域名的时候，最先浏览器会从自己中的缓存中寻找指定的结果。
*   如果找到了域名对应的的ip则域名解析完成
* 2.如果在浏览器中的缓存没有命中，则会在系统的缓存中来查找是否有这个域名对应的DNS解析结果，如果有则域名解析完成。
* 3.系统缓存中未命中之后会把这个域名提交到指定的本地DNS服务器(这个域名解析服务器缓存了大量的域名的DNS解析结果,
*   它的性能较好，物理上的距离又比较近，会在很短的时间内返回指定域名的解析结果。)若命中，域名解析完成。
* 4.如果本地DNS服务器未命中，则根据本地DNS服务器的设置（是否设置转发器）进行查询，如果未用转发模式，
    本地DNS就把请求发至13台根DNS，根DNS服务器收到请求后会判断这个域名(.com)是谁来授权管理，
    并会返回一个负责该顶级域名服务器的一个IP。本地DNS服务器收到IP信息后，将会联系负责.com域的这台服务器。这台负责.com域的服务器收到请求后，如果自己无法解析，
    它就会找一个管理.com域的下一级DNS服务器地址(http://qq.com)给本地DNS服务器。当本地DNS服务器收到这个地址后，
    就会找http://qq.com域服务器，重复上面的动作，进行查询，直至找到www  . qq  .com主机。
* 5.如果用的是转发模式，此DNS服务器就会把请求转发至上一级DNS服务器，由上一级服务器进行解析，上一级服务器如果不能解析，
    或找根DNS或把转请求转至上上级，以此循环。不管是本地DNS服务器使用转发，还是根，最后都是把结果返回给本地DNS服务器，
    由此DNS服务器再返回给客户机。
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
https://juejin.im/post/59d489156fb9a00a571d6509
* 浏览器的渲染过程?
  1.解析 HTML 标记并构建 DOM 树。
  2.解析 CSS 并构建 CSSOM 树。
  3.将 DOM 与 CSSOM 合并成一个渲染树。
  4.根据渲染树来布局，以计算每个节点的几何信息。
  5.调用 GPU 绘制，合成图层，显示在屏幕上。
* */

/*
* http协议、https
  https://juejin.im/entry/57ff5c5b0bd1d00058e5b2aa
  https://zhuanlan.zhihu.com/p/27395037
  1.Connect:keep-alive
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
    301 Moved Permanently    永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。
    302 Found	             临时移动。但资源只是临时被移动。客户端应继续使用原有URI
    304	Not Modified	     未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问
                             过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
    400 Bad Request          客户端请求有语法错误，不能被服务器所理解
    401 Unauthorized         请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
    403 Forbidden            服务器收到请求，但是拒绝提供服务
    404 Not Found            请求资源不存在，eg：输入了错误的URL
    500 Internal Server Error服务器发生不可预期的错误
    502 Bad Gateway	         作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应
    503 Server Unavailable   由于超载或系统维护，服务器暂时的无法处理客户端的请求。
* */

/*
* 前端性能优化：
* https://csspod.com/frontend-performance-best-practices/
* 1.页面内容：
*   减少http请求  eg:使用css sprite，将背景图片合并成一个文件，通过background-image 和 background-position 控制显示。
*   减少DNS查询   eg:把资源分布到 2 个域名上（最多不超过 4 个）。这是减少 DNS 查询同时保证并行下载的折衷方案。
*   DNS预解析     eg:<link rel="dns-prefetch" href="//yuchengkai.cn">
*   预渲染           <link rel="prerender" href="http://example.com">
*   避免重定向    eg:URL 末尾应该添加/但未添加。比如，访问 http://astrology.yahoo.com/astrology 将被 301 重定向到 http://astrology.yahoo.com/astrology/。
*   缓存 Ajax 请求
*   懒加载      eg:将首屏以外的 HTML 放在不渲染的元素中，如隐藏的 <textarea>，或者 type 属性为非执行脚本的 <script> 标签中，
*                    减少初始渲染的 DOM 元素数量，提高速度。等首屏加载完成或者用户操作时，再去渲染剩余的页面内容。
*   懒执行      eg:将某些逻辑延迟到使用时再计算
*   预先加载         <link rel="preload" href="http://example.com">
*       无条件预先加载：页面加载完成（load）后，马上获取其他资源。以 google.com 为例，首页加载完成后会立即下载一个
*                       Sprite 图片，此图首页不需要，但是搜索结果页要用到。
*       有条件预先加载：根据用户行为预判用户去向，预载相关资源。比如 search.yahoo.com 开始输入时会有额外的资源加载。
*                        Chrome 等浏览器的地址栏也有类似的机制。
*       有「阴谋」的预先加载：页面即将上线新版前预先加载新版内容。
*   减少DOM元素数量  eg:能通过伪元素实现的功能，就没必要添加额外元素，如清除浮动
* 2.服务器：
*   使用CDN  eg:网站 80-90% 响应时间消耗在资源下载上，减少资源下载时间是性能优化的黄金发则。
*   添加 Expires 或 Cache-Control 响应头  eg:静态内容：将 Expires 响应头设置为将来很远的时间，实现「永不过期」策略
*                                         eg:动态内容：设置合适的 Cache-Control 响应头，让浏览器有条件地发起请求。
*   启用Gzip  eg:Gzip 压缩通常可以减少 70% 的响应大小，对某些文件更可能高达 90%。主流 Web 服务器都有相应模块，
*                而且绝大多数浏览器支持 gzip 解码。所以，应该对 HTML、CSS、JS、XML、JSON 等文本类型的内容启用压缩。
*   配置Etag eg:Etag 通过文件版本标识，方便服务器判断请求的内容是否有更新，如果没有就响应 304，避免重新下载。
* */

/*
http://www.ruanyifeng.com/blog/2017/05/websocket.html
https://zh.wikipedia.org/wiki/WebSocket
* websocket：服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话。
  其他特点包括：
  （1）建立在 TCP 协议之上，服务器端的实现比较容易。
  （2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，
       能通过各种 HTTP 代理服务器。
  （3）数据格式比较轻量，性能开销小，通信高效。
  （4）可以发送文本，也可以发送二进制数据。
  （5）没有同源限制，客户端可以与任意服务器通信。
  （6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。
* */

/*
* 安全问题：
* XSS攻击（跨站脚本）：
*   是一种网站应用程式的安全漏洞攻击，是代码注入的一种。它允许恶意使用者将程式码注入到网页上，其他用户在观看网页时就会受到影响
*   如何攻击: 通过修改 HTML 节点或者执行 JS 代码来攻击网站
*             eg: 通过 URL 获取某些参数
*                 <!-- http://www.domain.com?name=<script>alert(1)</script> -->
                  <div>{{name}}</div>
*   防御：转义输入输出内容，对引号，尖括号，斜杠进行转义；对于显示富文本来说，不能通过上面的办法来转义所有字符，因为这样会把需要的
          格式也过滤掉,这种情况通常采用白名单过滤的办法.
    CSP：
*     内容安全策略 (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。
*     可以通过 CSP 来尽量减少 XSS 攻击。CSP 本质上也是建立白名单，规定了浏览器只能够执行特定来源的代码。
*     Content-Security-Policy: default-src ‘self’ 只能加载本站资源.
* CSRF攻击（跨站请求伪造）：
*    CSRF 就是利用用户的登录态发起恶意请求。
*    如何攻击:
*              eg: 假设网站中有一个通过 Get 请求提交用户评论的接口，那么攻击者就可以在钓鱼网站中加入一个图片，图片的地址就是评论接口
*                  <img src="http://www.domain.com/xxx?comment='attack'"/>
*    防御：get请求不对数据进行修改
*          不让第三方网站访问到用户cookie
*          阻止第三方网站请求接口
*          请求时附带验证码或token
* 密码安全:
*     对于密码存储来说，必然是不能明文存储在数据库中的，否则一旦数据库泄露，会对用户造成很大的损失。并且不建议只对密码单纯通过加密算法加密，因为存在彩虹表的关系。
*        eg:通常需要对密码加盐，然后进行几次不同加密算法的加密:
*           加盐也就是给原密码添加字符串，增加原密码长度
            sha256(sha1(md5(salt + password + slat)))
* */

//1.实现一个div滑动的动画，由快至慢5s结束（不准用css3)。

//2.页面内有一个input输入框，实现在数组arr查询命中词并要求autocomplete效果。

//3.实现超出整数存储范围的两个大整数相加function add(a,b)。注意a和b以及函数的返回值都是字符串。