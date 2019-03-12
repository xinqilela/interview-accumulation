/*
* √ 1.axios
* √ 2.对路由的理解         hash-router && onhashchange 和 history-router  && onpopstate
* √ 3.React.component和React.PureComponent的区别?
*      √ 浅对比和深对比的区别？
*        (1)浅对比: 浅比较也称引用相等，在javascript中， ===是作浅比较,只检查左右两边是否是同一个对象的引用
*        (2)深对比: 深比较也称原值相等，深比较是指检查两个对象的所有属性是否都相等,深比较需要以递归的方式遍历两个对象的所有属性，
*                   操作比较耗时，深比较不管这两个对象是不是同一对象的引用
*      √ 浅拷贝和深拷贝的区别?
*         JavaScript有两种数据类型，基础数据类型和引用数据类型。
*         基础数据类型都是按值访问的，我们可以直接操作保存在变量中的实际的值;引用类型的值都是按引用访问的，即保存在变量对象中的一个地址，该地址与堆内存的实际值相关联
*         (1)浅拷贝: 只复制指向某个对象的指针，而不复制对象本身，新旧对象共享一块内存
*         (2)深拷贝: 复制并创建一个一摸一样的对象，不共享内存，修改新对象，旧对象保持不变
*      √ 为什么需要shouldComponentUpdate方法?
*          http://taobaofed.org/blog/2016/08/12/optimized-react-components/
*      √ 为什么函数组件不能使用ref(可以在dom、class组件上使用ref)?
*          函数组件没有实例，父组件获取子组件的ref，其实是在获取子组件的实例。
*          无状态组件是不会被实例化的，在父组件中通过ref来获取无状态子组件时，其值为null。
*          注：ref挂到组件（这里组件指的是有状态组件）上的ref表示对组件实例的引用，而挂载到dom元素上时表示具体的dom元素节点。
*      √ 如何在高阶组件中使用ref?  React提供一个名为 React.forwardRef 的 API 来解决这一问题
*          (1)高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。
*          (2)高阶组件可以传递所有的props属性给包裹的组件，但是不能传递refs引用。因为refs是一个伪属性，React对它进行了特殊处理。如果你向一个由高阶组件
*             创建的组件的元素添加ref应用，那么ref指向的是最外层容器组件实例的，而不是被包裹的组件。
*          (3)connect包装过的组件如何使用ref:
*             connect导出组件时候添加withRef参数    export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(Addition)
*             调用Addition的方法前使用getWrappedInstance()获得目标组件的ref    this.refs.addition.getWrappedInstance().addHandler()
* √ 4.函数组件和类组件的区别
* √ 5.编写类组件为什么要继承React.component
*      继承 React.Component 类以确保此类是一个React组件，重写父类中的 render() 方法进行页面渲染
* √ 6.在constructor中为什么要调用super(props)
*      在JavaScript中，super引用的是父类构造函数;
*      在调用父类构造函数之前，无法用this,JavaScript强制开发者在构造函数中先调用super，才能使用this;
*      如果不传props，直接调用了super()，仍然可以在 render 和其他方法中访问this.props,因为React会在构造函数被调用之后，把props赋值给刚刚创建的实例对象;
*      虽然React会在构造函数运行之后，为this.props 赋值，但在super()调用之后与构造函数结束之前，this.props 仍然是没法用的;
* √ 7.Redux的工作原理
*    (1)工作流程：
*      用户在界面进行操作，调用store.dispatch()发出action;    store.dispatch(action);
*      store接收到action后自动调用reducer，并传入2个参数（当前state和action）,Reducer会返回新的state给store;    let nextState = todoApp(previousState, action);
*      state一旦有变化，store就会调用监听函数,获取当前状态，触发view的重新渲染。    store.subscribe(listener);
*      function listerner() {
           let newState = store.getState();
           component.setState(newState);
       }
      (2)异步操作解决方案
        【1】让Action Creator返回一个函数，使用redux-thunk中间件改造store.dispatch，使得store.dispatch可以接受函数作为参数；
        const fetchPosts = postTitle => (dispatch, getState) => {
            dispatch(requestPosts(postTitle));
            return fetch(`/some/API/${postTitle}.json`)
                .then(response => response.json())
                .then(json => dispatch(receivePosts(postTitle, json)));
        };
        store.dispatch(fetchPosts('reactjs'));
        【2】让Action Creator返回一个Promise对象，使用redux-promise中间件改造store.dispatch，使得store.dispatch可以接受promise作为参数；
        const fetchPosts =  (dispatch, postTitle) => new Promise(function (resolve, reject) {
            dispatch(requestPosts(postTitle));
            return fetch(`/some/API/${postTitle}.json`)
                .then(response => {
                     type: 'FETCH_POSTS',
                     payload: response.json()
                 });
        });
        store.dispatch(fetchPosts('reactjs'));
*√ 8.connect函数的理解: 用于从 UI 组件生成容器组件
*       const VisibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList);
*       (1)mapStateToProps负责输入逻辑，即将state映射到 UI 组件的参数（props）。
*          作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射。
*          mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
*          mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。
*          mapStateToProps使用第二个参数后，如果容器组件的参数发生变化，也会引发UI组件重新渲染。
*          connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。
*       (2)mapDispatchToProps负责输出逻辑，即将用户对 UI 组件的操作映射成 Action，它定义了哪些用户的操作应该当作 Action，传给 Store。
*          如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数，mapDispatchToProps作为函数，
*          应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
*          如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，
*          返回的 Action 会由 Redux 自动发出。
*       (3)connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。React-Redux 提供Provider组件，可以让容器组件拿到state。
*          let store = createStore(todoApp);
           render(
             <Provider store={store}>
               <App />
             </Provider>,
           document.getElementById('root')
           );
           Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了,它的原理是React组件的context属性。
* √ 9.Array、Set、Object、Map的区别
* √ 10.在类组件中绑定this有那些方法？有什么区别?
*    (1)在构造函数中使用bind方法绑定      this.handleClick = this.handleClick.bind(this);
*       优: 只会生成一个方法实例; 绑定一次之后如果多次用到这个方法也不需要再绑定
*       缺: 即使不用到state，也需要添加类构造函数来绑定this，代码量多; 添加参数要在构造函数中bind时指定，不在render中
*    (2)在render方法中使用bind方法绑定    <div onClick={this.handleClick.bind(this)}>test</div>
*    (3)在render方法中使用箭头函数        <div onClick={e => this.handleClick(e)}>test</div>
*       (2)(3)优: 写法简单，当组件中没有state的时候就不需要添加类构造函数来绑定this
*       (2)(3)缺: 每一次调用的时候都会生成一个新的方法实例，因此对性能有影响
*                 当这个函数作为属性值传入低阶组件的时候，这些组件可能会进行额外的重新渲染，因为每一次都是新的方法实例作为的新的属性传递
*    (4)在定义阶段使用箭头函数绑定        handleClick = () => {    console.log('this > ', this);  }
*       优: 创建方法就绑定this，不需要在类构造函数中绑定，调用的时候不需要再作绑定
*       缺: 带参就会和在render方法中使用bind方法绑定相同，这样代码量就变多了
* √ 11.浏览器的事件循环机制?
*    http://lynnelv.github.io/js-event-loop-browser
* √ 12.git的使用流程?
*    (1)git config --global user.name "Your Name"
*       git config --global user.email "email@example.com"
*       --global参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。
*    (2)ssh-keygen -t rsa -C "email@example.com"
*       在用户主目录里找到.ssh目录，里面有 id_rsa 和 id_rsa.pub 两个文件，这两个就是 SSH Key 的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥
*    (2)git init                       初始化一个Git仓库
*       git add <file>                 把文件修改添加到暂存区
*       git commit -m <message>        把暂存区的所有内容提交到当前分支
*    (3)git status                     显示工作区和暂存区的状态
*    (4)git log                        查看提交历史，以便确定要回退到哪个版本
*       git reflog                     查看命令历史，以便确定要回到未来的哪个版本
*    (5)git checkout -- file           [修改未添加到暂存区]            把file文件在工作区的修改全部撤销【没有--，就变成了“切换到另一个分支”的命令】
*       git reset HEAD <file>          [修改添加到暂存区但未commit]    把暂存区的修改撤销掉（unstage），重新放回工作区
*       git reset --hard HEAD^         [commit了不合适的修改到版本库]  把当前版本回退到上一个commit版本
*       git reset --hard commit_id     [commit了不合适的修改到版本库]  回退到某个指定版本
*    (6)当你在文件管理器中把没用的文件删了，或者用rm命令删了,使用git status命令会立刻告诉你哪些文件被删除了,如果确实要从版本库中删除改文件则使用git rm 删除掉并且
*       git commit,现在文件就从版本库中被删除了；如果失误删除，由于版本库里还有，可以使用git checkout -- test.txt把误删的文件恢复到最新版本。
*    (7)git remote add origin git@github.com:xxx/xxx.git
*       git push -u origin master       把本地库的所有内容推送到远程库上,
*                                       加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来
*        git clone git@github.com:xxx/xxx.git
* */

/*React.component和React.PureComponent的区别:
  创建React Component组件的4种方式:
    React.createClass({})    注：在createClass中，React对属性中的所有函数都进行了this绑定
    class Greeting extends React.Component{}     注：这种方式创建组件，React没有对内部的函数进行this绑定，想让函数在回调中保持正确的this，需要对函数进行this绑定
    class Greeting extends React.PureComponent{} 注: PureComponent内部实现了shouldComponentUpdate对props和state进行浅比较来避免不必要的渲染，以此提高性能;
                                                     浅比较可能会导致该渲染的组件没有渲染,应该避免使用可变对象作为props和state，取而代之的是每次返回一个全新的对象;
    函数式组件                                   注：函数式组件没有自身的状态，相同的props输入，必然会获得完全相同的组件展示
                                                     当组件本身只是用来展示，所有数据都是通过props传入的时候，可以使用函数来快速创建组件
   对比:
      createClass vs Component：本质上都是用来创建组件，他们之间并没有绝对的好坏之分，只不过一个是ES5的语法，一个是ES6的语法支持
      pureComponent vs Component：PureComponent已经定义好了shouldUpdateComponent而Component需要显示定义
      Component vs 函数式组件：
      　　Component包含内部state，而函数式组件所有数据都来自props，没有内部state
      　　Component包含生命周期函数，函数式组件都没有，因为函数式组件没有shouldComponentUpdate,所以也无法控制组件的渲染，只要收到新的props，函数式组件就会重新渲染
      　　函数组件不支持Refs
* */

//createClass
const React = require('react');
var Greeting = React.createClass({
    propTypes:{name: React.PropTypes.string},
    getDefaultProps:function () {
        return {name:'aaa'};
    },
    getInitialState:function () {
        return {count:this.props.initialCount};
    },
    handleClick:function () {
        
    },
    render:function () {
        return <div>{{this.props.name}}</div>;
    }
});
module.exports = Greeting;
//函数组件
const Button = (props)=>{
    return <div>{{props.color}}</div>;
};
Button.propTypes={
    color:PropTypes.string.isRequired
};
//在高阶组件中使用ref
function logProps(Component) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('old props:', prevProps);
            console.log('new props:', this.props);
        }

        render() {
            const {forwardedRef, ...rest} = this.props;

            // 通过forwardedRef参数传递ref的值
            return <Component ref={forwardedRef} {...rest} />;
        }
    }

    //然后使用 React.forwardRef 来包装创建 LogProps组件的实例
    //注意这里使用 forwardedRef 来传递 父组件的 ref
    //
    return React.forwardRef((props, ref) => {
        return <LogProps {...props} forwardedRef={ref} />;
    });
}
//---
class MyButton extends React.Component {
    focus() {
    }

    render() {

    }
}
export default logProps(MyButton);
//---
const ref = React.createRef();
<MyButton
label="Click Me"
handleClick={handleClick}
ref={ref}
/>;