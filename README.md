---
title: 基于Vuejs、vue-router、iview的管理后台
date: 2017-05-28 15:23:41
categories:
    - 前端
    - JavaScript
    - Vuejs
tags:
    - JavaScript
    - Vuejs
    - iView
    - Vue-router
---
上一篇分享的是使用angularjs及materialdesign的管理后台前端页面的实现。因为感觉input的输入框实在是太丑了，并且用户端的页面我早已开发完毕，就等着后端给接口了，所以就萌生出了使用心中一直念念不忘的Vuejs来实现一版管理后台。
<!-- more -->
这个使用了Vue-cli来构建vue架构，使用vue-router来搭建路由，使用iview来作为UI框架。

## 项目构建
1. 安装nodejs
[nodejs安装及常用快捷键](http://blog.zhangshuang.top/nodejs%E5%AE%89%E8%A3%85%E5%8F%8A%E5%B8%B8%E7%94%A8%E5%BF%AB%E6%8D%B7%E9%94%AE/)
建议安装nvm来控制nodejs的版本，上面的链接里有详细的步骤，包括启动node服务常用的PM2等等...

2. 全局安装webpack、vue-cli脚手架
`npm install -g webpack vue-cli`;

3. 创建工程
`vue init webpack-simple <project name>`
这里直接一路回车就可以了。
注意：工程名不能是中文

4. 安装项目依赖
进入工程，输入`npm install`就可以了。

5. 安装路由模块vue-router、网络请求模块vue-resource模块
`npm install --save vue-router vue-resource`
这个会安装到`package.json`的`dependencies`中。

6. 安装UI框架 iView
`npm install --save iview`

7. 使用iView、vue-router、vue-resource
```
# main.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App.vue';

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iview);
```

8. 修改webpack.config.js配置文件
因为使用iView需要引用其css，但是最初的webpack.config.js文件里面并没有配置读取css文件和字体文件或者有的设定的有问题，所以这里需要我们自行修改一下：
```
{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
 },
 {
    test: /\.css$/,
    loader: "style-loader!css-loader"
 },
 {
    test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
    loader: "file-loader"
 },
 {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]?[hash]'
    }
 }
```
完整的配置如下：
```
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
```

9. 启动项目
`npm run dev`

## UI框架 iView
因为之前angular项目的经历，所以在UI框架的选择中，就很是花了一番心思。最初打算使用element，后来从ant-design的官网上看到了iview，读了读作者的简介之后深有感触，感觉UI确实看起来不错，所以就选择了这个框架。
这个UI框架因为是国人弄的，所以看起来基本就是0难度，上手非常容易。需要的样式都可以从官网的demo中找到。
#### 引用
通过import引入iview，并且调用`vue.use()`方法即可使用iView框架。
```
import iview from 'iview';
vue.use(iview);
```

#### 布局
iview的布局是通过`Row`、`Col`标签实现的，但是`Col`标签必须位于`Row`标签里面。它的栅格化布局把页面分为了24份。通过给变迁添加`span`属性就可以实现：
```
<Row>
    <Col span="22">
        <Icon type="ios-paper" size="40"></Icon>
        <h3>活动管理</h3>
    </Col>
    <Col span="2" class="activity-manager-button-add">
        <Button type="primary">活动</Button>
    </Col>
</Row>
```

#### Icon
合理的使用icon可以使项目变得好看一些，通过给iview中的Icon标签设置type属性，就可以显示出icon图片来。iview提供了很多icon，虽然已手机类的居多，但是还是能找到相似的使用的。设置size属性就可以改变icon的大小。

#### table
之前的angular项目中，table是自己写的，但是发现iview中table效果很棒，所以直接就用的iview的Table标签。
`<Table :columns="activityTable" :data="activityList"></Table>`
template中只需要这一行就可以设置好table，columns属性是设置table的表头，

###### Issue:
Table表单暂时不能在变化宽度的时候自适应，暂时还未开放宽度设定接口。

#### Button
iview的Button样式也很好看，通过设置`type`属性就可以设置不同的样式，`disable`属性可以控制是否可以点击。

#### ...
全部功能可以从官网上找到，上手非常简单，基本看一眼就会[iView官网](https://www.iviewui.com)

## 路由 vue-router
路由用的是官方支持的[vue-router](http://vuejs.github.io/vue-router/)。
如果要在一个模块化工程中使用vue-router，需要使用`vue.use()`方法，用以安装路由功能。
```
import VueRouter from 'vue-router';
vue.use(VueRouter);
```
#### Template
template中，路由通过`router-link`标签来使用，设置`to`属性可以设置跳转位置：
`<router-link :to="/about">Go to About</router-link>`，这个在项目运行时，会渲染成`<a href=""></a>`
跟AngularJs一样，Vuejs也需要一个类似于`ng-view`的东西来放置替换进来的template。`<router-view></router-view>`

#### Js
在创建路由之前，需要先把要使用的模块引入，当然也可以从本文件创建一个，不过这不太符合组件化的初衷。
```
import home from './component/home.vue';
import about from './component/about.vue';
```
引入模块之后，需要定义路由，并且创建一个VueRouter的实例。这里通过一步来完成这个过程。
```
const router = new VueRouter({
    base: __dirname,
    routes: [
        {path: '/home', component: home},
        {path: '/about', component: about}
    ]
})
```
最后要把VueRouter挂载到应用中：
```
const app = new Vue({
    router
}).$mount('#app');
```

#### 动态路由匹配
就像restful风格一样，有些内容会重复使用同一个模块。比如有多个user，共同使用user.vue这个组件模块，那么我们就可以在router中使用动态路径参数来实现这个效果：
```
{
    path: '/pollConfig/:pollid',
    component: pollConfig
}
```
其中，`:pollid`就是动态的，像`/pollConfig/1`、`/pollConfig/2`都能通过上面的路由，匹配到`pollConfig`这个组件。

#### Js中使用路由
如果我们想实现在js中进行跳转，如`window.location.href`这种效果时，通过设置`this.$router.push()`就可以实现：
`this.$router.push({path: '/home'})`
除了`push`以外还有几种方法，这个跟h5的history的API比较像

#### 重定向
举一个例子来说，如果我们访问`/home`这个路由时，访问到的是`home`这个组件模块，但是我们在直接访问这个网站的时候，一般路径都是`/`，这里就需要我们进行重定向的设置，将`/`重定向到`/home`：
```
{
    path: '/',
    redirect: '/home'
}
```

#### history模式
vue-router默认使用hash模式来模拟一个完整的URL，但是这个并不怎么好看... 我们可以通过设置`history`模式，使得URL看起来跟正常的一模一样。
```
const router = new VueRouter({
    mode: 'history',
    routes: [...]
});
```
但是这个需要后端同学进行相应的设置。因为我这个只是写的前端demo，后端同学一直在忙别的接口，所以这个地方我并没有过多的尝试。
贴个后端设置的链接[vue-router History 模式](http://router.vuejs.org/zh-cn/essentials/history-mode.html)

#### 路由效果
通过在`<router-view></router-view>`的外面

#### 说明
如果项目比较大的话，可以新建一个跟`main.js`平级的`router.js`来配置路由信息，然后在`main.js`中引用就好了。如果项目路由不算太多的话，还是直接在`main.js`中写就好了。

## vue-resource
这个跟angular-resource使用方法基本一致，这里就不在说了。贴个git地址：[vue-resource](https://github.com/pagekit/vue-resource)
