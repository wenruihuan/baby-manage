<template>
    <div class="box-container">
        <div class="top-container">
            <div class="tool">
                <div class="btn-group">
                    <el-button type="primary" @click="addBox">添加包厢</el-button>
                    <el-button @click="handleAddCategory">管理分类</el-button>
                </div>
                <div class="search-container">
                    <el-input
                            placeholder="请输入名称"
                            prefix-icon="el-icon-search"
                            v-model="searchVal">
                    </el-input>
                </div>
            </div>
            <div class="select-container">
                <span>选择分类:</span>
                <el-select v-model="selected">

                </el-select>
            </div>
        </div>
        <div class="table-container">
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="kind_name"
                        label="包厢">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="分类">
                </el-table-column>
                <el-table-column
                        prop="people_count"
                        label="人数">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="text"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="text"
                                @click="handleView(scope.$index, scope.row)">详情</el-button>
                        <el-popover
                                placement="top-start"
                                width="80"
                                trigger="click"
                        >
                            <div>
                                <el-button>上架</el-button>
                                <el-button>下架</el-button>
                            </div>
                            <el-button
                                    slot="reference"
                                    size="mini"
                                    type="text"
                                    @click="handleView(scope.$index, scope.row)">···</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-container">
                <el-popover
                        placement="top-start"
                        width="80"
                        trigger="click"
                >
                    <div>
                        <el-button>上架</el-button>
                        <el-button>下架</el-button>
                        <el-button>删除</el-button>
                    </div>
                    <el-button slot="reference" type="primary">批量操作</el-button>
                </el-popover>
                <el-pagination
                        :current-page="curPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </div>
        <box-category v-if="boxCategoryVisible" ref="boxCategory" />
    </div>
</template>

<script>
import { getBoxList } from './api';
import BoxCategory from './component/box-category';
import EditView from './component/edit-view';
export default {
    components: {
        BoxCategory,
        EditView
    },
    data () {
        return {
            searchVal: '',
            selected: '',
            options: [
                { value: '1', label: '全部分类' },
                { value: '2', label: '按摩' },
                { value: '3', label: '乒乓球' },
                { value: '4', label: '游泳' }
            ],
            tableData: [],
            curPage: 1,
            boxCategoryVisible: false,
            isEditViewShow: false
        };
    },
    created () {
        this.getList();
    },
    methods: {
        /* 添加包厢分类 */
        handleAddCategory () {
            this.boxCategoryVisible = true;
            this.$nextTick(() => {
                this.$refs.boxCategory.getCategoryList();
            });
        },
        /* 添加包厢 */
        addBox () {
            this.$router.push('/Box/detail');
        },
        async getList () {
            try {
                const { data } = await getBoxList({
                    keyword: this.searchVal,
                    page_no: this.curPage,
                    kind_id: this.selected
                });
                this.tableData = data.data;
            } catch (e) {
                console.log(`getList error: ${e}`);
            }
        },
        /* 点击编辑 */
        handleEdit (index, row) {},
        /* 点击详情 */
        handleView (index, row) {},
    }
};
</script>

<style lang="css" scoped>
.box-container {
    padding: 10px;
    background: white;
    box-sizing: border-box;
}
.top-container {
    height: 120px;
    position: relative;
}

.top-container .tool {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.top-container .select-container {
    position: absolute;
    bottom: 15px;
    left: 5px;
}
.table-container {

}
.page-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
</style>
