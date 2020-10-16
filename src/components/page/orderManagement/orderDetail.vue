<template>
  <div class="order-detail">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <order-detail
      orderType="order"
      :reqFn="getOrderDetail"
      :orderId="orderId"
    ></order-detail>
  </div>
</template>

<script>
import Breadcrumb from '@/components/common/address'
import OrderDetail from './components/orderDetail'
import { getOrderDetail } from '@/api/orderManagement'
export default {
  name: 'orederDetail',
  data() {
    return {
      breadcrumbList: [
        { name: '首页', router: 'dashboard' },
        { name: '订单列表', router: 'OrderList' },
        { name: '订单详情', router: 'OrderDetail' },
      ],
      orderId: this.$route.params.id
    }
  },
  components: {
    Breadcrumb,
    OrderDetail
  },
  created() {},
  methods: {
    getOrderDetail
  }
}
</script>

<style>

</style>