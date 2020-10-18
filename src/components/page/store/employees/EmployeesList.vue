<template>
    <div>
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="common-box">
            <el-tabs v-model="selected" type="card" @tab-click="tabPage">
                <el-tab-pane label="员工管理" name="0"></el-tab-pane>
                <el-tab-pane label="职位管理" name="1"></el-tab-pane>
                <el-tab-pane label="角色管理" name="2"></el-tab-pane>
                <el-tab-pane label="已禁用账号" name="3"></el-tab-pane>
            </el-tabs>
            <component :is="component"></component>
        </div>
    </div>
</template>

<script>
import breadcrumb from '../../../common/address'
import staffManagement from './staffManagement/index'
import positionManagement from './positionManagement/index'
import roleManagement from './roleManagement/index'
import disabledAccount from './disabledAccount/index'
export default {
    name: 'EmployeesList',
    components: {
        breadcrumb,
        staffManagement,
        positionManagement,
        disabledAccount,
        roleManagement
    },
    data () {
        return {
            selected: 0,
            moduleData: [
                { id: '0', label: '员工管理', component: 'staffManagement' },
                { id: '1', label: '职位管理', component: 'positionManagement' },
                { id: '2', label: '角色管理', component: 'roleManagement' },
                { id: '3', label: '已禁用账号', component: 'disabledAccount' },
            ],
            component: staffManagement,
            // 面包屑信息
            breadcrumbList: [
                {
                    name: '首页',
                    router: 'dashboard'
                },
                {
                    name: '员工管理',
                    router: 'EmployeesList'
                },
                {
                    name: '员工列表',
                    router: 'EmployeesList'
                }
            ],
            page: {
                total: 30
            },
            activeName: 'first',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            }],
            query: {}
        };
    },
    methods: {
        /**
         * @页面之间的切换
         * @author wenruihuan
         * 2019/10/27
         */
        tabPage (val) {
            this.component = this.moduleData[val.index].component;
        },
        // 新增员工
        addEmployees () {},
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleSearch () {}
    }
};
</script>

<style scoped>
.common-box{
    background: #fff;
}
</style>
