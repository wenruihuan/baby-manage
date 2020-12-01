<template>
    <div class="billing">
        <div class="billing-content">
            <div class="tab-box">
                <div class="tabOperation">
                    <span @click="getLink(0)">充值</span>
                    <span @click="getLink(1)">开单</span>
                    <span class="active" @click="getLink(2)">开卡</span>
                </div>
                <div class="billing-tab-box">
                    <div class="billing-tab-box-content">
                        <div class="billing-tab-box-content-top">
                            <div class="tabOperation1">
                                <span :class="tabOperation === '0' ? 'active' : ''" @click="switchPage('0', 'time_card')">次卡</span>
                                <span :class="tabOperation === '1' ? 'active' : ''" @click="switchPage('1', 'recharge_card')">充值卡</span>
                                <span :class="tabOperation === '2' ? 'active' : ''" @click="switchPage('2', 'discount_card')">折扣卡</span>
                            </div>
                            <div class="">
                                <el-input
                                    v-model="selectValue"
                                    prefix-icon="el-icon-search"
                                    placeholder="输入卡项名称"
                                ></el-input>
                            </div>
                        </div>
                        <div class="billing-tab-box-content-bottom">
                            <div v-show="tabOperation === '0'" class="service-list service-list0 clearfix">
                                <div
                                     :class="item.selectState ? 'item active' : 'item'"
                                     @click="selectCardList(item, 'time_card')"
                                     v-for="item in listData.time_card"
                                >
                                    <div class="bg"><img :src="item.img" alt=""></div>
                                    <div class="info">
                                        <div class="name">
                                            <span>{{item.name}}</span>
                                            <span>{{}}次</span>
                                        </div>
                                        <div class="price">￥{{item.price}}</div>
                                        <div class="date">有效期：{{item.validity | validityFilter }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-show="tabOperation === '1'" class="service-list service-list1 clearfix">
                                <div
                                     :class="item.selectState ? 'item active' : 'item'"
                                     @click="selectCardList(item, 'discount_card')"
                                     v-for="item in listData.discount_card"
                                >
                                    <div class="bg"><img :src="item.img" alt=""></div>
                                    <div class="info">
                                        <div class="name">{{item.name}}1</div>
                                        <div class="price">￥{{item.price}}</div>
                                        <div class="date">有效期：{{item.validity | validityFilter }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-show="tabOperation === '2'" class="service-list service-list2 clearfix">
                                <div
                                     :class="item.selectState ? 'item active' : 'item'"
                                     @click="selectCardList(item, 'recharge_card')"
                                     v-for="item in listData.recharge_card"
                                >

                                    <div class="bg"><img :src="item.img" alt=""></div>
                                    <div class="info">
                                        <div class="name">
                                            <span>{{item.name}}</span>
                                            <span>{{}}次</span>
                                        </div>
                                        <div class="price">￥{{item.price}}</div>
                                        <div class="date">有效期：{{item.validity | validityFilter }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-box">
                <div class="message">
                    <span>消费明细({{checkedList.length}})</span>
                    <el-button @click="clearConsumeList">清空</el-button>
                </div>
                <div class="consume-list">
                    <div class="consume-item" v-for="item in checkedList">
                        <div>
                            <div class="close" @click="clearConsumeItem(item)"><i class="el-icon-close"></i></div>
                            <div class="row">
                                <div class="name">
                                    <span>{{item.name}}</span>
                                </div>
                                <el-input-number v-model="item.sort" :min="1" :max="10"></el-input-number>
                                <div class="price">
                                    <span>￥{{item.price * item.sort}}</span>
                                    <el-button @click="clearConsumeList">改价</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="" @click="cardDialogVisible = true">赠送服务</div>
                    <div class="consume-item consume-item1" v-for="item in giveCardDataList">
                        <div>
                            <div class="row">
                                <div class="name">
                                    <span>{{item.name}}</span>
                                </div>
                                <div class="info">
                                    <span>￥{{item.price}}</span>&nbsp;&nbsp;
                                    <div @click="clearGiveCardDataItem(item)">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="billing-bottom">
            <div class="billing-tab-page">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        right
                        :total="10">
                </el-pagination>
            </div>
            <div class="operation">
                <div class="item">
                    待收款：<span>￥{{totalMoney}}</span>
                </div>
                <div class="item">
                    <el-button @click="clearConsumeList">挂单</el-button>
                    <el-button type="primary" @click="getCashier">收款</el-button>
                </div>
            </div>
        </div>
        <el-dialog
            class="single-dialog"
            title="添加卡项"
            :visible.sync="cardDialogVisible"
            width="70%"
            :before-close="handleClose">
                <div class="contentBox">
                    <el-select
                        @change="getCardListFn"
                        v-model="cardSelectValue"
                    >
                        <el-option
                            v-for="item in cardDataList"
                            :label="item.name"
                            :value="item.value"
                        >
                            {{item.name}}
                        </el-option>
                    </el-select>
                    <div class="table" style="height: 300px;overflow-y: scroll;">
                        <el-table
                            ref="multipleTable"
                            :data="giveCardData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                label="卡项名称"
                            >
                                <template slot-scope="scope">
                                    <img :src="scope.row.img" width="50">
                                    {{ scope.row.name }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="价格"
                                width="120">
                                <template slot-scope="scope">{{ scope.row.price }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="create_time"
                                label="创建时间"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="cardDataTotal">
                        </el-pagination>
                </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="cardDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="cardDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '../../../api/index'
    export default {
        name: 'billing',
        data () {
            return {
                totalMoney: 0, // 代付款
                memberId: '', // 选中用户ID
                currentMemberInfo: {}, // 选中用户信息
                tabOperation: '0',
                type: 'time_card',
                state: '',
                cardSelectValue: 'time_card',
                cardDataTotal: 0,
                listData: {
                    time_card: [], //  time_card 次卡
                    discount_card: [], //  discount_card 折扣卡
                    recharge_card: []   //  recharge_card 储值卡
                },
                commonList: {
                    time_card: [], //  time_card 次卡
                    discount_card: [], //  discount_card 折扣卡
                    recharge_card: []   //  recharge_card 储值卡
                },
                checkedList: [], // 选中的所有数据
                giveCardData: [], //赠送卡列表
                selectValue: '',
                tabValue1: '',
                giveCardDataList: [],
                listNoPageData: [],
                consumeList: [],
                addServiceList: [],
                cardDataList: [
                    {
                        name: '次卡',
                        value: 'time_card'
                    },
                    {
                        name: '折扣卡',
                        value: 'discount_card'
                    }
                ],
                discountCardList: [],
                rechargeCardList: [],
                commonCardList: [],
                commonBoxSelectList: [],
                currentConsumeList: [],
                serviceKindList: [],
                serviceSelectList: [],
                boxSelectList: [],
                worktableOrderList: [],
                worktableMemberInfoList: [],
                worktableCommonServiceList: [],
                staffTechnicianValue: '',
                staffTechnicianSelectList: [],
                itemStaffTechnicianSelectList: [],
                currentStaffTechnicianSelectList: [],
                singleDialogVisible: false,
                cardDialogVisible: false,
                staffTechnicianDialogVisible: false,
            }
        },
        created () {
            this.getListData('discount_card');
            this.getListData('recharge_card');
            this.getListData('time_card');
            this.getCardListFn('time_card');
        },
        watch: {
            selectValue (value) {
                console.log(value);
                this.getListData('', value);
            },
            commonList: {
                handler () {
                    this.operationAllList();
                },
                immediate: true,
                deep: true
            },
            commonBoxSelectList () {
                this.operationConsumeList();
            },
        },
        filters: {
            validityFilter (item) {
                if (item > -1) {
                    return item + '天';
                } else {
                    return '永久有效';
                }
            }
        },
        methods: {
            // 切换页面
            switchPage (index, type) {
                this.tabOperation = index;
                this.type = type;
            },
            // 获取赠送卡列表
            async getCardListFn (value) {
                const { data }= await api.cardList({ type: value, keyword: ''});
                this.giveCardData = data.data;
                this.cardDataTotal = data.all_count;
            },
            handleSelectionChange (value) {
                this.giveCardDataList = value;
            },
            getCashier () {
                this.$router.push('/cashier');
            },
            // 选中卡时操作
            selectCardList (item, list) {
                item.selectState = !item.selectState;
                this.commonList[list] = this.listData[list].filter(m => {
                    if (m.selectState) {
                       return item;
                    };
                });
            },
            // 消费明细 及 待收款总额计算
            operationAllList () {
                this.totalMoney = 0;
                this.checkedList = this.commonList.time_card.concat(this.commonList.discount_card, this.commonList.recharge_card);
                this.checkedList.forEach((m) => {
                    this.totalMoney = m.price*1 + this.totalMoney;
                })
            },
            getListNoPageFn (value) {
                this.getListNoPage(this.tabOperation, this.type, value);
            },
            async getListData (type, keyword = '') {
                console.log(type);
                if (type !== '') {
                    this.type = type;
                } else {
                    type = this.type;
                }
                let params = {
                    type: this.type,
                    keyword: keyword
                };
                console.log(type);
                const { data } = await api.listNoPage(params);
                this.listData[type] = data.map(m => {
                    m.card_id = m.card_id + Math.random();
                    m.name = m.name + type;
                    m.sort = 1;
                    return m;
                });
                // this.listData[type] = data;
            },
            async getListNoPage (index, type, keyword = '1') {
                //  type
                //  time_card 次卡
                //  discount_card 折扣卡
                //  recharge_card 储值卡
                this.type = type;
                this.tabOperation = index;
                let params = {
                    type: type,
                    keyword: keyword
                };
                const { data } = await api.listNoPage(params);
                this.listNoPageData = data;
            },
            getServiceSelectList (item, index) {
                this.tabOperation2 = ('1' + index);
                this.getServiceSelectList1(item);
            },
            async getServiceSelectList1 (item) {
                const { data } = await api.serviceSelectList({ kind_id: item.id });
                this.serviceSelectList = data;
            },
            // 获取用户的所有充值卡
            async getWorktableMemberAllRechargeCard (member_id) {
                const { data } = await api.worktableMemberAllRechargeCard({ member_id: member_id});
                this.currentMemberInfo = { ...this.worktableMemberInfoList.filter(m => m.id === this.memberId )[0], userCard: data};
            },
            // 获取用户消费时可选权益
            async setWorktableRightSelect(id) {
                const { data } = await api.worktableRightSelect({ id: id });
                return data;
            },
            handleChange () {
                this.consumeList = [];
            },
            handleClose () {
                this.consumeList = [];
            },
            clearConsumeList () {
                this.consumeList = [];
            },
            // 选中包厢时操作
            handleBoxSelectList (item) {
                item.selectState = !item.selectState;
                this.commonBoxSelectList = this.boxSelectList.filter(m => {
                    if(m.selectState) {
                        return m;
                    };
                });
            },
            handleWorktableCommonServiceList (item) {
                let rightSelect = {};
                this.setWorktableRightSelect(item.id).then((res) => {
                    rightSelect = res;
                });
                this.commonCardList = this.worktableCommonServiceList.filter(m => {
                    if(m.selectState) {
                        m.rightSelect = rightSelect;
                        return m;
                    };
                });
            },
            // 包厢和服务选择时数组处理
            operationConsumeList () {
                this.consumeList = this.commonCardList.concat(this.commonBoxSelectList);
            },
            //删除选中明细
            clearConsumeItem (item) {
                this.consumeList.forEach((m, index) => {
                    if (item.id === m.id) {
                        this.consumeList.splice(index, 1);
                    }
                });
                this.worktableCommonServiceList.forEach((m) => {
                    if (item.id === m.id) {
                        item.selectState = false;
                    }
                });
            },
            //显示技师弹窗
            showStaffTechnicianDialogVisible () {
                this.staffTechnicianDialogVisible = true;
            },
            // 设置明细需要技师
            setStaffTechnician () {
                this.staffTechnicianDialogVisible = false;
                this.currentStaffTechnicianSelectList.forEach(m => {
                    this.staffTechnicianSelectList.forEach(n => {
                        if (m === n.id) {
                            this.itemStaffTechnicianSelectList.push(n)
                        }
                    })
                });
                this.currentStaffTechnicianSelectList = [];
            },
            // 确认赠送服务
            serviceSelectListConfirm () {
                this.addServiceList = this.$refs.multipleTable.selection;
                this.cardDialogVisible = false;
            },
            //删除选中赠送
            clearGiveCardDataItem (item) {
                this.giveCardDataList.forEach((m, index) => {
                    if (item.card_id === m.card_id) {
                        this.giveCardDataList.splice(index, 1);
                        // this.$foreceUpdate()
                    }
                });
            },
            getLink (index) {
                // this.$router.push(`/${link}`);
                this.$emit('getNum', index);
            },
        }
    };
</script>

<style scoped>
    .billing .billing-content{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .billing .billing-content:before{
        display: block;
        content: '';
        width: 1px;
        height: 100%;
        position: absolute;
        left: 50%;
        top: 0;
        background: #f8f8f8;
    }
    .billing .tabOperation{
        display: flex;
        border: 1px solid #ccc;
        height: 35px;
        width: 100%;
        margin-bottom: 20px;
    }
    .billing .tabOperation span{
        flex: 1;
        display: block;
        line-height: 35px;
        text-align: center;
        background: #fff;
        cursor: pointer;
    }
    .billing .tabOperation span.active{
        border: 1px solid #409EFF;
        background: #409EFF;
        color: #fff;
    }
    .billing .tab-box{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
        width: 49%;
    }
    .billing-tab-box{
        width: 100%;
    }
    .billing .billing-tab-box-content-top{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .billing .tabOperation1 span {
        margin-right: 10px;
        line-height: 32px;
        display: inline-block;
        cursor: pointer;
    }
    .billing .tabOperation1 span.active{
        border-bottom: 2px solid #409EFF;
    }
    .billing .billing-content .info-box{
        width: 49%;
        margin: 20px 0 0;
    }
    .billing .billing-content .info-box .message{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .billing .billing-content .info-box .consume-list {
        padding: 20px 0;
    }
    .billing .billing-content .info-box .consume-list .consume-item{
        background: #F7F8FA;
        padding: 30px 20px;
        position: relative;
        margin-bottom: 20px;
    }
    .billing .billing-content .info-box .consume-list .consume-item .close{
        position: absolute;
        cursor: pointer;
        right: 10px;
        top: 10px;
    }
    .billing .billing-content .info-box .consume-list .consume-item .row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .billing .billing-content .info-box .consume-list .consume-item .row-bottom{
        border-top: 1px solid #ccc;
        padding-top: 20px;
        margin-top: 20px;
    }
    .billing .billing-content .info-box .consume-list .consume-item .row .name span{
        font-size: 18px;
    }
    .billing .billing-content .info-box .consume-list .consume-item .row .price span{
        font-size: 18px;
        margin-right: 10px;
    }
    .billing .billing-content .info-box .consume-list .consume-item1 .row{
        display: flex;
        justify-content: space-between;
    }
    .billing .billing-content .info-box .consume-list .consume-item1 .row>div{
        display: flex;
        align-items: center;
    }
    .billing .billing-content .info-box .consume-list .consume-item .shuru{
        width: 50px;

    }
    .billing .billing-tab-box-content-bottom{
        display: flex;
        padding-top: 20px;
    }
    .billing .billing-tab-box-content-bottom .left-tab{
        width: 110px;
        margin-right: 15px;
    }
    .billing .billing-tab-box-content-bottom .left-tab span:hover,
    .billing .billing-tab-box-content-bottom .left-tab span.active{
        background: #409EFF;
        color: #fff;
    }
    .billing .billing-tab-box-content-bottom .left-tab a,
    .billing .billing-tab-box-content-bottom .left-tab span{
        display: block;
        line-height: 35px;
        background: #F7F8FA;
        text-indent: 15px;
        transition: 0.3s;
        cursor: pointer;
    }
    .billing .billing-content .consume-list {
        width: 100%;
        height: calc( 100vh - 390px);
        overflow-y: auto;
    }
    .billing .billing-tab-box-content-bottom .service-list{
        width: 100%;
        flex-wrap: wrap;
        height: calc( 100vh - 283px);
        overflow-y: auto;
    }
    .billing .billing-tab-box-content-bottom .service-list .item{
        background: #F7F8FA;
        position: relative;
        border: 1px solid #F7F8FA;
        width: 48%;
        float: left;
        transition: 0.3s;
        margin-bottom: 20px;
        padding: 20px;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 4%;
        overflow: hidden;
    }
    .billing .billing-tab-box-content-bottom .service-list .item .info{
        position: relative;
        z-index: 1;
        color: #fff;
    }
    .billing .billing-tab-box-content-bottom .service-list .item .info .name{
        display: flex;
        justify-content: space-between;
    }
    .billing .billing-tab-box-content-bottom .service-list .item .bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .billing .billing-tab-box-content-bottom .service-list0 .item .bg{
        background: -webkit-linear-gradient(left, #FFA78F, #FFA78F);
    }
    .billing .billing-tab-box-content-bottom .service-list1 .item .bg{
        background: -webkit-linear-gradient(top, #DFC698, #EDDCB9);
    }
    .billing .billing-tab-box-content-bottom .service-list2 .item .bg{
        background: -webkit-linear-gradient(left, #FFA78F, #FFA78F);
    }
    .billing .billing-tab-box-content-bottom .service-list .item .bg img{
        width: 100%;
        height: 100%;
        opacity: 0.3;
    }
    .billing .billing-tab-box-content-bottom .service-list .item:nth-child(2n) {
        margin-right: 0;
    }
    .billing .billing-tab-box-content-bottom .service-list .item.active{
        background: #409EFF;
        border: 1px solid #409EFF;
        color: #fff;
    }
    .billing .billing-tab-box-content-bottom .service-list .item .price{
        color: #F725B4;
        margin-top: 10px;
    }
    .single-dialog .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .single-dialog .list .item {
        width: 23.5%;
        background: #F7F8FA;
        border-radius: 3px;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    .billing .billing-bottom{
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #f8f8f8;
    }

    .billing .billing-bottom .billing-tab-page{
        text-align: right;
        width: 50%;
        box-sizing: border-box;
        padding: 20px;
    }
    .billing .billing-bottom .operation{
        display: flex;
        justify-content: space-between;
        width: 50%;
        box-sizing: border-box;
        border-left: 1px solid #f8f8f8;
        padding: 20px;
    }
    ::-webkit-scrollbar {
        width: 14px;
        height: 14px;
    }

    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-thumb {
        border-radius: 999px;
        border: 5px solid transparent;
    }

    ::-webkit-scrollbar-track {
        box-shadow: 1px 1px 5px rgba(0,0,0,.2) inset;
    }

    ::-webkit-scrollbar-thumb {
        min-height: 20px;
        background-clip: content-box;
        box-shadow: 0 0 0 5px rgba(0,0,0,.2) inset;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
</style>
