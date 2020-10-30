<template>
    <div class="edit-service">
        <div class="btn-container">
            <el-button type="text" @click="addService">{{ rightsList.length <= 0 ? '添加权益' : '编辑权益' }}</el-button>
            <p class="tip">设置卡可用优惠权益</p>
        </div>
        <div class="out-table">
            <el-table
                :data="rightsList"
            >
                <el-table-column prop="right_name" :label="`已选(${ rightsList.length })`"></el-table-column>
                <el-table-column prop="discount" label="优惠规则">
                    <template slot-scope="scope">
                        {{ scope.row.discount }}折
                    </template>
                </el-table-column>
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
                        node-key="right_id"
                        :default-checked-keys="rightsList.map(item => item.right_id)"
                        show-checkbox
                        default-expand-all
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        ref="tree"
                        @check="checkTree"
                    >
                    </el-tree>
                </div>
                <div class="right-container">
                    <el-table
                        :data="ruleData"
                    >
                        <el-table-column prop="right_name" :label="`已选(${ ruleData.length })`"></el-table-column>
                        <el-table-column prop="discount" label="优惠规则">
                            <template slot-scope="scope">
                                <el-input style="width: 150px" v-model="scope.row.discount">
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
import { getRechargeRight, getServiceList } from '@/components/page/goodsmanage/card-item/api';
import { ERR_OK } from '@/components/page/goodsmanage/box/api';

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
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'right_name',
                id: 'right_id'
            },
            ruleData: []
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
            this.getRechargeRight();
        },
        /* 获取权益列表 */
        async getRechargeRight () {
            try {
                const data = await getRechargeRight();
                if (data.code === ERR_OK) {
                    this.treeData = data.data;
                }
            } catch (e) {
                console.log(`goodsmanage/card-item/component/edit-quanlity/index.vue getRechargeRight error: ${ e }`);
            }
        },
        checkTree (data, { checkedNodes, checkedKeys }) {
            this.ruleData = checkedNodes.filter(item => !Array.isArray(item.children));
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
            this.$emit('save', this.ruleData);
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
