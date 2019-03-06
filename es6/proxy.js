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
*   9.getPrototypeOf               用来拦截获取对象原型     注意：getPrototypeOf方法的返回值必须是对象或者null，否则报错。
*                                  另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf方法必须返回目标对象的原型对象。
*   10.isExtensible         拦截Object.isExtensible操作      注意：注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。
                            这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。
*   11.ownKeys              用来拦截对象自身属性的读取操作
*   12.preventExtensions    拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
                            注：这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），
                            proxy.preventExtensions才能返回true，否则会报错。
*   13.setPrototypeOf       用来拦截Object.setPrototypeOf方法
* */