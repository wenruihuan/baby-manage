<template>
    <el-dialog
            title="管理包厢分类"
            :visible.sync="visible"
            width="30%"
    >
        <el-button type="primary">新建分类</el-button>
        <el-table
            :data="boxCategoryData"
        >
            <el-table-column
                    prop="name"
                    label="分类"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)">改名</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
import { getCategoryList } from '../api';

export default {
    data () {
        return {
            boxCategoryData: [],
            visible: false
        };
    },
    methods: {
        async getCategoryList () {
            this.visible = true;
            try {
                const { data } = await getCategoryList();
                this.boxCategoryData = data.data;
            } catch (e) {
                console.log(`getCategoryList error: ${e}`);
            }
        },
        /* 更改名字 */
        handleEdit (index, row) {},
        /* 删除 */
        handleDelete (index, row) {},
    }
};
</script>

<style lang='css' scoped>
</style>
