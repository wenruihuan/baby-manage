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
    </div>
</template>

<script>
import * as api from '../../../api/index'
export default {
    name: 'index',
    data () {
        return {
            worktableMemberInfoList: [],
            currentMemberInfo: '',
            memberId: ''
        }
    },
    created() {
        this.getWorktableMemberInfo();
    },
    methods: {
        // 清除用户信息
        reselectUser () {
            this.currentMemberInfo = {};
            this.memberId = '';
        },
        async getWorktableMemberInfo (value) {
            const { data } = await api.worktableMemberInfo({ keyword: value });
            this.worktableMemberInfoList = data;
        },
        // 获取用户的所有充值卡
        async getWorktableMemberAllRechargeCard (member_id) {
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
</style>
