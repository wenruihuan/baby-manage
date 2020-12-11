<template>
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
                    <a @click="copeFn" style="cursor:pointer;" class="mainColor">复制上周排班</a>
                </div>
            </div>
            <div class="item">
                <span>排班方式：</span>
                <div>
                    <el-radio v-model="is_default_worktime" :label="1">默认排班</el-radio>
                    <el-radio v-model="is_default_worktime" :label="0">自定义排班</el-radio>
                </div>
            </div>
            <div class="item" v-if="is_default_worktime === 1">
                <span>时间范围：</span>
                <div class="worktime">
                    <span :class="worktime_array[0] ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(0)">周一</span>
                    <span :class="worktime_array[1] ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(1)">周二</span>
                    <span :class="worktime_array[2] ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(2)">周三</span>
                    <span :class="worktime_array[3] ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(3)">周四</span>
                    <span :class="worktime_array[4] ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(4)">周五</span>
                    <span :class="worktime_array[5] ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(5)">周六</span>
                    <span :class="worktime_array[6] ? 'active worktimeItem' : 'worktimeItem'" @click="setWorktimeArray(6)">周日</span>
                </div>
            </div>
            <div class="item" v-if="is_default_worktime === 1">
                <span>调整班次：</span>
                <el-time-select
                        class="width200"
                        v-model="value1"
                        :picker-options="{
                            start: '09:00',
                            step: '00:30',
                            end: '18:00'
                          }"
                        placeholder="选择时间">
                </el-time-select>
                <a v-if="value1 !== ''">-</a>
                <el-time-select
                        v-if="value1 !== ''"
                        class="width200"
                        v-model="value2"
                        :picker-options="{
                            start: value1,
                            step: '00:30',
                            end: '18:00'
                          }"
                        placeholder="先选择开始时间">
                </el-time-select>
            </div>
            <div class="item item1" v-if="is_default_worktime === 0">
                <span>时间范围：</span>
                <div class="worktime1">
                    <div class="worktime1Item">
                        <span>周一</span>
                        <el-select v-model="worktime_id_array[0]">
                            <el-option
                                    @click="setWorktimeIdArray(0)"
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
                                    @click="setWorktimeIdArray(1)"
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
                                    @click="setWorktimeIdArray(2)"
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
                                    @click="setWorktimeIdArray(3)"
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
                                @click="setWorktimeIdArray(4)"
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
                                    @click="setWorktimeIdArray(5)"
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
                                    @click="setWorktimeIdArray(6)"
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
                <el-button @click="changeStaffCancel">取 消</el-button>
                <el-button type="primary" @click="changeStaffConfirm">保存</el-button>
              </span>
    </el-dialog>
</template>

<script>
import * as api from '../../../../../api/index'
export default {
    name: 'setScheduling',
    data () {
        return {
            changeStaffDialogVisible: false,
            staffId: '',
            staffName: '',
            value1: '',
            value2: '',
            is_default_worktime: 1,
            timeArray: [],
            worktimeSelectList: [],
            worktime_id_array:['','','','','','',''],
            worktime_array:[false, false, false, false, false, false, false],
        }
    },
    created() {
        this.getWorktimeList();
    },
    methods: {
        getFormData (staffId, staffName) {
            console.log(staffId);
            console.log(staffName);
            this.changeStaffDialogVisible = true;
            this.staffId = staffId;
            this.staffName = staffName;
        },
        setWorktimeArray (index) {
            if (this.worktime_array[index]) {
                this.$set(this.worktime_array, index, false);
            } else {
                this.$set(this.worktime_array, index, true);
            }
        },
        setWorktimeIdArray (index) {
            if (this.worktime_id_array[index] === '') {
                this.$set(this.worktime_id_array, index, this.staffId);
            } else {
                this.$set(this.worktime_id_array, index, '');
            }
        },
        changeStaffCancel () {
            this.changeStaffDialogVisible = false;
            this.worktime_array = [false, false, false, false, false, false, false];
            this.$emit('cancel');
        },
        // 复制上周排班
        async copeFn () {
            let params = {
                staff_id: this.staffId
            }
            const { data } = await api.worktimeCopylast(params);
            this.changeStaffDialogVisible = false;
        },
        async getWorktimeList () {
            const { data } = await api.worktimeSelectList();
            this.worktimeSelectList = data;
        },
        // 2.4.4.设置排班
        async changeStaffConfirm () {
            let params = {};
            if (this.is_default_worktime === 0) {
                params = {
                    staff_id: this.staffId,
                    is_default_worktime: this.is_default_worktime,
                    worktime_id_array: this.worktime_id_array,
                };
            } else if (this.is_default_worktime === 1) {
                if (this.value1 === '') {
                    this.$message.error('请选择调整班次开始时间');
                    return false;
                }
                if (this.value2 === '') {
                    this.$message.error('请选择调整班次结束时间');
                    return false;
                }
                this.selectTime = this.value1 + '-' + this.value2;
                let worktime_array = [];
                this.worktime_array.forEach(m => {
                    if (m) {
                        worktime_array.push(this.selectTime)
                    } else {
                        worktime_array.push('')
                    }
                });
                params = {
                    staff_id: this.staffId,
                    is_default_worktime: this.is_default_worktime,
                    worktime_array: worktime_array
                };
            }
            const { data } = await api.worktimeStaffEdit(params);
            this.changeStaffCancel();
        }
    }
};
</script>

<style scoped>

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
