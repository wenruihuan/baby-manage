<template>
    <div class="distribution-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="container">
            <div class="info-title">配送设置</div>
            <el-form :model="formData" label-width="130px" class="demo-ruleForm">
                <el-form-item label="不配送：">
                    <div class="no-distributionList-item" v-for="(item, index) in noDistributionList" :key="index">
                        <el-checkbox v-model="item.check" @change="handleNoCheck">{{ item.name }}</el-checkbox>
                        <div class="remark">
                            <span class="label">说明：</span>
                            <el-input v-model="item.remark"></el-input>
                            <el-popover placement="top" width="260" v-model="item.visible">
                                <div style="display: flex">
                                    <el-input v-model="item.tempName" placeholder="输入配送名字" style="margin-right: 10px"></el-input>
                                    <el-button size="mini" @click="item.visible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="handleChangeName('0', index)">确定</el-button>
                                </div>
                                <el-button slot="reference" class="edit_btn" type="text">编辑</el-button>
                            </el-popover>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="物流配送：">
                    <div class="distributionList-item" v-for="(item, index) in distributionList" :key="index">
                        <div class="item_header">
                            <el-checkbox v-model="item.check" @change="handleNoCheck">{{ item.name }}</el-checkbox>
                            <div class="cost">
                                快递费：<el-input v-model="item.cost"> <span slot="prefix" class="el-input__icon">￥</span> </el-input>元
                            </div>
                        </div>
                        <div class="remark">
                            <span class="label">说明：</span>
                            <el-input v-model="item.remark"></el-input>
                            <el-popover placement="top" width="260" v-model="item.visible">
                                <div style="display: flex">
                                    <el-input v-model="item.tempName" placeholder="输入配送名字" style="margin-right: 10px"></el-input>
                                    <el-button size="mini" @click="item.visible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="handleChangeName('1', index)">确定</el-button>
                                </div>
                                <el-button slot="reference" class="edit_btn" type="text">编辑</el-button>
                            </el-popover>
                            <el-button class="edit_btn" type="text" v-if="index !== 0">删除</el-button>
                        </div>
                    </div>
                    <el-button>添加物流配送</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSave">保 存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import breadcrumb from '@/components/common/address';
    export default {
        name: 'DistributionSetting',
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
                        name: '商品配送设置',
                        router: 'DistributionSetting'
                    }
                ],
                formData: {},
                noDistributionList: [{ name: '上门自提', check: true, remark: '', visible: false, tempName: '' }],
                distributionList: [
                    { name: '普通快递', check: true, cost: '', remark: '', visible: false, tempName: '' },
                    { name: '普通快递1', check: true, cost: '30', remark: '', visible: false, tempName: '' }
                ]
            };
        },
        methods: {
            handleNoCheck() {
                this.noDistributionList[0].check = true;
            },
            handleChangeName(type, index) {
                let item = this[type === '0' ? 'noDistributionList' : 'distributionList'][index];
                item.name = item.tempName;
                item.tempName = '';
                item.visible = false;
                this[type === '0' ? 'noDistributionList' : 'distributionList'].splice(index, 1, item);
            },
            handleSave() {}
        }
    };
</script>
<style scoped>
    .distributionList-item {
        padding-bottom: 30px;
    }
    .remark {
        display: flex;
        width: 500px;
        margin-top: 15px;
    }
    .remark .label {
        width: 51px;
    }
    .remark >>> .el-input {
        width: 300px;
    }
    .item_header {
        display: flex;
        align-items: center;
    }
    .cost {
        width: 170px;
        display: flex;
        align-items: center;
        margin-left: 50px;
    }
    .cost >>> .el-input {
        width: 80px;
        margin-right: 3px;
    }
    .edit_btn {
        margin-left: 10px;
    }
</style>