<template>
    <div class="distribution-setting">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="container" v-loading="loading">
            <div class="info-title">配送设置</div>
            <el-form :model="formData" label-width="130px" class="demo-ruleForm">
                <el-form-item label="不配送：">
                    <div class="no-distributionList-item" v-for="(item, index) in noDistributionList" :key="index">
                        <el-checkbox v-model="item.available" @change="handleNoCheck">{{ item.name }}</el-checkbox>
                        <div class="remark">
                            <span class="label">说明：</span>
                            <el-input v-model="item.message"></el-input>
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
                            <el-checkbox v-model="item.available" @change="handleNoCheck">{{ item.name }}</el-checkbox>
                            <div class="cost">
                                快递费：<el-input v-model="item.price"> <span slot="prefix" class="el-input__icon">￥</span> </el-input>元
                            </div>
                        </div>
                        <div class="remark">
                            <span class="label">说明：</span>
                            <el-input v-model="item.message"></el-input>
                            <el-popover placement="top" width="260" v-model="item.visible">
                                <div style="display: flex">
                                    <el-input v-model="item.tempName" placeholder="输入配送名字" style="margin-right: 10px"></el-input>
                                    <el-button size="mini" @click="item.visible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="handleChangeName('1', index)">确定</el-button>
                                </div>
                                <el-button slot="reference" class="edit_btn" type="text">编辑</el-button>
                            </el-popover>
                            <el-button class="edit_btn border_btn" type="text" v-if="!item.isDefault" @click="handleRemove(index)"
                                >删除</el-button
                            >
                        </div>
                    </div>
                    <el-button @click="handleAddDistribution">添加物流配送</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSave">保 存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { getExpress, saveExpress } from '@/api/setting';
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
                loading: false,
                noDistributionList: [],
                distributionList: [],
                defaultItem: {
                    name: '默认名称',
                    message: '',
                    price: '',
                    available: true,
                    visible: false,
                    tempName: ''
                }
            };
        },
        created() {
            this.getExpressData();
        },
        methods: {
            async getExpressData() {
                this.loading = true;
                const res = await getExpress();
                this.loading = false;
                if (res.code === 200) {
                    const commonItem = { visible: false, tempName: '' };
                    const todoor = { ...res.data.todoor, ...commonItem };
                    this.$set(this, 'noDistributionList', [todoor]);
                    const defaultItem = { ...res.data.default_express, ...commonItem, isDefault: true };
                    this.$set(this, 'distributionList', [...[defaultItem], ...res.data.express]);
                }
            },
            handleNoCheck() {
                this.noDistributionList[0].available = true;
            },
            handleChangeName(type, index) {
                let item = this[type === '0' ? 'noDistributionList' : 'distributionList'][index];
                item.name = item.tempName;
                item.tempName = '';
                item.visible = false;
                this[type === '0' ? 'noDistributionList' : 'distributionList'].splice(index, 1, item);
            },
            handleAddDistribution() {
                this.distributionList.push(this.defaultItem);
            },
            handleRemove(index) {
                this.distributionList.splice(index, 1);
            },
            formatList(list) {
                let newList = JSON.parse(JSON.stringify(list));
                let result = [];
                newList.forEach((m) => {
                    let item = {
                        name: m.name,
                        message: m.message,
                        price: m.price,
                        available: m.available
                    };
                    if (m.id) {
                        item.id = m.id;
                    }
                    result.push(item);
                });
                return result;
            },
            async handleSave() {
                this.loading = true;
                const noDistributionList = this.formatList(this.noDistributionList);
                const distributionList = this.formatList(this.distributionList);
                const todoor = noDistributionList[0];
                const default_express = distributionList[0];
                const express = distributionList.filter((m, i) => i !== 0);
                const params = { todoor, default_express, express };
                const res = await saveExpress(params);
                if (res.code === 200) {
                    this.$message.success(res.msg);
                    this.getExpressData();
                }
            }
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
    .border_btn {
        position: relative;
    }
    .border_btn::after {
        content: '';
        width: 1px;
        height: 15px;
        position: absolute;
        top: 8.5px;
        left: -7px;
        background: #dddddd;
    }
</style>