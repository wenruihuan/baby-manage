<template>
    <div class="integral-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="container" v-loading="loading">
            <div class="info-title">设置积分说明</div>
            <el-form :model="formData" label-width="100px">
                <el-form-item label="积分说明：">
                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" v-model="formData.message"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="float: right" @click="handleSaveMessage">保存说明</el-button>
                </el-form-item>
            </el-form>
            <div class="info-title">设置积分规则</div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="condition" label="获得条件" align="center"> </el-table-column>
                <el-table-column label="支付方式" align="center">
                    <template slot-scope="scope">
                        <div class="pay-type" v-if="!['booking'].includes(scope.row.key)">
                            <p class="pay-type-p">余额支付</p>
                            <p class="pay-type-p">其他方式支付</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="获取积分" align="center" min-width="200px">
                    <template slot-scope="scope">
                        <div class="integral-input" v-if="['booking'].includes(scope.row.key)">
                            <el-input v-model="tableFormData[scope.row.key].count"></el-input>
                            <span class="integral-input-span">积分/次</span>
                        </div>
                        <div class="integral-input" v-if="!['booking'].includes(scope.row.key)">
                            <el-input v-model="tableFormData[scope.row.key].balance.count"></el-input>
                            <span class="integral-input-span">积分/次</span>
                        </div>
                        <div class="integral-input" v-if="!['booking'].includes(scope.row.key)">
                            <el-input v-model="tableFormData[scope.row.key].other.count"></el-input>
                            <span class="integral-input-span">积分/次</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单日上限" align="center" min-width="200px">
                    <template slot-scope="scope">
                        <div class="limit-item" v-if="['booking'].includes(scope.row.key)">
                            <el-radio-group v-model="scope.row.isLimit[0]">
                                <el-radio :label="false">无上限</el-radio>
                                <el-radio :label="true">
                                    <div class="limit-input">
                                        <el-input-number
                                            :disabled="!scope.row.isLimit[0]"
                                            v-model="tableFormData[scope.row.key].limit"
                                            :min="0"
                                            :controls="false"
                                        ></el-input-number>
                                        <span class="limit-input-span">积分/天</span>
                                    </div>
                                </el-radio>
                            </el-radio-group>
                        </div>
                        <div class="limit-item" v-if="!['booking'].includes(scope.row.key)">
                            <el-radio-group v-model="scope.row.isLimit[0]">
                                <el-radio :label="false">无上限</el-radio>
                                <el-radio :label="true">
                                    <div class="limit-input">
                                        <el-input-number
                                            :disabled="!scope.row.isLimit[0]"
                                            v-model="tableFormData[scope.row.key].balance.limit"
                                            :min="0"
                                            :controls="false"
                                        ></el-input-number>
                                        <span class="limit-input-span">积分/天</span>
                                    </div>
                                </el-radio>
                            </el-radio-group>
                        </div>
                        <div class="limit-item" v-if="!['booking'].includes(scope.row.key)">
                            <el-radio-group v-model="scope.row.isLimit[1]">
                                <el-radio :label="false">无上限</el-radio>
                                <el-radio :label="true">
                                    <div class="limit-input">
                                        <el-input-number
                                            :disabled="!scope.row.isLimit[1]"
                                            v-model="tableFormData[scope.row.key].other.limit"
                                            :min="0"
                                            :controls="false"
                                        ></el-input-number>
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
    import { getPoint, savePointMessage, savePointRules } from '@/api/setting';
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
                    message: ''
                },
                tableFormData: {
                    booking: {
                        count: '',
                        limit: ''
                    },
                    service: {
                        balance: {
                            count: '',
                            limit: ''
                        },
                        other: {
                            count: '',
                            limit: ''
                        }
                    },
                    goods: {
                        balance: {
                            count: '',
                            limit: ''
                        },
                        other: {
                            count: '',
                            limit: ''
                        }
                    },
                    time_card: {
                        balance: {
                            count: '',
                            limit: ''
                        },
                        other: {
                            count: '',
                            limit: ''
                        }
                    },
                    recharge_card: {
                        balance: {
                            count: '',
                            limit: ''
                        },
                        other: {
                            count: '',
                            limit: ''
                        }
                    },
                    discount_card: {
                        balance: {
                            count: '',
                            limit: ''
                        },
                        other: {
                            count: '',
                            limit: ''
                        }
                    }
                },
                tableData: [
                    { condition: '完成预约', key: 'booking', value: 1, isLimit: [false] },
                    { condition: '购买服务', key: 'service', value: 2, isLimit: [false, false] },
                    { condition: '购买商品', key: 'goods', value: 3, isLimit: [false, false] },
                    { condition: '购买次卡', key: 'time_card', value: 4, isLimit: [false, false] },
                    { condition: '购买充值卡', key: 'recharge_card', value: 5, isLimit: [false, false] },
                    { condition: '购买折扣卡', key: 'discount_card', value: 6, isLimit: [false, false] }
                ],
                loading: false
            };
        },
        created() {
            this.getPointSetting();
        },
        methods: {
            async getPointSetting() {
                this.loading = true;
                const res = await getPoint();
                this.loading = false;
                if (res.code === 200) {
                    this.formData.message = res.data.message;
                    this.tableFormData = res.data.rule;
                    this.tableData.forEach((m) => {
                        if (m.key === 'booking') {
                            m.isLimit[0] = this.tableFormData[m.key].limit !== '-1';
                        } else {
                            m.isLimit[0] = this.tableFormData[m.key].balance.limit !== '-1';
                            m.isLimit[1] = this.tableFormData[m.key].other.limit !== '-1';
                        }
                    });
                }
            },
            async handleSaveMessage() {
                this.loading = true;
                const res = await savePointMessage({ message: this.formData.message });
                if (res.code === 200) {
                    this.$message.success(res.msg);
                    this.getPointSetting();
                }
            },
            async handleSaveRules() {
                this.loading = true;
                const tableFormData = JSON.parse(JSON.stringify(this.tableFormData));
                this.tableData.forEach((m) => {
                    if (m.key === 'booking') {
                        if (m.isLimit[0]) {
                            tableFormData[m.key].limit = String(tableFormData[m.key].limit);
                        } else {
                            tableFormData[m.key].limit = '-1';
                        }
                    } else {
                        if (m.isLimit[0]) {
                            tableFormData[m.key].balance.limit = String(tableFormData[m.key].balance.limit);
                        } else {
                            tableFormData[m.key].balance.limit = '-1';
                        }
                        if (m.isLimit[1]) {
                            tableFormData[m.key].other.limit = String(tableFormData[m.key].other.limit);
                        } else {
                            tableFormData[m.key].other.limit = '-1';
                        }
                    }
                });
                const res = await savePointRules({ ...tableFormData });
                if (res.code === 200) {
                    this.$message.success(res.msg);
                    this.getPointSetting();
                }
            }
        }
    };
</script>
<style lang="css" scoped>
    .header-bar,
    .container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        border: 0;
    }
    .el-form-item >>> .el-form-item__label,
    .el-textarea >>> .el-textarea__inner,
    .el-table >>> .cell,
    .el-table >>> .limit-input-span {
        color: #333333;
    }
    .el-table >>> .pay-type-p {
        line-height: 42px;
        height: 42px;
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
    .limit-input >>> .el-input-number {
        width: 80px;
    }
    .limit-input >>> .el-input {
        width: 100%;
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
