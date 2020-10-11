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
            <!--           <div class="operation">
                           <div class="handle-box">
                               <el-row>
                                   <el-button
                                       type="primary"
                                       icon="el-icon-delete"
                                       class="handle-del mr10"
                                       @click="isAddEmployees = true"
                                   >添加员工</el-button>
                               </el-row>

                               <el-row :gutter="20">
                                   <el-col :span="6">
                                       <span>选择门店 </span>
                                       <el-select v-model="query.address" placeholder="选择门店" class="handle-select mr10">
                                           <el-option key="1" label="广东省" value="广东省"></el-option>
                                           <el-option key="2" label="湖南省" value="湖南省"></el-option>
                                       </el-select>
                                   </el-col>
                                   <el-col :span="6">
                                       <span>选择职位 </span>
                                       <el-select v-model="query.address" placeholder="选择职位" class="handle-select mr10">
                                           <el-option key="1" label="广东省" value="广东省"></el-option>
                                           <el-option key="2" label="湖南省" value="湖南省"></el-option>
                                       </el-select>
                                   </el-col>
                                   <el-col :span="6">
                                       <el-input placeholder="请输入系统账号、姓名"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
                                   </el-col>
                                   <el-col :span="6">
                                       <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                                   </el-col>
                               </el-row>
                           </div>
                       </div>
                       <div class="table">
                           <el-table
                               :data="tableData"
                               border
                               style="width: 100%"
                           >
                               <el-table-column
                                   prop="date"
                                   label="姓名"
                               >
                               </el-table-column>
                               <el-table-column
                                   prop="name"
                                   label="系统账号"
                               >
                               </el-table-column>
                               <el-table-column
                                   prop="province"
                                   label="省份"
                                >
                               </el-table-column>
                               <el-table-column
                                   prop="city"
                                   label="市区"
                               >
                               </el-table-column>
                               <el-table-column
                                   prop="address"
                                   label="地址"
                               >
                               </el-table-column>
                               <el-table-column
                                   prop="zip"
                                   label="邮编"
                               >
                               </el-table-column>
                               <el-table-column
                                   fixed="right"
                                   label="操作"
                               >
                                   <template slot-scope="scope">
                                       <el-button @click="handleClick()" type="text" size="small">详情</el-button>
                                       <el-button type="text" size="small">更多</el-button>
                                   </template>
                               </el-table-column>
                           </el-table>
                       </div>
                       <div class="page-box">
                           <el-pagination
                               background
                               @current-change="handleCurrentChange"
                               layout="total, prev, pager, next, jumper"
                               :total="page.total">
                           </el-pagination>
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
                       </el-dialog>-->
        </div>
    </div>
</template>

<script>
    import breadcrumb from '../../../common/address'
    export default {
        name: 'EmployeeScheduling',
        components: {
            breadcrumb
        },
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
    };
</script>

<style scoped>

</style>
