<template>
  <div class="order-detail">
    <div class="info">
      <p class="info-title">订单信息</p>
      <div class="info-body">
        <p class="status">已完成</p>
        <div class="info-body-main">
          <div class="row">
            <div>
              <span class="label">订单编号：</span>
              <span class="text">1233131313131313</span>
            </div>
            <div>
              <span class="label">收款时间：</span>
              <span class="text">1233131313131313</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">下单时间：</span>
              <span class="text">1233131313131313</span>
            </div>
            <div>
              <span class="label">完成时间：</span>
              <span class="text">1233131313131313</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">下单门店：</span>
              <span class="text">1233131313131313</span>
            </div>
            <div>
              <span class="label">收银员：&nbsp;&nbsp;&nbsp;</span>
              <span class="text">1233131313131313</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <p class="info-title">客户信息</p>
      <div class="info-body">
        <p class="info-body-name"><img src="" alt="">会员名</p>
        <div class="info-body-main">
          <div class="row">
            <div>
              <span class="label">客户编号：</span>
              <span class="text">1233131313131313</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">联系电话：</span>
              <span class="text">1233131313131313</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">客户身份：</span>
              <span class="text">1233131313131313</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <p class="info-title">消费信息</p>
      <div class="">
        <div class="info-body-main">
          <el-table :data="consumeData" style="width:100%">
            <el-table-column label="商品" prop="1" width="260" align="center">
              <template slot-scope="scope">
                <img src="" alt="">
                1000元会员卡
              </template>
            </el-table-column>
            <el-table-column label="技师" prop="2" align="center"></el-table-column>
            <el-table-column label="订单来源" prop="2" align="center"></el-table-column>
            <el-table-column label="单价（元）" prop="2" align="center"></el-table-column>
            <el-table-column label="数量" prop="2" align="center"></el-table-column>
            <el-table-column label="商品优惠" prop="2" align="center"></el-table-column>
            <el-table-column label="小计（元）" prop="2" align="center"></el-table-column>
          </el-table>
          <div class="summary">
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label">合计：</span>
              <span class="summary-amount">￥1000</span>
            </div>
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label">付款：第三方</span>
              <span class="summary-amount">￥1000</span>
            </div>
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label">合计收款：</span>
              <span class="summary-amount">￥1000</span>
            </div>
          </div>
          <div class="footer-bar">
            <el-button>打印小票</el-button>
            <el-button type="primary">主动退款</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderDetail',
  data() {
    return {
      consumeData: []
    }
  }
}
</script>

<style lang="css" scoped>
  .order-detail {
    background-color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 20px;
  }
  .info-title {
    display: flex;
    height: 50px;
    font-size: 16px;
    align-items: center;
    position: relative;
    background-color: #EBEEF5;
    padding-left: 25px;
  }
  .info-title::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 20px;
    left: 10px;
    top: 15px;
    background-color: #409EFF;
  }
  .info-body {
    padding: 30px;
  }
  .status {
    font-size: 28px;
    margin-bottom: 15px;
  }
  .info-body-name {
    color: #606266;
    font-size: 26px;
  }
  .info-body-name img {
    width: 50px;
    height: 50px;
    border: 1px solid gray;
    vertical-align: middle;
    margin: 0 15px 15px 0;
  }
  .row {
    display: flex;
  }
  .row>div {
    width: 245px;
    margin-right: 80px;
    line-height: 36px;
  }
  .row>div:last-child {
    flex: 1;
  }
  .label {
    color: #909399;
    margin-right: 10px;
  }
  .summary-item {
    display: flex;
    justify-content: flex-end;
    height: 40px;
    align-items: center;
    color: #909399;
  }
  .summary-item span.summary-label {
    width: 9%;
    text-align: left;
  }
  .summary-item span.summary-amount {
    width: 13%;
    text-align: center;
  }
  .space {
    flex: 1
  }
  .summary {
    padding: 10px 0;
    border-bottom: 1px solid #EBEEF5;
  }
  .footer-bar {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  
</style>