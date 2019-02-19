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
  5.将各个节点绘制到屏幕上。
* */

/*
* http协议、https
  https://juejin.im/entry/57ff5c5b0bd1d00058e5b2aa
  https://zhuanlan.zhihu.com/p/27395037
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