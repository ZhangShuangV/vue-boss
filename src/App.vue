<style>
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        min-width: 1024px;
    }
    .ivu-row{
        width: 100%;
        height: 100%;
    }
    .layout-navigator, .layout-navigator ul, .layout-content{
        height: 100%;
    }
    .layout-navigator ul{
        background: #1d2939;
    }
    .layout-navigator ul li{
        padding: 0!important;
    }
    .layout-navigator ul li a{
        padding: 0 24px;
        display: inline-block;
        height: 60px;
        width: 100%;
        line-height: 60px;
        color: #636e7b;
        font-weight: 700;
        font-size: 16px;
    }
    .layout-navigator ul li a i{
        display: inline-block;
        width: 20px;
    }
    .layout-navigator-content li span{
        margin-left: 10px;
    }
    .layout-navigator-content .active{
        background: #1caf9a;
        color: #fff;
    }

    .layout-logo-text{
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #636e7b;
        background: #fff;
        font-size: 24px;

    }
    .layout-content-header{
        height: 50px;
        line-height: 50px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-content-wrapper{
        width: 100%;
        height: 100%;
        /*padding: 20px;*/
        background: #e4e7ea;
    }

    /* 收起导航栏时生效 */
    .layout-hide-text .layout-text{
        display: none;
    }
    .layout-hide-text .layout-navigator ul li a{
        padding: 0;
        text-align: center;
        /*color: #fff;*/
    }
    .view{
        width: 100%;
        height: 100%;
        padding-bottom: 40px;
        overflow: auto;
    }
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active for <2.1.8 */ {
        opacity: 0;
    }
</style>

<template>
    <div id="app" class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row>
            <Col :span="spanLeft" class="layout-navigator">
                <Menu active-name="1" width="auto">
                    <div class="layout-logo-text">
                        <router-link to="/">
                            <Icon type="android-desktop" :size="iconSize"></Icon>
                            <span class="layout-text">BOSS后台</span>
                        </router-link>
                    </div>
                    <ul class="layout-navigator-content">
                        <template v-for="(item,index) in menuList">
                            <li @click="clickMenuItem(index)">
                                <router-link :to="item.to" class="layout-icon" :class="{active: item.active}" >
                                    <Icon :type="item.icon" :size="iconSize"></Icon>
                                    <span class="layout-text">{{ item.name }}</span>
                                </router-link>
                            </li>
                        </template>
                    </ul>
                </Menu>
            </Col>
            <Col :span="spanRight" class="layout-content">
                <div class="layout-content-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="layout-content-wrapper">
                    <transition name="component-fade">
                        <router-view class="view"></router-view>
                    </transition>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                spanLeft: 4,
                spanRight: 20,
                menuList: [ //导航列表数据
                    {icon: 'briefcase', name: '奖池管理', to: '/pollManager', active: false},
                    {icon: 'android-bookmark', name: '卡券管理', to: '/cardManager', active: false},
                    {icon: 'ios-paper', name: '活动管理', to: '/activityManager', active: false}
                ]
            }
        },
        computed: {
            iconSize() {
              return this.spanLeft === 4 ? 18: 24;
            }
        },
        methods: {
            toggleClick() {
                if(this.spanLeft === 4) {
                    this.spanLeft = 1;
                    this.spanRight = 23;
                }else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                }
            },
            clickMenuItem(index) {
                for(let i = 0, len = this.menuList.length; i < len; i++) {
                    this.menuList[i].active = false;
                }
                this.menuList[index].active = true;
            }
        }
    }
</script>
