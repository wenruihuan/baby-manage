<template>
    <div class="memberList">
        <div :class="isShowAll ? 'search active' : 'search'">
            <div class="box ">
                <div class="left">
                    <el-button type="primary" @click="memberdialogVisible = true; operationState = '新增'">添加会员</el-button>
                    <el-button>快速注册入口</el-button>
                    <el-button>等级设置</el-button>
                    <el-dropdown trigger="click" style="margin-left: 10px;">
                        <el-button>导出 <i class="el-icon-arrow-down"></i></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>导出会员信息</el-dropdown-item>
                            <el-dropdown-item>导出购买服务</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="right">
                    <el-input class="width200" placeholder="名字、手机号或会员编号" prefix-icon="el-icon-search">
                    </el-input>
                    <el-button>搜索</el-button>
                </div>
            </div>
            <div class="box ">
                <div>
                    <span class="label">会员等级：</span>
                    <el-select v-model="bb" placeholder="选择会员等级">
                        <el-option
                            v-for="item in memberLevelList"
                            :key="item.no"
                            :label="item.title"
                            :value="item.no"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div>
                    归属门店： 多多亲子岁月一店
                </div>
                <div>
                    持有卡项：
                    <el-select v-model="currentMemberCard" placeholder="选择会员等级">
                        <el-option
                                v-for="item in memberAllCardList.valid"
                                :key="item.no"
                                :label="item.title"
                                :value="item.no"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="box box1">
                <span>消费频次：</span>
                <div class="item">全部</div>
                <div class="item">1月未消费</div>
                <div class="item">2月未消费</div>
                <div class="item">3月未消费</div>
                <div class="item"><el-input class="width85"></el-input> 月未消费</div>
            </div>
            <div class="box box1">
                <span>消费次数：</span>
                <div class="item">全部</div>
                <div class="item">1次以内</div>
                <div class="item">2次以内</div>
                <div class="item">3次以内</div>
                <div class="item"><el-input class="width85"></el-input> 次以内</div>
            </div>
            <div class="box box1">
                <span>客户标签：</span>
                <div class="item">选择</div>
            </div>
            <div class="box box1">
                <span>生日：</span>
                <div class="item">本月</div>
                <div class="item">本周</div>
                <div class="item">下个月</div>
                <div class="item">今天</div>
                <div class="item">明天</div>
                <div class="item">
                    <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="box box1">
                <span>注册时间：</span>
                <div class="item">本月</div>
                <div class="item">本周</div>
                <div class="item">下个月</div>
                <div class="item">今天</div>
                <div class="item">明天</div>
                <div class="item">
                    <el-date-picker
                            v-model="value2"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="box box1">
                <span>会员来源：</span>
                <div class="item">全部</div>
                <div class="item">线上注册</div>
                <div class="item">线下录入</div>
            </div>
            <div class="box box1">
                <span>积分数量：</span>
                <div class="item">全部</div>
                <div class="item">
                    <el-input class="width85" placeholder="自定义"></el-input>
                    <span>-</span>
                    <el-input class="width85" placeholder="自定义"></el-input>
                </div>
                <div class="item">线下录入</div>
            </div>
            <div class="box box1">
                <span>健康管理师：</span>
                <el-select v-model="bb" placeholder="选择会员等级">
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
                    border
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
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <div class="pic">
                                <img :src="scope.row.head_img" alt="">
                            </div>
                            <div class="info">
                                <p>{{scope.row.memeber_name}}</p>
                                <p>{{scope.row.memeber_phone}}</p>
                                <p>{{scope.row.memeber_no}}</p>
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
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </div>
        <el-dialog
            title="新增会员"
            :visible.sync="memberdialogVisible"
            width="50%">
            <user-info ref="ruleForm"></user-info>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelMemberdialogVisible">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import userInfo from './common/userInfoDialog'
import * as api from '../../../api/index'
import { memberAllCard } from '../../../api';
export default {
    name: 'memberList',
    data () {
        return {
            operationState: '添加会员',
            isShowAll: false,
            memberdialogVisible: false,
            memberAllCardList: [],
            hmSelectList: [],
            memberList: [],
            memberLevelList: [],
            page: {
                total: 30
            },
            currentMemberCard: '',
            currentMemberLeve: '',
            value: '',
            value1: '',
            value2: '',
            aa: '',
            bb: ''
        }
    },
    components: {
        userInfo
    },
    created() {
        this.getMemberLevelList();
        this.getMemberAllCard();
        this.getHmSelectList();
        this.getMemberList();
    },
    methods: {
        // 所有卡项
        async getMemberAllCard () {
            const  { data } = await memberAllCard();
            this.memberAllCardList = data;
        },
        // 会员等级列表
        async getMemberLevelList () {
            const  { data } = await api.memberLevelList();
            this.memberLevelList = data.data;
        },
        // 获取会员列表
        async getMemberList () {
            const  { data } = await api.memberList();
            this.memberList = data.data;
            this.page.total = data.all_count;
        },
        // 获取会员列表
        async getHmSelectList () {
            const  { data } = await api.hmSelectList();
            this.hmSelectList = data;
        },
        handleClose () {},
        handleCurrentChange () {},
        handleSelectionChange () {},
        handleMemberDetails (scope) {
            this.operationState = '查看';
            this.ruleForm = scope.row;
            // this.memberdialogVisible = true;
            this.$router.push({ path: '/memberDetails', query: { id: '315728c141a1475680e6519d444a4314' }})
        },
        handleBilling (scope) {
            console.log(scope);
            // this.$router.push({ path: '/workbench', query: { id: scope.row.memeber_id }})
            this.$router.push({ path: '/workbench', query: { id: '315728c141a1475680e6519d444a4314' }})
        },
        // 新增会员
        submitForm (value) {
            this.$refs.ruleForm.submitFn(() => {
                alert(123);
            });
        },
        // 取消新增会员
        cancelMemberdialogVisible (value) {
            this.memberdialogVisible = false;
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
.memberList .search .box1 .item1.active,
.memberList .search .box1 .item1:hover{
    background: #409EFF;
    color: #fff;
}
.memberList .search.active{
    height: 565px;
}
</style>
