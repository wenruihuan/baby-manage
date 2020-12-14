<template>
    <div>
        <BreadcrumbList :breadcrumbList="breadcrumbList" />
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
                        <el-button class="search-btn" @click="handleSearch">搜索</el-button>
                    </div>
                </div>
                <div class="select-container">
                    <span class="key">选择分类：</span>
                    <el-select class="category-select" v-model="selected" placeholder="选择包厢分类" @change="selectCategory">
                        <el-option
                                v-for="item in categoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="table-container">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        @selection-change="selection => this.selection = selection"
                >
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="kind_name"
                            label="包厢">
                        <template slot-scope="scope">
                            <div class="box-column">
                                <img class="img-wrapper" :src="scope.row.img && scope.row.img.split(',')[0]" alt="">
                                <span class="category-text">{{ scope.row.name }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="kind_name"
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
                                    class="operate-btn"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="text"
                                    class="operate-btn"
                                    @click="handleView(scope.$index, scope.row)">详情</el-button>
                            <el-popover
                                    popper-class="POPOVER1"
                                    placement="top-start"
                                    width="80"
                                    trigger="click"
                            >
                                <el-button @click="handlePublish(scope.row.id, scope.row.is_publish == '1' ? '0' : '1')">{{ scope.row.is_publish == '1' ? '下架' : '上架' }}</el-button>
                                <el-button
                                        style="margin-left: 8px;"
                                        slot="reference"
                                        size="mini"
                                        type="text"
                                >
                                    <i class="el-icon-more"></i>
                                </el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page-container">
                    <el-popover
                            popper-class="POPOVER1"
                            placement="top-start"
                            width="80"
                            trigger="click"
                    >
                        <div>
                            <el-button style="margin-top: 5px;" @click="handlePublish('', '1')">上架</el-button>
                            <el-button style="margin-top: 5px;" @click="handlePublish('', '0')">下架</el-button>
                            <el-button style="margin-top: 5px;" @click="removeBox">删除</el-button>
                        </div>
                        <el-button :disabled="selection.length <= 0" slot="reference" type="primary">批量操作</el-button>
                    </el-popover>
                    <el-pagination
                            :current-page="curPage"
                            :page-sizes="[10, 20, 100, 200]"
                            :page-size="100"
                            background
                            layout="total, prev, pager, next, jumper"
                            :total="tableData.length"
                            @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </div>
            </div>
            <box-category v-if="boxCategoryVisible" ref="boxCategory" @save="saveKind" />
        </div>
    </div>
</template>

<script>
import { ERR_OK, getBoxList, geBoxtCategoryList, removeBox, setPublish } from './api';
import BoxCategory from './component/box-category';
import EditView from './component/edit-view';
import BreadcrumbList from '@/components/common/address.vue';

export default {
    components: {
        BoxCategory,
        EditView,
        BreadcrumbList
    },
    data () {
        return {
            searchVal: '',
            selected: 'all',
            options: [
                { value: '1', label: '全部分类' },
                { value: '2', label: '按摩' },
                { value: '3', label: '乒乓球' },
                { value: '4', label: '游泳' }
            ],
            categoryList: [],
            tableData: [],
            curPage: 1,
            selection: [],
            boxCategoryVisible: false,
            isEditViewShow: false,
            breadcrumbList: [
                { name: '包厢列表' }
            ]
        };
    },
    created () {
        this.getList();
        this.getCategory();
    },
    methods: {
        /* 选择包厢分类 */
        selectCategory (value) {
            if (value === 'all') {
                this.selected = 'all';
                this.getList();
            } else {
                this.selected = value;
                this.getList();
            }
        },
        /* 获取包厢分类下拉框 */
        async getCategory () {
            try {
                const data = await geBoxtCategoryList();
                if (data.code === ERR_OK) {
                    this.categoryList = data.data;
                    this.categoryList.unshift({ id: 'all', name: '全部分类' });
                }
            } catch (e) {
                console.log(`edit-view.vue getCategory error: ${e}`);
            }
        },
        /* 添加包厢分类 */
        handleAddCategory () {
            this.boxCategoryVisible = true;
            this.$nextTick(() => {
                this.$refs.boxCategory.getCategoryList();
            });
        },
        /* 添加包厢 */
        addBox () {
            this.$router.push('/boxdetail?isEdit=1');
        },
        /* 搜索 */
        handleSearch () {
            this.getList();
        },
        /* 获取包厢列表 */
        async getList () {
            try {
                const data = await getBoxList({
                    keyword: this.searchVal,
                    page_no: this.curPage,
                    kind_id: this.selected === 'all' ? '' : this.selected
                });
                if (data.data) {
                    this.tableData = data.data.data || [];
                }
            } catch (e) {
                console.log(`box getList error: ${e}`);
            }
        },
        /* 当前页改变时触发 */
        handleCurrentChange (curPage) {
            this.curPage = curPage;
            this.getList();
        },
        /* 点击编辑 */
        handleEdit (index, row) {
            this.$router.push(`/boxdetail?id=${ row.id }&isEdit=1&isPublish=${row.is_publish}`);
        },
        /* 点击详情 */
        handleView (index, row) {
            this.$router.push(`/boxdetail?id=${ row.id }&isEdit=0`);
        },
        /* 删除包厢 */
        async removeBox () {
            const id = this.selection.map(item => item.id).join(',');
            try {
                const data = await removeBox({ id });
                if (data.code === ERR_OK) {
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
                    });
                    this.getList();
                }
            } catch (e) {
                console.log(`getList error: ${e}`);
            }
        },
        /* 上下架 */
        async handlePublish (rowId = '', isPublish) {
            let id = '';
            if (rowId) {
                id = rowId;
            } else {
                id = this.selection.map(item => item.id).join(',');
            }
            try {
                const data = await setPublish({ id, is_publish: isPublish });
                if (data.code === ERR_OK) {
                    this.$message({
                        type: 'success',
                        message: data.msg
                    });
                    this.getList();
                }
            } catch (e) {
                console.log(`handlePublish error: ${e}`);
            }
        },

        saveKind () {
            this.getCategory();
        }
    }
};
</script>

<style lang="css" scoped>
.box-container {
    height: 100%;
    overflow: auto;
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

.top-container .select-container .key {
    margin-right: 10px;
    font-size: 12px;
}

.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.search-container .search-btn {
    margin-left: 5px;
}
.page-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
.box-column .img-wrapper {
    max-width: 100px;
    display: inline-block;
}
.operate-btn {
    position: relative;
}
.operate-btn:after {
    content: " ";
    width: 1px;
    height: 98%;
    position: absolute;
    top: 0;
    right: -6px;
    background: #dddddd;
}
</style>

<style lang="css">
.POPOVER1 {
    min-width: 60px;
    text-align: center;
}
.POPOVER1 .el-button+.el-button {
    margin-left: 0;
}
</style>
