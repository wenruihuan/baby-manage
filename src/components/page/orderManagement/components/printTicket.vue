<template>
  <div>
  <div id="print-template">
    <div style="padding: 20px;font-size: 12px; width:300px;margin: 0 auto; box-sizing:border-box">
      <p style="text-align:center;line-height: 36px;font-size: 14px;">多多亲子岁月</p>
      <div>
        <div :style="titleStyle">
          <p :style="lineStyle"></p>
          <p>订单信息</p>
          <p :style="lineStyle"></p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">订单编号</p>
          <p>{{orderInfo.order_no}}</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">下单时间</p>
          <p>{{orderInfo.create_time}}</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">下单人</p>
          <p>{{memberInfo.member_name}}</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">收银员</p>
          <p>{{orderInfo.checkout_staff}}</p>
        </div>
      </div>
      <div>
        <div :style="titleStyle">
          <p :style="lineStyle"></p>
          <p>消费信息</p>
          <p :style="lineStyle"></p>
        </div>
        <div v-for="item in consume" :key="item.name">
          <div :style="rowStyle">
            <p :style="rowLeft">商品名称</p>
            <p>{{item.name}}</p>
          </div>
          <div :style="rowStyle">
            <p :style="rowLeft">数量</p>
            <p>{{item.count}}</p>
          </div>
          <div :style="rowStyle">
            <p :style="rowLeft">小计</p>
            <p>￥{{item.total_price}}</p>
          </div>
        </div>
      </div>
      <div :style="summaryStyle">
        <div :style="rowStyle">
          <p :style="rowLeft">合计</p>
          <p>￥{{consumeInfo.total_price}}</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">收款</p>
          <p>￥{{consumeInfo.checkout_price}}</p>
        </div>
      </div>
      <div>
        <p :style="tipStyle">扫码收藏店铺，随时可预约</p>
        <p :style="tipStyle">谢谢光临，欢迎光临</p>
        <p style="text-align: center">
          <img src="./imgs/alipay.png" alt="" style="width:65px;height:65px;border:1px solid #ccc;">
        </p>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <el-button @click="handleCancel">取消</el-button>
    <el-button type="primary" @click="handlePrint">打印</el-button>
  </div>
  </div>
</template>

<script>
import { printPartial } from '@/components/common/utils'
export default {
  name: 'printTicket',
  data() {
    return {
      rowStyle: {
        display: "flex",
        justifyContent: 'space-between',
        height: '30px',
        alignItems: 'center'
      },
      rowLeft: {
        color: '#BBBBBB',
        textAlign: 'left'
      },
      rowRight: {
        color: '#333333',
        textAlign: 'right'
      },
      titleStyle: {
        display: 'flex',
        height: '45px',
        alignItems: 'center',
        color: '#BBBBBB'
      },
      lineStyle: {
        width: '35%',
        height: '1px',
        backgroundColor: 'rgb(240 240 240)',
        flex: 1
      },
      summaryStyle: {
        padding: '10px 0',
        margin: '10px 0',
        borderTop: '1px solid rgb(240 240 240)',
        borderBottom: '1px solid rgb(240 240 240)'
      },
      tipStyle: {
        textAlign: 'center',
        marginBottom: '10px'
      },
      footerStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',
        paddingRight: '20px',
        paddingBottom: '20px'
      }
    }
  },
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  computed:{
    orderInfo() {
      return this.params.order_info
    },
    memberInfo() {
      return this.params.member_info
    },
    consume() {
      return this.params.consume
    },
    consumeInfo() {
      return this.params.consume_info
    }
  },
  created() {
    console.log('orderInfo', this.dialogParams)
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
    handlePrint() {
      const printStr = document.getElementById('print-template').innerHTML
      this.$emit('success', printStr)
    }
  }
}
</script>

<style scope>
  .footer-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
  }
</style>