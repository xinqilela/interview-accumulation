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

//-3.组合继承:使用原型链实现原型属性和方法的继承，使用借用构造函数实现实例属性的继承。
//优点：避免了原型链和借用构造函数模式的缺陷，结合了他们的优点，是最常用的继承方式。
function ChildClass(superValue, subValue) {
    SuperType.call(this, superValue);
    this.subValue = subValue;
}
ChildClass.prototype = new SuperType();

var child1 = new ChildClass('111', '222');
child1.numbers.push('333');
var child2 = new ChildClass('111', '222');
console.log(child1.numbers, child2.numbers);

//-4.原型式继承:借助原型基于已有的对象创建新对象，同时不用因此创建自定义类型。
//适用场景：当仅仅想让一个对象和另一个对象保持相似的情况
//es5通过Object.create(用作新对象原型的对象，为新对象定义额外属性的对象)规范了原型式继承
function object(o) {
    function F() {}
    F.prototype=o;
    return new F();
}
//-5.寄生式继承
//-6.寄生组合式继承