/*
* 1.如何理解MVVM?
*     MVVM分别指 Model,View，View-Model，View通过View-Model的DOM Listeners将事件绑定到Model上，
*     而Model则通过Data Bindings来管理View中的数据，View-Model从中起到一个连接桥的作用。
*     与MVC的区别：
*       实现数据与视图的分离
*       通过数据来驱动视图，开发者只需要关心数据变化，DOM操作被封装了。
* 2.vue如何解析模板？
* 3.介绍vue的实现流程?
* 4.对vue的生命周期函数的理解？
*   beforeCreate:
*     实例初始化之后，this指向创建的实例，不能访问到data、computed、watch、methods上的方法和数据
*   created:
*     实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到$el属性，
*     $ref属性内容为空数组
*   beforeMount:
*     在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数
*   mounted:
*     实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问
*   beforeUpdate:
*     响应式数据更新时调用，发生在虚拟DOM打补丁之前
*   updated:
*     虚拟DOM重新渲染和打补丁之后调用，组件DOM已经更新，可执行依赖于DOM的操作
*   beforeDestroy:
*     实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例
*   destroyed:
*     实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
* */