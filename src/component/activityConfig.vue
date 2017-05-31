<style>
    .activity-config-wrapper{
    }
    .activity-config-page-title{
        height: 70px;
        padding: 15px;
        background: #f7f7f7;
    }
    .activity-config-page-title i{
        vertical-align: middle;
        margin: 0 10px;
    }
    .activity-config-page-title h3{
        color: #1D2939;
        font-size: 28px;
        vertical-align: middle;
        display: inline-block;
    }
    .activity-config-page-title .activity-config-breadcrumb{
        height: 40px;
        line-height: 40px;
    }
    .activity-config-content{
        margin: 20px;
    }
    .activity-config-title{
        background:#fff;
        position: relative;
        margin-bottom: 16px;
    }
    .activity-config-title h3{
        height: 32px;
        line-height: 32px;
    }
    .activity-config-title button{
        position: absolute;
        right: 20px;
    }
</style>
<template>
    <div class="activity-config-wrapper">
        <div class="activity-config-page-title">
            <Row>
                <Col span="18">
                <Icon type="briefcase" size="40"></Icon>
                <h3>活动配置</h3>
                </Col>
                <Col span="6" class="activity-config-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb-item href="/">主页</Breadcrumb-item>
                    <Breadcrumb-item href="/activityManager">活动管理</Breadcrumb-item>
                    <Breadcrumb-item>活动配置</Breadcrumb-item>
                </Breadcrumb>
                </Col>
            </Row>

        </div>
        <Card dis-hover class="activity-config-content">
            <Row>
                <Form :model="activityItem" :label-width="100">
                    <Form-item label="活动ID">
                        <Input v-model="activityItem.activityCode" disabled></Input>
                    </Form-item>
                    <Form-item label="活动名称" required>
                        <Input v-model="activityItem.activityName"></Input>
                    </Form-item>
                    <Form-item label="认证老板" required>
                        <Select v-model="activityItem.vbossPool">
                            <Option value="1"></Option>
                        </Select>
                    </Form-item>
                    <Form-item label="未认证老板" required>
                        <Select v-model="activityItem.nvBossPool">
                            <Option value="1"></Option>
                        </Select>
                    </Form-item>
                    <Form-item label="活动规则">
                        <Input v-model="activityItem.activityRule" type="textarea" :autosize="{minRows: 5, maxRows: 5}" placeholder="请输入"></Input>
                    </Form-item>
                    <Form-item label="是否启用" required>
                        <Radio-group v-model="activityItem.activitySts">
                            <Radio label="0">否</Radio>
                            <Radio label="1">是</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="saveactivityConfig">保存</Button>
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
                activityItem: {
                    activityCode: '我试试点击福利卡萨丁',
                    activityName: '认证老板',
                    vbossPool: '1sdf',
                    nvBossPool: 'dsfsdfs',
                    activityRule: 'sslkjewrlekjwlr;kwejlrkj;flksdjfl;kdsajfl;ksjfls;',
                    activitySts: '1'
                }
            }
        },
        methods: {
            getactivityList(pageNumber) { //获取卡券列表资源
                this.$http.get('http://rapapi.org/mockjsdata/18747/lotterypool/poollist', {}).then( res => {
                    this.activityList = res.data.activityList;
                }, err => {
                    console.log(err);
                });
            },
            saveactivityConfig() { //保存卡券配置
                this.$router.push({path: '/activityManager'});
            }
        },
        created: function () {
            this.getactivityList(1);
        }
    }
</script>
