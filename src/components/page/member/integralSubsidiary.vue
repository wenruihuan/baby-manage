<template>
    <div class="integralSubsidiary">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane :label="userNum" name="可使用"></el-tab-pane>
            <el-tab-pane :label="timeOutNum" name="已过期"></el-tab-pane>
            <el-tab-pane :label="userEnd" name="已用完">
                <div class="table">
                    <el-table
                            :data="memberRateList"
                            style="width: 100%"
                            ref="multipleTable"
                    >
                        <el-table-column
                                prop="service_name"
                                label="商品"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="order_no"
                                label="订单编号"
                        >
                        </el-table-column>
                        <el-table-column
                                width="250"
                                prop="create_time"
                                label="评分"
                        >
                            <template slot-scope="scope">
                                <div class="item" style="display: flex"><el-rate v-model="valueDemo" disabled></el-rate></div>
                                <div class="item" style="display: flex">
                                    <span>门店环境：</span><el-rate v-model="scope.row.shop_rate" disabled></el-rate>
                                </div>
                                <div class="item" style="display: flex">
                                    <span>技师服务：</span><el-rate v-model="scope.row.service_rate" disabled></el-rate>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="technician_name"
                                label="技师"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="arrive_time"
                                label="下单时间"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="buyer_name"
                                label="买家"
                        >
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            class="alignRight"
                            :page-size="20"
                            background
                            layout="total, prev, pager, next, jumper"
                            :total="all_count2"
                            @current-change="handleCurChange1"
                    ></el-pagination>

                </div>
            </el-tab-pane>

        </el-tabs>
        <div class="contentBox">
            <div class="table">
                <el-table
                        :data="orderTableData"
                        style="width: 100%"
                        ref="multipleTable"
                >
                    <el-table-column
                            prop="order_no"
                            label="权益"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="使用情况"
                    >
                        <template slot-scope="scope">
                            <div v-if="Array.isArray(scope.row.service)" class="item">
                                <div class="item" v-for="item in scope.row.service">
                                    {{item.service_name}}
                                </div>
                            </div>
                            <div v-else>{{scope.row.service}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="service"
                            label="来源"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="technician_name"
                            label="获取日期"
                    >
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text">查看订单</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="alignRight"
                        :page-size="20"
                        background
                        layout="total, prev, pager, next, jumper"
                        :total="all_count1"
                        @current-change="handleCurChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '../../../api/index'
    export default {
        name: 'integralSubsidiary',
        data () {
            return {
                activeName: '',
                userNum: '可使用(0)',
                timeOutNum: '已过期(0)',
                userEnd: '已用完(0)',
                memberGiveServiceList: [],
            }
        },
        created () {
            this.member_id = this.$route.query.member_id;
            this.getMemberGiveServiced({ member_id: this.userId});
        },
        methods: {
            //4.3.1.会员详情-赠送权益
            async getMemberGiveServiced () {
                const { data } = await api.memberGiveService({ member_id: this.userId});
                this.memberGiveServiceList = data;
            },
        }
    };
</script>

<style scoped>

</style>
