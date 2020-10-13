<template>
    <el-dialog
        class="appointment-detail"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="680px"
        center
    >
        <el-form :model="formData" :rules="dialogType === 'add' ? formRules : {}" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <el-form-item label="手机号：" prop="phone" v-if="dialogType === 'add'">
                <div class="form-item-flex">
                    <el-select v-model="phonePrefix" placeholder="请选择">
                        <el-option v-for="item in phonePrefixOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-model="formData.phone"></el-input>
                    <el-button>添加会员</el-button>
                </div>
            </el-form-item>
            <el-form-item label="下单人：" v-else>
                <p>王太太（普通会员） +86 1340000000</p>
            </el-form-item>
            <el-form-item label="到店人：" prop="customer">
                <el-input v-if="dialogType === 'add'" v-model="formData.customer" placeholder="请填写到店人姓名"></el-input>
                <p v-else>王太太（普通会员） +86 1340000000</p>
            </el-form-item>
            <el-form-item label="预约门店：">
                <p>多多亲子岁月一店</p>
            </el-form-item>
            <el-form-item label="预约服务和技师：">
                <el-table :data="formData.service_list" style="width: 100%">
                    <el-table-column prop="service_id" label="预约服务" align="center">
                        <template slot-scope="scope">
                            <el-cascader
                                :disabled="appointmentType === '3'"
                                popper-class="service-cascader"
                                v-model="scope.row.service_id"
                                :props="{ checkStrictly: true }"
                                :options="serviceOptions"
                            >
                                <template slot-scope="{ node, data }">
                                    <div class="node-item">
                                        <el-image v-if="!node.isLeaf" :src="data.icon" fit="cover">
                                            <div slot="error" class="error-image-slot">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                        <span>{{ data.label }}</span>
                                    </div>
                                </template>
                            </el-cascader>
                        </template>
                    </el-table-column>
                    <el-table-column prop="technician_id" label="技师" align="center">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.technician_id" placeholder="请选择">
                                <el-option v-for="item in technicianOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" v-if="dialogType !== 'view'">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleRemoveRow(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button style="margin-top: 5px" v-if="showAddRow" @click="handleAddRow">添加</el-button>
            </el-form-item>
            <el-form-item label="服务占用时长：" v-if="dialogType !== 'view'">
                <div class="form-item-flex">
                    <el-input style="padding-right: 20px" v-model="formData.serviceHour" readonly>
                        <template slot="append">小时</template>
                    </el-input>
                    <el-input v-model="formData.serviceMinute" readonly>
                        <template slot="append">分钟</template>
                    </el-input>
                </div>
            </el-form-item>
            <el-form-item label="预约时间：" prop="appointmentDateTime">
                <el-date-picker
                    v-if="dialogType !== 'view'"
                    v-model="formData.appointmentDateTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="10:00:00"
                >
                </el-date-picker>
                <p v-else>2020-10-11 12:12:12</p>
            </el-form-item>
            <el-form-item label="商家备注：">
                <el-input
                    v-if="dialogType !== 'view'"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8 }"
                    v-model="formData.remark"
                    :maxlength="200"
                    show-word-limit
                >
                </el-input>
                <p v-else>{{ formData.remark }}</p>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <div v-if="dialogType === 'add'">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
            <div v-if="dialogType === 'edit'">
                <el-button @click="dialogVisible = false">取消预约</el-button>
                <el-button @click="dialogVisible = false">保 存</el-button>
                <el-button type="primary" @click="dialogVisible = false">开 单</el-button>
            </div>
            <div v-if="dialogType === 'view'">
                <el-button type="primary" @click="dialogVisible = false">查看订单详情</el-button>
            </div>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        name: 'AppointmentDetail',
        data() {
            return {
                dialogTitle: '',
                dialogVisible: false,
                // 类型 add：新增，edit：编辑，view：查看
                dialogType: 'add',
                // 预约类型 1：上门服务，2：门店服务，3：预约技师
                appointmentType: '1',
                phonePrefix: '+86',
                phonePrefixOptions: [{ label: '中国 +86', value: '+86' }],
                serviceOptions: [
                    {
                        value: '1',
                        label: '服务名称1',
                        icon: '',

                        children: []
                    },
                    {
                        value: '2',
                        label: '服务名称2',
                        icon: '',
                        children: []
                    },
                    {
                        value: '3',
                        label: '服务名称3',
                        icon: '',
                        children: [
                            {
                                value: '4',
                                label: '规格1'
                            },
                            {
                                value: '5',
                                label: '规格2'
                            }
                        ]
                    }
                ],
                technicianOptions: [
                    { label: '小红', value: '1' },
                    { label: '小丽', value: '2' }
                ],
                formData: {
                    phone: '',
                    customer: '',
                    service_list: [],
                    serviceHour: '',
                    serviceMinute: '',
                    appointmentDateTime: '',
                    remark: ''
                },
                formRules: {
                    phone: [{ required: true, message: '请填写手机号码', trigger: 'blur' }],
                    customer: [{ required: true, message: '请填写到店人姓名', trigger: 'blur' }],
                    appointmentDateTime: [{ required: true, message: '请选择预约时间', trigger: 'blur' }]
                }
            };
        },
        computed: {
            showAddRow() {
                return this.dialogType !== 'view' && !(['1', '3'].includes(this.appointmentType) && this.formData.service_list.length >= 1);
            }
        },
        methods: {
            handleAddRow() {
                let row = { service_id: '', technician_id: '' };
                this.formData.service_list.push(row);
            },
            handleRemoveRow(index) {
                this.formData.service_list.splice(index, 1);
            }
        }
    };
</script>
<style lang="css" scoped>
    >>> .el-dialog__header {
        text-align: left;
    }

    >>> .el-dialog__body {
        max-height: 600px;
        overflow-y: scroll;
    }

    .form-item-flex {
        display: flex;
        align-items: center;
    }

    .form-item-flex .el-select {
        padding-right: 20px;
    }

    .form-item-flex .el-button {
        margin-left: 20px;
    }
</style>