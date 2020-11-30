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
                            class="lzp-avatar-uploader"
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
                            <i v-else class="el-icon-plus lzp-avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="action-btn">
                            <el-button :class="index + 1 <= showDeleteIndex ? 'no_border' : ''" type="text" @click="handleEdit(index)"
                                >编辑</el-button
                            >
                            <el-button
                                type="text"
                                class="no_border"
                                :style="`visibility: ${index + 1 <= showDeleteIndex ? 'hidden' : 'visible'}`"
                                :disabled="index + 1 <= showDeleteIndex"
                                @click="handleDelete(index)"
                                >删除</el-button
                            >
                        </div>
                    </div>
                    <div class="add-btn">
                        <el-button @click="handleAdd">{{ `添加${tabList.find((m) => m.value === activeName).label}` }}</el-button>
                    </div>
                </div>
                <div class="footer-btn">
                    <el-button type="primary" @click="handleSave">保存</el-button>
                    <el-button type="primary" @click="handlePreview">预览</el-button>
                </div>
            </div>
            <el-dialog title="扫码预览" :visible.sync="showPreview" width="400px">
                <div style="text-align: center">
                    <el-image fit="cover" :src="previewUrl" style="width: 250px; height: 250px" alt="" />
                </div>
            </el-dialog>
            <!-- <div class="container-right"> -->
            <!-- <iframe src="https://m.toutiao.com/?W2atIF=1" frameborder="0"></iframe> -->
            <!-- </div> -->
        </div>
        <el-dialog
            v-if="dialogVisibleServer"
            class="index_setting_server_detail"
            title="选择服务"
            :visible.sync="dialogVisibleServer"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="680px"
        >
            <el-select v-model="serverSelectValue" clearable :style="'margin-bottom: 10px'" @change="handleGetServiceList">
                <el-option v-for="item in serverSelectOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
            <el-table
                :data="serverTableData"
                v-loading="serviceLoading"
                ref="servertable"
                @selection-change="handleSelectionChange"
                style="width: 100%"
            >
                <el-table-column type="selection" width="55" v-if="editIndex < 0"> </el-table-column>
                <el-table-column prop="name" label="服务名称" align="center">
                    <template slot-scope="scope">
                        <div class="table-name">
                            <el-image style="width: 30px; height: 30px" :src="scope.row.img" fit="cover"></el-image>
                            <div class="info">
                                <p>{{ scope.row.name }}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格" align="center"> </el-table-column>
                <el-table-column prop="kind_name" label="分类" align="center"> </el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center">
                    <template slot-scope="scope">
                        <div class="date_item" v-if="scope.row.create_time">
                            <p>{{ $formatDate(scope.row.create_time, 'Y-M-D') }}</p>
                            <p>{{ $formatDate(scope.row.create_time, 'h:m:s') }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="right" v-if="editIndex > -1">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleChangeService(scope.row)">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" v-if="editIndex < 0">
                <el-button @click="dialogVisibleServer = false">取 消</el-button>
                <el-button type="primary" @click="handleSaveServer()">保 存</el-button>
            </span>
        </el-dialog>
        <el-dialog
            v-if="dialogVisibleGoods"
            class="index_setting_goods_detail"
            title="选择商品"
            :visible.sync="dialogVisibleGoods"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="680px"
        >
            <el-select v-model="goodsSelectValue" :style="'margin-bottom: 10px'" @change="handleGetGoodsList">
                <el-option v-for="item in goodsSelectOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
            <el-table
                :data="goodsTableData"
                v-loading="goodsLoading"
                ref="goodstable"
                @selection-change="handleSelectionChange"
                style="width: 100%"
            >
                <el-table-column type="selection" width="55" v-if="editIndex < 0"> </el-table-column>
                <el-table-column prop="name" label="商品名称" align="center">
                    <template slot-scope="scope">
                        <div class="table-name">
                            <el-image style="width: 30px; height: 30px" :src="scope.row.name" fit="cover"></el-image>
                            <div class="info">
                                <p>{{ scope.row.name }}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格" align="center"> </el-table-column>
                <el-table-column prop="kind_name" label="分类" align="center"> </el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center">
                    <template slot-scope="scope">
                        <div class="date_item" v-if="scope.row.create_time">
                            <p>{{ $formatDate(scope.row.create_time, 'Y-M-D') }}</p>
                            <p>{{ $formatDate(scope.row.create_time, 'h:m:s') }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="right" v-if="editIndex > -1">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleChangeGoods(scope.row)">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" v-if="editIndex < 0">
                <el-button @click="dialogVisibleGoods = false">取 消</el-button>
                <el-button type="primary" @click="handleSaveGoods">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    import {
        getUploadToken,
        getBanner,
        saveBanner,
        getRecommendService,
        getServiceClassification,
        getServiceList,
        saveService,
        getRecommendGoods,
        getGoodsClassification,
        getGoodsList,
        saveGoods,
        previewBanner,
        previewService,
        previewGoods
    } from '@/api/setting';
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
                serverSelectValue: '',
                serverSelectOptions: [],
                serviceLoading: false,
                serverTableData: [],
                dialogVisibleGoods: false,
                goodsSelectValue: '',
                goodsSelectOptions: [],
                goodsTableData: [],
                goodsLoading: false,
                selectRows: [],
                editIndex: -1,
                showPreview: false,
                previewUrl: ''
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
            this.handleToGetServiceClassification();
            this.handleGetServiceList();
            this.handleToGetGoodsClassification();
            this.handleGetGoodsList();
        },
        methods: {
            // 服务
            async handleToGetServiceClassification() {
                const res = await getServiceClassification({ page_no: 1, page_size: 999 });
                if (res.code === 200) {
                    this.serverSelectOptions = res.data || [];
                }
            },
            async handleGetServiceList() {
                this.serviceLoading = true;
                const params = {
                    kind_id: this.serverSelectValue,
                    keyword: ''
                };
                const res = await getServiceList(params);
                this.serviceLoading = false;
                if (res.code === 200) {
                    this.serverTableData = res.data || [];
                }
            },
            handleChangeService(row) {
                let obj = { id: row.id, img: row.img, name: row.name };
                this.tableList.splice(this.editIndex, 1, obj);
                this.dialogVisibleServer = false;
            },
            handleSaveServer() {
                this.selectRows.forEach(m => {
                    let obj = { id: m.id, img: m.img, name: m.name };
                    this.tableList.push(obj);
                });
                this.dialogVisibleServer = false;
            },
            // 商品
            async handleToGetGoodsClassification() {
                const res = await getGoodsClassification({ page_no: 1, page_size: 999 });
                if (res.code === 200) {
                    this.goodsSelectOptions = res.data.data || [];
                }
            },
            async handleGetGoodsList() {
                this.goodsLoading = true;
                const params = {
                    kind_id: this.goodsSelectValue,
                    page_no: '1',
                    page_size: '99',
                    keyword: ''
                };
                const res = await getGoodsList(params);
                this.goodsLoading = false;
                if (res.code === 200) {
                    this.goodsTableData = res.data || [];
                }
            },
            handleChangeGoods(row) {
                let obj = { id: row.id, img: row.img, name: row.name };
                this.tableList.splice(this.editIndex, 1, obj);
                this.dialogVisibleGoods = false;
            },
            handleSaveGoods() {
                this.selectRows.forEach(m => {
                    let obj = { id: m.id, img: m.img, name: m.name };
                    this.tableList.push(obj);
                });
                this.dialogVisibleGoods = false;
            },
            handleSelectionChange(selection) {
                this.selectRows = selection;
            },
            beforeChangeTab(tab) {
                if (this.tableList.findIndex(m => !m.img) > -1 || this.selectRows.length > 0) {
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
                this.editIndex = -1;
                if (this.activeName === '1') {
                    this.tableList.push({ img: '' });
                }
                if (this.activeName === '2') {
                    this.dialogVisibleServer = true;
                    setTimeout(() => {
                        this.$nextTick(() => {
                            if (this.$refs.servertable) {
                                this.$refs.servertable.clearSelection();
                            }
                            this.selectRows = [];
                        });
                    }, 300);
                }
                if (this.activeName === '3') {
                    this.dialogVisibleGoods = true;
                    setTimeout(() => {
                        this.$nextTick(() => {
                            if (this.$refs.goodstable) {
                                this.$refs.goodstable.clearSelection();
                            }
                            this.selectRows = [];
                        });
                    }, 300);
                }
            },
            setDisable(index, boolean) {
                this.tableList.forEach((m, i) => {
                    if (i === index) {
                        this.$set(m, 'disabled', boolean);
                    }
                });
            },
            handleEdit(index) {
                console.log(index);
                this.editIndex = index;
                if (this.activeName === '1') {
                    this.setDisable(index, false);
                    this.$nextTick(() => {
                        this.$refs[`imgRef${index}`][0].$el.click();
                        this.setDisable(index, true);
                    });
                }
                if (this.activeName === '2') {
                    this.dialogVisibleServer = true;
                    setTimeout(() => {
                        this.$nextTick(() => {
                            if (this.$refs.servertable) {
                                this.$refs.servertable.clearSelection();
                            }
                            this.selectRows = [];
                        });
                    }, 300);
                }
                if (this.activeName === '3') {
                    this.dialogVisibleGoods = true;
                    setTimeout(() => {
                        this.$nextTick(() => {
                            if (this.$refs.goodstable) {
                                this.$refs.goodstable.clearSelection();
                            }
                            this.selectRows = [];
                        });
                    }, 300);
                }
            },
            async handleSave() {
                let apiFn = '';
                let params = '';
                if (this.activeName === '1') {
                    apiFn = saveBanner;
                    const imgs = this.tableList.map(m => m.img);
                    params = {
                        banners: imgs.join(',') || ''
                    };
                }
                if (this.activeName === '2') {
                    apiFn = saveService;
                    const ids = this.tableList.map(m => m.id);
                    params = {
                        ids: ids.join(',') || ''
                    };
                }
                if (this.activeName === '3') {
                    apiFn = saveGoods;
                    const ids = this.tableList.map(m => m.id);
                    params = {
                        ids: ids.join(',') || ''
                    };
                }
                const res = await apiFn(params);
                if (res.code === 200) {
                    this.$message.success('保存成功');
                    this.getTableList();
                }
            },
            async handlePreview() {
                let apiFn = '';
                let params = '';
                if (this.activeName === '1') {
                    apiFn = previewBanner;
                    const imgs = this.tableList.map(m => m.img);
                    params = {
                        banners: imgs.join(',') || ''
                    };
                }
                if (this.activeName === '2') {
                    apiFn = previewService;
                    const ids = this.tableList.map(m => m.id);
                    params = {
                        ids: ids.join(',') || ''
                    };
                }
                if (this.activeName === '3') {
                    apiFn = previewGoods;
                    const ids = this.tableList.map(m => m.id);
                    params = {
                        ids: ids.join(',') || ''
                    };
                }
                const res = await apiFn(params);
                if (res.code === 200) {
                    this.showPreview = true;
                    this.previewUrl = res.data;
                }
            },
            handleDelete(index) {
                this.tableList.splice(index, 1);
            },
            async getTableList() {
                const apiFn = ['', getBanner, getRecommendService, getRecommendGoods][this.activeName];
                const res = await apiFn();
                if (res.code === 200) {
                    res.data.forEach(m => {
                        m.disabled = true;
                    });
                    this.tableList = res.data;
                }
                console.log(res);
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
            async handleUploadSuccess(res, index) {
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
        width: 100%;
        /* margin-right: 20px; */
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
        position: relative;
    }

    .action-btn >>> .el-button::after {
        content: '';
        width: 1px;
        height: 15px;
        position: absolute;
        top: 8.5px;
        right: -6px;
        background: #dddddd;
    }
    .no_border::after {
        display: none;
    }

    .lzp-avatar-uploader >>> .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background-color: #fff;
        box-sizing: border-box;
        width: 360px !important;
        height: 180px !important;
        text-align: center;
    }
    .lzp-avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .lzp-avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    /* .avatar {
        width: 178px;
        height: 178px;
        display: block;
    } */
</style>
