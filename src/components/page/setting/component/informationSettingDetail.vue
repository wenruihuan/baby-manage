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
            <el-form-item label="头图：" prop="image">
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
                    <img v-if="formData.image" :src="formData.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章链接：" prop="url">
                <el-input v-model="formData.url" placeholder="请填写文章链接"></el-input>
                <p class="tips">请复制与小程序相同主体下的公众号链接并复制至此</p>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        name: 'informationSettingDetail',
        data() {
            return {
                dialogTitle: '',
                dialogVisible: false,
                // 类型 add：新增，edit：编辑
                dialogType: 'add',
                paramsId: '',
                formData: {
                    title: '',
                    image: '',
                    url: ''
                },
                formRules: {
                    title: [{ required: true, message: '请填写文章标题', trigger: 'blur' }],
                    image: [{ required: true, message: '请填写到店人姓名', trigger: 'blur' }],
                    url: [{ required: true, message: '请填写文章链接', trigger: 'blur' }]
                }
            };
        },
        methods: {}
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
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>