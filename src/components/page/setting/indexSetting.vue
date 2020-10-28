<template>
    <div class="index-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="index-container">
            <div class="container-left">
                <el-tabs v-model="activeName" type="card" :before-leave="beforeChangeTab">
                    <el-tab-pane v-for="tab in tabList" :key="tab.value" :label="tab.label" :name="tab.value"></el-tab-pane>
                </el-tabs>
                <div class="upload-list">
                    <div class="upload-list-item" v-for="(item, index) in tableList" :key="index">
                        <el-upload
                            class="avatar-uploader"
                            action="http://up-z0.qiniu.com"
                            :disabled="item.disabled"
                            :data="uploadBody"
                            :before-upload="beforeUpload"
                            :on-success="(res) => handleUploadSuccess(res, index)"
                            :show-file-list="false"
                        >
                            <el-image
                                :ref="`imgRef${index}`"
                                style="width: 100%; height: 100%"
                                v-if="item.img"
                                :src="item.img"
                                fit="contain"
                            ></el-image>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="action-btn">
                            <el-button type="text" @click="handleEdit(index)">编辑</el-button>
                            <el-button type="text" v-if="index + 1 > showDeleteIndex" @click="handleDelete(index)">删除</el-button>
                        </div>
                    </div>
                    <div class="add-btn">
                        <el-button @click="handleAdd">{{ `添加${tabList.find((m) => m.value === activeName).label}` }}</el-button>
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
        <el-dialog
            class="index_setting_server_detail"
            title="选择服务"
            :visible.sync="dialogVisibleServer"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="680px"
        >
            <el-select v-model="serverSelectValue" :style="'margin-bottom: 10px'">
                <el-option v-for="item in serverSelectOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <el-table :data="serverTableData" @selection-change="handleSelectionServerChange" style="width: 100%">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="shop_name" label="服务名称" align="center">
                    <template slot-scope="scope">
                        <div class="table-name">
                            <el-image style="width: 30px; height: 30px" src="" fit="cover"></el-image>
                            <div class="info">
                                <p>服务名称</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="service_name" label="价格" align="center"> </el-table-column>
                <el-table-column prop="service_name" label="分类" align="center"> </el-table-column>
                <el-table-column prop="service_name" label="创建时间" align="center"> </el-table-column>
            </el-table>
            <span slot="footer">
                <el-button @click="dialogVisibleServer = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleServer = false">保 存</el-button>
            </span>
        </el-dialog>
        <el-dialog
            class="index_setting_goods_detail"
            title="选择商品"
            :visible.sync="dialogVisibleGoods"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="680px"
        >
            <el-select v-model="goodsSelectValue" :style="'margin-bottom: 10px'">
                <el-option v-for="item in goodsSelectOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <el-table :data="goodsTableData" @selection-change="handleSelectionGoodsChange" style="width: 100%">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="shop_name" label="商品名称" align="center">
                    <template slot-scope="scope">
                        <div class="table-name">
                            <el-image style="width: 30px; height: 30px" src="" fit="cover"></el-image>
                            <div class="info">
                                <p>商品名称</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="service_name" label="价格" align="center"> </el-table-column>
                <el-table-column prop="service_name" label="分类" align="center"> </el-table-column>
                <el-table-column prop="service_name" label="创建时间" align="center"> </el-table-column>
            </el-table>
            <span slot="footer">
                <el-button @click="dialogVisibleGoods = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleGoods = false">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    import { getUploadToken, getBanner, getRecommendService, getRecommendGoods } from '@/api/setting';
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
                tabList: [
                    { label: 'banner', value: '1' },
                    { label: '推荐服务', value: '2' },
                    { label: '推荐商品', value: '3' }
                ],
                url: '',
                tableList: [],
                baseUrl: '',
                uploadBody: {
                    token: '',
                    key: ''
                },
                dialogVisibleServer: false,
                serverSelectValue: 1,
                serverSelectOptions: [{ value: 1, label: '所有分类' }],
                serverTableData: [],
                dialogVisibleGoods: false,
                goodsSelectValue: 1,
                goodsSelectOptions: [{ value: 1, label: '所有分类' }],
                goodsTableData: []
            };
        },
        computed: {
            showDeleteIndex() {
                return this.activeName === '1' ? 2 : this.activeName === '2' ? 4 : 6;
            }
        },
        watch: {
            activeName(newVal) {
                this.getTableList();
            }
        },
        mounted() {
            this.getUploadToken();
            this.getTableList();
        },
        methods: {
            beforeChangeTab(tab) {
                if (this.tableList.findIndex((m) => !m.img) > -1) {
                    return new Promise((resolve, reject) => {
                        this.$confirm('此离开此页后操作将不被保存，是否确认切换？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                            .then(() => {
                                resolve();
                            })
                            .catch(() => {
                                reject();
                            });
                    });
                }
            },
            handleAdd() {
                this.tableList.push({ img: '' });
            },
            setDisable(index, boolean) {
                this.tableList.forEach((m, i) => {
                    if (i === index) {
                        this.$set(m, 'disabled', boolean);
                    }
                });
            },
            handleEdit(index) {
                if (this.activeName === '1') {
                    this.setDisable(index, false);
                    this.$nextTick(() => {
                        this.$refs[`imgRef${index}`][0].$el.click();
                        this.setDisable(index, true);
                    });
                }
                if (this.activeName === '2') {
                    this.dialogVisibleServer = true;
                }
                if (this.activeName === '3') {
                    this.dialogVisibleGoods = true;
                }
            },
            handleDelete(index) {
                this.tableList.splice(index, 1);
            },
            async getTableList() {
                const apiFn = ['', getBanner, getRecommendService, getRecommendGoods][this.activeName];
                const res = await apiFn();
                if (res.code === 200) {
                    res.data.forEach((m) => {
                        m.disabled = true;
                    });
                    this.tableList = res.data;
                }
                console.log(res);
            },
            handleSelectionServerChange() {},
            handleSelectionGoodsChange() {},
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
            handleUploadSuccess(res, index) {
                this.tableList.forEach((m, i) => {
                    if (i === index) {
                        this.$set(m, 'img', `${this.baseUrl}/${res.key}`);
                        this.$set(m, 'disabled', true);
                    }
                });
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

    .add-btn {
        display: inline-block;
        width: 100%;
        text-align: center;
    }

    .footer-btn {
        display: inline-block;
        width: 100%;
        text-align: center;
        margin-top: 20px;
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