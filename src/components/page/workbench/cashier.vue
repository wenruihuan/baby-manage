<template>
    <div class="cashier">
        <div class="operation">
            <div class="left">
                收银台
            </div>
            <div class="right">
                <el-button type="primary">返回开单</el-button>
                <el-button>关闭</el-button>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <order-info></order-info>
            </div>
            <div class="right">
                <div class="collection">
                    <span>待收款：</span>
                    <b>￥99.00</b>
                </div>
                <div class="paymen-term box">
                    <div class="title">选择收款方式</div>
                    <div class="list">
                        <div :class="active ? 'active item' : 'item' ">
                            <div>
                                <p class="name">微信</p>
                                <p>记账收款</p>
                            </div>
                        </div>
                        <div class="item">
                            <div>
                                <p class="name">微信</p>
                                <p>记账收款</p>
                            </div>
                        </div>
                        <div class="item">
                            <div>
                                <p class="name">微信</p>
                                <p>记账收款</p>
                            </div>
                        </div>
                        <div class="item">
                            <div>
                                <p class="name">微信</p>
                                <p>记账收款</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="title">POS</div>
                    <div class="row">
                        实收金额： <el-input class="input"></el-input> <span>不用找零</span>
                    </div>
                </div>
                <div class="bottom">
                    <el-button type="primary">确认收款</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import orderInfo from './common/orderInfo'
export default {
    name: 'cashier',
    components: {
        orderInfo
    },
    data () {
        return {
            active: true
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
    margin: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.cashier .content .right .box .list .item.active{
    border: 1px solid #1890ff;
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
