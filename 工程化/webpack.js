/*
* 1.entry： 指定一个入口起点（或多个入口起点），默认值为 ./src。
*           指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点
*           （直接和间接）依赖的。每个依赖项随即被处理，最后输出到称之为 bundles 的文件中。
* 2.output：告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
*           如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用占位符
*           来确保每个文件具有唯一的名称。
* 3.loader: 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。
*           loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
*           test属性：用于标识出应该被对应的 loader 进行转换的某个或某些文件。
*           use属性：表示进行转换时，应该使用哪个 loader。
*           注：module.rules 允许你在 webpack 配置中指定多个 loader。
*           使用方式：配置、内联、cli
* 4.plugins：插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大
*            ，可以用来处理各种各样的任务。想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。
* 5.mode: 选择development或production之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化。
* */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件

module.exports = {
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: path.join(__dirname, 'es6'),    //配置文件目录下的es6文件夹作为js源代码文件夹，所有源代码一定要放在该文件夹下
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};

/*
* 1.babel-polyfill使用场景：
*   Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、
*   Promise等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用
*   babel-polyfill，为当前环境提供一个垫片。
* 2.babel-runtime 使用场景:
*   Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数，帮助函数 _defineProperty 可能会重复出现在一些模块里，
*   导致编译后的代码体积变大。Babel 为了解决这个问题，提供了单独的包 babel-runtime 供编译模块复用工具函数。
* 3.babel-plugin-transform-runtime：
*   启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数。
* */
//.babelrc
{
    "presets": ["es2015","react","stage-0"],
    "plugins": []
}
/*
如果需要编译es6，我们需要设置presets包含es2015，也就是预先加载es6编译的模块。
如果需要编译jsx，我们需要设置presets包含react，也就是预先加载react编译的模块。
如果需要编译es7，我们需要设置presets包含stage-0，也就是预先加载es7编译的模块。
stage-0:
  功能范围最广大，包含stage-1, stage-2以及stage-3的所有功能，同时还另外支持如下两个功能插件：
  transform-do-expressions、transform-function-bind
stage-1:
  stage-1除了包含stage-2和stage-3，还包含了下面4个插件：
  transform-class-constructor-call（已废除）、transform-class-properties、
  transform-decorators、transform-export-extensions
stage-2:
  除了包含stage-3，还包含了下面2个插件：
  syntax-trailing-function-commas、transform-object-reset-spread
stage-3:
  3包含了下面2个插件：
  transform-async-to-generator、transform-exponentiation-operator
* */

/* webpack.optimize.UglifyJsPlugin 配置：
compress	boolean, object	true	        压缩选项
mangle	    boolean, object	true
beautify	boolean	false	                美化输出。
output	    一个提供UglifyJS OutputStream选项的对象
                                            更底层地访问 UglifyJS 输出。
comments	boolean, RegExp, function(astNode, comment) -> boolean
                                            默认保存包含 /*!, /**!, @preserve or @license 的注释注释相关的配置
sourceMap	boolean	false	                使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。
test	    RegExp, Array	/.js($|\?)/i	测试匹配的文件
include	    RegExp, Array		            只测试包含的文件。
exclude	    RegExp, Array		            要从测试中排除的文件。
* */

/*   1.webpack的作用是什么？
*        webpack是收把项目当作一个整体，通过一个给定的的主文件，webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包成一个或多个浏览器
*        可识别的js文件。
*    2.webpack的原理？
*        https://zhuanlan.zhihu.com/p/32093510
*        webpack将每一个js文件封装成一个函数，每个文件中的require方法对应的就是__webapck_require__,__webpack_require__会根据传入的moduleID去加载对应的代码，当我们
*        想导出js文件的值时，用module.exports或者exports。
*        webpack中每个模块有一个唯一的id，是从0开始递增的。整个打包后的bundle.js是一个匿名函数自执行。参数则为一个数组。数组的每一项都为个function。function的内容
*        则为每个模块的内容，并按照require的顺序排列。
*    3.如何实现一个简单的webpack?
*      (1)读取文件分析模块依赖;
*      (2)对模块进行解析执行(深度遍历);
*      (3)针对不同的模块使用相应的loader;
*      (4)编译模块，生成抽象语法树AST;
*      (5)循环遍历AST树，拼接输出js;
*         AST树: 抽象语法树是将源代码根据其语法结构，省略一些细节（比如：括号没有生成节点），抽象成树形表达。
*         使用 UglifyJS 生成抽象语法树很简单：
*             var UglifyJS = require('uglify-js');
              var ast = UglifyJS.parse('function sum(foo, bar){ return foo + bar; }');
              使用 walker 遍历抽象语法树:
                  ast.walk(new UglifyJS.TreeWalker(function(node) {
                      console.log(node.print_to_string());
                  }));
           应用: 利用抽象语法树重构 JavaScript 代码
                 希望有一个脚本，查看所有 parseInt 有没有第二个参数，没有的话加上第二个参数 10，表示以十进制识别字符串：
                 使用了 walker 找到 parseInt 调用的地方，然后检查是否有第二个参数，没有的话，记录下来，之后根据每个记录，用新的包含第二个参数的内容替换掉原内容，
                 完成代码的重构
*    4.webpack loader的原理?
*       在解析文件时，会自动去调用相应的loader,loader本质上是一个函数，输入参数是一个字符串，输出参数也是一个字符串。输出的参数会被当成是JS代码，从而被解析成 AST，
*       触发进一步的依赖解析。webpack会按照从右到左的顺序执行loader。
*    5.和gulp有什么区别?
*      https://blog.csdn.net/qianxing111/article/details/80007714
*      (1)Gulp侧重于前端开发的整个过程的控制管理，我们可以通过给gulp配置不通的task（通过gulp.task()方法配置）来让gulp实现不同的功能，然后定义执行顺序，来让
*         gulp执行这些task，从而构建项目的整个前端开发流程。
*         Webpack侧重于模块打包，我们可以把开发中的所有资源（图片、js文件、css文件等）都看成模块，Webpack本身只能处理 js模块，如果要处理其他类型的文件，就需要
*         使用loader 进行转换,通过plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。
*      (2)Webpack中对资源文件的处理是通过入口文件产生的依赖形成的，不会像Gulp那样，配置好路径后，该路径下所有规定的文件都会受影响。
*    6.你配置过webpack吗？有用那些优化措施?
*      因为webpack本身只处理js文件，所以我们要把项目中的jsx（babel-loader,react-hot-loader）、html（html-loader）、样式（style-loader,css-loader,less-loader）、
*      图片（url-loader）、视频（url-loader）、字体（url-loader）等文件使用相应的loader进行处理转换为webpack能够处理的模块【在module.rules中配置】;
*      使用webpack.DefinePlugin定义一些开发时用的全局常量，在开发环境下使用webpack.HotModuleReplacementPlugin开启模块热替换功能，在生产环境下分离样式文件、压缩js、
*      把公共代码分离打包。
*    7.babel把es6转成es5的原理?
*      (1)babel是一个转译器，它只是把同种语言的高版本规则翻译成低版本规则，babel的转译过程也分为三个阶段：parsing、transforming、generating：
*      (2)ES6代码输入->babylon进行解析->得到AST->plugin用babel-traverse对AST进行遍历转义->得到新的AST->用babel-generator将AST生成es代码
*      (3)babel只是转译新标准引入的语法，比如ES6的箭头函数转译成ES5的函数；而新标准引入的新的原生对象，部分原生对象新增的原型方法，新增的API等（如Proxy、Set等），
*      这些babel是不会转译的。需要用户自行引入polyfill来解决
*/