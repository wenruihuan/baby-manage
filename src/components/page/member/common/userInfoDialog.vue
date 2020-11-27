<template>
    <div>
        <el-dialog
                :title="title"
                :visible.sync="memberdialogVisible"
                width="50%">
            <div class="dialogMain">
                <el-form :model="userInfoEdit" :rules="rules" ref="userInfoEdit" label-width="160px" class="demo-userInfoEdit">
                    <el-form-item label="姓名：" prop="member_name" required>
                        <el-input class="width200" v-model="userInfoEdit.member_name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注名：" prop="remark_name">
                        <el-input class="width200" v-model="userInfoEdit.remark_name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" required prop="sex">
                        <el-select  class="width200" v-model="userInfoEdit.sex" placeholder="请选择活动区域">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="member_phone" required>
                        <el-input class="width200" v-model="userInfoEdit.member_phone"></el-input>
                    </el-form-item>
                    <el-form-item prop="birthday" label="生日：">
                        <el-date-picker class="width200" type="date" placeholder="选择日期" v-model="userInfoEdit.birthday"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="会员编号：" prop="member_no" required>
                        <el-input class="width200" v-model="userInfoEdit.member_no"></el-input>
                    </el-form-item>
                    <el-form-item label="会员来源：" prop="member_source" required>
                        <el-select class="width200" v-model="userInfoEdit.member_source" placeholder="请选择会员来源">
                            <el-option label="线下录入" value="线下录入"></el-option>
                            <el-option label="线上注册" value="线上注册"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会员等级：" prop="level_id" required>
                        <el-select v-model="userInfoEdit.level_id" placeholder="选择会员等级">
                            <el-option
                                    v-for="(item, index) in memberLevelList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.level_id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="健康管理师：" prop="hm_id">
                        <el-select v-model="userInfoEdit.hm_id" placeholder="选择健康管理师">
                            <el-option
                                    v-for="(item, index) in hmSelectList"
                                    :key="index"
                                    :label="item.hm_name"
                                    :value="item.hm_id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="归属门店：" prop="shop_name">
                        多多亲子岁月一店
                        <!--                    <el-input class="width200" v-model="userInfoEdit.shop_name"></el-input>-->
                    </el-form-item>
                    <el-form-item label="微信号：" prop="wx">
                        <el-input class="width200" v-model="userInfoEdit.wx"></el-input>
                    </el-form-item>
                    <!--                <el-form-item label="地址：" prop="desc">-->
                    <!--                    <el-select class="width200" v-model="userInfoEdit.sex" placeholder="请选择活动区域">-->
                    <!--                        <el-option label="男" value="男"></el-option>-->
                    <!--                        <el-option label="女" value="女"></el-option>-->
                    <!--                    </el-select>-->
                    <!--                </el-form-item>-->
                    <el-form-item label="地址：" prop="desc">
                        <el-cascader
                            size="large"
                            :options="options"
                            v-model="region"
                            @change="regionHandleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址：">
                        <el-input type="textarea" v-model="userInfoEdit.detail_address"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="userInfoEdit.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelMemberdialogVisible">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as api from '../../../../api';
// 地址选择器
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
    name: 'userInfoEditDialog',
    data () {
        return {
            region: '',
            options: regionDataPlus,
            title: '新增会员',
            ruleForm: {
            },
            memberdialogVisible: true,
            userInfoEdit: {},
            hmSelectList: [],
            memberLevelList: [],
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
        this.getHmSelectList();
        this.getMemberLevelList();
        if (this.userId !== '') {
            this.getUserInfo();
            this.title = '新增会员'
        } else {
            this.title = '编辑会员'
        }
    },
    props: {
        userId: ''
    },
    methods: {
        // 会员等级列表
        async getMemberLevelList () {
            const  { data } = await api.memberLevelList();
            this.memberLevelList = data;
        },
        // 获取健康师列表
        async getHmSelectList () {
            const  { data } = await api.hmSelectList();
            this.hmSelectList = data;
        },
        async getUserInfo () {
            const { data } = await api.memberDetail({ member_id: this.userId });
            this.ruleForm = data;
            this.ruleForm.member_name = data.name;
            this.ruleForm.member_phone = data.phone;
        },
        // 新增会员
        submitForm (value) {
            this.$refs.userInfoEdit.validate((valid) => {
                if (valid) {
                    this.$emit('submit');
                };
            });
        },
        cancelMemberdialogVisible () {
            this.$emit('cancel', false);
        },
        regionHandleChange (value, value1) {
            this.userInfoEdit.region = '';
            console.log(value);
            console.log(CodeToText[value[0]]);
            value.forEach(m => {
                this.userInfoEdit.region = this.userInfoEdit.region + CodeToText[m];
            })
        }
    }
};
</script>

<style scoped>

</style>
