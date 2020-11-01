<template>
    <div class="billing-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="container">
            <div class="info-title">记账方式</div>
            <p class="tip">默认记账方式</p>
            <div class="default_list">
                <div class="default_item" v-for="(item, index) in defaultList" :key="index">
                    <img class="icon" :src="item.img" alt="" />
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <p class="tip">自定义记账</p>
            <el-button class="add_btn" type="primary" @click="handleDetail()">添加</el-button>
            <div class="custom_list">
                <div class="custom_item" v-for="(item, index) in customList" :key="index">
                    <div class="custom_icon">{{ item.name }}</div>
                    <el-button class="edit_btn" type="text" @click="handleDetail(index)">编辑</el-button>
                </div>
            </div>
        </div>
        <el-dialog
            class="billing_setting_detail"
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="680px"
        >
            <el-form :model="formData" label-width="130px" class="demo-ruleForm">
                <el-form-item label="记账方式：" prop="name">
                    <el-input v-model="formData.name" maxlength="10" show-word-limit placeholder="名称不可重复，最多十个字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSave">保 存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import { getPayment, savePayment } from '@/api/setting';
    import breadcrumb from '@/components/common/address';
    export default {
        name: 'BillingSetting',
        components: {
            breadcrumb
        },
        data() {
            return {
                breadcrumbList: [
                    {
                        name: '首页',
                        router: 'dashboard'
                    },
                    {
                        name: '设置',
                        router: 'Setting'
                    },
                    {
                        name: '开单设置',
                        router: 'BillingSetting'
                    }
                ],
                defaultList: [],
                customList: [],
                index: '',
                dialogType: '',
                dialogTitle: '',
                dialogVisible: false,
                formData: {
                    name: ''
                }
            };
        },
        created() {
            this.getPaymentData();
        },
        methods: {
            async getPaymentData() {
                const res = await getPayment();
                if (res.code === 200) {
                    const list = res.data || [];
                    this.defaultList = list.filter((m) => m.is_default === 1);
                    this.customList = list.filter((m) => m.is_default !== 1);
                }
            },
            handleDetail(index) {
                this.index = index;
                this.dialogType = index > -1 ? 'edit' : 'add';
                this.dialogTitle = index > -1 ? '修改' : '新增' + '记账方式';
                this.formData = index > -1 ? this.customList[index] : { name: '' };
                this.dialogVisible = true;
            },
            async handleSave() {
                if (!this.formData.name) {
                    this.$message.error('请填写记账方式名称！');
                    return;
                }
                const params = { name: this.formData.name };
                if (this.formData.id) {
                    params.id = this.formData.id;
                }
                const res = await savePayment(params);
                if (res.code === 200) {
                    this.$message.success(res.msg);
                    this.getPaymentData();
                    this.dialogVisible = false;
                }
            }
        }
    };
</script>

<style lang="css" scoped>
    .tip {
        padding-top: 15px;
        padding-bottom: 30px;
        color: #666666;
    }
    .custom_list,
    .default_list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 30px;
    }
    .default_list .default_item {
        display: flex;
        align-items: center;
        border: 1px solid #cccccc;
        padding: 10px 15px;
        margin-right: 60px;
        margin-bottom: 10px;
        /* width: calc((100% - 180px) / 3); */
        width: 330px;
    }
    .icon {
        width: 70px;
        height: 70px;
        margin-right: 10px;
    }
    .pos_icon {
        transform: rotate(-90deg);
    }
    .add_btn {
        margin-bottom: 10px;
    }
    .custom_list .custom_item {
        display: flex;
        align-items: center;
        margin-right: 60px;
        margin-bottom: 10px;
    }
    .custom_icon {
        border: 1px solid #cccccc;
        padding: 10px 15px;
        height: 90px;
        text-align: center;
        line-height: 90px;
        color: #000;
        margin-right: 10px;
        width: 294px;
    }
    .edit_btn {
        margin-top: 90px;
    }
</style>