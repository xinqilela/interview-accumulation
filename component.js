/*
*1.对组件化的理解：
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
*    10.react生命周期钩子：
* */

/*
* react和vue对比：
*   https://cn.vuejs.org/v2/guide/comparison.html
*   共同点：3
*   不同之处：
* */

/*
* 问题：
* https://juejin.im/post/5bca74cfe51d450e9163351b#heading-1
* 1.react的特点？
* 2.什么是 JSX ？我们怎样在 JavaScript 代码中书写它？浏览器是如何识别它的？
*     JSX是一种 JavaScript 的语法扩展。
*     let jsx = <h1>hello</h1>;
*     JSX在浏览器中会被编译为React.createElement()调用。
* 3.为什么甚至在我们的代码并没有使用 React 的情况下，也需要在文件顶部 import React from 'react'?
*     只要使用了jsx语法，我们就需要引入react，因为jsx会被babel编译为React.createElement();
* 4.为什么组件不能直接返回多个元素?
* 5.为什么 JSX 中的组件名要以大写字母开头？
*     当元素类型以小写字母开头时，它表示一个内置的组件，如 <div> 或 <span>，将导致字符串 'div' 或 'span' 传递给
*   React.createElement。以大写字母开头的类型，如 <Foo /> 编译为 React.createElement(Foo)，并且它正对应于
*   你在 JavaScript 文件中定义或导入的组件。
* 6.在 React 中你可以声明的两种主要组件类型是什么以及使用时怎样在两者间选择？
*     函数定义组件/类定义组件。
*     在函数组件中只能访问props,没有自己的内部状态。
*     类组件中可以使用生命周期函数，可以定义组件自己的内部状态。
* 7.讲一遍挂载状态组件的生命周期吗？哪些函数按何种顺序被调用？
* 8.你会把向 API 的数据请求放在哪里执行？为什么？
*   (1).componentDidMount
*   (2).componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载。
*       此外，在这方法中调用setState方法，会触发重渲染。不建议在constructor和componentWillMount里写的原因是：
        会阻碍组件的实例化，阻碍组件的渲染；如果用setState，在componentWillMount里面触发setState不会重新渲染。
*   注意：Redux作初始数据载入时，是可以不需透过React组件的生命周期方法。可以这样作的原因：Redux的store中的状态
*   有一个最初始的值(reducer上传参里的默认值)，组件先初始化完成，接着发出异步请求，在作完外部数据加载后，发送
*   动作出来，此时reducer更改store里的状态，react-redux绑定器会触发React组件的重渲染，所以组件上数据会自动更新。
* 9.如何保证在组件重新挂载之后不会重新获取数据？
* 10.解释下“状态提升”理念吗？
*      React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。
*  在React应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。
*  然后，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的共同祖先中。你应该依赖自上而下的数据流，
*  而不是尝试在不同组件中同步状态。
* 11.如果不能在组件间传递数据，你怎样给多级组件传递数据？
*   (1).Context: 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。
*       Context 设计目的是为了共享那些被认为对于一个组件树而言是“全局”的数据。
*   (2).Redux
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