/*
* Proxy: 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
* 支持的拦截操作：
*   1.get          用于拦截某个属性的读取操作
*   2.set          用来拦截某个属性的赋值操作
*   3.apply        拦截函数的调用、call和apply操作
*   4.has          拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效，典型的操作就是in运算符
*                  注：如果原对象不可配置或者禁止扩展，这时has拦截会报错；has拦截对for...in循环不生效!!
*   5.construct             用于拦截new命令  注：construct方法返回的必须是一个对象，否则会报错。
*   6.deleteProperty        用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
*   7.defineProperty        拦截了Object.defineProperty操作
*   8.getOwnPropertyDescriptor     拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
*   9.getPrototypeOf               用来拦截获取对象原型
*   10.
*   11.
*   12.
*   13.
* */