<template>
  <div class="refund-step1">
    <el-table :data="params" style="width:100%">
      <el-table-column label="商品" prop="product" align="left">
        <template slot-scope="scope">
          <div class="product-ctner">
            <img :src="scope.row.img" alt="">
            <p>{{scope.row.name}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template>
          <span>1</span>
        </template>
      </el-table-column>
      <el-table-column label="可退金额" prop="total_price" align="right"></el-table-column>
    </el-table>
    <div class="footer-bar">
      <el-button type="primary" @click="handleNextStep">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'refundStep1',
  data() {
    return {
    }
  },
  props: {
    params: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleNextStep() {
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>
  .footer-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding-right: 20px;
  }
  .product-ctner {
    display: flex;
    align-items: center;
  }
  .product-ctner img {
    width: 56px;
    height: 56px;
    margin-right: 20px;
  }
</style>