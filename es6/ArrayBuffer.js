/*
* 1.ArrayBuffer对象: 代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
*   const buf = new ArrayBuffer(32);         生成了一段 32 字节的内存区域，每个字节的值默认都是 0
*   buf.byteLength;                          返回所分配的内存区域的字节长度
*   const newBuffer = buffer.slice(0, 3);    拷贝buffer对象的前 3 个字节（从 0 开始，到第 3 个字节前面结束），生成一个新的ArrayBuffer对象。
*   ArrayBuffer.isView(buf)                  静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。
*   以TypeView视图进行读写: -- 与DataView视图的一个区别是，它不是一个构造函数，而是一组构造函数，代表不同的数据格式。
*       const x1 = new Int32Array(buf);
*       const x2 = new Uint8Array(buf);
*   以DataView视图进行读写:
*       const dataView = new DataView(buf);      为了读写这段内容，需要为它指定视图
*       dataView.getUnit8(0);                    以不带符号的 8 位整数格式，从头读取 8 位二进制数据
* 2.TypedArray视图: 共包括 9 种类型的视图,Int8Array、Uint8Array、Uint8ClampedArray、Int16Array、Uint16Array、Int32Array、Uint32Array、Float32Array、Float64Array。
*   const b = new ArrayBuffer(8);
*   const v2 = new Uint8Array(b, 2,2);           创建一个指向b的Uint8视图，开始于字节2，长度为2
*   const f64a = new Float64Array(8);            生成一个 8 个成员的Float64Array数组
*   const typedArray = new Int8Array(new Uint8Array(4));        Int8Array构造函数接受一个Uint8Array实例作为参数。注：此时生成的新数组，只是复制了参数数组的值，
*                                                               对应的底层内存是不一样的。新数组会开辟一段新的内存储存数据，不会在原数组的内存之上建立视图。
*   const typedArray = new Uint8Array([1, 2, 3, 4]);            TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图
*   注: 普通数组的操作方法和属性，对 TypedArray 数组完全适用, TypedArray 数组没有concat方法。
* 3.DataView视图: 可以自定义复合格式的视图，比如第一个字节是 Uint8、第二、三个字节是 Int16、第四个字节开始是 Float32等等，还可以自定义字节序。
* */