<template>
    <div class="messageDetails">
        <div class="top">
            <div class="user_info">
                <div class="pic"><img :src="userInfo.head_img" width="63" height="63"></div>
                <div class="info">
                    <p class="name">{{userInfo.name}} <span class="el-icon-edit edit" @click="showMemberdialogVisible(userInfo)">编辑</span></p>
                    <p class="level">{{userInfo.level_name}}</p>
                </div>
            </div>
            <div class="operation">
                <el-button>健康档案{{userInfo.id}}</el-button>
                <el-button>预约</el-button>
                <el-button>开单</el-button>
            </div>
        </div>
        <div class="box1 clearfix">
            <div class="col"><span>联系电话：</span><i>+86 12312332123</i></div>
            <div class="col"><span>归属门店：</span><i>多多亲子岁月一店</i></div>
            <div class="col"><span>生日：</span><i>1990-09-09</i></div>
            <div class="col"><span>客户编号：</span><i>123123</i></div>
            <div class="col"><span>健康管理师：</span><i>王亚亚</i></div>
        </div>
        <div class="box2">
            <div class="item">
                <div class="info-title">消费数据</div>
                <div class="contentBox">
                    <div class="col"><span>累计消费总额（元）</span><i>1110.94</i></div>
                    <div class="col"><span>总消费次数</span><i>4</i></div>
                    <div class="col"><span>最近消费时间</span><i>2020.08.20</i></div>
                </div>
            </div>
            <div class="item">
                <div class="info-title">客户标签</div>
                <div class="contentBox">
                    <div class="addBox" @click="isShowCommonTag = true">
                        <span class="el-icon-plus">编辑标签</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="box3">
            <div class="left">
                <img src="../../../assets/img/alipay.png" alt="">
                待服务预约
            </div>
            <div class="right">
                <router-link to="/AppointmentList">{{userInfo.booking_count}}条预约待处理 <i class="el-icon-arrow-right"></i></router-link>
            </div>
        </div>
        <div class="box4">
            <div class="info">
                <div class="list">
                    <div
                        :class="box4State === 0 ? 'active item' : 'item'"
                        @click="box4State = 0"
                    >
                        <p>卡项</p>
                        <p>2</p>
                    </div>
                    <div
                        :class="box4State === 1 ? 'active item' : 'item'"
                        @click="box4State = 1"
                    >
                        <p>赠送权益</p>
                        <p>1</p>
                    </div>
                    <div
                        :class="box4State === 2 ? 'active item' : 'item'"
                        @click="box4State = 2"
                    >
                        <p>积分</p>
                        <p>1111</p>
                    </div>
                </div>
                <div>
                    <div v-if="box4State === 0">
                        <span>卡项状态：</span>
                        <el-select  class="width200" v-model="carstate" placeholder="">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="使用中" value="使用中"></el-option>
                            <el-option label="" value="已失效"></el-option>
                        </el-select>
                    </div>
                    <div v-if="box4State === 1">
                        <a href="#">查看全部 <i class="el-icon-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <div class="contentBox">
                <div class="item"
                     v-if="box4State === 0"
                     v-for="item in memberCardList"
                     :key="item.card_id"
                >
                    <div class="pic">
                        <img :src="item.img">
                    </div>
                    <div>
                        <p class="info">
                            <span>{{item.card_name}}</span>
                            <i v-if="item.available_time">{{item.available_time}}次</i>
                        </p>
                        <p class="price">￥{{item.balance}}</p>
                        <p class="time">有效期：{{item.expires}}</p>
                    </div>
                </div>
                <div class="item item1"
                     v-if="box4State === 1"
                     v-for="item in memberGiveServiceList"
                     :key="item.card_id"
                >
                    <p class="bg" v-if="item.is_overdue === '1'">已过期</p>
                    <p class="bg" v-if="item.is_used_up === '1'">已用完</p>
                    <div class="pic">
                        <img :src="item.img">
                    </div>
                    <div>
                        <p class="info">
                            <span>{{item.name}}</span>
                            <i v-if="item.available_time">{{item.available_time}}次</i>
                        </p>
                        <p class="used">
                            <span>使用情况：剩余{{item.available_time}}次</span>
                            <span>x{{item.time}}</span>
                        </p>
                        <p class="time">
                            <span>有效期：{{item.deadline}}</span>
                            <span>开单赠送</span>
                        </p>
                    </div>
                </div>
                <div class="item item2"
                     v-if="box4State === 2"
                >
                    <div class="box">
                        <p>可使用积分</p>
                        <p>
                            <span>1110</span>
                            <el-popover
                                    placement="bottom"
                                    width="400"
                                    trigger="click">
                                <div class="popoverBox">
                                    <div class="item">
                                        <div><span>增减积分：</span></div>
                                        <div>
                                            <el-radio-group v-model="radio">
                                                <el-radio :label="1">加 <el-input class="width85"></el-input>积分</el-radio><br>
                                                <el-radio :label="2">减 <el-input class="width85"></el-input>积分</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div><span>备注：</span></div>
                                        <div>
                                            <el-input type="textarea" ></el-input>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <el-button>取消</el-button>
                                        <el-button type="primary">确认</el-button>
                                    </div>
                                </div>
                                <el-button style="background: none; border: 0; color: #409EFF;" slot="reference">增减积分</el-button>
                            </el-popover>
                        </p>
                    </div>
                    <div class="box">
                        <p>总积分</p>
                        <p>3330</p>
                    </div>
                    <div class="box">
                        <p>已消耗积分</p>
                        <p>3330</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="box5">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="交易记录" name="交易记录">
                    <div class="row">
                        <div class="item">
                            <span>订单类型：</span>
                            <el-select v-model="currentOrderType">
                                <el-option
                                    v-for="(item, index) in orderType"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="item">
                            <span>订单类型：</span>
                            <el-select v-model="currentOrderStatus">
                                <el-option
                                    v-for="(item, index) in orderStatus"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="table">

                        <el-table
                            :data="orderTableData"
                            style="width: 100%"
                            ref="multipleTable"
                        >
                            <el-table-column
                                prop="order_no"
                                label="订单编号"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="create_time"
                                label="下单时间"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="service"
                                label="商品"
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
                                prop="technician_name"
                                label="技师"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="pay_type_name"
                                label="订单来源"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="shop_name"
                                label="下单门店"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="price"
                                label="单价（元）"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="count"
                                label="数量"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="total_price"
                                label="订单金额（元）"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="order_status"
                                label="状态"
                                :formatter="orderTypeFn"
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
                                class="page-ctner"
                                :page-size="20"
                                background
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="all_count1"
                                :page-sizes="[20]"
                                @current-change="handleCurChange"
                        ></el-pagination>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="评价" name="评价">配置管理</el-tab-pane>
            </el-tabs>
        </div>

        <!--新增标签-->
        <common-tag
            v-if="isShowCommonTag"
        ></common-tag>
        <!--v-if="isShowCommonTag"-->
        <el-dialog
                title="新增会员"
                :visible.sync="memberdialogVisible"
                width="50%">
            <user-info ref="ruleForm"></user-info>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelMemberdialogVisible">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import userInfo from './common/userInfoDialog'
import commonTag from './common/commonTag'
import * as api from '../../../api/index'
export default {
    name: 'memberList',
    data () {
        return {
            radio: 1,
            activeName: '交易记录',
            currentOrderType: '',
            page_no1: 1,
            page_no2: 1,
            all_count1: 0,
            all_count2: 0,
            currentOrderStatus: '',
            orderStatus: [
                {
                    label: '待付款',
                    value: '0'
                },
                {
                    label: '待发货',
                    value: '1'
                },
                {
                    label: '已发货',
                    value: '2'
                },
                {
                    label: '已完成',
                    value: '3'
                },
                {
                    label: '已退款',
                    value: '4'
                },
                {
                    label: '已取消',
                    value: '5'
                },
            ],
            orderType: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '服务',
                    value: 'service'
                },
                {
                    label: '折扣卡',
                    value: 'discount_card'
                },
                {
                    label: '次卡',
                    value: 'time_card'
                },
                {
                    label: '充值卡',
                    value: 'recharge_card'
                },
                {
                    label: '充值卡充值',
                    value: 'recharge'
                },
            ],
            columnCfg: [
                {label: '订单编号', prop: 'order_no'},
                {label: '下单时间', prop: 'create_time'},
                {label: '商品', prop: 'service'},
                {label: `技师`, prop: ''},
                {label: '订单来源', prop: 'pay_type_name'},
                {label: '下单门店', prop: 'shop_name'},
                {label: '单价（元）', prop: ''},
                {label: '数量', prop: 'count'},
                {label: '订单金额（元）', prop: 'total_price'},
                {label: '状态', prop: 'order_status'},
            ],
            carstate: '全部',
            isShowCommonTag: false,
            memberdialogVisible: false,
            userId: '',
            orderTableData: [],
            box4State: 2,
            userInfo: {},
            memberCardList: [],
            memberIntegral: {},
            memberGiveServiceList: [],
        }
    },
    components: {
        userInfo,
        commonTag
    },
    created() {
        this.userId = this.$route.query.id;
        this.getUserInfoBox();
        this.getMemberCard();
        this.getMemberGiveServiced();
        this.getMemberIntegralList();
        this.getMemberOrder();
    },
    methods: {
        orderTypeFn (item) {
            if (item.order_status === 0) {
                return '待付款';
            } else if (item.order_status === 1) {
                return '待发货';
            } else if (item.order_status === 2) {
                return '已发货';
            } else if (item.order_status === '3') {
                return '已完成';
            } else if (item.order_status === '4') {
                return '已退款';
            } else if (item.order_status === '5') {
                return '已取消';
            }
        },
        //4.3.3.会员详情
        async getUserInfoBox () {
            const { data } = await api.memberDetail({ id: this.userId});
            this.userInfo = data;
        },
        //4.3.4.会员详情-卡项列表
        async getMemberCard () {
            const { data } = await api.memberCard({ member_id: this.userId});
            this.memberCardList = data;
        },
        //4.3.9.会员-交易记录
        async getMemberOrder () {
            let params = {
                page_size: 10,
                page_no: this.page_no1,
                type: this.currentOrderType,
                order_status: this.currentOrderStatus,
            };
            const { data } = await api.memberOrder(params);
            this.orderTableData = data.data;
            this.all_count1 = data.all_count;
        },
        //4.3.6.会员详情-积分明细
        async getMemberIntegralList () {
            const { data } = await api.memberIntegralList({ member_id: this.userId});
            this.memberIntegralList = data;
        },
        //4.3.1.会员详情-赠送权益
        async getMemberGiveServiced () {
            const { data } = await api.memberGiveService({ member_id: this.userId});
            this.memberGiveServiceList = data;
        },
        showMemberdialogVisible() {
            this.memberdialogVisible = true;
        },
        async getBookingReadState () {
            const { data } = await api.bookingReadState();
        },
        // 新增会员
        submitForm (value) {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    const { data } = await api.memberSave();
                    this.memberdialogVisible = false;
                }
            })
        },
        // 取消新增会员
        cancelMemberdialogVisible (value) {
            this.memberdialogVisible = false;
        }
    }
};
</script>

<style scoped>
.messageDetails {}
.messageDetails .top{
    background: #F5EADF;
    padding: 20px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.messageDetails .top .user_info{
    display: flex;
    align-items: center;
}
.messageDetails .top .user_info .pic{
    width: 63px;
    height: 63px;
    margin-right: 20px;
    overflow: hidden;
    border-radius: 100%;
    background: #fff;
}
.messageDetails .top .user_info .name{
    color: #fff;
    font-size: 16px;
}
.messageDetails .top .user_info .level{
    background: #E9DFD5;
    border-radius: 30px;
    padding: 0 10px;
    line-height: 30px;
    color: #FFF;
    margin-top: 15px;
}
.messageDetails .top .user_info .edit{
    color: #409EFF;
    cursor: pointer;
    font-size: 12px;
}
.messageDetails .box1{
    background: #fff;
    padding: 0px 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.messageDetails .box1 .col{
    width: 33.3%;
    margin: 10px 0;
    float: left;
}
.messageDetails .box1 .col span{
    height: 20px;
    font-weight: 400;
    font-style: normal;
    color: #D9D9D9;
}
.messageDetails .box1 .col i{
    font-style: normal;
    color: #666666;
}
.messageDetails .box2{
    display: flex;
    background: #fff;
    margin-bottom: 20px;
}
.messageDetails .box2 .item{
    width: 50%;
    padding: 20px 50px;
}
.messageDetails .box2 .info-title{
    background: #fff;
    padding-left: 15px;
}
.messageDetails .box2 .info-title::before{
    left: 0;
}
.messageDetails .box2 .contentBox{
    display: flex;
}
.messageDetails .box2 .contentBox .col{
    flex: 1;
}
.messageDetails .box2 .contentBox .col i{
    font-style: normal;
    font-size: 18px;
    margin-top: 20px;
    display: block;
}
.messageDetails .box2 .contentBox .col span{
    display: block;
    text-align: left;
    font-size: 12px;
    color: #D9D9D9;
}
.messageDetails .box2 .contentBox .addBox{
    height: 60px;
    width: 100%;
    border: 1px dashed #D9D9D9;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.messageDetails .box3 {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    height: 63px;
    padding: 0 15px;
}
.messageDetails .box3 .left{
    display: flex;
    align-items: center;
}
.messageDetails .box3 .left img{
    width: 28px;
    height: 28px;
}
.messageDetails .box4 {
    background: #fff;
    padding: 15px 30px;
    margin-bottom: 20px;
}
.messageDetails .box4 .info{
    display: flex;
    justify-content: space-between;
}
.messageDetails .box4 .info .list{
    display: flex;
}
.messageDetails .box4 .info .list .item{
    margin: 0 10px;
    cursor: pointer;
    text-align: center;
}
.messageDetails .box4 .info .list .item.active p{
    color: #409EFF;
}
.messageDetails .box4 .info .list .item p{
    line-height: 25px;
}
.messageDetails .box4 .contentBox{
    display: flex;
    margin-top: 20px;
}
.messageDetails .box4 .contentBox .item{
    margin-right: 20px;
    margin-bottom: 20px;
    width: 320px;
    height: 150px;
    background: #FFA198;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    color: #fff;
    position: relative;
    overflow: hidden;
}
.messageDetails .box4 .contentBox .item1{
    color: #333;
    background: #F7F8FA;
    height: 125px;
}
.messageDetails .box4 .contentBox .item1 .bg{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    top: 0;
    left: 0;
    z-index: 3;
    background: rgba(0,0,0, 0.7);
    font-size: 14px;
}
.messageDetails .box4 .contentBox .item div{
    position: relative;
    z-index: 2;
}
.messageDetails .box4 .contentBox .item .pic{
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.messageDetails .box4 .contentBox .item1 .info{
    margin-bottom: 15px;
}
.messageDetails .box4 .contentBox .item1 .used{
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
}
.messageDetails .box4 .contentBox .item1 .time{
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
}

.messageDetails .box4 .contentBox .item2{
    width: 100%;
    background: #F7F8FA;
    display: flex;
    color: #333;
    height: 100px;
}
.messageDetails .box4 .contentBox .item2>div{
    width: 33.3%;
    text-align: center;
}
.messageDetails .box4 .contentBox .item2>div:first-child{
    border-right: 1px solid #ccc;
}
.messageDetails .box5 {
    background: #fff;
    padding: 15px;
}
</style>
