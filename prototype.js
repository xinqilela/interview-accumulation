/*
 原型规则：
 1.所有的引用类型（数组、对象、函数）都具有对象特性，即可自由扩展属性
 2.所有引用类型，都有一个__proto__属性，该属性为一个普通对象
 3.所有函数，都有一个prototype属性，该属性为一个普通对象
 4.所有引用类型的__proto__属性指向其构造函数的prototype属性
 5.当试图得到一个对象的某个属性时，若这个对象本身没有这个属性，则会去它的__proto__属性中寻找（即其构造函数的prototype）。
 */

/*
 构造函数、原型、实例的关系：
 每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针,实力都包含一个指向原型的指针。
 * */

/*
 js创建对对象:
    工厂模式、构造函数模式、原型模式、【组合使用构造函数和原型模式】、动态原型模式、寄生构造函数模式、稳妥构造函数模式
* */

/*
 js实现继承的原理：原型链
 */

// -1.利用原型链实现继承，注：使用原型链实现继承时，不能使用对象字面量创建原型方法，因为会重写原型对象。
// 问题：1.包含引用属性值得原型属性会被所有实例共享；2.无法向超类型传参
function SuperType(superValue) {
    this.superValue = superValue;
    this.numbers = [1, 2, 3];
}

SuperType.prototype.getSuperValue = function () {
    return this.superValue;
};

function SubType(subValue) {
    this.subValue = subValue;
}

SubType.prototype = new SuperType();
// SubType.prototype = { //重写了原型对象，导致上一行代码无效
//     getSubValue: function () {
//         return this.subValue;
//     }
// };
var instance = new SubType('aa');
// console.log(instance.getSubValue());
// console.log(instance.getSuperValue());
var o2 = new SubType();
instance.numbers.push(10);
console.log(instance.numbers);
console.log(o2.numbers);

//-2.借用构造函数实现继承：
//问题：1.超类型原型中的方法对子类型而言不可见；2.无法避免构造函数模式带来的问题，函数复用性差
function ChildType(superValue, subValue) {
    SuperType.call(this, superValue);
    this.subValue = subValue;
}

var child = new ChildType('aaa', 'bbb');
console.log(child.superValue, child.subValue);

//+++3.组合继承:使用原型链实现原型属性和方法的继承，使用借用构造函数实现实例属性的继承【最常用的继承】。
//优点：避免了原型链和寄生构造函数模式的缺陷，结合了他们的优点。
//缺点：无论什么情况下，都会调用2次超类型构造函数。
function ChildClass(superValue, subValue) {
    SuperType.call(this, superValue);
    this.subValue = subValue;
}

ChildClass.prototype = new SuperType();

var child1 = new ChildClass('111', '222');
child1.numbers.push('333');
var child2 = new ChildClass('111', '222');
console.log(child1.numbers, child2.numbers);

//-4.原型式继承:借助原型基于已有的对象创建新对象，同时还不必因此创建自定义类型。
//特点:没有严格意义上的构造函数
//本质:对传入其中的对象执行了一次钱复制
//场景：当仅仅想让一个对象和另一个对象保持相似的情况
//es5通过Object.create(用作新对象原型的对象，为新对象定义额外属性的对象)规范了原型式继承
function object(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
}

var person = {
    name: 'nini',
    friends: ['aiai', 'bibi']
};

var p1 = object(person);
p1.friends.push('cici');
var p2 = object(person);
p2.friends.push('didi');
console.log(person.friends); //aiai,bibi,cici,didi

//-5.寄生式继承:思路和借用构造函数和工厂模式类似，就是创建一个仅用于封装继承过程的函数，该函数内部以某种方式增强对象，最后返回对象。
//缺点：由于要为对象添加函数，导致函数无法复用而降低效率。
function createPerson(obj) {
    var childObj = object(obj);
    childObj.sayHi = function () {
        console.log('hi');
    };
    return childObj;
}

//+++6.寄生组合式继承：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。【最理想的继承】
//思路：不必为了指定子类型的原型而调用超类型的构造函数，我们需要的是超类型原型的副本。
//优点:只调用了一次超类型构造函数，并因此避免了在子类型原型上创建不必要的、多余的属性；原型链保持不变，因此可以正常使用instanceof和isPrototypeOf()。
function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype); //创建对象
    prototype.constructor = subType; //增强对象
    subType.prototype = prototype; //指定对象
}




















