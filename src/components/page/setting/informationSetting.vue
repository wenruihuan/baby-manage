<template>
    <div class="information-setting">
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
                    <el-button class="search-btn">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="资讯标题" align="left"></el-table-column>
                <el-table-column label="头图" align="left">
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 80px" :src="url" fit="cover">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="shop_name" label="发布时间" align="center"> </el-table-column>
                <el-table-column label="" align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.isRelease">发布</el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDetail(scope.row.id)">编辑</el-button>
                        <el-button type="text" @click="handleRemove(scope.row.id)">删除</el-button>
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
                page: {
                    size: 10,
                    number: 1,
                    total: 0
                },
                tableData: []
            };
        },
        methods: {
            handleDetail(id) {
                this.$refs.detail.paramsId = id;
                this.$refs.detail.dialogType = id ? 'edit' : 'add';
                this.$refs.detail.dialogTitle = id ? '修改' : '添加' + '文章资讯';
                this.$refs.detail.dialogVisible = true;
            },
            handleRemove(id) {
                this.$confirm('是否确定删除此资讯?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功!');
                    })
                    .catch(() => {});
            },
            handleCurrentChange() {}
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
</style>