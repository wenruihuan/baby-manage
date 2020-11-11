<template>
    <div class="info-box">
        <div class="message">
            <span>消费明细({{consumeList.length}})</span>
            <el-button @click="clearConsumeList">清空</el-button>
        </div>
        <div class="consume-list">
            <div class="consume-item" v-for="item in consumeList">
                <div>
                    <div class="close" @click="clearConsumeItem(item)"><i class="el-icon-close"></i></div>
                    <div class="row">
                        <div class="name">
                            <span v-if="item.service_time">{{item.name + item.service_time}}分钟</span>
                            <span v-else>{{item.name}}</span>
                        </div>
                        <el-input-number v-model="item.sort" :min="1" :max="10"></el-input-number>
                        <div class="price" v-if="item.original_price">
                            <span>￥{{item.original_price * item.sort}}</span>
                            <el-button @click="clearConsumeList">改价</el-button>
                        </div>
                    </div>
                    <div class="row row-bottom" v-if="item.original_price">
                        <div>
                            技师：
                            <span class="item" v-for="itemStaff in itemStaffTechnicianSelectList">
                                        {{itemStaff.name}}
                                        <el-input v-model="itemStaff.time" class="shuru"></el-input>
                                        分钟
                                    </span>
                            <el-button icon="el-icon-plus" @click="showStaffTechnicianDialogVisible"></el-button>
                        </div>
                        <div>
                            <el-select v-model="item.rightSelectValue" placeholder="请选择">
                                <el-option
                                        v-for="item in item.rightSelect"
                                        :key="item.right_id"
                                        :label="item.right_name"
                                        :value="item.right_id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="" @click="serviceDialogVisible = true">赠送服务</div>
            <div class="consume-item consume-item1" v-for="item in addServiceList">
                <div>
                    <div class="row">
                        <div class="name">
                            <span>{{item.name}}</span>
                        </div>
                        <div>
                            <el-input class="shuru" v-model="item.sort"></el-input>次数
                        </div>
                        <div>
                            <el-date-picker
                                    v-model="item.date"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            前有效
                        </div>
                        <div @click="clearConsumeServiceItem(item)">删除</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'expenseDetails',
        data () {
            return {
                currentConsumeList: [],
            }
        },
        props: {
            consumeList: []
        },
        watch: {
            commonServiceList () {
                this.operationConsumeList();
            },
            commonBoxSelectList () {
                this.operationConsumeList();
            },
        },
    };
</script>

<style scoped>

</style>
