<template>
  <div class="dialog-template">
    <div class="title">
      <img src="" alt="" width="50px" height="50px">
      <div class="product-info">
        <p class="name">{{rowData.shop_name}}</p>
        <p class="price">￥{{rowData.price}}</p>
      </div>
    </div>
    <div class="options">
      <p class="label">优惠方式：</p>
      <!-- todo: label名待定 -->
      <el-radio v-model="rowData.type" label="target_discount">优惠折扣</el-radio>
      <el-radio v-model="rowData.type" label="target_price">指定价格</el-radio>
    </div>
    <div class="main-body">
      <div class="main-header body-row">
        <p>参与会员价</p>
        <p>优惠规则</p>
      </div>
      <el-checkbox-group v-model="checkList">
        <div class="body-row" v-for="item in memberLevels" :key="item.level_id">
          <p><el-checkbox :label="item.level_id">{{item.name}}</el-checkbox></p>
          <p class="input-cter input-price" v-show="rowData.type==='target_price'">
            <el-input v-model.number="rowData[item.level_id].price" ></el-input>
          </p>
          <p class="input-cter input-discount" v-show="rowData.type==='target_discount'">
            <el-input v-model.number="rowData[item.level_id].discount"></el-input>
          </p>
        </div>
      </el-checkbox-group>
    </div>
    <div class="footer-bar">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { setMemberProduct } from '@/api/marketing'
import _ from 'lodash'
export default {
  data() {
    return {
      checkList: []
    }
  },
  props: {
    rowData: {
      type: Object,
      default: () => {}
    },
    memberLevels: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSave() {
      const params = Object.assign({}, this.rowData)
      const memberLevelIds = this.memberLevels.map(item => item.level_id)
      const diffIds = _.difference(memberLevelIds, this.checkList)
      diffIds.forEach(ele => {
        delete params[ele]
      });
      setMemberProduct(this.productInfo).then(res => {
        this.$message.success('设置成功')
        this.$emit('success')
      }).catch(err => {
        console.log(err)
      })
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
  .dialog-template {
    padding: 0 10px;
  }
  .options, .title {
    display: flex;
    align-items: center;
  }
  .title {
    margin-bottom: 30px;
  }
  .product-info {
    margin-left: 10px;
  }
  .main-body {
    width: 90%;
    margin: 0 auto;
  }
  .main-header.body-row {
    height: 40px;
    background-color: #EBEEF5;
    margin-top: 20px;
  }
  .body-row p {
    width: 160px;
    text-align: center;
  }
  .body-row p.input-cter {
    margin-right:20px;
  }
  .body-row {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
  }
  .input-cter {
    width: 120px;
  }
  .input-cter .el-input {
    padding-right: 28px;
    box-sizing: border-box;
  }
  .footer-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding-right: 20px;
  }
  .input-price, .input-discount {
    position: relative;
  }
  .input-price::after, .input-discount::after{
    position: absolute;
    width: 28px;
    height: 32px;
    line-height: 32px;
    border-left: 1px solid #EBEEF5;
    right: 0;
    top: 0;
    background-color: #EBEEF5;
  }
  .input-price::after {
    content: '元';
  }
  .input-discount::after {
    content: '折';
  }
</style>