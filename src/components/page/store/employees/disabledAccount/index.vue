<template>
    <div>
        <div class="operation">
            <div class="handle-box">
                <el-row>
                    <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="isAddEmployees = true"
                    >已禁用账号</el-button>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="6">
                        <span>选择门店 </span>
                        <el-select v-model="query.address" placeholder="选择门店" class="handle-select mr10">
                            <el-option key="1" label="广东省" value="广东省"></el-option>
                            <el-option key="2" label="湖南省" value="湖南省"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="请输入系统账号、姓名"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                        prop="date"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="系统账号"
                >
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="省份"
                >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="市区"
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                >
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="邮编"
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
        <div class="AddEmployees" v-if="isAddEmployees">
            <el-dialog
                    title="添加员工"
                    :visible.sync="isAddEmployees"
                    width="50%"
                    :before-close="handleClose">
                <AddEmployees></AddEmployees>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import * as api from '../../../../../api/index'
import AddEmployees from '../staffManagement/AddEmployees'
export default {
    name: '',
    components: {
        AddEmployees
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            }],
        }
    },
    created () {
        this.getFormData();
    },
    methods: {
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
            await api.staffList();
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
