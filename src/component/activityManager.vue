<style>
    .activity-manager-wrapper{
    }
    .activity-manager-page-title{
        height: 70px;
        padding: 15px;
        background: #f7f7f7;
    }
    .activity-manager-page-title i{
        vertical-align: middle;
        margin: 0 10px;
    }
    .activity-manager-page-title h3{
        color: #1D2939;
        font-size: 28px;
        vertical-align: middle;
        display: inline-block;
    }
    .activity-manager-page-title .activity-manager-button-add{
        height: 40px;
        line-height: 40px;
    }
    .activity-manager-content{
        margin: 20px;
    }
    .activity-manager-title{
        background:#fff;
        position: relative;
        margin-bottom: 16px;
    }
    .activity-manager-title h3{
        height: 32px;
        line-height: 32px;
    }
    .activity-manager-title button{
        position: absolute;
        right: 20px;
    }
</style>
<template>
    <div class="activity-manager-wrapper">
        <div class="activity-manager-page-title">
            <Row>
                <Col span="22">
                    <Icon type="ios-paper" size="40"></Icon>
                    <h3>活动管理</h3>
                </Col>
                    <Col span="2" class="activity-manager-button-add">
                    <Button type="primary" @click="editActivityItem">新增活动</Button>
                </Col>
            </Row>

        </div>
        <Card dis-hover class="activity-manager-content">
            <Row>
                <Table :columns="activityTable" :data="activityList" size="large"></Table>
            </Row>
        </Card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activityTable: [ //表头内容
                    {
                        title: '活动ID',
                        key: 'reservation1'
                    },
                    {
                        title: '活动名称',
                        key: 'poolName'
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
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
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
                                            this.editActivityItem(params.index);
                                        }
                                    }
                                }, '编辑')
                            ])
                        }
                    }
                ],
                activityList: []
            }
        },
        methods: {
            show(index) {
                this.$Modal.info({
                    title: '奖池信息',
                    content: `奖池id：${this.activityList[index].reservation1}<br/>名称：${this.activityList[index].poolName}<br/>规则：${this.activityList[index].poolDescribe}`
                });
            },
//            remove(index) {
//                this.$Modal.confirm({
//                    title: '确认删除此条信息？',
//                    content: '删除后，信息将无法恢复！',
//                    onOk: () => {
//                        const activityId = this.activityList[index].reservation1;
//                        this.activityList.splice(index, 1);
//                        this.$Message.success(`奖池${activityId} 删除成功!`);
//                    }
//                });
//            },
            editActivityItem(index) {
                if(index != null && typeof index === 'number') {
                    console.log(typeof index !== 'number');
                    this.$router.push({path: '/activityConfig/' + index});
                }else {
                    this.$router.push({path: '/activityConfig/new'});
                }
            }
        },
        created: function () {
            this.$http.get('http://rapapi.org/mockjsdata/18747/lotterypool/poollist', {}).then( res => {
                this.activityList = res.data.pollList;
            }, err => {
                console.log(err);
            });
        }
    }
</script>
