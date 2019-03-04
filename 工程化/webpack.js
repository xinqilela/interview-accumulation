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
*            ，可以用来处理各种各样的任务。
*           想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。
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
*   Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数，类似上面的帮助函数 _defineProperty 可能会重复出现在一些模块里，
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

/*
* 1.webpack loader的原理：
* 2.webpack的原理和机制：
* 3.babel把es6转成es5的原理：
* */