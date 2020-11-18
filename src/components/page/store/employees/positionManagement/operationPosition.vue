<template>
    <div class="AddEmployees">
        <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="归属门店:" prop="name">
                <!--<el-input v-model="form.name"></el-input>-->
                多多亲子岁月一店
            </el-form-item>
            <el-form-item label="职位名称:" prop="name" :rules="[{ required: true, message: '请输入职位名称', trigger: 'blur' } ]">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="职位描述:" prop="desc" :rules="[{ message: '请输入职位描述'} ]">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import * as api from '@/api/index'
export default {
    name: 'AddEmployees',
    data() {
        return {
            form: {}
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    const { data } = await api.positionSave(this.form);
                    this.$parent.handleClose();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onCancel () {
            this.$parent.handleClose();
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style >
    .el-upload--text{
        width: 90px;
        height: 90px;
        line-height: 90px;
    }
    .el-upload--text img{
        width: 100%;
    }
</style>
