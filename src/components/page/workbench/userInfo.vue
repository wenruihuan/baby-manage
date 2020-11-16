<template>
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
    name: 'index',
    data () {
        return {
            singleDialogVisible: false,
            worktableMemberInfoList: [],
            worktableOrderList: [],
            currentMemberInfo: '',
            memberId: ''
        }
    },
    created() {
        this.getWorktableMemberInfo();
        this.getWorktableOrderList();
    },
    methods: {
        async getWorktableOrderList () {
            const { data } = await api.worktableOrderList();
            this.worktableOrderList = data.data;
        },
        // 清除用户信息
        reselectUser () {
            this.currentMemberInfo = {};
            this.memberId = '';
        },
        async getWorktableMemberInfo (value) {
            console.log(111);
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
