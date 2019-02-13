/*
promise:异步编程的一种解决方案。
  1.Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
  2.特点:
     （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
          只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
     （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
          只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
          如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
   3.优缺点:
      优点：可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数；Promise对象提供统一的接口，使得控制异步操作更加容易。
      缺点: 无法取消Promise，一旦新建它就会立即执行，无法中途取消；如果不设置回调函数，Promise内部抛出的错误，不会反应到外部；
            当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
* */

function MyPromise(executor){
    var that = this
    this.status = 'pending' // 当前状态
    this.data = undefined
    this.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    this.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

    // 更改状态 => 绑定数据 => 执行回调函数集
    function resolve(value){
        if(that.status === 'pending'){
            that.status = 'resolved'
            that.data = value
            for(var i = 0; i < that.onResolvedCallback.length; ++i){
                that.onResolvedCallback[i](value)
            }
        }
    }

    function reject(reason){
        if(that.status === 'pending'){
            that.status = 'rejected'
            that.data = reason
            for(var i = 0; i < that.onResolvedCallback.length; ++i){
                that.onRejectedCallback[i](reason)
            }
        }
    }

    try{
        executor(resolve, reject) // resolve, reject两个函数可以在外部传入的函数（executor）中调用
    } catch(e) { // 考虑到执行过程可能有错
        reject(e)
    }
}

// 标准是没有catch方法的，实现了then，就实现了catch
// then/catch 均要返回一个新的Promise实例

MyPromise.prototype.then = function(onResolved, onRejected){
    var that = this
    var promise2

    // 值穿透
    onResolved = typeof onResolved === 'function' ? onResolved : function(v){ return v }
    onRejected = typeof onRejected === 'function' ? onRejected : function(r){ return r }

    if(that.status === 'resolved'){
        return promise2 = new MyPromise(function(resolve, reject){
            try{
                var x = onResolved(that.data)
                if(x instanceof MyPromise){ // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
                    x.then(resolve, reject)
                }
                resolve(x) // 否则，以它的返回值做为promise2的结果
            } catch(e) {
                reject(e) // 如果出错，以捕获到的错误做为promise2的结果
            }
        })
    }

    if(that.status === 'rejected'){
        return promise2 = new MyPromise(function(resolve, reject){
            try{
                var x = onRejected(that.data)
                if(x instanceof MyPromise){
                    x.then(resolve, reject)
                }
            } catch(e) {
                reject(e)
            }
        })
    }

    if(that.status === 'pending'){
        return promise2 = new MyPromise(function(resolve, reject){
            self.onResolvedCallback.push(function(reason){
                try{
                    var x = onResolved(that.data)
                    if(x instanceof MyPromise){
                        x.then(resolve, reject)
                    }
                } catch(e) {
                    reject(e)
                }
            })

            self.onRejectedCallback.push(function(value){
                try{
                    var x = onRejected(that.data)
                    if(x instanceof MyPromise){
                        x.then(resolve, reject)
                    }
                } catch(e) {
                    reject(e)
                }
            })
        })
    }
}

MyPromise.prototype.catch = function(onRejected){
    return this.then(null, onRejected)
}

// 以下是简单的测试样例：
new MyPromise(resolve => resolve(8)).then(value => {
    console.log(value)
})