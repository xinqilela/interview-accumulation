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
* */

/*
* TCP连接3次握手过程:
  1.client发送一个SYN(J)包给server，然后等待server的ACK回复，进入SYN-SENT状态。
  2.server接收到SYN(J)包后就返回一个ACK(J+1)包以及一个自己的SYN(K)包，然后等待client的ACK回复，server进入SYN-RECIVED状态。
  3.client接收到server发回的ACK(J+1)包后，进入ESTABLISHED状态。然后根据server发来的SYN(K)包，返回给等待中的server一个ACK(K+1)包。
    等待中的server收到ACK回复，也把自己的状态设置为ESTABLISHED。到此TCP三次握手完成
* TCP释放4次握手过程:
  1.client发送一个FIN(M)包，此时client进入FIN-WAIT-1状态，这表明client已经没有数据要发送了。
  2.server收到了client发来的FIN(M)包后，向client发回一个ACK(M+1)包，此时server进入CLOSE-WAIT状态，client进入FIN-WAIT-2状态。
  3.server向client发送FIN(N)包，请求关闭连接，同时server进入LAST-ACK状态。
  4.client收到server发送的FIN(N)包，进入TIME-WAIT状态。向server发送**ACK(N+1)**包，server收到client的ACK(N+1)包以后，进入CLOSE状态；
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
* http协议
* */

/*
* websocket
* */