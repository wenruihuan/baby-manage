<template>
    <div class="evaluate-list" v-loading="loading">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="header-bar">
            <div class="header-bar-search">
                <el-button type="primary" @click="handleToOrder">开单收银</el-button>
                <div class="search-item">
                    <el-select v-model="selectValue" placeholder="请选择" clearable>
                        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                    <el-input placeholder="请输入" prefix-icon="el-icon-search" v-model="searchValue" clearable> </el-input>
                    <el-button @click="getListData">搜索</el-button>
                </div>
            </div>
            <div class="header-bar-date">
                <span class="label">评价时间：</span>
                <el-date-picker
                    v-model="selectDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels
                    @change="getListData"
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
                    <span class="item-label">评价门店：</span>
                    <div class="item-content">多多亲子岁月一店</div>
                </div>
            </div>
        </div>
        <div class="container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="service_name" label="商品" align="center"> </el-table-column>
                <el-table-column prop="order_no" label="订单编号" align="center"> </el-table-column>
                <el-table-column prop="source" label="评分" align="center">
                    <template slot-scope="scope">
                        <p class="rate-item rate-item-big">
                            <el-rate v-model="scope.row.service_rate" disabled text-color="#ff9900"></el-rate>
                        </p>
                        <p class="rate-item">
                            <span>门店环境：</span>
                            <el-rate v-model="scope.row.shop_rate" disabled text-color="#ff9900"></el-rate>
                        </p>
                        <p class="rate-item">
                            <span>技师服务：</span>
                            <el-rate v-model="scope.row.technician_rate" disabled text-color="#ff9900"></el-rate>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="technician_name" label="技师" align="center"> </el-table-column>
                <el-table-column prop="arrive_time" label="下单时间" align="center">
                    <template slot-scope="scope">
                        <div class="date_item" v-if="scope.row.arrive_time">
                            <p>{{ $formatDate(scope.row.arrive_time, 'Y-M-D') }}</p>
                            <p>{{ $formatDate(scope.row.arrive_time, 'h:m:s') }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="buyer_name" label="买家" align="center"> </el-table-column>
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
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    import { formatDate } from '@/utils/utils';
    import { getAppointmentRateList } from '@/api/appointment';

    const getDateRange = (number) => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * number);
        return [start, end];
    };

    export default {
        name: 'EvaluateList',
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
                        name: '预约管理',
                        router: 'EvaluateList'
                    },
                    {
                        name: '预约评价',
                        router: 'EvaluateList'
                    }
                ],
                loading: false,
                selectValue: '',
                selectOptions: [
                    { label: '订单编号', value: 1 },
                    { label: '会员名', value: 2 },
                    { label: '技师', value: 3 },
                    { label: '服务', value: 4 }
                ],
                searchValue: '',
                selectDate: '',
                page: {
                    size: 10,
                    number: 1,
                    total: 0
                },
                tableData: []
            };
        },
        created() {
            this.getListData();
        },
        methods: {
            async getListData() {
                this.loading = true;
                const params = {
                    page_no: this.page.number,
                    page_size: this.page.size
                };
                if (this.selectValue === 1) {
                    params.order_no = this.searchValue;
                }
                if (this.selectValue === 2) {
                    params.member_name = this.searchValue;
                }
                if (this.selectValue === 3) {
                    params.technician_name = this.searchValue;
                }
                if (this.selectValue === 4) {
                    params.service_name = this.searchValue;
                }
                if (this.selectDate && this.selectDate.length > 0) {
                    params.start_time = formatDate(this.selectDate[0], 'Y-M-D');
                    params.end_time = formatDate(this.selectDate[1], 'Y-M-D');
                }
                const res = await getAppointmentRateList(params).catch(() => {
                    this.loading = false;
                });
                this.loading = false;
                if (res.code === 200) {
                    let list = res.data.data || [];
                    list.forEach((m) => {
                        m.service_rate = Number(m.service_rate);
                        m.shop_rate = Number(m.shop_rate);
                        m.technician_rate = Number(m.technician_rate);
                    });
                    this.tableData = list;
                    this.page.total = res.data.all_count;
                }
            },
            handleClickDate(number) {
                if (number === 'all') {
                    this.selectDate = '';
                    return;
                }
                this.selectDate = getDateRange(number);
                this.getListData();
            },
            handleCurrentChange(number) {
                this.page.number = number;
                this.getListData();
            },
            handleToOrder() {
                this.$router.push('/workbench');
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

    .rate-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .rate-item-big {
        padding-bottom: 10px;
    }

    .rate-item-big >>> .el-rate__icon {
        font-size: 24px;
    }
</style>