<template>
    <div class="billing-top">
        <div v-if="!currentMemberInfo.id" class="unUser">
            <div class="left">
                <el-select
                    v-model="memberId"
                    filterable
                    class="width350"
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
                        <div class="item" style="display: flex;justify-content: space-between">
                            <span>{{item.name}}</span>
                            <span>{{item.phone.substr(0,3) + "****" + item.phone.substr(7)}}</span>
                            <span>{{item.no}}</span>
                        </div>
                    </el-option>
                </el-select>
            </div>
            <div class="right">
                <div>
                    <el-button icon="el-icon-plus" type="primary" @click="memberdialogVisible = true">添加新会员</el-button>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-document" @click="singleDialogVisible = true">取单</el-button>
                    <el-button @click="$router.push('/dashboard')">关闭</el-button>
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
            <div>
                <el-button type="primary" icon="el-icon-document" @click="singleDialogVisible = true">取单</el-button>
                <el-button @click="$router.go(-1)">关闭</el-button>
            </div>
        </div>

        <el-dialog
            class="single-dialog1"
            title="取单列表"
            :visible.sync="singleDialogVisible"
            width="900px"
            :before-close="handleClose">
            <div class="list dialogMain">
                <div>
                    <div class="item" v-for="item in worktableOrderList">
                        <div class="top">
                            <div class="member_info">{{item.member_info.member_name}}</div>
                            <div class="member_info">{{item.member_info.member_no}}</div>
                        </div>
                        <div class="contentBox">
                            <div class="order_info"><span>消费项目：</span>{{item.order_info.order_name}}</div>
                            <div class="order_info"><span>下单时间：</span>{{item.order_info.create_time | timeFormatter }}</div>
                        </div>
                        <div class="bottom">
                            <span class="balance_price">￥{{item.order_info.balance_price}}</span>
                            <div>
                                <el-button type="primary" icon="el-icon-document" @click="singleDialogVisible = true">收款</el-button>
                                <el-button >取消</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="singleDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="singleDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>

        <!--新增会员-->
        <user-info
            style="padding: 0;"
            ref="ruleForm"
            v-if="memberdialogVisible"
            @submit="submitCallBack"
            @cancel="(state) => this.memberdialogVisible = state"
        ></user-info>
    </div>
</template>

<script>

import dayjs from 'dayjs'
import userInfo from '../member/common/userInfoDialog'
import * as api from '../../../api/index'
export default {
    name: 'index',
    filters: {
        timeFormatter(val) {
            return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
        },
    },
    data () {
        return {
            singleDialogVisible: false,
            memberdialogVisible: false,
            worktableMemberInfoList: [],
            memberLevelList: [],
            hmSelectList: [],
            worktableOrderList: [],
            currentMemberInfo: '',
            ruleForm: {
                level_id: '12'
            },
            memberId: ''
        }
    },
    created() {
        this.getWorktableMemberInfo();
        this.getWorktableOrderList();
        this.getMemberLevelList();
        this.getHmSelectList();
    },
    components: {
        userInfo
    },
    methods: {
        // 取消新增会员
        cancelMemberdialogVisible (value) {
            this.memberdialogVisible = false;
        },
        // 新增会员提交后回调
        submitCallBack () {
            console.log('submitCallBack');
            this.memberdialogVisible = false;
        },
        // 获取健康师列表
        async getHmSelectList () {
            const  { data } = await api.hmSelectList();
            this.hmSelectList = data;
        },
        // 会员等级列表
        async getMemberLevelList () {
            const  { data } = await api.memberLevelList();
            this.memberLevelList = data.data;
        },
        async getWorktableOrderList () {
            const { data } = await api.worktableOrderList();
            this.worktableOrderList = data.data;
        },
        // 清除用户信息
        reselectUser () {
            this.currentMemberInfo = {};
            this.memberId = '';
            this.$emit('getInfo', '');
        },
        async getWorktableMemberInfo (value) {
            const { data } = await api.worktableMemberInfo({ keyword: value });
            this.worktableMemberInfoList = data;
        },
        handleClose () {
            this.singleDialogVisible = false;
        },
        // 获取用户的所有充值卡
        async getWorktableMemberAllRechargeCard (member_id) {
            this.memberId = member_id;
            const { data } = await api.worktableMemberAllRechargeCard({ member_id: member_id});
            this.currentMemberInfo = { ...this.worktableMemberInfoList.filter(m => m.id === this.memberId )[0], userCard: data};
            this.$emit('getInfo', member_id);
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
    .billing-top>div.user .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        max-width: 300px;
        text-align: center;
    }
    .billing-top>div.user .item1 {
        position: relative;
        background: #F7F8FA;
        padding: 10px;
        justify-content: space-between;
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
    .single-dialog11{
        height: 850px;
    }
    .single-dialog1 .list>div{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .single-dialog1 .list .item {
        width: 32%;
        background: #fff;
        text-align: center;
        border-radius: 3px;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 20px;
        margin-right: 2%;
    }
    .single-dialog1 .list .item:nth-child(3n) {
        margin-right: 0;
    }
    .single-dialog1 .list .item .top {
        border-bottom: 1px solid #f2f2f2;
        margin-bottom: 20px;
    }
    .single-dialog1 .list .item .top .member_info{
        margin-bottom: 10px;
        font-size: 18px;
    }
    .single-dialog1 .list .item .contentBox {
        text-align: left;
    }
        .single-dialog1 .list .item .contentBox .order_info{
            margin-bottom: 10px;
        font-size: 14px;
        color: #333333;
    }
    .single-dialog1 .list .item .contentBox .order_info span{
        color: #D9D9D9;
        font-size: 14px;
    }
    .single-dialog1 .list .item .bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #f2f2f2;
        margin-top: 10px;
        padding-top: 10px;
    }
    .demo-ruleForm{
        height: 450px;
        overflow-y: auto;
    }
</style>
<style>
    .single-dialog1 .el-dialog .el-dialog__body{
        background: #EDEDED;
        padding: 30px 20px;
        margin: 0 auto;
    }
</style>
