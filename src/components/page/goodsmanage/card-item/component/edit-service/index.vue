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
                        {{ unlimit ? '无限' : scope.row.time }}
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
                    <el-select v-model="serviceKind">
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
                                <p>{{ scope.row.name }}</p>
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
import { serviceList } from '@/components/page/goodsmanage/card-item/mock';
import { getServiceList } from '@/components/page/goodsmanage/card-item/api';

export default {
    props: {
        rightsList: {
            type: Array,
            default: () => []
        },
        unlimit: {
            props: Boolean
        }
    },
    data () {
        return {
            list: [],
            dialogVisible: false,
            serviceKind: '',
            serviceOptions: [
                { id: 'all', name: '所有分类' },
                { id: 1, name: '123' },
                { id: 2, name: '1254253' },
                { id: 3, name: '124563' },
            ],
            serviceList: serviceList,
            curPage: 1,
            selection: []
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
                    kind_id: '',
                    tag_id: ''
                });
                this.list = data.data;
            } catch (e) {
                console.log(`src/components/page/goodsmanage/card-item/component/edit-service/index.vue getList error: ${ e }`);
            }
        },
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
