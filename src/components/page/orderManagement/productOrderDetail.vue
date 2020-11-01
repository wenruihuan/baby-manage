<template>
  <div class="refund-detail">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <order-detail
      orderType="productOrder"
      :reqFn="getProductOrderDetail"
      :orderId="orderId"
    ></order-detail>
  </div>
</template>

<script>
import Breadcrumb from '@/components/common/address'
import OrderDetail from './components/orderDetail'
import { getProductOrderDetail } from '@/api/orderManagement'
export default {
  name: 'refundDetail',
  data() {
    return {
      orderId: this.$route.params.id,
      breadcrumbList: [
        { name: '首页', router: 'dashboard' },
        { name: '商品订单列表', router: 'ProductOrderList' },
        { name: '商品订单详情', router: 'ProductOrderDetail' },
      ]
    }
  },
  components: {
    OrderDetail,
    Breadcrumb
  },
  methods: {
    getProductOrderDetail
  }
}
</script>

<style>

</style>