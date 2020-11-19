<template>
    <div class="information-setting" v-loading="loading">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="header-bar">
            <el-button type="primary" @click="handleDetail()">添加文章资讯</el-button>
            <div class="header-bar-search">
                <div class="header-bar-search-date">
                    <span class="label">发布时间：</span>
                    <el-date-picker
                        v-model="selectDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        unlink-panels
                    >
                    </el-date-picker>
                </div>
                <div class="header-bar-search-input">
                    <el-input placeholder="请输入" prefix-icon="el-icon-search" v-model="searchValue" clearable> </el-input>
                    <el-button class="search-btn" @click="handleSearch">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="资讯标题" align="center"></el-table-column>
                <el-table-column label="头图" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 160px; height: 80px" :src="scope.row.img" fit="cover">
                            <div slot="error" class="error-image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="发布时间" align="center">
                    <template slot-scope="scope">
                        <div class="date_item" v-if="scope.row.create_time">
                            <p>{{ $formatDate(scope.row.create_time, 'Y-M-D') }}</p>
                            <p>{{ $formatDate(scope.row.create_time, 'h:m:s') }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="" align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.is_publish" @change="handleChangeStatus(scope.row)">发布</el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div class="table_btn">
                            <el-button type="text" @click="handleDetail(scope.row)">编辑</el-button>
                            <el-button class="no_border" type="text" @click="handleRemove(scope.row.id)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-box">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper"
                    :total="page.total"
                >
                </el-pagination>
            </div>
        </div>
        <informationSettingDetail ref="detail"></informationSettingDetail>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    import informationSettingDetail from './component/informationSettingDetail';
    import { getArticleList, updateArticleStatus, deleteArticle } from '@/api/setting';
    import { formatDate } from '@/utils/utils';
    export default {
        name: 'InformationSetting',
        components: {
            breadcrumb,
            informationSettingDetail
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
                        name: '资讯列表',
                        router: 'InformationSetting'
                    }
                ],
                selectDate: '',
                searchValue: '',
                loading: false,
                page: {
                    size: 10,
                    number: 1,
                    total: 0
                },
                tableData: []
            };
        },
        created() {
            this.getList();
        },
        methods: {
            async getList() {
                this.loading = true;
                const start_date = Array.isArray(this.selectDate) ? formatDate(this.selectDate[0], 'Y-M-D') : '';
                const end_date = Array.isArray(this.selectDate) ? formatDate(this.selectDate[1], 'Y-M-D') : '';
                const params = {
                    page_no: this.page.number,
                    keyword: this.searchValue,
                    start_date,
                    end_date
                };
                const res = await getArticleList(params);
                if (res.data) {
                    res.data.data.forEach((m) => {
                        m.create_time = formatDate(m.create_time, 'Y-M-D h:m:s');
                        m.is_publish = !!m.is_publish;
                    });
                    this.tableData = res.data.data;
                    this.page.total = res.data.allCount;
                }
                this.loading = false;
            },
            handleSearch() {
                this.page.number = 1;
                this.getList();
            },
            async handleChangeStatus(row) {
                const params = {
                    id: row.id,
                    is_publish: row.is_publish ? 1 : 0
                };
                const res = await updateArticleStatus(params);
                if (res.code === 200) {
                    this.getList();
                }
            },
            handleDetail(row) {
                this.$refs.detail.paramsRow = row;
                this.$refs.detail.dialogType = row ? 'edit' : 'add';
                this.$refs.detail.dialogTitle = row ? '修改' : '添加' + '文章资讯';
                this.$refs.detail.dialogVisible = true;
            },
            handleRemove(id) {
                this.$confirm('是否确定删除此资讯?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        const res = await deleteArticle({ id });
                        if (res.code === 200) {
                            this.$message.success(res.msg || '删除成功!');
                            this.getList();
                        }
                    })
                    .catch(() => {});
            },
            handleCurrentChange(val) {
                this.page.number = val;
                this.getList();
            }
        }
    };
</script>

<style lang="css" scoped>
    .header-bar,
    .container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        border: 0;
    }
    .container {
        margin-top: 20px;
    }
    .header-bar .header-bar-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
    }
    .header-bar .header-bar-search .header-bar-search-date {
        font-size: 14px;
    }
    .header-bar .header-bar-search .header-bar-search-input {
        display: flex;
        align-items: center;
    }
    .header-bar .header-bar-search .header-bar-search-input .search-btn {
        margin-left: 10px;
    }
    .table_btn >>> .el-button {
        position: relative;
    }
    .table_btn >>> .el-button::after {
        content: '';
        width: 1px;
        height: 15px;
        position: absolute;
        top: 7.5px;
        right: -6px;
        background: #dddddd;
    }
    .no_border::after {
        display: none;
    }
</style>