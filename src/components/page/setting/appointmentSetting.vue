<template>
    <div class="appointment_setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="container">
            <el-tabs v-model="activeTab" type="card" @tab-click="handleClickTab">
                <el-tab-pane label="全局设置" name="GlobalSetting"></el-tab-pane>
                <el-tab-pane label="技师管理" name="TechnicianSetting"></el-tab-pane>
            </el-tabs>
            <div class="global_setting" v-show="activeTab === 'GlobalSetting'">
                <div class="info-title">预约设置</div>
                <el-form :model="formData" label-width="130px" class="demo-ruleForm">
                    <el-form-item label="预约时间：">
                        <div class="week_btns">
                            <el-button
                                class="week-btn"
                                v-for="(btn, index) in weekBtns"
                                :key="btn.value"
                                :type="btn.isActive ? 'primary' : ''"
                                @click="handleClickWeekBtn(index)"
                            >
                                {{ btn.label }}
                            </el-button>
                        </div>
                        <el-time-picker
                            is-range
                            v-model="timeRange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                        >
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="预约范围：">
                        <div class="range_item">
                            客户可预约<el-select v-model="formData.start_range" placeholder="请选择">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                                </el-option> </el-select
                            >到<el-select v-model="formData.end_range" placeholder="请选择">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                                </el-option> </el-select
                            >以内的任意时间到店
                        </div>
                    </el-form-item>
                    <el-form-item label="取消预约：">
                        <el-radio-group v-model="cancelFlag">
                            <el-radio :label="true"> 随时取消或修改预约 </el-radio>
                            <el-radio :label="false">
                                <div class="radio-item">
                                    预约到店时间前
                                    <el-select :disabled="cancelFlag" v-model="formData.cancel_booking" placeholder="请选择">
                                        <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                    需联系门店修改或取消预约单
                                </div>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="暂停预约：">
                        <el-date-picker
                            v-model="dateRange"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']"
                        >
                        </el-date-picker>
                        <p class="tips">门店不能提供服务的时间段</p>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveGlobal">保存设置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="technician_setting" v-show="activeTab === 'TechnicianSetting'">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="shop_name" label="姓名" align="center"> </el-table-column>
                    <el-table-column prop="service_name" label="权限" align="center"> </el-table-column>
                    <el-table-column label="人数限制（人）" align="center">
                        <template slot-scope="scope">
                            <span
                                >{{ scope.row.limit }}
                                <el-popover placement="top" width="260" v-model="scope.row.visible">
                                    <div style="display: flex">
                                        <el-input
                                            v-model.number="scope.row.tempLimit"
                                            type="number"
                                            placeholder="输入数字"
                                            style="margin-right: 10px"
                                        ></el-input>
                                        <el-button size="mini" @click="scope.row.visible = false">取消</el-button>
                                        <el-button type="primary" size="mini" @click="handleChangeLimit(scope.$index)">确定</el-button>
                                    </div>
                                    <i slot="reference" class="el-icon-edit" style="cursor: pointer"></i>
                                </el-popover>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="source" label="关联服务" align="center"></el-table-column>
                    <el-table-column label="支持单独约技师" align="center">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.appoint" @change="handleChangeAppoint(scope.$index)">可预约</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEdit(scope.row.id)">编辑关联服务</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page-box">
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next, jumper"
                        :total="page.total"
                    >
                    </el-pagination>
                </div>
                <el-dialog
                    class="technician_setting_detail"
                    title="关联服务"
                    :visible.sync="dialogVisibleAdd"
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    width="680px"
                >
                    <el-radio-group v-model="addRadioValue">
                        <el-radio :label="3">所有服务</el-radio>
                        <el-radio :label="6">指定服务</el-radio>
                    </el-radio-group>
                    <el-select v-model="addSelectValue" style="margin-left: 30px; margin-bottom: 10px">
                        <el-option v-for="item in addSelectOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                    <el-table :data="addTableData" @selection-change="handleSelectionChange" style="width: 100%">
                        <el-table-column type="selection" width="55"> </el-table-column>
                        <el-table-column prop="shop_name" label="服务名称" align="center">
                            <template slot-scope="scope">
                                <div class="table-name">
                                    <el-image style="width: 30px; height: 30px" src="" fit="cover"></el-image>
                                    <div class="info">
                                        <p>服务名称</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="service_name" label="价格" align="center"> </el-table-column>
                        <el-table-column prop="service_name" label="分类" align="center"> </el-table-column>
                        <el-table-column prop="service_name" label="创建时间" align="center"> </el-table-column>
                    </el-table>
                    <span slot="footer">
                        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisibleAdd = false">保 存</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    import { getGlobalData, saveGlobal } from '@/api/setting';
    import { formatDate } from '@/utils/utils';
    export default {
        name: 'AppointmentSetting',
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
                        name: '预约设置',
                        router: 'AppointmentSetting'
                    }
                ],
                activeTab: 'GlobalSetting',
                weekBtns: [
                    { label: '周一', value: '1', isActive: false },
                    { label: '周二', value: '2', isActive: false },
                    { label: '周三', value: '3', isActive: false },
                    { label: '周四', value: '4', isActive: false },
                    { label: '周五', value: '5', isActive: false },
                    { label: '周六', value: '6', isActive: false },
                    { label: '周日', value: '7', isActive: false }
                ],
                options1: [],
                options2: [],
                options3: [],
                cancelFlag: true,
                timeRange: '',
                dateRange: '',
                formData: {
                    time: [],
                    start_time: '',
                    end_time: '',
                    start_range: '',
                    end_range: '',
                    cancel_booking: '',
                    start_stop_range: '',
                    end_stop_range: ''
                },
                page: {
                    size: 10,
                    number: 1,
                    total: 0
                },
                tableData: [{ limit: '1', appoint: false, visible: false, tempLimit: '' }],
                dialogVisibleAdd: false,
                addRadioValue: 3,
                addSelectValue: 1,
                addSelectOptions: [{ value: 1, label: '所有分类' }],
                addTableData: []
            };
        },
        beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.activeTab = to.path === '/GlobalSetting' ? 'GlobalSetting' : 'TechnicianSetting';
            });
        },
        created() {
            this.options1 = [
                ...this.initOptions(23, 'h', '小时以后'),
                ...this.initOptions(7, 'd', '天以后'),
                { label: '15天以后', value: `${15 * 24 * 60}` },
                { label: '30天以后', value: `${30 * 24 * 60}` }
            ];
            this.options2 = [
                { label: '7天', value: `${7 * 24 * 60}` },
                { label: '15天', value: `${15 * 24 * 60}` },
                { label: '30天', value: `${30 * 24 * 60}` }
            ];
            this.options3 = [...this.initOptions(23, 'h', '小时'), ...this.initOptions(7, 'd', '天')];
            this.getGlobalData();
        },
        methods: {
            async getGlobalData() {
                const res = await getGlobalData();
                if (res.code === 200) {
                    const formData = res.data;
                    if (formData.time && formData.time.length > 0) {
                        this.weekBtns.forEach((m) => {
                            this.$set(m, 'isActive', formData.time.includes(m.value));
                        });
                    }
                    if (formData.start_time && formData.end_time) {
                        const defaultDate = '2020/12/12 ';
                        this.timeRange = [defaultDate + formData.start_time, defaultDate + formData.end_time];
                    }
                    if (formData.cancel_booking === '-1') {
                        this.cancelFlag = true;
                    } else {
                        this.cancelFlag = false;
                    }
                    if (formData.start_stop_range && formData.end_stop_range) {
                        this.dateRange = [formData.start_stop_range, formData.end_stop_range];
                    }
                    this.formData = formData;
                }
            },
            async saveGlobal() {
                const formData = JSON.parse(JSON.stringify(this.formData));
                const time = [];
                this.weekBtns.forEach((m) => {
                    if (m.isActive) {
                        time.push(m.value);
                    }
                });
                formData.time = time;
                if (this.timeRange.length > 0) {
                    formData.start_time = formatDate(this.timeRange[0], 'h:m');
                    formData.end_time = formatDate(this.timeRange[1], 'h:m');
                }
                if (this.cancelFlag) {
                    formData.cancel_booking = '-1';
                }
                if (this.dateRange.length > 0) {
                    formData.start_stop_range = formatDate(this.dateRange[0], 'Y-M-D h:m:s');
                    formData.end_stop_range = formatDate(this.dateRange[1], 'Y-M-D h:m:s');
                }
                const res = await saveGlobal({ ...formData });
                if (res === 200) {
                    console.log(res);
                }
            },
            initOptions(number, type, label) {
                const list = [];
                for (let i = 1; i <= number; i++) {
                    list.push({ label: i + label, value: String(i * (type === 'h' ? 60 : 24 * 60)) });
                }
                return list;
            },
            handleClickTab(tab) {
                if (this.$route.path === '/' + this.activeTab) {
                    return;
                }
                this.$router.push({ path: '/' + this.activeTab });
            },
            handleClickWeekBtn(index) {
                const item = this.weekBtns[index];
                item.isActive = !item.isActive;
                this.weekBtns.splice(index, 1, item);
            },
            handleCurrentChange() {},
            handleEdit() {
                this.dialogVisibleAdd = true;
            },
            handleChangeLimit(index) {
                let item = this.tableData[index];
                item.limit = item.tempLimit;
                item.tempLimit = '';
                item.visible = false;
                this.tableData.splice(index, 1, item);
            },
            handleChangeAppoint(index) {
                // let item = this.tableData[index];
                // item.appoint = !item.appoint;
                // this.tableData.splice(index, 1, item);
            },
            handleSelectionChange() {}
        }
    };
</script>

<style scoped>
    .el-form-item {
        margin-bottom: 35px;
    }
    .info-title {
        margin-bottom: 30px;
    }
    .week-btn + .week-btn {
        margin-left: 20px;
        margin-bottom: 20px;
    }
    .range_item {
        color: #333333;
    }
    .range_item >>> .el-select {
        width: 120px;
        margin: 0 8px;
    }
    .radio-item {
        display: inline;
        color: #333333;
    }
    .radio-item >>> .el-select {
        margin: 0 8px;
        width: 120px;
    }
    .tips {
        font-size: 12px;
        color: #d9d9d9;
    }
</style>