<template>
    <div class="billing">
        <div class="billing-content">
            <div class="tab-box">
                <div class="tabOperation">
                    <span @click="getLink(0)">充值</span>
                    <span @click="getLink(1)" class="active">开单</span>
                    <span @click="getLink(2)">开卡</span>
                </div>
                <div class="billing-tab-box">
                    <div class="billing-tab-box-content">
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
                            <div :class="memberId !== '' ? 'service-list clearfix active': 'service-list clearfix'">
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
                                    <div class="price">￥{{item.price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-box">
                <div class="message">
                    <span>消费明细({{consume.length}})</span>
                    <el-button @click="clearConsumeList">清空</el-button>
                </div>
                <div class="consume-list">
                    <div class="consume-item" v-for="(item, index) in consume">
                        <div>
                            <div class="close" @click="clearConsumeItem(item)"><i class="el-icon-close"></i></div>
                            <div class="row">
                                <div class="name">
                                    <span v-if="item.service_time">{{item.name + item.service_time}}分钟</span>
                                    <span v-else>{{item.name}}</span>
                                </div>
                                <el-input-number v-model="item.sort" :min="1" :max="10"></el-input-number>
                                <div class="price" v-if="item.original_price">
                                    <span v-if="item.originalOriceState === '0'">￥{{item.original_price * item.sort}}</span>
                                    <span v-if="item.originalOriceState === '1'">￥ <el-input class="width85" v-model="item.price" ></el-input></span>
                                    <el-button v-if="item.originalOriceState === '0'" @click="changePrice(index,'1')">改价</el-button>
                                    <el-button v-if="item.originalOriceState === '1'" @click="changePrice(index, '0')">保存</el-button>
                                </div>
                            </div>
                            <div class="row row-bottom" v-if="item.original_price">
                                <div class="technician">
                                    <div class="label">技师：</div>
                                    <div class="value">
                                        <div class="jsitem" v-for="itemStaff in item.technician">
                                            <span class="item">
                                                {{itemStaff.name}}
                                                <el-input v-model="itemStaff.time" class="shuru"></el-input>
                                                分钟
                                            </span>
                                        </div>
                                        <el-button icon="el-icon-plus" @click="showStaffTechnicianDialogVisible(index)"></el-button>
                                    </div>
                                </div>
                                <div class="rightList">
                                    <el-select class="width150" v-model="item.right_id" placeholder="请选择">
                                        <el-option
                                            v-for="item in item.rightSelect"
                                            :key="item.right_id"
                                            :label="item.right_name"
                                            :value="item.right_id">
                                        </el-option>
                                    </el-select>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <el-select class="width150" v-model="item.recharge_card_id" placeholder="请选择">
                                        <el-option
                                            v-for="item in memberAllRechargeCard"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mainColor" @click="serviceDialogVisible = true">赠送服务</div>
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
                    <el-button>挂单</el-button>
                    <el-button type="primary" @click="getCashier">收款</el-button>
                </div>
            </div>
        </div>
        <!--<div>single1</div>-->
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
import userInfo from './userInfo'
export default {
    name: 'billing',
    components: {
        userInfo
    },
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
            consume: [],
            addServiceList: [],
            commonServiceList: [],
            commonBoxSelectList: [],
            currentConsumeList: [],
            serviceKindList: [],
            serviceSelectList: [],
            boxSelectList: [],
            worktableMemberInfoList: [],
            worktableCommonServiceList: [],
            staffTechnicianValue: '',
            staffTechnicianSelectList: [],
            itemStaffTechnicianSelectList: [],
            consumeIndex: 0,
            currentStaffTechnicianSelectList: [],
            serviceDialogVisible: false,
            staffTechnicianDialogVisible: false,
        }
    },
    props: {
        memberId: ''
    },
    created () {
        this.getServiceKind();
        // this.getServiceSelectList();
        this.getWorktableMemberInfo();
        this.getWorktableCommonService();
        this.getStaffTechnicianSelect();
        this.getboxSelectList(1);
        this.getWorktableMemberAllRechargeCard();
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
        async getCashier () {
            let params = {
                memeber_id: this.memberId
            };
            const { data } = await api.worktableHangService(params);
            this.$router.push({ path: '/cashier', query: { comeFrom: 'billing', order_id: data.order_id}});
        },
        getLink (index) {
            // this.$router.push(`/${link}`);
            this.$emit('getNum', index);
        },
        // 获取包厢列表
        async getboxSelectList (value) {
            const { data } = await api.boxSelectList({ page_size: 10, page_no: value });
            this.boxSelectList = data.map(m => {
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
            this.serviceKindList = data;
        },
        async getWorktableCommonService (value) {
            const { data } = await api.worktableCommonService({ keyword: value });
            this.worktableCommonServiceList = data.map(m => {
                m.selectState = false;
                return m;
            });
        },
        // 获取用户的所有充值卡
        async getWorktableMemberAllRechargeCard (member_id) {
            const { data } = await api.worktableMemberAllRechargeCard({ member_id: member_id});
            this.memberAllRechargeCard = data;
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
            this.consume = [];
        },
        handleClose () {
            this.consume = [];
        },
        clearConsumeList () {
            this.consume = [];
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
                        this.$set(m, 'originalOriceState', '0');
                        return m;
                    };
                });
            });
        },
        // 包厢和服务选择时数组处理
        operationConsumeList () {
            this.consume = this.commonServiceList.concat(this.commonBoxSelectList);
        },
        //删除选中明细
        clearConsumeItem (item) {
            this.consume.forEach((m, index) => {
               if (item.id === m.id) {
                   this.consume.splice(index, 1);
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
        showStaffTechnicianDialogVisible (index) {
            this.consumeIndex = index;
            this.staffTechnicianDialogVisible = true;
        },
        // 设置明细需要技师
        setStaffTechnician () {
            this.itemStaffTechnicianSelectList = [];
            this.staffTechnicianDialogVisible = false;
            this.currentStaffTechnicianSelectList.forEach(m => {
                this.staffTechnicianSelectList.forEach(n => {
                    if (m === n.id) {
                        this.itemStaffTechnicianSelectList.push(n)
                    }
                })
            });
            this.$set(this.consume[this.consumeIndex], 'technician', this.staffTechnicianSelectList);
            // this.currentStaffTechnicianSelectList = [];
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

        // 改价
        changePrice (index, state) {
            if (state === '0') {
                this.$set(this.consume[index], 'original_price', this.consume[index].price);
            } else {
                this.$set(this.consume[index], 'price', this.consume[index].original_price);
            }
            this.$set(this.consume[index], 'originalOriceState', state);
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
.billing .billing-content .info-box .consume-list .consume-item .row-bottom .technician .label{
    width: 50px;
    line-height: 35px;
    font-size: 16px;
}
.billing .billing-content .info-box .consume-list .consume-item .row-bottom .technician .value{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
}
.billing .billing-content .info-box .consume-list .consume-item .row-bottom .technician{
    display: flex;
    align-items: flex-start;
}
.billing .billing-content .info-box .consume-list .consume-item .row-bottom{
    border-top: 1px solid #ccc;
    padding-top: 20px;
    margin-top: 20px;
    display: block;
}
.billing .billing-content .info-box .consume-list .consume-item .row-bottom>div{
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.billing .billing-content .info-box .consume-list .consume-item .row-bottom .rightList{
    display: flex;
    justify-content: flex-end;
}
.billing .billing-content .info-box .consume-list .consume-item .row-bottom>div .jsitem {
    width: 40%;
    margin-bottom: 10px;
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
    background: #fff;
    color: #409EFF;
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
.billing .billing-tab-box-content-bottom .service-list.active{
    height: calc( 100vh - 330px);
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
