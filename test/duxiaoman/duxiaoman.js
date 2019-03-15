/*
* 1.css伪类和伪元素的区别: 在于有没有创建一个文档树之外的元素
*   伪类:用于当已有元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。
*   伪元素:用于创建一些不在文档树中的元素，并为其添加样式。CSS3规范中的要求使用双冒号(::)表示伪元素。
* 2.BFC
*   https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context
*   https://juejin.im/post/5909db2fda2f60005d2093db#heading-0
* 3.readonly和disabled的区别
*   (1)disabled可以作用于所有的表单元素, readonly只对<input type='text'>、<textarea>有效。
*   (2)disabled阻止对元素的一切操作，例如获取焦点，点击事件等等, readonly只是将元素设置为只读，其他操作正常。
*   (3)disabled可以让表单元素的值无法被提交，readonly不影响提交。
* 3.promise的原理
*   es6.js里已实现
* 4.reducer为什么要是纯函数？能在reducer中发起ajax请求吗?
*   https://www.jianshu.com/p/6f95bf723301
*   (1)纯函数：不修改函数的输入值，对于任何相同的输入有着相同的输出结果
*   (2)Redux接收一个给定的state（对象），然后通过循环将state的每一部分传递给每个对应的reducer。如果有发生任何改变，reducer将返回一个新的对象。如果不发生任何变化，
*      reducer将返回旧的state。Redux只通过比较新旧两个对象的存储位置来比较新旧两个对象是否相同（译者注：也就是Javascript对象浅比较）。如果你在reducer内部直接修改
*      旧的state对象的属性值，那么新的state和旧的state将都指向同一个对象。因此Redux认为没有任何改变，返回的state将为旧的state。
*   (3)为什么Redux这样设计？因为比较两个Javascript对象所有的属性是否相同的的唯一方法是对它们进行深比较。但是深比较在真实的应用当中代价昂贵，因为通常js的对象都很大，
*      同时需要比较的次数很多。因此一个有效的解决方法是作出一个规定：无论何时发生变化时，开发者都要创建一个新的对象，然后将新对象传递出去。同时，当没有任何变化发生
*      时，开发者发送回旧的对象。也就是说，新的对象代表新的state。
*   (4)不可以！注意，reducer 只是通过接收 action 去处理 state 的变化，我们不可以在 reducer 中引入变化。reducer 必须是纯函数，接收输入，返回输出，只是纯粹的计算。
* 5.react新版本的新特性?
*   https://zhuanlan.zhihu.com/p/52016989
*   (1)Fiber: 是对 React 核心算法的一次重新实现，将原本的同步更新过程碎片化，避免主线程的长时间阻塞，使应用的渲染更加流畅
*        React16之前，更新组件时会调用各个组件的生命周期函数，计算和比对 Virtual DOM，更新 DOM 树等，这整个过程是同步进行的，中途无法中断。当组件比较庞大，
*      更新操作耗时较长时，就会导致浏览器唯一的主线程都是执行组件更新操作，而无法响应用户的输入或动画的渲染，很影响用户体验;
*        Fiber 利用分片的思想，把一个耗时长的任务分成很多小片，每一个小片的运行时间很短，在每个小片执行完之后，就把控制权交还给 React 负责任务协调的模块，
*      如果有紧急任务就去优先处理，如果没有就继续更新，这样就给其他任务一个执行的机会，唯一的线程就不会一直被独占
*        React Fiber 把一个更新过程分为两个阶段：
*        [1].reconciliation phase阶段Fiber会找出需要更新的DOM，该阶段可以被打断
*            componentWillMount、componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate
*        [2].commit phase阶段无法打断，完成DOM的更新展示
*            componentDidMount、componentDidUpdate、componentWillUnmount
*   (2)Fragment: 可以将一些子元素添加到 DOM tree 上且不需要为这些元素提供额外的父节点，相当于 render 返回数组元素
*   (3)createContext: 可以很容易穿透组件而无副作用，其包含三部分：React.createContext，Provider，Consumer
*   (4)createRef/forwardRef: createRef规范 Ref的获取方式，通过React.createRef取得Ref对象;React.forwardRef 是 Ref 的转发, 它能够让父组件访问到子组件的 Ref，
*      从而操作子组件的DOM,React.forwardRef接收一个函数，函数参数有props和ref。
*   (5)生命周期函数的更新:
*      static getDerivedStateFromProps：根据传递的 props 来更新 state
*      getSnapshotBeforeUpdate：在组件更新之前获取一个snapshot，可以将计算得的值或从DOM得到的信息传递到componentDidUpdate(prevProps, prevState, snapshot)的第三个参数
*      componentDidCatch：让开发者可以自主处理错误信息，诸如错误展示，上报错误等
*      同时把componentWillMount、componentWillReceiveProps、componentWillUpdate标记为不安全的方法。
*   (6)Hook：要解决的是状态逻辑复用问题，且不会产生 JSX 嵌套地狱问题。
*      React Hooks 就像一个内置的打平 renderProps 库，我们可以随时创建一个值，与修改这个值的方法。看上去像 function 形式的 setState，其实这等价于依赖注入，与使用
*      setState 相比，这个组件是没有状态的。
*      function APP(){
*        const [open,setOpen] = useState(false);
*        return <Fragment>
*              <Button onClick={()=>setOPen(true)}>open</Button>
*              <Modal
*                visible={open}
*                onOk = (()=>setOpen(false))
*                onCancel = (()=>setOpen(true))
*              />
*            </Fragment>;
*      }
* 6.36匹马,6个赛道，要至少比较几次，才能找到跑的最快的3匹马？   8次
*   (1)把36匹马分成6组，找出每组里跑的最快的3匹马。             6
*   (2) [a1  ,a2,  a3]   ×
*                               [a1  ,a2,  a3]  1
*       [a1  ,a2,  a3]   ×
*                               [a1  ,a2×,  a3×]  2
*       [a1  ,a2,  a3]   ×
*                               [a1  ,a2×,  a3×]  3
*       然后对让每组跑的最快的马进行比较，找出跑的最快的三匹马。 1
*   (3)剩余的马再比较一次即可找出。                              1
* 7.存储相关:
*   (1)cookie: 可以跨二级域名来访问(需要在创建cookie时设置domain为二级域名)
*   (2)localstorage && sessionstorage:
*      不同浏览器无法共享localStorage和sessionStorage中的信息,同一浏览器的相同域名和端口的不同页面间可以共享相同的 localStorage，
*      但是不同页面间无法共享sessionStorage的信息。
*      注：页面仅指顶级窗口，如果一个页面包含多个iframe且他们属于同源页面，那么他们之间是可以共享sessionStorage的。
*      localstorage如何跨域?
*         采用的是postMessage和iframe相结合的方法。
*   (3)如何实现在天猫登录后淘宝也会登录?  https://cloud.tencent.com/developer/article/1166255
*      单点登录(SSO)
* 8.为什么https可以实现加密传输?
*   https://blog.csdn.net/jasonjwl/article/details/50985271
*   (1)HTTP是应用层协议，位于HTTP协议之下是传输协议TCP。TCP负责传输，HTTP则定义了数据如何进行包装。HTTPS是Http的安全升级版,其实就是在HTTP和TCP中间加了一层加密层TSL/SSL。
*   (2)TLS、SSL其实是类似的东西，SSL是个加密套件，负责对HTTP的数据进行加密。TLS是SSL的升级版。现在提到HTTPS，加密套件基本指的是TLS。TSL使用非对称加密法。
*      客户端先向服务器端索要公钥，然后用公钥加密信息，服务器收到密文后，用自己的私钥解密。
*   (3)传输加密的流程: 原先是应用层将数据直接给到TCP进行传输，现在改成应用层将数据给到TLS/SSL，将数据加密后，再给到TCP进行传输。
*   (4)加密手段:
*      对称加密: 加密数据用的密钥，跟解密数据用的密钥是一样的
*      非对称加密: 加密数据用的密钥（公钥），跟解密数据用的密钥（私钥）是不一样的
*      公钥：公开的密钥，谁都可以查到
*      私钥：非公开的密钥，一般是由网站的管理员持有
*      公钥、私钥两个有什么联系呢？简单的说就是，通过公钥加密的数据，只能通过私钥解开。通过私钥加密的数据，只能通过公钥解开。非对称加密只能保证单向数据传输的安全性。
*      公钥如何获取?
*        证书(网站的身份信息,包含了公钥)、证书颁发机构(CA)
*        网站向CA提交了申请，CA审核通过后，将证书颁发给网站，用户访问网站的时候，网站将证书给到用户。
* 9.为什么要减少js对dom的操作?
*    DOM操作会引起浏览器的repaint和reflow操作，这两个操作比较耗时，所以造成对DOM操作比较慢。
* 10.css样式会阻塞页面的渲染吗?js会阻塞页面的渲染吗？script异步加载?
*    (1)css会阻塞DOM树渲染,但并不会阻塞DOM树的解析，css加载会阻塞后面js语句的执行。
*       link、style标签会被视为阻塞渲染的资源，浏览器会优先处理这些 CSS 资源，直至 CSSOM 构建完毕。
*       精简 CSS 并尽快提供它，还可以用媒体类型（media type）和媒体查询（media query）来解除对渲染的阻塞。
*       <link href="other.css" rel="stylesheet" media="(min-width: 30em) and (orientation: landscape)"/>
*    (2) script标签会阻塞HTML解析,所以通常将script绑在文档底部。
*        可使用deffer和async改变阻塞模式,async 与 defer属性对于inline-script都是无效。
*        deffer: 载入 JavaScript 文件时不阻塞 HTML 的解析，执行阶段被放到 HTML 标签解析完成之后
*        async: 表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行——无论此刻是 HTML 解析阶段还是 DOMContentLoaded 触发之后
*               注: async方式加载的 JavaScript 依然会阻塞 load 事件。换句话说，async-script 可能在 DOMContentLoaded 触发之前或之后执行，但一定在 load 触发之前执行
* 11.chunk传输?
*    https://blog.csdn.net/u014558668/article/details/70141956
*    分块传输编码（Chunked transfer encoding）是超文本传输协议中的一种数据传输机制，允许HTTP由网页服务器发送给客户端应用的数据可以分成多个部分。分块传输编码只在
*    HTTP协议1.1版本中提供。
*    当客户端向服务器请求一个静态页面或者一张图片时，服务器可以很清楚的知道内容大小，然后通过Content-Length消息首部字段告诉客户端需要接收多少数据。但是如果是动态
*    页面等时，服务器是不可能预先知道内容大小，这时就可以使用Transfer-Encoding：chunk模式来传输数据了。
*    如果一个HTTP消息（请求消息或应答消息）的Transfer-Encoding消息头的值为chunked，那么，消息体由数量未定的块组成，并以最后一个大小为0的块为结束。每一个非空的块
*    都以该块包含数据的字节数（字节数以十六进制表示）开始，跟随一个CRLF （回车及换行），然后是数据本身，最后块CRLF结束。
* 12.发布订阅模式和观察者模式的区别?
*    观察者模式:
*      Subject 是一个主题，Observer 是一个观察者。观察者可以订阅主题，主题发生变化会通知观察者。
*    发布订阅模式:
*      与观察者模式相比，发布订阅模式中间多了一层处理机制（调度中心），用于解耦发布者和订阅者之间的关联。【js事件】
*      调度中心一方面从发布者接收事件，另一方面向订阅者发布事件，订阅者需要从调度中心订阅事件。
* 13.类型转换?(非数值->数值)
*    (1)Number()->用于任何数据类型到数值的转换
*      注：undefined->NAN；null->0；
*          若为字符串:
*            若字符串只包含数字，则将其转为十进制数值（忽略前面的0）
*            若字符串包含有效的浮点格式，则将其转为对应的浮点数值
*            若字符串中包含有效的十六进制，如0xf,则转换为相同的十进制数值
*            ''->0
*            若字符串包含其他字符，则转为NAN
*          若为对象:
*            调用valueOf后按上述规则转换，若返回结果为NaN,则调用toString进行转换
*    (2)parseInt()----|把字符串转为数值：忽略字符串前面的空格，直到找到第一个非空字符，若他不是数字或者负号，则返回NAN,若找到了第一个数字字符，会继续查找直到找到
*       第一个非数字字符，就会忽略后面的字符。以0x开头且后跟数字字符，会把他当做十六进制数；以0开头且后跟数字字符，则把它当做八进制进行解析;
*    (3)parseFloat()--|把字符串转为数值：也是从第一个字符开始解析每个字符，一致解析到字符串末尾，或者遇到的一个无效的浮点数数字位置；始终忽略前导0
* 14.相等操作符?
*    如果有一个操作数是布尔值,则在比较前将其转换为数值(false->0,true->1);
*    如果有一个操作数是字符串，另一个是数值，则在比较前先将字符串转换为数值;
*    如果有一个操作数是对象，另一个操作数不是，则调用对象的valueOf方法，用得到的基本类型的值进行比较;
*    注:
*      null和undefined相等
*      比较前不能将null或undefined转换为其他任何值
*      只要有一个操作数是NAN,则相等操作返回false,不相等操作返回true
*      若2个操作数都是对象，则比较他们是不是一个对象(引用是否相等)
* */

//this的指向: 匿名函数的执行环境具有全局性
/*
var obj = {
  name:'aa',
  sayName:function () {
      this.name='bb';
      (function () {
          console.log(this.name);
          this.name='cc';
      })();
      console.log(this.name);
  }
};
obj.sayName();*/

/*
//类型转换
console.log(null==undefined);   //true
var str = '123ab';
// var tmp = str++;
// console.log(tmp);       //NaN
str += 1;
console.log(str);          //123ab1
*/

//观察者模式
/*class Subject {
    constructor(){
        //订阅主题的观察者
        this.subs=[];
    }
    subscribe(sub){
        this.subs.push(sub);
    }
    unsubscribe(sub){
        var index = this.subs.indexOf(sub);
        index>-1&&this.subs.splice(index,1);
    }
    fire(){
        this.subs.forEach((item)=>{
            this.subs.forEach(sub=>sub.notify);
        });
    }
}
class Observer{
    constructor(data){
        this.data=data;
    }
    notify(){
        console.log(this.data);
    }
}

let subject = new Subject();
let ob1 = new Observer('hello');
let ob2 = new Observer('world');
subject.subscribe(ob1);
subject.subscribe(ob2);
subject.fire();*/

