<template>
    <div class="member-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="container">
            <el-button class="add_btn" type="primary" @click="handleDetail()">新增等级</el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="等级名称" align="center"> </el-table-column>
                <el-table-column prop="count" label="会员数" align="center"> </el-table-column>
                <el-table-column prop="condition" label="条件" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDetail(scope.row.level_id, scope.row.is_initial)">编辑</el-button>
                        <el-button type="text" v-if="scope.row.is_initial !== '1'" @click="handleRemove(scope.row.level_id)">删除</el-button>
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
    import memberSettingDetail from './component/memberSettingDetail';
    import { getMemberLevel, deleteMemberLevel } from '@/api/setting';
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
                        name: '会员等级',
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
        created() {
            this.getMemberLevel();
        },
        methods: {
            async getMemberLevel() {
                const params = {
                    page_no: this.page.number,
                    page_size: this.page.size
                };
                const res = await getMemberLevel(params);
                if (res.code === 200) {
                    this.page.total = res.data.all_count || 0;
                    this.tableData = res.data.data || [];
                }
            },
            handleDetail(id, is_initial) {
                this.$refs.detail.paramsId = id;
                this.$refs.detail.dialogType = id ? 'edit' : 'add';
                this.$refs.detail.dialogTitle = id ? '修改' : '新增' + '会员等级';
                this.$refs.detail.dialogVisible = true;
                this.$refs.detail.is_initial = is_initial === '1';
                this.$refs.detail.init();
                id && this.$refs.detail.getMemberDetail();
            },
            handleRemove(id) {
                this.$confirm('是否确定删除此会员等级?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        const res = await deleteMemberLevel({ level_id: id });
                        if (res.code === 200) {
                            this.$message.success('删除成功!');
                        }
                    })
                    .catch(() => {});
            },
            handleCurrentChange(page) {
                this.page.number = page;
                this.getMemberLevel()
            }
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