<template>
    <div class="cika-view">
        <div class="top-container" v-if="!isHistory">
            <el-button type="primary" @click="gotoEdit">编辑</el-button>
            <el-button @click="setPublish">{{ isPublish ? '上架' : '下架' }}</el-button>
        </div>
        <div style="padding: 10px;">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>卡项列表</el-breadcrumb-item>
                <el-breadcrumb-item>卡项详情</el-breadcrumb-item>
                <el-breadcrumb-item v-if="isHistory">历史卡项详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content-container">
            <div class="top">
                <div class="left">
                    <el-card class="box-card-left" shadow="never">
                        <img class="card-img" :src="defaultPic" alt="">
                        <ul class="card-detail">
                            <li>
                                <span class="key">卡类型:</span>
                                <span class="val">次卡</span>
                            </li>
                            <li v-if="!isHistory">
                                <span class="key">状态:</span>
                                <span class="val">{{ isPublish ? '上架' : '下架' }}</span>
                            </li>
                            <li>
                                <span class="key">售价:</span>
                                <span class="val">￥{{ cardDetail.price }}</span>
                            </li>
                            <li>
                                <span class="key">网店展示:</span>
                                <span class="val">{{ cardDetail.is_show === 1 ? '展示' : '不展示' }}</span>
                            </li>
                            <li>
                                <span class="key">服务产品:</span>
                                <span class="val">尚未关联</span>
                            </li>
                            <li>
                                <span class="key">卡包名称:</span>
                                <span class="val">{{ cardDetail.name }}</span>
                            </li>
                        </ul>
                    </el-card>
                </div>
                <div class="right">
                    <el-tabs type="border-card">
                        <el-tab-pane label="卡项权益">
                            <el-table
                                :data="cardDetail.right || []"
                            >
                                <el-table-column prop="right_name" label="适用内容"></el-table-column>
                                <el-table-column prop="time" label="优惠规则">
                                    <template slot-scope="scope">
                                        {{ scope.row.time }}次
                                    </template>
                                </el-table-column>
                                <el-table-column header-align="right" align="right" prop="validity" label="有效期">
                                    <template slot-scope="scope">
                                        {{ scope.row.validity }}天
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="赠送权益">
                            <el-table
                                :data="cardDetail.gifts || []"
                            >
                                <el-table-column prop="right_name" label="适用内容"></el-table-column>
                                <el-table-column prop="time" label="优惠规则">
                                    <template slot-scope="scope">
                                        {{ scope.row.time }}次
                                    </template>
                                </el-table-column>
                                <el-table-column header-align="right" align="right" prop="validity" label="有效期">
                                    <template slot-scope="scope">
                                        {{ scope.row.validity }}天
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="bottom">
                <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane :label="`已售(${ hasSellTotal })`" name="hasSold">
                        <div class="search-container">
                            <el-input
                                class="search-input"
                                placeholder="请输入客户手机号"
                                prefix-icon="el-icon-search"
                                v-model="searchVal">
                            </el-input>
                            <el-button class="search-btn" @click="handleSearch">搜索</el-button>
                        </div>
                        <el-table
                            :data="hasSellList"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="name" label="卡项名称"></el-table-column>
                            <el-table-column prop="invalidName" label="状态">
                                <template slot-scope="scope">
                                    {{ scope.row.invalidName }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="validity" label="有效期">
                                <template slot-scope="scope">
                                    {{ scope.row.validity }}天
                                </template>
                            </el-table-column>
                            <el-table-column prop="quanlity" label="权益">
                                <template slot-scope="scope">
                                    <p>使用：{{ scope.row.rights_count }}项</p>
                                    <p>赠送：{{ scope.row.gifts_count }}项</p>
                                    <p>剩余：{{ scope.row.available_time }}次</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="quanlity" label="购买人">
                                <template slot-scope="scope">
                                    <p>姓名：{{ scope.row.member && scope.row.member.member_name }}</p>
                                    <p>{{ scope.row.member && scope.row.member.level_name }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="create_time" label="购买时间">
                                <template slot-scope="scope">
                                    {{ scope.row.create_time }}
                                    <el-button type="text" @click="gotoorderDetail(scope.row)">查看订单详情</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="order" label="实付金">
                                <template slot-scope="scope">
                                    ￥{{ scope.row.order && scope.row.order.total_price }}
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button type="text" @click="hanldeCardView(scope.row, scope.$index)">查看卡详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination-cont">
                            <div class="tool-btn">
                                <el-button :disabled="selection.length <= 0" @click="shixiao">使失效</el-button>
                                <el-button :disabled="selection.length <= 0" @click="updateExpire">修改有效期</el-button>
                            </div>
                            <el-pagination
                                :current-page="curPage2"
                                :page-sizes="[10, 20, 100, 200]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="hasSellTotal"
                                @current-change="handleCurrentChange1"
                            >
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="历史卡项" v-if="!isHistory" name="history">
                        <el-table
                            :data="historyList"
                        >
                            <el-table-column prop="create_time" label="修改时间"></el-table-column>
                            <el-table-column prop="editer_name" label="修改人"></el-table-column>
                            <el-table-column prop="name" label="卡项名称"></el-table-column>
                            <el-table-column prop="validity" label="有效期">
                                <template slot-scope="scope">
                                    {{ scope.row.validity }}天
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="售价"></el-table-column>
                            <el-table-column prop="sell_count" label="销量"></el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button type="text" @click="hanldeCardView(scope.row, scope.$index)">历史卡项详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination-cont">
                            <div class="tool-btn">
                            </div>
                            <el-pagination
                                :current-page="curPage2"
                                :page-sizes="[10, 20, 100, 200]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="historyListTotal"
                                @current-change="handleCurrentChange2"
                            >
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog
            custom-class="SPECIAL-DIALOG1"
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            width="40%"
        >
            <div class="img-container">
                <div>
                    <span class="title">{{ cardItem.name }}</span>
                    <el-tag class="tag">{{ cardItem.unlimit === 0 ? '有限次卡' : '无限次卡' }}</el-tag>
                </div>
                <div class="content-cont">
                   <div class=" row">
                       <div class="item">
                           <span>卡编号：</span>
                           <span>{{ cardItem.card_no }}</span>
                       </div>
                       <div class="item">
                           <span>卡售价：</span>
                           <span>￥{{ cardItem.price }}</span>
                       </div>
                   </div>
                    <div class=" row">
                        <div class="item">
                            <span>有效期：</span>
                            <span>{{ cardItem.validity }}天</span>
                        </div>
                        <div class="item">
                            <span>适用门店：</span>
                            <span>{{ cardItem.shop_name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-container">
                <div class="el-breadcrumb-container">
                </div>
                <el-tabs type="border-card" @tab-click="handleTabClick">
                    <el-tab-pane label="卡项权益">
                        <el-table
                            :data="cardItem.right || []"
                        >
                            <el-table-column prop="right_name" label="适用内容"></el-table-column>
                            <el-table-column prop="time" label="优惠规则">
                                <template slot-scope="scope">
                                    {{ scope.row.time }}次
                                </template>
                            </el-table-column>
                            <el-table-column prop="validity" label="有效期">
                                <template slot-scope="scope">
                                    {{ scope.row.validity }}天
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="赠送权益">
                        <el-table
                            :data="cardItem.gifts || []"
                        >
                            <el-table-column prop="right_name" label="适用内容"></el-table-column>
                            <el-table-column prop="time" label="优惠规则">
                                <template slot-scope="scope">
                                    {{ scope.row.time }}次
                                </template>
                            </el-table-column>
                            <el-table-column prop="validity" label="有效期">
                                <template slot-scope="scope">
                                    {{ scope.row.validity }}天
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
        <el-dialog
            title="修改有效期"
            :visible.sync="isExpireShow"
            width="40%"
        >
            <el-form :model="expireForm">
                <el-form-item label="有效期至:" prop="validity">
                    <el-radio-group v-model="isInifinate">
                        <el-radio :label="-1">无限次</el-radio>
                        <el-radio :label="0">
                            <el-input
                                    v-model="expireForm.validity"
                                    :disabled="isInifinate === -1"
                                    placeholder="请填写有效期">
                                <template slot="append">
                                    天
                                </template>
                            </el-input>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="isExpireShow = false">取 消</el-button>
                <el-button type="primary" @click="saveExpire">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="使失效"
            :visible.sync="isValidShow"
            width="40%"
        >
            <div>
                <p>确认使选中的卡失效？</p>
                <p style="color: #dddddd;">*仅可对状态对“使用中”的卡有效</p>
            </div>
            <span slot="footer">
                <el-button @click="isValidShow = false">取 消</el-button>
                <el-button type="primary" @click="saveValid">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    ERR_OK,
    getDefaultPic,
    getTimeDetial,
    getTimeSoldList,
    getTimeSoldDetail,
    getTimeHisList,
    getTimeHisDetail, setExpires, setInvalid,
    setPublish
} from '@/components/page/goodsmanage/card-item/api';
import { CARD__KIND_GRP, CARD_STATUS_MAP, gettime } from '@/components/page/goodsmanage/utils';
import moment from 'moment';

export default {
    data () {
        return {
            cardDetail: {},
            dialogVisible: false,
            hasSellList: [],
            historyList: [],
            curPage1: 1,
            curPage2: 1,
            searchVal: '',
            selection: [],
            defaultPic: '',
            isPublish: false,
            hasSellTotal: 0,
            historyListTotal: 0,
            activeTab: '',
            cardItem: {},
            isExpireShow: false,
            expireForm: {},
            isValidShow: false,
            validForm: {},
            isInifinate: -1,
            isHistory: false,
            activeName: 'hasSold'
        };
    },
    created() {
        const id = this.$route.query.id;
        this.isHistory = this.$route.query.isHis == '1';
        if (this.isHistory) {
            this.getHistoryDetail(id);
        } else {
            this.getTimeDetail(id);
        }
        this.getDefaultImg();
        this.getSoldList();
    },
    computed: {
        cardId () {
            return this.$route.query.id || '';
        }
    },
    watch: {
        cardId (newVal, oldVal) {
            this.isHistory = this.$route.query.isHis == '1';
            if (this.isHistory) {
                this.getHistoryDetail(newVal);
            } else {
                this.getTimeDetail(newVal);
            }
            this.getDefaultImg();
            this.getSoldList();
        }
    },
    methods: {
        /* 获取默认图片 */
        async getDefaultImg () {
            try {
                const data = await getDefaultPic();
                if (data.code === ERR_OK) {
                    this.defaultPic = data.data.time;
                }
            } catch (e) {
                console.log(`src/components/page/goodsmanage/card-item/component/cika-view.vue error: ${e}`);
            }
        },
        /* 详情 */
        async getTimeDetail (id = '') {
            if (id) {
                try {
                    const data = await getTimeDetial({ id });
                    if (data.code === ERR_OK) {
                        this.cardDetail = data.data;
                        this.isPublish = data.data.is_publish == 1;
                    }
                } catch (e) {
                    console.log(`/page/goodsmanage/card-item/component/cika-edit.vue getTimeDetail error: ${e}`);
                }
            } else {
                this.rightsList = [];
                this.buyList = [];
            }
        },
        /* 历史详情 */
        async getHistoryDetail (id = '') {
            if (id) {
                try {
                    const data = await getTimeHisDetail({ id });
                    if (data.code === ERR_OK) {
                        this.cardDetail = data.data;
                        this.isPublish = data.data.is_publish == 1;
                        if (this.isHistory) {
                            this.activeName = 'hasSold';
                        }
                    }
                } catch (e) {
                    console.log(`/page/goodsmanage/card-item/component/cika-edit.vue getHistoryDetail error: ${e}`);
                }
            } else {
                this.rightsList = [];
                this.buyList = [];
            }
        },
        /* 去编辑页 */
        gotoEdit () {
            const id = this.$route.query.id;
            this.$router.push(`/cika-card?id=${ id }`);
        },
        /* 下架 */
        async setPublish () {
            const id = this.$route.query.id;
            try {
                const data = await setPublish({ id, is_publish: !this.isPublish });
                if (data.code === ERR_OK) {
                    this.isPublish = !this.isPublish;
                    this.$message({
                        message: data.msg,
                        type: 'success'
                    });
                }
            } catch (e) {
                console.log(`error: ${ e }`);
            }
        },
        /* 查看卡详情 */
        hanldeCardView (row, index) {
            if (this.activeTab === '历史卡项') {
                this.gotoHistory(row.card_time_id);
            } else {
                this.dialogVisible = true;
                this.getSoldDetail(row.member_card_id);
            }
        },
        /* 搜索 */
        handleSearch () {

        },
        /* 使得卡失效 */
        shixiao () {
            this.isValidShow = true;
        },
        /* 更新时间 */
        updateExpire () {
            this.isExpireShow = true;
        },
        /* 保存有效期 */
        async saveExpire () {
            this.isExpireShow = false;
            try {
                const card_id = this.selection.map(item => item.member_card_id || item.card_time_id).join(',');
                const validity = this.isInifinate === -1 ? -1 : this.expireForm.validity;
                const data = await setExpires({ card_id, validity });
                if (data.code === ERR_OK) {
                    this.$message({
                        type: 'success',
                        message: data.msg
                    });
                }
            } catch (e) {
                console.log(`src/components/page/goodsmanage/card-item/component/cika-view.vue saveExpire error: ${ e }`);
            }
        },
        /* 使失效 */
        async saveValid () {
            this.isValidShow = false;
            const card_id = this.selection.map(item => item.member_card_id || item.card_time_id).join(',');
            try {
                const data = await setInvalid({ card_id });
                if (data.code === ERR_OK) {
                    this.$message({
                        type: 'success',
                        message: data.msg
                    });
                }
            } catch (e) {
                console.log(`src/components/page/goodsmanage/card-item/component/cika-view.vue saveValid error: ${ e }`);
            }
        },
        handleSelectionChange (value) {
            this.selection = value;
        },
        /* tab切换时 */
        handleTabClick (tab) {
            this.activeName = tab.name;
            this.activeTab = tab.label;
            this.selection = [];
            if (tab.label !== '历史卡项') {
                this.getSoldList();
            } else {
                this.getTimeHistoryList();
            }
        },
        /* 订单详情 */
        gotoorderDetail (row) {
            this.$router.push(`/OrderDetail/${ row.member_card_id }`);
        },
        /* 获取已售列表 */
        async getSoldList () {
            try {
                const card_id = this.$route.query.id;
                const data = await getTimeSoldList({ card_id, page_no: this.curPage1, keyword: this.searchVal });
                if (data.code === ERR_OK) {
                    this.hasSellList = data.data.data.map(item => {
                        return {
                            ...item,
                            rights_count: item.rights.rights_count,
                            gifts_count: item.rights.gifts_count,
                            available_time: item.rights.available_time,
                            create_time: moment(gettime(item.order.create_time)).format('yyyy-MM-DD HH:mm:ss'),
                            invalidName: CARD_STATUS_MAP[item.is_invalid]
                        };
                    });
                    this.hasSellTotal = data.data.all_count;
                    if (this.isHistory) {
                        this.activeName = 'hasSold';
                    }
                }
            } catch (e) {
                console.log(`/card-item/component/time-card-view.vue getSoldList error: ${ e }`);
            }
        },
        /* 获取历史列表 */
        async getTimeHistoryList () {
            try {
                const card_id = this.$route.query.id;
                const data = await getTimeHisList({ card_id, page_no: this.curPage2, keyword: this.searchVal });
                if (data.code === ERR_OK) {
                    this.historyList = data.data.data.map(item => ({
                        ...item,
                        create_time: moment(gettime(item.create_time)).format('yyyy-MM-DD HH:mm:ss')
                    }));
                    this.historyListTotal = Number(data.data.all_count);
                }
            } catch (e) {
                console.log(`/card-item/component/time-card-view.vue getTimeHistoryList error: ${ e }`);
            }
        },
        /* 已售分页 */
        handleCurrentChange1 (value) {
            this.curPage1= value;
            this.getSoldList();
        },
        /* 历史卡项分页 */
        handleCurrentChange2 (value) {
            this.curPage2 = value;
            this.getSoldList(value);
        },
        /* 获取已售详情 */
        async getSoldDetail (member_card_id = '') {
            if (member_card_id) {
                try {
                    const data = await getTimeSoldDetail({ member_card_id });
                    if (data.code === ERR_OK) {
                        // data.data.expires = moment(gettime(data.data.expires)).format('yyyy-MM-DD');
                        this.cardItem = data.data;
                    }
                } catch (e) {
                    console.log(`src/components/page/goodsmanage/card-item/component/cika-view.vue getSoldDetail error: ${e}`);
                }
            }
        },
        /* 获取历史详情 */
        async gotoHistory (card_time_id = '') {
            this.isHistory = true;
            if (card_time_id) {
                this.activeTab = '';
                this.$router.push('/cika-card-view?isHis=1&id=' + card_time_id);
            }
        }
    }
}
</script>

<style lang="css" scoped>
.el-breadcrumb-container {
    margin: 10px 0;
}
/deep/ .el-breadcrumb__inner {
    color: #BBBBBB!important;
}
/deep/ .el-tabs {
    box-shadow: none;
    border: 0;
}
.cika-view {
    background: white;
}
.cika-view .top-container {
    width: 100%;
    margin: 5px auto;
    padding: 10px;
    box-sizing: border-box;
}
.content-container {
    background: white;
    box-sizing: border-box;
    padding: 10px;
}
.content-container .card-img {
    width: 100%;
    height: auto;
    border-radius: 5px;
}
.content-container .top {
    display: flex;
}
.content-container .top .left {
    width: 35%;
    margin-right: 15px;
}
.box-card-left {
    text-align: center;
    background: #eeeeee;
    border: 0;
}
.content-container .top {
    margin-bottom: 15px;
}
.content-container .top .right {
    flex: 1;
}
.content-container .card-detail {
    width: 100%;
    list-style: none;
    margin-left: -28px;
}
.content-container .card-detail li {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    line-height: 30px;
}
.content-container .card-detail li .key {
    width: 100px;
    display: inline-block;
    text-align: right;
    color: #aaaaaa;
    margin-right: 10px;
}
.search-container {
    float: right;
    margin-bottom: 10px;
}
.search-container .search-input {
    width: 200px;
}
.search-container .search-btn {
    margin-left: 5px;
}
.pagination-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
}
.img-container {
    padding: 30px 10px 10px 10px;
    box-sizing: border-box;
    color: white;
    background: linear-gradient(#FFA88F, #FF9D9B);
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
}
.img-container .title {
    margin-bottom: 10px;
    font-size: 20px;
}
.img-container .content-cont .row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 40px;
}
.img-container .content-cont .row .item {
    margin-left: 20px;
}
.tab-container {
    margin-top: 15px;
    padding: 0 5px;
}
.img-container .tag {
    display: inline-block;
    margin-left: 10px;
    margin-top: -2px;
    position: relative;
    top: -3px;
}
</style>

<style lang="css">
.SPECIAL-DIALOG1 {
    border-radius: 18px;
}
.SPECIAL-DIALOG1 /deep/ .el-dialog__header {
    padding: 0;
}
.SPECIAL-DIALOG1 /deep/ .el-dialog__body {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
}
</style>
