<template>
  <div>
    <el-form :model="searchForm" :rules="formRules" label-width="120px">
      <el-form-item prop="name" label="推广员姓名">
        <el-input v-model="searchForm.name" class="medium-input"></el-input>
      </el-form-item>
      <el-form-item prop="alia" label="别名">
        <el-input v-model="searchForm.alia" class="medium-input"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码">
        <el-input v-model="searchForm.phone" class="medium-input"></el-input>
      </el-form-item>
      <el-form-item prop="city" label="归属地">
        <el-input v-model="searchForm.city" class="medium-input"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer-bar">
      <el-button @click="">取消</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const isTel = (value, errorMsg = '请输入正确格式的电话号码') => {
      const reg = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/
      return reg.test(value) ? '' : errorMsg
    }
    return {
      searchForm: {
        name: '',
        alia: '',
        phone: '',
        city: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: isTel, trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入归属地', trigger: 'blur' }
        ]
      }
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
  .medium-input.el-input {
    width: 70%
  }
</style>