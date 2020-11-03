<template>
  <div class="refund-step">
    <!-- <div class="row" v-if="params.type !== 'service'"> -->
    <div class="row">
      <p class="row-label">开卡情况：</p>
      <div class="row-right flex row-right-bg">
        <div class="car-info flex">
          <div class="car-img">
            <img :src="params.consume[0].img" alt="" width="100%" height="100%">
            <span class="car-name">{{params.consume[0].name}}</span>
            <!-- 有效期未返回 -->
            <span class="car-endline">有效期：365天</span>
          </div>
          <div class="car-text" v-if="params.type==='time_card'">
            <p>购卡金额</p>
            <p class="car-text-money">￥{{params.consume[0].price}}</p>
          </div>
          <div class="car-text" v-else>
            <p>本次充值</p>
            <p class="car-text-money-mini">本金：￥{{params.consume[0].price}}</p>
            <p class="car-text-money-mini">赠金：￥{{params.consume[0].gift_price}}</p>
          </div>
        </div>
        <div class="use-info flex flex-center" v-if="params.type === 'time_card'">
          <p>总次数：{{params.consume[0].total_time}}</p>
          <p>已使用：{{params.consume[0].used_time}}</p>
        </div>
        <div class="car-text use-info flex" v-else>
          <p class="grey-text">当前余额</p>
          <p class="car-text-money-mini">本金：￥{{params.consume[0].balance}}</p>
          <p class="car-text-money-mini">赠金：￥{{params.consume[0].gift_balance}}</p>
        </div>
      </div>
    </div>
    <div class="row" v-if="params.type === 'discount_card'">
      <p class="row-label">退卡方案：</p>
      <div class="row-right">
        <div class="schame">
          <el-radio v-model="form.schame" label="1">退整卡</el-radio>
          <p class="schame-desc">次卡后续有充值，不支持退整卡</p>
        </div>
        <div class="schame">
          <el-radio v-model="form.schame" label="2">退部分余额</el-radio>
          <p class="schame-desc">充值卡有效，根据数据本金，赠金卡余额进行余额扣除</p>
        </div>
      </div>
    </div>
    <div class="row" v-if="params.type === 'recharge_card'">
      <p class="row-label">扣除金额：</p>
      <div class="row-right">
        <div class="charge-info flex">
          <p class="charge-label">本金扣除：</p>
          <p><el-input v-model="form.refund_balance" class="charge-money"></el-input></p>
          <p class="charge-desc">本次退卡后卡内本金余额：￥500.00</p>
        </div>
        <div class="charge-info flex">
          <p class="charge-label">赠金扣除：</p>
          <p><el-input v-model="form.refund_gift_balance" class="charge-money"></el-input></p>
          <p class="charge-desc">本次退卡后卡内赠金余额：￥0.00</p>
        </div>
      </div>
    </div>
    <div class="row">
      <p class="row-label">退款金额：</p>
      <el-table class="row-right" :data="refundAmount" style="width:100%">
        <el-table-column label="支付方式" prop="pay_type_name" align="center"></el-table-column>
        <el-table-column label="支付金额（元）" prop="total_price" align="center"></el-table-column>
        <el-table-column label="退款金额（元）" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.refund_price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="退款方式" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.refund_type">
              <el-option label="原路返回" value="原路返回"></el-option>
              <el-option label="现金退款" value="现金退款"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="row">
      <p class="row-label">退款说明：</p>
      <el-input type="textarea" v-model="form.refund_explain" placeholder="选填，备注退款原因，150字以内"></el-input>
    </div>
    <div class="footer-bar flex">
      <p>合计退款金额：<span>￥{{refundAmount[0].refund_price}}</span></p>
      <el-button type="primary" @click="handleRefund">确定退款</el-button>
    </div>
  </div>
</template>

<script>
import {refundRechargeCard, refundDiscountCard, refundService, refundTimeCard} from '@/api/orderManagement'
const typeObj = {
  service: refundService,
  discount_card: refundDiscountCard,
  time_card: refundTimeCard,
  recharge_card: refundRechargeCard
}
export default {
  name: 'refundStep2',
  data() {
    return {
      form: {
        order_id: '',
        pay_type_id: '',
        is_integral: '',
        refund_balance: '',
        refund_gift_balance: '',
        // refund_price: '',
        // refund_type: '原路返回',
        refund_explain: ''
      },
      refundAmount: []
    }
  },
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    carText() {
      if (this.params.type !== 'time_card') {
        return '购卡金额'
      } else {
        return '本次充值'
      }
    }
  },
  created() {
    const item = {
      total_price: this.params.total_price,
      pay_type_name: this.params.pay_type_name,
      pay_type_id: this.params.pay_type_id,
      refund_type: '',
      refund_price: ''
    }
    this.refundAmount.push(item)
  },
  methods: {
    handleRefund() {}
  }
  
}
</script>

<style scoped>
  .row {
    margin-top: 20px;
    display: flex;
  }
  .row-label {
    width: 80px;
    flex-shrink: 0;
    margin-top: 2px;
    margin-right: 10px;
  }
  .row-right {
    flex: 1;
  }
  .row-right-bg {
    background-color: #f5f7fa;
    padding: 20px;
  }
  .flex {
    display: flex;
  }
  .flex-center {
    justify-content: center;
  }
  .car-info {
    width: 67%;
    flex-shrink: 0;
  }
  .car-img {
    width: 200px;
    height: 100px;
    border: 1px solid orange;
    border-radius: 5px;
    position: relative;
    margin-right: 20px;
  }
  .car-name, .car-endline {
    position: absolute;
    left: 10px;
  }
  .car-name {
    top: 10px;
  }
  .car-endline {
    bottom: 10px;
  }
  .car-text-money {
    font-size: 18px;
    margin-top: 10px;
  }
  .car-text-money-mini {
    font-size: 12px;
    margin-top: 10px;
  }
  .use-info {
    flex: 1;
    flex-direction: column;
    padding-left: 50px;
    position: relative;
  }
  .use-info::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 80%;
    background-color: #E4E7ED;
    top: 10%;
    left: 0;
  }
  .grey-text {
    color: #999999;
  }
  .footer-bar {
    margin-top: 20px;
    justify-content: space-between;
  }
  .footer-bar span {
    color: #FF377D;
    font-weight: 700;
    font-size: 18px;
  }
  .charge-info {
    margin-bottom: 10px;
    align-items: center;
  }
  .charge-desc {
    flex: 1;
    padding-left: 30px;
  }
  .charge-money.el-input {
    width: 170px;
    box-sizing: border-box;
    padding-left: 40px;
    position: relative;
  }
  .charge-money.el-input::before {
    content: '￥';
    position: absolute;
    width: 30px;
    height: 30px;
    line-height: 32px;
    text-align: center;
    font-size: 16px;
    background-color: #f5f7fa;
    border: 1px solid #DCDFE6;
    top: 0;
    left: 20px;
  }
  .schame {
    margin-bottom: 10px;
  }
  .schame-desc {
    margin-top: 10px;
    color: #999999;
  }

</style>