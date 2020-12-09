<template>
    <div>
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="GivingRights">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane :label="userNum" name="可使用">
                </el-tab-pane>
                <el-tab-pane :label="timeOutNum" name="已过期">
                </el-tab-pane>
                <el-tab-pane :label="userEnd" name="已用完"></el-tab-pane>
            </el-tabs>
            <div class="contentBox" v-if="activeName === '可使用(0)' || activeName === '可使用'">
                <div class="table">
                    <el-table
                            :data="useData"
                            style="width: 100%"
                            ref="multipleTable"
                    >
                        <el-table-column
                                prop="name"
                                label="权益"
                        >
                        </el-table-column>
                        <el-table-column
                                label="使用情况"
                        >
                            <template slot-scope="scope">
                                <div style="color: #999">赠送{{scope.row.time}}次</div>
                                <div style="color: #333">赠送{{scope.row.available_time}}次</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="deadline"
                                label="有效期"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="technician_name"
                                label="来源"
                        >
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                        >
                            <template slot-scope="scope">
                                <el-button type="text" @click="handleBilling">开单</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="contentBox" v-if="activeName === '已过期'">
                <div class="table">
                    <el-table
                            :data="overdueData"
                            style="width: 100%"
                            ref="multipleTable"
                    >
                        <el-table-column
                                prop="name"
                                label="权益"
                        >
                        </el-table-column>
                        <el-table-column
                                label="使用情况"
                        >
                            <template slot-scope="scope">
                                <div style="color: #999">赠送{{scope.row.time}}次</div>
                                <div style="color: #333">赠送{{scope.row.available_time}}次</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="deadline"
                                label="有效期"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="technician_name"
                                label="来源"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="technician_name"
                                label="获取日期"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="contentBox" v-if="activeName === '已用完'">
                <div class="table">
                    <el-table
                            :data="usedUpData"
                            style="width: 100%"
                            ref="multipleTable"
                    >
                        <el-table-column
                                prop="name"
                                label="权益"
                        >
                        </el-table-column>
                        <el-table-column
                                label="使用情况"
                        >
                            <template slot-scope="scope">
                                <div style="color: #999">赠送{{scope.row.time}}次</div>
                                <div style="color: #333">赠送{{scope.row.available_time}}次</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="deadline"
                                label="有效期"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="technician_name"
                                label="来源"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="deadline"
                                label="获取日期"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from '../../../api/index'
import breadcrumb from '../../common/address'
export default {
    name: 'GivingRights',
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
                    name: '赠送权益',
                }
            ],
            activeName: '可使用(0)',
            userNum: '可使用(0)',
            timeOutNum: '已过期(0)',
            userEnd: '已用完(0)',
            overdueData: [], //已过期
            usedUpData: [], //已用完
            useData: [], //userNum
            memberGiveServiceList: [],
        }
    },
    created () {
        this.member_id = this.$route.query.member_id;
        this.getMemberGiveServiced({ member_id: this.userId});
    },
    methods: {
        handleBilling () {
            console.log(this.userInfo);
            // this.$router.push({ path: '/workbench', query: { id: this.userInfo.member_id }})
            this.$alert('目前为会员id为假数据，如果用当前ID过去，后台没有对应id的会员');
            this.$router.push({ path: '/workbench', query: { id: '315728c141a1475680e6519d444a4314' }})
        },
        //4.3.1.会员详情-赠送权益
        async getMemberGiveServiced () {
            const { data } = await api.memberGiveService({ member_id: this.userId});
            data.forEach(m => {
                if (m.is_overdue === '1') {
                    this.overdueData.push(m);
                    console.log(this.overdueData);
                } else if (m.is_used_up === '1') {
                    this.usedUpData.push(m);
                } else {
                    this.useData.push(m);
                }});

                this.userEnd = '已用完(' + this.usedUpData.length +')';
                this.userNum = '可使用(' + this.useData.length +')';
                this.timeOutNum = '已过期(' + this.overdueData.length +')';
        },
    }
};
</script>

<style scoped>
.GivingRights{
    background: #fff;
    padding: 15px;
}
</style>
