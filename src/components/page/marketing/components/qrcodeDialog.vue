<template>
    <div class="qrcode-ctner">
        <div class="qrcode" v-if="params.type === 'qrcode'" id="qrcode" ref="qrcode"></div>
        <div v-else class="qrcode">
            <img :src="params.codeContent" alt="" width="200px" height="200px" />
        </div>
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
      if (this.params.type === 'qrcode') {
        this.getQrcode()
      }
    })
  },
  methods: {
    download() {
      if (this.params.type === 'qrcode') {
        this.downloadQrcode()
      } else {
        this.downloadImg(this.params.codeContent)
      }
    },
    getQrcode() {
      let qrcode = new Qrcode('qrcode', {
        width: 200,
        height: 200,
        text: this.params.codeContent
      })
    },
    downloadQrcode() {
      let a = document.createElement('a')
      let myCanvas = document.getElementById('qrcode').getElementsByTagName('canvas')
      a.href = myCanvas[0].toDataURL('image/png')
      a.download = '二维码'
      a.click()
      this.$message.success('正在下载保存')
    },
    downloadImg(url) {
      let img = new Image()
      img.src = url
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = function() {
        let canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        let context = canvas.getContext('2d')
        context.drawImage(img, 0, 0, img.width, img.height)
        let url = canvas.toDataURL('image/png')
        let a = document.createElement('a')
        a.href = url
        a.download = '二维码'
        a.click()
        this.$message.success('正在下载保存')
      }
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