<template>
    <div>
        <div class="operation">
            <div class="handle-box">
                <el-row>
                    <el-button
                        type="primary"
                        class="handle-del mr10"
                        @click="addRole"
                    >添加角色</el-button>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="6">
                        <span>选择门店:多多亲子岁月一店</span>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="name"
                    label="角色名称"
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
                    width="200"
                    :formatter="dateFormate"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick('edit', scope.row.id)"  type="text" size="small">编辑</el-button>
                        <span style="color: #dddddd; margin: 0 5px">|</span>
                        <el-button @click="handleClick('view', scope.row.id)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-box">
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :page-size="20"
                layout="total, prev, pager, next, jumper"
                :total="total">
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
    import dayjs from 'dayjs'
    export default {
        name: '',
        components: {
            operationPosition
        },
        data () {
            return {
                page_no: 1,
                total: 0,
                query: {},
                dialogVisible: false,
                isAddEmployees1: false,
                // 是否显示新增
                isAddEmployees: false,
                tableData: [],
            }
        },
        created () {
            this.getFormData();
        },
        methods: {
            dateFormate(row, column, cellValue, index) {
                if (cellValue) {
                    return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
                } else {
                    return ''
                }
            },
            addRole () {
                this.$router.push({ path: '/addRole'});
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page_no = val;
                this.getFormData();
            },
            handleClick (state, id) {
                this.$router.push({ path: '/addRole', query: { state: state, id: id }});
            },
            handleClose () {
                this.isAddEmployees = false;
            },
            async getFormData () {
                let params = {
                    page_no: this.page_no,
                    page_size: 20
                }
                const { data } = await api.roleList(params);
                this.tableData = data.data;
                this.total = data.all_count;
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
