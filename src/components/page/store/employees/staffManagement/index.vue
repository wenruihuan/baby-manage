<template>
    <div>
        <div class="operation">
            <div class="handle-box">
                <el-row>
                    <el-col :span="6">
                        <el-button
                                type="primary"
                                icon="el-icon-delete"
                                class="handle-del mr10"
                                @click="handleClick('add')"
                        >
                            添加员工
                        </el-button>
                    </el-col>
                    <el-col :span="10">
                        &nbsp;
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="请输入系统账号、姓名"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
                    </el-col>
                    <el-col :span="2">
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </el-col>
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
                        <span>选择职位 </span>
                        <el-select
                                v-model="query.address"
                                placeholder="选择职位"
                                class="handle-select mr10"
                        >
                            <el-option
                                :key="item.id"
                                v-for="item in positionSelectList"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
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
                    label="姓名"
                >
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
                    label="添加时间"
                >
                </el-table-column>
                <el-table-column
                    prop="tel"
                    label="联系方式"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick('edit', scope)" type="text" size="small">详情</el-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <el-dropdown>
                            <el-button type="text" size="small">更多</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><span @click="handleClick('edit', scope)">编辑</span></el-dropdown-item>
                                <el-dropdown-item><span>关联服务</span></el-dropdown-item>
                                <el-dropdown-item>设置排班</el-dropdown-item>
                                <el-dropdown-item><span @click="handleRelevance()">禁用账号</span></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
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
                :visible.sync="isRelevance"
                width="30%"
                :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isRelevance = false">取 消</el-button>
                <el-button type="primary" @click="isRelevance = false">确 定</el-button>
              </span>
        </el-dialog>

        <div class="AddEmployees" v-if="isAddEmployees">
            <el-dialog
                :title="employeesTitle"
                :visible.sync="isAddEmployees"
                :id="employeesId"
                width="50%"
                :before-close="handleClose">
                <AddEmployees ref="AddEmployees"></AddEmployees>
            </el-dialog>
        </div>

        <el-dialog
            title="禁用账号"
            :visible.sync="isStaffSetDisable"
            width="500px"
            :before-close="handleClose">
            <div>员工账号被禁用后，将无法登录系统并进行操作，是否确定禁用该账号。</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isStaffSetDisable = false">取 消</el-button>
                <el-button type="primary" @click="setStaffSetDisable">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as api from '../../../../../api/index'
import AddEmployees from './AddEmployees'
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
            positionSelectList: [],
            employeesTitle: '',
            dialogVisible: false,
            isStaffSetDisable: false,
            // 是否显示新增
            isAddEmployees: false,
            employeesId: '',
            isRelevance: false,
            tableData: [],
        }
    },
    created () {
        this.getFormData();
        this.getPositionSelectList();
    },
    methods: {
        async handleRelevance (scope) {
            this.isStaffSetDisable = true;
        },
        async setStaffSetDisable () {
            const { data } = api.staffSetDisable({ id: scope.row.id, is_disable: scope.row.is_disable});
            this.isStaffSetDisable = false;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        async getPositionSelectList () {
            const { data } = await api.positionSelectList();
            this.positionSelectList = data.data;
            console.log(data.data);
        },
        handleClick (state, val) {
            this.employeesId = '';
            this.employeesTitle = '新增员工';
            if (state === 'edit') {
                this.employeesTitle = '编辑员工';
                this.employeesId = val.row.id;
            }
            this.isAddEmployees = true;
            this.$nextTick(() => {
                this.$refs.AddEmployees.getInfoData(val);
            });
        },
        handleClose () {
            this.isAddEmployees = false;
            this.isRelevance = false;
        },
        handleSearch () {
            this.isAddEmployees = false;
        },
        async getFormData () {
            const { data } = await api.staffList();
            this.tableData = data.data;
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
