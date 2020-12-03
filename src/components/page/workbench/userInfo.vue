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
                class="single-dialog"
                title="取单列表"
                :visible.sync="singleDialogVisible"
                width="70%"
                :before-close="handleClose">
            <div class="list ">
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

import userInfo from '../member/common/userInfoDialog'
import * as api from '../../../api/index'
export default {
    name: 'index',
    data () {
        return {
            rules: {
                member_name: [
                    { required: true, message: '请输入会员名称', trigger: 'blur' }
                ],
                member_phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                member_no: [
                    { required: true, message: '请输入会员编号', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                member_source: [
                    { required: true, message: '请选择会员来源', trigger: 'change' }
                ],
                level_id: [
                    { required: true, message: '选择会员等级', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
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
    filters: {
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
        },
        async getWorktableMemberInfo (value) {
            const { data } = await api.worktableMemberInfo({ keyword: value });
            /*let aaa = [
                {
                    card_count: "1",
                    head_img: "http://static.zhiyemao.net/0e255ee0afab11eab7b55b5caa932854/2020_10_22_14_31_FgNNvJa6grI8VvC8zEacwdOJoRtR/摄图网_300142486_wx_治疗师腹部施加压力水疗沙龙接受按摩的女人双手按摩女腹部（非企业商用）.jpg",
                    id: "315728c141a1475680e6519d444a4314",
                    last_buy: "2020-10-13",
                    name: "张三",
                    phone: "15962366666",
                    total_buy: "1110.94",
                },
                {
                    card_count: "1",
                    head_img: "http://static.zhiyemao.net/0e255ee0afab11eab7b55b5caa932854/2020_10_22_14_31_FgNNvJa6grI8VvC8zEacwdOJoRtR/摄图网_300142486_wx_治疗师腹部施加压力水疗沙龙接受按摩的女人双手按摩女腹部（非企业商用）.jpg",
                    id: "315728c141a1475680e6519d444a4314",
                    last_buy: "2020-10-13",
                    name: "张三",
                    phone: "15962366666",
                    total_buy: "1110.94",
                },
                {
                    card_count: "1",
                    head_img: "http://static.zhiyemao.net/0e255ee0afab11eab7b55b5caa932854/2020_10_22_14_31_FgNNvJa6grI8VvC8zEacwdOJoRtR/摄图网_300142486_wx_治疗师腹部施加压力水疗沙龙接受按摩的女人双手按摩女腹部（非企业商用）.jpg",
                    id: "315728c141a1475680e6519d444a4314",
                    last_buy: "2020-10-13",
                    name: "张三",
                    phone: "15962366666",
                    total_buy: "1110.94",
                },
                {
                    card_count: "1",
                    head_img: "http://static.zhiyemao.net/0e255ee0afab11eab7b55b5caa932854/2020_10_22_14_31_FgNNvJa6grI8VvC8zEacwdOJoRtR/摄图网_300142486_wx_治疗师腹部施加压力水疗沙龙接受按摩的女人双手按摩女腹部（非企业商用）.jpg",
                    id: "315728c141a1475680e6519d444a4314",
                    last_buy: "2020-10-13",
                    name: "张三",
                    phone: "15962366666",
                    total_buy: "1110.94",
                },
                {
                    card_count: "1",
                    head_img: "http://static.zhiyemao.net/0e255ee0afab11eab7b55b5caa932854/2020_10_22_14_31_FgNNvJa6grI8VvC8zEacwdOJoRtR/摄图网_300142486_wx_治疗师腹部施加压力水疗沙龙接受按摩的女人双手按摩女腹部（非企业商用）.jpg",
                    id: "315728c141a1475680e6519d444a4314",
                    last_buy: "2020-10-13",
                    name: "张三",
                    phone: "15962366666",
                    total_buy: "1110.94",
                },
                {
                    card_count: "1",
                    head_img: "http://static.zhiyemao.net/0e255ee0afab11eab7b55b5caa932854/2020_10_22_14_31_FgNNvJa6grI8VvC8zEacwdOJoRtR/摄图网_300142486_wx_治疗师腹部施加压力水疗沙龙接受按摩的女人双手按摩女腹部（非企业商用）.jpg",
                    id: "315728c141a1475680e6519d444a4314",
                    last_buy: "2020-10-13",
                    name: "张三",
                    phone: "15962366666",
                    total_buy: "1110.94",
                },
                {
                    card_count: "1",
                    head_img: "http://static.zhiyemao.net/0e255ee0afab11eab7b55b5caa932854/2020_10_22_14_31_FgNNvJa6grI8VvC8zEacwdOJoRtR/摄图网_300142486_wx_治疗师腹部施加压力水疗沙龙接受按摩的女人双手按摩女腹部（非企业商用）.jpg",
                    id: "315728c141a1475680e6519d444a4314",
                    last_buy: "2020-10-13",
                    name: "张三",
                    phone: "15962366666",
                    total_buy: "1110.94",
                },
                {
                    card_count: "1",
                    head_img: "http://static.zhiyemao.net/0e255ee0afab11eab7b55b5caa932854/2020_10_22_14_31_FgNNvJa6grI8VvC8zEacwdOJoRtR/摄图网_300142486_wx_治疗师腹部施加压力水疗沙龙接受按摩的女人双手按摩女腹部（非企业商用）.jpg",
                    id: "315728c141a1475680e6519d444a4314",
                    last_buy: "2020-10-13",
                    name: "张三",
                    phone: "15962366666",
                    total_buy: "1110.94",
                },
                {
                    card_count: "1",
                    head_img: "http://static.zhiyemao.net/0e255ee0afab11eab7b55b5caa932854/2020_10_22_14_31_FgNNvJa6grI8VvC8zEacwdOJoRtR/摄图网_300142486_wx_治疗师腹部施加压力水疗沙龙接受按摩的女人双手按摩女腹部（非企业商用）.jpg",
                    id: "315728c141a1475680e6519d444a4314",
                    last_buy: "2020-10-13",
                    name: "张三",
                    phone: "15962366666",
                    total_buy: "1110.94",
                },
            ]*/
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
    .single-dialog .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .single-dialog .list .item {
        width: 23.5%;
        background: #fff;
        text-align: center;
        border-radius: 3px;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    .demo-ruleForm{
        height: 450px;
        overflow-y: auto;
    }
</style>
<style>
    .single-dialog .el-dialog .el-dialog__body{
        background: #EDEDED;
        padding: 30px 20px;
        margin: 0 auto;
    }
</style>
