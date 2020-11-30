<template>
    <div class="Dashboard">
        <div class="banner">
            <img src="../../assets/img/banner_pic.png" alt="">
        </div>
        <div class="common-box">
            <div class="title">
                今日数据
            </div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-1">
                            <i class="el-icon-lx-rechargefill grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">实际收款金额</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_total_turnover}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_total_turnover}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-1">
                            <i class="el-icon-lx-people grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">成交客户数</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_actual_collection}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_actual_collection}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-2">
                            <i class="el-icon-lx-group grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">新增客户数</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_actual_order}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_actual_order}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-3">
                            <i class="el-icon-lx-edit grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">今日订单数</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_actual_customer}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_actual_customer}}</div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <schart v-if="indexData !== {}" ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-2">
                            <i class="el-icon-lx-group grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">新增会员数</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_new_member}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_new_member}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-3">
                            <i class="el-icon-lx-edit grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">新增开卡充值</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_new_recharge_card}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_new_recharge_card}}</div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div class="common-box">
            <div class="title">
                常用功能
            </div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="item">
                        <div class="pic"><img src="../../assets/img/alipay.png" alt="" width="30"></div>
                        <div class="name"><router-link :to="{path: '/workbench', query:{ operationState: 'billing' }}">快速开单</router-link></div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item">
                        <div class="pic"><img src="../../assets/img/alipay.png" alt="" width="30"></div>
                        <div class="name"><router-link :to="{path: '/workbench', query:{ operationState: 'activateCard' }}">快速开卡</router-link></div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item">
                        <div class="pic"><img src="../../assets/img/alipay.png" alt="" width="30"></div>
                        <div class="name"><router-link :to="{path: '/AppointmentList'}">新增预约</router-link></div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="item">
                        <div class="pic"><img src="../../assets/img/alipay.png" alt="" width="30"></div>
                        <div class="name"><router-link :to="{path: '/memberList'}">新增会员</router-link></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import * as api from '../../api/index'
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            indexData: {
                today_total_turnover: '',
                yesterday_total_turnover: '',
                today_actual_collection: '',
                yesterday_actual_collection: '',
                today_actual_order: '',
                yesterday_actual_order: '',
                today_actual_customer: '',
                yesterday_actual_customer: '',
                today_new_member: '',
                yesterday_new_member: '',
                today_new_recharge_card: '',
                yesterday_new_recharge_card: '',
                today_service: '',
                today_card: '',
                today_goods: ''
            },
            name: localStorage.getItem('ms_username'),
            options: {
                type: 'bar',
                // xRorate: 25,
                labels: ['服务', '卡项', '产品'],
                datasets: [
                    {
                        data: [0, 0, 0]
                    }
                ]
            }
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    created() {
        // this.handleListener();
        // this.changeDate();
        this.getHomeIndex()
    },
    deactivated() {
        window.removeEventListener('resize', this.renderChart);
        bus.$off('collapse', this.handleBus);
    },
    methods: {
        // 获取首页数据
        async getHomeIndex () {
            const { data } = await api.homeIndex();
            this.indexData = data;
            this.options.datasets[0].data = [this.indexData.today_service, this.indexData.today_card, this.indexData.today_goods];
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
    }
};
</script>


<style scoped>
.el-row {
}

.grid-content {
    display: flex;
    align-items: center;
    height: 50px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    text-align: left;
    font-size: 16px;
    text-indent: 30px;
}

.grid-con-icon {
    font-size: 30px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

.banner{
    width: 100%;
}
.banner img{
    width: 100%;
}
.common-box .el-row .el-col{
    margin-bottom: 30px;
}
.common-box{
    background: #fff;
    padding: 30px 15px 0;
}
.common-box .title{
    font-size: 16px;
    color: #333;
    margin-bottom: 30px;
}
.t-data-value{
    text-indent: 80px;
    font-size: 50px;
}
.y-data-value{
    text-indent: 80px;
    font-size: 20px;
    padding-bottom: 20px;
}
.common-box .item{
    display: flex;
    align-items: center;
}
.common-box .item .pic{
    margin-right: 20px;
}
.common-box .item .name{
    font-size: 16px;
    color: #333;
}
</style>
