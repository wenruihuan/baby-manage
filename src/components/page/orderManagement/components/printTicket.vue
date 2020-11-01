<template>
  <div id="print-template" style="width:300px;margin: 0 auto;">
    <div style="padding: 20px;font-size: 12px;">
      <p style="text-align:center;line-height: 36px;font-size: 14px;">多多亲子岁月</p>
      <div>
        <div :style="titleStyle">
          <p :style="lineStyle"></p>
          <p>订单信息</p>
          <p :style="lineStyle"></p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">订单编号</p>
          <p>FW20200820131423001</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">下单时间</p>
          <p>2020-08-20 13:14:23</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">下单人</p>
          <p>会*名</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">收银员</p>
          <p>丁丁</p>
        </div>
      </div>
      <div>
        <div :style="titleStyle">
          <p :style="lineStyle"></p>
          <p>消费信息</p>
          <p :style="lineStyle"></p>
        </div>
        
        <div :style="rowStyle">
          <p :style="rowLeft">商品名称</p>
          <p>FW20200820131423001</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">数量</p>
          <p>2020-08-20 13:14:23</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">小计</p>
          <p>￥100</p>
        </div>
      </div>
      <div :style="summaryStyle">
        <div :style="rowStyle">
          <p :style="rowLeft">合计</p>
          <p>￥100.00</p>
        </div>
        <div :style="rowStyle">
          <p :style="rowLeft">收款</p>
          <p>￥100.00</p>
        </div>
      </div>
      <div>
        <p :style="tipStyle">扫码收藏店铺，随时可预约</p>
        <p :style="tipStyle">谢谢光临，欢迎光临</p>
        <p></p>
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
      }
    }
  },
  props: {
    dialogParams: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
    handlePrint() {
      this.$emit('success')
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