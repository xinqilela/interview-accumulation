/*
https://juejin.im/post/5ac61da66fb9a028c71eae1b
https://juejin.im/entry/5a2cbd51f265da430b7b2b82
* 前端路由实现:
* 1.hash路由
      url 上的 hash 以 # 开头，原本是为了作为锚点，方便用户在文章导航到相应的位置。因为 hash 值的改变不会引起页面的刷新，因此可以用 hash 值来做单页面应用的路由，
    并且当 url 的 hash 发生变化的时候，可以触发相应 hashchange 回调函数。
* 2.history路由:
*     History 路由是基于 HTML5 规范，在 HTML5 规范中提供了 history.pushState || history.replaceState 来进行路由控制。
*     history 的改变并不会触发任何事件，这让我们无法直接去监听 history 的改变从而做出相应的改变。
*     对于一个应用而言，url 的改变(不包括 hash 值得改变)只能由下面三种情况引起：
*       (1)点击浏览器的前进或后退按钮、
*       (2)点击a标签、
*       (3)在JS代码中触发 history.push(replace)State函数
*          对上述三种情况进行拦截，可以变相监听到 history 的改变而做出调整。
*          针对情况1，HTML5 规范中有相应的 onpopstate 事件，通过它可以监听到前进或者后退按钮的点击。
*          针对情况2 ,要为所有的a(href)标签绑定click事件,在事件触发时,利用history.push(replace)State进行路由跳转并更新视图，
*          针对情况3 ,在 JS 直接触发 pushState 函数，那么这时候你必须要调用视图更新函数，否则就是出现视图内容和 url 不一致的情况
*
* */
/*class Routers {
    constructor() {
        // 存放不同路由对应的回调函数
        this.routes = {};
        // 当前hash
        this.currentUrl = '';
        // 记录出现过的hash
        this.history = [];
        // 作为指针,默认指向this.history的末尾,根据后退前进指向history中不同的hash
        this.currentIndex = this.history.length - 1;
        this.refresh = this.refresh.bind(this);
        this.backOff = this.backOff.bind(this);
        // 默认不是后退操作
        this.isBack = false;
        //在 load 事件发生后刷新页面
        window.addEventListener('load', this.refresh, false);
        //当 hash 值改变时触发对应回调函数
        window.addEventListener('hashchange', this.refresh, false);
    }

    route(path, callback) {
        this.routes[path] = callback || function() {};
    }

    refresh() {
        this.currentUrl = location.hash.slice(1) || '/';
        if (!this.isBack) {
            // 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
            // 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
            // 避免再次造成指针的不匹配,我们直接截取指针之前的数组
            // 此操作同时与浏览器自带后退功能的行为保持一致
            if (this.currentIndex < this.history.length - 1)
                this.history = this.history.slice(0, this.currentIndex + 1);
            this.history.push(this.currentUrl);
            this.currentIndex++;
        }
        this.routes[this.currentUrl]();
        console.log('指针:', this.currentIndex, 'history:', this.history);
        this.isBack = false;
    }
    // 后退功能
    backOff() {
        // 后退操作设置为true
        this.isBack = true;
        this.currentIndex <= 0
            ? (this.currentIndex = 0)
            : (this.currentIndex = this.currentIndex - 1);
        location.hash = `#${this.history[this.currentIndex]}`;
        this.routes[this.history[this.currentIndex]]();
    }
}
window.Router=new Routers();
const content = document.querySelector('body');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
function changeBgColor(color) {
    content.style.backgroundColor = color;
}
Router.route('/',function () {
    changeBgColor('yellow');
});
Router.route('/blue',function () {
    changeBgColor('blue');
});
Router.route('/green',function () {
    changeBgColor('green');
});
button.addEventListener('click', Router.backOff, false);*/


class Routers {
    constructor() {
        this.routes = {};
        this._bindPopState();
    }
    init(path) {
        history.replaceState({path: path}, null, path);
        this.routes[path] && this.routes[path]();
    }

    route(path, callback) {
        this.routes[path] = callback || function() {};
    }

    go(path) {
        history.pushState({path: path}, null, path);
        this.routes[path] && this.routes[path]();
    }
    _bindPopState() {
        window.addEventListener('popstate', e => {
            const path = e.state && e.state.path;
            this.routes[path] && this.routes[path]();
        });
    }
}

window.Router = new Routers();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');
function changeBgColor(color) {
    content.style.backgroundColor = color;
}

Router.route('/', function() {
    changeBgColor('yellow');
});
Router.route('/blue', function() {
    changeBgColor('blue');
});
Router.route('/green', function() {
    changeBgColor('green');
});

ul.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        Router.go(e.target.getAttribute('href'));
    }
});

/*
* hash-router:
* */

/*
* history-router:
* */