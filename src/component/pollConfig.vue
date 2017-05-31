<style>
    .poll-config-wrapper{
    }
    .poll-config-page-title{
        height: 70px;
        padding: 15px;
        background: #f7f7f7;
    }
    .poll-config-page-title i{
        vertical-align: middle;
        margin: 0 10px;
    }
    .poll-config-page-title h3{
        color: #1D2939;
        font-size: 28px;
        vertical-align: middle;
        display: inline-block;
    }
    .poll-config-page-title .poll-config-breadcrumb{
        height: 40px;
        line-height: 40px;
    }
    .poll-config-content{
        margin: 20px;
    }
    .poll-config-title{
        background:#fff;
        position: relative;
        margin-bottom: 16px;
    }
    .poll-config-title h3{
        height: 32px;
        line-height: 32px;
    }
    .poll-config-title button{
        position: absolute;
        right: 20px;
    }
</style>
<template>
    <div class="poll-config-wrapper">
        <div class="poll-config-page-title">
            <Row>
                <Col span="18">
                    <Icon type="briefcase" size="40"></Icon>
                    <h3>奖池配置</h3>
                </Col>
                <Col span="6" class="poll-config-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="/">主页</Breadcrumb-item>
                        <Breadcrumb-item href="/pollManager">奖池管理</Breadcrumb-item>
                        <Breadcrumb-item>奖池配置</Breadcrumb-item>
                    </Breadcrumb>
                </Col>
            </Row>

        </div>
        <Card dis-hover class="poll-config-content">
            <Row>
                <Form :model="pollItem" :label-width="100">
                    <Form-item label="奖池id">
                        <Input v-model="pollItem.reservation1" disabled></Input>
                    </Form-item>
                    <Form-item label="奖池名称" required>
                        <Input v-model="pollItem.poolName"></Input>
                    </Form-item>
                    <Form-item label="奖池描述">
                        <Input v-model="pollItem.poolDescribe" type="textarea" :autosize="{minRows: 5, maxRows: 5}" placeholder="请输入"></Input>
                    </Form-item>
                    <Form-item label="是否启用" required>
                        <Radio-group v-model="pollItem.poolStatus">
                            <Radio label="0">否</Radio>
                            <Radio label="1">是</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="savePollConfig">保存</Button>
                    </Form-item>
                </Form>
            </Row>
        </Card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pollItem: {
                    reservation1: 1231231,
                    poolName: '认证老板',
                    poolDescribe: '这个是认证老板的奖池',
                    poolStatus: '1'
                }
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
            savePollConfig() { //保存奖池配置
                this.$router.push({path: '/pollManager'});
            }
        },
        created: function () {
            this.getPollList(1);
        }
    }
</script>
