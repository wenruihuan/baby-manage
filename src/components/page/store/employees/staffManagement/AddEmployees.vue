<template>
    <div class="AddEmployees">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="归属门店:">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="系统账号:">
                <el-input v-model="form.acount"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:">
                <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="选择职位:">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关联角色:">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="头像:">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.resource">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import * as api from '../../../../../api/index'
export default {
    name: 'AddEmployees',
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            imageUrl: ''
        }
    },
    props: {
        employeesId: ''
    },
    methods: {
        getInfoData (value) {
            this.form = value.row;
        },
        onSubmit() {
            console.log('submit!');
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
