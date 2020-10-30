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
                    <el-select v-model="type" @change="getCardQuanlityList">
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
                    <el-table-column prop="price" label="价格">
                        <template slot-scope="scope">
                            ￥{{ scope.row.price }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
import moment from 'moment';
import { ERR_OK, getCardQuanlityList } from '@/components/page/goodsmanage/card-item/api';

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
            type: 'time_card',
            serviceList: [],
            curPage: 1,
            selection: [],
            cardKindGrp: [
                { value: 'time_card', label: '次卡' },
                { value: 'discount_card', label: '折扣卡' }
            ]
        };
    },
    created() {
        this.list = this.buyList;
    },
    methods: {
        /* 获取可添加的赠送卡项 */
        async getCardQuanlityList () {
            try {
                const data = await getCardQuanlityList({ keyword: '', type: this.type  });
                if (data.code === ERR_OK) {
                    this.serviceList = data.data.map(item => ({
                        ...item,
                        createTime: moment(item.create_time).format('yyyy-MM-DD HH:mm:ss')
                    }));
                }
            } catch (e) {
                console.log(`src/components/page/goodsmanage/card-item/component/send-card/index.vue getCardQuanlityList error: ${ e }`);
            }
        },
        addService () {
            this.dialogVisible = true;
            this.getCardQuanlityList();
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
                rel_id: item.card_id,
                right_name: item.name,
                rel_type: item.type
            }));
            this.list = this.list.concat(list);
            this.$emit('save', this.list);
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
    max-width: 60px;
    height: auto;
    margin-right: 5px;
}
.paination-cont {
    height: 30px;
    margin-top: 5px;
    float: right;
}
</style>
