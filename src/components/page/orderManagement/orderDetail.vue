<template>
  <div class="order-detail">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <order-detail></order-detail>
  </div>
</template>

<script>
import breadcrumb from '@/components/common/address'
import orderDetail from './components/orderDetail'
export default {
  name: 'orederDetail',
  data() {
    return {
      breadcrumbList: [
        { name: '首页', router: 'dashboard' },
        { name: '订单列表', router: 'OrderList' },
        { name: '订单详情', router: 'dashboard' },
      ]
    }
  },
  components: {
    breadcrumb,
    orderDetail
  },
  created() {},
  methods: {}
}
</script>

<style>

</style>