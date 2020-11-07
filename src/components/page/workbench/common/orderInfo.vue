<template>
    <div class="orderInfo">
        <div class="title">多多亲子岁月</div>
        <div class="item">
            <div class="item-title"><span>订单信息</span></div>
            <div class="row">
                <span>订单编号</span>
                <span>FW20200820131423001</span>
            </div>
            <div class="row">
                <span>下单时间</span>
                <span>2020-08-20 13:14:23</span>
            </div>
            <div class="row">
                <span>下单人</span>
                <span>会*名</span>
            </div>
            <div class="row">
                <span>收银员</span>
                <span>丁丁</span>
            </div>
        </div>
        <div class="item">
            <div class="item-title"><span>消费明细</span></div>
            <div class="row">
                <span>商品名称</span>
                <span>￥100.00</span>
            </div>
            <div class="row">
                <span>数量</span>
                <span>1</span>
            </div>
            <div class="row">
                <span>小计</span>
                <span>￥100.00</span>
            </div>
        </div>
        <div class="item item1">
            <div class="row">
                <span>合计</span>
                <span>￥100.00</span>
            </div>
            <div class="row">
                <span>待支付</span>
                <span>￥100.00</span>
            </div>
            <div class="row">
                <span>小计</span>
                <span>￥100.00</span>
            </div>
        </div>
        <div class="bottom">
            <p>扫码收藏店铺，随时可预约</p>
            <p>谢谢光临，欢迎再来！</p>
            <p><img src="./imgs/ewm_icon.png" width="155" alt=""></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'orderInfo'
    };
</script>

<style scoped>

    .orderInfo{
        width: 300px;
        background: #fff;
        padding: 10px;
    }
    .orderInfo .title{
        position: relative;
        text-align: center;
        font-size: 16px;
    }
    .orderInfo .item-title{
        position: relative;
        text-align: center;
        margin: 20px auto;
    }
    .orderInfo .item-title:before{
        position: absolute;
        display: block;
        content: '';
        height: 1px;
        width: 100%;
        background: #F0F0F0;
        z-index: 1;
        left: 0;
        top: 50%;
    }
    .orderInfo .item-title span{
        display: inline-block;
        position: relative;
        z-index: 2;
        background: #fff;
        padding: 0 10px;
        color: #BBBBBB;
        margin: 0 auto;
    }
    .orderInfo .item .row{
        display: flex;
        justify-content: space-between;
        color: #BBBBBB;
    }
    .orderInfo .item .row span {
        line-height: 30px;
    }
    .orderInfo .item .row span:last-child{
        color: #333;
    }
    .orderInfo .item1{
        border-top: 1px solid #F0F0F0;
        margin-top: 20px;
        padding-top: 20px;
    }
    .orderInfo .bottom{
        text-align: center;
        border-top: 1px solid #F0F0F0;
        padding-top: 20px;
        margin-top: 20px;
    }
    .orderInfo .bottom p{
        line-height: 30px;
    }
</style>
