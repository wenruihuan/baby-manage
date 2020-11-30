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
                <el-form-item label="等级名称：" prop="name">
                    <el-input v-model="formData.name" placeholder="请填写等级名称"></el-input>
                </el-form-item>
                <el-form-item label="等级权重：" prop="weight">
                    <el-input v-model="formData.weight" :disabled="is_initial" placeholder="请填写等级权重"></el-input>
                </el-form-item>
                <el-form-item label="卡面主题色：" prop="color">
                    <div class="color-panel">
                        <el-color-picker v-model="colorLeft"></el-color-picker>
                        <i class="el-icon-right"></i>
                        <el-color-picker v-model="colorRight"></el-color-picker>
                    </div>
                    <div class="member_card_item">
                        <p class="tips">样式预览</p>
                        <div class="member_card" :style="(colorLeft || colorRight) && cardStyle">
                            <p class="card_name">
                                <i class="el-icon-user-solid"></i><span>{{ formData.name }}</span>
                            </p>
                        </div>
                        <span class="mini_member_card" :style="(colorLeft || colorRight) && cardStyle">{{ formData.name || '请填写等级名称' }}</span>
                    </div>
                </el-form-item>
                <el-form-item label="条件：" required>
                    <el-radio-group v-model="conditionType">
                        <el-radio class="condition-radio" label="1">
                            <div class="check-box-item">
                                单次消费满<el-input v-model="conditionValue1" :disabled="conditionType !== '1'"></el-input>元
                            </div>
                        </el-radio>
                        <el-radio class="condition-radio" label="2">
                            <div class="check-box-item">
                                累计消费满<el-input v-model="conditionValue2" :disabled="conditionType !== '2'"></el-input>元
                            </div>
                        </el-radio>
                        <el-radio class="condition-radio" label="3">
                            <div class="check-box-item">
                                消费指定卡项
                                <el-button :disabled="conditionType !== '3'" @click="handleAddCard">选择卡项</el-button>
                            </div>
                        </el-radio>
                    </el-radio-group>
                    <el-table :data="conditionTableData" style="width: 100%" v-if="conditionType === '3'">
                        <el-table-column label="卡项名称" align="center">
                            <template slot-scope="scope">
                                <div class="table-name">
                                    <el-image style="width: 30px; height: 30px" :src="scope.row.img" fit="cover"></el-image>
                                    <div class="info">
                                        <p>{{ scope.row.card_name }}</p>
                                        <p>{{ scope.row.price }}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="卡项类别" align="center">
                            <template slot-scope="scope">
                                <span>{{ cardMap[scope.row.type] }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="handleRemove(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="折扣权益：">
                    <el-checkbox-group v-model="checkList1">
                        <el-checkbox label="1">
                            <div class="check-box-item">
                                所有服务享<el-input
                                    type="number"
                                    v-model="formData.discount_right.service"
                                    :disabled="!checkList1.includes('1')"
                                ></el-input
                                >折
                            </div>
                        </el-checkbox>
                        <el-checkbox label="2">
                            <div class="check-box-item">
                                所有卡项享<el-input
                                    type="number"
                                    v-model="formData.discount_right.card"
                                    :disabled="!checkList1.includes('2')"
                                ></el-input
                                >折
                            </div>
                        </el-checkbox>
                        <el-checkbox label="3">
                            <div class="check-box-item">
                                所有商品享<el-input
                                    type="number"
                                    v-model="formData.discount_right.goods"
                                    :disabled="!checkList1.includes('3')"
                                ></el-input
                                >折
                            </div>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="配送权益：">
                    <el-checkbox-group v-model="checkList2">
                        <div class="checkbox-div">
                            <el-checkbox label="1">
                                <div class="check-box-item">
                                    普通快递<el-input
                                        type="number"
                                        v-model="formData.express_right.default_express"
                                        :disabled="!checkList2.includes('1')"
                                    ></el-input
                                    >元
                                </div>
                            </el-checkbox>
                        </div>
                        <div class="checkbox-div" v-for="(item, index) in formData.express_right.express" :key="index">
                            <el-checkbox :label="`${index + 2}`">
                                <div class="check-box-item">
                                    {{ item.name
                                    }}<el-input
                                        type="number"
                                        v-model="item.price"
                                        :disabled="!checkList2.includes(`${index + 2}`)"
                                    ></el-input
                                    >元
                                </div>
                            </el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSaveForm">保 存</el-button>
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
            <el-select v-model="addSelectValue" clearable @change="getCardList" :style="'margin-bottom: 10px'">
                <el-option v-for="item in addSelectOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <el-table :data="addTableData" @selection-change="handleSelectionChange" style="width: 100%">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column label="卡项名称" align="center">
                    <template slot-scope="scope">
                        <div class="table-name">
                            <el-image style="width: 30px; height: 30px" :src="scope.row.img" fit="cover"></el-image>
                            <div class="info">
                                <p>{{ scope.row.name }}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格" align="center"> </el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center">
                    <template slot-scope="scope">
                        <div class="date_item" v-if="scope.row.create_time">
                            <p>{{ $formatDate(scope.row.create_time, 'Y-M-D') }}</p>
                            <p>{{ $formatDate(scope.row.create_time, 'h:m:s') }}</p>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer">
                <el-button @click="dialogVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="handleSaveAdd">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { getMemberDetail, saveMemberLevel, getCardList, getExpress } from '@/api/setting';
    import { formatDate } from '@/utils/utils';
    export default {
        name: 'MemberSettingDetail',
        data() {
            return {
                dialogTitle: '',
                dialogVisible: false,
                // 类型 add：新增，edit：编辑
                dialogType: 'add',
                paramsId: '',
                // 初始等级,仅编辑
                is_initial: false,
                colorLeft: '',
                colorRight: '',
                conditionType: '',
                conditionValue1: '',
                conditionValue2: '',
                conditionTableData: [],
                checkList1: [],
                checkList2: [],
                expressList: [],
                formData: {
                    discount_right: {
                        service: '',
                        card: '',
                        goods: ''
                    },
                    express_right: {
                        default_express: '',
                        express: []
                    }
                },
                formRules: {
                    name: [{ required: true, message: '请填写等级名称', trigger: 'blur' }],
                    weight: [{ required: true, message: '请填写等级权重', trigger: 'blur' }]
                },
                cardMap: {
                    time_card: '次卡',
                    discount_card: '折扣卡',
                    recharge_card: '充值卡'
                },
                dialogVisibleAdd: false,
                addSelectValue: '',
                addSelectOptions: [
                    { value: 'time_card', label: '次卡' },
                    { value: 'discount_card', label: '折扣卡' },
                    { value: 'recharge_card', label: '充值卡' }
                ],
                addTableData: [],
                selectRow: [],
                formatDate: formatDate
            };
        },
        computed: {
            cardStyle() {
                return `background-image: linear-gradient(to right, ${this.colorLeft}, ${this.colorRight});`;
            }
        },
        watch: {
            dialogVisible(newVal) {
                if (!newVal) {
                    this.init();
                }
                if (newVal && this.dialogType === 'add') {
                    this.getExpressList();
                }
            }
        },
        methods: {
            init() {
                this.colorLeft = '';
                this.colorRight = '';
                this.conditionType = '1';
                this.conditionValue1 = '';
                this.conditionValue2 = '';
                this.conditionTableData = [];
                this.checkList1 = [];
                this.checkList2 = [];
                this.formData = {
                    discount_right: {
                        service: '',
                        card: '',
                        goods: ''
                    },
                    express_right: {
                        default_express: '',
                        express: []
                    }
                };
            },
            async getMemberDetail() {
                let params = {};
                if (this.is_initial) {
                    params.is_initial = '1';
                } else {
                    params.is_initial = '0';
                    params.level_id = this.paramsId;
                }
                const res = await getMemberDetail(params);
                if (res.code === 200) {
                    const formData = res.data;
                    // 转换颜色字段
                    // const colors = res.data.color.split(',');
                    this.colorLeft = res.data.start_color || '';
                    this.colorRight = res.data.end_color || '';
                    // 转换条件字段
                    this.conditionType = formData.condition.type;
                    if (formData.condition.type === '1') {
                        this.conditionValue1 = formData.condition.data;
                    }
                    if (formData.condition.type === '2') {
                        this.conditionValue2 = formData.condition.data;
                    }
                    if (formData.condition.type === '3') {
                        this.conditionTableData = formData.condition.data;
                    }
                    // 转换折扣权益字段
                    if (Number(formData.discount_right.service) > 0) {
                        this.checkList1.push('1');
                    }
                    if (Number(formData.discount_right.card) > 0) {
                        this.checkList1.push('2');
                    }
                    if (Number(formData.discount_right.goods) > 0) {
                        this.checkList1.push('3');
                    }
                    // 转换配送权益字段
                    if (Number(formData.express_right.default_express) > 0) {
                        this.checkList2.push('1');
                    }
                    formData.express_right.express.forEach((m, index) => {
                        if (m.available) {
                            this.checkList2.push(`${index + 2}`);
                        }
                    });
                    this.formData = formData;
                }
            },
            async getExpressList() {
                const res = await getExpress();
                if (res.code === 200) {
                    this.formData.express_right.express = res.data.express;
                }
            },
            handleSaveForm() {
                this.$refs['ruleForm'].validate(async (valid) => {
                    if (valid) {
                        const formData = JSON.parse(JSON.stringify(this.formData));
                        // 组装颜色参数
                        // const colors = [this.colorLeft || '', this.colorRight || ''];
                        formData.start_color = this.colorLeft || '';
                        formData.end_color = this.colorRight || '';
                        // 组装条件参数
                        const condition = {
                            type: this.conditionType,
                            data: ''
                        };
                        if (['1', '2'].includes(this.conditionType)) {
                            condition.data = this[`conditionValue${this.conditionType}`];
                        }
                        if (this.conditionType === '3') {
                            condition.data = this.conditionTableData;
                        }
                        formData.condition = JSON.stringify(condition);
                        // 组装折扣卡参数
                        if (!this.checkList1.includes('1')) {
                            formData.discount_right.service = '';
                        }
                        if (!this.checkList1.includes('2')) {
                            formData.discount_right.card = '';
                        }
                        if (!this.checkList1.includes('3')) {
                            formData.discount_right.goods = '';
                        }
                        // 组装配送参数
                        if (!this.checkList2.includes('1')) {
                            formData.express_right.default_express = '';
                        }
                        formData.express_right.express.forEach((m, index) => {
                            if (this.checkList2.includes(`${index + 2}`)) {
                                this.$set(m, 'available', true);
                            } else {
                                this.$set(m, 'available', false);
                            }
                        });
                        const res = await saveMemberLevel(formData);
                        if (res.code === 200) {
                            this.$message.success('保存成功');
                            this.dialogVisible = false;
                            this.$parent.getMemberLevel();
                        }
                    }
                });
            },
            async getCardList() {
                const params = {
                    keyword: '',
                    type: this.addSelectValue
                };
                const res = await getCardList(params);
                if (res.code === 200) {
                    this.addTableData = res.data || [];
                }
            },
            handleAddCard() {
                this.getCardList();
                this.dialogVisibleAdd = true;
            },
            handleSaveAdd() {
                let list = [];
                this.selectRow.forEach((m) => {
                    let obj = {
                        type: m.type,
                        card_id: m.card_id,
                        card_name: m.name,
                        img: m.img
                    };
                    list.push(obj);
                });
                this.conditionTableData = this.conditionTableData.concat(list);
                this.dialogVisibleAdd = false;
            },
            handleRemove(index) {
                this.conditionTableData.splice(index, 1);
            },
            handleSelectionChange(rows) {
                this.selectRow = rows;
            }
        }
    };
</script>
<style lang="css" scoped>
    .demo-ruleForm {
        max-height: 500px;
        overflow-y: auto;
    }
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
    .el-radio,
    .el-checkbox {
        margin-bottom: 15px;
    }
    .check-box-item {
        display: inline;
    }
    .check-box-item .el-input {
        width: 80px;
        margin: 0 5px;
    }
    .checkbox-div {
        display: inline-block;
        position: relative;
        white-space: nowrap;
        margin-right: 30px;
    }
    .checkbox-div:last-of-type {
        margin-right: 0;
    }
</style>
