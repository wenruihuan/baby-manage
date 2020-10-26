<template>
    <div class="edit-view">
        <el-steps v-if="isEdit" :active="activeStep" simple>
            <el-step title="编辑基本信息" icon="el-icon-edit"></el-step>
            <el-step title="详情介绍" ></el-step>
        </el-steps>
        <el-form v-show="activeStep === 1" class="edit-form" ref="boxForm" :model="form" label-width="100px" :rules="isEdit ? rules : {}">
            <el-form-item label="名称:" prop="name">
                <el-input style="width: 300px;" v-if="isEdit" maxlength="100" v-model="form.name"></el-input>
                <span v-else>{{ form.name }}</span>
            </el-form-item>
            <el-form-item label="分类:" prop="kind_id">
                <el-select style="width: 300px;" v-if="isEdit" class="category-select" v-model="form.kind_id" placeholder="选择包厢分类">
                    <el-option
                        v-for="item in categoryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <span v-else>{{ form.kind_name }}</span>
                <p class="tips" v-if="isEdit">一个商品对应一个分类，用于后台设置</p>
                <el-button v-if="isEdit" class="category-manage" type="text" @click="openDialog">管理包厢分类</el-button>
            </el-form-item>
            <el-form-item label="标签:" prop="box_no">
                <el-select style="width: 300px;" v-if="isEdit" class="category-select" v-model="form.tag_ids" placeholder="选择服务标签">
                    <el-option
                        v-for="item in tagList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <span v-else>{{ form.tag_name }}</span>
                <p class="tips" v-if="isEdit">一个商品可以打多个标签，用于小程序端查找商品</p>
                <el-button v-if="isEdit" class="category-manage" type="text" @click="openTagDialog">管理服务标签</el-button>
            </el-form-item>
            <el-form-item label="图片:" prop="img">
                <el-upload
                    v-if="isEdit"
                    multiple
                    action="http://up-z0.qiniu.com"
                    list-type="picture-card"
                    :data="uploadBody"
                    :before-upload="beforeUpload"
                    :on-success="handleUploadSuccess"
                    :before-remove="() => false"
                    :disabled="!isEdit"
                    :show-file-list="false"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <ul class="img-list">
                    <li v-for="(item, index) in files"
                        :key="index"
                    >
                        <img :src="item" alt=''>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="规格:" prop="unit">
                <div class="size-group">
                    <div v-if="sizeGroup && sizeGroup.length > 0 && isEdit" v-for="(item, index) in sizeGroup" :key="index">
                        <div class="size-name">
                            <span>规格名：</span>
                            <el-input v-model="item.name"></el-input>
                        </div>
                        <div v-if="item.value && item.value.length > 0" class="size-value">
                            <span>规格值：</span>
                            <el-input
                                    :key="index"
                                    v-for="(innerItem, index) in item.value"
                                    v-model="innerItem.value"
                                    class="size-input"
                            >
                            </el-input>
                            <el-button type="text" @click="addSizeValue(item)">添加规格值</el-button>
                        </div>
                    </div>
                </div>
                <div v-if="isEdit" class="add-size">
                    <el-button @click="addSize">添加规格</el-button>
                </div>
                <ul v-if="!isEdit" class="size-readonly">
                    <li
                            class="item"
                            v-for="(item, index) in sizeGroup"
                            :key="index"
                    >
                        <span>{{ item.name }}:</span>
                        <ul class="size-value-readonly">
                            <li class="item" v-for="(innerItem, index) in item.value" :key="index">
                                {{ innerItem.value }}
                            </li>
                        </ul>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="售价:" prop="price">
                <el-input style="width: 300px;" v-if="isEdit" v-model="form.price">
                    <template slot="prepend">￥</template>
                </el-input>
                <span v-else>￥{{ form.price }}</span>
            </el-form-item>
            <el-form-item label="划线价:" prop="original_price">
                <el-input style="width: 300px;" v-if="isEdit" v-model="form.original_price" placeholder="原价：￥99.99"></el-input>
                <span v-else>￥{{ form.original_price }}</span>
            </el-form-item>
            <el-form-item label="服务时长:" prop="service_time">
                <el-input style="width: 300px;" v-if="isEdit" v-model="form.service_time">
                    <template slot="suffix">分钟</template>
                </el-input>
                <span v-else>{{ form.service_time }}分钟</span>
            </el-form-item>
            <el-form-item label="线上预约:" prop="is_needpay">
                <el-radio-group v-if="isEdit" v-model="form.is_needpay">
                    <el-radio label="0">无需支付</el-radio>
                    <el-radio label="1">需支付</el-radio>
                </el-radio-group>
                <span v-else>{{ form.is_needpay === '1' ? '需支付' : '无需支付' }}</span>
            </el-form-item>
            <el-form-item label="服务方式:" prop="is_todoor">
                <el-radio-group v-if="isEdit" v-model="form.is_todoor">
                    <el-radio label="0">到店</el-radio>
                    <el-radio label="1">上门</el-radio>
                </el-radio-group>
                <span v-else>{{ form.is_todoor === '1' ? '上门' : '到店' }}</span>
            </el-form-item>
            <el-form-item label="网店展示:" prop="is_show">
                <el-radio-group v-if="isEdit" v-model="form.is_show">
                    <el-radio label="0">不展示</el-radio>
                    <el-radio label="1">展示</el-radio>
                </el-radio-group>
                <span v-else>{{ form.is_show === '1' ? '展示' : '不展示' }}</span>
            </el-form-item>
        </el-form>
        <edit-wechat v-show="activeStep === 2" ref="editWechat" />
        <div class="btn-group" v-if="isEdit">
            <el-button :type="activeStep === 1 ? 'primary' : 'default'" @click="activeStep = activeStep === 1 ? 2 : 1">{{ activeStep === 1 ? '下一步' : '上一步' }}</el-button>
            <el-button v-if="activeStep === 2" type="primary" @click="handleSave">保存</el-button>
            <el-button class="btn-item" v-if="activeStep === 2" @click="setPublishStatus">{{ isPublish ? '下架' : '上架' }}</el-button>
            <el-popover
                placement="top-start"
                trigger="click"
                v-if="activeStep === 2"
            >
                <div id="SERVICE_QRCODE"></div>
                <el-button class="btn-item" slot="reference" @click="handleView">预览</el-button>
            </el-popover>
            <el-button class="btn-item" v-if="activeStep === 2" @click="handleRemove">删除</el-button>
        </div>
        <box-category v-if="boxCategoryVisible" ref="boxCategory" />
        <service-manage v-if="serviceManageVisible" ref="serviceManage" />
    </div>
</template>

<script>
import BoxCategory from './box-category';
import ServiceManage from './service-manage';
import editWechat from './edit-wechat';

import {
    addOrEditBox,
    ERR_OK,
    getCategoryList,
    getDetail,
    getUploadToken, removeBox, setPublish,
    getServiceTags,
    qrCodeView
} from '@/components/page/goodsmanage/service/api';
import QRCode from 'qrcodejs2';

export default {
    components: {
        BoxCategory,
        ServiceManage,
        editWechat
    },
    data () {
        return {
            activeStep: 1,
            baseUrl: '',
            uploadBody: {
                token: '',
                key: ''
            },
            form: {
                id: '',
                name: '',
                kind_id: '',
                kind_name: '',
                tag_ids: '',
                img: '',
                sku: [],
                price: '',
                service_time: '',
                original_price: '',
                is_needpay: '',
                is_todoor: '',
                is_show: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                kind_id: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                price: [
                    { required: true, message: '请输入售价', trigger: 'blur' }
                ],
                service_time: [
                    { required: true, message: '请输入服务时长', trigger: 'blur' }
                ]
            },
            boxCategoryVisible: false,
            serviceManageVisible: false,
            categoryList: [],
            tagList: [],
            isEdit: '',
            isPublish: false,
            files: [],
            qrCode: null,
            sizeGroup: []
        };
    },
    created() {
        const id = this.$route.query.id;
        this.isEdit = this.$route.query.isEdit === '1';
        this.isPublish = this.$route.query.isPublish === '1';
        this.getDetail(id);
        this.getCategory();
        this.getTags();
        this.getUploadToken();
    },
    methods: {
        /* 获取上传图片的token */
        async getUploadToken () {
            try{
                const data = await getUploadToken();
                if (data.code === ERR_OK) {
                    this.uploadBody.token = data.data.uptoken;
                    this.baseUrl = data.data.baseUrl;
                }
            } catch (e) {
                console.log(`getUploadToken error: ${e}`);
            }
        },
        async getDetail (id = '') {
            if (id) {
                try {
                    const data = await getDetail({ id });
                    if (data.code === ERR_OK) {
                        this.form = data.data;
                        this.files = this.form.img.split(',');
                        this.sizeGroup = (this.form.sku || []).map(item => ({
                            ...item,
                            value: item.value.map(innerItem => ({ value: innerItem }))
                        }));
                    }
                } catch (e) {
                    console.log(`getList error: ${e}`);
                }
            }
        },
        beforeUpload (file) {
            this.uploadBody.key = file.name;
            return true;
        },
        /* 成功上传 */
        handleUploadSuccess (res, file) {
            this.files.push(`${ this.baseUrl }/${ file.name }`);
        },
        /* 获取包厢分类下拉框 */
        async getCategory () {
            try {
                const data = await getCategoryList({ page_no: 1, page_size: 100000 });
                if (data.code === ERR_OK) {
                    this.categoryList = data.data.data;
                }
            } catch (e) {
                console.log(`edit-view.vue getCategory error: ${e}`);
            }
        },
        /* 获取服务分类下拉框 */
        async getTags () {
            try {
                const data = await getServiceTags({ page_no: 1, page_size: 1000000 });
                if (data.code === ERR_OK) {
                    this.tagList = data.data.data;
                }
            } catch (e) {
                console.log(`service edit-view.vue getTags error: ${e}`);
            }
        },
        /* 打开管理包厢分类的框 */
        openDialog () {
            this.boxCategoryVisible = true;
            this.$nextTick(() => {
                this.$refs.boxCategory.getCategoryList();
            });
        },
        /* 管理服务标签 */
        async openTagDialog () {
            this.serviceManageVisible = true;
            this.$nextTick(() => {
                this.$refs.serviceManage.getTagList();
            });
        },
        /* 保存 */
        handleSave () {
            this.$refs.boxForm.validate(async valid => {
                console.log(435345);
                if (valid) {
                    try {
                        let { kind_name, ...obj } = this.form;
                        obj.img_list = this.files.join(',');
                        obj.intr = this.$refs.editWechat.content;
                        obj.sku = this.sizeGroup.map(item => ({
                            name: item.name,
                            value: item.value.map(i => i.value)
                        }));
                        const data = await addOrEditBox(obj);
                        if (data.code === ERR_OK) {
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                        }
                    } catch (e) {
                        console.log(`service edit-view handleSave error: ${e}`);
                    }
                }
            });
        },
        /* 上下架状态 */
        async setPublishStatus () {
            this.$refs.boxForm.validate(async valid => {
                if (valid) {
                    try {
                        let { kind_name, ...obj } = this.form;
                        obj.img = this.files.join(',');
                        obj.sku = this.sizeGroup.map(item => ({
                            ...item,
                            value: item.value.map(i => i.value)
                        }));
                        const data = await addOrEditBox(obj);
                        if (data.code === ERR_OK) {
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            try {
                                const data = await setPublish({ id: this.form.id, is_publish: this.isPublish ? '0' : '1' });
                                if (data.code === ERR_OK) {
                                    this.$message({
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.isPublish = !this.isPublish;
                                }
                            } catch (e) {
                                console.log(`src/components/page/goodsmanage/service/component/edit-view.vue setPublishStatus error: ${e}`);
                            }
                        }
                    } catch (e) {
                        console.log(`service edit-view handleSave error: ${e}`);
                    }
                }
            });
        },
        /* 删除服务 */
        async handleRemove () {
            try {
                const data = await removeBox({ id: this.form.id });
                if (data.code === ERR_OK) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                    });
                }
            } catch (e) {
                console.log(`src/components/page/goodsmanage/service/component/edit-view.vue handleRemove error: ${e}`);
            }
        },
        /* 二维码预览 */
        async handleView () {
            try {
                let { kind_name, ...obj } = this.form;
                obj.img = this.files.join(',');
                obj.img_list = obj.img;
                obj.intr = this.$refs.editWechat.content;
                const data = await qrCodeView(obj);
                if (data.code === ERR_OK) {
                    if (document.getElementById('SERVICE_QRCODE')) {
                        document.getElementById('SERVICE_QRCODE').innerHTML = '';
                    }
                    this.qrCode = new QRCode("SERVICE_QRCODE", {
                        text: data.data,
                        width: 128,
                        height: 128,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.L
                    });
                }
            } catch (e) {
                console.log(`src/components/page/goodsmanage/service/component/edit-view.vue handleView error: ${e}`);
            }
        },
        /* 添加规格 */
        addSize () {
            this.sizeGroup.push({
                name: '',
                value: [{ value: '' }]
            });
        },
        /* 添加规格值 */
        addSizeValue (item) {
            item.value.push({ value: '' });
        }
    }
};
</script>

<style lang='css' scoped>
.edit-view {
    background: white;
    box-sizing: border-box;
    padding: 10px;
}
.edit-form {
    margin: 0 auto;
    margin-top: 15px;
}
.btn-group {
    text-align: center;
}
.category-manage {
    position: absolute;
    right: -80px;
    top: 0;
}
.tips {
    color: #cccccc;
    font-size: 12px;
}
.category-select {
    width: 100%;
}
.img-list {
    max-width: 500px;
    overflow: auto;
    width: 500px;
    list-style: none;
    margin-top: 15px;
}
.img-list li {
    float: left;
    margin-right: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 2px;
    box-sizing: border-box;
}
.img-list li img {
    max-width: 100px;
    display: inline-block;
}
.btn-item {
    margin-left: 10px;
}
.size-name {
    padding: 8px;
    background: #eeeeee;
}
.size-value {
    padding: 8px;
}
.size-input {
    margin-bottom: 5px;
}
.add-size {
    padding: 8px;
    box-sizing: border-box;
    background: #eeeeee;
}
.size-readonly {
    float: left;
    list-style: none;
    overflow: hidden;
}
.size-readonly .item {
    float: left;
}
.size-value-readonly {
    float: right;
    list-style: none;
}
.size-value-readonly .item {
    display: inline-block;
    float: left;
    margin-right: 5px;
}
.category-manage {
    position: absolute;
    left: 317px;
    top: 0;
}
</style>
