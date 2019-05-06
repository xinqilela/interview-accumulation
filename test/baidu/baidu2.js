/*
* 1.w3c标准和html标准
* 2.http301和302的区别？302和303,307的区别？
*   (1)301 moved permanently
*      被请求的资源已经永久的移动到新的位置，并且将来任何对此资源的引用都应该使用本响应返回的若干URI之一，若有可能，拥有链接编辑功能的客户端应该自动把请求地址修改为从服务器反馈回来的地址，
*      除非额外指定，否则这个响应也是可以缓存的。
*   (2)302 found
*      被请求的资源现在临时从不同的URI响应请求，由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求，只有在cache-control或expires中进行了指定的情况下，这个响应才是可缓存的。
*      --在http 1.0规范中，302表示临时重定向，location中的地址不应该被认为是资源路径，在后续的请求中应该继续使用原地址。
*      --规范：原请求是post，则不能自动进行重定向；原请求是get，可以自动重定向；
*      --实现：浏览器和服务器的实现并没有严格遵守HTTP中302的规范，服务器不加遵守的返回302，浏览器即便原请求是post也会自动重定向，
*              导致规范和实现出现了二义性，由此衍生了一些问题，譬如302劫持，因此在HTTP 1.1中将302的规范细化成了303和307，希望以此来消除二义性。
*      ==HTTP 1.1中，实际上302是不再推荐使用的，只是为了兼容而作保留。规范中再次重申只有当原请求是GET or HEAD方式的时候才能自动的重定向，为了消除HTTP 1.0中302的二义性，
*        在HTTP 1.1中引入了303和307来细化HTTP 1.0中302的语义。
*      ==HTTP 1.1中，303继承了HTTP 1.0中302的实现（即原请求是post，也允许自动进行重定向，结果是无论原请求是get还是post，都可以自动进行重定向），
*        而307则继承了HTTP 1.0中302的规范（即如果原请求是post，则不允许进行自动重定向，结果是post不重定向，get可以自动重定向）
*   (3)301和302共同点和区别：
*      共同点：用户都可以看到url替换为了一个新的，然后发出请求。
*      区别：302重定向只是暂时的重定向，搜索引擎会抓取新的内容而保留旧的地址，因为服务器返回302，所以，搜索搜索引擎认为新的网址是暂时的；
*            301重定向是永久的重定向，搜索引擎在抓取新的内容的同时也将旧的网址替换为了重定向之后的网址。
*   (4)303 see other
*      被请求的资源存在着另一个URI，应使用GET方法定向获取请求资源。
*      303继承了HTTP 1.0中302的实现（即原请求是post，也允许自动进行重定向，结果是无论原请求是get还是post，都可以自动进行重定向）。
*   (5)307 temporary redirect
*      在http 1.1规范中，307为临时重定向，如果重定向307的原请求不是get或者head方法，那么浏览器一定不能自动的进行重定向，即便location有url，也应该忽略。
*      也就是307继承了302在HTTP 1.0中的规范（303继承了302在HTTP 1.0中的实现）
* */