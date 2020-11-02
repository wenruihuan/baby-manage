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
                        <div class="billing-tab-box-content-bottom">
                            <div class="left-tab">
                                <span :class="tabOperation2 === '0' ? 'active' : ''" @click="tabOperation2 = '0'">常用服务</span>
                                <a >所有分类</a>
                                <span
                                    :class="tabOperation2 === ('1' + index) ? 'active' : ''"
                                    @click="getServiceSelectList(item,index)"
                                    v-for="(item, index) in serviceKindList"
                                >{{item.name}}</span>
                            </div>
                            <div class="service-list">
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
                            <div class="row">
                                <div class="name">
                                    <span>{{item.name + item.service_time}}分钟</span>
                                    <el-input-number
                                            v-model="item.sort"
                                            @change="handleChange"
                                            :min="1"
                                    ></el-input-number>
                                </div>
                                <div class="price">￥{{item.original_price * item.sort}}</div>
                                <el-button @click="clearConsumeList">改价</el-button>
                            </div>
                            <div class="row">
                                {{item.tag_name}}
                            </div>
                            <div class="row row-bottom">
                                技师：
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>single</div>
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
    </div>
</template>

<script>
import * as api from '../../../api/index'
export default {
    name: 'billing',
    data () {
        return {
            memberId: '', // 选中用户ID
            currentMemberInfo: {}, // 选中用户信息
            tabOperation: '0',
            tabOperation1: '0',
            tabOperation2: '0',
            state: '',
            tabValue1: '',
            consumeList: [],
            serviceKindList: [],
            serviceSelectList: [],
            worktableOrderList: [],
            worktableMemberInfoList: [],
            worktableCommonServiceList: [],
            staffTechnicianSelectList: [],
            singleDialogVisible: false,
        }
    },
    created () {
        this.getServiceKind();
        // this.getServiceSelectList();
        this.getWorktableOrderList();
        this.getWorktableMemberInfo();
        this.getworktableCommonService();
        this.getStaffTechnicianSelect();
    },
    methods: {
        async getServiceSelectList (item, index) {
            this.tabOperation2 = ('1' + index);
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
        async getworktableCommonService (value) {
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
        async getStaffTechnicianSelect () {
            const { data } = await api.staffTechnicianSelect();
            this.staffTechnicianSelectList = data;
        },
        handleClose () {
            this.consumeList = [];
        },
        clearConsumeList () {
            this.consumeList = [];
        },
        handleServiceList (item) {
            item.selectState = !item.selectState;
            this.handleConsumeList();
        },
        handleConsumeList () {
            this.consumeList = this.worktableCommonServiceList.filter(m => {
                if(m.selectState) {
                    return m;
                };
            });
            console.log(this.consumeList);
        },
        reselectUser () {
            this.currentMemberInfo = {};
            this.memberId = '';
        }
    }
};
</script>

<style scoped>
.billing {
    background: #FFF;
    padding: 20px;
}
.billing-top>div{
    display: flex;
    justify-content: space-between;
    padding: 0px 0 20px;
    border-bottom: 1px solid #ccc;
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
.billing-top>div{
    display: flex;
}
.billing-top .right,
.billing-top .left{
    display: flex;
    justify-content: space-between;
    width: 49%;
}
.billing .billing-content{
    display: flex;
    justify-content: space-between;
}
.billing .tabOperation{
    display: flex;
    border: 1px solid #ccc;
    height: 35px;
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

.billing .tabOperation{
    width: 100%;
    margin-bottom: 20px;
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
    margin: 20px 0;
}
.billing .billing-content .info-box .message{
    display: flex;
    justify-content: space-between;
    align-items: center;
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
.billing .billing-tab-box-content-bottom .service-list{
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
}
.billing .billing-tab-box-content-bottom .service-list .item{
    background: #F7F8FA;
    border: 1px solid #F7F8FA;
    width: 48%;
    transition: 0.3s;
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
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
</style>
