/*
单例模式:保证一个类仅有一个实例，并提供一个访问它的全局访问点。
惰性单利：在需要的时候才创建对象实例
* */

// 用代理实现单例模式
var CreateDiv = function( html ){
    this.html = html;
    this.init();
};
CreateDiv.prototype.init = function(){
    var div = document.createElement( 'div' );
    div.innerHTML = this.html;
    document.body.appendChild( div );
};
var ProxySingletonCreateDiv = (function(){
    var instance;
    return function( html ){
        if ( !instance ){
            instance = new CreateDiv( html );
        }
        return instance;
    }
})();
var a = new ProxySingletonCreateDiv( 'sven1' );
var b = new ProxySingletonCreateDiv( 'sven2' );
// alert( a === b );  //true

//惰性单例
var getSingle = function( fn ){
    var result;
    return function(){
        return result || ( result = fn .apply(this, arguments ) );
    }
};
var createLoginLayer = function(){
    var div = document.createElement( 'div' );
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild( div );
    return div;
};
var createSingleLoginLayer = getSingle( createLoginLayer );
document.getElementById( 'loginBtn' ).onclick = function(){
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};

/*
* 代理模式:为一个对象提供一个代用品或占位符，以便控制对它的访问
      代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身
  对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之
  后，再把请求转交给本体对象。
* */
/*虚拟代理实现图片预加载
代理的意义：代理负责预加载图片，预加载的操作完成之后，把请求重新交给本体 MyImage。 img 节点设置 src 和图片预加载这两个功能，
            被隔离在两个对象里，它们可以各自变化而不影响对方。就算有一天我们不再需要预加载，那么只需要改成请求本体而不是请求代理对象即可。*/
var myImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );
    return function( src ){
        imgNode.src = src;
    }
})();

var proxyImage = (function(){
    var img = new Image;
    img.onload = function(){
        myImage( this.src );
    }
    return function( src ){
        myImage( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
        img.src = src;
    }
})();
proxyImage( 'http:// imgcache.qq.com/music// N/k/000GGDys0yA0Nk.jpg' );

/*
* 发布-订阅模式: 又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
* 1.可以广泛应用于异步编程中，这是一种替代传递回调函数的方案。
* 2.可以取代对象之间硬编码的通知机制，一个对象不用再显式地调用另外一个对象的某个接口。发布—订阅模式让两个对象松耦合地联系在一起，虽然不太清楚彼此的细节，但这不影响它们之间相互通信。
*/
/* 下面代码的实现必须先订阅载发布,如何解决先发布后订阅的问题?
     建立一个存放离线事件的堆栈，当事件发布的时候，如果此时还没有订阅者来订阅这个事件，我们暂时把发布事件的动作包裹在一个函数里，这些包装函数将被
  存入堆栈中，等到终于有对象来订阅此事件的时候，我们将遍历堆栈并且依次执行这些包装函数，也就是重新发布里面的事件。当然离线事件的生命周期只有一次，
  所以刚才的操作我们只能进行一次。
* */
var Event = (function(){
    var clientList = {},
        listen,
        trigger,
        remove;
    listen = function( key, fn ){
        if ( !clientList[ key ] ){
            clientList[ key ] = [];
        }
        clientList[ key ].push( fn );
    };
    trigger = function(){
        var key = Array.prototype.shift.call( arguments ),
            fns = clientList[ key ];
        if ( !fns || fns.length === 0 ){
            return false;
        }
        for( var i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, arguments );
        }
    };
    remove = function( key, fn ){
        var fns = clientList[ key ];
        if ( !fns ){
            return false;
        }
        if ( !fn ){
            fns && ( fns.length = 0 );
        }else{
            for ( var l = fns.length - 1; l >=0; l-- ){
                var _fn = fns[ l ];
                if ( _fn === fn ){
                    fns.splice( l, 1 );
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();
Event.listen( 'squareMeter88', function( price ){ // 小红订阅消息
    console.log( '价格= ' + price ); // 输出：'价格=2000000'
});
Event.trigger( 'squareMeter88', 2000000 ); // 售楼处发布消息
