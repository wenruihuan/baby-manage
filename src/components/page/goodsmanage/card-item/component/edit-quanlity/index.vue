<template>
    <div class="edit-service">
        <div class="btn-container">
            <el-button type="text" @click="addService">{{ list.length <= 0 ? '添加权益' : '编辑权益' }}</el-button>
            <p class="tip">设置卡可用优惠权益</p>
        </div>
        <div class="out-table">
            <el-table
                :data="list"
            >
                <el-table-column prop="hasChoose" label="已选"></el-table-column>
                <el-table-column prop="rule" label="优惠规则"></el-table-column>
<!--                <el-table-column label="操作">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button type="text" @click="removeItem(scope.row, scope.$index)">删除</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
        </div>
        <el-dialog
            title="添加权益"
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            width="70%"
        >
            <div class="service-table-container">
                <div class="left-container">
                    <el-input
                        placeholder="请输入商品名称"
                        v-model="filterText">
                    </el-input>

                    <el-tree
                        class="filter-tree"
                        :data="treeData"
                        show-checkbox
                        default-expand-all
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        ref="tree"
                    >
                    </el-tree>
                </div>
                <div class="right-container">
                    <el-table
                        :data="ruleData"
                    >
                        <el-table-column prop="hasSelected" label="已选"></el-table-column>
                        <el-table-column prop="rule" label="优惠规则">
                            <template slot-scope="scope">
                                <el-input style="width: 150px" v-model="scope.row.rule">
                                    <template slot="append">折</template>
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="operate" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="handleRemoveRow(scope.row, scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { treeData, ruleData } from '@/components/page/goodsmanage/card-item/mock';
import { getServiceList } from '@/components/page/goodsmanage/card-item/api';

export default {
    props: {
        rightsList: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            list: [],
            dialogVisible: false,
            /* 树的筛选 */
            filterText: '',
            treeData: treeData,
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            ruleData: ruleData
        };
    },
    watch: {
        filterText (val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        /* 筛选树节点 */
        filterNode (value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        async getServiceList () {
            try {
                const data = await getServiceList({
                    keyword: '',
                    page_no: 1,
                    kind_id: '',
                    tag_id: ''
                });
                this.list = data.data;
            } catch (e) {
                console.log(`src/components/page/goodsmanage/card-item/component/edit-service/index.vue getList error: ${ e }`);
            }
        },
        /* 添加权益 */
        addService () {
            this.dialogVisible = true;
        },
        /* 模态框中删除权益 */
        removeItem (row, index) {
            this.list.splice(index, 1);
        },
        /* 删除权益的列表 */
        handleRemoveRow (row, index) {
            this.ruleData.splice(index, 1);
        },
        /* 保存 */
        handleSave () {
            this.dialogVisible = false;
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
}
.select-container {
    margin-bottom: 10px;
}
.service-table-container {
    display: flex;
    justify-content: center;
    align-items: start;
}
.service-table-container .left-container {
    width: 30%;
}
.service-table-container .right-container {
    flex: 1;
    margin-left: 10px;
}
.box-column {
    display: flex;
    justify-content: center;
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