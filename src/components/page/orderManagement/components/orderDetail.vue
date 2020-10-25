<template>
  <div class="order-detail">
    <div class="info" v-if="isOrder">
      <p class="info-title">订单信息</p>
      <div class="info-body">
        <p class="status">{{orderInfo.order_status}}</p>
        <div class="info-body-main">
          <div class="row">
            <div>
              <span class="label">订单编号：</span>
              <span class="text">{{orderInfo.order_no}}</span>
            </div>
            <div>
              <span class="label">收款时间：</span>
              <span class="text">{{orderInfo.checkout_time}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">下单时间：</span>
              <span class="text">{{orderInfo.create_time}}</span>
            </div>
            <div>
              <span class="label">完成时间：</span>
              <span class="text">1233131313131313</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">下单门店：</span>
              <span class="text">{{orderInfo.shop_name}}</span>
            </div>
            <div>
              <span class="label">收银员：&nbsp;&nbsp;&nbsp;</span>
              <span class="text">{{orderInfo.checkout_staff}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info" v-if="isRefund">
      <p class="info-title">订单信息</p>
      <div class="info-body">
        <p class="status">退款成功</p>
        <div class="info-body-main">
          <div class="row">
            <div>
              <span class="label">退款编号：</span>
              <span class="text">{{orderDetailObj.refund_no}}</span>
            </div>
            <div>
              <span class="label">订单编号：</span>
              <span class="text">{{orderDetailObj.order_no}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">操作时间：</span>
              <span class="text">{{orderDetailObj.refund_create_time}}</span>
            </div>
            <div>
              <span class="label">下单时间：</span>
              <span class="text">{{orderDetailObj.order_create_time}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">操作人员：</span>
              <span class="text">{{orderDetailObj.operator}}</span>
            </div>
            <div>
              <span class="label">收银员&nbsp;&nbsp;&nbsp;：</span>
              <span class="text">{{orderDetailObj.cashier}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">现金退款</span>
              <span class="text">{{orderDetailObj.refund_price}}</span>
            </div>
            <div>
              <span class="label">下单门店：</span>
              <span class="text">{{orderDetailObj.shop_name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info" v-if="isProductOrderInfo">
      <p class="info-title">订单信息</p>
      <div class="info-body">
        <p class="status">{{orderInfo.order_status}}</p>
        <div class="info-body-main">
          <div class="row">
            <div>
              <span class="label">商品订单编号：</span>
              <span class="text">{{orderInfo.order_no}}</span>
            </div>
            <div>
              <!-- 未返回信息 -->
              <span class="label">收件人：</span>
              <span class="text">王太太/+86 12312312321</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">订购时间：</span>
              <span class="text">{{orderInfo.create_time}}</span>
            </div>
            <div>
              <!-- 未返回信息 -->
              <span class="label">收件人地址：</span>
              <span class="text">江苏省 南京市 建邺区 奥体名座A座 1309室</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">订购门店：</span>
              <span class="text">{{orderInfo.shop_name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <p class="info-title">客户信息</p>
      <div class="info-body">
        <p class="info-body-name"><img src="" alt="">{{memberInfo.member_name}}</p>
        <div class="info-body-main">
          <div class="row">
            <div>
              <span class="label">客户编号：</span>
              <span class="text">{{memberInfo.member_no}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">联系电话：</span>
              <span class="text">{{memberInfo.member_phone}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">客户身份：</span>
              <span class="text">{{memberInfo.level_name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 服务单展示 -->
    <!-- todo: 判断是服务订单 -->
    <div class="info" v-if="isOrder && type==='service'">
      <p class="info-title">预约信息</p>
      <div class="info-body">
        <div class="info-body-main">
          <div class="row">
            <div class="row-item">
              <span class="label">预约单号：</span>
              <!-- 服务端未返回预约单号 -->
              <span class="text">8797797799789799</span>
            </div>
            <div class="row-item">
              <span class="label">预约时间：</span>
              <span class="text">{{bookingInfo.arrive_time}}</span>
            </div>
            <div class="row-item">
              <span class="label">到店人：</span>
              <!-- 服务端未返回电话号码 -->
              <span class="text">{{bookingInfo.customer}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <p class="info-title">消费信息</p>
      <div class="">
        <div class="info-body-main">
          <el-table :data="consume" style="width:100%">
            <el-table-column label="商品" prop="name" width="260" align="center">
              <template slot-scope="scope">
                <div class="product-ctner">
                  <img :src="scope.row.img" alt="" width="50px" height="50px">
                  {{scope.row.name}}  
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="!isProductOrderInfo" label="技师" align="center">--</el-table-column>
            <!-- 订单来源未返回 -->
            <el-table-column v-if="!isProductOrderInfo" label="订单来源" prop="2" align="center"></el-table-column>
            <el-table-column v-if="isProductOrderInfo" label="规格" prop="2" align="center"></el-table-column>
            <!-- 未返回 -->
            <el-table-column label="单价（元）" prop="" align="center"></el-table-column>
            <el-table-column label="数量" prop="service_time" align="center"></el-table-column>
            <!-- 未返回 -->
            <el-table-column label="商品优惠" prop="2" align="center"></el-table-column>
            <el-table-column label="小计（元）" prop="total_price" align="center"></el-table-column>
          </el-table>
          <div class="summary">
            <div class="summary-item" v-if="!isRefund">
              <div class="space"></div>
              <span class="summary-label">合计：</span>
              <span class="summary-amount">￥{{totalPrice}}</span>
            </div>
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label">{{payText}}第三方</span>
              <span class="summary-amount">￥{{checkoutPrice}}</span>
            </div>
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label">合计收款：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span class="summary-amount">￥{{balancePrice}}</span>
            </div>
          </div>
          <div class="footer-bar" v-if="!isProductOrderInfo">
            <el-button @click="handlePrint">打印小票</el-button>
            <el-button type="primary" @click="handleRefund">主动退款</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- todo: 已退款status待确定 未返回-->
    <div class="info" v-if="isOrder && orderInfo.order_status === 0">
      <p class="info-title">退款记录</p>
      <div class="info-body">
        <div class="info-body-main">
          <el-table :data="refundData" style="width:100%">
            <el-table-column label="退款单号" prop="1" align="center"></el-table-column>
            <el-table-column label="操作时间" prop="2" width="220" align="center"></el-table-column>
            <el-table-column label="操作人" prop="3" align="center"></el-table-column>
            <el-table-column label="退款金额（元）" prop="4" align="center"></el-table-column>
            <el-table-column label="操作" prop="5" align="center">
              <template slot-scope="scoped">
                <el-button type="text">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- todo: 已退款订单status待确定 未返回-->
    <div class="info" v-if="isOrder && orderInfo.order_status === 0">
      <p class="info-title">操作日志</p>
      <div class="info-body">
        <div class="info-body-main">
          <el-table :data="refundData" style="width:100%">
            <el-table-column label="操作人" prop="1" width="220" align="center"></el-table-column>
            <el-table-column label="操作时间" prop="2" align="center"></el-table-column>
            <el-table-column label="操作类型" prop="3" align="center"></el-table-column>
            <el-table-column label="备注" prop="4" width="220" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 快递信息未返回 -->
    <div class="info" v-if="isProductOrderInfo">
      <p class="info-title">快递信息</p>
      <div class="info-body">
        <div class="info-body-main">
          <div class="row">
            <div class="row-item">
              <span class="label">物流公司：</span>
              <span class="text">顺丰快递</span>
            </div>
            <div class="row-item">
              <span class="label">快递单号：</span>
              <span class="text">SF1193562691911</span>
            </div>
            <div class="row-item">
              <span class="label">操作人：</span>
              <span class="text">小花</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog 
      v-if="dialogShow"
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="dialogShow"
      :width="dialogWidth"
      :class="dialogClassName"
    >
      <component 
        :is="componentName" 
        :params="dialogParams"
        @nextStep="handleNextStep"
        @cancel="handleCancle"
        @success="handlePrintSuccess"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import RefundStep1 from './refundStep1'
import RefundStep2 from './refundStep2'
import PrintTicket from './printTicket'
export default {
  name: 'orderDetail',
  components: {
    RefundStep1,
    RefundStep2,
    PrintTicket
  },
  data() {
    return {
      orderDetailObj: {},
      orderInfo: {},
      memberInfo: {},
      type: '',
      consume: [],
      bookingInfo: {},
      totalPrice: 0,
      balancePrice: 0,
      checkoutPrice: '',
      dialogShow: false,
      dialogTitle: '',
      dialogParams: null,
      componentName: '',
      dialogWidth: '700px'
    }
  },
  props: {
    orderType: '',
    reqFn: {
      type: Function,
      default: () => null
    },
    orderId: ''
  },
  computed: {
    payText(){
      switch(this.orderType) {
        case 'order', 'productOrder': 
          return '付款：'
          break
        case 'refund':
          return '订单退款：'
      }
    },
    isProductOrderInfo() {
      return this.orderType === 'productOrder'
    },
    isRefund() {
      return this.orderType === 'refund'
    },
    isOrder() {
      return this.orderType === 'order'
    }
  },
  created() {
    const params = {order_id: this.orderId}
    this.reqFn(params).then(res => {
      const {order_info, member_info, type, consume,
        booking_info, total_price, balance_price,
        checkout_price } = res.data
      this.orderDetailObj = res.data
      this.orderInfo = order_info || {}
      this.memberInfo = member_info || {}
      this.type = type || ''
      this.consume = consume || []
      this.bookingInfo = bookingInfo || {}
      this.totalPrice = total_price || 0
      this.balancePrice = balance_price || 0
      this.checkoutPrice = checkout_price || 0
    })
  },
  methods: {
    handleRefund() {
      this.dialogShow = true
      this.setDilogProp('refundStep1', '退款商品', '700px', '' )
    },
    handleNextStep() {
      this.dialogShow = false
      this.setDilogProp('refundStep2', '主动退款', '700px', '' )
    },
    handlePrint() {
      this.setDilogProp('printTicket', '', '300px', 'print-dialog')
    },
    setDilogProp(componentName, dialogTitle, dialogWidth, dialogClassName) {
      this.dialogTitle = dialogTitle
      this.componentName = componentName
      this.dialogWidth = dialogWidth
      this.dialogClassName = dialogClassName
      this.dialogShow = true
    },
    handleCancel() {
      this.dialogShow = false
    },
    handlePrintSuccess() {
      this.dialogShow = false
    }
  }
}
</script>
<style lang="css">
  .print-dialog .el-dialog__body {
    padding: 0
  }
  .print-dialog .el-dialog__header {
    padding: 0
  }
</style>
<style lang="css" scoped>
  .order-detail {
    background-color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 20px;
    font-size: 14px;
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
    width: 280px;
    margin-right: 80px;
    line-height: 36px;
  }
  .row>div.row-item {
    width: 30%;
    margin-right:0;
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
  .product-ctner { 
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .product-ctner img {
    margin-right: 10px;
  }
  .print-dialog {

  }
  
</style>