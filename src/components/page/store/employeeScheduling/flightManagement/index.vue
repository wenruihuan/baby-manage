<template>
    <div>
        <div class="operation">
            <div class="handle-box">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-button
                                type="primary"
                                class="handle-del mr10"
                                @click="addWorktime"
                        >添加班次</el-button>
                    </el-col>
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
                    label="班次名称"
                >
                </el-table-column>
                <el-table-column
                    prop="worktime"
                    label="班次时间"
                >
                </el-table-column>
                <el-table-column
                    prop="resttime"
                    label="休息时间"
                >
                    <template slot-scope="scope">
                        <p v-for="item in scope.row.resttime">
                            {{item}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="count"
                    label="使用人数"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-box">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <el-dialog
                title="添加班次"
                :visible.sync="dialogVisible"
                width="700px"
                :before-close="handleClose">
            <div class="dialog-box">
                <div class="item">
                    <span>班次名称：</span>
                    <div class="width200">
                        <el-input v-model="worktime_name"></el-input>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div class="item">
                    <span>班次时间：</span>

                    <el-time-select
                            class="width120"
                            v-model="worktime1"
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
                            v-model="worktime2"
                            :picker-options="{
                            start: worktime1,
                            step: '00:30',
                            end: '18:00'
                          }"
                            placeholder="选择时间">
                    </el-time-select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button size="small" @click="addResttimeListNum">添加休息时段</el-button>
                </div>
                <div class="item" v-for="(item, index) in resttimeList">
                    <span>休息时段：</span>
                    <el-time-select
                            class="width120"
                            v-model="item.resttime1[0]"
                            :picker-options="{
                            start: '12:00',
                            step: '00:30',
                            end: '13:00'
                          }"
                            placeholder="选择时间">
                    </el-time-select>
                     -
                    <el-time-select
                            class="width120"
                            v-model="item.resttime1[1]"
                            :picker-options="{
                            start: item.resttime1[0],
                            step: '00:30',
                            end: '18:00'
                          }"
                            placeholder="选择时间">
                    </el-time-select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button size="small" @click="removeWorktimeNum(index)">删除</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setWorktimeCancel">取 消</el-button>
                <el-button type="primary" @click="setWorktimeSave">确 定</el-button>
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
                worktime_id: '',
                worktime_name: '',
                worktime: [],
                worktime1: '9:00',
                worktime2: '18:00',
                resttime1: ['', ''],
                resttime2: '',
                resttimeList: [
                    {
                        resttime1:['12:00', '13:00']
                    }
                ],
                resttime: [],
                value1: [],
                page_no: 1,
                total: 0,
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
            addWorktime () {
                this.worktime_name = '';
                this.resttimeList = [
                    {
                        resttime1:['12:00', '13:00']
                    }
                ];
                this.dialogVisible = true;
            },
            addResttimeListNum () {
                this.resttimeList.push({
                    resttime1:['12:00', '13:00']
                });
            },
            removeWorktimeNum (index) {
                this.resttimeList.splice(index, 1) ;
            },
            async setWorktimeCancel () {
                this.dialogVisible = false;
                this.worktime1 = [];
                this.worktime2 = [];
                this.resttime = [];
            },
            async setWorktimeSave () {
                this.resttime = [];
                this.worktime = [];
                this.dialogVisible = false;
                this.resttimeList.forEach(m => {
                    this.resttime.push(m.resttime1[0] + '-' + m.resttime1[1]);
                });
                this.worktime.push(this.worktime1 + '-' + this.worktime2);
                let params = {
                    worktime_name: this.worktime_name,
                    worktime: this.worktime,
                    resttime: this.resttime
                };
                if (this.worktime_id !== '') {
                    params.worktime_id = this.worktime_id;
                }
                api.worktimeSave(params);
                this.worktime1 = [];
                this.worktime2 = [];
                this.resttime = [];
            },
            async getFormData () {
                let params = {
                    page_size: 20,
                    page_no: this.page_no
                };
                const { data } = await api.worktimeList(params);
                this.tableData = data.data;
                this.total = data.all_count;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page_no = val;
                this.getFormData();
            },
            handleClick (val) {
                this.resttimeList = [];
                this.worktime_id = val.worktime_id;
                this.worktime_name = val.name;
                this.worktime1 = val.worktime.split('-')[0];
                this.worktime2 = val.worktime.split('-')[1];
                this.resttime = val.resttime;
                console.log(val.resttime);
                val.resttime.forEach(m => {
                        console.log({resttime1: m.split('-')})
                    this.resttimeList.push({resttime1: m.split('-')});
                });
                this.dialogVisible = true;
            },
            handleClose () {
                this.dialogVisible = false;
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
