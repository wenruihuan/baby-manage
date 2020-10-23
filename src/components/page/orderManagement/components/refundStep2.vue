<template>
  <div class="refund-step">
    <div class="row">
      <p class="row-label">开卡情况：</p>
      <div class="row-right flex row-right-bg">
        <div class="car-info flex">
          <div class="car-img">
            <img src="" alt="" width="100%" height="100%">
            <span class="car-name">卡名称</span>
            <span class="car-endline">有效期：365天</span>
          </div>
          <div class="car-text">
            <p>购卡金额</p>
            <p class="car-text-money">￥800</p>
          </div>
        </div>
        <div class="use-info flex">
          <p>总次数：12</p>
          <p>已使用：5</p>
        </div>
      </div>
    </div>
    <div class="row">
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
    <div class="row">
      <p class="row-label">扣除金额：</p>
      <div class="row-right">
        <div class="charge-info flex">
          <p class="charge-label">本金扣除：</p>
          <p><el-input v-model="form.principal" class="charge-money"></el-input></p>
          <p class="charge-desc">本次退卡后卡内本金余额：￥500.00</p>
        </div>
        <div class="charge-info flex">
          <p class="charge-label">赠金扣除：</p>
          <p><el-input v-model="form.bonus" class="charge-money"></el-input></p>
          <p class="charge-desc">本次退卡后卡内赠金余额：￥0.00</p>
        </div>
      </div>
    </div>
    <div class="row">
      <p class="row-label">退款金额：</p>
      <el-table class="row-right" style="width:100%">
        <el-table-column label="支付方式"></el-table-column>
        <el-table-column label="支付金额（元）"></el-table-column>
        <el-table-column label="退款金额（元）">
          <template>
            <el-input v-model="form.amount"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="退款方式">
          <template>
            <el-select v-model="form.refundWay">
              <el-option label="原路返回" value="1"></el-option>
              <el-option label="现金退款" value="2"></el-option>
              <el-option label="其他" value="3"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="row">
      <p class="row-label">退款说明：</p>
      <el-input type="textarea" placeholder="选填，备注退款原因，150字以内"></el-input>
    </div>
    <div class="footer-bar flex">
      <p>合计退款金额：<span>￥100.00</span></p>
      <el-button type="primary">确定退款</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'refundStep2',
  data() {
    return {
      form: {
        amount: 0,
        refundWay: '',
        remark: '',
        schame: '',
        principal: 0,
        bonus: 0
      }
    }
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
  .use-info {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
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