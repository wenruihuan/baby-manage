<template>
    <div class="evaluate-list">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="header-bar">
            <div class="header-bar-search">
                <el-button type="primary">开单收银</el-button>
                <div class="search-item">
                    <el-select v-model="selectValue" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input
                        placeholder="请输入"
                        prefix-icon="el-icon-search"
                        v-model="searchValue"
                        clearable>
                    </el-input>
                    <el-button>搜索</el-button>
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
                    unlink-panels>
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
                <el-table-column prop="shop_name" label="商品" align="center">
                </el-table-column>
                <el-table-column prop="service_name" label="订单编号" align="center">
                </el-table-column>
                <el-table-column prop="source" label="评分" align="center">
                    <template slot-scope="scope">
                        <p class="rate-item rate-item-big">
                            <el-rate v-model="scope.row.value" disabled text-color="#ff9900"></el-rate>
                        </p>
                        <p class="rate-item">
                            <span>门店环境：</span>
                            <el-rate v-model="scope.row.value" disabled text-color="#ff9900"></el-rate>
                        </p>
                        <p class="rate-item">
                            <span>技师服务：</span>
                            <el-rate v-model="scope.row.value" disabled text-color="#ff9900"></el-rate>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="technician_name" label="技师" align="center">
                </el-table-column>
                <el-table-column prop="create_time" label="下单时间" align="center">
                </el-table-column>
                <el-table-column prop="back_booking_status" label="买家" align="center">
                </el-table-column>
            </el-table>
            <div class="page-box">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import breadcrumb from '@/components/common/address';

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
            selectValue: '',
            selectOptions: [
                { label: '订单编号', value: 1 },
                { label: '会员名', value: 2 },
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
            page: {
                size: 10,
                number: 1,
                total: 0
            },
            tableData: [
                {
                    'customer': '王太太',
                    'phone': '+86 12312311231',
                    'arrive_time': '2020-08-20 13:14:23',
                    'booking_id': '1696f79e4f4644fb85da200335049412',
                    'booking_no': '7897539745135',
                    'shop_id': '76679a29fc044b5a89f75c4f3768e56f',
                    'shop_name': '多多亲子一店',
                    'service_id': '1696f79e4f4644fb85da200335049412',
                    'service_name': '少儿精油',
                    'technician_id': '1696f79e4f4644fb85da200335049412',
                    'technician_name': '小花',
                    'source': '线下门店',
                    'source_type': 'shop',
                    'create_time': '2020-08-20 13:14:23',
                    'is_read': false,
                    'back_booking_status': '！这是一个待定参数！',
                    'warn_text': ['超时6天'],
                    value: 5
                },
                {
                    'customer': '王太太',
                    'phone': '+86 12312311231',
                    'arrive_time': '2020-08-20 13:14:23',
                    'booking_id': '1696f79e4f4644fb85da200335049412',
                    'booking_no': '7897539745135',
                    'shop_id': '76679a29fc044b5a89f75c4f3768e56f',
                    'shop_name': '多多亲子一店',
                    'service_id': '1696f79e4f4644fb85da200335049412',
                    'service_name': '少儿精油',
                    'technician_id': '1696f79e4f4644fb85da200335049412',
                    'technician_name': '小花',
                    'source': '线下门店',
                    'source_type': 'shop',
                    'create_time': '2020-08-20 13:14:23',
                    'is_read': false,
                    'back_booking_status': '！这是一个待定参数！',
                    'warn_text': [],
                    value: 3.5
                },
                {
                    'customer': '王太太',
                    'phone': '+86 12312311231',
                    'arrive_time': '2020-08-20 13:14:23',
                    'booking_id': '1696f79e4f4644fb85da200335049412',
                    'booking_no': '7897539745135',
                    'shop_id': '76679a29fc044b5a89f75c4f3768e56f',
                    'shop_name': '多多亲子一店',
                    'service_id': '1696f79e4f4644fb85da200335049412',
                    'service_name': '少儿精油',
                    'technician_id': '1696f79e4f4644fb85da200335049412',
                    'technician_name': '小花',
                    'source': '线下门店',
                    'source_type': 'shop',
                    'create_time': '2020-08-20 13:14:23',
                    'is_read': true,
                    'back_booking_status': '！这是一个待定参数！',
                    'warn_text': ['技师排版冲突'],
                    value: 4
                }
            ]
        };
    },
    methods: {
        handleClickDate(number) {
            if (number === 'all') {
                this.selectDate = '';
                return;
            }
            this.selectDate = getDateRange(number);
        },
        handleCurrentChange() {
        }
    }
};
</script>

<style lang="css" scoped>
.header-bar, .container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    border: 0;
}

.container {
    margin-top: 20px;
}

.header-bar .header-bar-search, .header-bar .header-bar-search .search-item {
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

.header-bar-date, .header-bar-appointment {
    padding-top: 18px;
    font-size: 14px;
}

.header-bar-date, .header-bar-appointment, .header-bar-appointment .appointment-item {
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