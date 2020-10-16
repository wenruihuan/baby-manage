<template>
  <div class="refund-detail">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <order-detail
      orderType="refund"
      :reqFn="getRefundDetail"
      :orderId="orderId"
    ></order-detail>
  </div>
  
</template>

<script>
import Breadcrumb from '@/components/common/address'
import OrderDetail from './components/orderDetail'
import {getRefundDetail} from '@/api/orderManagement'
export default {
  name: 'refundDetail',
  data() {
    return {
      orderId: this.$route.params.id,
      breadcrumbList: [
        { name: '首页', router: 'dashboard' },
        { name: '订单列表', router: 'OrderList' },
        { name: '退单详情', router: 'RefundDetail' },
      ]
    }
  },
  components: {
    OrderDetail,
    Breadcrumb
  },
  methods: {
    getRefundDetail
  }
}
</script>

<style>

</style>