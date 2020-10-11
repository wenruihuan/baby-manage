<template>
    <div>
        <div class="operation">
            <div class="handle-box">
                <el-row>
                    <el-button
                        type="primary"
                        class="handle-del mr10"
                        @click="addRole"
                    >添加职位</el-button>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="6">
                        <span>选择门店 </span>
                        <el-select v-model="query.address" placeholder="选择门店" class="handle-select mr10">
                            <el-option key="1" label="广东省" value="广东省"></el-option>
                            <el-option key="2" label="湖南省" value="湖南省"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
            >
                <el-table-column
                    prop="name"
                    label="职位名称"
                >
                </el-table-column>
                <el-table-column
                    prop="desc"
                    label="描述"
                >
                </el-table-column>
                <el-table-column
                    prop="staff_count"
                    label="员工数量"
                >
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="添加时间"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick()" type="text" size="small">详情</el-button>
                        <el-button type="text" size="small">更多</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-box">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
        </el-dialog>
        <div class="AddEmployees" v-if="isAddEmployees1">
            <el-dialog
                    title="添加职位"
                    :visible.sync="isAddEmployees1"
                    width="50%"
                    :before-close="handleClose">
                <operation-position></operation-position>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import * as api from '../../../../../api/index'
    import operationPosition from './operationPosition'
    export default {
        name: '',
        components: {
            operationPosition
        },
        data () {
            return {
                page: {
                    total: 30
                },
                query: {},
                dialogVisible: false,
                // 是否显示新增
                isAddEmployees: false,
                tableData: [],
            }
        },
        created () {
            this.getFormData();
        },
        methods: {
            addRole () {
                this.$router.push({ path: '/roleManagement/addRole'});
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClick () {},
            handleClose () {
                this.isAddEmployees = false;
            },
            async getFormData () {
                const { data } = await api.roleList();
                this.tableData = data.data;
                this.page.total = data.all_count;
            }
        }
    };
</script>

<style scoped>
    .operation {
        background: #f7f8fa;
        padding: 20px;
        margin-bottom: 20px;
    }
    .operation .el-row{
        margin-top: 20px;
    }
    .operation .el-row:first-child{
        margin-top: 0;
    }
</style>
