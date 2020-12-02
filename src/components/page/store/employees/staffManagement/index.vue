<template>
    <div>
        <div class="operation">
            <div class="handle-box">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-button
                            type="primary"
                            icon="el-icon-delete"
                            class="handle-del mr10"
                            @click="handleClick('add')"
                        >
                            添加员工
                        </el-button>
                    </el-col>
                    <el-col :span="10">
                        &nbsp;
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="请输入系统账号、姓名" v-model="keyword"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
                    </el-col>
                    <el-col :span="2"><el-button type="primary" icon="el-icon-search" @click="getFormData">搜索</el-button>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="6">
                        <span>选择门店:多多亲子岁月一店</span>
                    </el-col>
                    <el-col :span="6">
                        <span>选择职位 </span>
                        <el-select
                            @change="selectPosition"
                            v-model="position_id"
                            placeholder="选择职位"
                            class="handle-select mr10"
                        >
                            <el-option
                                :key="item.id"
                                v-for="item in positionSelectList"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="name"
                    label="姓名"
                >
                    <template slot-scope="scope">
                        <div class="item">
                            <img :src="scope.row.head_img" width="80" height="80">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="acount"
                    label="系统账号"
                >
                </el-table-column>
                <el-table-column
                    prop="shop_name"
                    label="门店"
                >
                </el-table-column>
                <el-table-column
                    prop="position_name"
                    label="职位"
                >
                </el-table-column>
                <el-table-column
                    prop="role_names"
                    label="关联角色"
                >
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    width="150"
                    :formatter="dateFormate"
                    label="添加时间"
                >
                </el-table-column>
                <el-table-column
                    prop="tel"
                    label="联系方式"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick('edit', scope)" type="text" size="small">详情</el-button>
                        <i style="padding: 0 10px; color: #ddd; font-style: normal !important;">|</i>
                        <el-dropdown class="dropdown">
                            <el-button type="text" size="small">更多</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><span @click="handleClick('edit', scope)">编辑</span></el-dropdown-item>
                                <el-dropdown-item @click="bindWechat(scope)" v-if="scope.row.role_names.indexOf('健康管理师') === -1"><span>绑定微信</span></el-dropdown-item>
                                <el-dropdown-item v-else><span>关联服务</span></el-dropdown-item>
                                <el-dropdown-item>设置排班</el-dropdown-item>
                                <el-dropdown-item><span @click="handleRelevance(scope)">禁用账号</span></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-box">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <div class="AddEmployees" v-if="isAddEmployees">
            <el-dialog
                :title="employeesTitle"
                :visible.sync="isAddEmployees"
                :id="employeesId"
                width="50%"
                :before-close="handleClose">
                <AddEmployees ref="AddEmployees"></AddEmployees>
            </el-dialog>
        </div>

        <el-dialog
            class="authQr-dialog"
            title="绑定微信"
            :visible.sync="authQrDialog"
            width="400px"
            height="400"
            :before-close="handleClose"
        >
            <div class="box">
                <img :src="authQrData.QR_url">
                <p>扫码绑定微信</p>
                <p>此功能用于健康管理师查看会员健康档案</p>
            </div>
        </el-dialog>
        <el-dialog
            title="禁用账号"
            :visible.sync="isStaffSetDisable"
            width="500px"
            :before-close="handleClose">
            <div>员工账号被禁用后，将无法登录系统并进行操作，是否确定禁用该账号。</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isStaffSetDisable = false">取 消</el-button>
                <el-button type="primary" @click="setStaffSetDisable">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as api from '../../../../../api/index'
import AddEmployees from './AddEmployees'
import dayjs from 'dayjs'
export default {
    name: '',
    components: {
        AddEmployees
    },
    data () {
        return {
            authQrData: {}, // 扫码返回数据
            total: 0,
            page_no: 1,
            query: {},
            currentId: '',
            positionSelectList: [],
            keyword: '',
            position_id: '',
            employeesTitle: '',
            authQrDialog: false,
            dialogVisible: false,
            isStaffSetDisable: false,
            // 是否显示新增
            isAddEmployees: false,
            employeesId: '',
            tableData: [],
        }
    },
    created () {
        this.getFormData();
        this.getPositionSelectList();
    },
    methods: {
        bindWechat (scope) {
            // alert(1);
            this.authQrDialog = true;
            this.currentId = scope.row.id;
            this.authQrFn();
        },
        // 4.1.2.获取授权二维码
        async authQrFn () {
            const { data } = await api.staffBind({ member_id: this.member_id });
            this.authQrData = data;
        },
        // 选择职位
        selectPosition () {
            this.getFormData();
        },
        dateFormate(row, column, cellValue, index) {
            if (cellValue) {
                return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
            } else {
                return ''
            }
        },
        async handleRelevance (scope) {
            console.log(scope);
            this.currentId = scope.row.id;
            this.isStaffSetDisable = true;
        },
        async setStaffSetDisable () {
            const { data } = api.staffSetDisable({ id: this.currentId, is_disable: 0});
            this.isStaffSetDisable = false;
        },
        handleCurrentChange(val) {
            this.page_no = val;
            this.getFormData();
        },
        async getPositionSelectList () {
            const { data } = await api.positionSelectList();
            this.positionSelectList = data.data;
        },
        handleClick (state, val) {
            this.employeesId = '';
            this.employeesTitle = '新增员工';
            this.isAddEmployees = true;
            if (state === 'edit') {
                this.employeesTitle = '编辑员工';
                this.employeesId = val.row.id;
                this.$nextTick(() => {
                    this.$refs.AddEmployees.getInfoData(val);
                });
            }
        },
        handleClose () {
            this.isAddEmployees = false;
        },
        async getFormData () {
            let params = {
                position_id: this.position_id,
                keyword: this.keyword,
                page_no: this.page_no
            };
            const { data } = await api.staffList(params);
            this.tableData = data.data;
            this.total = data.allCount;
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
    .item{
        display: flex;
        align-items: center;
    }
    .item img{
        margin-right: 10px;
    }
</style>
