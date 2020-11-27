<template>
    <div>
        <div class="operation">
            <div class="handle-box">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <span>选择门店:多多亲子岁月一店</span>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="keyword" placeholder="请输入系统账号、姓名"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" icon="el-icon-search" @click="getFormData">搜索</el-button>
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
                label="姓名"
                >
                    <template slot-scope="scope">
                        <div class="displayCenter">
                            <div class="pic" style="margin-right: 20px;"><img :src="scope.row.head_img" alt="" width="80" height="80"></div>
                            <div class="name">{{scope.row.name}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="acount"
                    label="系统账号"
                >
                </el-table-column>
                <el-table-column
                    prop="shop_name"
                    label="门店"
                >
                </el-table-column>
                <el-table-column
                    prop="position_name"
                    label="职位"
                >
                </el-table-column>
                <el-table-column
                    prop="role_names"
                    label="关联角色"
                >
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    :formatter="dateFormate"
                    width="200"
                    label="添加时间"
                >
                </el-table-column>
                <el-table-column
                    prop="tel"
                    width="200"
                    label="联系方式"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.id)" type="text" size="small">恢复</el-button>
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
import dayjs from 'dayjs'
export default {
    name: '',
    components: {
        AddEmployees
    },
    data () {
        return {
            total: 0,
            pageNo: 1,
            query: {},
            keyword: '',
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
        dateFormate(row, column, cellValue, index) {
            if (cellValue) {
                return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
            } else {
                return ''
            }
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNo = val;
            this.getFormData();
        },
        handleClick (id) {
            this.$confirm('是否恢复员工账号？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const data = await api.staffSetDisable({ id: id, is_disable: 1 });
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
            }).catch(() => {
            });
        },
        handleClose () {
            this.isAddEmployees = false;
        },
        async getFormData () {
            let params = {
                keyword: this.keyword,
                pageNo: this.pageNo
            };
            const { data } = await api.staffDisableList(params);
            this.tableData = data.data;
            this.total = data.allCount;
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
