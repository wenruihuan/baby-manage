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
                <router-link to="/AppointmentList">1条预约待处理 <i class="el-icon-arrow-right"></i></router-link>
            </div>
        </div>
        <div class="box4">
            <div class="info">
                <div class="list">
                    <div class="item">
                        <p>卡项</p>
                        <p>2</p>
                    </div>
                    <div class="item">
                        <p>赠送权益</p>
                        <p>1</p>
                    </div>
                    <div class="item">
                        <p>积分</p>
                        <p>1111</p>
                    </div>
                </div>
                <div>
                    <span>卡项状态：</span>
                    <el-select  class="width200" v-model="carstate" placeholder="">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="使用中" value="使用中"></el-option>
                        <el-option label="" value="已失效"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="contentBox">
                <div class="item">
                    <p class="info">
                        <span>卡名称名称名称</span>
                        <i>11次</i>
                    </p>
                    <p class="price">￥1000.00</p>
                    <p class="time">有效期：365天</p>
                </div>
                <div class="item">
                    <p class="info">
                        <span>卡名称名称名称</span>
                        <i>11次</i>
                    </p>
                    <p class="price">￥1000.00</p>
                    <p class="time">有效期：365天</p>
                </div>
            </div>
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
            carstate: '全部',
            isShowCommonTag: false,
            memberdialogVisible: false,
            userId: '',
            userInfo: {}
        }
    },
    components: {
        userInfo,
        commonTag
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
    text-align: center;
}
.messageDetails .box4 .info .list .item p{
    line-height: 25px;
}
.messageDetails .box4 .contentBox{
    display: flex;
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
}
</style>
