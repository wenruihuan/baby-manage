<template>
    <div class="AddEmployees">
        <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
            <div class="dialogMain">
                <el-form-item label="归属门店:">
                    多多亲子岁月一店
                </el-form-item>
                <el-form-item label="姓名:" prop="name">
                    <el-input :disabled="disabled" class="width150" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="系统账号:" prop="acount">
                    <el-input :disabled="disabled" class="width150" v-model="form.acount"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:" prop="tel">
                    <el-input :disabled="disabled" class="width150" v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="选择职位:" prop="position_id">
<!--                    <input v-model="form.position_id" hidden />-->
                    <el-select
                        :disabled="disabled"
                        v-model="form.position_id"
                        placeholder="选择职位"
                        class="handle-select mr10 width150"
                    >
                        <el-option
                            :key="item.id"
                            v-for="item in positionSelectList"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联角色:" prop="role_ids">
                    <el-select
                        :disabled="disabled"
                        multiple
                        v-model="form.role_ids"
                        placeholder="选择职位"
                        class="handle-select mr10 width150"
                    >
                        <el-option
                            :key="item.id"
                            v-for="item in roleSelectList"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="头像:" prop="img">
                    <el-upload
                        :disabled="disabled"
                        action="http://up-z0.qiniu.com"
                        class="avatar-uploader"
                        :data="uploadBody"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-success="handleUploadSuccess"
                    >
                        <img :src="form.img">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group :disabled="disabled" class="width150" v-model="form.resource">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input :disabled="disabled" class="width250 height150" type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </div>

            <el-form-item style="border-top: 1px solid #eee; padding-top: 20px;" class="alignRight clearfix">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import * as api from '../../../../../api/index'
import { getUploadToken } from '@/components/page/goodsmanage/goods/api';
export default {
    name: 'AddEmployees',
    data() {
        return {
            positionSelectList: [],
            uploadBody: {
                token: '',
                key: ''
            },
            disabled: false,
            files: [],
            roleSelectList: [],
            formRules: {
                shop_name: [{ required: true, message: '请填写归属门店', trigger: 'blur' }],
                name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
                acount: [{ required: true, message: '请填写系统账号', trigger: 'blur' }],
                tel: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
                position_id: [{ required: true, message: '请填写选择职位', trigger: 'change' }],
                role_ids: [{ required: true, message: '请填写选择关联角色', trigger: 'change' }],
            },
            form: {
                role_ids: [],
                img: ''
            },
            baseUrl: '',
            imageUrl: ''
        }
    },
    props: {
        employeesId: ''
    },
    created () {
        this.getUploadToken();
        this.getPositionSelectList();
        this.getRoleSelectList();
    },
    methods: {

        /* 获取上传图片的token */
        async getUploadToken () {
            try{
                const data = await getUploadToken();
                this.uploadBody.token = data.data.uptoken;
                this.baseUrl = data.data.baseUrl;
            } catch (e) {
                console.log(`getUploadToken error: ${e}`);
            }
        },

        /* 上传之前 */
        beforeUpload (file) {
            this.uploadBody.key = file.name;
            return true;
        },
        /* 成功上传 */
        handleUploadSuccess (res, file) {
            this.form.img = `${ this.baseUrl }/${ file.name }`;
        },
        async getPositionSelectList () {
            const { data } = await api.positionSelectList();
            this.positionSelectList = data.data;
            console.log(data.data);
        },
        async getRoleSelectList () {
            const { data } = await api.roleSelectList();
            this.roleSelectList = data.data;
            console.log(data.data);
        },
        getInfoData (value, state) {
            this.form = value.row;
            if (state === 'view') {
                this.disabled = true;
            }
        },
        async onSubmit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const { data } = await api.staffSave(this.form);
                    this.$parent.handleClose();
                }
            })
        },
        onCancel () {
            this.$parent.handleClose();
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/jpeg';
            // const isLt2M = file.size / 1024 / 1024 < 2;
            //
            // if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            //     this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isJPG && isLt2M;
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
    .height150 textarea{
        height: 100%;
    }
</style>
