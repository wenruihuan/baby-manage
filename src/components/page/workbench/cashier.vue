<template>
    <div class="cashier">
        <div class="operation">
            <div class="left">
                收银台
            </div>
            <div class="right">
                <el-button type="primary">返回开单</el-button>
                <el-button @click="$router.go(-1)">关闭</el-button>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <order-info></order-info>
            </div>
            <div class="right">
                <div class="collection">
                    <span>待收款：</span>
                    <b>￥{{price}}</b>
                </div>
                <div class="paymen-term box">
                    <div class="title">选择收款方式</div>
                    <div class="list">
                        <div
                            v-for="(item, index) in paymentList"
                            :class="index === currentPayment ? 'active item' : 'item'"
                            :key="item.id"
                            @click="selectPaymentFn(index)"
                        >
                            <div>
                                <p class="name">{{item.name}}</p>
                                <p>记账收款</p>
                            </div>
                            <div class="checkbox" v-if="index === currentPayment"><i class="el-icon-check"></i></div>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="title">{{paymentList[currentPayment].name}}</div>
                    <div class="row">
                        实收金额： <el-input class="input" v-model="price1"></el-input> <span>不用找零</span>
                    </div>
                </div>
                <div class="bottom">
                    <el-button type="primary" @click="confirmReceipt">确认收款</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import orderInfo from './common/orderInfo'
import * as api from '../../../api/index'
export default {
    name: 'cashier',
    components: {
        orderInfo
    },
    data () {
        return {
            active: true,
            paymentList: [
                {
                    name: ''
                }
            ],
            currentPayment: 0,
            price: 100,
            price1: 50
        }
    },
    created() {
        this.getPaymentList();
    },
    methods: {
        async getPaymentList () {
            const { data } = await api.paymentList();
            this.paymentList = data.map(m => {
                m.active = false;
                return m;
            });
        },
        // 选中支付方式
        selectPaymentFn (item) {
            this.currentPayment = item;
        },
        // 确认收款
        confirmReceipt () {
            this.$router.push({ path: '/collectionConfirmation',query: {
                payment: this.paymentList[this.currentPayment].name,
                price: this.price,
                price1: this.price1
            } })
        }
    }
};
</script>

<style scoped>
.cashier .operation{
    height: 42px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
}
.cashier .operation .left{
    line-height: 42px;
    font-size: 16px;
    color: #333;
}
.cashier .operation .right{
    display: flex;
    align-items: center;
    height: 42px;
}
.cashier .content {
    display: flex;
    padding: 0;
    justify-content: space-between;
}
.cashier .content .left{
    width: 320px;
    margin-right: 30px;
}
.cashier .content .right{
    flex: 1;
    padding: 0 10px;
    background: #fff;
}
.cashier .content .right .collection{
    border-bottom: 1px solid #F0F0F0;
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 10px;
}
.cashier .content .right .collection span{

    font-size: 20px;
}
.cashier .content .right .collection b{
    font-size: 36px;
}
.cashier .content .right .box .title{
    height: 85px;
    line-height: 85px;
    font-size: 20px;
}
.cashier .content .right .box .list{
    display: flex;
    flex-wrap: wrap;
}

.cashier .content .right .box .list .item{
    width: 220px;
    height: 100px;
    border: 1px solid #dddddd;
    color: #dddddd;
    margin: 0 15px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
}
.cashier .content .right .box .list .item.active{
    border: 1px solid #1890ff;
}
.cashier .content .right .box .list .item .checkbox{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background: #1890ff;
}
.cashier .content .right .box .list .item .checkbox:before{
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    content: '';
    border-width: 15px;
    border-color: #fff transparent transparent #fff ;
    border-style: solid;
}
.cashier .content .right .box .list .item .checkbox i{
    position: absolute;
    right: 3px;
    bottom: 3px;
}
.cashier .content .right .box .list .item p{
    line-height: 30px;
    text-align: center;
    color: #666666;
    font-size: 12px;
}
.cashier .content .right .box .list .item p.name{
    color: #666666;
    font-size: 16px;
}
.cashier .content .right .box .row{
    display: flex;
    align-items: center;
    color: #666;
    font-size: 16px;
}
.cashier .content .right .box .row .input{
    width: 300px;
    margin: 0 20px;

}
.cashier .content .bottom{
    height: 120px;
    display: flex;
    align-items: center;
    border-top: 1px solid #F0F0F0;
    margin-top: 50px;
}
.cashier .content .bottom .el-button{
    width: 300px;
}
</style>
