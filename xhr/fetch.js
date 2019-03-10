/*
https://segmentfault.com/a/1190000008484070#articleHeader2
* 1.fetch默认不携带cookie
*   fetch发送请求默认是不发送cookie的，无论是否跨域，对于需要权限验证的请求就可能无法正常获取数据，可以配置其credentials项：
*       omit: 默认值，忽略cookie的发送
*       same-origin: cookie只能同域发送，不能跨域发送
*       include: cookie支持跨域发送
*   注：fetch默认对服务端通过Set-Cookie设置的cookie也会忽略，若选择接受服务端的cookie信息，也必须设置credential
* 2.fetch请求对某些错误http状态不会reject
*       主要是由fetch返回promise导致的，因为fetch返回的promise在某些错误的http状态下如400、500等不会reject，相反它会被resolve；
*   只有网络错误会导致请求不能完成时，fetch 才会被 reject；所以一般会对fetch请求做一层封装。
* 3.fetch不支持timeout超时处理
*       实现fetch的timeout功能，其思想就是新创建一个可以手动控制promise状态的实例，根据不同情况来对新promise实例进行resolve
*   或者reject，从而达到实现timeout的功能
* 4.fetch不支持jsonp
*       使用fetch-jsonp库
* 5.fetch不支持progress事件
* 6.fetch跨域问题
* */

//fetch请求对某些错误http状态不会reject
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.responseText);
    error.response = response;
    throw error;
}

function JSONParse(response) {
    return response.json();
}

function newFetch(url, options) {
    let opt = options || {};
    return window.fetch(url, {
        credentials: 'include',
        ...opt
    }).then(checkStatus)
        .then(JSONParse)
        .then((data) => data)
        .catch((error) => error);
}

//fetch不支持timeout超时处理
let oldFetch = window.fetch;
window.fetch = function (input, opts) {
    return new Promise((resolve, reject) => {
        let timeoutId = setTimeout(() => {
            reject(new Error('fetch-timeout'));
        }, opts.ms);
        oldFetch(input, opts).then((res) => {
            clearTimeout(timeoutId);
            resolve(res);
        }, (err) => {
            clearTimeout(timeoutId);
            reject(err);
        });
    });
};

window.fetch = function (input, opts) {
    return new Promise((resolve, reject) => {
        let abort_fn = function () {
            reject(new Error('fetch-abort'));
        };
        let p = oldFetch(input, opts).then(resolve, reject);
        p.abort = abort_fn;
        return p;
    });
};

window.fetch = function (input, opts) {
    let timeout_promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('fetch-timeout'));
        }, opts.ms);
    });
    let fetch_promise = oldFetch(input, opts);
    return Promise.race([timeout_promise, fetch_promise]);
};

//fetch-jsonp
fetchJsonp('/users.jsonp', {
    timeout: 3000,
    jsonpCallback: 'custom_callback'
})
    .then(function (response) {
        return response.json()
    }).catch(function (ex) {
    console.log('parsing failed', ex)
})

//xhr+promise实现onprogress
function fetchProgress(url, opts = {}, progress) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(url, opts.type || 'get');
        for (let key in opts.headers || {}) {
            xhr.setRequestHeader(key, opts.headers[key]);
        }
        xhr.onload = (e) => {
            resolve(e.target.responseText)
        }
        xhr.onerror = reject;
        if (xhr.upload && progress) {
            xhr.upload.onprogress = progress;
        }
        if (onprogress in xhr && progress) {
            xhr.onprogress = progress;
        }
        xhr.send(opts.body);
    });
}

/*
fetch是不支持有关progress事件的；不过可喜的是，根据fetch的指导规范标准，其内部设计实现了Request和Response类；其中Response封装一些
方法和属性，通过Response实例可以访问这些方法和属性，例如response.json()、response.body等等；值得关注的地方是，response.body是一个
可读字节流对象，其实现了一个getRender()方法，其具体作用是：getRender()方法用于读取响应的原始字节流，该字节流是可以循环读取的，
直至body内容传输完成；因此，利用到这点可以模拟出fetch的progress。
*/
fetch('url').then((response) => {
    var reader = response.body.getReader();
    var bytesReceived = 0;
    reader.read().then(function processResult(result) {
        if (result.done) {
            console.log("Fetch complete");
            return;
        }
        bytesReceived += result.value.length;
        console.log('Received', bytesReceived, 'bytes of data so far');
        return reader.read().then(processResult);
    });
});

/*fetch跨域问题:
fetch也是支持跨域请求的，只不过其跨域请求做法与XHR2一样，需要客户端与服务端支持；
另外，fetch还支持一种跨域，不需要服务器支持的形式，具体可以通过其mode的配置项来说明。mode配置如下：
  same-origin:
    不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个error告知不能跨域；其对应的response type为basic。
  cors:
    支持跨域请求，顾名思义它是以CORS的形式跨域；当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response type为cors。
  no-cors:
    用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；这也是fetch的特殊跨域请求方式；其对应的response type为opaque。
    该模式允许浏览器发送本次跨域请求，但是不能访问响应返回的内容，这也是其response type为opaque透明的原因。
*/