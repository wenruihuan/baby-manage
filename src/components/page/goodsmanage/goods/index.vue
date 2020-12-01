<template>
    <div class="box-container">
        <div class="top-container">
            <div class="tool">
                <div class="btn-group">
                    <el-button type="primary" @click="addBox">添加商品</el-button>
                    <el-button @click="handleAddCategory">管理分类</el-button>
                    <el-button @click="handleAddService">管理标签</el-button>
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
                        prop="name"
                        label="商品">
                    <template slot-scope="scope">
                        <div class="box-column">
                            <img class="img-wrapper" :src="scope.row.img && scope.row.img.split(',')[0]" alt="">
                            <div>
                                <p class="category-text">{{ scope.row.name }}</p>
                                <p class="category-text">￥{{ scope.row.price }}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="kind_name"
                        label="分类">
                </el-table-column>
                <el-table-column
                        prop="tag_names"
                        label="标签">
                </el-table-column>
                <el-table-column
                    prop="sort"
                    label="线上排序"
                >
                    <template slot-scope="scope">
                        <el-popover
                            v-model="scope.row.isSortShow"
                            popper-class="GOODPOPOVER2"
                            placement="top-start"
                            width="260"
                            trigger="click"
                        >
                            <div>
                                <el-input v-model="scope.row.sort"></el-input>
                                <el-button style="margin-left: 5px;" @click="scope.row.isSortShow = false">取消</el-button>
                                <el-button style="margin-left: 5px;" type="primary" @click="handleCorrectSort(scope.row)">确认</el-button>
                            </div>
                            <div slot="reference">
                                <span>{{ scope.row.sort }}</span>
                                <i class="el-icon-edit"></i>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sell_count"
                    label="总销量">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                class="operate-btn"
                                size="mini"
                                type="text"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                class="operate-btn"
                                size="mini"
                                type="text"
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
                        <el-button style="margin-top: 5px;" @click="setShow(1)">展示</el-button>
                        <el-button style="margin-top: 5px;" @click="setShow(0)">不展示</el-button>
                    </div>
                    <el-button :disabled="selection.length <= 0" slot="reference" type="primary">批量操作</el-button>
                </el-popover>
                <el-pagination
                        :current-page="curPage"
                        :page-sizes="[10, 20, 100, 200]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData.length"
                        @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </div>
        <box-category v-if="boxCategoryVisible" ref="boxCategory" />
        <service-manage v-if="serviceManageVisible" ref="serviceManage" />
    </div>
</template>

<script>
import { ERR_OK, getBoxList, removeBox, setPublish, setShow, setSort } from './api';
import BoxCategory from './component/box-category';
import ServiceManage from './component/service-manage';
import EditView from './component/edit-view';
export default {
    components: {
        BoxCategory,
        EditView,
        ServiceManage
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
            pageSize: 10,
            selection: [],
            boxCategoryVisible: false,
            serviceManageVisible: false,
            isEditViewShow: false
        };
    },
    created () {
        this.getList();
        // this.getCategory();
    },
    methods: {
        /* 添加商品分类 */
        handleAddCategory () {
            this.boxCategoryVisible = true;
            this.$nextTick(() => {
                this.$refs.boxCategory.getCategoryList();
            });
        },
        /* 添加服务标签 */
        handleAddService () {
            this.serviceManageVisible = true;
            this.$nextTick(() => {
                this.$refs.serviceManage.getTagList();
            });
        },
        /* 添加包厢 */
        addBox () {
            this.$router.push('/goodsdetail?isEdit=1');
        },
        /* 搜索 */
        handleSearch () {
            this.getList();
        },
        /* 获取商品列表 */
        async getList () {
            try {
                const data = await getBoxList({
                    keyword: this.searchVal,
                    page_no: this.curPage,
                    page_size: this.pageSize
                });
                this.tableData = data.data && data.data.data ? data.data.data : [];
                this.tableData = this.tableData.map(item => ({
                    ...item,
                    isSortShow: false
                }));
            } catch (e) {
                console.log(`goods getList error: ${e}`);
            }
        },
        /* 当前页改变时触发 */
        handleCurrentChange (curPage) {
            this.curPage = curPage;
            this.getList();
        },
        /* 点击编辑 */
        handleEdit (index, row) {
            this.$router.push(`/goodsdetail?id=${ row.id }&isEdit=1`);
        },
        /* 点击详情 */
        handleView (index, row) {
            this.$router.push(`/goodsdetail?id=${ row.id }&isEdit=0`);
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
                console.log(`goods getList error: ${e}`);
            }
        },
        /* 修改排序 */
        async handleCorrectSort (row) {
            row.isSortShow = false;
            try {
                const data = await setSort({ id: row.id, sort: row.sort });
                if (data.code === ERR_OK) {
                    this.getList();
                }
            } catch (e) {
                console.log(`goods handleCorrectSort error: ${e}`);
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
        /* 展示或者不展示 */
        async setShow (isShow = 0) {
            try {
                const id = this.selection.map(item => item.id).join(',');
                const data = await setShow({ id, is_show: isShow });
                if (data.code === ERR_OK) {
                    this.$message({
                        type: 'success',
                        message: data.msg
                    });
                    this.getList();
                }
            } catch (e) {
                console.log(`goods index.vue setShow error: ${e}`);
            }
        }
    }
};
</script>

<style lang="css" scoped>
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
.box-container {
    height: 100%;
    overflow: auto;
    padding: 10px;
    background: white;
    box-sizing: border-box;
}
.top-container {
    height: 60px;
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
.box-column {
    display: flex;
    justify-content: center;
    align-items: center;
}
.box-column .img-wrapper {
    max-width: 100px;
    display: inline-block;
}
.el-icon-edit {
    display: inline-block;
    margin-left: 5px;
    cursor: pointer;
}
.el-icon-edit:hover {
    color: #2d8cf0;
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

<style lang="css">
.GOODPOPOVER2  /deep/ .el-input {
    width: 100px;
}
</style>
