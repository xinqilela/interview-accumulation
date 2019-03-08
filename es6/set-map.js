/*
* Set && WeakSet:
*   1.Set: 类似于数组，但是成员的值都是唯一的，没有重复的值。Set的遍历顺序就是插入顺序。Set 结构的键名就是键值（两者是同一个值）。
*     const s = new Set([1, 2, 3, 4, 4]);
*     s.size;        返回Set实例的成员总数
*     s.add(5);      添加某个值，返回 Set 结构本身
*     s.delete(5);   删除某个值，返回一个布尔值，表示删除是否成功
*     s.has(5);      返回一个布尔值，表示该值是否为Set的成员
*     s.clear();     清除所有成员，没有返回值
*     s.keys();      返回键名的遍历器
*     s.values();    返回键值的遍历器
*     s.entries();   返回键值对的遍历器
*     forEach((value,key)=>{})      使用回调函数遍历每个成员
*     注：Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
*         let set = new Set(['red', 'green', 'blue']);
          for (let x of set) {
              console.log(x);
          }
    2.WeakSet: 与 Set 类似，也是不重复的值的集合。
*     区别:
*       (1)WeakSet 的成员只能是对象，而不能是其他类型的值，否则会报错
*       (2)WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
*          注：由于WeakSet内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此ES6规定WeakSet不可遍历。
*          WeakSet没有size属性，没有办法遍历它的成员。
*      const ws = new WeakSet([[1, 2], [3, 4]]);
*      const obj = {};
*      ws.add(obj);        向 WeakSet 实例添加一个新成员
*      ws.has(obj);        返回一个布尔值，表示某个值是否在
*      ws.delete(obj);     清除 WeakSet 实例的指定成员
* Map && WeakMap:
*    Map出现的原因：
*      JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
*    为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
*    1.Map: 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
*      const map = new Map([['name', '张三'],  ['title', 'Author']]);
*      map.size；                    返回 Map 结构的成员总数
*      map.set({a:1}, 'content')     设置键名key对应的键值为value，然后返回整个 Map 结构
*      map.get('name');              读取key对应的键值，如果找不到key，返回undefined
*      map.has('name');              回一个布尔值，表示某个键是否在当前 Map 对象之中
*      map.delete('name');           delete方法删除某个键，返回true。如果删除失败，返回false。
*      map.clear();                  清除所有成员，没有返回值。
*      map.kes();                    返回键名的遍历器
*      map.values();                 返回键值的遍历器
*      map.entries();                返回所有成员的遍历器
*      map.forEach();                遍历 Map 的所有成员
*      注: 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。
*          Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
*          for (let [key, value] of map) {
              console.log(key, value);
           }
*    2.WeakMap:
*      区别：
*        (1)WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
*        (2)WeakMap的键名所指向的对象，不计入垃圾回收机制。WeakMap的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其他引用都被清除，
*           垃圾回收机制就会释放该对象所占用的内存。
*           注：WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
*       const wm1 = new WeakMap();
*       const key = {foo: 1};
        wm1.set(key, 2);
        wm1.get(key);
        wm1.has(key);
        wm1.delete(key);
* */