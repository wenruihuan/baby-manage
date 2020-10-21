<template>
    <div class="cika-view">
        <div class="top-container">
            <el-button type="primary" @click="gotoEdit">编辑</el-button>
            <el-button @click="setDownPublish">下架</el-button>
        </div>
        <div class="content-container">
            <div class="top">
                <div class="left">
                    <el-card class="box-card-left">
                        <img class="card-img" :src="defaultPic" alt="">
                        <ul class="card-detail">
                            <li>
                                <span class="key">卡类型:</span>
                                <span class="val">次卡</span>
                            </li>
                            <li>
                                <span class="key">状态:</span>
                                <span class="val">上架中</span>
                            </li>
                            <li>
                                <span class="key">售价:</span>
                                <span class="val">￥1000.00</span>
                            </li>
                            <li>
                                <span class="key">网店展示:</span>
                                <span class="val">展示</span>
                            </li>
                            <li>
                                <span class="key">服务产品:</span>
                                <span class="val">尚未关联</span>
                            </li>
                            <li>
                                <span class="key">卡包名称:</span>
                                <span class="val">卡名称名称名称</span>
                            </li>
                        </ul>
                    </el-card>
                </div>
                <div class="right">
                    <el-tabs type="border-card">
                        <el-tab-pane label="卡项权益">
                            <el-table
                                :data="quanlityList"
                            >
                                <el-table-column prop="content" label="适用内容"></el-table-column>
                                <el-table-column prop="rule" label="优惠规则"></el-table-column>
                                <el-table-column prop="expire_time" label="有效期"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="赠送权益">
                            <el-table
                                :data="sendList"
                            >
                                <el-table-column prop="content" label="适用内容"></el-table-column>
                                <el-table-column prop="rule" label="优惠规则"></el-table-column>
                                <el-table-column prop="expire_time" label="有效期"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="bottom">
                <el-tabs type="border-card" @tab-click="handleTabClick">
                    <el-tab-pane label="已售(1)">
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
                        >
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="name" label="卡项名称"></el-table-column>
                            <el-table-column prop="status" label="状态"></el-table-column>
                            <el-table-column prop="expire_time" label="有效期"></el-table-column>
                            <el-table-column prop="quanlity" label="权益">
                                <template slot-scope="scope">
                                    <p>使用：1项</p>
                                    <p>赠送：10项</p>
                                    <p>剩余：100次</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="buyer" label="购买人">
                                <template slot-scope="scope">
                                    <p>姓名：lvzlsdf大发噶啥</p>
                                    <p>普通会员</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="buy_time" label="购买时间">
                                <template slot-scope="scope">
                                    <p>2020-08-20 14：24：32</p>
                                    <el-button type="text" @click="gotoorderDetail(scope.row)">查看订单详情</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="money" label="实付金"></el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button type="text" @click="hanldeCardView(scope.row, scope.$index)">查看卡详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination-cont">
                            <div class="tool-btn">
                                <el-button :disabled="hasSellList.length <= 0" @click="shixiao">使失效</el-button>
                                <el-button :disabled="hasSellList.length <= 0" @click="updateExpire">修改有效期</el-button>
                            </div>
                            <el-pagination
                                :current-page="curPage2"
                                :page-sizes="[10, 20, 100, 200]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="hasSellList.length"
                                @current-change="handleCurrentChange2"
                            >
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="历史卡项">
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
                            :data="historyList"
                        >
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="update_time" label="修改时间"></el-table-column>
                            <el-table-column prop="update_person" label="修改人"></el-table-column>
                            <el-table-column prop="name" label="卡项名称"></el-table-column>
                            <el-table-column prop="expire_time" label="有效期"></el-table-column>
                            <el-table-column prop="price" label="售价"></el-table-column>
                            <el-table-column prop="amount" label="销量"></el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button type="text" @click="hanldeCardView(scope.row, scope.$index)">历史卡项详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination-cont">
                            <div class="tool-btn">
                                <el-button :disabled="historyList.length <= 0" @click="shixiao">使失效</el-button>
                                <el-button :disabled="historyList.length <= 0" @click="updateExpire">修改有效期</el-button>
                            </div>
                            <el-pagination
                                :current-page="curPage2"
                                :page-sizes="[10, 20, 100, 200]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="historyList.length"
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
                    <span class="title">卡项名称</span>
                    <el-tag class="tag">有限次卡</el-tag>
                </div>
                <div class="content-cont">
                   <div class=" row">
                       <div class="item">
                           <span>卡编号：</span>
                           <span>123123</span>
                       </div>
                       <div class="item">
                           <span>卡售价：</span>
                           <span>￥1000.00</span>
                       </div>
                   </div>
                    <div class=" row">
                        <div class="item">
                            <span>有效期：</span>
                            <span>2021-03-21</span>
                        </div>
                        <div class="item">
                            <span>适用门店：</span>
                            <span>多多亲子岁月一店</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-container">
                <el-tabs type="border-card" @tab-click="handleTabClick">
                    <el-tab-pane label="卡项权益">
                        <el-table
                            :data="hasSellList"
                        >
                            <el-table-column prop="content" label="适用内容"></el-table-column>
                            <el-table-column prop="rule" label="优惠规则"></el-table-column>
                            <el-table-column prop="expire_time" label="有效期"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="赠送权益">
                        <el-table
                            :data="historyList"
                        >
                            <el-table-column prop="content" label="适用内容"></el-table-column>
                            <el-table-column prop="rule" label="优惠规则"></el-table-column>
                            <el-table-column prop="expire_time" label="有效期"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { quanlityList } from '@/components/page/goodsmanage/card-item/mock';
import { ERR_OK, getDefaultPic } from '@/components/page/goodsmanage/card-item/api';

export default {
    data () {
        return {
            dialogVisible: false,
            quanlityList: quanlityList,
            sendList: [],
            hasSellList: [{}],
            historyList: [],
            curPage1: 1,
            curPage2: 1,
            searchVal: '',
            selection: [],
            defaultPic: ''
        };
    },
    created() {
        this.getDefaultImg();
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
        /* 去编辑页 */
        gotoEdit () {
            this.$router.push(`/cika`);
        },
        /* 下架 */
        setDownPublish () {

        },
        /* 查看卡详情 */
        hanldeCardView (row, index) {
            this.dialogVisible = true;
        },
        /* 已售 */
        handleCurrentChange1 (value) {

        },
        /* 历史卡项 */
        handleCurrentChange2 (value) {

        },
        /* 搜索 */
        handleSearch () {

        },
        /* 使得卡失效 */
        shixiao () {},
        /* 更新时间 */
        updateExpire () {},
        handleSelectionChange (value) {
            this.selection = value;
        },
        /* tab切换时 */
        handleTabClick (tab) {
            this.selection = [];
        },
        /* 订单详情 */
        gotoorderDetail (row) {}
    }
}
</script>

<style lang="css" scoped>
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
    max-width: 100%;
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
}
.content-container .top {
    margin-bottom: 15px;
}
.content-container .top .right {
    flex: 1;
}
.content-container .card-detail {
    list-style: none;
    margin-left: -100px;
}
.content-container .card-detail li {
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