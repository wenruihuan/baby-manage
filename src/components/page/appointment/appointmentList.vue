<template>
    <div class="appointment-list" v-loading="loading">
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
                    <el-button @click="getList">搜索</el-button>
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
                    @change="getList"
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
                        <el-select v-model="sourceValue" placeholder="请选择" clearable @change="getList">
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
                    <el-badge slot="label" :is-dot="isNeedReadArray[0] && isNeedReadArray[0] === '1'" class="tab-badge">全部</el-badge>
                </el-tab-pane>
                <el-tab-pane name="0">
                    <el-badge slot="label" :is-dot="isNeedReadArray[1] && isNeedReadArray[1] === '1'" class="tab-badge">待服务</el-badge>
                </el-tab-pane>
                <el-tab-pane name="1">
                    <el-badge slot="label" :is-dot="isNeedReadArray[2] && isNeedReadArray[2] === '1'" class="tab-badge">已超时</el-badge>
                </el-tab-pane>
                <el-tab-pane name="2">
                    <el-badge slot="label" :is-dot="isNeedReadArray[3] && isNeedReadArray[3] === '1'" class="tab-badge">已开单</el-badge>
                </el-tab-pane>
                <el-tab-pane name="3">
                    <el-badge slot="label" :is-dot="isNeedReadArray[4] && isNeedReadArray[4] === '1'" class="tab-badge">已取消</el-badge>
                </el-tab-pane>
                <el-tab-pane name="4">
                    <el-badge slot="label" :is-dot="isNeedReadArray[5] && isNeedReadArray[5] === '1'" class="tab-badge">未分配</el-badge>
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
                        <div class="date_item" v-if="scope.row.arrive_time">
                            <p>{{ $formatDate(scope.row.arrive_time, 'Y-M-D') }}</p>
                            <p>{{ $formatDate(scope.row.arrive_time, 'h:m:s') }}</p>
                        </div>
                        <p class="warn-tips" v-if="scope.row.warn_text && scope.row.warn_text.length > 0">
                            <span class="point"></span>&nbsp;{{ scope.row.warn_text.join('；') }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="shop_name" label="预约门店" align="center"> </el-table-column>
                <el-table-column prop="service_name" label="服务项目" align="center">
                    <template slot-scope="scope">
                        <p v-for="(item, index) in scope.row.service" :key="index">
                            {{ item.service_name ? index + 1 + '：' + item.service_name : '' }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="source" label="预约来源" align="center"> </el-table-column>
                <el-table-column prop="technician_name" label="技师" align="center">
                    <template slot-scope="scope">
                        <p v-for="(item, index) in scope.row.service" :key="index">
                            {{ item.technician_name ? index + 1 + '：' + item.technician_name : '' }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="back_booking_status" label="状态" align="center">
                    <template slot-scope="scope">
                        <p>{{ $map.backBookingStatusMap[scope.row.back_booking_status] }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="下单时间" align="center">
                    <template slot-scope="scope">
                        <div class="date_item" v-if="scope.row.create_time">
                            <p>{{ $formatDate(scope.row.create_time, 'Y-M-D') }}</p>
                            <p>{{ $formatDate(scope.row.create_time, 'h:m:s') }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="right" width="180px">
                    <template slot-scope="scope">
                        <div class="table_btn">
                            <el-button
                                class="no_border"
                                v-if="['2'].includes(scope.row.back_booking_status)"
                                type="text"
                                @click="handleToDetail('view', scope.row.booking_id)"
                                >预约详情</el-button
                            >
                            <el-button
                                v-if="['0', '1', '4'].includes(scope.row.back_booking_status)"
                                type="text"
                                @click="handleToOrder(scope.row)"
                                >开单
                            </el-button>
                            <el-button
                                v-if="['0', '1', '4'].includes(scope.row.back_booking_status)"
                                type="text"
                                @click="handleToDetail('edit', scope.row.booking_id)"
                                >更改</el-button
                            >
                            <el-button
                                v-if="['0', '1', '4'].includes(scope.row.back_booking_status)"
                                type="text"
                                @click="handleToDetail('view', scope.row.booking_id)"
                                >详情</el-button
                            >
                            <el-button
                                class="no_border"
                                v-if="['0', '1', '4'].includes(scope.row.back_booking_status)"
                                type="text"
                                @click="handleCancel(scope.row.booking_id)"
                                >取消</el-button
                            >
                            <div class="cancel-tips" v-if="['3'].includes(scope.row.back_booking_status)">
                                <p>{{ $map.cancelStatusMap[scope.row.cancel_status] }}</p>
                                <p>原因：“{{ scope.row.reason }}”</p>
                            </div>
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
    import { getAppointmentList, getReadState, cancelBooking } from '@/api/appointment';
    import { formatDate } from '@/utils/utils';

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
                    { label: '会员名', value: 'name' },
                    { label: '会员手机号', value: 'phone' },
                    { label: '技师', value: 'technician' },
                    { label: '服务', value: 'service' }
                ],
                searchValue: '',
                selectDate: '',
                sourceValue: '',
                sourceOptions: [
                    { label: '线下门店', value: '线下门店' },
                    { label: '微信小程序', value: '微信小程序' }
                ],
                activeName: 'all',
                page: {
                    size: 20,
                    number: 1,
                    total: 0
                },
                tableData: [],
                isNeedReadArray: [],
                loading: false
            };
        },
        created() {
            this.getList();
        },
        methods: {
            async getReadState() {
                const res = await getReadState();
                if (res.code === 200) {
                    this.isNeedReadArray = res.data.is_needRead_array;
                }
            },
            async getList() {
                this.loading = true;
                const params = {
                    page_no: this.page.number,
                    page_size: this.page.size,
                    back_booking_status: this.activeName !== 'all' ? this.activeName : ''
                };
                if (this.selectValue) {
                    params.keyword_type = this.selectValue;
                }
                if (this.searchValue) {
                    params.keyword = this.searchValue;
                }
                if (this.selectDate && this.selectDate.length > 1) {
                    params.start_time = formatDate(this.selectDate[0], 'Y-M-D');
                    params.end_time = formatDate(this.selectDate[1], 'Y-M-D');
                }
                if (this.sourceValue) {
                    params.source = this.sourceValue;
                }
                const res = await getAppointmentList(params);
                this.loading = false;
                if (res.code === 200) {
                    this.page.total = res.data.all_count || 0;
                    this.tableData = res.data.data || [];
                }
                this.getReadState();
            },
            handleClickDropdown(command) {
                this.$refs.detail.appointmentType = command;
                this.$refs.detail.dialogType = 'add';
                this.$refs.detail.dialogTitle = this.dropdownOptions.find((m) => m.value === command).label;
                this.$refs.detail.dialogVisible = true;
            },
            handleToDetail(type, id) {
                // 那个傻逼后台没有返回给我
                this.$refs.detail.appointmentType = '';
                this.$refs.detail.dialogType = type;
                this.$refs.detail.dialogTitle = type === 'edit' ? '修改预约' : '预约详情';
                this.$refs.detail.dialogVisible = true;
                this.$refs.detail.dialogId = id;
            },
            handleClickDate(number) {
                if (number === 'all') {
                    this.selectDate = '';
                    return;
                }
                this.selectDate = getDateRange(number);
                this.getList();
            },
            handleClickTab() {
                this.getList();
            },
            handleCurrentChange(number) {
                this.page.number = number;
                this.getList();
            },
            handleToOrder(row) {
                this.$router.push({ path: '/workbench' });
            },
            handleCancel(booking_id) {
                this.$confirm('是否确定取消此订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        this.loading = true;
                        const res = await cancelBooking({ booking_id });
                        if (res.code === 200) {
                            this.$message.success('取消成功!');
                            this.getList();
                        }
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
    .table_btn >>> .el-button {
        position: relative;
    }
    .table_btn >>> .el-button::after {
        content: '';
        width: 1px;
        height: 15px;
        position: absolute;
        top: 7.5px;
        right: -6px;
        background: #dddddd;
    }
    .no_border::after {
        display: none;
    }
</style>
