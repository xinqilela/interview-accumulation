/*
*1.对组件化的理解：
*     封装：一个组件所需的数据封装于组件内部；
*     组合：一个组件可以与其他组件通过组合的方式实现更加复杂的业务逻辑；
*     组件化是为了代码的复用和分治。可以将UI切分成一些独立的、可复用的组件，这样你就只需专注于构建每一个单独的组件。
*   当你的UI中有一部分重复使用了好几次，或者其自身就足够复杂，类似这些都是抽象成一个可复用组件的绝佳选择。
* 2.jsx是什么：
*         一种 JavaScript 的语法扩展。 推荐在 React 中使用 JSX 来描述用户界面。JSX 只是为 React.createElement()
*     方法提供的语法糖。
* 3.jsx和vdom是什么关系：
*     调用React.createElement()会创建虚拟dom。
* 4.什么是虚拟DOM：
*     虚拟DOM是一个原生的JavaScript对象，并且具有真实DOM信息的一些属性。它在APP与DOM之间建立了一个抽象层，当数据和状态
*     发生改变时，只需要在虚拟DOM上进行操作，最后再同步到真实的DOM中。所以，虚拟DOM可以减少直接操作DOM的次数，减少
*     不必要的[repaint和reflow]，提高性能。
* 5.描述react的setState：
*     https://juejin.im/post/5b87d14e6fb9a01a18268caf
*     setState是一个异步的过程，它会集齐一批需要更新的组件然后一起更新。
*     注：[1].禁止在 shouldComponentUpdate 和 componentWillUpdate 中调用 setState，这会造成循环调用，直至耗光浏览器
*             内存后崩溃。
*         [2].在 componentDidUpdate 中执行 setState 同样会导致组件刚刚完成更新又要再更新，进入死循环。但是在某些特殊
*             情况下，若不得不在这个函数里使用 setState ，注意要设置一个前提条件。如非必须，应该尽量避免在本函数里 setState。
*         [3].在 componentWillReceiveProps 中可以 setState，不会造成二次渲染。
*     (1).获取当前组件的实例
*     (2).将要更新的state放入数组_pendingStateQueue中
*     (3).用equeueUpdate方法处理将要更新的组件实例
*     (4).当前如果正处于创建/更新组件的过程，不会立刻去更新组件，而是先把当前的组件放在dirtyComponent里（所以
*         不是每一次的setState都会更新组件）；
*     (5).否则调用batchedUpdates方法开始批量更新组件,将isBatchingUpdate（标记是否处于批量更新阶段）设置为true,然后判断
*         当前是否处于更新/创建阶段，若当前处于组件的更新/创建阶段，就把当前组件放在dirtyComponent里，否则
*         循环所有dirtyComponent的updateComponent来更新组件。
* 6.自顶向下或单向数据流：
*     任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。
* 7.Keys：
*     key可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个
*  确定的标识,key会作为给React的提示，但不会传递给你的组件。如果组件中需要使用和key相同的值，请用其他属性名显式传递这个值.
*  8.受控组件&非受控组件：
*    受控组件：表单数据由 React 组件处理。需要为每个状态更新编写事件处理程序。
*    非受控组件：非受控组件将真实数据保存在 DOM 中，表单数据由 DOM 处理，需要使用ref获取表单元素值。
*  9.ref:
*    (1).创建ref:
*        使用 React.createRef() 创建 refs，通过 ref 属性来获得 React 元素。
*        React 也支持另一种设置 ref 的方式，称为“回调 ref”，更加细致地控制何时 ref 被设置和解除。
*    (2).使用：
*        当 ref 属性被用于一个普通的 HTML 元素时，React.createRef() 将接收底层 DOM 元素作为它的 current 属性以创建 ref 。
*        当 ref 属性被用于一个自定义类组件时，ref 对象将接收该组件已挂载的实例作为它的 current 。
*        你不能在函数式组件上使用 ref 属性，因为它们没有实例。
*    (3).注意：
*        如果 ref 回调以内联函数的方式定义，在更新期间它会被调用两次，第一次参数是 null ，之后参数是 DOM 元素。这是因为
*        在每次渲染中都会创建一个新的函数实例。因此，React 需要清理旧的 ref 并且设置新的。通过将 ref 的回调函数定义成
*        类的绑定函数的方式可以避免上述问题。
*    10.react生命周期钩子：见下文
* */

/*
* react和vue对比：
*   https://cn.vuejs.org/v2/guide/comparison.html
*   共同点：
*       (1).使用 Virtual DOM
*       (2).提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件
*       (3).将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库
*   不同之处：
*       (1)在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树，若要避免不必要的
*          子组件的重渲染，要在所有可能的地方使用 PureComponent，或是手动实现shouldComponentUpdate方法，同时可能
*          会需要使用不可变的数据结构来使得你的组件更容易被优化；
           在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。
        (2)在不使用Redux,vuex这样的状态管理容器的情况下，在React中你需要使用setState()方法去更新状态，在Vue中数据
            由data属性在Vue对象中进行管理。
        (3)React推荐使用jsx，vue推荐使用模板语法。
* */

/*
* 问题：
* https://juejin.im/post/5bca74cfe51d450e9163351b#heading-1
* 1.react的特点？
*   https://juejin.im/post/5b4aeac25188251ac9767634
*   虚拟DOM、组件化、声明式代码、单向数据流、JSX语法
* 2.什么是 JSX ？我们怎样在 JavaScript 代码中书写它？浏览器是如何识别它的？
*     JSX是一种 JavaScript 的语法扩展。
*     let jsx = <h1>hello</h1>;
*     JSX在浏览器中会被编译为React.createElement()调用。
* 3.为什么甚至在我们的代码并没有使用 React 的情况下，也需要在文件顶部 import React from 'react'?
*     只要使用了jsx语法，我们就需要引入react，因为jsx会被babel编译为React.createElement();
* 4.为什么 JSX 中的组件名要以大写字母开头？
*     当元素类型以小写字母开头时，它表示一个内置的组件，如 <div> 或 <span>，将导致字符串 'div' 或 'span' 传递给
*   React.createElement。以大写字母开头的类型，如 <Foo /> 编译为 React.createElement(Foo)，并且它正对应于
*   你在 JavaScript 文件中定义或导入的组件。
* 5.在 React 中你可以声明的两种主要组件类型是什么以及使用时怎样在两者间选择？
*     函数定义组件/类定义组件。
*     在函数组件中只能访问props,没有自己的内部状态。
*     类组件中可以使用生命周期函数，可以定义组件自己的内部状态。
* 6.讲一遍挂载状态组件的生命周期吗？哪些函数按何种顺序被调用？
*   https://juejin.im/entry/587de1b32f301e0057a28897
*   (1).在组件初始化阶段：componentWillMount -> render -> componentDidMount
*   (2).在组件更新阶段：
*      props改变：componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> componentDidUpdate
*      state改变：shouldComponentUpdate -> componentWillUpdate -> componentDidUpdate
*   (3).组件卸载阶段：componentWillUnmount
* 7.你会把向 API 的数据请求放在哪里执行？为什么？
*   (1).componentDidMount
*   (2).componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载。
*       此外，在这方法中调用setState方法，会触发重渲染。不建议在constructor里写的原因是：会阻碍组件的实例化，
*       阻碍组件的渲染；不建议在componentWillMount里写得原因是：如果用setState，在componentWillMount里面触发
*       setState不会重新渲染，React新版本的算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到
*       componentWillMount 的触发次数。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React
 *      可能会多次频繁调用 componentWillMount。
*   注意：Redux作初始数据载入时，是可以不需透过React组件的生命周期方法。可以这样作的原因：Redux的store中的状态
*   有一个最初始的值(reducer上传参里的默认值)，组件先初始化完成，接着发出异步请求，在作完外部数据加载后，发送
*   动作出来，此时reducer更改store里的状态，react-redux绑定器会触发React组件的重渲染，所以组件上数据会自动更新。
* 8.如何保证在组件重新挂载之后不会重新获取数据？
*       前端缓存。
* 9.解释下“状态提升”理念吗？
*      React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。
*  当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据
*  或者函数来管理这种依赖或着影响的行为。
* 10.如果不能在组件间传递数据，你怎样给多级组件传递数据？
*   (1).Context: 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。
*       Context 设计目的是为了共享那些被认为对于一个组件树而言是“全局”的数据。
*   (2).Redux进行状态管理。
* */

const ThemeContext = React.createContext('light');

function ThemedButton(props) {
    // ThemedButton 组件从 context 接收 theme
    return (<ThemeContext.Consumer>
        {theme => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>);
}

// 中间组件
function Toolbar(props) {
    return (
        <div>
        <ThemedButton />
        </div>
);
}

class App extends React.Component {
    render() {
        return (<ThemeContext.Provider value="dark">
            <Toolbar />
            </ThemeContext.Provider>);
    }
}

/*
* React  V16 版本中引入了 Fiber 机制。
* Fiber 本质上是一个虚拟的堆栈帧，新的调度器会按照优先级自由调度这些帧，从而将之前的同步渲染改成了异步渲染，在不影响体验的情况下去分段计算更新。
* 对于异步渲染，现在渲染有两个阶段：reconciliation 和 commit 。前者过程是可以打断的，后者不能暂停，会一直更新界面直到完成
* Reconciliation 阶段 ：
*   componentWillMount
*   componentWillReceiveProps
*   shouldComponentUpdate
*   componentWillUpdate
* Commit 阶段：
*   componentDidMount
*   componentDidUpdate
*   componentWillUnmount
* reconciliation 阶段是可以被打断的，所以 reconciliation 阶段会执行的生命周期函数就可能会出现调用多次的情况，从而引起 Bug。对于reconciliation 阶段调用的几个函数，
* 除了 shouldComponentUpdate 以外，其他都应该避免去使用，并且 V16 中也引入了新的 API 来解决这个问题：
*   getDerivedStateFromProps 用于替换 componentWillReceiveProps ，该函数会在初始化和 update 时被调用；
*   getSnapshotBeforeUpdate 用于替换 componentWillUpdate ，该函数会在 update后 DOM 更新前被调用，用于读取最新的 DOM 数据。
* */
    class ExampleComponent extends React.Component {
        // 用于初始化 state
        constructor() {}
        // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
        // 因为该函数是静态函数，所以取不到 `this`
        // 如果需要对比 `prevProps` 需要单独在 `state` 中维护
        static getDerivedStateFromProps(nextProps, prevState) {}
        // 判断是否需要更新组件，多用于组件性能优化
        shouldComponentUpdate(nextProps, nextState) {}
        // 组件挂载后调用
        // 可以在该函数中进行请求或者订阅
        componentDidMount() {}
        // 用于获得最新的 DOM 数据
        getSnapshotBeforeUpdate() {}
        // 组件即将销毁
        // 可以在此处移除订阅，定时器等等
        componentWillUnmount() {}
        // 组件销毁后调用
        componentDidUnMount() {}
        // 组件更新后调用
        componentDidUpdate() {}
        // 渲染组件函数
        render() {}
        // 以下函数不建议使用
        componentWillMount() {}
        componentWillUpdate(nextProps, nextState) {}
        componentWillReceiveProps(nextProps) {}
    }