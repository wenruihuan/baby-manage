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
            <div v-if="['3','4','5'].includes(orderInfo.order_status)">
              <span class="label">{{orderInfo.order_status === '5' ? '取消': '收款'}}时间：</span>
              <span class="text">{{(orderInfo.order_status === '5' ? orderInfo.cancel_time : orderInfo.checkout_time) | timeFormatter}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">下单时间：</span>
              <span class="text">{{orderInfo.create_time | timeFormatter}}</span>
            </div>
            <div v-if="['3','4'].includes(orderInfo.order_status)">
              <span class="label">完成时间：</span>
              <span class="text">{{orderInfo.complete_time | timeFormatter}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">下单门店：</span>
              <span class="text">{{orderInfo.shop_name}}</span>
            </div>
            <div v-if="['3','4','5'].includes(orderInfo.order_status)">
              <span class="label">收银员：&nbsp;&nbsp;&nbsp;</span>
              <span class="text">{{orderInfo.checkout_staff}}</span>
            </div>
          </div>
          <div class="row" v-if="['0'].includes(orderInfo.order_status)">
            <div>
              <span class="label">收银员：&nbsp;&nbsp;&nbsp;</span>
              <span class="text">{{orderInfo.checkout_staff}}</span>
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
              <span class="text">{{orderInfo.create_time | timeFormatter}}</span>
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
        <p class="info-body-name"><img :src="memberInfo.member_url" alt="">{{memberInfo.member_name}}</p>
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
    <div class="info" v-if="bookingInfo">
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
              <span class="text">{{bookingInfo.arrive_time | timeFormatter}}</span>
            </div>
            <div class="row-item">
              <span class="label">到店人：</span>
              <span class="text">{{bookingInfo.customer}}/{{bookingInfo.phone}}</span>
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
            <el-table-column v-if="!isProductOrderInfo" label="订单来源" prop="order_source" align="center"></el-table-column>
            <el-table-column v-if="isProductOrderInfo" label="规格" prop="sku" align="center"></el-table-column>
            <el-table-column label="单价（元）" prop="price" align="center"></el-table-column>
            <el-table-column label="数量" prop="count" align="center"></el-table-column>
            <el-table-column v-if="!isProductOrderInfo" label="商品优惠" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.price*scope.row.count-scope.row.total_price}}</span>
              </template>
            </el-table-column>
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
              <span class="summary-label">{{payText}}{{payTypeName}}</span>
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
            <!-- 判断可退款状态 -->
            <el-button type="primary" @click="handleRefund">主动退款</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="info" v-if="refundData.length>0">
      <p class="info-title">退款记录</p>
      <div class="info-body">
        <div class="info-body-main">
          <el-table :data="refundData" style="width:100%">
            <el-table-column label="退款单号" prop="refund_no" align="center"></el-table-column>
            <el-table-column label="操作时间" prop="create_time" width="220" align="center" :formatter="dateFormate"></el-table-column>
            <el-table-column label="操作人" prop="operator" align="center"></el-table-column>
            <el-table-column label="退款金额（元）" prop="operator" align="center"></el-table-column>
            <el-table-column label="操作" prop="5" align="center">
              <template slot-scope="scoped">
                <el-button type="text">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="info" v-if="logData.length>0">
      <p class="info-title">操作日志</p>
      <div class="info-body">
        <div class="info-body-main">
          <el-table :data="logData" style="width:100%">
            <el-table-column label="操作人" prop="operator" width="220" align="center"></el-table-column>
            <el-table-column label="操作时间" prop="create_time" align="center" :formatter="dateFormate"></el-table-column>
            <el-table-column label="操作类型" prop="operation_name" align="center"></el-table-column>
            <el-table-column label="备注" prop="remark" width="220" align="center"></el-table-column>
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
import dayjs from 'dayjs'
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
      payTypeName: '',
      dialogShow: false,
      dialogTitle: '',
      dialogParams: null,
      componentName: '',
      dialogWidth: '700px',
      logData: [],
      refundData: []
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
        booking_info, consume_info, refund_detail, oplog_detail } = res.data
      this.orderDetailObj = res.data
      this.orderInfo = order_info || {}
      this.memberInfo = member_info || {}
      this.type = type || ''
      this.consume = consume || []
      this.bookingInfo = booking_info || null
      this.totalPrice = consume_info.total_price || 0
      this.balancePrice = consume_info.balance_price || 0
      this.checkoutPrice = consume_info.checkout_price || 0
      this.payTypeName = consume_info.consume_info || ''
      this.refundData.push(refund_detail)
      this.logData.push(oplog_detail)
    })
  },
  methods: {
    handleRefund() {
      this.dialogShow = true
      this.setDilogProp('refundStep1', '退款商品', '700px', '' )
    },
    getRefundInfo() {

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
    },
    dateFormate(row, column, cellValue, index) {
      if (cellValue) {
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    }
  },
  filters: {
    timeFormatter(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
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
  /* .print-dialog {

  } */
  
</style>