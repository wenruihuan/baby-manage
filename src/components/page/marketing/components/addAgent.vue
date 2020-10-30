<template>
  <div>
    <el-form ref="addForm" :model="searchForm" :rules="formRules" label-width="120px">
      <el-form-item prop="name" label="推广员姓名">
        <el-input v-model="searchForm.name" class="medium-input"></el-input>
      </el-form-item>
      <el-form-item prop="alia" label="别名">
        <el-input v-model="searchForm.alias" class="medium-input"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码">
        <el-input v-model="searchForm.phone" class="medium-input"></el-input>
      </el-form-item>
      <el-form-item prop="city" label="归属地">
        <el-input v-model="searchForm.city" class="medium-input"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer-bar">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { addFirstAgent } from '@/api/marketing'
export default {
  data() {
    const isTel = (rule, value, callback) => {
      const reg = /^1[3-9]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      searchForm: {
        name: '',
        alias: '',
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
  },
  methods: {
    handleSave() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addFirstAgent(this.searchForm).then(res => {
            if (res.code === 200) {
              this.$message.success('添加成功')
              this.$emit('success')
              this.$refs.addForm.resetFields()
            }
          })
        } else {
          return false
        }
      })
    },
    handleCancel() {
      this.$emit('cancel')
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