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
      <el-radio v-model="productInfo.type" label="target_discount">优惠折扣</el-radio>
      <el-radio v-model="productInfo.type" label="target_price">指定价格</el-radio>
    </div>
    <div class="main-body">
      <div class="main-header body-row">
        <p>参与会员价</p>
        <p>优惠规则</p>
      </div>
      <div class="body-row">
        <p><el-checkbox>多多会员</el-checkbox></p>
        <p class="input-cter input-price" v-show="productInfo.type==='target_price'"><el-input disabled></el-input></p>
        <p class="input-cter input-discount" v-show="productInfo.type==='target_discount'"><el-input disabled></el-input></p>
      </div>
      <div class="body-row">
        <p>
          <el-checkbox v-model="productInfo.testDataLevelID1">亲子会员</el-checkbox>
        </p>
        <p class="input-cter input-price" v-show="productInfo.type==='target_price'">
          <el-input v-model.number="productInfo.testDataLevelID1.price" ></el-input>
        </p>
        <p class="input-cter input-discount" v-show="productInfo.type==='target_discount'">
          <el-input v-model.number="productInfo.testDataLevelID1.price"></el-input>
        </p>
      </div>
      <div class="body-row">
        <p><el-checkbox v-model="productInfo.testDataLevelID2">黄金会员</el-checkbox></p>
        <p class="input-cter input-price" v-show="productInfo.type==='target_price'"><el-input v-model.number="productInfo.testDataLevelID2.price"></el-input></p>
        <p class="input-cter input-discount" v-show="productInfo.type==='target_discount'"><el-input v-model.number="productInfo.testDataLevelID2.discount"></el-input></p>
      </div>
      <div class="body-row">
        <p><el-checkbox v-model="productInfo.testDataLevelID3">铂金会员</el-checkbox></p>
        <p class="input-cter input-price" v-show="productInfo.type==='target_price'"><el-input v-model.number="productInfo.testDataLevelID3.price"></el-input></p>
        <p class="input-cter input-discount" v-show="productInfo.type==='target_discount'"><el-input v-model.number="productInfo.testDataLevelID3.discount"></el-input></p>
      </div>
      <div class="body-row">
        <p><el-checkbox v-model="productInfo.testDataLevelID4">钻石会员</el-checkbox></p>
        <p class="input-cter input-price" v-show="productInfo.type==='target_price'"><el-input v-model.number="productInfo.testDataLevelID4.price"></el-input></p>
        <p class="input-cter input-discount" v-show="productInfo.type==='target_discount'"><el-input v-model.number="productInfo.testDataLevelID4.discount"></el-input></p>
      </div>
    </div>
    <div class="footer-bar">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { setMemberProduct } from '@/api/marketing'
export default {
  data() {
    return {
      productInfo: {
        type: '', // target_price、target_discount
        member_price_id: '',
        testDataLevelID1: {price: 0, discount: 0},
        testDataLevelID2: {price: 0, discount: 0},
        testDataLevelID3: {price: 0, discount: 0},
        testDataLevelID4: {price: 0, discount: 0}
      },
      checkList: []
    }
  },
  props: {
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.productInfo.member_price_id = this.rowData.member_price_id
      this.productInfo.type = this.rowData.type
      this.productInfo.testDataLevelID1.price = this.rowData['1testDataLevelID'] && this.rowData['1testDataLevelID'].price || ''
      this.productInfo.testDataLevelID1.discount = this.rowData['1testDataLevelID'] && this.rowData['1testDataLevelID'].discount || ''
      this.productInfo.testDataLevelID2.price = this.rowData['2testDataLevelID'] && this.rowData['2testDataLevelID'].price || ''
      this.productInfo.testDataLevelID2.discount = this.rowData['2testDataLevelID'] && this.rowData['2testDataLevelID'].discount || ''
      this.productInfo.testDataLevelID3.price = this.rowData['3testDataLevelID'] && this.rowData['3testDataLevelID'].price || ''
      this.productInfo.testDataLevelID3.discount = this.rowData['3testDataLevelID'] && this.rowData['3testDataLevelID'].discount || ''
      this.productInfo.testDataLevelID4.price = this.rowData['4testDataLevelID'] && this.rowData['4testDataLevelID'].price || ''
      this.productInfo.testDataLevelID4.discount = this.rowData['4testDataLevelID'] && this.rowData['4testDataLevelID'].discount || ''      
    },
    handleSave() {
      const params = Object.assign({}, this,this.productInfo)
      params['1testDataLevelID'] = this.productInfo.testDataLevelID1
      params['2testDataLevelID'] = this.productInfo.testDataLevelID2
      params['3testDataLevelID'] = this.productInfo.testDataLevelID3
      params['4testDataLevelID'] = this.productInfo.testDataLevelID4
      console.log('params: ', params)
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