<template>
    <div>
        <el-dialog
            class="member_setting_detail"
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="680px"
        >
            <el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="等级名称：" prop="title">
                    <el-input v-model="formData.title" placeholder="请填写等级名称"></el-input>
                </el-form-item>
                <el-form-item label="等级权重：" prop="weight">
                    <el-input v-model="formData.weight" placeholder="请填写等级权重"></el-input>
                </el-form-item>
                <el-form-item label="卡面主题色：" prop="color">
                    <div class="color-panel">
                        <el-color-picker v-model="colorLeft"></el-color-picker>
                        <i class="el-icon-right"></i>
                        <el-color-picker v-model="colorRight"></el-color-picker>
                    </div>
                    <div class="member_card_item">
                        <p class="tips">样式预览</p>
                        <div class="member_card" :style="cardStyle">
                            <p class="card_name">
                                <i class="el-icon-user-solid"></i><span>{{ formData.title }}</span>
                            </p>
                        </div>
                        <span class="mini_member_card" :style="cardStyle">{{ formData.title }}</span>
                    </div>
                </el-form-item>
                <el-form-item label="条件：" prop="condition">
                    <el-radio-group v-model="formData.condition">
                        <el-radio class="condition-radio" :label="3">
                            <div class="check-box-item">
                                单次消费满<el-input v-model="formData.service" :disabled="formData.condition !== 3"></el-input>元
                            </div>
                        </el-radio>
                        <el-radio class="condition-radio" :label="6">
                            <div class="check-box-item">
                                累计消费满<el-input v-model="formData.service" :disabled="formData.condition !== 6"></el-input>元
                            </div>
                        </el-radio>
                        <el-radio class="condition-radio" :label="9">
                            <div class="check-box-item">
                                消费指定卡项
                                <el-button :disabled="formData.condition !== 9" @click="dialogVisibleAdd = true">选择卡项</el-button>
                            </div>
                        </el-radio>
                    </el-radio-group>
                    <el-table :data="tableData" style="width: 100%" v-if="formData.condition === 9">
                        <el-table-column prop="shop_name" label="卡项名称" align="center">
                            <template slot-scope="scope">
                                <div class="table-name">
                                    <el-image style="width: 30px; height: 30px" src="" fit="cover"></el-image>
                                    <div class="info">
                                        <p>母婴卡</p>
                                        <p>￥1118</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="service_name" label="卡项类别" align="center"> </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="handleRemove(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="折扣权益：">
                    <el-checkbox-group v-model="checkList1">
                        <el-checkbox label="1">
                            <div class="check-box-item">
                                所有服务享<el-input v-model="formData.service" :disabled="!checkList1.includes('1')"></el-input>折
                            </div>
                        </el-checkbox>
                        <el-checkbox label="2">
                            <div class="check-box-item">
                                所有卡项享<el-input v-model="formData.card" :disabled="!checkList1.includes('2')"></el-input>折
                            </div>
                        </el-checkbox>
                        <el-checkbox label="3">
                            <div class="check-box-item">
                                所有商品享<el-input v-model="formData.goods" :disabled="!checkList1.includes('3')"></el-input>折
                            </div>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="配送权益：">
                    <el-checkbox-group v-model="checkList2">
                        <el-checkbox label="1">
                            <div class="check-box-item">
                                普通快递<el-input v-model="formData.service" :disabled="!checkList2.includes('1')"></el-input>元
                            </div>
                        </el-checkbox>
                        <el-checkbox label="2">
                            <div class="check-box-item">
                                同城速配<el-input v-model="formData.card" :disabled="!checkList2.includes('2')"></el-input>元
                            </div>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
            </span>
        </el-dialog>
        <el-dialog
            class="member_setting_detail_add"
            title="添加卡项"
            :visible.sync="dialogVisibleAdd"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="530px"
        >
            <el-select v-model="addSelectValue" :style="'margin-bottom: 10px'">
                <el-option v-for="item in addSelectOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <el-table :data="addTableData" @selection-change="handleSelectionChange" style="width: 100%">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="shop_name" label="卡项名称" align="center">
                    <template slot-scope="scope">
                        <div class="table-name">
                            <el-image style="width: 30px; height: 30px" src="" fit="cover"></el-image>
                            <div class="info">
                                <p>母婴卡</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="service_name" label="价格" align="center"> </el-table-column>
                <el-table-column prop="service_name" label="创建时间" align="center"> </el-table-column>
            </el-table>
            <span slot="footer">
                <el-button @click="dialogVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleAdd = false">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'MemberSettingDetail',
        data() {
            return {
                dialogTitle: '',
                dialogVisible: false,
                // 类型 add：新增，edit：编辑
                dialogType: 'add',
                paramsId: '',
                colorLeft: '#A69BB3',
                colorRight: '#807093',
                checkList1: [],
                checkList2: [],
                formData: {
                    title: '会员名称',
                    color: '#A69BB3,#807093',
                    condition: 3
                },
                formRules: {
                    title: [{ required: true, message: '请填写等级名称', trigger: 'blur' }]
                },
                tableData: [],
                dialogVisibleAdd: false,
                addSelectValue: 1,
                addSelectOptions: [{ value: 1, label: '所有分类' }],
                addTableData: []
            };
        },
        computed: {
            cardStyle() {
                const style = `background-image: linear-gradient(to right, ${this.colorLeft}, ${this.colorRight});`;
                return style;
            }
        },
        methods: {
            handleRemove(id) {},
            handleSelectionChange() {}
        }
    };
</script>
<style lang="css" scoped>
    .color-panel {
        display: flex;
        align-items: center;
    }
    .el-icon-right {
        font-size: 15px;
        font-weight: bold;
        padding: 0 8px;
    }
    .member_card {
        width: 370px;
        height: 150px;
        border: 1px solid #dcdfe6;
        border-radius: 10px;
        padding: 8px 12px;
    }
    .card_name {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
    }
    .card_name i {
        padding-right: 10px;
    }
    .mini_member_card {
        color: #ffffff;
        padding: 3px 8px;
        border-radius: 5px;
    }
    .condition-radio {
        padding: 2.5px 0;
    }
    .check-box-item {
        display: inline;
    }
    .check-box-item .el-input {
        width: 80px;
        margin: 0 5px;
    }
</style>