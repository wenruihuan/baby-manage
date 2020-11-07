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
                    <i>微信</i>
                </div>
                <div class="row">
                    <span>应收金额：</span>
                    <i>￥100.00</i>
                </div>
                <div class="row">
                    <span>实收金额：</span>
                    <i>￥100.00</i>
                </div>
            </div>
            <div class="operation">
                <el-button type="primary">继续收银</el-button>

                <el-button >查看订单</el-button>

                <el-button @click="print">打印小票</el-button>
            </div>
            <div class="orderInfo">
                <order-info v-if="isShow"></order-info>
            </div>
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
        components: {
            orderInfo
        },
        methods: {
            print () {
                this.isShow = true
            }
        }
    };
</script>

<style scoped>

    .collectionConfirmation {
        width: 100%;
        height: auto;
        background: #fff;
        padding: 100px 0;
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
        position: fixed;
        left: 50%;
        top: 5%;
        margin-left: -175px;
    }
</style>
