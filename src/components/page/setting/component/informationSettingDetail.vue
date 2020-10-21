<template>
    <el-dialog
        class="information-setting-detail"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="680px"
    >
        <el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <el-form-item label="标题：" prop="title">
                <el-input v-model="formData.title" placeholder="请填写文章标题"></el-input>
            </el-form-item>
            <el-form-item label="头图：" prop="img">
                <el-upload
                    class="avatar-uploader"
                    action="http://up-z0.qiniu.com"
                    :data="uploadBody"
                    :before-upload="beforeUpload"
                    :on-success="handleUploadSuccess"
                    :show-file-list="false"
                >
                    <img v-if="formData.img" :src="formData.img" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章链接：" prop="link">
                <el-input v-model="formData.link" placeholder="请填写文章链接"></el-input>
                <p class="tips">请复制与小程序相同主体下的公众号链接并复制至此</p>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveForm">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import { getUploadToken, saveArticle } from '@/api/setting';
    export default {
        name: 'informationSettingDetail',
        data() {
            return {
                dialogTitle: '',
                dialogVisible: false,
                // 类型 add：新增，edit：编辑
                dialogType: 'add',
                paramsRow: '',
                formData: {
                    title: '',
                    img: '',
                    link: ''
                },
                formRules: {
                    title: [{ required: true, message: '请填写文章标题', trigger: 'blur' }],
                    img: [{ required: true, message: '请上传头图', trigger: 'blur' }],
                    link: [{ required: true, message: '请填写文章链接', trigger: 'blur' }]
                },
                baseUrl: '',
                uploadBody: {
                    token: '',
                    key: ''
                }
            };
        },
        watch: {
            dialogVisible(newVal) {
                if (newVal) {
                    if (this.paramsRow) {
                        this.formData = {
                            id: this.paramsRow.id,
                            title: this.paramsRow.title,
                            img: this.paramsRow.img,
                            link: this.paramsRow.link
                        };
                    }
                }
                if (!newVal) {
                    this.init();
                }
            }
        },
        mounted() {
            this.getUploadToken();
        },
        methods: {
            init() {
                this.paramsRow = '';
                this.formData = {
                    title: '',
                    img: '',
                    link: ''
                };
                this.$refs.ruleForm.resetFields();
            },
            async saveForm() {
                const res = await saveArticle(this.formData);
                if (res.code === 200) {
                    this.$message.success(res.msg);
                    this.dialogVisible = false;
                }
            },
            /* 获取上传图片的token */
            async getUploadToken() {
                try {
                    const data = await getUploadToken();
                    if (data.code === 200) {
                        this.uploadBody.token = data.data.uptoken;
                        this.baseUrl = data.data.baseUrl;
                    }
                } catch (e) {
                    console.log(`getUploadToken error: ${e}`);
                }
            },
            beforeUpload(file) {
                this.uploadBody.key = file.name;
                return true;
            },
            /* 成功上传 */
            handleUploadSuccess(res, file) {
                this.formData.img = `${this.baseUrl}/${res.key}`;
            }
        }
    };
</script>
<style lang="css" scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .el-upload--text {
        width: 180px;
        height: 180px;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
</style>