/*
http://www.ruanyifeng.com/blog/2016/04/cors.html
* */

/*
同源策略(一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。):
    限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。
    所谓同源是指域名，协议，端口相同。
    解决方案:CORS、JSONP、WebSocket
* */

/*
CORS: 是一个W3C标准，全称是"跨域资源共享"，它允许浏览器向跨源服务器发出XMLHttpRequest请求，从而克服跨域问题，它需要浏览器和服务器的同时支持。
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
WebSocket：
    一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。
* */

/*
比较：
CORS与JSONP的使用目的相同，但是比JSONP更强大。
JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
* */