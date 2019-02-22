/*
* ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
* ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。“编译时加载”或者静态加载，ES6可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。
* 注意：ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。
* */

/*export命令：
  export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
  export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
  export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，import命令也是如此。
*/
export
1;  // 报错
var m = 1;
export
m;  // 报错

//以下为正确写法，它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。
// 写法一
export var m = 1;
// 写法二
var m = 1;
export {m};
// 写法三
var n = 1;
export {n as m};

/*import命令：
* 使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。
* import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。
* import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
* import命令具有提升效果，会提升到整个模块的头部，首先执行。
* import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
* */

import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
a.foo = 'hello'; //若a为对象，则修改其属性为合法操作，但建议不要修改

foo();
import {foo} from 'my_module';

//import语句会执行所加载的模块，因此可以有下面的写法
import 'lodash';
// 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。

//目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。
// 因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';

//模块的整体加载
//注：模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。
// circle.js
export function area(radius) {
    return Math.PI * radius * radius;
}

export function circumference(radius) {
    return 2 * Math.PI * radius;
}

//当前文件
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
// 下面操作是不允许的
circle.foo = 'hello';

/*
* export default命令：
* export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
* */
// 正确
export var a = 1;
// 正确
var a = 1;
export default a;
// 错误
export default
var a = 1;

/*
* 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
* 注意：写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。
* */
export {foo, bar} from 'my_module';
export * from 'my_module';
export {default} from 'foo';
export {es6 as default} from './someModule';
export {default as es6} from './someModule';


// 模块的继承
// circleplus.js【circleplus继承了circle模块】
//注意：export *命令会忽略circle模块的default方法。
export * from 'circle';
export var e = 2.71828182846;
export default function (x) {
    return Math.exp(x);
}

//const声明的常量只在当前代码块有效,想设置跨模块的常量，可以采用下面的写法。
export const A = 1;
export const B = 3;
export const C = 4;

/*import()函数：
可以完成动态加载。import()返回一个 Promise 对象。
import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
场景：
    按需加载
    条件加载
    动态的模块路径
*/
const main = document.querySelector('main');
import(`./section-modules/${someVariable}.js`)
    .then(module => {
        module.loadPageInto(main);
    })
    .catch(err => {
        main.textContent = err.message;
    });
//按需加载
button.addEventListener('click', event => {
    import('./dialogBox.js')
        .then(dialogBox => {
            dialogBox.open();
        })
        .catch(error => {
            /* Error handling */
        })
});
//条件加载
if (condition) {
    import('moduleA').then(...);
} else {
    import('moduleB').then(...);
}
//动态路径
import(f())
    .then(...);


/*
* ES6 模块与 CommonJS 模块的差异：
* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
* ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。
  等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。ES6 模块不会缓存运行结果，而是动态地去
  被加载的模块取值，并且变量总是绑定其所在的模块。
* */