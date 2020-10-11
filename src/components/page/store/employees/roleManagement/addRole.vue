<template>
    <div class="add-role">
        <div class="common-title-one">角色信息</div>
        <div class="info">
            <div class="info-box">
                <div class="title">店铺信息</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="归属门店" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.tel"></el-input>
                    </el-form-item>
                    <!--<el-form-item label=" ">
                        <el-time-picker
                                is-range
                                v-model="ruleForm.time"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>-->
                    <el-form-item label="店铺地址" prop="name">
                        <!--<el-select></el-select>-->
                    </el-form-item>
                    <el-form-item label="店铺介绍">
                        <el-input type="textarea" :disabled="disabled" v-model="ruleForm.intr"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="shopSave">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'addRole'
    };
</script>

<style scoped>

</style>
