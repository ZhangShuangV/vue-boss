<style>
    .card-config-wrapper{
    }
    .card-config-page-title{
        height: 70px;
        padding: 15px;
        background: #f7f7f7;
    }
    .card-config-page-title i{
        vertical-align: middle;
        margin: 0 10px;
    }
    .card-config-page-title h3{
        color: #1D2939;
        font-size: 28px;
        vertical-align: middle;
        display: inline-block;
    }
    .card-config-page-title .card-config-breadcrumb{
        height: 40px;
        line-height: 40px;
    }
    .card-config-content{
        margin: 20px;
    }
    .card-config-title{
        background:#fff;
        position: relative;
        margin-bottom: 16px;
    }
    .card-config-title h3{
        height: 32px;
        line-height: 32px;
    }
    .card-config-title button{
        position: absolute;
        right: 20px;
    }
</style>
<template>
    <div class="card-config-wrapper">
        <div class="card-config-page-title">
            <Row>
                <Col span="18">
                <Icon type="briefcase" size="40"></Icon>
                <h3>卡券配置</h3>
                </Col>
                <Col span="6" class="card-config-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb-item href="/">主页</Breadcrumb-item>
                    <Breadcrumb-item href="/cardManager">卡券管理</Breadcrumb-item>
                    <Breadcrumb-item>卡券配置</Breadcrumb-item>
                </Breadcrumb>
                </Col>
            </Row>

        </div>
        <Card dis-hover class="card-config-content">
            <Row>
                <Form :model="cardItem" :label-width="100">
                    <Form-item label="卡券名称" required>
                        <Input v-model="cardItem.cardName"></Input>
                    </Form-item>
                    <Form-item label="卡券标题" required>
                        <Input v-model="cardItem.cardTitle"></Input>
                    </Form-item>
                    <Form-item label="卡券副标题" required>
                        <Input v-model="cardItem.cardSubtitle"></Input>
                    </Form-item>
                    <Form-item label="卡券类型" required>
                        <Select v-model="cardItem.cardType">
                            <Option value="1"></Option>
                        </Select>
                    </Form-item>
                    <Form-item label="选择奖池" required>
                        <Select v-model="cardItem.poolId">
                            <Option value="1"></Option>
                        </Select>
                    </Form-item>
                    <Form-item label="领取类型" required>
                        <Select v-model="cardItem.grantType">
                            <Option value="0">券</Option>
                            <Option value="1">链接</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="领取链接" v-if="cardItem.grantType == 1">
                        <Input v-model="cardItem.grantLink"></Input>
                    </Form-item>
                    <Form-item label="卡券图片">
                        <Upload action="//jsonplaceholder.typicode.com/posts/" accept="image/*" :on-success="showImg">
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                    </Form-item>
                    <Form-item label="卡券说明">
                        <Input v-model="cardItem.poolDescribe" type="textarea" :autosize="{minRows: 5, maxRows: 5}" placeholder="请输入"></Input>
                    </Form-item>
                    <Form-item label="是否启用" required>
                        <Radio-group v-model="cardItem.poolStatus">
                            <Radio label="0">否</Radio>
                            <Radio label="1">是</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="savecardConfig">保存</Button>
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
                cardItem: {
                    cardName: '认证老板',
                    cardTitle: '1sdf',
                    cardSubtitle: 'dsfsdfs',
                    cardType: 's',
                    poolId: 'sdfsfsdfs-sdfs-fdsfs',
                    grantType: 'sdfsf',
                    poolDescribe: '这个是认证老板的卡券',
                    poolStatus: '1'
                }
            }
        },
        methods: {
            getcardList(pageNumber) { //获取卡券列表资源
                this.$http.get('http://rapapi.org/mockjsdata/18747/lotterypool/poollist', {}).then( res => {
                    this.cardList = res.data.cardList;
                }, err => {
                    console.log(err);
                });
            },
            savecardConfig() { //保存卡券配置
                this.$router.push({path: '/cardManager'});
            },
            showImg(res) {
                console.log(res);
            }
        },
        created: function () {
            this.getcardList(1);
        }
    }
</script>
