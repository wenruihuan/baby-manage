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
                        v-model="yearValue"
                        type="month"
                        @change="getFormData"
                        format="yyyy-MM"
                        placeholder="选择月">
                    </el-date-picker>
                </div>
                <div class="item">
                    <el-date-picker
                        v-model="weekValue"
                        @change="getFormData"
                        type="week"
                        format="yyyy 第 WW 周"
                        placeholder="选择周">
                    </el-date-picker>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%;" class="tableContent">
                <el-table-column label="姓名" prop="staff_name" align="center"></el-table-column>
                <el-table-column label="手机号" prop="staff_phone" align="center"></el-table-column>
                <el-table-column label="门店" prop="shop_name" align="center"></el-table-column>
                <el-table-column label="周一" prop="worktime_list[0].worktime" align="center">
                    <template slot-scope="scope">
                        <div class="item" @click="changeShiftFn(scope.row, scope.row.worktime_list[0])">{{scope.row.worktime_list[0].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周二" prop="worktime_list[1].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row, scope.row.worktime_list[1])">{{scope.row.worktime_list[1].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周三" prop="worktime_list[2].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row, scope.row.worktime_list[2])">{{scope.row.worktime_list[2].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周四" prop="worktime_list[3].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row, scope.row.worktime_list[3])">{{scope.row.worktime_list[3].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周五" prop="worktime_list[4].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row, scope.row.worktime_list[4])">{{scope.row.worktime_list[4].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周六" prop="worktime_list[5].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row, scope.row.worktime_list[5])">{{scope.row.worktime_list[5].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="周日" prop="worktime_list[6].worktime" align="center">
                    <template slot-scope="scope">
                    <div class="item" @click="changeShiftFn(scope.row, scope.row.worktime_list[6])">{{scope.row.worktime_list[6].worktime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="setWorktimeStaffEdit(scope)" type="text">设置排班</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="alignRight page-ctner"
                    :page-size="20"
                    background
                    layout="total, prev, pager, next, jumper"
                    :total="total"
                    @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
        <el-dialog
            title="设置调班"
            :visible.sync="changeShiftDialogVisible"
            width="400px">
            <div class="changeShiftBox">
                <div class="item">
                    <span>
                        {{currentDate}}
                    </span>
                </div>
                <div class="item">
                    <span>调整班次：</span>
                    <el-select v-model="currentWorkTime">
                        <el-option
                                v-for="item in worktimeSelectList"
                                :label="item.name"
                                :value="item.worktime_id"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="tips item">
                    <span></span>
                    <div>更改后当日执行调整班次</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeShiftDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeShiftConfirm">确 定</el-button>
              </span>
        </el-dialog>
        <el-dialog
            title="设置排班"
            :visible.sync="changeStaffDialogVisible"
            width="800px">
            <div class="changeShiftBox">
                <div class="item">
                    <span>
                        排班技师：
                    </span>
                    <div>
                        {{staffName}}
                        <a @click="copeFn" class="mainColor">复制上周排班</a>
                    </div>
                </div>
                <div class="item">
                    <span>排班方式：</span>
                    <div>
                        <el-radio v-model="is_default_worktime" label="0">默认排班</el-radio>
                        <el-radio v-model="is_default_worktime" label="1">自定义排班</el-radio>
                    </div>
                </div>
                <div class="item" v-if="is_default_worktime === '0'">
                    <span>时间范围：</span>
                    <div class="worktime">
                        <span :class="worktime_id_array[0] !== '' ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(0)">周一</span>
                        <span :class="worktime_id_array[1] !== '' ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(1)">周二</span>
                        <span :class="worktime_id_array[2] !== '' ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(2)">周三</span>
                        <span :class="worktime_id_array[3] !== '' ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(3)">周四</span>
                        <span :class="worktime_id_array[4] !== '' ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(4)">周五</span>
                        <span :class="worktime_id_array[5] !== '' ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(5)">周六</span>
                        <span :class="worktime_id_array[6] !== '' ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(6)">周日</span>
                    </div>
                </div>
                <div class="item" v-if="is_default_worktime === '0'">
                    <span>调整班次：</span>
                    <el-time-select
                        class="width120"
                        v-model="value1"
                        :picker-options="{
                            start: '09:00',
                            step: '00:30',
                            end: '18:00'
                          }"
                          placeholder="选择时间">
                    </el-time-select>
                    -
                    <el-time-select
                        class="width120"
                        v-model="value2"
                        :picker-options="{
                            start: value1,
                            step: '00:30',
                            end: '18:00'
                          }"
                          placeholder="选择时间">
                    </el-time-select>
                </div>
                <div class="item item1" v-if="is_default_worktime === '1'">
                    <span>时间范围：</span>
                    <div class="worktime1">
                        <div class="worktime1Item">
                            <span>周一</span>
                            <el-select v-model="worktime_id_array[0]">
                                <el-option
                                        @click="setWorktimeArray(0)"
                                        v-for="item in worktimeSelectList"
                                        :label="item.name"
                                        :value="item.worktime_id"
                                >
                                </el-option>
                            </el-select>
                        </div>

                        <div class="worktime1Item">
                            <span>周二</span>
                            <el-select v-model="worktime_id_array[1]">
                                <el-option
                                        @click="setWorktimeArray(1)"
                                        v-for="item in worktimeSelectList"
                                        :label="item.name"
                                        :value="item.worktime_id"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="worktime1Item">
                            <span>周三</span>
                            <el-select v-model="worktime_id_array[2]">
                                <el-option
                                        @click="setWorktimeArray(2)"
                                        v-for="item in worktimeSelectList"
                                        :label="item.name"
                                        :value="item.worktime_id"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="worktime1Item">
                            <span>周四</span>
                            <el-select v-model="worktime_id_array[3]">
                                <el-option
                                        @click="setWorktimeArray(3)"
                                        v-for="item in worktimeSelectList"
                                        :label="item.name"
                                        :value="item.worktime_id"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="worktime1Item">
                            <span>周五</span>
                            <el-select v-model="worktime_id_array[4]">
                                <el-option
                                        @click="setWorktimeArray(4)"
                                        v-for="item in worktimeSelectList"
                                        :label="item.name"
                                        :value="item.worktime_id"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="worktime1Item">
                            <span>周六</span>
                            <el-select v-model="worktime_id_array[5]">
                                <el-option
                                        @click="setWorktimeArray(5)"
                                        v-for="item in worktimeSelectList"
                                        :label="item.name"
                                        :value="item.worktime_id"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="worktime1Item">
                            <span>周日</span>
                            <el-select v-model="worktime_id_array[6]">
                                <el-option
                                        @click="setWorktimeArray(6)"
                                        v-for="item in worktimeSelectList"
                                        :label="item.name"
                                        :value="item.worktime_id"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeStaffDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeStaffConfirm">保存</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment';
    import * as api from '../../../../../api/index'
    export default {
        name: '',
        components: {
        },
        data () {
            return {
                currentDate: '',
                currentWorkTime: '',
                is_default_worktime: '0',
                changeShiftDialogVisible: false,  // 调班
                changeStaffDialogVisible: false,  // 班排
                worktimeSelectList: [],
                worktime_id_array:['','','','','','',''],
                week: '',
                staffName: '',
                weekValue: '',
                yearValue: '',
                value1: '',
                value2: '',
                month: '',
                year: '',
                form: {
                    page_size: 20,
                    page_no: 1
                },
                tableData: [],
                total: 0,
                page_no: 1,
                query: {},
                dialogVisible: false,
            }
        },
        created () {
            this.getWorktimeList();
            this.getFormData();
        },
        watch: {
            weekValue (value) {
                this.week = moment(value).format('W');
            },
            yearValue (value) {
                console.log(value);
                this.year = moment(value).format('YYYY');
                this.month = moment(value).format('MM');
            }
        },
        methods: {
            setWorktimeArray (index) {
                if (this.worktime_id_array[index] === '') {
                    this.$set(this.worktime_id_array, index, this.staffId);
                } else {
                    this.$set(this.worktime_id_array, index, '');
                }
            },
            copeFn () {},
            weekFilter (val) {
            },
            handleCurChange(value) {
                this.page_no = value;
                this.getFormData();
            },
            setWorktimeStaffEdit (value) {
                console.log(value);
                this.staffName = value.row.staff_name;
                this.staffId = value.row.staff_id;
                this.changeStaffDialogVisible =true;
            },
            async setPositionDelete (scope) {
                api.positionDelete({ id: scope.row.id})
            },
            async getFormData () {
                let params = {
                    page_size: 20,
                    page_no: this.page_no,
                    year: this.year,
                    month: this.month,
                    week: this.week,
                }
                const { data } = await api.worktimeStaffList(params);
                this.tableData = data.data;
                this.total = data.all_count
            },
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`);

            },
            async getWorktimeList () {
                const { data } = await api.worktimeSelectList();
                this.worktimeSelectList = data;
            },
            // 调班
            async changeShiftFn (itemP, item) {
                this.currentDate = item.date;
                this.staff_id = itemP.staff_id;
                this.currentWorkTime = item.worktime;
                this.changeShiftDialogVisible = true;
            },
            async changeShiftConfirm () {
                let params = {
                    staff_id: this.staff_id,
                    date: this.currentDate,
                    worktime_id: this.currentWorkTime,
                }
                const { data } = await api.worktimeStaffChange(params);
                console.log(data);
                this.changeShiftDialogVisible = false;
            },
            async changeStaffConfirm () {
                let params = {
                    staff_id: this.staffId,
                    is_default_worktime: this.is_default_worktime,
                    worktime_id_array: this.worktime_id_array,
                }
                const { data } = await api.worktimeStaffEdit(params);
                console.log(data);
                this.changeStaffDialogVisible = false;
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
    .changeShiftBox .item{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .changeShiftBox .item1{
        align-items: flex-start;
    }
    .changeShiftBox .item span{
        width: 100px;
        display: inline-block;
        text-align: right;
        margin-right: 10px;
    }
    .changeShiftBox  .worktime1Item{
        margin-bottom: 10px;
    }
    .changeShiftBox .item .worktime1Item span{
        width: 50px;
        text-align: left;
    ;
    }
    .changeShiftBox .worktime .worktimeItem{
        width: 65px;
        line-height: 35px;
        text-align: center;
        color: #333;
        display: inline-block;
        cursor: pointer;
        transition: 0.3s;
        border: 1px solid rgba(221, 221, 221, 1);
    }
    .changeShiftBox .worktime .worktimeItem.active{
        background: #409EFF;
        height: 35px;
        color: #fff;
    }
    .changeShiftBox .tips{
        color: rgba(121, 121, 121, 0.670588235294118);
        font-size: 12px;
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
