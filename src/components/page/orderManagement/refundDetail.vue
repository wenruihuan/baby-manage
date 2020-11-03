<template>
  <div class="refund-detail">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="order-detail">
    <div class="info">
      <p class="info-title">订单信息</p>
      <div class="info-body">
        <p class="status">{{(orderInfo.refund_status || 1) | refundStatusText}}</p>
        <div class="info-body-main">
          <div class="row">
            <div>
              <span class="label">退款编号：</span>
              <span class="text">{{orderInfo.refund_no}}</span>
            </div>
            <div>
              <span class="label">订单编号：</span>
              <span class="text">{{orderInfo.order_no}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">操作时间：</span>
              <span class="text">{{orderInfo.refund_create_time | timeFormatter}}</span>
            </div>
            <div>
              <span class="label">下单时间：</span>
              <span class="text">{{orderInfo.order_create_time | timeFormatter}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">操作人员：</span>
              <span class="text">{{orderInfo.operator}}</span>
            </div>
            <div>
              <span class="label">收银员：&nbsp;&nbsp;&nbsp;</span>
              <span class="text">{{orderInfo.checkout_staff}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">现金退款：&nbsp;&nbsp;&nbsp;</span>
              <span class="text">{{refundInfo.refund_price}}</span>
            </div>
            <div>
              <span class="label">下单门店：&nbsp;&nbsp;&nbsp;</span>
              <span class="text">{{orderInfo.shop_name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <p class="info-title">退款进度</p>
      <div class="info-body">
        <div class="info-body-main">
          <div class="row">
            <div>
              <span class="label">现金退款：</span>
              <span class="text">￥{{refundInfo.refund_price}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">商家退款：</span>
              <span class="text">{{refundInfo.refund_start_time}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">退款处理中：</span>
              <span class="text">{{refundInfo.refund_processing_time}}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">到账成功：</span>
              <span class="text">{{refundInfo.refund_end_time}}</span>
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
    <div class="info">
      <p class="info-title">退款明细</p>
      <div>
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
            <el-table-column label="技师" align="center">--</el-table-column>
            <el-table-column label="订单来源" prop="order_source" align="center"></el-table-column>
            <el-table-column label="单价（元）" prop="price" align="center"></el-table-column>
            <el-table-column label="数量" prop="count" align="center"></el-table-column>
            <el-table-column label="商品优惠" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.price*scope.row.count-scope.row.total_price}}</span>
              </template>
            </el-table-column>
            <el-table-column label="小计（元）" prop="total_price" align="center"></el-table-column>
          </el-table>
          <div class="summary">
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label">订单退款：{{refundInfo.refund_type}}</span>
              <span class="summary-amount">￥{{refundInfo.refund_price}}</span>
            </div>
            <div class="summary-item">
              <div class="space"></div>
              <span class="summary-label">合计退款：</span>
              <span class="summary-amount">￥{{refundInfo.refund_price}}</span>
            </div>
          </div>
          <div class="footer-bar">
            <el-button @click="handlePrint">打印退款小票</el-button>
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
        @cancel="handleCancel"
        @success="handlePrintSuccess"
      ></component>
    </el-dialog>
  </div>
  </div>
  
</template>

<script>
import Breadcrumb from '@/components/common/address'
import {getRefundDetail} from '@/api/orderManagement'
import PrintTicket from './components/printTicket'
import dayjs from 'dayjs'
export default {
  name: 'refundDetail',
  data() {
    return {
      orderId: this.$route.params.id,
      breadcrumbList: [
        { name: '首页', router: 'dashboard' },
        { name: '退单列表', router: 'RefundList' },
        { name: '退单详情', router: 'RefundDetail' },
      ],
      consume: [],
      orderInfo: {},
      refundInfo: {},
      memberInfo: {},
      consume: [],
      dialogShow: false
    }
  },
  components: {
    Breadcrumb,
    PrintTicket
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const prm = {
        refund_id: this.orderId
      }
      getRefundDetail(prm).then(res => {
        const { data } = res
        this.refundInfo = data
        const { order_info, refund_info, member_info, consume } = data
        this.memberInfo = member_info || {}
        this.orderInfo = order_info || {}
        this.refundInfo = refund_info || {}
        this.consume = consume || []
      }).catch(err => {
        console.log(err)
      })
    },
    handlePrint() {
      this.setDilogProp('printTicket', '', '300px', 'print-dialog', {})
    },
    setDilogProp(componentName, dialogTitle, dialogWidth, dialogClassName, dialogParams) {
      this.dialogTitle = dialogTitle
      this.componentName = componentName
      this.dialogWidth = dialogWidth
      this.dialogClassName = dialogClassName
      this.dialogShow = true
      this.dialogParams = dialogParams
    },
    handleCancel() {
      this.dialogShow = false
    },
    handlePrintSuccess() {
      this.dialogShow = false
    }
  },
  filters: {
    timeFormatter(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
    refundStatusText(val) {
      const textObj = { 1: '退款成功' }
      return textObj[val]
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
    color: #606266;
    font-size: 26px;
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