<template>
    <div class="appointment-list">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="header-bar">
            <div class="header-bar-search">
                <el-dropdown trigger="click" @command="handleClickDropdown">
                    <el-button type="primary"> 添加预约<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in dropdownOptions" :key="item.value" :command="item.value">
                            {{ item.label }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="search-item">
                    <el-select v-model="selectValue" placeholder="请选择" clearable>
                        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                    <el-input placeholder="请输入" prefix-icon="el-icon-search" v-model="searchValue" clearable> </el-input>
                    <el-button>搜索</el-button>
                </div>
            </div>
            <div class="header-bar-date">
                <span class="label">到店时间：</span>
                <el-date-picker
                    v-model="selectDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels
                >
                </el-date-picker>
                <div class="btn-list">
                    <el-button @click="handleClickDate('all')">全部</el-button>
                    <el-button @click="handleClickDate(0)">今天</el-button>
                    <el-button @click="handleClickDate(3)">近三天</el-button>
                    <el-button @click="handleClickDate(7)">近七天</el-button>
                </div>
            </div>
            <div class="header-bar-appointment">
                <div class="appointment-item">
                    <span class="item-label">预约门店：</span>
                    <div class="item-content">多多亲子岁月一店</div>
                </div>
                <div class="appointment-item">
                    <span class="item-label">预约来源：</span>
                    <div class="item-content">
                        <el-select v-model="sourceValue" placeholder="请选择" clearable>
                            <el-option v-for="item in sourceOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <el-button class="export-btn">导出报表</el-button>
        </div>
        <div class="container">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClickTab">
                <el-tab-pane name="all">
                    <el-badge slot="label" class="tab-badge">全部</el-badge>
                </el-tab-pane>
                <el-tab-pane name="1">
                    <el-badge slot="label" :is-dot="true" class="tab-badge">待服务</el-badge>
                </el-tab-pane>
                <el-tab-pane name="2">
                    <el-badge slot="label" :is-dot="true" class="tab-badge">已超时</el-badge>
                </el-tab-pane>
                <el-tab-pane name="3">
                    <el-badge slot="label" :is-dot="true" class="tab-badge">已开单</el-badge>
                </el-tab-pane>
                <el-tab-pane name="4">
                    <el-badge slot="label" :is-dot="true" class="tab-badge">已取消</el-badge>
                </el-tab-pane>
                <el-tab-pane name="5">
                    <el-badge slot="label" :is-dot="true" class="tab-badge">未分配</el-badge>
                </el-tab-pane>
            </el-tabs>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="到店人" align="center">
                    <template slot-scope="scope">
                        <p style="padding-top: 6px">
                            <el-badge :is-dot="!scope.row.is_read">{{ scope.row.customer }}</el-badge>
                        </p>
                        <p>{{ scope.row.phone }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="到店时间" align="center">
                    <template slot-scope="scope">
                        <p>{{ scope.row.arrive_time }}</p>
                        <p class="warn-tips" v-if="scope.row.warn_text && scope.row.warn_text.length > 0">
                            <span class="point"></span>&nbsp;{{ scope.row.warn_text.join('；') }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="shop_name" label="预约门店" align="center"> </el-table-column>
                <el-table-column prop="service_name" label="服务项目" align="center"> </el-table-column>
                <el-table-column prop="source" label="预约来源" align="center"> </el-table-column>
                <el-table-column prop="technician_name" label="技师" align="center"> </el-table-column>
                <el-table-column prop="back_booking_status" label="状态" align="center"> </el-table-column>
                <el-table-column prop="create_time" label="下单时间" align="center"> </el-table-column>
                <el-table-column label="操作" align="right">
                    <template slot-scope="scope">
                        <el-button v-if="scope.$index === 2" type="text" @click="handleToDetail('view')">预约详情</el-button>
                        <el-button v-if="scope.$index === 0" type="text" @click="handleToOrder(scope.row)">开单 </el-button>
                        <el-button v-if="scope.$index === 0" type="text" @click="handleToDetail('edit')">更改</el-button>
                        <el-button v-if="scope.$index === 0" type="text" @click="handleToDetail('view')">详情</el-button>
                        <el-button v-if="scope.$index === 0" type="text" @click="handleCancel">取消</el-button>
                        <div class="cancel-tips" v-if="scope.$index === 1">
                            <p>客户取消</p>
                            <p>原因：“我想换个时间”</p>
                        </div>
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
        </div>
        <appointmentDetail ref="detail"></appointmentDetail>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    import appointmentDetail from '@/components/page/appointment/appointmentDetail';
    import { getAppointmentList } from '@/api/appointment';

    const getDateRange = (number) => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * number);
        return [start, end];
    };

    export default {
        name: 'AppointmentList',
        components: {
            breadcrumb,
            appointmentDetail
        },
        data() {
            return {
                breadcrumbList: [
                    {
                        name: '首页',
                        router: 'dashboard'
                    },
                    {
                        name: '预约管理',
                        router: 'AppointmentList'
                    },
                    {
                        name: '预约列表',
                        router: 'AppointmentList'
                    }
                ],
                dropdownOptions: [
                    { value: '1', label: '预约上门服务' },
                    { value: '2', label: '预约到店服务' },
                    { value: '3', label: '预约技师' }
                ],
                selectValue: '',
                selectOptions: [
                    { label: '会员名', value: 1 },
                    { label: '会员手机号', value: 2 },
                    { label: '技师', value: 3 },
                    { label: '服务', value: 4 }
                ],
                searchValue: '',
                selectDate: '',
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '全部',
                            onClick(picker) {
                                picker.$emit('pick', []);
                            }
                        },
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', getDateRange(0));
                            }
                        },
                        {
                            text: '近三天',
                            onClick(picker) {
                                picker.$emit('pick', getDateRange(3));
                            }
                        },
                        {
                            text: '近七天',
                            onClick(picker) {
                                picker.$emit('pick', getDateRange(7));
                            }
                        }
                    ]
                },
                sourceValue: 0,
                sourceOptions: [
                    { label: '全部', value: 0 },
                    { label: '线下门店', value: 1 },
                    { label: '微信小程序', value: 2 }
                ],
                activeName: 'all',
                page: {
                    size: 10,
                    number: 1,
                    total: 0
                },
                tableData: []
            };
        },
        created() {
            this.getList();
        },
        methods: {
            async getList() {
                const params = {
                    page_no: this.page.number,
                    page_size: this.page.size
                };
                const res = await getAppointmentList(params);
                console.log(res);
            },
            handleClickDropdown(command) {
                this.$refs.detail.appointmentType = command;
                this.$refs.detail.dialogType = 'add';
                this.$refs.detail.dialogTitle = this.dropdownOptions.find((m) => m.value === command).label;
                this.$refs.detail.dialogVisible = true;
            },
            handleToDetail(type) {
                this.$refs.detail.dialogType = type;
                this.$refs.detail.dialogTitle = type === 'edit' ? '修改预约' : '预约详情';
                this.$refs.detail.dialogVisible = true;
            },
            handleClickDate(number) {
                if (number === 'all') {
                    this.selectDate = '';
                    return;
                }
                this.selectDate = getDateRange(number);
            },
            handleClickTab() {},
            handleCurrentChange() {},
            handleToOrder(row) {
                this.$router.push({ path: '/EvaluateList' });
            },
            handleCancel() {
                this.$confirm('是否确定取消此订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('取消成功!');
                    })
                    .catch(() => {});
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

    .container {
        margin-top: 20px;
    }

    .header-bar .header-bar-search,
    .header-bar .header-bar-search .search-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-bar .header-bar-search .search-item > .el-input {
        margin: 0 10px;
    }

    .header-bar-date .btn-list {
        padding-left: 20px;
    }

    .header-bar-date,
    .header-bar-appointment {
        padding-top: 18px;
        font-size: 14px;
    }

    .header-bar-date,
    .header-bar-appointment,
    .header-bar-appointment .appointment-item {
        display: flex;
        align-items: center;
    }

    .header-bar-appointment .appointment-item {
        padding-right: 50px;
    }

    .export-btn {
        margin-top: 18px;
    }

    .tab-badge >>> .el-badge__content.is-fixed {
        top: 10px;
        right: 0;
    }

    .warn-tips {
        color: #f56c6c;
    }

    .warn-tips .point {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #f56c6c;
    }
</style>