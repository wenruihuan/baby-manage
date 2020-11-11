<template>
    <div class="card-item">
        <div class="top-container">
            <el-popover
                    popper-class="POPPER3"
                    placement="top-start"
                    trigger="click"
            >
                <div class="btn-group">
                    <el-button @click="addCard">次卡</el-button>
                    <el-button @click="addCard">折扣卡</el-button>
                    <el-button @click="addCard">充值卡</el-button>
                </div>
                <el-button type="primary" slot="reference">添加卡项</el-button>
            </el-popover>
            <div class="search-container">
                <el-input
                        placeholder="请输入名称"
                        prefix-icon="el-icon-search"
                        v-model="searchVal">
                </el-input>
                <el-button class="search-btn" @click="handleSearch">搜索</el-button>
            </div>
        </div>
        <el-tabs type="border-card" @tab-click="handleTabClick">
            <el-tab-pane label="全部卡类">
                <card-table
                    :table-data="tableData"
                    :total="total"
                    @handleEdit="handleEdit"
                    @handleView="handleView"
                    @handleCorrectSort="handleCorrectSort"
                    @remove="removeCard"
                    @handlePublish="handlePublish"
                    @setShow="setShow"
                />
            </el-tab-pane>
            <el-tab-pane label="次卡">
                <card-table
                    :table-data="tableData"
                    :total="total"
                    @handleEdit="handleEdit"
                    @handleView="handleView"
                    @handleCorrectSort="handleCorrectSort"
                    @remove="removeCard"
                    @handlePublish="handlePublish"
                    @setShow="setShow"
                />
            </el-tab-pane>
            <el-tab-pane label="折扣卡">
                <card-table
                    :table-data="tableData"
                    :total="total"
                    @handleEdit="handleEdit"
                    @handleView="handleView"
                    @handleCorrectSort="handleCorrectSort"
                    @remove="removeCard"
                    @handlePublish="handlePublish"
                    @setShow="setShow"
                />
            </el-tab-pane>
            <el-tab-pane label="充值卡">
                <card-table
                    :table-data="tableData"
                    :total="total"
                    @handleEdit="handleEdit"
                    @handleView="handleView"
                    @handleCorrectSort="handleCorrectSort"
                    @remove="removeCard"
                    @handlePublish="handlePublish"
                    @setShow="setShow"
                />
            </el-tab-pane>
        </el-tabs>
        <cika-edit v-if="isCikaShow" ref="cika" />
        <discount-card v-if="isDiscountShow" ref="discount" />
        <insert-card v-if="isInsertShow" ref="insert" />
    </div>
</template>

<script>
import CikaEdit from './component/cika-edit';
import DiscountCard from './component/discount-card';
import InsertCard from './component/insert-card';
import CardTable from './component/card-table';
import { ERR_OK, getBoxList, getCategoryList, removeBox, removeCard, setPublish, setShow, setSort } from './api';
import { tableData1 } from '@/components/page/goodsmanage/card-item/mock';

export default {
    components: {
        CardTable,
        CikaEdit,
        DiscountCard,
        InsertCard
    },
    data () {
        return {
            tableData: [],
            searchVal: '',
            isCikaShow: false,
            isDiscountShow: false,
            isInsertShow: false,
            total: 0,
            activeTab: ''
        };
    },
    created () {
        this.getList();
    },
    methods: {
        /* 添加卡项 */
        addCard () {

        },
        handleSearch () {
            this.getList();
        },
        /* 获取卡项列表 */
        async getList (type = '') {
            try {
                const data = await getBoxList({
                    keyword: this.searchVal,
                    page_no: this.curPage,
                    type: this.activeTab
                });
                this.tableData = data.data.data;
                this.total = data.data.all_count;
            } catch (e) {
                console.log(`card-item getList error: ${e}`);
            }
        },
        handleEdit ({ row, index }) {
            const type = row.type;
            switch (type) {
                case 'time_card': { this.$router.push(`/cika-card?id=${row.card_id}`); break; }
                case 'discount_card': { this.$router.push(`/discount-card?id=${row.card_id}`); break; }
                case 'recharge_card': { this.$router.push(`/insert-card?id=${row.card_id}`); break; }
            }
        },
        /* 去到详情页 */
        handleView ({ row, index }) {
            const type = row.type;
            switch (type) {
                case 'time_card': { this.$router.push(`/cika-card-view?id=${row.card_id}`); break; }
                case 'discount_card': { this.$router.push(`/discount-card-view?id=${row.card_id}`); break; }
                case 'recharge_card': { this.$router.push(`/insert-card-view?id=${row.card_id}`); break; }
            }
        },
        /* 排序 */
        async handleCorrectSort (row) {
            try {
                const data = await setSort({
                    id: row.id,
                    sort: row.sort,
                });
                if (data.code === ERR_OK) {
                    this.getList();
                }
            } catch (e) {
                console.log(`card-item handleCorrectSort error: ${e}`);
            }
        },
        /* 删除卡包 */
        async removeCard (selection) {
            const id = selection.map(item => item.card_id).join(',');
            try {
                const data = await removeCard({ id });
                if (data.code === ERR_OK) {
                    this.getList();
                }
            } catch (e) {
                console.log(`card-item removeCard error: ${e}`);
            }
        },
        /* 上下架 */
        async handlePublish ({ id, isPublish }) {
            try {
                const data = await setPublish({ id, is_publish: isPublish });
                if (data.code === ERR_OK) {
                    this.getList();
                }
            } catch (e) {
                console.log(`card-item handlePublish error: ${e}`);
            }
        },
        /* 是否展示 */
        async setShow ({ id, isShow }) {
            try {
                const data = await setShow({ id, is_show: isShow });
                if (data.code === ERR_OK) {
                    this.getList();
                }
            } catch (e) {
                console.log(`card-item setShow error: ${e}`);
            }
        },
        /* 点击tab的时候触发 */
        handleTabClick (tab) {
            switch (tab.label) {
                case '全部卡类': { this.activeTab = ''; this.getList(); break; }
                case '次卡': { this.activeTab = 'time_card'; this.getList(); break; }
                case '折扣卡': { this.activeTab = 'discount_card'; this.getList(); break; }
                case '充值卡': { this.activeTab = 'recharge_card'; this.getList(); break; }
            }
        }
    }
};
</script>

<style lang="css" scoped>
.card-item {
    height: 100%;
    overflow: auto;
}
.card-item .top-container {
    width: 100%;
    height: 52px;
    margin: 5px auto;
    padding: 10px;
    box-sizing: border-box;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-item .top-container .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.top-container .search-btn {
    margin-left: 5px;
}
.card-item /deep/ .el-tabs {
    height: calc(100% - 67px);
    overflow: auto;
}
/deep/ .el-tabs__item {
    color: #333333!important;
}
/deep/ .el-tabs__item.is-active {
    color: #409EFF!important;
}
</style>

<style lang="css">
.POPOVER3 {
    min-width: 60px;
    text-align: center;
}
.POPOVER3 .el-button+.el-button {
    margin-left: 0;
}
</style>
