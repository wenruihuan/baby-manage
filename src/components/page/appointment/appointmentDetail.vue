<template>
    <el-dialog
        v-if="dialogVisible"
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
                    <el-select
                        v-model="formData.phone"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入手机号码"
                        :remote-method="remoteMethod"
                        :loading="loadingPhone"
                    >
                        <el-option v-for="item in memberOptions" :key="item.phone" :label="item.phone" :value="item.phone"> </el-option>
                    </el-select>
                    <el-button v-if="!isMember">添加会员</el-button>
                </div>
            </el-form-item>
            <el-form-item label="下单人：" v-else>
                <p>
                    {{ showFormData.booking_info.customer }}（{{ showFormData.member_info.level_name }}）
                    {{ showFormData.booking_info.phone }}
                </p>
            </el-form-item>
            <el-form-item label="到店人：" prop="customer">
                <el-input v-if="dialogType === 'add'" v-model="formData.customer" placeholder="请填写到店人姓名"></el-input>
                <p v-else>
                    {{ showFormData.booking_info.customer }}（{{ showFormData.member_info.level_name }}）
                    {{ showFormData.booking_info.phone }}
                </p>
            </el-form-item>
            <el-form-item label="预约门店：">
                <p v-if="dialogType === 'add'">多多亲子岁月一店</p>
                <p v-else>{{ showFormData.shop_name }}</p>
            </el-form-item>
            <el-form-item label="预约服务和技师：">
                <el-table v-if="dialogType !== 'view'" :data="formData.service_list" style="width: 100%">
                    <el-table-column prop="service_id" label="预约服务" align="center">
                        <template slot-scope="scope">
                            <el-cascader
                                :disabled="appointmentType === '3'"
                                popper-class="service-cascader"
                                v-model="scope.row.service_id"
                                :props="{ checkStrictly: true, value: 'id', label: 'name' }"
                                :options="serviceOptions"
                                @change="handleChangeService(scope.$index)"
                            >
                                <template slot-scope="{ node, data }">
                                    <div class="node-item">
                                        <el-image v-if="!node.isLeaf" :src="data.img" fit="cover">
                                            <div slot="error" class="error-image-slot">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                        <span>{{ data.name }}</span>
                                    </div>
                                </template>
                            </el-cascader>
                        </template>
                    </el-table-column>
                    <el-table-column prop="technician_id" label="技师" align="center">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.technician_id" placeholder="请选择">
                                <el-option
                                    v-for="(item, index) in scope.row.technicianOptions"
                                    :key="item.id + index"
                                    :label="item.name"
                                    :value="item.id"
                                >
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
                <el-table v-else :data="showFormData.service" style="width: 100%">
                    <el-table-column prop="service_name" label="预约服务" align="center"></el-table-column>
                    <el-table-column prop="technician_name" label="技师" align="center"></el-table-column>
                </el-table>
                <el-button style="margin-top: 5px" v-if="showAddRow" @click="handleAddRow">添加</el-button>
            </el-form-item>
            <el-form-item label="服务占用时长：" v-if="dialogType !== 'view'">
                <div class="form-item-flex">
                    <el-input style="padding-right: 20px" v-model="serviceHour" readonly>
                        <template slot="append">小时</template>
                    </el-input>
                    <el-input v-model="serviceMinute" readonly>
                        <template slot="append">分钟</template>
                    </el-input>
                </div>
            </el-form-item>
            <el-form-item label="预约时间：" prop="start_time">
                <el-date-picker v-if="dialogType !== 'view'" v-model="formData.start_time" type="date" placeholder="选择日期时间">
                </el-date-picker>
                <el-select
                    style="margin-left: 20px; width: 220px"
                    v-if="dialogType !== 'view'"
                    v-model="formData.select_time"
                    placeholder="请选择"
                >
                    <el-option v-for="(item, index) in timeOptions" :key="index" :label="item" :value="item"> </el-option>
                </el-select>
                <p v-else>
                    {{ showAppointmentTime }}
                </p>
            </el-form-item>
            <el-form-item label="买家备注：" v-if="dialogType === 'view'">
                <p>{{ showFormData.member_remark }}</p>
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
                <p v-else>{{ showFormData.shop_remark }}</p>
            </el-form-item>
            <el-form-item label="开单时间：" v-if="dialogType === 'view' && ['3', '4'].includes(showFormData.booking_status)">
                <p>{{ showFormData.checkout.checkout_time }}</p>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <div v-if="dialogType === 'add'">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave()">确 定</el-button>
            </div>
            <div v-if="dialogType === 'edit'">
                <el-button @click="handleCancel()">取消预约</el-button>
                <el-button @click="handleSave()">保 存</el-button>
                <el-button
                    type="primary"
                    @click="
                        () => {
                            $router.push('/workbench');
                        }
                    "
                    >开 单</el-button
                >
            </div>
            <div v-if="dialogType === 'view' && ['3', '4'].includes(showFormData.booking_status)">
                <el-button type="primary" @click="dialogVisible = false">查看订单详情</el-button>
            </div>
        </span>
    </el-dialog>
</template>
<script>
    import {
        getTechnicianList,
        getMemberName,
        getServiceList,
        getTimeSelect,
        getTimeSelect1,
        saveBook,
        bookDetail,
        cancelBooking
    } from '@/api/appointment';
    import { formatDate } from '@/utils/utils';
    export default {
        name: 'AppointmentDetail',
        data() {
            return {
                dialogTitle: '',
                dialogVisible: false,
                dialogId: '',
                // 类型 add：新增，edit：编辑，view：查看
                dialogType: 'add',
                // 预约类型 1：上门服务，2：门店服务，3：预约技师
                appointmentType: '1',
                phonePrefix: '+86',
                phonePrefixOptions: [{ label: '中国 +86', value: '+86' }],
                loadingPhone: false,
                memberOptions: [],
                isMember: false,
                serviceOptions: [],
                technicianOptions: [],
                serviceHour: '',
                serviceMinute: '',
                timeOptions: [],
                showFormData: {
                    booking_info: {},
                    booking_status: '',
                    checkout: {},
                    member_info: {},
                    member_remark: '',
                    service: [],
                    shop_id: '',
                    shop_name: '',
                    shop_remark: ''
                },
                formData: {
                    phone: '',
                    customer: '',
                    service_list: [],
                    start_time: '',
                    select_time: '',
                    remark: ''
                },
                formRules: {
                    phone: [{ required: true, message: '请填写手机号码', trigger: 'blur' }],
                    customer: [{ required: true, message: '请填写到店人姓名', trigger: 'blur' }],
                    start_time: [{ required: true, message: '请选择预约时间', trigger: 'blur' }]
                }
            };
        },
        computed: {
            showAddRow() {
                return this.dialogType !== 'view' && !(['1', '3'].includes(this.appointmentType) && this.formData.service_list.length >= 1);
            },
            showAppointmentTime() {
                return this.showFormData && this.showFormData.booking_info
                    ? formatDate(this.showFormData.booking_info.start_time, 'Y-M-D h:m:s') +
                          ' 至 ' +
                          formatDate(
                              new Date(
                                  +new Date(this.showFormData.booking_info.start_time) + Number(this.showFormData.booking_info.total_length)
                              ),
                              'Y-M-D h:m:s'
                          )
                    : '';
            }
        },
        watch: {
            dialogVisible(newVal) {
                if (newVal) {
                    this.getServiceList().then(() => {
                        this.dialogId && this.getDetail();
                    });
                } else {
                    this.init();
                }
            },
            'formData.service_list': {
                handler(newVal) {
                    let total = 0;
                    let list = [];
                    newVal.forEach((m, i) => {
                        const item = this.serviceOptions.find((n) => n.id === m.service_id[0]);
                        if (item) {
                            total += item.service_time ? Number(item.service_time) : 0;
                        }
                        if (m.service_id[0] || m.technician_id) {
                            let obj = { service_id: m.service_id[0] || '', technician_id: m.technician_id || '', total: total };
                            list.push(obj);
                        }
                        if (m.service_id.length !== 0 && (!m.technicianOptions || m.technicianOptions.length <= 0)) {
                            this.getTechnicianList('', i);
                        }
                    });
                    this.serviceHour = parseInt(total / 60);
                    this.serviceMinute = total % 60;

                    if (list.length > 0) {
                        this.getTimeSelect(list);
                    }
                },
                deep: true
            },
            'formData.phone': {
                handler(newVal) {
                    if (newVal) {
                        let item = this.memberOptions.find((m) => m.phone === newVal);
                        if (item) {
                            this.formData.customer = item.name;
                        }
                    }
                }
            }
        },
        methods: {
            init() {
                this.formData = {
                    phone: '',
                    customer: '',
                    service_list: [],
                    start_time: '',
                    select_time: '',
                    remark: ''
                };
                this.memberOptions = [];
                this.isMember = false;
                this.serviceOptions = [];
                this.technicianOptions = [];
                this.serviceHour = '';
                this.serviceMinute = '';
                this.timeOptions = [];
            },
            async getDetail() {
                const res = await bookDetail({ booking_id: this.dialogId });
                if (res.code === 200) {
                    this.showFormData = res.data;
                    if (this.dialogType === 'edit') {
                        const formData = {
                            phone: res.data.booking_info.phone || '',
                            customer: res.data.booking_info.customer || '',
                            service_list: [],
                            start_time: res.data.booking_info.start_time || '',
                            select_time: '',
                            remark: res.data.shop_remark || ''
                        };
                        const service = res.data.service || [];
                        service.forEach((m) => {
                            let obj = {
                                service_id: m.sku ? [m.service_id, m.sku] : [m.service_id],
                                technician_id: m.technician_id
                            };
                            formData.service_list.push(obj);
                        });
                        this.formData = formData;
                    }
                }
            },
            async remoteMethod(query) {
                if (query !== '' && /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(query)) {
                    this.loadingPhone = true;
                    const res = await getMemberName({ phone: query });
                    this.loadingPhone = false;
                    if (res.data.length > 0) {
                        this.isMember = true;
                    }
                    this.memberOptions = res.data;
                } else {
                    this.memberOptions = [];
                }
            },
            async getServiceList() {
                const params = {
                    is_todoor: this.appointmentType === '1' ? '1' : '0'
                };
                const res = await getServiceList(params);
                if (res.code === 200) {
                    const list = res.data || [];
                    list.forEach((m) => {
                        if (m.sku && m.sku.length > 0) {
                            m.children = [];
                            m.sku.forEach((n) => {
                                m.children.push({ id: n, name: n });
                            });
                        }
                    });
                    this.serviceOptions = list;
                }
            },
            handleChangeService(index) {
                const item = this.formData.service_list[index];
                if (item && item.service_id) {
                    item.service_id[0];
                    this.getTechnicianList(item.service_id[0], index);
                }
            },
            async getTechnicianList(service_id, index) {
                const res = await getTechnicianList({ service_id: service_id });
                if (res.code === 200) {
                    this.formData.service_list.forEach((m) => {
                        this.$set(m, 'technicianOptions', res.data || []);
                    });
                }
            },
            async getTimeSelect(list) {
                if (this.dialogType !== '3') {
                    const res = await getTimeSelect(list);
                    if (res.code === 200) {
                        this.timeOptions = res.data || [];
                    }
                } else {
                    const res = await getTimeSelect1({ technician_id: list[0].technician_id, time_length: list[0].total });
                    if (res.code === 200) {
                        this.timeOptions = res.data || [];
                    }
                }
            },
            handleAddRow() {
                let row = { service_id: [], technician_id: '' };
                this.formData.service_list.push(row);
            },
            handleRemoveRow(index) {
                this.formData.service_list.splice(index, 1);
            },
            handleCancel() {
                this.$confirm('是否确定取消此订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        this.loading = true;
                        const res = await cancelBooking({ booking_id: this.dialogId });
                        if (res.code === 200) {
                            this.$message.success('取消成功!');
                            this.dialogVisible = false;
                            this.$parent.getList();
                        }
                    })
                    .catch(() => {});
            },
            async handleSave() {
                if (this.dialogType === 'add' && !this.formData.phone) {
                    this.$message.error('请填写手机号码！');
                    return;
                }
                if (this.dialogType === 'add' && !this.formData.customer) {
                    this.$message.error('请填写到店人！');
                    return;
                }
                if (!(this.formData.start_time && this.formData.select_time)) {
                    this.$message.error('请选择预约时间！');
                    return;
                }
                const params = {
                    is_todoor: this.appointmentType === '1' ? '1' : '0',
                    phone: this.formData.phone,
                    customer: this.formData.customer,
                    service_list: [],
                    start_time: '',
                    remark: this.formData.remark
                };
                this.formData.service_list.forEach((m) => {
                    let obj = {};
                    if (m.service_id.length > 0) {
                        obj.service_id = m.service_id[0];
                        obj.sku = m.service_id[1] || '';
                    }
                    obj.technician_id = m.technician_id;
                    params.service_list.push(obj);
                });
                const start_time = formatDate(this.formData.start_time, 'Y-M-D') + ' ' + this.formData.select_time;
                params.start_time = start_time;
                const res = await saveBook(params);
                if (res.code === 200) {
                    this.$message.success('保存成功！');
                    this.init();
                    this.dialogVisible = false;
                    this.$parent.getList();
                }
            }
        }
    };
</script>
<style lang="css" scoped>
    .el-dialog >>> .el-dialog__header {
        text-align: left;
    }

    .el-dialog >>> .el-dialog__body {
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