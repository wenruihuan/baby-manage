<template>
    <div class="index-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="index-container">
            <div class="container-left">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="banner" name="1"></el-tab-pane>
                    <el-tab-pane label="推荐服务" name="2"></el-tab-pane>
                    <el-tab-pane label="推荐商品" name="3"></el-tab-pane>
                </el-tabs>
                <div class="upload-list">
                    <div class="upload-list-item" v-for="item in 2" :key="item">
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
                            <img v-if="url" :src="url" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="action-btn">
                            <el-button type="text">编辑</el-button>
                            <el-button type="text">删除</el-button>
                        </div>
                    </div>
                </div>
                <div class="footer-btn">
                    <el-button type="primary">保存</el-button>
                </div>
            </div>
            <div class="container-right">
                <iframe src="https://m.toutiao.com/?W2atIF=1" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    export default {
        name: 'IndexSetting',
        components: {
            breadcrumb
        },
        data() {
            return {
                breadcrumbList: [
                    {
                        name: '首页',
                        router: 'dashboard'
                    },
                    {
                        name: '设置',
                        router: 'Setting'
                    },
                    {
                        name: '小程序设置',
                        router: 'MiniProgramSetting'
                    },
                    {
                        name: '首页设置',
                        router: 'IndexSetting'
                    }
                ],
                activeName: '1',
                url: ''
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>
<style lang="css" scoped>
    .index-setting {
        height: 100%;
    }
    .header-bar,
    .container-left,
    .container-right {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        border: 0;
    }

    .index-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        height: calc(100% - 85px);
    }

    .container-left {
        width: calc(100% - 500px);
        margin-right: 20px;
        height: calc(100% - 40px);
    }

    .footer-btn {
        display: inline-block;
        width: 100%;
        text-align: center;
    }

    .container-right {
        width: 500px;
        height: calc(100% - 40px);
    }

    .container-right iframe {
        width: 100%;
        height: 100%;
    }

    .upload-list {
        overflow-y: auto;
        height: calc(100% - 100px);
    }

    .upload-list-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 30px;
    }

    .action-btn {
        margin-left: 20px;
    }

    .action-btn .el-button {
        font-size: 15px;
    }

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