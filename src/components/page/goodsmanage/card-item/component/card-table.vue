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
                            <p class="category-tip">￥{{ scope.row.tip }}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="expire_day"
                    label="有效期">
            </el-table-column>
            <el-table-column
                    prop="is_online"
                    label="线上售卡">
                <template slot-scope="scope">
                    {{ scope.row.is_online === '1' ? '支持' : '不支持' }}
                </template>
            </el-table-column>
            <el-table-column
                prop="sort"
                label="线上排序">
                <template slot-scope="scope">
                    <el-popover
                        v-model="delVisibles[scope.$index]"
                        popper-class="GOODPOPOVER3"
                        placement="top-start"
                        width="260"
                        trigger="click"
                    >
                        <div>
                            <el-input v-model="curSort"></el-input>
                            <el-button style="margin-left: 5px;" @click="canclePopover(scope.row, scope.$index)">取消</el-button>
                            <el-button style="margin-left: 5px;" type="primary" @click="handleCorrectSort(scope.row, scope.$index)">确认</el-button>
                        </div>
                        <div slot="reference">
                            <span>{{ scope.row.sort }}</span>
                            <i class="el-icon-edit" @click="curSort = scope.row.sort"></i>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    prop="sell_amount"
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
                <el-button class="batch-ope-btn" :disabled="selection.length <= 0" slot="reference" type="primary">批量操作</el-button>
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
            curPage: 1,
            delVisibles: [],
            curSort: ''
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
            if (id) {
                this.$emit('handlePublish', { id, isPublish });
            } else {
                const selectedIds = this.selection.map(item => item.id).join(',');
                this.$emit('handlePublish', { id: selectedIds, isPublish });
            }
        },
        handleCorrectSort (row, index) {
            this.$set(this.delVisibles, index, false);
            this.$emit('handleCorrectSort', { ...row, sort: this.curSort });
        },
        removeBox () {
            this.$emit('remove', this.selection);
        },
        setShow (isShow) {
            const id = this.selection.map(item => item.id).join(',');
            this.$emit('setShow', { id, isShow });
        },
        canclePopover (row, index) {
            this.$set(this.delVisibles, index, false);
        }
    }
};
</script>

<style lang="css" scoped>
.card-table-container {

}
.box-column {
    display: flex;
    justify-content: center;
    align-items: center;
}
.img-wrapper {
    max-width: 100px;
    height: auto;
}
.category-tip {
    color: #bbbbbb;
}
.el-icon-edit {
    display: inline-block;
    margin-left: 5px;
    cursor: pointer;
}
.el-icon-edit:hover {
    color: #2d8cf0;
}
.batch-ope-btn {
    margin: 8px 0;
}
.page-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
</style>

<style lang="css">
.GOODPOPOVER3  /deep/ .el-input {
    width: 100px;
}
.POPOVER1 {
    min-width: 60px;
    text-align: center;
}
.POPOVER1 .el-button+.el-button {
    margin-left: 0;
}
.GOODPOPOVER2  /deep/ .el-input {
    width: 100px;
}
</style>
