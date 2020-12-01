<template>
    <div class="messageDetails">
        <div class="top">
            <div class="user_info">
                <div class="pic"><img :src="userInfo.head_img" width="63" height="63"></div>
                <div class="info">
                    <p class="name">{{userInfo.name}} <span class="el-icon-edit edit" @click="showMemberdialogVisible(userInfo)">编辑</span></p>
                    <p class="level">{{userInfo.level_name}}</p>
                </div>
            </div>
            <div class="operation">
                <el-button @click="getMemberProfile">健康档案</el-button>
                <el-button @click="$router.push({path: '/AppointmentList', query: { keyword: userInfo.name }})">预约</el-button>
                <el-button>开单</el-button>
            </div>
        </div>
        <div class="box1 clearfix">
            <div class="col"><span>联系电话：</span><i>+86 12312332123</i></div>
            <div class="col"><span>归属门店：</span><i>多多亲子岁月一店</i></div>
            <div class="col"><span>生日：</span><i>1990-09-09</i></div>
            <div class="col"><span>客户编号：</span><i>123123</i></div>
            <div class="col"><span>健康管理师：</span><i>王亚亚</i></div>
        </div>

        <div class="box2">
            <div class="item">
                <div class="info-title">消费数据</div>
                <div class="contentBox">
                    <div class="col"><span>累计消费总额（元）</span><i>1110.94</i></div>
                    <div class="col"><span>总消费次数</span><i>4</i></div>
                    <div class="col"><span>最近消费时间</span><i>2020.08.20</i></div>
                </div>
            </div>
            <div class="item">
                <div class="info-title">客户标签</div>
                <div class="contentBox">
                    <div :class="userInfo.tag && userInfo.tag.length < 1 ? 'addBox' : 'addBox active'">
                        <span class="item"
                          v-for="(item, index) in userInfo.tag"
                          :key="index"
                        >
                            {{item.tag_name}}
                        </span>
                        <span v-if="userInfo.tag && userInfo.tag.length < 1" class="el-icon-plus" @click="isShowCommonTag = true">编辑标签</span>
                        <span v-else class="addBtn el-icon-plus" @click="isShowCommonTag = true"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="box3">
            <div class="left">
                <img src="../../../assets/img/alipay.png" alt="">
                待服务预约
            </div>
            <div class="right">
                <router-link :to="{path: '/AppointmentList', query: { keyword: userInfo.name }}">{{userInfo.booking_count}}条预约待处理 <i class="el-icon-arrow-right"></i></router-link>
            </div>
        </div>
        <div class="box4">
            <div class="info">
                <div class="list">
                    <div
                        :class="box4State === 0 ? 'active item' : 'item'"
                        @click="box4State = 0"
                    >
                        <p>卡项</p>
                        <p>2</p>
                    </div>
                    <div
                        :class="box4State === 1 ? 'active item' : 'item'"
                        @click="box4State = 1"
                    >
                        <p>赠送权益</p>
                        <p>1</p>
                    </div>
                    <div
                        :class="box4State === 2 ? 'active item' : 'item'"
                        @click="box4State = 2"
                    >
                        <p>积分</p>
                        <p>{{pointInfoDetails.total_point}}</p>
                    </div>
                </div>
                <div>
                    <div v-if="box4State === 0">
                        <span>卡项状态：</span>
                        <el-select  class="width200" v-model="carstate" placeholder="">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option label="使用中" value="使用中"></el-option>
                            <el-option label="" value="已失效"></el-option>
                        </el-select>
                    </div>
                    <div v-if="box4State === 1">
                        <router-link :to="{path: '/integralSubsidiary', query: { member_id: this.userId }}">查看全部<i class="el-icon-arrow-right"></i></router-link>
                    </div>
                    <div v-if="box4State === 2">
                        <router-link :to="{path: '/integralDetails', query: {available_point: pointInfoDetails.available_point, total_point: pointInfoDetails.total_point}}">查看积分明细<i class="el-icon-arrow-right"></i></router-link>
                    </div>
                </div>
            </div>
            <div class="contentBox">
                <div class="item"
                     v-if="box4State === 0"
                     v-for="item in memberCardList"
                     :key="item.card_id"
                >
                    <div class="pic">
                        <img :src="item.img">
                    </div>
                    <div>
                        <p class="info">
                            <span>{{item.card_name}}</span>
                            <i v-if="item.available_time">{{item.available_time}}次</i>
                        </p>
                        <p class="price">￥{{item.balance}}</p>
                        <p class="time">有效期：{{item.expires}}</p>
                    </div>
                </div>
                <div class="item item1"
                     v-if="box4State === 1"
                     v-for="item in memberGiveServiceList"
                     :key="item.card_id"
                >
                    <p class="bg" v-if="item.is_overdue === '1'">已过期</p>
                    <p class="bg" v-if="item.is_used_up === '1'">已用完</p>
                    <div class="pic">
                        <img :src="item.img">
                    </div>
                    <div>
                        <p class="info">
                            <span>{{item.name}}</span>
                            <i v-if="item.available_time">{{item.available_time}}次</i>
                        </p>
                        <p class="used">
                            <span>使用情况：剩余{{item.available_time}}次</span>
                            <span>x{{item.time}}</span>
                        </p>
                        <p class="time">
                            <span>有效期：{{item.deadline}}</span>
                            <span>开单赠送</span>
                        </p>
                    </div>
                </div>
                <div class="item item2"
                     v-if="box4State === 2"
                >
                    <div class="box">
                        <p>可使用积分</p>
                        <p>
                            <span>{{pointInfoDetails.available_point}}</span>
                            <el-popover
                                    placement="bottom"
                                    width="400"
                                    trigger="click">
                                <div class="popoverBox">
                                    <div class="item">
                                        <div><span>增减积分：</span></div>
                                        <div>
                                            <el-radio-group v-model="radio">
                                                <el-radio :label="1">加 <el-input class="width85"></el-input>积分</el-radio><br>
                                                <el-radio :label="2">减 <el-input class="width85"></el-input>积分</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div><span>备注：</span></div>
                                        <div>
                                            <el-input type="textarea" ></el-input>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <el-button>取消</el-button>
                                        <el-button type="primary">确认</el-button>
                                    </div>
                                </div>
                                <el-button style="background: none; border: 0; color: #409EFF;" slot="reference">增减积分</el-button>
                            </el-popover>
                        </p>
                    </div>
                    <div class="box">
                        <p>总积分</p>
                        <p>{{pointInfoDetails.total_point}}</p>
                    </div>
                    <div class="box">
                        <p>已消耗积分</p>
                        <p>{{pointInfoDetails.total_point - pointInfoDetails.available_point}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="box5">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="交易记录" name="交易记录">
                    <div class="row">
                        <div class="item">
                            <span>订单类型：</span>
                            <el-select v-model="currentOrderType">
                                <el-option
                                        v-for="(item, index) in orderType"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="item">
                            <span>订单类型：</span>
                            <el-select v-model="currentOrderStatus">
                                <el-option
                                        v-for="(item, index) in orderStatus"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="table">

                        <el-table
                                :data="orderTableData"
                                style="width: 100%"
                                ref="multipleTable"
                        >
                            <el-table-column
                                    prop="order_no"
                                    label="订单编号"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="create_time"
                                    label="下单时间"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="service"
                                    label="商品"
                            >
                                <template slot-scope="scope">
                                    <div v-if="Array.isArray(scope.row.service)" class="item">
                                        <div class="item" v-for="item in scope.row.service">
                                            {{item.service_name}}
                                        </div>
                                    </div>
                                    <div v-else>{{scope.row.service}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="technician_name"
                                    label="技师"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="pay_type_name"
                                    label="订单来源"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="shop_name"
                                    label="下单门店"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="单价（元）"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="count"
                                    label="数量"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="total_price"
                                    label="订单金额（元）"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="order_status"
                                    label="状态"
                                    :formatter="orderTypeFn"
                            >
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button type="text" @click="viewOrder(scope)">查看订单</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                class="alignRight"
                                :page-size="20"
                                background
                                layout="total, prev, pager, next, jumper"
                                :total="all_count1"
                                @current-change="handleCurChange"
                        ></el-pagination>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="评价" name="评价">
                    <div class="table">
                        <el-table
                                :data="memberRateList"
                                style="width: 100%"
                                ref="multipleTable"
                        >
                            <el-table-column
                                    prop="service_name"
                                    label="商品"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="order_no"
                                    label="订单编号"
                            >
                            </el-table-column>
                            <el-table-column
                                    width="250"
                                    prop="create_time"
                                    label="评分"
                            >
                                <template slot-scope="scope">
                                    <div class="item" style="display: flex"><el-rate v-model="valueDemo" disabled></el-rate></div>
                                    <div class="item" style="display: flex">
                                        <span>门店环境：</span><el-rate v-model="scope.row.shop_rate" disabled></el-rate>
                                    </div>
                                    <div class="item" style="display: flex">
                                        <span>技师服务：</span><el-rate v-model="scope.row.service_rate" disabled></el-rate>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="technician_name"
                                    label="技师"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="arrive_time"
                                    label="下单时间"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="buyer_name"
                                    label="买家"
                            >
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                class="alignRight"
                                :page-size="20"
                                background
                                layout="total, prev, pager, next, jumper"
                                :total="all_count2"
                                @current-change="handleCurChange1"
                        ></el-pagination>

                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!--新增标签-->
        <common-tag
            v-if="isShowCommonTag"
        ></common-tag>
        <!--v-if="isShowCommonTag"-->
        <el-dialog
            title="编辑会员"
            :visible.sync="memberdialogVisible"
            width="50%">
            <div class="dialogMain">
                <el-form :model="userInfoEdit" :rules="rules" ref="userInfoEdit" label-width="160px" class="demo-userInfoEdit">
                    <el-form-item label="姓名：" prop="member_name" required>
                        <el-input class="width200" v-model="userInfoEdit.member_name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注名：" prop="remark_name">
                        <el-input class="width200" v-model="userInfoEdit.remark_name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" required prop="sex">
                        <el-select  class="width200" v-model="userInfoEdit.sex" placeholder="请选择活动区域">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="member_phone" required>
                        <el-input class="width200" v-model="userInfoEdit.member_phone"></el-input>
                    </el-form-item>
                    <el-form-item prop="birthday" label="生日：">
                        <el-date-picker class="width200" type="date" placeholder="选择日期" v-model="userInfoEdit.birthday"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="会员编号：" prop="member_no" required>
                        <el-input class="width200" v-model="userInfoEdit.member_no"></el-input>
                    </el-form-item>
                    <el-form-item label="会员来源：" prop="member_source" required>
                        <el-select class="width200" v-model="userInfoEdit.member_source" placeholder="请选择会员来源">
                            <el-option label="线下录入" value="线下录入"></el-option>
                            <el-option label="线上注册" value="线上注册"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会员等级：" prop="level_id" required>
                        <el-select v-model="userInfoEdit.level_id" placeholder="选择会员等级">
                            <el-option
                                    v-for="(item, index) in memberLevelList"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.no"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="健康管理师：" prop="hm_id">
                        <el-select v-model="userInfoEdit.hm_id" placeholder="选择健康管理师">
                            <el-option
                                    v-for="(item, index) in hmSelectList"
                                    :key="index"
                                    :label="item.hm_name"
                                    :value="item.hm_id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="归属门店：" prop="shop_name">
                        多多亲子岁月一店
                        <!--                    <el-input class="width200" v-model="userInfoEdit.shop_name"></el-input>-->
                    </el-form-item>
                    <el-form-item label="微信号：" prop="wx">
                        <el-input class="width200" v-model="userInfoEdit.wx"></el-input>
                    </el-form-item>
                    <el-form-item label="地址：" prop="desc">
                        <el-cascader
                            size="large"
                            :options="options"
                            v-model="region"
                            @change="regionHandleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址：">
                        <el-input type="textarea" v-model="userInfoEdit.detail_address"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="userInfoEdit.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelMemberdialogVisible">取消</el-button>
                <el-button type="primary" @click="submitForm('userInfo')">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import userInfo from './common/userInfoDialog'
import commonTag from './common/commonTag'
import * as api from '../../../api/index'
// 地址选择器
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
    name: 'memberList',
    data () {
        return {
            options: regionDataPlus,
            selectedOptions: [],
            rules: {
                member_name: [
                    { required: true, message: '请输入会员名称', trigger: 'blur' }
                ],
                member_phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                member_no: [
                    { required: true, message: '请输入会员编号', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                member_source: [
                    { required: true, message: '请选择会员来源', trigger: 'change' }
                ],
                level_id: [
                    { required: true, message: '选择会员等级', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            radio: 1,
            pointInfoDetails: {},
            valueDemo: 5,
            hmSelectList: [],
            memberLevelList: [],
            activeName: '交易记录',
            currentOrderType: '',
            page_no1: 1,
            page_no2: 1,
            all_count1: 0,
            all_count2: 0,
            currentOrderStatus: '',
            orderStatus: [
                {
                    label: '待付款',
                    value: '0'
                },
                {
                    label: '待发货',
                    value: '1'
                },
                {
                    label: '已发货',
                    value: '2'
                },
                {
                    label: '已完成',
                    value: '3'
                },
                {
                    label: '已退款',
                    value: '4'
                },
                {
                    label: '已取消',
                    value: '5'
                },
            ],
            orderType: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '服务',
                    value: 'service'
                },
                {
                    label: '折扣卡',
                    value: 'discount_card'
                },
                {
                    label: '次卡',
                    value: 'time_card'
                },
                {
                    label: '充值卡',
                    value: 'recharge_card'
                },
                {
                    label: '充值卡充值',
                    value: 'recharge'
                },
            ],
            columnCfg: [
                {label: '订单编号', prop: 'order_no'},
                {label: '下单时间', prop: 'create_time'},
                {label: '商品', prop: 'service'},
                {label: `技师`, prop: ''},
                {label: '订单来源', prop: 'pay_type_name'},
                {label: '下单门店', prop: 'shop_name'},
                {label: '单价（元）', prop: ''},
                {label: '数量', prop: 'count'},
                {label: '订单金额（元）', prop: 'total_price'},
                {label: '状态', prop: 'order_status'},
            ],
            carstate: '全部',
            isShowCommonTag: false,
            memberdialogVisible: false,
            userId: '',
            orderTableData: [],
            box4State: 2,
            userInfo: {},
            userInfoEdit: {},
            memberCardList: [],
            memberRateList: [],
            memberIntegral: {},
            memberGiveServiceList: [],
        }
    },
    components: {
        userInfo,
        commonTag
    },
    created() {
        this.userId = this.$route.query.id;
        this.getUserInfoBox();
        this.getMemberCard();
        this.getMemberGiveServiced();
        this.getMemberIntegralList();
        this.getMemberPointInfo();
        this.getMemberRate();
        this.getMemberOrder();
        this.getArchivesQueryAuth();
    },
    methods: {
        viewOrder (scope) {
            this.$router.push({ path: '/orderList', query: {order_no: scope.row.order_no}})
        },
        // 获取健康师列表
        async getHmSelectList () {
            const  { data } = await api.hmSelectList();
            this.hmSelectList = data;
        },
        // 分页方法
        handleCurChange(page) {
            this.page_no1 = page;
            this.getMemberOrder();
        },
        // 分页方法
        handleCurChange1(page) {
            this.page_no2 = page;
            this.getMemberOrder();
        },
        orderTypeFn (item) {
            if (item.order_status === '0') {
                return '待付款';
            } else if (item.order_status === '1') {
                return '待发货';
            } else if (item.order_status === '2') {
                return '已发货';
            } else if (item.order_status === '3') {
                return '已完成';
            } else if (item.order_status === '4') {
                return '已退款';
            } else if (item.order_status === '5') {
                return '已取消';
            }
        },
        //4.3.3.会员详情
        async getUserInfoBox () {
            const { data } = await api.memberDetail({ id: this.userId});
            this.userInfo = data;
            this.userInfo.member_name = data.name;
            this.userInfo.member_phone = data.phone;
        },
        //4.3.4.会员详情-卡项列表
        async getMemberCard () {
            const { data } = await api.memberCard({ member_id: this.userId});
            this.memberCardList = data;
        },
        //4.3.4.会员详情-卡项列表
        async getMemberPointInfo () {
            const { data } = await api.memberPointInfo({ member_id: this.userId});
            this.pointInfoDetails = data;
        },
        // 4.3.10.会员-评价记录
        async getMemberRate () {
            const { data } = await api.memberRate({ member_id: this.userId});
            this.memberRateList = data.data;
            this.all_count2 = data.all_count;
        },
        //4.3.9.会员-交易记录
        async getMemberOrder () {
            let params = {
                page_size: 10,
                page_no: this.page_no1,
                type: this.currentOrderType,
                order_status: this.currentOrderStatus,
            };
            const { data } = await api.memberOrder(params);
            this.orderTableData = data.data;
            this.all_count1 = data.all_count;
        },
        //4.3.6.会员详情-积分明细
        async getMemberIntegralList () {
            const { data } = await api.memberIntegralList({ member_id: this.userId});
            this.memberIntegralList = data;
        },
        //4.3.1.会员详情-赠送权益
        async getMemberGiveServiced () {
            const { data } = await api.memberGiveService({ member_id: this.userId});
            this.memberGiveServiceList = data;
        },
        showMemberdialogVisible() {
            this.userInfoEdit = JSON.parse(JSON.stringify(this.userInfo));
            this.memberdialogVisible = true;
        },
        async getBookingReadState () {
            const { data } = await api.bookingReadState();
        },
        // 新增会员
        submitForm (value) {
            this.$refs.userInfoEdit.validate(async (valid) => {
                if (valid) {
                    const { data } = await api.memberSave(this.userInfoEdit);
                    this.memberdialogVisible = false;
                }
            })
        },
        getMemberProfile () {
            this.$router.push({path: '/memberProfile', query: { memberId: this.userId }});
        },
        regionHandleChange (value, value1) {
            this.userInfoEdit.region = '';
            console.log(value);
            console.log(CodeToText[value[0]]);
            value.forEach(m => {
                this.userInfoEdit.region = this.userInfoEdit.region + CodeToText[m];
            })
        },
        // 取消新增会员
        cancelMemberdialogVisible (value) {
            this.memberdialogVisible = false;
        }
    }
};
</script>

<style scoped>
.messageDetails {}
.messageDetails .top{
    background: #F5EADF;
    padding: 20px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.messageDetails .top .user_info{
    display: flex;
    align-items: center;
}
.messageDetails .top .user_info .pic{
    width: 63px;
    height: 63px;
    margin-right: 20px;
    overflow: hidden;
    border-radius: 100%;
    background: #fff;
}
.messageDetails .top .user_info .name{
    color: #fff;
    font-size: 16px;
}
.messageDetails .top .user_info .level{
    background: #E9DFD5;
    border-radius: 30px;
    padding: 0 10px;
    line-height: 30px;
    color: #FFF;
    margin-top: 15px;
}
.messageDetails .top .user_info .edit{
    color: #409EFF;
    cursor: pointer;
    font-size: 12px;
}
.messageDetails .box1{
    background: #fff;
    padding: 0px 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.messageDetails .box1 .col{
    width: 33.3%;
    margin: 10px 0;
    float: left;
}
.messageDetails .box1 .col span{
    height: 20px;
    font-weight: 400;
    font-style: normal;
    color: #D9D9D9;
}
.messageDetails .box1 .col i{
    font-style: normal;
    color: #666666;
}
.messageDetails .box2{
    display: flex;
    background: #fff;
    margin-bottom: 20px;
}
.messageDetails .box2 .item{
    width: 50%;
    padding: 20px 50px;
}
.messageDetails .box2 .info-title{
    background: #fff;
    padding-left: 15px;
}
.messageDetails .box2 .info-title::before{
    left: 0;
}
.messageDetails .box2 .contentBox{
    display: flex;
}
.messageDetails .box2 .contentBox .col{
    flex: 1;
}
.messageDetails .box2 .contentBox .col i{
    font-style: normal;
    font-size: 18px;
    margin-top: 20px;
    display: block;
}
.messageDetails .box2 .contentBox .col span{
    display: block;
    text-align: left;
    font-size: 12px;
    color: #D9D9D9;
}
.messageDetails .box2 .contentBox .addBox{
    height: 60px;
    width: 100%;
    border: 1px dashed #D9D9D9;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 10px;
}
.messageDetails .box2 .contentBox .addBox.active{
    justify-content: flex-start;
    flex-wrap: wrap;
}
.messageDetails .box2 .contentBox .addBox .item{
    padding: 5px 10px;
    background: #F3F9FE;
    border: 1px solid #ddd;
    color: #333;
    border-radius: 10px;
    display: inline-block;
    width: auto;
    margin-right: 10px;
    margin-bottom: 10px;
}
.messageDetails .box2 .contentBox .addBox .addBtn{
    border: 1px dashed #ddd;
    padding: 5px;
    margin-bottom: 10px;
}
.messageDetails .box3 {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    height: 63px;
    padding: 0 15px;
}
.messageDetails .box3 .left{
    display: flex;
    align-items: center;
}
.messageDetails .box3 .left img{
    width: 28px;
    height: 28px;
}
.messageDetails .box4 {
    background: #fff;
    padding: 15px 30px;
    margin-bottom: 20px;
}
.messageDetails .box4 .info{
    display: flex;
    justify-content: space-between;
}
.messageDetails .box4 .info .list{
    display: flex;
}
.messageDetails .box4 .info .list .item{
    margin: 0 10px;
    cursor: pointer;
    text-align: center;
}
.messageDetails .box4 .info .list .item.active p{
    color: #409EFF;
}
.messageDetails .box4 .info .list .item p{
    line-height: 25px;
}
.messageDetails .box4 .contentBox{
    display: flex;
    margin-top: 20px;
}
.messageDetails .box4 .contentBox .item{
    margin-right: 20px;
    margin-bottom: 20px;
    width: 320px;
    height: 150px;
    background: #FFA198;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    color: #fff;
    position: relative;
    overflow: hidden;
}
.messageDetails .box4 .contentBox .item1{
    color: #333;
    background: #F7F8FA;
    height: 125px;
}
.messageDetails .box4 .contentBox .item1 .bg{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    top: 0;
    left: 0;
    z-index: 3;
    background: rgba(0,0,0, 0.7);
    font-size: 14px;
}
.messageDetails .box4 .contentBox .item div{
    position: relative;
    z-index: 2;
}
.messageDetails .box4 .contentBox .item .pic{
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.messageDetails .box4 .contentBox .item1 .info{
    margin-bottom: 15px;
}
.messageDetails .box4 .contentBox .item1 .used{
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
}
.messageDetails .box4 .contentBox .item1 .time{
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
}

.messageDetails .box4 .contentBox .item2{
    width: 100%;
    background: #F7F8FA;
    display: flex;
    color: #333;
    height: 100px;
}
.messageDetails .box4 .contentBox .item2>div{
    width: 33.3%;
    text-align: center;
}
.messageDetails .box4 .contentBox .item2>div p{
    height: 30px;
}
.messageDetails .box4 .contentBox .item2>div p span,
.messageDetails .box4 .contentBox .item2>div p{
    font-size: 24px;
}
.messageDetails .box4 .contentBox .item2>div p:first-child{
    color: #989898;
    font-size: 14px;
}
.messageDetails .box4 .contentBox .item2>div:first-child{
    border-right: 1px solid #ccc;
}
.messageDetails .box5 {
    background: #fff;
    padding: 15px;
}

.messageDetails .box5 .row{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
}
.messageDetails .box5 .row .item{
    margin-right: 20px;
}
</style>
