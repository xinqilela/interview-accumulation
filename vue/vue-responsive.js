/*
 https://juejin.im/post/5adf0085518825673123da9a
* */

/*
vue双向绑定的原理:数据劫持 + 发布-订阅模式
1.vue将data初始化为一个Observer并对对象中的每个值，重写了其中的get、set，data中的每个key，都有一个独立的依赖收集器。
2.在get中，向依赖收集器添加了Watcher
3.在mount时，实例了一个Watcher，将收集器的目标指向了当前Watcher
4.在data值发生变更时，触发set，触发了依赖收集器中的所有Watcher的更新，来触发Watcher.update
* */

var data = {name: 'yck'}
observe(data)
let name = data.name // -> get value
data.name = 'yyy' // -> change value
function observe(obj) {
    // 判断类型
    if (!obj || typeof obj !== 'object') {
        return
    }
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
    })
}

function defineReactive(obj, key, val) {
    // 递归子属性
    observe(val)
    let dp = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            console.log('get value')
            // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
            // target指向一个Watcher实例，每个Watcher都是一个订阅者
            // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
            if (Dep.target) {
                dp.depend();
            }
            return val
        },
        set: function reactiveSetter(newVal) {
            console.log('change value')
            val = newVal
            // 执行 watcher 的 update 方法
            dp.notify()
        }
    })
}

// 订阅-发布中心,他负责存储订阅者并分发消息
class Dep {
    constructor() {
        //存储订阅者的数组
        this.subs = []
    }

    // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    //添加订阅者
    addSub(sub) {
        // sub 是 Watcher 实例
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

// 全局属性，通过该属性配置 Watcher
Dep.target = null;

class Watcher {
    constructor(obj, key, cb) {
        // 将 Dep.target 指向自己
        // 然后触发属性的 getter 添加监听
        // 最后将 Dep.target 置空
        Dep.target = this
        this.cb = cb //当数据更新时想要做的事情
        this.obj = obj //被订阅的数据
        this.key = key
        this.value = obj[key]
        Dep.target = null
    }

    update() {
        // 获得新值
        this.value = this.obj[this.key]
        // 调用 update 方法更新 Dom
        this.cb(this.value)
    }

    addDep(dep) {
        dep.addSub(this);
    }
}

/*
* Object.defineProperty && Proxy
* Object.defineProperty的缺点:
*   1.无法监听数组变化
*   2.只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历,如果属性值也是对象那么需要深度遍历
* Proxy的优势:
*   1.Proxy直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于Object.defineProperty
*   2.Proxy可以直接监听数组的变化
*   3.拥有13种拦截方法
*   4.Proxy返回的是一个新对象，可以只操作新的对象达到目的，Object.defineProperty只能遍历对象属性直接修改
*   缺点：兼容性问题
* */