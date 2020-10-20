<template>
    <div>
        <div class="operation">
            <div class="handle-box">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <span>选择门店 </span>
                        <el-select v-model="query.address" placeholder="选择门店" class="handle-select mr10">
                            <el-option key="1" label="广东省" value="广东省"></el-option>
                            <el-option key="2" label="湖南省" value="湖南省"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="table">
            <div class="date-box"></div>
            <el-table :data="tableData" border style="width: 100%; margin-top: 20px;">
                <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">
                        <div>
                            <img src="" alt="" width="50px" height="50px">
                            <span></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        v-for="item in columnCfg" :key="item.prop"
                        :label="item.label"
                        :prop="item.prop"
                        :width="item.width"
                        align="center"
                >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="downloadCode">设置排班</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="page-ctner"
                    :page-size="20"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :page-sizes="[20]"
                    @current-change="handleCurChange"
            ></el-pagination>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
        </el-dialog>
        <div class="AddEmployees" v-if="isAddEmployees">
            <el-dialog
                title="添加职位"
                :visible.sync="isAddEmployees"
                width="50%"
                :before-close="handleClose">
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import * as api from '../../../../../api/index'
    export default {
        name: '',
        components: {
        },
        data () {
            return {
                form: {
                    page_size: 20,
                    page_no: 1
                },
                columnCfg: [
                    {label: '姓名', prop: 'price'},
                    {label: '手机号', prop: 'type'},
                    {label: '门店', width: 220},
                    {label: '周一', prop: '1testDataLevelID.price'},
                    {label: '周二', prop: '2testDataLevelID.price'},
                    {label: '周三', prop: '3testDataLevelID.price'},
                    {label: '周四', prop: '4testDataLevelID.price'},
                    {label: '周五', prop: '4testDataLevelID.price'},
                    {label: '周六', prop: '4testDataLevelID.price'},
                    {label: '周日', prop: '4testDataLevelID.price'},
                ],
                tableData: [],
                total: 0,
                page: {
                    total: 30
                },
                query: {},
                dialogVisible: false,
                // 是否显示新增
                isAddEmployees: false,
            }
        },
        created () {
            this.getFormData();
        },
        methods: {
            async setPositionDelete (scope) {
                api.positionDelete({ id: scope.row.id})
            },
            async getFormData () {
                const { data } = await api.positionList();
                this.tableData = data
                this.total = data.all_count
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClick (val) {
                console.log(val);
                this.isAddEmployees = true;
            },
            handleClose () {
                this.isAddEmployees = false;
            }
        }
    };
</script>

<style scoped>
    .operation {
        background: #f7f8fa;
        padding: 20px;
        margin-bottom: 20px;
    }
    .operation .el-row{
        margin-top: 20px;
    }
    .operation .el-row:first-child{
        margin-top: 0;
    }
</style>
