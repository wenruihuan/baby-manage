<template>
    <div class="collectionConfirmation">
        <div style="text-align: center">
            <div class="pic">
                <img src="common/imgs/default_icon.png" alt="">
            </div>
            <div class="success">订单支付成功</div>
            <div class="info">
                <div class="row">
                    <span>支付方式：</span>
                    <i>{{info.payment}}</i>
                </div>
                <div class="row">
                    <span>应收金额：</span>
                    <i>￥{{info.price}}</i>
                </div>
                <div class="row">
                    <span>实收金额：</span>
                    <i>￥{{info.price1}}</i>
                </div>
            </div>
            <div class="operation">
                <el-button type="primary" v-if="info.price1 > info.price || info.price1 === info.price" @click="getLink">继续开单</el-button>
                <el-button type="primary" v-else @click="getBack">继续收银</el-button>
                <el-button @click="watchOrder">查看订单</el-button>

                <el-button @click="print">打印小票</el-button>
            </div>
            <el-dialog
                    title="打印小票"
                class="orderInfo1"
                :visible.sync="isShow"
            >
                <order-info></order-info>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import orderInfo from './common/orderInfo'
    export default {
        name: 'collectionConfirmation',
        data () {
            return {
                isShow: false
            }
        },
        created () {
            this.info = this.$route.query
        },
        components: {
            orderInfo
        },
        methods: {
            watchOrder () {
                this.$router.push(`/orderDetail/${this.info.orderId}`)
            },
            print () {
                this.isShow = true
            },
            getBack () {
                this.$router.go(-1);
            },
            getLink () {
                this.$router.push('/workbench');
            },
        }
    };
</script>

<style scoped>

    .collectionConfirmation {
        width: 100%;
        min-height: 100vh;
        height: auto;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .collectionConfirmation .pic{
        background: #F6F6FF;
        width: 140px;
        height: 140px;
        border-radius: 100%;
        margin: 0 auto;
    }
    .collectionConfirmation .success{
        text-align: center;
        font-size: 28px;
        color: rgb(24, 144, 255);
        line-height: 70px;
        margin-bottom: 40px;
    }
    .collectionConfirmation .info{
        margin: 0 auto;
        display: inline-block;
    }
    .collectionConfirmation .info .row{
        margin-bottom: 20px;
    }
    .collectionConfirmation .info span{
        font-size: 16px;
        color: #333333;
    }
    .collectionConfirmation .info i{
        font-style: normal;
        color: rgb(24, 144, 255);
        font-size: 16px;
    }
    .collectionConfirmation .pic img{
        width: 100%;
    }
    .orderInfo{
    }
    .orderInfo1>div{
    }
</style>
<style>
    .el-dialog{
        width: 360px;
    }
</style>
