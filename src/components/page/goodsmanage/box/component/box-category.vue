<template>
    <el-dialog
            title="管理包厢分类"
            :visible.sync="visible"
            width="35%"
    >
        <div v-if="isAdd" class="add-category">
            <el-input class="add-input" v-model="categoryName"></el-input>
            <el-button @click="isAdd = false">取消</el-button>
            <el-button @click="handleAdd" type="primary">确认</el-button>
        </div>
        <el-button class="add-btn" type="primary" v-else @click="isAdd = true">新建分类</el-button>
        <el-table
            :data="boxCategoryData"
        >
            <el-table-column
                    prop="name"
                    label="分类名称"
                    width="180">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.isEdit" v-model="scope.row.name"></el-input>
                    <span v-else>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            @click="handleFirOpera(scope.$index, scope.row)">{{ scope.row.isEdit ? '取消' : '改名' }}</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            @click="handleSecOpera(scope.$index, scope.row)">{{ scope.row.isEdit ? '保存' : '删除' }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination
                :current-page="curPage"
                layout="total, prev, pager, next, jumper"
                :total="boxCategoryData.length">
            </el-pagination>
        </div>
    </el-dialog>
</template>

<script>
import { ERR_OK, geBoxtCategoryList, removeCategory, addCategory } from '../api';

export default {
    data () {
        return {
            boxCategoryData: [],
            visible: false,
            isAdd: false,
            categoryName: '',
            curPage: 1
        };
    },
    methods: {
        /* 获取分类列表 */
        async getCategoryList () {
            this.categoryName = '';
            this.visible = true;
            try {
                const data = await geBoxtCategoryList();
                this.boxCategoryData = data.data;
            } catch (e) {
                console.log(`geBoxtCategoryList error: ${e}`);
            }
        },
        /* 新增 */
        async handleAdd () {
            try {
                const data = await addCategory({ id: '', name: this.categoryName });
                if (data.code === ERR_OK) {
                    this.categoryName = '';
                    this.isAdd = false;
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.getCategoryList();
                }
            } catch (e) {
                console.log(`handleAdd error: ${e}`);
            }
        },
        /* 更改名字或者取消操作 */
        handleFirOpera (index, row) {
            this.$set(row, 'isEdit', !row.isEdit);
            if (!row.isEdit) {
                this.getCategoryList();
            }
        },
        /* 保存编辑或者删除 */
        async handleSecOpera (index, row) {
            if (!row.isEdit) {
                try {
                    const data = await removeCategory({ id: row.id });
                    if (data.code === ERR_OK) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getCategoryList();
                    }
                } catch (e) {
                    console.log(`handleSecOpera-delete error: ${e}`);
                }
            } else {
                try {
                    const data = await addCategory({ id: row.id, name: row.name });
                    if (data.code === ERR_OK) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.isAdd = false;
                        this.getCategoryList();
                    }
                } catch (e) {
                    console.log(`handleSecOpera-edit error: ${e}`);
                }
            }
        },
    }
};
</script>

<style lang='css' scoped>
.add-category {
    margin-bottom: 15px;
}
.add-input {
    width: 150px;
    margin-right: 5px;
}
.add-btn {
    margin-bottom: 15px;
}
.pagination-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
}

</style>
