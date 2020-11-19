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
        <div class="box1">

            <div class="col">联系电话：+86 12312332123</div>
            <div class="col">归属门店：多多亲子岁月一店</div>
            <div class="col">生日：1990-09-09</div>
            <div class="col">客户编号：123123</div>
            <div class="col">健康管理师：王亚亚</div>
        </div>
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
    import * as api from '../../../api/index'
    export default {
        name: 'memberList',
        data () {
            return {
                memberdialogVisible: false,
                userId: '',
                userInfo: {}
            }
        },
        components: {
            userInfo
        },
        created() {
            this.userId = this.$route.query.id;
            this.getUserInfoBox();
        },
        methods: {
            async getUserInfoBox () {
                const { data } = await api.memberDetail({ id: this.userId});
                this.userInfo = data;

            },
            showMemberdialogVisible() {
                this.memberdialogVisible = true;
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

</style>
