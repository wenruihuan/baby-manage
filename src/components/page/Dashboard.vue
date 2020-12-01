<template>
    <div class="Dashboard">
        <div class="banner">
            <img src="../../assets/img/Group-yycg.png" alt="">
        </div>
        <div class="common-box">
            <div class="title">
                今日数据
            </div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-card class="item_card" shadow="hover">
                        <div class="grid-content grid-con-1">
                            <i><img src="../../assets/img/ic_account_balance_wallet.png" alt=""></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">实际收款金额</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_total_turnover}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_total_turnover}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="item_card" shadow="hover">
                        <div class="grid-content grid-con-1">
                            <i><img src="../../assets/img/ic_account_balance_wallet.png" alt=""></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">成交客户数</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_actual_collection}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_actual_collection}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="item_card" shadow="hover">
                        <div class="grid-content grid-con-2">
                            <i><img src="../../assets/img/ic_person_add.png" alt=""></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">新增客户数</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_actual_order}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_actual_order}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="item_card" shadow="hover">
                        <div class="grid-content grid-con-3">
                            <i><img src="../../assets/img/ic_assignment_turned_in.png" alt=""></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">今日订单数</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_actual_customer}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_actual_customer}}</div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <!--<schart v-if="indexData !== {}" ref="bar" class="schart" canvasId="bar" :options="options"></schart>-->
                    <div class="item_card" id="chart"></div>
                </el-col>
                <el-col :span="6">
                    <el-card class="item_card" shadow="hover">
                        <div class="grid-content grid-con-2">
                            <i><img src="../../assets/img/ic_account_balance_walletcopy.png" alt=""></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">新增会员数</div>
                            </div>
                        </div>
                        <div class="t-data-value">{{indexData.today_new_member}}</div>
                        <div class="y-data-value">昨日：{{indexData.yesterday_new_member}}</div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="item_card" shadow="hover">
                        <div class="grid-content grid-con-3">
                            <i><img src="../../assets/img/ic_account_balance_walletcopy(1).png" alt=""></i>
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

        <div class="common-box common-box1">
            <div class="title">
                常用功能
            </div>
            <el-row :gutter="20">

                <el-col :span="6">
                    <el-card class="item_card item_card1" shadow="hover">
                        <div class="grid-content grid-con-3">
                            <div>
                                <i><img src="../../assets/img/Rectangle.png" alt=""></i>
                                <div class="name"><router-link :to="{path: '/workbench', query:{ operationState: 'billing' }}">快速开单</router-link></div>
                            </div>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="6">
                    <el-card class="item_card item_card1" shadow="hover">
                        <div class="grid-content grid-con-3">
                            <div>
                                <i><img src="../../assets/img/Rectangle(3).png" alt=""></i>
                                <div class="name"><router-link :to="{path: '/workbench', query:{ operationState: 'activateCard' }}">快速开卡</router-link></div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="item_card item_card1" shadow="hover">
                        <div class="grid-content grid-con-3">
                            <div>
                                <div class="pic"><img src="../../assets/img/Rectangle(1).png" alt=""></div>
                                <div class="name"><router-link :to="{path: '/AppointmentList'}">新增预约</router-link></div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="item_card item_card1" shadow="hover">
                        <div class="grid-content grid-con-3">
                            <div>
                                <div class="pic"><img src="../../assets/img/Rectangle(2).png" alt=""></div>
                                <div class="name"><router-link :to="{path: '/memberList'}">新增会员</router-link></div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
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
        getChart () {
            let myChart = this.$echarts.init(document.getElementById('chart'));
            // 绘制图表
            let option = {
                xAxis: {
                    type: 'category',
                    data: ['服务', '卡项', '产品'],
                    color: [ 'red', 'blue']
                },
                yAxis: {
                    type: 'value',
                    axisLine: {show:false},
                },
                series: [{
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: [this.indexData.today_service, this.indexData.today_card, this.indexData.today_goods],
                    itemStyle:{
                        normal:{
                            color:function(params){
                                var colorlist = ['#FF9C9C','#D5B783','#8EA8ED'];
                                return colorlist[params.dataIndex];
                            }
                        }
                    },
                    type: 'bar'
                }]
            };
            myChart.setOption(option);
        },
        // 获取首页数据
        async getHomeIndex () {
            const { data } = await api.homeIndex();
            this.indexData = data;
            this.options.datasets[0].data = [this.indexData.today_service, this.indexData.today_card, this.indexData.today_goods];
            this.getChart();
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
    .item_card1 .grid-content{
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        justify-content: center;
        height: 180px;
    }
    .item_card1 .grid-content .name a{
        font-size: 18px;
        color: #26292F;
        display: block;
        margin-top: 10px;
    }
    .item_card1 .grid-content i{
        width: 100%;
    }

.el-row {
}

.grid-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}

.grid-cont-right {
    text-align: center;
    font-size: 14px;
    color: #999;
    margin-left: 10px;
}

.grid-num {
    color: #26292F;
    font-size: 18px;
}
#chart{
    height: 260px;
    width: 100%;
}
.grid-con-icon {
    font-size: 30px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
}

/*.grid-con-1 .grid-con-icon {*/
    /*background: rgb(45, 140, 240);*/
/*}*/

/*.grid-con-1 .grid-num {*/
    /*color: rgb(45, 140, 240);*/
/*}*/

/*.grid-con-2 .grid-con-icon {*/
    /*background: rgb(100, 213, 114);*/
/*}*/

/*.grid-con-2 .grid-num {*/
    /*color: rgb(45, 140, 240);*/
/*}*/

/*.grid-con-3 .grid-con-icon {*/
    /*background: rgb(242, 94, 67);*/
/*}*/

/*.grid-con-3 .grid-num {*/
    /*color: rgb(242, 94, 67);*/
/*}*/

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
    color: #26292F;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 30px;
}
.t-data-value{
    text-align: center;
    font-size: 50px;
    padding: 15px 0;
}
.y-data-value{
    text-align: center;
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
.common-box1{
    padding-top: 0;
}
.el-card{
    transition: 0.3s;
    cursor: pointer;
}
.el-card:hover{
    background: #F3F5F7;
}
</style>
