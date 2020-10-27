<template>
    <div class="edit-service">
        <div class="btn-container">
            <el-button type="text" @click="addService">赠送卡项</el-button>
            <p class="tip">设置购卡赠送的卡项</p>
        </div>
        <div class="out-table">
            <el-table
                :data="list"
            >
                <el-table-column prop="right_name" label="次卡名称"></el-table-column>
                <el-table-column prop="rel_type" label="卡项类别">
                    <template slot-scope="scope">
                        {{
                            cardKindGrp.find(item => item.value === scope.row.rel_type) ?
                                cardKindGrp.find(item => item.value === scope.row.rel_type).label : ''
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="removeItem(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="添加卡项"
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            width="70%"
        >
            <div class="service-table-container">
                <div class="select-container">
                    <el-select v-model="serviceKind">
                        <el-option
                            v-for="item in cardKindGrp"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        >
                        </el-option>
                    </el-select>
                </div>
                <el-table
                    :data="serviceList"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="次卡名称">
                        <template slot-scope="scope">
                            <div class="box-column">
                                <img class="image" :src="scope.row.img && scope.row.img.split(',') && scope.row.img.split(',')[0]" alt="">
                                <p>{{ scope.row.name }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间"></el-table-column>
                </el-table>
<!--                <div class="paination-cont">-->
<!--                    <el-pagination-->
<!--                        :current-page.sync="curPage"-->
<!--                        :page-size="100"-->
<!--                        layout="total, prev, pager, next, jumper"-->
<!--                        :total="serviceList.length"-->
<!--                        @current-change="handleCurPageChange"-->
<!--                    >-->
<!--                    </el-pagination>-->
<!--                </div>-->
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { serviceList } from '@/components/page/goodsmanage/card-item/mock';

export default {
    props: {
        buyList: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            list: [],
            dialogVisible: false,
            serviceKind: '',
            serviceList: serviceList,
            curPage: 1,
            selection: [],
            cardKindGrp: [
                { value: 'card_time', label: '次卡' },
                { value: 'card_discount', label: '折扣卡' }
            ]
        };
    },
    created() {
        this.list = this.buyList;
    },
    methods: {
        addService () {
            this.dialogVisible = true;
        },
        removeItem (row, index) {
            this.list.splice(index, 1);
        },
        handleSelectionChange (selected) {
            this.selection = selected;
        },
        handleCurPageChange (value) {
            this.curPage = value;
        },
        handleSave () {
            this.dialogVisible = false;
            const list = this.selection.map(item => ({
                ...item,
                num: 1
            }));
            this.list = this.list.concat(list);
        }
    }
}
</script>

<style lang="css" scoped>
.btn-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.btn-container .tip {
    margin-left: 5px;
    color: #dddddd;
    font-size: 12px;
}
.select-container {
    margin-bottom: 10px;
}
.service-table-container {

}
.box-column {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.service-table-container .image {
    max-width: 100px;
    height: auto;
}
.paination-cont {
    height: 30px;
    margin-top: 5px;
    float: right;
}
</style>