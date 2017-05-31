/**
 * 入口文件
 */

// dependencies
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App.vue';
import './assets/styles/reset.css';

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iview);

// components
import home from './component/home.vue';
import pollManager from './component/pollManager.vue'; //奖池管理
import pollConfig from './component/pollConfig.vue'; //奖池编辑页
import cardManager from './component/cardManager.vue'; //卡券管理
import cardConfig from './component/cardConfig.vue'; //卡券编辑页
import activityManager from './component/activityManager.vue'; //活动管理
import activityConfig from './component/activityConfig.vue'; //活动编辑页
import movie from './component/movie.vue';

/**
 * router
 * 创建router，管理App路由
 * @type {VueRouter}
 */
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            redirect: '/home' //重定向到home
        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/pollManager',
            component: pollManager
        },
        {
            path: '/pollConfig/:pollid', //配置动态路径
            component: pollConfig
        },
        {
            path: '/cardManager',
            component: cardManager
        },
        {
            path: '/cardConfig/:cardtimeid',
            component: cardConfig
        },
        {
            path: '/activityManager',
            component: activityManager
        },
        {
            path: '/activityConfig/:activityid',
            component: activityConfig
        },
        {
            path: '/movie',
            component: movie
        },

    ]
});

// app
const app = new Vue({
    router, //把router实例注入vue根实例中
    render: h => h(App),
    components: {
        home, pollManager, pollConfig, cardManager, cardConfig, activityManager, activityConfig,
        movie
    }
}).$mount('#app');