<template>
    <div>
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="common-box">
            <el-tabs v-model="selected" type="card" @tab-click="tabPage">
                <el-tab-pane label="排班管理" name="0"></el-tab-pane>
                <el-tab-pane label="班次管理" name="1"></el-tab-pane>
            </el-tabs>
            <component :is="component"></component>
        </div>
    </div>
</template>

<script>
import breadcrumb from '../../../common/address'
import workforceManagement from './workforceManagement/index'
import flightManagement from './flightManagement/index'
export default {
    name: 'EmployeeScheduling',
    components: {
        breadcrumb,
        flightManagement,
        workforceManagement
    },
    data () {
        return {
            selected: 0,
            moduleData: [
                { id: '0', label: '排班管理', component: 'workforceManagement' },
                { id: '1', label: '班次管理', component: 'flightManagement' }
            ],
            component: workforceManagement,
            // 面包屑信息
            breadcrumbList: [
                {
                    name: '首页',
                    router: 'dashboard'
                },
                {
                    name: '员工管理',
                    router: 'EmployeeScheduling'
                },
                {
                    name: '员工排班',
                    router: 'EmployeeScheduling'
                }
            ],
        }
    },
    methods: {
        /**
         * @页面之间的切换
         * @author wenruihuan
         * 2019/10/27
         */
        tabPage (val) {
            this.component = this.moduleData[val.index].component;
        }
    }
};
</script>

<style scoped>

</style>
