<style>
    .card-manager-wrapper{
    }
    .card-manager-page-title{
        height: 70px;
        padding: 15px;
        background: #f7f7f7;
    }
    .card-manager-page-title i{
        vertical-align: middle;
        margin: 0 10px;
    }
    .card-manager-page-title h3{
        color: #1D2939;
        font-size: 28px;
        vertical-align: middle;
        display: inline-block;
    }
    .card-manager-page-title .card-manager-button-add{
        height: 40px;
        line-height: 40px;
    }
    .card-manager-content{
        margin: 20px;
    }
    .card-manager-title{
        background:#fff;
        position: relative;
        margin-bottom: 16px;
    }
    .card-manager-title h3{
        height: 32px;
        line-height: 32px;
    }
    .card-manager-title button{
        position: absolute;
        right: 20px;
    }
</style>
<template>
    <div class="card-manager-wrapper">
        <div class="card-manager-page-title">
            <Row>
                <Col span="20">
                <Icon type="android-bookmark" size="40"></Icon>
                <h3>卡券管理</h3>
                </Col>
                <Col span="4" class="card-manager-button-add">
                    <Button type="primary" @click="exportData(1)">导出数据</Button>
                    <Button type="primary" @click="editCardItem">新增卡券</Button>
                </Col>
            </Row>

        </div>
        <Card dis-hover class="card-manager-content">
            <Row>
                <Table :columns="cardTable" :data="cardList" @on-selection-change="selection" size="large"></Table>
            </Row>
        </Card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                cardTable: [ //表头内容
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '卡券ID',
                        key: 'reservation1'
                    },
                    {
                        title: '卡券名称',
                        key: 'poolName'
                    },
                    {
                        title: '卡券类型',
                        key: 'poolDescribe'
                    },
                    {
                        title: '总库存',
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
                        width: 200,
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
                                            this.editCardItem(params.index);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    }
                                }, '批量添加'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index);
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                cardList: [
                    {reservation1: 'klfsdjlkj1313', poolName: '老师的看法聚少离多', poolDescribe: 0, createDate: 'sdf', poolStatus: 1}
                ],
                selectList: []
            }
        },
        methods: {
            getCardList() { //获取卡券列表信息
                this.$http.get('http://rapapi.org/mockjsdata/18747/lotterypool/poollist', {}).then( res => {
                    this.cardList = res.data.pollList;
                }, err => {
                    console.log(err);
                });
            },
            editCardItem(index) { //编辑卡券
                if(index != null && typeof index === 'number') {
                    console.log(typeof index !== 'number');
                    this.$router.push({path: '/cardConfig/' + index});
                }else {
                    this.$router.push({path: '/cardConfig/new'});
                }
            },
            selection(list) { //已选择卡券列表
                this.selectList = list;
                console.log(this.selectList);
            },
            show(index) { //显示卡券信息
                this.$Modal.info({
                    title: '奖池信息',
                    content: `奖池id：${this.cardList[index].reservation1}<br/>名称：${this.cardList[index].poolName}<br/>规则：${this.cardList[index].poolDescribe}`
                });
            },
            remove(index) { //删除卡券
                this.$Modal.confirm({
                    title: '确认删除此条信息？',
                    content: '删除后，信息将无法恢复！',
                    onOk: () => {
                        const cardId = this.cardList[index].reservation1;
                        this.cardList.splice(index, 1);
                        this.$Message.success(`奖池${cardId} 删除成功!`);
                    }
                });
            },
            removeList(list) { //批量删除

            },
            exportData(type) {

                if(type === 1) {
//                    this.$refs.table.exportCsv({
//                        filename: '原始数据'
//                    });

                }
            }
        },
        created: function () {
            this.getCardList();
        }
    }
</script>
