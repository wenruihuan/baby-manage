<template>
  <div>
  <div id="print-template">
    <div style="padding:20px;font-size: 12px; width:300px;margin: 0 auto;box-sizing:border-box;">
      <p style="text-align:center;line-height: 36px;font-size: 14px;">多多亲子岁月</p>
      <div>
        <div :style="titleStyle">
          <p :style="lineStyle"></p>
          <p>订单信息</p>
          <p :style="lineStyle"></p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">退款编号</p>
          <p>
            {{orderInfo.refund_no}}
          </p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">退款时间</p>
          <p>{{orderInfo.refund_create_time}}</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">会员姓名</p>
          <p>{{memberInfo.member_name}}</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">联系电话</p>
          <p>{{memberInfo.member_phone}}</p>
        </div>
      </div>
      <div>
        <div :style="titleStyle">
          <p :style="lineStyle"></p>
          <p>退款信息</p>
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
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">可退金额</p>
          <p>￥{{refundInfo.refund_price_limit}}</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">退款金额</p>
          <p>￥{{refundInfo.refund_price}}</p>
        </div>
      </div>
      <div :style="summaryStyle">
        <div :style="rowStyle">
          <p :style="rowLeft">门店退款 {{refundInfo.refund_type}}</p>
          <p>￥{{refundInfo.refund_price}}</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">合计退款</p>
          <p>￥{{refundInfo.refund_price}}</p>
        </div>
      </div>
      <div>
        <p :style="tipStyle">扫码收藏店铺，随时可预约</p>
        <p :style="tipStyle">谢谢光临，欢迎光临</p>
        <p style="text-align: center">
          <img src="./imgs/alipay.png" style="width: 65px;height:65px;" alt="">
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
export default {
  name: 'printTicket',
  data() {
    return {
      content: {},
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
  computed: {
    orderInfo() {
      return this.params.order_info
    },
    memberInfo() {
      return this.params.member_info
    },
    consume() {
      return this.params.consume
    },
    refundInfo() {
      return this.params.refund_info
    }
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