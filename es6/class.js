//存值函数和取值函数是设置在属性的 Descriptor 对象上的。
class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
}

var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "html"
);
//存值函数和取值函数是定义在html属性的描述对象上面
// console.log("get" in descriptor);  // true
// console.log("set" in descriptor);  // true

//类也可以使用表达式的形式定义
//这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};
let inst = new MyClass();
// console.log(inst.getClassName()) // Me
// console.log(Me.name) // ReferenceError: Me is not defined

//立即执行的class
let person = new class {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}('aa');

/*注意：
*      类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。
*      类不存在变量提升
*      类拥有name 属性
*      可以定义generator方法,在某个方法之前加上星号
*      类的方法内部如果含有this，它默认指向类的实例
* */

//Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
class Foo {
    constructor(...args) {
        this.args = args;
    }

    * [Symbol.iterator]() {
        for (let arg of this.args) {
            yield arg;
        }
    }
}

// for (let x of new Foo('hello', 'world')) {
//     console.log(x);
// }
// hello
// world

//类的方法内部如果含有this，它默认指向类的实例
class Logger {
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
// logger.printName();
const {printName} = logger;
// printName(); // TypeError: Cannot read property 'print' of undefined

/*
* 静态方法:在方法名前加上static关键字,就称为“静态方法”。
* 要直接在类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。
* 如果静态方法包含this关键字，这个this指的是类，而不是实例。
* 父类的静态方法，可以被子类继承。静态方法也是可以从super对象上调用的。
* */
class Goo {
    static classMethod() {
        this.baz();
    }

    static baz() {
        console.log('baz');
    }

    baz() {
        console.log('goo');
    }
}

class GooChild extends Goo {
    static classMethod() {
        super.classMethod();
    }
}

// Goo.classMethod();
var foo = new Goo();
// foo.classMethod();
// GooChild.classMethod();

/*
* 实例属性：
*   除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层(不需要在实例属性前面加上this)。
* */
// class IncreasingCounter {
//     _count = 0;
//     get value() {
//         console.log('Getting the current value!');
//         return this._count;
//     }
//     increment() {
//         this._count++;
//     }
// }

/*
* 静态属性: Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
* */
class Koo {
    // static prop = 'aa'; // 改写法目前不被支持
    getName() {
        console.log('oh', Koo.prop);
    }
}

Koo.prop = 1;
// var koo = new Koo();
// koo.getName(); //oh 1
// console.log(Koo.prop) // 1

/*
  es6未提供私有属性和私有方法,现有解决方案如下：
* 私有属性：1.在属性名之前，使用#表示【提案】。
* 私有方法:1.在命名上加以区别,私有方法名前面加下划线;2.将私有方法移出模块;3.利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
* */
const bar = Symbol('bar');
const snaf = Symbol('snaf');

// class Widget {
//     //私有属性
//     #count = 0;
//     // 公有方法
//     foo(baz) {
//         // this._bar(baz);
//         // bar.call(this,baz);
//         // this[bar](baz);
//     }
//
//     // 私有方法
//     _bar(baz) {
//         return this.snaf = baz;
//     }
//     // 私有方法
//     [bar](baz){
//         return this[snaf]=baz;
//     }
//
//     increment() {
//         this.#count++;
//     }
// }
// // 私有方法
// function bar(baz) {
//     return this.snaf = baz;
// }

/*
* new.target:
* 用在构造函数之中，返回new命令作用于的那个构造函数。
* 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
* 注意：子类继承父类时，new.target会返回子类。
* */
function Person(name) {
    if (new.target === Person) {
        this.name = name;
    } else {
        throw new Error('必须使用 new 命令生成实例');
    }
}

// var p = new Person('张三'); // 正确
// var notAPerson = Person.call(person, '张三');  // 报错
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
    }
}

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}

// var obj = new Square(3); // 输出 false

/*
* es5和es6继承比较：
* S5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
* ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
* */
/*
* super关键字:
* 1.子类必须在constructor方法中调用super方法，否则新建实例时会报错。因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，
*    然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
* 2.如果子类没有定义constructor方法，这个方法会被默认添加。
* 3.在子类的构造函数中，只有调用super之后，才可以使用this关键字
* 4.用法：
*   当作函数使用;
*      1.表示父类的构造函数,super内部的this指的是子类的实例
*      2.super()只能用在子类的构造函数之中，用在其他地方就会报错。
*   当作对象使用;
*      1.在普通方法中，super指向父类的原型对象,所以定义在父类实例上的方法或属性，是无法通过super调用的,
*        在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例
*      2.在静态方法中，super指向父类,在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
*   使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
* */

class A {
    constructor() {
        this.x = 1;
    }
    print() {
        console.log(this.x);
    }
    static myMethod(msg) {
        console.log('static', msg);
    }
    static m() {
        console.log('this.x', this.x);
    }
    myMethod(msg) {
        console.log('instance', msg);
    }
}

class B extends A {
    constructor() {
        super();
        this.x = 2;
        //由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
        super.x = 3;
        // console.log(super.x); // undefined
        // console.log(this.x); // 3
    }
    m() {
        super.print();
    }
    static m() {
        super.m();
    }
    static myMethod(msg) {
        super.myMethod(msg);
    }
    myMethod(msg) {
        super.myMethod(msg);
    }
}

let b = new B();
//super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
// B.myMethod(1); // static 1
// b.myMethod(2);  // instance 2
// B.x='xxx';
// 在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
//在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
// b.m() // 2
// B.m();

/*
* 类的 prototype 属性和__proto__属性:
* （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
* （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
* */

/*
* 实例的 __proto__ 属性:
* 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。
* */
// var p1 = new Point(2, 3);
// var p2 = new ColorPoint(2, 3, 'red');
// p2.__proto__ === p1.__proto__ // false
// p2.__proto__.__proto__ === p1.__proto__ // true

/*
* 原生构造函数的继承 ：
* es5中原生构造函数无法继承。ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。
* ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。
* */
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}

var arr = new MyArray();
arr[0] = 12;
// console.log(arr.length) // 1

arr.length = 0;
// console.log(arr[0]) // undefined

/*
* NewObj继承了Object，但是无法通过super方法向父类Object传参。
* 这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数。
* */
class NewObj extends Object{
    constructor(){
        super(...arguments);
    }
}
var o = new NewObj({attr: true});
console.log(o.attr === true)  // false

/*
* Mixin模式:指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。
* */
function mix(...mixins) {
    class Mix {}
    for (let mixin of mixins) {
        copyProperties(Mix.prototype, mixin); // 拷贝实例属性
        copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin)); // 拷贝原型属性
    }
    return Mix;
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if ( key !== "constructor"
            && key !== "prototype"
            && key !== "name"
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

// class DistributedEdit extends mix(Loggable, Serializable) {
//     // ...
// }