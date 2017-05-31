<style>
    .poll-manager-wrapper{
    }
    .poll-manager-page-title{
        height: 70px;
        padding: 15px;
        background: #f7f7f7;
    }
    .poll-manager-page-title i{
        vertical-align: middle;
        margin: 0 10px;
    }
    .poll-manager-page-title h3{
        color: #1D2939;
        font-size: 28px;
        vertical-align: middle;
        display: inline-block;
    }
    .poll-manager-page-title .poll-manager-button-add{
        height: 40px;
        line-height: 40px;
    }
    .poll-manager-content{
        margin: 20px;
    }
    .poll-manager-title{
        background:#fff;
        position: relative;
        margin-bottom: 16px;
    }
    .poll-manager-title h3{
        height: 32px;
        line-height: 32px;
    }
    .poll-manager-title button{
        position: absolute;
        right: 20px;
    }
</style>
<template>
    <div class="poll-manager-wrapper">
        <div class="poll-manager-page-title">
            <Row>
                <Col span="22">
                    <Icon type="briefcase" size="40"></Icon>
                    <h3>奖池管理</h3>
                </Col>
                <Col span="2" class="poll-manager-button-add">
                    <Button type="primary" @click="editPollItem">新增奖池</Button>
                </Col>
            </Row>
        </div>
        <Card dis-hover class="poll-manager-content">
            <Row>
                <Table :columns="pollTable" :data="pollList" size="large"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="pollListTotal" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>
            </Row>
        </Card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pollTable: [ //表头内容
                    {
                        title: '奖池ID',
                        key: 'reservation1'
                    },
                    {
                        title: '奖池名称',
                        key: 'poolName'
                    },
                    {
                        title: '奖池描述',
                        key: 'poolDescribe'
                    },
                    {
                        title: '创建时间',
                        key: 'createDate'
                    },
                    {
                        title: '状态',
                        key: 'poolStatus',
                        render: (h, params) => {

                            if(params.row.poolStatus) {
                                return h('span',
                                    {
                                        style: {
                                            color: '#00cc66'
                                        }
                                    },
                                    '启用');
                            }else {
                                return h('span',
                                    {
                                        style: {
                                            color: '#ff3300'
                                        }
                                    }
                                    ,'未启用');
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'handle',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showPollItemInfo(params.index);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editPollItem(params.index);
                                        }
                                    }
                                }, '编辑')
                            ])
                        }
                    }
                ],
                pollList: [],
                pollListTotal: 100
            }
        },
        methods: {
            getPollList(pageNumber) { //获取奖池列表资源
                this.$http.get('http://rapapi.org/mockjsdata/18747/lotterypool/poollist', {}).then( res => {
                    this.pollList = res.data.pollList;
                }, err => {
                    console.log(err);
                });
            },
            showPollItemInfo(index) { //展示奖池信息
                this.$Modal.info({
                    title: '奖池信息',
                    content: `奖池id：${this.pollList[index].reservation1}<br/>名称：${this.pollList[index].poolName}<br/>规则：${this.pollList[index].poolDescribe}`
                });
            },
//            removePollItem(index) { //删除单个奖池
//                this.$Modal.confirm({
//                    title: '确认删除此条信息？',
//                    content: '删除后，信息将无法恢复！',
//                    onOk: () => {
//                        const pollId = this.pollList[index].reservation1;
//                        this.pollList.splice(index, 1);
//                        this.$Message.success(`奖池${pollId} 删除成功!`);
//                    }
//                });
//            },
            editPollItem(index) { //编辑单个奖池，跳转页面
                if(index != null && typeof index === 'number') {
                    console.log(typeof index !== 'number');
                    this.$router.push({path: '/pollConfig/' + index});
                }else {
                    this.$router.push({path: '/pollConfig/new'});
                }
            },
            changePage(index) { //切换页码
                this.getPollList(index);
            }
        },
        created: function () { //在该组件创建时，类似于constructor()方法，即：类创建时调用的方法
            this.getPollList(1);
        }
    }
</script>
