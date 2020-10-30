<template>
  <div class="refund-step1">
    <el-table border :data="params" style="width:100%">
      <el-table-column label="商品" prop="product">
        <template slot-scope="scope">
          <div class="product-ctner">
            <img src="" alt="">
            <p>{{scope.row.product}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="product"></el-table-column>
      <el-table-column label="可退金额" prop="product"></el-table-column>
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
</style>