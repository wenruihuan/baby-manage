<template>
    <div>
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="storeDetails common-box">
            <div class="info-box">
                <div class="title">店铺信息</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="店铺名称" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺logo" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺照片" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客服电话" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="营业时间" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺介绍">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="$router.push({path: '/storeEdit'})">编辑信息</el-button>
                        <el-button @click="resetForm('ruleForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="info-box">
                <div class="title">店铺负责人</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="负责人姓名" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.creativepreson"></el-input>&nbsp;&nbsp;
                        <el-popover
                                placement="bottom"
                                width="360"
                                v-model="visible">
                            <div style="display: flex">
                                <el-input v-model="ruleForm.creativepreson"></el-input>&nbsp;&nbsp;&nbsp;
                                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                            </div>
                            <el-button slot="reference">修改</el-button>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="负责人电话" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>&nbsp;&nbsp;
                        <el-popover
                                placement="bottom"
                                width="360"
                                v-model="visible1">
                            <div style="display: flex">
                                <el-input v-model="ruleForm.creativeTel"></el-input>&nbsp;&nbsp;&nbsp;
                                <el-button type="info" size="mini" @click="visible1 = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="visible1 = false">确定</el-button>
                            </div>
                            <el-button slot="reference">修改</el-button>
                        </el-popover>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import breadcrumb from '../../common/address'
export default {
    name: 'index',
    components: {
        breadcrumb
    },
    data () {
        return {
            visible: false,
            visible1: false,
            disabled: true,
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
