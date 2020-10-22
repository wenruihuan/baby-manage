<template>
  <div class="qrcode-ctner">
    <div class="qrcode" id="qrcode" ref="qrcode"></div>
    <el-button @click="download">下载并保存</el-button>
  </div>
</template>

<script>
import Qrcode from 'qrcodejs2'
export default {
  props: {
    params: {
      type: Object,
      default: () => {
        codeContent: ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log('code', this.params.codeContent)
      this.getQrcode()
    })
  },
  methods: {
    download() {
      let myCanvas = document.getElementById('qrcode').getElementsByTagName('canvas')
      let a = document.createElement('a')
      a.href = myCanvas[0].toDataURL('image/png')
      a.download = '二维码'
      a.click()
      this.$message.success('正在下载保存')
    },
    getQrcode() {
      let qrcode = new Qrcode('qrcode', {
        width: 200,
        height: 200,
        text: this.params.codeContent
      })
    }
  }
}
</script>

<style scoped>
  .qrcode-ctner {
    text-align: center;
  }
  .qrcode {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
</style>