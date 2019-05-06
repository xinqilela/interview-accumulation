/*
https://juejin.im/post/5b29cdaa518825749d2d557a#heading-0
* */

/*
事件流分为冒泡和捕获：
    事件冒泡：子元素的触发事件会一直向父节点传递，一直到根结点停止。此过程中，可以在每个节点捕捉到相关事件。
              可以通过stopPropagation方法终止冒泡。
    事件捕获：和“事件冒泡”相反，从根节点开始执行，一直向子节点传递，直到目标节点。addEventLister给出了第
              三个参数同时支持冒泡与捕获。
事件模型3个阶段:
    捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件；
    目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；
    冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点），事件代理即是利用事件冒泡的机制把里层
              所需要响应的事件绑定到外层
* */

/*
几种事件绑定方式的特点?
  HTML事件处理程序: <button id="btn" onclick="fun()">ClickMe</button>
      特点:事件处理程序内部this值为事件的目标对象。
  DOM 0 级事件处理程序: ele['on'+type]=function(){}; && ele["on"+type] = null;
  DOM 2 级事件处理程序: ele.addEventListener(type,fun,boolean); && ele.removeEventListener(type, fun, boolean);
      特点:boolean为true表示在捕获阶段调用事件处理程序，为false表示在冒泡阶段调用。
  --IE事件处理程序: ele.attachEvent('on'+type,fun); && ele.detachEvent("on"+type, fun);
  对比:  HTML事件处理程序和DOM 0 级事件处理程序只能绑定一个事件处理程序,ele.addEventListener(type,fun,boolean)和
         ele.attachEvent('on'+type,fun)可绑定多个事件处理程序。
         绑定多个事件处理程序时,ele.addEventListener会顺序执行,ele.attachEvent恰恰相反。
         IE事件处理程序在全局作用域内运行，DOM 0和DOM 2级事件处理程序在其所属元素的作用域内运行。
         DOM中的事件对象:
             兼容DOM的浏览器会把event对象传入事件处理程序中，无论通过DOM0级还是DOM2级都会传入event对象。
             event.preventDefault():取消事件的默认行为。（只有cancelable属性是true的事件才可以调用该方法取消默认行为）
             event.stopPropagation():取消事件的进一步冒泡或捕获
             event.stopImmediatePropagation():取消事件的进一步冒泡或捕获,同时阻止任何事件处理程序被调用
             event.target:事件目标
             event.currentTarget：其事件处理程序当前正在处理事件的那个元素
         IE的事件对象:
             与访问DOM中的event对象不同，使用DOM0级添加处理程序时，event对象作为window对象的属性存在；使用attachEvent添加时,
             event会作为事件处理程序的参数传入，也可使用window.event取得。
             var event = window.event || event;
             event.returnValue=false; 取消事件的默认行为。
             event.cancelBubble=true; 取消事件的进一步冒泡。
             event.srcElement:事件目标
  注意： ele.removeEventListener和ele.detachEvent移除事件处理程序，必须提供相同参数，匿名函数无法移除。
* */

/*
事件委托：把一个元素响应事件函数委托到另一个元素。
    一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，
    会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。
    优点:
         很多时候，我们需要通过 AJAX 或者用户操作动态的增加或者去除列表项元素，那么在每一次改变的时候都需要重新给新增的元素绑定
         事件，给即将删去的元素解绑事件；如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，
         执行到目标元素是在真正响应执行事件函数的过程中去匹配的；
* */

//跨浏览器事件处理程序
/*var eventUtil = {
    // 添加句柄
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    // 删除句柄
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    }
};

var oBtn = document.getElementById('btn');

function evtFn() {
    alert('hello world');
}

eventUtil.addHandler(oBtn, 'click', evtFn);
eventUtil.addHandler(oBtn, 'click', function () {
    alert('hello world2');
});*/
// eventUtil.removeHandler(oBtn, 'click', evtFn);
/*
var s1 = document.getElementById('s1');
var s2 = document.getElementById('s2');
s1.addEventListener("click", function (e) {
    console.log("s1 冒泡事件");
}, false);
s2.addEventListener("click", function (e) {
    console.log("s2 冒泡事件");
}, false);
s1.addEventListener("click", function (e) {
    console.log("s1 捕获事件");
}, true);
s2.addEventListener("click", function (e) {
    console.log("s2 捕获事件");
}, true);

//s1 捕获事件
//s2 冒泡事件
//s2 捕获事件
//s1 冒泡事件
//点击s2,点击事件从document->html->body->s1->s2上捕获前进，发现s1上注册的捕获事件处理程序，执行s1上的捕获程序，到达s2即事件目标，
//由于先注册的冒泡后注册的捕获，因此按顺序执行冒泡、捕获程序，然后进入冒泡阶段，发现s1上的冒泡事件处理程序因而进行执行。

var btn = document.getElementById('test');
btn.onclick = function () {
    alert(1);
};
btn.onclick = function () {
    alert(2);
};*/

/*
Load 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。
DOMContentLoaded 事件触发代表初始的 HTML 被完全加载和解析，不需要等待CSS，JS，图片加载。
* */

/*防止用户自己篡改页面*/
if(window.addEventListener){
    window.addEventListener("DOMCharacterDataModified", function(){window.location.reload();}, true);
    window.addEventListener("DOMAttributeNameChanged", function(){window.location.reload();}, true);
    window.addEventListener("DOMElementNameChanged", function(){window.location.reload();}, true);
    window.addEventListener("DOMNodeInserted", function(){window.location.reload();}, true);
    window.addEventListener("DOMNodeInsertedIntoDocument", function(){window.location.reload();}, true);
    window.addEventListener("DOMNodeRemoved", function(){window.location.reload();}, true);
    window.addEventListener("DOMNodeRemovedFromDocument", function(){window.location.reload();}, true);
    window.addEventListener("DOMSubtreeModified", function(){window.location.reload();}, true);
}