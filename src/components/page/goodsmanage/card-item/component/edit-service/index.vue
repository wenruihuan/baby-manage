<template>
    <div class="edit-service">
        <div class="btn-container">
            <el-button type="text" @click="addService">{{ list.length <= 0 ? '添加服务' : '编辑服务' }}</el-button>
            <p class="tip">设置此卡支持的服务项目和可用次数</p>
        </div>
        <div class="out-table">
            <el-table
                :data="list"
            >
                <el-table-column prop="right_name" label="服务名称"></el-table-column>
                <el-table-column prop="time" label="次数">
                    <template slot-scope="scope">
                        <span v-if="unlimit && type !== 'send'">无限</span>
                        <el-input style="width: 100px;" v-else v-model="scope.row.time"></el-input>
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
            title="添加服务"
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            width="70%"
        >
            <div class="service-table-container">
                <div class="select-container">
                    <el-select v-model="serviceKind" @change="changeList">
                        <el-option
                            v-for="item in serviceOptions"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
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
                    <el-table-column prop="name" label="服务名称">
                        <template slot-scope="scope">
                            <div class="box-column">
                                <img class="image" :src="scope.row.img && scope.row.img.split(',') && scope.row.img.split(',')[0]" alt="">
                                <p style="margin-left: 10px;">{{ scope.row.name }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column prop="kind_name" label="分类"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间"></el-table-column>
                </el-table>
                <div class="paination-cont">
                    <el-pagination
                        :current-page.sync="curPage"
                        :page-size="100"
                        layout="total, prev, pager, next, jumper"
                        :total="serviceList.length"
                        @current-change="handleCurPageChange"
                    >
                    </el-pagination>
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
import { getServiceList, getServiceKind } from '@/components/page/goodsmanage/card-item/api';

export default {
    props: {
        rightsList: {
            type: Array,
            default: () => []
        },
        unlimit: {
            props: Boolean
        },
        type: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            list: [],
            dialogVisible: false,
            serviceKind: '',
            serviceOptions: [],
            serviceList: [],
            curPage: 1,
            selection: [],
            kind_id: ''
        };
    },
    created() {
        this.list = this.rightsList;
    },
    methods: {
        async getServiceList () {
            try {
                const data = await getServiceList({
                    keyword: '',
                    page_no: 1,
                    kind_id: this.kind_id,
                    tag_id: ''
                });
                this.serviceList = data.data.data;
            } catch (e) {
                console.log(`src/components/page/goodsmanage/card-item/component/edit-service/index.vue getList error: ${ e }`);
            }
        },
        changeList (value) {
            this.kind_id = value;
            this.getServiceList();
        },
        /* 获取服务分类 */
        async getServiceKind () {
            try {
                const data = await getServiceKind({
                    page_no: 1,
                    page_size: 10000000
                });
                this.serviceOptions = data.data.data;
            } catch (e) {
                console.log(`cika-edit.vue getServiceKind error: ${ e }`);
            }
        },
        addService () {
            this.dialogVisible = true;
            this.getServiceList();
            this.getServiceKind();
        },
        removeItem (row, index) {
            this.list.splice(index, 1);
            this.$emit('save', this.list);
        },
        handleSelectionChange (selected) {
            this.selection = selected;
        },
        handleCurPageChange (value) {
            this.curPage = value;
        },
        handleSave () {
            this.dialogVisible = false;
            const selectedIds = this.rightsList.map(item => item.rel_id);
            const newArr = this.selection.filter(item => !selectedIds.includes(item.id))
                            .map(item => ({
                                rel_id: item.id,
                                right_name: item.name,
                                time: 1
                            }));
            this.list = [...this.rightsList, ...newArr];
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
}
.select-container {
    margin-bottom: 10px;
}
.service-table-container {

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
