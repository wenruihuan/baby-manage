<template>
  <div class="order-detail">
    <div class="info" v-if="isOrder">
      <p class="info-title">订单信息</p>
      <div class="info-body">
        <p class="status">{{orderInfo.order_status | orderStatusText}}</p>
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
        <p class="status">{{orderInfo.order_status | orderStatusText}}</p>
        <div class="info-body-main">
          <div class="row">
            <div>
              <span class="label">商品订单编号：</span>
              <span class="text">{{orderInfo.order_no}}</span>
            </div>
            <div>
              <!-- 未返回收件人电话 -->
              <span class="label">收件人：</span>
              <span class="text">{{orderInfo.receiver}}/+86 12312312321</span>
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
              <span class="text">{{orderInfo.region}} {{orderInfo.detail_address}}</span>
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
              <span class="text">{{bookingInfo.booking_no}}</span>
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
            <el-table-column v-if="!isProductOrderInfo" label="技师" 
              prop="technician" 
              align="center"
              :formatter="technicianFormatter"
            ></el-table-column>
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
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label">合计：</span>
              <span class="summary-amount">￥{{totalPrice}}</span>
            </div>
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label" v-if="isOrder">{{orderInfo.order_status | payText}}：{{payTypeName}}</span>
              <span class="summary-label" v-else>付款{{payTypeName}}</span>
              <!-- 付款金额未返回 -->
              <span class="summary-amount">￥0</span>
            </div>
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label">合计收款：</span>
              <span class="summary-amount">￥{{checkoutPrice}}</span>
            </div>
          </div>
          <div class="footer-bar" v-if="isOrder">
            <el-button @click="handlePrint">打印小票</el-button>
            <!-- <el-button type="primary" v-if="showRefundBtn" @click="handleRefund">主动退款</el-button> -->
            <el-button type="primary" @click="handleRefund">主动退款</el-button>
            <el-button v-if="showCancelBtn" @click="handleCancelOrder">取消订单</el-button>
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
                <el-button type="text" @click="handleJumpToDetail(scoped.row.refund_id)">详情</el-button>
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
    <div class="info" v-if="isProductOrderInfo">
      <p class="info-title">快递信息</p>
      <div class="info-body">
        <div class="info-body-main">
          <div class="row">
            <div class="row-item">
              <span class="label">物流公司：</span>
              <span class="text">{{expressInfo.express_name}}</span>
            </div>
            <div class="row-item">
              <span class="label">快递单号：</span>
              <span class="text">{{expressInfo.express_no}}</span>
            </div>
            <div class="row-item">
              <span class="label">操作人：</span>
              <span class="text">{{expressInfo.operator}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <print-ticket v-show="false" ref="print" :params="orderDetailObj"></print-ticket> -->
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
        @cancel="handleCancel"
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
import { getServiceDetail, getTimeCardDetail, getDiscountCardDetail, getRechargeetail } from '@/api/orderManagement'
import { printPartial } from '@/components/common/utils'
const typeObj = {
  service: getServiceDetail,
  time_card: getTimeCardDetail,
  discount_card: getDiscountCardDetail,
  recharge_card: getRechargeetail
}
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
      refundData: [],
      expressInfo: {},
      refundInfo: null,
      refundList: []
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
    isProductOrderInfo() {
      return this.orderType === 'productOrder'
    },
    isOrder() {
      return this.orderType === 'order'
    },
    showRefundBtn() {
      // 0待付款 1待发货 2已发货 3已完成 4已退款 5已取消
      return this.orderInfo.order_status === 3 && this.isOrder
    },
    showCancelBtn() {
      return this.orderInfo.order_status === 0 && this.isOrder
    }
  },
  created() {
    const params = {order_id: this.orderId}
    this.reqFn(params).then(res => {
      const {order_info, member_info, type, consume,
        booking_info, consume_info, refund_detail, 
        oplog_detail, total_price=0, checkout_price=0,
        express_info = {}, pay_type_name
     } = res.data
      this.orderDetailObj = res.data
      this.orderInfo = order_info || {}
      this.memberInfo = member_info || {}
      this.type = type || ''
      this.consume = consume || []
      this.bookingInfo = booking_info || null
      this.totalPrice = consume_info ? consume_info.total_price : total_price
      this.checkoutPrice = consume_info ? consume_info.checkout_price : checkout_price
      this.payTypeName = consume_info ? consume_info.pay_type_name : (pay_type_name || '')
      refund_detail && this.refundData.push(refund_detail)
      oplog_detail && this.logData.push(oplog_detail)
      this.expressInfo = express_info
    })
  },
  methods: {
    handleRefund() {
      typeObj[this.type]({order_id: this.orderId}).then(res => {
        const {data} = res
        this.refundInfo = data
        this.refundList = data.consume
        this.dialogShow = true
        this.setDilogProp('refundStep1', '退款商品', '700px', '', this.refundList )
      })
    },
    handleNextStep() {
      this.dialogShow = false
      const prm = Object.assign({}, this.refundInfo)
      prm.type = this.type
      prm.orderId = this.orderId
      console.log('prm', prm)
      this.setDilogProp('refundStep2', '主动退款', '700px', '', prm )
    },
    handlePrint() {
      this.setDilogProp('printTicket', '', '300px', 'print-dialog', this.orderDetailObj)
    },

    setDilogProp(componentName, dialogTitle, dialogWidth, dialogClassName, dialogParams) {
      this.dialogTitle = dialogTitle
      this.componentName = componentName
      this.dialogWidth = dialogWidth
      this.dialogClassName = dialogClassName
      this.dialogParams = dialogParams
      this.dialogShow = true
    },
    handleCancel() {
      this.dialogShow = false
    },
    handlePrintSuccess(printStr) {
      // const printString = this.$refs.print.$el.innerHTML
      printPartial(printStr)
      this.dialogShow = false
    },
    dateFormate(row, column, cellValue, index) {
      if (cellValue) {
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    handleJumpToDetail(refundId) {
      this.$router.push(`/RefundDetail/${refundId}`)
    },
    handleCancelOrder() {

    },
    technicianFormatter(row, column, cellValue, index) {
      if (Array.isArray(cellValue)) {
        const nameList = cellValue.map(item => item.technician_name)
        return nameList.join(';')
      } else {
        return '--'
      }
    }
  },
  filters: {
    timeFormatter(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
    orderStatusText(val) {
      // 0待付款 1待发货 2已发货 3已完成 4已退款 5已取消
      const textObj = {0: '待付款', 1: '待发货', 2: '已发货', 3: '已完成', 4: '已退款', 5: '已取消'}
      return textObj[val]
    },
    payText(val) {
      if (['0', '5'].includes(val)) {
        return '待支付'
      } else if (['3', '4'].includes(val)) {
        return '付款'
      }
    }
  }
}
</script>
<style lang="css">
  .print-dialog .el-dialog .el-dialog__body {
    padding: 0;
    margin: 0;
  }
  .print-dialog .el-dialog .el-dialog__header {
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
    background-color: rgba(242, 242, 242, 1);
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
    font-size: 22px;
    margin-bottom: 15px;
  }
  .info-body-name {
    color: #333;
    font-size: 18px;
  }
  .info-body-name img {
    width: 45px;
    height: 45px;
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
    width: 160px;
    text-align: left;
  }
  .summary-item span.summary-amount {
    width: 140px;
    text-align: left;
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