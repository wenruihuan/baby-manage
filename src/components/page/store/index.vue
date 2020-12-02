<template>
    <div>
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="storeDetails common-box">
            <div class="info-box">
                <div class="title">店铺信息</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="店铺名称" prop="name">
                        <!--<el-input :disabled="disabled" v-model="ruleForm.name"></el-input>-->
                        {{ruleForm.name}}
                    </el-form-item>
                    <el-form-item label="店铺logo" prop="name">
                        <img :src="ruleForm.logo" alt="">
                    </el-form-item>
                    <el-form-item label="店铺照片" prop="name">
                        <div v-if="ruleForm.img">
                            <span v-for="item in ruleForm.img.split(',')"><img :src="item" alt=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="客服电话" prop="name" :title="ruleForm.tel">
                        <!--<el-input :disabled="disabled" v-model="ruleForm.tel"></el-input>-->
                        {{ruleForm.tel}}
                    </el-form-item>
                    <el-form-item label="营业时间" prop="name" :title="ruleForm.service_time">
                        <!--<el-input :disabled="disabled" v-model="ruleForm.service_time"></el-input>-->
                        {{ruleForm.service_time}}
                    </el-form-item>
                    <el-form-item label="店铺地址" prop="name" :title="ruleForm.address">
                        <!--<el-input type="textarea" :disabled="disabled" v-model="ruleForm.address"></el-input>-->
                        {{ruleForm.address}}
                    </el-form-item>
                    <el-form-item label="店铺介绍">
                        <!--<el-input type="textarea" :disabled="disabled" v-model="ruleForm.intr" :title="ruleForm.intr"></el-input>-->
                        {{ruleForm.intr}}
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="$router.push({path: '/storeEdit'})">编辑信息</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="info-box">
                <div class="title">店铺负责人</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="负责人姓名" prop="name">
                        <el-input :disabled="disabled1" v-model="managerInfo.manager_name"></el-input>&nbsp;&nbsp;
                        <el-button @click="editManagerInfo('disabled1')">修改</el-button>
                    </el-form-item>
                    <el-form-item label="负责人电话" prop="name">
                        <el-input :disabled="disabled2" v-model="managerInfo.manager_tel"></el-input>&nbsp;&nbsp;
                        <el-button @click="editManagerInfo('disabled2')">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import breadcrumb from '../../common/address'
import * as api from '../../../api/index'
export default {
    name: 'index',
    components: {
        breadcrumb
    },
    data () {
        return {
            visible: false,
            visible1: false,
            visible2: false,
            disabled: true,
            disabled1: true,
            disabled2: true,
            formData: {},
            managerInfo: {},
            // 面包屑信息
            breadcrumbList: [
                {
                    name: '首页',
                    router: 'dashboard'
                },
                {
                    name: '店铺信息',
                    router: 'store'
                }
            ],
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rules: {
                name: [
                    { required: true, trigger: 'blur' }
                ]
            }
        }
    },
    created () {
        this.getShopInfo();
        this.getShopManagerInfo();
    },
    methods: {
        // 编辑店铺负责人
        editManagerInfo (value) {
            this[value] = !this[value];
            if (this[value]) {
                this.setShopSaveManager();
            }
        },
        async getShopInfo () {
           const { data } = await api.shopInfo();
           this.ruleForm = data;
       },
        async getShopManagerInfo () {
           const { data } = await api.shopManagerInfo();
           this.managerInfo = data;
       },
        async setShopSaveManager () {
            await api.shopSaveManager(this.managerInfo);
            this.disabled1 = true;
            this.disabled2 = true;
            this.getShopManagerInfo();
       },
    }
};
</script>

<style>
    .storeDetails .el-input{
        width: 200px;
    }
    .storeDetails .el-upload--text{
        width: 150px;
        height: 150px;
        line-height: 150px;
    }
</style>
<style scoped>
.storeDetails .title{
    border-left: 5px solid #1890FF;
    text-indent: 20px;
    line-height: 20px;
    margin-bottom: 20px;
}
.storeDetails{}
</style>
