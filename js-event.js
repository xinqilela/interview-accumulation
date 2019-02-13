/*
https://juejin.im/post/5b29cdaa518825749d2d557a#heading-0
* */

/*
事件流分为冒泡和捕获：
    事件冒泡：子元素的触发事件会一直向父节点传递，一直到根结点停止。此过程中，可以在每个节点捕捉到相关事件。可以通过stopPropagation方法终止冒泡。
    事件捕获：和“事件冒泡”相反，从根节点开始执行，一直向子节点传递，直到目标节点。addEventLister给出了第三个参数同时支持冒泡与捕获。
* */

/*
几种事件绑定函数的特点?
  ele['on'+Type]=function(){}; && ele["on"+Type] = null;
  ele.addEventListener(type,fun,boolean); && ele.removeEventListener(type, fun, boolean);
  ele.attachEvent('on'+type,fun); && ele.detachEvent("on"+type, fun);
* */

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