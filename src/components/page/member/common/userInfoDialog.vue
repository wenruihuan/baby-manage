<template>
    <div>
        {{userId}}
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
            <el-form-item label="姓名：" prop="member_name" required>
                <el-input class="width200" v-model="ruleForm.member_name"></el-input>
            </el-form-item>
            <el-form-item label="备注名：" prop="remark_name">
                <el-input class="width200" v-model="ruleForm.remark_name"></el-input>
            </el-form-item>
            <el-form-item label="性别：" required prop="sex">
                <el-select  class="width200" v-model="ruleForm.sex" placeholder="请选择活动区域">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号：" prop="member_phone" required>
                <el-input class="width200" v-model="ruleForm.member_phone"></el-input>
            </el-form-item>
            <el-form-item prop="birthday" label="生日：">
                <el-date-picker class="width200" type="date" placeholder="选择日期" v-model="ruleForm.birthday"></el-date-picker>
            </el-form-item>
            <el-form-item label="会员编号：" prop="member_no" required>
                <el-input class="width200" v-model="ruleForm.member_no"></el-input>
            </el-form-item>
            <el-form-item label="会员来源：" prop="member_source" required>
                <el-select class="width200" v-model="ruleForm.member_source" placeholder="请选择会员来源">
                    <el-option label="线下录入" value="线下录入"></el-option>
                    <el-option label="线上注册" value="线上注册"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会员等级：" prop="level_id" required>
                <el-select v-model="ruleForm.level_id" placeholder="选择会员等级">
                    <el-option
                            v-for="item in memberLevelList"
                            :key="item.no"
                            :label="item.title"
                            :value="item.no"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="健康管理师：" prop="hm_id">
                <el-select v-model="ruleForm.hm_id" placeholder="选择健康管理师">
                    <el-option
                            v-for="item in hmSelectList"
                            :key="item.hm_id"
                            :label="item.hm_name"
                            :value="item.hm_id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="归属门店：" prop="shop_name">
                多多亲子岁月一店
                <!--                    <el-input class="width200" v-model="ruleForm.shop_name"></el-input>-->
            </el-form-item>
            <el-form-item label="微信号：" prop="wx">
                <el-input class="width200" v-model="ruleForm.wx"></el-input>
            </el-form-item>
            <!--                <el-form-item label="地址：" prop="desc">-->
            <!--                    <el-select class="width200" v-model="ruleForm.sex" placeholder="请选择活动区域">-->
            <!--                        <el-option label="男" value="男"></el-option>-->
            <!--                        <el-option label="女" value="女"></el-option>-->
            <!--                    </el-select>-->
            <!--                </el-form-item>-->
            <el-form-item label="详细地址：">
                <el-input type="textarea" v-model="ruleForm.detail_address"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { memberLevelDetail } from '../../../../api';
export default {
    name: 'userInfoDialog',
    data () {
        return {
            ruleForm: {
            },
            rules: {
                member_name: [
                    { required: true, message: '请输入会员名称', trigger: 'blur' }
                ],
                member_phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                member_no: [
                    { required: true, message: '请输入会员编号', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                member_source: [
                    { required: true, message: '请选择会员来源', trigger: 'change' }
                ],
                level_id: [
                    { required: true, message: '选择会员等级', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
        }
    },
    created() {

    },
    props: {
        userId: ''
    },
    methods: {
        submitFn () {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    const { data } = await api.memberSave();
                    this.memberdialogVisible = false;
                }
            })
        }
    }
};
</script>

<style scoped>

</style>
