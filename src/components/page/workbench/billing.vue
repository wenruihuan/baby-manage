<template>
    <div class="billing">
        <div class="billing-top">
            <div v-if="!currentMemberInfo.id" class="unUser">
                <div class="left">
                    <el-select
                        v-model="memberId"
                        filterable
                        placeholder="请选择"
                        remote
                        :remote-method="getWorktableMemberInfo"
                        @change="getWorktableMemberAllRechargeCard(memberId)"
                    >
                        <el-option
                            v-for="item in worktableMemberInfoList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="right">
                    <div>
                        <el-button icon="el-icon-plus" type="primary">添加新会员</el-button>
                    </div>
                    <div>
                        <el-button type="primary" icon="el-icon-document" @click="singleDialogVisible = true">取单</el-button>
                        <el-button >关闭</el-button>
                    </div>
                </div>
            </div>
            <div v-if="currentMemberInfo.id" class="user">
                <div class="item item1">
                    <i @click="reselectUser" class="el-icon-close"></i>
                    <img :src="currentMemberInfo.head_img">
                    <div>
                        <p>{{currentMemberInfo.name}}</p>
                        <p>
                            {{currentMemberInfo.phone}}
                        </p>
                    </div>
                </div>
                <div class="item">
                    <div>
                        <p>
                            {{currentMemberInfo.userCard.length}}</p>
                        <p>
                            持有卡项
                        </p>
                    </div>
                </div>
                <div class="item">
                    <div>
                        <p>
                            {{currentMemberInfo.total_buy}}</p>
                        <p>
                            累计消费金额（元）
                        </p>
                    </div>
                </div>
                <div class="item">
                    <div>
                        <p>
                            {{currentMemberInfo.last_buy}}</p>
                        <p>
                            最近一次到店时间 （元）
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="billing-content">
            <div class="tab-box">
                <div class="tabOperation">
                    <span :class="tabOperation === '0' ? 'active' : ''" @click="tabOperation = '0'">充值</span>
                    <span :class="tabOperation === '1' ? 'active' : ''" @click="tabOperation = '1'">开单</span>
                    <span :class="tabOperation === '2' ? 'active' : ''" @click="tabOperation = '2'">开卡</span>
                </div>
                <div class="billing-tab-box">
                    <div class="billing-tab-box-content" v-if="tabOperation === '1'">
                        <div class="billing-tab-box-content-top">
                            <div class="tabOperation1">
                                <span :class="tabOperation1 === '0' ? 'active' : ''" @click="tabOperation1 = '0'">服务</span>
                                <span :class="tabOperation1 === '1' ? 'active' : ''" @click="tabOperation1 = '1'">包厢</span>
                            </div>
                            <div class="">
                                <el-input prefix-icon="el-icon-search" placeholder="输入服务名称"></el-input>
                            </div>
                        </div>
                        <div class="billing-tab-box-content-bottom" v-if="tabOperation1 === '0'">
                            <div class="left-tab">
                                <span :class="tabOperation2 === '0' ? 'active' : ''" @click="tabOperation2 = '0'">常用服务</span>
                                <a >所有分类</a>
                                <span
                                    :class="tabOperation2 === ('1' + index) ? 'active' : ''"
                                    @click="getServiceSelectList(item,index)"
                                    v-for="(item, index) in serviceKindList"
                                >{{item.name}}</span>
                            </div>
                            <div class="service-list clearfix">
                                <div class="item"
                                     :class="item.selectState ? 'item active' : 'item'"
                                     @click="handleServiceList(item)"
                                     v-for="item in worktableCommonServiceList"
                                >
                                    <div class="name">{{item.name + item.service_time}}分钟</div>
                                    <div class="price">￥{{item.original_price}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="billing-tab-box-content-bottom" v-if="tabOperation1 === '1'">
                            <div class="service-list clearfix">
                                <div class="item"
                                     :class="item.selectState ? 'item active' : 'item'"
                                     @click="handleBoxSelectList(item)"
                                     v-for="item in boxSelectList"
                                >
                                    <div class="name">{{item.name}}</div>
                                    <div class="price">￥{{item.original_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-box">
                <div class="message">
                    <span>消费明细({{consumeList.length}})</span>
                    <el-button @click="clearConsumeList">清空</el-button>
                </div>
                <div class="consume-list">
                    <div class="consume-item" v-for="item in consumeList">
                        <div>
                            <div class="close" @click="clearConsumeItem(item)"><i class="el-icon-close"></i></div>
                            <div class="row">
                                <div class="name">
                                    <span v-if="item.service_time">{{item.name + item.service_time}}分钟</span>
                                    <span v-else>{{item.name}}</span>
                                </div>
                                <el-input-number v-model="item.sort" :min="1" :max="10"></el-input-number>
                                <div class="price" v-if="item.original_price">
                                    <span>￥{{item.original_price * item.sort}}</span>
                                    <el-button @click="clearConsumeList">改价</el-button>
                                </div>
                            </div>
                            <div class="row row-bottom" v-if="item.original_price">
                                <div>
                                    技师：
                                    <span class="item" v-for="itemStaff in itemStaffTechnicianSelectList">
                                        {{itemStaff.name}}
                                        <el-input v-model="itemStaff.time" class="shuru"></el-input>
                                        分钟
                                    </span>
                                    <el-button icon="el-icon-plus" @click="showStaffTechnicianDialogVisible"></el-button>
                                </div>
                                <div>
                                    <el-select v-model="item.rightSelectValue" placeholder="请选择">
                                        <el-option
                                            v-for="item in item.rightSelect"
                                            :key="item.right_id"
                                            :label="item.right_name"
                                            :value="item.right_id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="" @click="serviceDialogVisible = true">赠送服务</div>
                    <div class="consume-item consume-item1" v-for="item in addServiceList">
                        <div>
                            <div class="row">
                                <div class="name">
                                    <span>{{item.name}}</span>
                                </div>
                                <div>
                                    <el-input class="shuru" v-model="item.sort"></el-input>次数
                                </div>
                                <div>
                                    <el-date-picker
                                        v-model="item.date"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                    前有效
                                </div>
                                <div @click="clearConsumeServiceItem(item)">删除</div>
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
                    待收款：<span>￥99.00</span>
                </div>
                <div class="item">
                    <el-button @click="clearConsumeList">挂单</el-button>
                    <el-button type="primary" @click="clearConsumeList">收款</el-button>
                </div>
            </div>
        </div>
        <!--<div>single1</div>-->
        <el-dialog
            class="single-dialog"
            title="取单列表"
            :visible.sync="singleDialogVisible"
            width="70%"
            :before-close="handleClose">
            <div class="list">
                <div class="item" v-for="item in worktableOrderList">
                    <div class="name">{{item.shop_name}}</div>
                    <div class="name">{{item.order_no}}</div>
                    <div class="name">消费项目：{{item.order_name}}</div>
                    <div class="name">下单时间：{{item.create_time}}</div>
                    <div class="name">
                        <span>￥{{item.total_price}}</span>
                        <div>
                            <el-button type="primary" icon="el-icon-document" @click="singleDialogVisible = true">收款</el-button>
                            <el-button >取消</el-button>
                        </div>
                    </div>
                </div>
            </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="singleDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="singleDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
            class="staffTechnician-dialog"
            title="选择技师"
            :visible.sync="staffTechnicianDialogVisible"
            width="400px"
            :before-close="handleClose">
            <div class="search" style="margin-bottom: 30px;">
                <el-input v-model="staffTechnicianValue" @input="getStaffTechnicianSelect"></el-input>
            </div>
            <div class="list">
                <div class="item">
                    <el-checkbox-group v-model="currentStaffTechnicianSelectList">
                        <el-checkbox v-for="item in staffTechnicianSelectList" :label="item.id">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="staffTechnicianDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="setStaffTechnician">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
            class="service-dialog"
            title="添加服务"
            :visible.sync="serviceDialogVisible"
            width="800px">
            <div class="search" style="margin-bottom: 30px;">
                <el-select
                    v-model="memberId1"
                    placeholder="请选择"
                    @change="getServiceSelectList1"
                >
                    <el-option
                        v-for="item in serviceKindList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >{{item.name}}
                    </el-option>
                </el-select>
            </div>
            <el-table
                ref="multipleTable"
                :data="serviceSelectList"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="服务名称"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.img" width="40" height="40" alt="">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="tag_name"
                    label="分类"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="service_time"
                    label="创建时间"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="serviceDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="serviceSelectListConfirm">确 定</el-button>
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
            memberId: '', // 选中用户ID
            memberId1: '', // 选中用户ID
            currentMemberInfo: {}, // 选中用户信息
            tabOperation: '0',
            tabOperation1: '0',
            tabOperation2: '0',
            state: '',
            tabValue1: '',
            consumeList: [],
            addServiceList: [],
            commonServiceList: [],
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
            serviceDialogVisible: false,
            staffTechnicianDialogVisible: false,
        }
    },
    created () {
        this.getServiceKind();
        // this.getServiceSelectList();
        this.getWorktableOrderList();
        this.getWorktableMemberInfo();
        this.getWorktableCommonService();
        this.getStaffTechnicianSelect();
        this.getboxSelectList(1);
    },
    watch: {
        commonServiceList () {
            this.operationConsumeList();
        },
        commonBoxSelectList () {
            this.operationConsumeList();
        },
    },
    methods: {
        // 获取包厢列表
        async getboxSelectList (value) {
            const { data } = await api.boxSelectList({ page_size: 10, page_no: value });
            this.boxSelectList = data.data.map(m => {
                m.selectState = false;
                return m;
            });
        },
        getServiceSelectList (item, index) {
            this.tabOperation2 = ('1' + index);
            this.getServiceSelectList1(item);
        },
        async getServiceSelectList1 (item) {
            console.log(item);
            const { data } = await api.serviceSelectList({ kind_id: item.id });
            this.serviceSelectList = data;
        },
        async getWorktableMemberInfo (value) {
            const { data } = await api.worktableMemberInfo({ keyword: value });
            this.worktableMemberInfoList = data;
        },
        async getServiceKind (value) {
            const { data } = await api.serviceKind({ keyword: value });
            this.serviceKindList = data.data;
        },
        async getWorktableCommonService (value) {
            const { data } = await api.worktableCommonService({ keyword: value });
            this.worktableCommonServiceList = data.map(m => {
                m.selectState = false;
                return m;
            });
        },
        async getWorktableOrderList () {
            const { data } = await api.worktableOrderList();
            this.worktableOrderList = data.data;
        },
        // 获取用户的所有充值卡
        async getWorktableMemberAllRechargeCard (member_id) {
            const { data } = await api.worktableMemberAllRechargeCard({ member_id: member_id});
            this.currentMemberInfo = { ...this.worktableMemberInfoList.filter(m => m.id === this.memberId )[0], userCard: data};
        },
        // 获取技师下拉列表
        async getStaffTechnicianSelect (value) {
            const { data } = await api.staffTechnicianSelect(value);
            this.staffTechnicianSelectList = data;
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
        // 选中服务时操作
        handleServiceList (item) {
            item.selectState = !item.selectState;
            this.handleWorktableCommonServiceList(item);
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
                this.commonServiceList = this.worktableCommonServiceList.filter(m => {
                    if(m.selectState) {
                        m.rightSelect = rightSelect;
                        return m;
                    };
                });
            });
        },
        // 包厢和服务选择时数组处理
        operationConsumeList () {
            this.consumeList = this.commonServiceList.concat(this.commonBoxSelectList);
        },
        reselectUser () {
            this.currentMemberInfo = {};
            this.memberId = '';
        },
        //删除选中明细
        clearConsumeItem (item) {
            this.consumeList.forEach((m, index) => {
               if (item.id === m.id) {
                   this.consumeList.splice(index, 1);
               }
            });
            this.worktableCommonServiceList.forEach((m) => {
                console.log(m);
                console.log(item);
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
            console.log(this.$refs.multipleTable.selection);
            this.addServiceList = this.$refs.multipleTable.selection;
            this.serviceDialogVisible = false;
        },
        //删除选中赠送
        clearConsumeServiceItem (item) {
            this.addServiceList.forEach((m, index) => {
                if (item.id === m.id) {
                    console.log(index);
                    this.addServiceList.splice(index, 1);
                    // this.$foreceUpdate()
                }
            });
        },
    }
};
</script>

<style scoped>
.billing {
    background: #FFF;
    padding: 20px 20px 0;
}
.billing-top>div{
    display: flex;
    justify-content: space-between;
    padding: 0px 0 20px;
    border-bottom: 1px solid #f8f8f8;
}
.billing-top .right,
.billing-top .left{
    display: flex;
    justify-content: space-between;
    width: 49%;
}
.billing-top>div.user{
    display: flex;
}
.billing-top>div.user .item1 i{
    position: absolute;
    right: -5px;
    top: -5px;
    background: #E6E6E6;
    border-radius: 100%;
    display: inline-block;
    padding: 5px;
    cursor: pointer;
    color: #fff;
}
.billing-top>div.user .item1 {
    position: relative;
    background: #F7F8FA;
    padding: 10px;
}
.billing-top>div.user .item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    max-width: 300px;
    text-align: center;
}
.billing-top>div.user .item p:first-child{
    color: #409EFF;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
.billing-top>div.user .item1  p:first-child{
    font-size: 16px;
    text-align: left;
    font-weight: normal;
}
.billing-top>div.user .item img{
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 100%;
}
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
    height: calc( 100vh - 410px);
    overflow-y: auto;
}
.billing .billing-tab-box-content-bottom .service-list .item{
    background: #F7F8FA;
    border: 1px solid #F7F8FA;
    width: 48%;
    float: left;
    transition: 0.3s;
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 4%;
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
