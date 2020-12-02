<template>
    <div class="memberList">
        <div :class="isShowAll ? 'search active' : 'search'">
            <div class="box ">
                <div class="left">
                    <el-button type="primary" @click="memberdialogVisible = true; operationState = '新增'">添加会员</el-button>
                    <el-popover
                            style="margin-left: 10px;"
                            placement="bottom"
                            trigger="click">
                        <div><img :src="QR_url" width="150" height="150" alt=""></div>
                        <el-button slot="reference">快速注册入口</el-button>
                    </el-popover>
                    <el-button style="margin-left: 10px;" @click="$router.push('/MemberSetting')">等级设置</el-button>
                    <el-dropdown trigger="click" style="margin-left: 10px;">
                        <el-button>导出 <i class="el-icon-arrow-down"></i></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>导出会员信息</el-dropdown-item>
                            <el-dropdown-item>导出购买服务</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="right">
                    <el-input class="width200" v-model="search.keyword" placeholder="名字、手机号或会员编号" prefix-icon="el-icon-search"> </el-input>
                    <el-button style="margin-left: 10px;" @click="getMemberList">搜索</el-button>
                </div>
            </div>
            <div class="box ">
                <div>
                    <span class="label">会员等级：</span>
                    <el-select v-model="search.level_id" placeholder="选择会员等级">
                        <el-option
                            v-for="(item, index) in memberLevelList"
                            :key="index"
                            :label="item.name"
                            :value="item.level_id"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div>
                    归属门店： 多多亲子岁月一店
                </div>
                <div>
                    持有卡项：
                    <el-select v-model="currentHaveCard" placeholder="选择会员等级">
                        <el-option
                            v-for="(item, index) in memberAllCardList"
                            :key="index"
                            :label="item.name"
                            :value="item.type"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="box box1">
                <span>消费频次：</span>
                <div
                    v-for="(item, index) in last_buy"
                    :key="index"
                     :class="search.last_buy === item.value ? ' active item' : 'item'"
                    @click="searchValFn('last_buy', item.value)"
                >
                    {{item.label}}
                </div>
                <div class="item">
                    <el-input class="width85" v-model="search.last_buy"></el-input> 月未消费</div>
            </div>
            <div class="box box1">
                <span>消费次数：</span>
                <div
                        v-for="(item, index) in buy_count"
                        :key="index"
                        :class="search.buy_count === item.value ? ' active item' : 'item'"
                        @click="searchValFn('buy_count', item.value)"
                >
                    {{item.label}}
                </div>
                <div class="item"><el-input class="width85" v-model="search.buy_count"></el-input> 次以内</div>
            </div>
            <div class="box box1">
                <span>客户标签：</span>
                <div :class="search.tag_id === '' ? ' active item' : 'item'" @click="search.tag_id = ''">全部</div>
                <div
                    v-for="(item, index) in allTagList"
                    :key="index"
                    :class="search.tag_id === item.tag_id ? ' active item' : 'item'"
                    @click="searchValFn('tag_id', item.tag_id)"
                >
                    {{item.tag_name}}
                </div>
            </div>
            <div class="box box1">
                <span>生日：</span>
                <div :class="birthdayState === '' ? 'active item' : 'item'" @click="search.start_birthday = ''; search.end_birthday = ''; birthdayState = ''">全部</div>
                <div :class="birthdayState === 'month' ? 'active item' : 'item'" @click="getMonthStartAndEnd(0, 'birthdayState', 'month', 'start_birthday', 'end_birthday')">本月</div>
                <div :class="birthdayState === 'week' ? 'active item' : 'item'" @click="getWeekStartAndEnd(0, 'birthdayState', 'start_birthday', 'end_birthday')">本周</div>
                <div :class="birthdayState === 'nextMonth' ? 'active item' : 'item'" @click="getMonthStartAndEnd(1, 'birthdayState', 'nextMonth', 'start_birthday', 'end_birthday')">下个月</div>
                <div :class="birthdayState === 'today' ? 'active item' : 'item'" @click="getTodayTime('0', 'birthdayState', 'today', 'start_birthday', 'end_birthday')">今天</div>
                <div :class="birthdayState === 'tomorrow' ? 'active item' : 'item'" @click="getTodayTime('1', 'birthdayState', 'tomorrow', 'start_birthday', 'end_birthday')">明天</div>
                <div class="item">
                    <el-date-picker
                        @change="birthdayStateFn"
                        v-model="birthdayValue"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="box box1">
                <span>注册时间：</span>
                <div :class="regState === '' ? 'active item' : 'item'" @click="search.reg_start_time = ''; search.reg_end_time = ''; regState = ''">全部</div>
                <div :class="regState === 'month' ? 'active item' : 'item'" @click="getMonthStartAndEnd(0, 'regState', 'month', 'reg_start_time', 'reg_end_time')">本月</div>
                <div :class="regState === 'week' ? 'active item' : 'item'" @click="getWeekStartAndEnd(0, 'regState', 'reg_start_time', 'reg_end_time')">本周</div>
                <div :class="regState === 'nextMonth' ? 'active item' : 'item'" @click="getMonthStartAndEnd(1, 'regState', 'nextMonth', 'reg_start_time', 'reg_end_time')">下个月</div>
                <div :class="regState === 'today' ? 'active item' : 'item'" @click="getTodayTime('0', 'regState', 'today', 'start_birthday', 'end_birthday')">今天</div>
                <div :class="regState === 'tomorrow' ? 'active item' : 'item'" @click="getTodayTime('1', 'regState', 'tomorrow', 'start_birthday', 'end_birthday')">明天</div>
                <div class="item">
                    <el-date-picker
                        @change="regStateFn"
                        v-model="regTimeValue"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="box box1">
                <span>会员来源：</span>
                <div
                    v-for="(item, index) in sourceList"
                    :key="index"
                    :class="search.source === item.value ? ' active item' : 'item'"
                    @click="searchValFn('source', item.value)"
                >
                    {{item.label}}
                </div>
            </div>
            <div class="box box1">
                <span>积分数量：</span>
                <div @click="pointFn" :class="search.start_point === '' && search.end_point === '' ? ' active item' : 'item'">全部</div>
                <div class="item">
                    <el-input v-model="search.start_point" class="width85" placeholder="自定义"></el-input>
                    <span>-</span>
                    <el-input v-model="search.end_point" class="width85" placeholder="自定义"></el-input>
                </div>
            </div>
            <div class="box box1">
                <span>健康管理师：</span>
                <el-select v-model="search.hm_id" placeholder="选择会员等级">
                    <el-option
                        v-for="item in hmSelectList"
                        :key="item.hm_id"
                        :label="item.hm_name"
                        :value="item.hm_id"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="bottom">
                <span v-if="!isShowAll" @click="isShowAll = true">更多选项 <i class="el-icon-arrow-down"></i></span>
                <span v-if="isShowAll" @click="isShowAll = false">收起选项 <i class="el-icon-arrow-up"></i></span>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="memberList"
                style="width: 100%"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="会员信息"
                    width="250px"
                >
                    <template slot-scope="scope">
                        <div class="item" style="display: flex; align-items: center">
                            <div class="pic" style="margin-right: 20px;">
                                <img :src="scope.row.head_img" alt="" width="80">
                                <p class="level_name">{{scope.row.level_name}}</p>
                            </div>
                            <div class="info">
                                <p>{{scope.row.memeber_name}}</p>
                                <p>{{scope.row.memeber_phone}}</p>
                                <p>编号：{{scope.row.memeber_no}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="余额与卡"
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <div class="info">
                                <p>持卡：{{scope.row.card_count}}</p>
                                <p>余额：{{scope.row.total_balance}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="last_buy"
                    label="最近消费"
                >
                </el-table-column>
                <el-table-column
                    prop="buy_time"
                    label="消费次数"
                    width="100px"
                >
                </el-table-column>
                <el-table-column
                    prop="total_buy"
                    label="累计消费（元）"
                >
                </el-table-column>
                <el-table-column
                        prop="reg_time"
                        label="注册时间"
                >
                </el-table-column>
                <el-table-column
                        prop="shop_name"
                        label="归属门店"
                >
                </el-table-column>
                <el-table-column
                        prop="hm_name"
                        label="健康管理师"
                >
                </el-table-column>
                <el-table-column
                    prop="birthday"
                    label="生日"
                    width="100px"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleMemberDetails(scope)" type="text" size="small">详情</el-button>
                        <el-button type="text" size="small" @click="handleBilling(scope)">开单</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-box">
            <div class="operation">
                <el-button @click="isShowCommonTagFn">添加标签</el-button>
                <el-button @click="deleteMemberFn">移除会员</el-button>
                <el-button @click="hmdialogVisibleFn">更改健康管理师</el-button>
            </div>
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </div>
        <!--标签操作弹窗-->
        <common-tag
            :selectNum="memeberIds.length"
            v-if="isShowCommonTag"
            @change="changeTag">
        </common-tag>

        <!--新增会员-->
        <user-info
            class="dialogMain"
            :userId="userId"
            ref="ruleForm"
            v-if="memberdialogVisible"
            @submit="submitCallBack"
            @cancel="(state) => this.memberdialogVisible = state"
        ></user-info>

        <!--选择健康管理师-->
        <el-dialog
            :title="hmdialogTitle"
            :visible.sync="hmdialogVisible"
            width="400px">
            <el-select v-model="hm_id" placeholder="选择健康管理师">
                <el-option
                        v-for="(item, index) in hmSelectList"
                        :key="index"
                        :label="item.hm_name"
                        :value="item.hm_id"
                >
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="hmdialogVisible = false">取消</el-button>
                <el-button type="primary" @click="changeMemberBindHm('ruleForm')">保存</el-button>
            </span>
        </el-dialog>
        <!--移除会员弹窗-->
        <el-dialog
            title="移除会员"
            :visible.sync="memberDeletldialogVisible"
            width="400px">
            <p>
                已选:{{hm_id.length}}
            </p>
            <el-select  multiple v-model="hm_id" class="d9d9d9" placeholder="选择会员等级">
                <el-option
                        class="d9d9d9"
                        v-for="(item, index) in hmSelectList"
                        :key="index"
                        :label="item.hm_name"
                        :value="item.hm_id"
                >
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelMemberdialogVisible">取消</el-button>
                <el-button type="primary" @click="changeMemberBindHm('ruleForm')">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import userInfo from './common/userInfoDialog'
import commonTag from './common/commonTag'
import * as api from '../../../api/index'
import { memberAllCard } from '../../../api';
export default {
    name: 'memberList',
    data () {
        return {
            userId: '',
            QR_url: '',
            regState: '',
            birthdayState: '',
            hmdialogTitle: '所属健康管理师',
            allTagList: [],
            last_buy: [
                {
                    label: '全部',
                    value: '',
                    state: false,
                },
                {
                    label: '1月未消费',
                    state: false,
                    value: '1'
                },
                {
                    label: '2月未消费',
                    state: false,
                    value: '2'
                },
                {
                    label: '3月未消费',
                    state: false,
                    value: '3'
                }
            ], //消费频次
            buy_count: [
                {
                    label: '全部',
                    value: '',
                    state: false,
                },
                {
                    label: '1次以内',
                    state: false,
                    value: '1'
                },
                {
                    label: '2次以内',
                    state: false,
                    value: '2'
                },
                {
                    label: '3次以内',
                    state: false,
                    value: '3'
                }
            ], //消费频次
            page_no: 1,
            sourceList: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '线上注册',
                    value: 0
                },
                {
                    label: '线下录入',
                    state: false,
                    value: 1
                }
            ], //消费频次
            weekValue: [], // 当前周
            birthdayValue: [],
            regTimeValue: [],
            search: {
                start_point: '',
                end_point: '',
                keyword: '',
                buy_count: '',
                tag_id: '',
                source: '',
                start_birthday: '',
                end_birthday: '',
                reg_start_time: '',
                reg_end_time: '',
                last_buy: ''
            },
            isShowCommonTag: false,
            hm_id: [], //健康管理师选中ID
            memeberIds: [], //选中的用户ID
            operationState: '添加会员',
            isShowAll: false,
            memberdialogVisible: false,
            memberDeletldialogVisible: false,
            hmdialogVisible: false, // 更改健康管理师弹窗
            memberAllCardList: [],
            hmSelectList: [],
            memberList: [],
            memberLevelList: [],
            page: {
                total: 30
            },
            currentMemberCard: '',
            currentMemberLeve: '',
            currentHaveCard: '',
            value: '',
            value1: '',
            value2: '',
            aa: '',
            bb: ''
        }
    },
    components: {
        userInfo,
        commonTag
    },
    watch: {
    },
    created() {
        this.regState = '';
        this.getMemberLevelList();
        this.getMemberAllCard();
        this.getHmSelectList();
        this.getMemberList();
        this.getMemberAllTag();
        this.getMemberRegQr();
        // 当前周计算
        // this.weekValue = this.getWeekStartAndEnd(0);
    },
    methods: {
        birthdayStateFn (value) {
            if (value !== null) {
                this.birthdayState = 'custom';
            } else {
                this.birthdayState = '';
            };
        },
        regStateFn (value) {
            if (value !== null) {
                this.regState = 'custom';
            } else {
                this.regState = '';
            };
        },
        pointFn () {
            this.search.start_point = '';
            this.search.end_point = '';
        },
        // 新增会员提交后回调
        submitCallBack () {
            console.log('submitCallBack');
            this.memberdialogVisible = false;
        },
        async changeTag (item) {
            console.log(item);
            if (item.length > 0 ) {
                this.isShowCommonTag = false;
                this.hmdialogTitle = '所属健康管理师 （已选'+ this.memeberIds.length +'）'
                const data = await api.memberEditTag({ memeber_ids: this.memeberIds, tag_ids: item })
                this.$message({
                    type: 'success',
                    message: data.msg
                });
            } else {
                this.$message({
                    type: 'info',
                    message: '未选择!'
                });
            }
        },
        hmdialogVisibleFn () {
            if (this.memeberIds.length > 0 ) {
                this.hmdialogVisible = true;
                this.hmdialogTitle = '所属健康管理师 （已选'+ this.memeberIds.length +'）'
            } else {
                this.$message({
                    type: 'info',
                    message: '未选择!'
                });
            }
        },
        isShowCommonTagFn () {
            if (this.memeberIds.length > 0 ) {
                this.isShowCommonTag = true;
            } else {
                this.$message({
                    type: 'info',
                    message: '未选择!'
                });
            }
        },
        // 4.3.12.会员标签-获取所有标签
        async getMemberAllTag () {
            const { data } = await api.memberAllTag();
            this.allTagList = data;
        },
        // 删除会员操作
        deleteMemberFn () {
            if (this.memeberIds.length > 0 ) {
                this.$confirm('是否确认移除该会员？', '移除会员', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const data = await api.memberDelete({ memeber_id_array: this.memeberIds });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                });
            } else {
                this.$message({
                    type: 'info',
                    message: '未选择!'
                });
            }
        },
        async changeMemberBindHm () {
            const data = await api.memberBindHm({ memeber_ids: this.memeberIds, hm_id: this.hm_id });
            this.$message.success(data.msg);
            this.hmdialogVisible = false;
            this.getMemberList();
        },
        // 所有卡项
        async getMemberAllCard () {
            const  { data } = await api.listNoPage();
            this.memberAllCardList = data;
            this.memberAllCardList.unshift({
                name: '全部',
                type: ''
            })
        },
        // 会员等级列表
        async getMemberLevelList () {
            const  { data } = await api.memberLevelList();
            this.memberLevelList = data;
        },
        // 获取会员列表
        async getMemberList () {
            this.search.have_card = this.currentHaveCard;
            if (this.birthdayState === 'custom') {
                this.search.start_birthday = this.birthdayValue[0];
                this.search.end_birthday = this.birthdayValue[1];
            }
            if (this.regState === 'custom') {
                this.search.reg_start_time = this.regTimeValue[0];
                this.search.reg_end_time = this.regTimeValue[1];
            };
            let params = {
                page_size: 20,
                page_no: this.page_no,
                ...this.search
            };
            const  { data } = await api.memberList(params);
            this.memberList = data.data;
            this.page.total = data.all_count;
        },
        // 获取健康管理师下来列表
        async getHmSelectList () {
            const  { data } = await api.hmSelectList();
            this.hmSelectList = data;
            this.hmSelectList.unshift({
                hm_name: '全部',
                hm_id: ''
            })
        },
        handleClose () {},
        // 4.3.8.获取快速注册二维码
        async getMemberRegQr () {
            const { data } = await api.memberRegQr();
            this.QR_url = data.QR_url;
        },
        handleCurrentChange (value) {
            this.page_no = value;
            this.getMemberList();
        },
        // table勾选选中值
        handleSelectionChange (item) {
            this.memeberIds = item.map(m => { return m.memeber_id });
            console.log(this.memeberIds);
        },
        handleMemberDetails (scope) {
            this.operationState = '查看';
            this.ruleForm = scope.row;
            // this.memberdialogVisible = true;
            this.$router.push({ path: '/memberDetails', query: { id: '315728c141a1475680e6519d444a4314' }})
        },
        handleBilling (scope) {
            console.log(scope);
            this.$alert('目前为会员id为假数据，如果用当前ID过去，后台没有对应id的会员');
            // this.$router.push({ path: '/workbench', query: { id: scope.row.memeber_id }})
            this.$router.push({ path: '/workbench', query: { id: '315728c141a1475680e6519d444a4314' }})
        },
        // 取消新增会员
        cancelMemberdialogVisible (value) {
            this.memberdialogVisible = false;
        },
        searchValFn (name, value) {
            this.search[name] = value;
        },
        getWeekStartAndEnd(AddWeekCount, state, startTime, endTime) {
            //起止日期数组
            let startStop = [];
            //一天的毫秒数
            let millisecond = 1000 * 60 * 60 * 24;
            //获取当前时间
            let currentDate = new Date();
            //相对于当前日期AddWeekCount个周的日期
            currentDate = new Date(currentDate.getTime() + (millisecond * 7 * AddWeekCount));
            //返回date是一周中的某一天
            let week = currentDate.getDay();
            //返回date是一个月中的某一天
            let month = currentDate.getDate();
            //减去的天数
            let minusDay = week !== 0 ? week - 1 : 6;
            //获得当前周的第一天
            let currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay));
            //获得当前周的最后一天
            let currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
            //添加至数组
            this.$set(this, state, 'week');
            this.$set(this.search, startTime, dayjs(currentWeekFirstDay).format('YYYY-MM-DD'));
            this.$set(this.search, endTime, dayjs(currentWeekLastDay).format('YYYY-MM-DD'));
        },
        getMonthStartAndEnd (AddMonthCount, stateName, stateValue, startTime, endTime) {
            //起止日期数组
            let startStop = new Array();
            //获取当前时间
            let currentDate = new Date();
            let month=currentDate.getMonth()+AddMonthCount;
            if(month<0){
                let n = parseInt((-month)/12);
                month += n*12;
                currentDate.setFullYear(currentDate.getFullYear()-n);
            };
            currentDate = new Date(currentDate.setMonth(month));
            //获得当前月份0-11
            let currentMonth = currentDate.getMonth();
            //获得当前年份4位年
            let currentYear = currentDate.getFullYear();
            //获得上一个月的第一天
            let currentMonthFirstDay = new Date(currentYear, currentMonth,1);
            //获得上一月的最后一天
            let currentMonthLastDay = new Date(currentYear, currentMonth+1, 0);
            //添加至数组
            this.$set(this, stateName, stateValue);
            this.$set(this.search, startTime, dayjs(currentMonthFirstDay).format('YYYY-MM-DD'));
            this.$set(this.search, endTime, dayjs(currentMonthLastDay).format('YYYY-MM-DD'));
            //返回
            return startStop;
        },
        getTodayTime (AddMonthCount, stateName, stateValue, startTime, endTime) {
            console.log(dayjs(new Date().getTime() + 24*60*60*1000*AddMonthCount).format('YYYY-MM-DD'));
            this.$set(this, stateName, stateValue);
            this.$set(this.search, startTime, dayjs(new Date().getTime() + 24*60*60*1000*AddMonthCount).format('YYYY-MM-DD'));
            this.$set(this.search, endTime, dayjs(new Date().getTime() + 24*60*60*1000*AddMonthCount).format('YYYY-MM-DD'));
        }
    }
};
</script>

<style scoped>
.memberList .search{
    height: 266px;
    transition: 0.5s;
    overflow: hidden;
    position: relative;
    background: #fff;
    padding: 10px 10px 50px;
}
.memberList .search .bottom{
    height: 50px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
}
.memberList .search .bottom span{
    cursor: pointer;
}
.memberList .search .box{
    height: 46px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.memberList .search .box1{
    justify-content: flex-start;
}
.memberList .search .box .label,
.memberList .search .box> span{
    text-align: right;
    width: 88px;
    display: inline-block;
}
.memberList .search .box1 .item{
    margin-left: 10px;
    padding: 5px 10px;
    cursor: pointer;
    transition: 0.3s;
}

.memberList .search .box1 .item.active,
.memberList .search .box1 .item1.active,
.memberList .search .box1 .item1:hover{
    background: #409EFF;
    color: #fff;
}
.memberList .search.active{
    height: 565px;
}
.page-box{
    display: flex;
    justify-content: space-between;
}
.memberList .level_name{
    background: #409EFF;
    display: inline-block;
    transform: scale(0.8);
    padding: 3px 5px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
}
</style>
