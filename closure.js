/*
执行上下文:
this：this要在执行时才能确认值，定义时无法确认.
      场景:作为构造函数执行;作为对象属性执行;作为普通函数执行；call\apply\bind;
作用域:
作用域链:
* */

/*
闭包:能够读取其他函数内部变量的函数,在Javascript中，只有函数内部的子函数才能读取局部变量，可以把闭包理解成"定义在一个函数内部的函数"。
     在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
作用:
     1.可以读取函数内部的变量
     2.让这些变量的值始终保持在内存中
注意:
     1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题。
     所以在退出函数之前，将不使用的局部变量全部删除。
     2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，
     把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），要小心，不要随便改变父函数内部变量的值。
* */

function f1() {

    var n = 999;

    nAdd = function () {
        n += 1
    }

    function f2() {
        console.log(n);
    }

    return f2;

}

var result = f1();

result(); // 999

nAdd();

result(); // 1000

console.log('------------------------');

//在这段代码中，result实际上就是闭包f2函数。函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。
//原因在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。

var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc: function () {
        return function () {
            return this.name;
        };

    }

};

console.log(object.getNameFunc()());  //The Window
console.log('------------------------');

var name = "The Window";

var object = {
    name: "My Object",

    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };

    }

};

console.log(object.getNameFunc()()); //My Object

/*
* 函数防抖
* 函数节流
* */