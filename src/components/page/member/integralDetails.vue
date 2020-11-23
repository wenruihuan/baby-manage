<template>
    <div>
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="integral">
            <div class="info">
                <div class="item">
                    <p class="name">可使用积分</p>
                    <p class="value">{{available_point}}</p>
                </div>
                <div class="item">
                    <p class="name">总积分</p>
                    <p class="value">{{total_point}}</p>
                </div>
                <div class="item">
                    <p class="name">已消耗积分</p>
                    <p class="value">{{total_point - available_point}}</p>
                </div>
            </div>
            <div class="table">
                <el-table
                        :data="integralDetails.data"
                        style="width: 100%"
                        ref="multipleTable"
                >
                    <el-table-column
                            prop="change"
                            label="明细"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="下单时间"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="way"
                            label="途径"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="变更时间"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="operator"
                            label="操作人"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="备注"
                    >
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="alignRight"
                        :page-size="20"
                        background
                        layout="total, prev, pager, next, jumper"
                        :total="all_count"
                        @current-change="handleCurChange"
                ></el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
import * as api from '../../../api/index'
import breadcrumb from '../../common/address'
export default {
    name: 'integralDetails',
    components: {
        breadcrumb
    },
    data () {
        return {
            // 面包屑信息
            breadcrumbList: [
                {
                    name: '会员列表',
                    router: 'memberList'
                },
                {
                    name: '会员详情',
                },
                {
                    name: '积分明细',
                    router: 'integralDetails'
                }
            ],
            integralDetails: {},
            available_point: '',
            all_count: 0,
            page_no: 1,
            total_point: ''
        }
    },
    created() {
        this.available_point = this.$route.query.available_point;
        this.total_point = this.$route.query.total_point;
        this.getIntegralDetails();
    },
    methods: {
        async getIntegralDetails () {
            let params = {
                page_size: 10,
                page_no: this.page_no
            };
            const { data } = await api.memberIntegralList(params);
            this.integralDetails = data;
            this.all_count = data.all_count;
        },
        // 分页方法
        handleCurChange(page) {
            this.page_no = page;
            this.getIntegralDetails();
        }
    }
};
</script>

<style scoped>
    .integral {
        padding: 30px;
        background: #fff;
        border-radius: 10px;
    }
    .integral .info{
        display: flex;
        margin-bottom: 20px;
    }
    .integral .info .item .name{
        color: #989898;
    }
    .integral .info .item .value{
        color: #333333;
        margin-top: 10px;
        font-size: 26px;
    }
    .integral .info .item{
        width: 33.3%;
        text-align: center;
    }
</style>
