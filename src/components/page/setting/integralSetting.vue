<template>
    <div class="integral-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="container">
            <div class="info-title">设置积分有效期</div>
            <el-form :model="formData" label-width="100px">
                <el-form-item label="积分说明：">
                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" v-model="formData.explain"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="float: right">保存说明</el-button>
                </el-form-item>
            </el-form>
            <div class="info-title">设置积分规则</div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="condition" label="获得条件" align="center"> </el-table-column>
                <el-table-column label="支付方式" align="center">
                    <template slot-scope="scope">
                        <div class="pay-type" v-if="!['booking'].includes(scope.row.key)">
                            <p>余额支付</p>
                            <p>其他方式支付</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="获取积分" align="center" min-width="200px">
                    <template slot-scope="scope">
                        <div class="integral-input">
                            <el-input v-model="tableFormData[scope.row.key].count[0]"></el-input>
                            <span class="integral-input-span">积分/次</span>
                        </div>
                        <div class="integral-input" v-if="!['booking'].includes(scope.row.key)">
                            <el-input v-model="tableFormData[scope.row.key].count[1]"></el-input>
                            <span class="integral-input-span">积分/次</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单日上限" align="center" min-width="200px">
                    <template slot-scope="scope">
                        <div class="limit-item">
                            <el-radio-group v-model="tableFormData[scope.row.key].unlimit[0]">
                                <el-radio :label="true">无上限</el-radio>
                                <el-radio :label="false">
                                    <div class="limit-input">
                                        <el-input
                                            :disabled="tableFormData[scope.row.key].unlimit[0]"
                                            v-model="tableFormData[scope.row.key].limit[0]"
                                        ></el-input>
                                        <span class="limit-input-span">积分/天</span>
                                    </div>
                                </el-radio>
                            </el-radio-group>
                        </div>
                        <div class="limit-item" v-if="!['booking'].includes(scope.row.key)">
                            <el-radio-group v-model="tableFormData[scope.row.key].unlimit[1]">
                                <el-radio :label="true">无上限</el-radio>
                                <el-radio :label="false">
                                    <div class="limit-input">
                                        <el-input
                                            :disabled="tableFormData[scope.row.key].unlimit[1]"
                                            v-model="tableFormData[scope.row.key].limit[1]"
                                        ></el-input>
                                        <span class="limit-input-span">积分/天</span>
                                    </div>
                                </el-radio>
                            </el-radio-group>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer-btn">
                <el-button type="primary" @click="handleSaveRules">保存规则</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    export default {
        name: 'IntegralSetting',
        components: {
            breadcrumb
        },
        data() {
            return {
                breadcrumbList: [
                    {
                        name: '首页',
                        router: 'dashboard'
                    },
                    {
                        name: '设置',
                        router: 'Setting'
                    },
                    {
                        name: '客户设置',
                        router: 'CustomerSetting'
                    },
                    {
                        name: '积分设置',
                        router: 'IntegralSetting'
                    }
                ],
                formData: {
                    explain: ''
                },
                tableFormData: {
                    booking: {
                        count: [],
                        limit: [],
                        unlimit: [true]
                    },
                    service: {
                        count: [],
                        limit: [],
                        unlimit: [true, true]
                    },
                    goods: {
                        count: [],
                        limit: [],
                        unlimit: [true, true]
                    },
                    time_card: {
                        count: [],
                        limit: [],
                        unlimit: [false, true]
                    },
                    recharge_card: {
                        count: [],
                        limit: [],
                        unlimit: [true, false]
                    },
                    discount_card: {
                        count: [],
                        limit: [],
                        unlimit: [true, true]
                    }
                },
                tableData: [
                    { condition: '完成预约', key: 'booking', value: 1 },
                    { condition: '购买服务', key: 'service', value: 2 },
                    { condition: '购买商品', key: 'goods', value: 3 },
                    { condition: '购买次卡', key: 'time_card', value: 4 },
                    { condition: '购买充值卡', key: 'recharge_card', value: 5 },
                    { condition: '购买折扣卡', key: 'discount_card', value: 6 }
                ]
            };
        },
        methods: {
            handleSaveRules() {
                console.log('this.tableFormData: ', this.tableFormData);
            }
        }
    };
</script>
<style lang="css" scoped>
    .container {
        background-color: #ffffff;
        padding: 20px;
        border: none;
    }
    .info-title {
        margin-bottom: 20px;
    }
    .integral-input {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .limit-input {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .integral-input:first-child,
    .limit-input:first-child {
        padding-bottom: 5px;
    }
    .integral-input >>> .el-input,
    .limit-input >>> .el-input {
        width: 80px;
    }
    .integral-input-span,
    .limit-input-span {
        width: 60px;
    }
    .footer-btn {
        display: flex;
        justify-content: center;
        padding: 15px;
    }
</style>