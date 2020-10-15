<template>
    <div class="member-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="container">
            <el-button class="add_btn" type="primary" @click="handleDetail()">新增等级</el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="shop_name" label="等级名称" align="center"> </el-table-column>
                <el-table-column prop="service_name" label="会员数" align="center"> </el-table-column>
                <el-table-column prop="source" label="条件" align="center"></el-table-column>
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
        <memberSettingDetail ref="detail"></memberSettingDetail>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    import memberSettingDetail from './component/memberSettingDetail'
    export default {
        name: 'MemberSetting',
        components: {
            breadcrumb,
            memberSettingDetail
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
                        name: '客户设置',
                        router: 'CustomerSetting'
                    },
                    {
                        name: '会员设置',
                        router: 'MemberSetting'
                    }
                ],
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
                this.$refs.detail.dialogTitle = id ? '修改' : '新增' + '会员等级';
                this.$refs.detail.dialogVisible = true;
            },
            handleRemove(id) {
                this.$confirm('是否确定删除此会员等级?', '提示', {
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
    .container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        border: 0;
        margin-top: 20px;
    }
    .container .add_btn {
        margin-bottom: 20px;
    }
</style>