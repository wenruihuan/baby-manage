<template>
    <div class="tag-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="container">
            <el-button class="add_btn" type="primary" @click="handleDetail()">新增标签</el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="shop_name" label="标签名" align="center"> </el-table-column>
                <el-table-column prop="service_name" label="会员数" align="center"> </el-table-column>
                <el-table-column prop="source" label="创建人" align="center"></el-table-column>
                <el-table-column prop="source" label="自动打标签条件" align="center"></el-table-column>
                <el-table-column prop="source" label="更新时间" align="center"></el-table-column>
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
        <el-dialog
            class="tag_setting_detail"
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="680px"
        >
            <el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="标签名称：" prop="title">
                    <el-input v-model="formData.title" placeholder="请填写标签名称"></el-input>
                </el-form-item>
                <el-form-item label="自动打标签条件：">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="1">
                            <div class="check-box-item">
                                累计消费超过<el-input v-model="formData.service" :disabled="!checkList.includes('1')"></el-input>元
                            </div>
                        </el-checkbox>
                        <el-checkbox label="2">
                            <div class="check-box-item">
                                累计充值超过<el-input v-model="formData.card" :disabled="!checkList.includes('2')"></el-input>元
                            </div>
                        </el-checkbox>
                        <el-checkbox label="3">
                            <div class="check-box-item">
                                会员卡数超过<el-input v-model="formData.goods" :disabled="!checkList.includes('3')"></el-input>张
                            </div>
                        </el-checkbox>
                    </el-checkbox-group>
                    <div class="tip">同时满足以上勾选条件，则自动打标签</div>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    export default {
        name: 'TagSetting',
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
                        name: '客户设置',
                        router: 'CustomerSetting'
                    },
                    {
                        name: '标签设置',
                        router: 'TagSetting'
                    }
                ],
                page: {
                    size: 10,
                    number: 1,
                    total: 0
                },
                tableData: [],
                paramsId: '',
                dialogType: '',
                dialogTitle: '',
                dialogVisible: false,
                formData: {},
                formRules: {
                    title: [{ required: true, message: '请填写标签名称', trigger: 'blur' }]
                },
                checkList: []
            };
        },
        methods: {
            handleDetail(id) {
                this.paramsId = id;
                this.dialogType = id ? 'edit' : 'add';
                this.dialogTitle = id ? '修改' : '新增' + '标签';
                this.dialogVisible = true;
            },
            handleRemove(id) {
                this.$confirm('是否确定删除此标签?', '提示', {
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
    .check-box-item {
        display: inline;
    }
    .check-box-item .el-input {
        width: 80px;
        margin: 0 5px;
    }
</style>