<template>
    <div class="card-table-container">
        <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                @selection-change="handleSelectionChange"
        >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="卡项">
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
                    label="有效期">
            </el-table-column>
            <el-table-column
                    prop="tag_names"
                    label="线上售卡">
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
                            size="mini"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            @click="handleView(scope.$index, scope.row)">详情</el-button>
                    <el-popover
                            popper-class="POPOVER1"
                            placement="top-start"
                            width="80"
                            trigger="click"
                    >
                        <el-button @click="handlePublish(scope.row.id, scope.row.is_publish === '1' ? '0' : '1')">{{ scope.row.is_publish === '1' ? '下架' : '上架' }}</el-button>
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
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            selection: [],
            curPage: 1
        };
    },
    methods: {
        handleSelectionChange (selection) {
            this.selection = selection;
        },
        handleCurrentChange (value) {
            this.curPage = value;
            this.$emit('handleCurrentChange', value);
        },
        handleEdit (index, row) {
            this.$emit('handleEdit', { index, row });
        },
        handleView (row) {
            this.$emit('handleView', row);
        },
        handlePublish (id, isPublish) {
            this.$emit('handleView', { id, isPublish });
        },
        handleCorrectSort (row) {
            this.$emit('handleCorrectSort', row);
        },
        removeBox () {
            this.$emit('remove', this.selection);
        },
        setShow (isShow) {
            this.$emit('setShow', { selection: this.selection, isShow });
        }
    }
};
</script>

<style lang="css" scoped>
.card-table-container {

}
</style>
