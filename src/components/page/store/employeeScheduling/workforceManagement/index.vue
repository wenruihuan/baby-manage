<template>
    <div>
        <div class="operation">
            <div class="handle-box">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <span>选择门店:多多亲子岁月一店</span>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="table">
            <div class="date-box">
                <div class="item">
                    <el-date-picker
                            v-model="month"
                            type="month"
                            placeholder="选择月">
                    </el-date-picker>
                </div>
                <div class="item">
                    <el-date-picker
                            v-model="week"
                            type="week"
                            format="yyyy 第 WW 周"
                            placeholder="选择周">
                    </el-date-picker>
                </div>
            </div>
            <el-table :data="tableData" border style="width: 100%;" class="tableContent">
                <el-table-column label="姓名" prop="staff_name" align="center"></el-table-column>
                <el-table-column label="手机号" prop="staff_phone" align="center"></el-table-column>
                <el-table-column label="门店" prop="shop_name" align="center"></el-table-column>
                <el-table-column label="周一" prop="worktime_list[0].worktime" align="center">
                    <template slot-scope="scope">
                        <div class="item" @click="changeShiftFn(scope.row.worktime_list[0])">{{scope.row.worktime_list[0].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周二" prop="worktime_list[1].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row.worktime_list[1])">{{scope.row.worktime_list[1].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周三" prop="worktime_list[2].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row.worktime_list[2])">{{scope.row.worktime_list[2].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周四" prop="worktime_list[3].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row.worktime_list[3])">{{scope.row.worktime_list[3].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周五" prop="worktime_list[4].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row.worktime_list[4])">{{scope.row.worktime_list[4].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周六" prop="worktime_list[5].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row.worktime_list[5])">{{scope.row.worktime_list[5].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周日" prop="worktime_list[6].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row.worktime_list[6])">{{scope.row.worktime_list[6].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text">设置排班</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="alignRight page-ctner"
                    :page-size="20"
                    background
                    layout="total, prev, pager, next, jumper"
                    :total="total"
                    @current-change="handleCurChange"
            ></el-pagination>
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
        <el-dialog
                title="设置调班"
                :visible.sync="changeShiftDialogVisible"
                width="200">
                <div class="item">
                    <div>{{currentDate}}</div>
                    <el-select v-model="currentWorkTime">
                        <el-option
                            v-for="item in worktimeSelectList"
                            :label="item.name"
                            :value="item.worktime_id"
                        >
                        </el-option>
                    </el-select>
                    <div class="tips">更改后当日执行调整班次</div>
                </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeShiftDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeShiftConfirm">确 定</el-button>
              </span>
        </el-dialog>
        <div class="AddEmployees" v-if="isAddEmployees">
            <el-dialog
                title="添加职位"
                :visible.sync="isAddEmployees"
                width="50%"
                :before-close="handleClose">
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import * as api from '../../../../../api/index'
    export default {
        name: '',
        components: {
        },
        data () {
            return {
                currentDate: '',
                currentWorkTime: '',
                currentWorkTime: '',
                changeShiftDialogVisible: false,
                worktimeSelectList: [],
                week: '',
                month: '',
                form: {
                    page_size: 20,
                    page_no: 1
                },
                tableData: [],
                total: 0,
                page_no: 1,
                query: {},
                dialogVisible: false,
                // 是否显示新增
                isAddEmployees: false,
            }
        },
        created () {
            this.getWorktimeList();
            this.getFormData();
        },
        methods: {
            handleCurChange(value) {
                this.page_no = value;
                this.getFormData();
            },
            async setPositionDelete (scope) {
                api.positionDelete({ id: scope.row.id})
            },
            async getFormData () {
                let params = {
                    page_size: 20,
                    page_no: this.page_no
                }
                const { data } = await api.worktimeStaffList(params);
                this.tableData = data.data;
                this.total = data.all_count
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClick (val) {
                console.log(val);
                this.isAddEmployees = true;
            },
            handleClose () {
                this.isAddEmployees = false;
            },
            async getWorktimeList () {
                const { data } = await api.worktimeSelectList();
                this.worktimeSelectList = data;
            },
            // 调班
            changeShiftFn (item) {
                this.currentDate = item.date;
                this.currentWorkTime = item.worktime;
                this.changeShiftDialogVisible = true;
            },
            async changeShiftConfirm () {
                let params = {
                    staff_id: '',
                    date: this.currentDate,
                    worktime_id: this.currentWorkTime,
                }
                const { data } = await api.worktimeStaffChange(params);
                console.log(data);
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
    .date-box {
        padding: 30px 0;
        background: #F5F7FA;
        display: flex;
        justify-content: center;
    }
    .date-box .item{
        margin: 0 20px;
    }

</style>
<style>
    .tableContent.el-table td{
    }
    .tableContent.el-table td{
        position: relative;
    }
    .tableContent.el-table td:hover .item:after{
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        content: '';
        background:rgba(204,204,204,0.8) url("../../../../../assets/img/edit.png") no-repeat center;
        background-size: 20px;
    }
</style>
