/*
* 1.css伪类和伪元素的区别: 在于有没有创建一个文档树之外的元素
*   伪类:用于当已有元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。
*   伪元素:用于创建一些不在文档树中的元素，并为其添加样式。CSS3规范中的要求使用双冒号(::)表示伪元素。
* 2.BFC
* 3.readonly和disabled的区别
*   (1)disabled可以作用于所有的表单元素, readonly只对<input type='text'>、<textarea>有效。
*   (2)disabled阻止对元素的一切操作，例如获取焦点，点击事件等等, readonly只是将元素设置为只读，其他操作正常。
*   (3)disabled可以让表单元素的值无法被提交，readonly不影响提交。
* 3.promise的原理
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
* 5.类型转换?++运算符?+=运算符?
* 6.react新版本的新特性?
* 7.36匹马,6个赛道，要至少比较几次，才能找到跑的最快的3匹马？   8次
*   (1)把36匹马分成6组，找出每组里跑的最快的3匹马。             6
*   (2) [a1  ,a2,  a3]   ×
*                               [a1  ,a2,  a3]  1
*       [a1  ,a2,  a3]   ×
*                               [a1  ,a2×,  a3×]  2
*       [a1  ,a2,  a3]   ×
*                               [a1  ,a2×,  a3×]  3
*       然后对让每组跑的最快的马进行比较，找出跑的最快的三匹马。 1
*   (3)剩余的马再比较一次即可找出。                              1
* 8.cookie,localStorage,sessionStorage?
*   能否跨域?
*   如何实现在天猫登录后淘宝也会登录?
* 9.为什么https可以实现加密传输?
*   https://blog.csdn.net/jasonjwl/article/details/50985271
*   (1)HTTP是应用层协议，位于HTTP协议之下是传输协议TCP。TCP负责传输，HTTP则定义了数据如何进行包装。HTTPS是Http的安全升级版,其实就是在HTTP和TCP中间加了一层加密层TSL/SSL。
*   (2)TLS、SSL其实是类似的东西，SSL是个加密套件，负责对HTTP的数据进行加密。TLS是SSL的升级版。现在提到HTTPS，加密套件基本指的是TLS。
*   (3)传输加密的流程: 原先是应用层将数据直接给到TCP进行传输，现在改成应用层将数据给到TLS/SSL，将数据加密后，再给到TCP进行传输。
*   (4)加密手段:
*      对称加密: 加密数据用的密钥，跟解密数据用的密钥是一样的
*      非对称加密: 加密数据用的密钥（公钥），跟解密数据用的密钥（私钥）是不一样的
*      公钥：公开的密钥，谁都可以查到
*      私钥：非公开的密钥，一般是由网站的管理员持有
*      公钥、私钥两个有什么联系呢？简单的说就是，通过公钥加密的数据，只能通过私钥解开。通过私钥加密的数据，只能通过公钥解开。非对称加密只能保证单向数据传输的安全性。
*      公钥如何获取?
*      
* 10.为什么要减少js对dom的操作?
*    DOM操作会引起浏览器的repaint和reflow操作，这两个操作比较耗时，所以造成对DOM操作比较慢。
* 11.css样式会阻塞页面的渲染吗?js会阻塞页面的渲染吗？script异步加载?
* 12.chunk传输?
* */

//this的指向
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
//类型转换
console.log(null==undefined);   //true
var str = '123ab';
// var tmp = str++;
// console.log(tmp);       //NaN
str += 1;
console.log(str);          //123ab1
