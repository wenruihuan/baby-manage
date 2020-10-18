<template>
    <div class="billing-setting">
        <div class="container">
            <div class="info-title">记账方式</div>
            <p class="tip">默认记账方式</p>
            <div class="default_list">
                <div class="default_item">
                    <img class="icon" src="../../../assets/img/wechat_pay.png" alt="" />
                    <span>微信支付</span>
                </div>
                <div class="default_item">
                    <img class="icon" src="../../../assets/img/alipay.png" alt="" />
                    <span>支付宝支付</span>
                </div>
                <div class="default_item">
                    <img class="icon pos_icon" src="../../../assets/img/pos_3.png" alt="" />
                    <span>POS支付</span>
                </div>
            </div>
            <p class="tip">自定义记账</p>
            <el-button class="add_btn" type="primary" @click="handleDetail()">添加</el-button>
            <div class="custom_list">
                <div class="custom_item" v-for="(item, index) in customList" :key="item.index">
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
    export default {
        name: 'BillingSetting',
        data() {
            return {
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
        methods: {
            handleDetail(index) {
                this.index = index || '';
                this.dialogType = index ? 'edit' : 'add';
                this.dialogTitle = index ? '修改' : '新增' + '记账方式';
                this.formData.name = index ? this.customList[index].name : '';
                this.dialogVisible = true;
            },
            handleSave() {
                if (!this.formData.name) {
                    this.$message.error('请填写记账方式名称！');
                    return;
                }
                if (this.customList.findIndex((m) => m.name === this.formData.name) > -1) {
                    this.$message.error('记账方式名称不能重复！');
                    return;
                }
                this.dialogVisible = false;
                if (this.dialogType === 'add') {
                    this.customList.push({ name: this.formData.name });
                } else {
                    this.customList.splice(this.index, 1, { name: this.formData.name });
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