<template>
    <div class="card-item">
        <div class="top-container">
            <el-popover
                    placement="top-start"
                    title="标题"
                    width="200"
                    trigger="click"
            >
                <div class="btn-group">
                    <el-button @click="addCard">次卡</el-button>
                    <el-button @click="addCard">折扣卡</el-button>
                    <el-button @click="addCard">充值卡</el-button>
                </div>
                <el-button slot="reference">添加卡项</el-button>
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
        <el-tabs type="border-card">
            <el-tab-pane label="全部卡类">
                <card-table
                    :table-data="tableData1"
                    @handleEdit="handleEdit"
                />
            </el-tab-pane>
            <el-tab-pane label="次卡">
                <card-table
                        :table-data="tableData1"
                        @handleEdit="handleEdit"
                />
            </el-tab-pane>
            <el-tab-pane label="折扣卡">
                <card-table
                        :table-data="tableData1"
                        @handleEdit="handleEdit"
                />
            </el-tab-pane>
            <el-tab-pane label="充值卡">
                <card-table
                        :table-data="tableData1"
                        @handleEdit="handleEdit"
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
import { ERR_OK, getBoxList, getCategoryList, removeBox, setPublish } from './api';

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
            tableData1: [
                { id: 1 }
            ],
            searchVal: '',
            isCikaShow: false,
            isDiscountShow: false,
            isInsertShow: false
        };
    },
    methods: {
        /* 添加卡项 */
        addCard () {

        },
        handleSearch () {
            this.getList();
        },
        /* 获取卡项列表 */
        async getList () {
            try {
                const data = await getBoxList({
                    keyword: this.searchVal,
                    page_no: this.curPage,
                });
                this.tableData = data.data;
            } catch (e) {
                console.log(`card-item getList error: ${e}`);
            }
        },
        handleEdit ({ index, row }) {
            this.$router.push(`/cika?id=${row.id}`);
        }
    }
};
</script>

<style lang="css" scoped>
</style>
