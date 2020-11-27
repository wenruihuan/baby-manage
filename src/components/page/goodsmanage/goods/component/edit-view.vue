<template>
    <div class="edit-view">
        <el-steps v-if="isEdit" :active="activeStep" simple>
            <el-step title="编辑基本信息" icon="el-icon-edit"></el-step>
            <el-step title="详情介绍" ></el-step>
        </el-steps>
        <el-form v-show="activeStep === 1" class="edit-form" ref="boxForm" :model="form" label-width="80px" :rules="isEdit ? rules : {}">
            <el-form-item label="名称:" prop="name">
                <el-input style="width: 300px;" v-if="isEdit" maxlength="100" v-model="form.name"></el-input>
                <span v-else>{{ form.name }}</span>
            </el-form-item>
            <el-form-item label="分类:" prop="kind_id">
                <el-select style="width: 300px;" v-if="isEdit" class="category-select" v-model="form.kind_id" placeholder="选择商品分类">
                    <el-option
                        v-for="item in categoryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <span v-else>{{ form.kind_name }}</span>
                <p class="tips" v-if="isEdit">一个商品对应一个分类，用于后台设置</p>
                <el-button v-if="isEdit" class="category-manage" type="text" @click="openDialog">管理商品分类</el-button>
            </el-form-item>
            <el-form-item label="标签:" prop="tag_ids">
                <el-select style="width: 300px;" v-if="isEdit" multiple class="category-select" v-model="form.tag_ids" placeholder="选择商品标签">
                    <el-option
                        v-for="item in tagList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <span v-else>{{ form.tag_name }}</span>
                <p class="tips" v-if="isEdit">一个商品可打多个标签，用于小程序端查找商品</p>
                <el-button v-if="isEdit" class="category-manage" type="text" @click="openServiceDialog">管理商品标签</el-button>
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
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <ul class="img-list" v-if="files.length > 0">
                    <li v-for="(item, index) in files"
                        :key="index"
                        class="img-item"
                    >
                        <span class="el-icon-circle-close remove-icon" @click="removeImg(index)"></span>
                        <img :src="item" alt=''>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="单位:" prop="unit">
                <el-input style="width: 300px;" v-if="isEdit" v-model="form.unit"></el-input>
                <span v-else>{{ form.unit }}</span>
            </el-form-item>
            <el-form-item label="规格:" prop="unit">
                <div class="size-group">
                    <div v-if="sizeGroup && sizeGroup.length > 0 && isEdit" v-for="(item, index) in sizeGroup" :key="index">
                        <div class="size-name">
                            <span>规格名：</span>
                            <el-input v-model="item.name"></el-input>
                        </div>
                        <div v-if="item.values && item.values.length > 0" class="size-value">
                            <span>规格值：</span>
                            <el-input
                                :key="index"
                                v-for="(innerItem, index) in item.values"
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
                            <li class="item" v-for="(innerItem, index) in item.values" :key="index">
                                {{ innerItem.value }}
                            </li>
                        </ul>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="成本价:" prop="original_price">
                <el-input style="width: 300px;" v-if="isEdit" v-model="form.original_price">
                    <template slot="prepend">￥</template>
                </el-input>
                <span v-else>￥{{ form.original_price }}</span>
            </el-form-item>
            <el-form-item label="售价:" prop="price">
                <el-input style="width: 300px;" v-if="isEdit" v-model="form.price">
                    <template slot="prepend">￥</template>
                </el-input>
                <span v-else>￥{{ form.price }}</span>
            </el-form-item>
        </el-form>
        <edit-wechat ref="editWechat" v-show="activeStep === 2" />
        <div class="btn-group" v-if="isEdit">
            <el-button :type="activeStep === 1 ? 'primary' : 'default'" @click="activeStep = activeStep === 1 ? 2 : 1">{{ activeStep === 1 ? '下一步' : '上一步' }}</el-button>
            <el-button v-if="activeStep === 2" type="primary" @click="handleSave">保存</el-button>
            <el-button class="btn-item" v-if="activeStep === 2" @click="setPublishStatus">{{ isPublish ? '下架' : '上架' }}</el-button>
            <el-popover
                ref="popover"
                v-if="activeStep === 2"
                placement="top-start"
                width="128"
                trigger="click"
                :popper-options="{ boundariesElement: 'viewport', removeOnDestroy: true }"
            >
                <div id="SERVICE_QRCODE" class="service-card"></div>
                <el-button class="btn-item" slot="reference" @click="handleView">预览</el-button>
            </el-popover>
            <el-button class="btn-item" v-if="activeStep === 2" @click="handleRemove">删除</el-button>
        </div>
        <box-category v-if="boxCategoryVisible" ref="boxCategory" />
        <service-manage v-if="serviceVisible" ref="serviceManage" />
    </div>
</template>

<script>
import BoxCategory from './box-category';
import ServiceManage from './service-manage';
import editWechat from './edit-wechat';
import {
    ERR_OK,
    getTagList,
    setPublish,
    removeBox,
    qrCodeView,
    addOrEditBox,
    getCategoryList,
    getDetail,
    getUploadToken
} from '@/components/page/goodsmanage/goods/api';
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
                tag_ids: '',
                kind_name: '',
                img_list: '',
                unit: '',
                sku: '',
                original_price: '',
                price: '',
                intr: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                kind_id: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                people_count: [
                    { required: true, message: '请输入人数', trigger: 'blur' }
                ]
            },
            boxCategoryVisible: false,
            categoryList: [],
            serviceVisible: false,
            tagList: [],
            isEdit: '',
            isPublish: false,
            files: [],
            sizeGroup: [],
            qrCode: null
        };
    },
    created() {
        const id = this.$route.query.id;
        this.isEdit = this.$route.query.isEdit === '1';
        this.isPublish = this.$route.query.isPublish === '1';
        this.getDetail(id);
        this.getCategory();
        this.getTagList();
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
                        const form = data.data;
                        form.tag_ids = form.tag_ids ? form.tag_ids.split(',') : [];
                        this.form = data.data;
                        this.files = this.form.img && this.form.img.split(',');
                        if (Array.isArray(this.form.sku)) {
                            this.sizeGroup = this.form.sku.map(item => {
                                return { ...item, values: item.value.map(i => ({ value: i })) };
                            });
                        }
                    }
                } catch (e) {
                    console.log(`goods edit-view.vue getDetail error: ${e}`);
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
        /* 获取商品分类下拉框 */
        async getCategory () {
            try {
                const data = await getCategoryList();
                if (data.code === ERR_OK) {
                    this.categoryList = data.data.data;
                }
            } catch (e) {
                console.log(`edit-view.vue getCategory error: ${e}`);
            }
        },
        /* 获取商品分类下拉框 */
        async getTagList () {
            try {
                const data = await getTagList();
                if (data.code === ERR_OK) {
                    this.tagList = data.data.data;
                }
            } catch (e) {
                console.log(`edit-view.vue getTagList error: ${e}`);
            }
        },
        /* 打开管理包厢分类的框 */
        openDialog () {
            this.boxCategoryVisible = true;
            this.$nextTick(() => {
                this.$refs.boxCategory.getCategoryList();
            });
        },
        /* 打开管理服务标签框 */
        openServiceDialog () {
            this.serviceVisible = true;
            this.$nextTick(() => {
                this.$refs.serviceManage.getTagList();
            });
        },
        nextStep () {
            this.activeStep = 2;
        },
        /* 保存 */
        handleSave () {
            this.$refs.boxForm.validate(async valid => {
                if (valid) {
                    try {
                        let { kind_name, ...obj } = this.form;
                        obj.img = this.files.join(',');
                        obj.sku = this.sizeGroup.map(item => ({
                            name: item.name,
                            value: item.values.map(i => i.value)
                        }));
                        obj.img_list = obj.img;
                        obj.tag_ids = Array.isArray(obj.tag_ids) && obj.tag_ids.length > 0 ? obj.tag_ids.join(',') : '';
                        obj.intr = this.$refs.editWechat.content;
                        const data = await addOrEditBox(obj);
                        if (data.code === ERR_OK) {
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            return true;
                        }
                    } catch (e) {
                        console.log(`src/components/page/goodsmanage/goods/component/edit-view.vue handleSave error: ${e}`);
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
                            value: item.values.map(i => i.value)
                        }));
                        obj.img_list = obj.img;
                        obj.intr = this.$refs.editWechat.content;
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
                                console.log(`src/components/page/goodsmanage/goods/component/edit-view.vue setPublishStatus error: ${e}`);
                            }
                        }
                    } catch (e) {
                        console.log(`src/components/page/goodsmanage/goods/component/edit-view.vue handleSave error: ${e}`);
                    }
                }
            });
        },
        /* 二维码预览 */
        async handleView () {
            try {
                let { kind_name, ...obj } = this.form;
                obj.img = this.files.join(',');
                obj.sku = this.sizeGroup.map(item => ({
                    ...item,
                    value: item.values.map(i => i.value)
                }));
                obj.img_list = obj.img;
                obj.intr = this.$refs.editWechat.content;
                const data = await qrCodeView(obj);
                const dom = document.getElementById("SERVICE_QRCODE");
                if (dom) {
                    dom.innerHTML = '';
                }
                if (data.code === ERR_OK) {
                    this.qrCode = data.data;
                    this.qrCode = new QRCode("SERVICE_QRCODE", {
                        text: data.data,
                        width: 128,
                        height: 128,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.L
                    });
                    this.$refs.popover.updatePopper();
                }
            } catch (e) {
                console.log(`src/components/page/goodsmanage/goods/component/edit-view.vue handleView error: ${e}`);
            }
        },
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
                console.log(`handleRemove error: ${e}`);
            }
        },
        /* 添加规格 */
        addSize () {
            this.sizeGroup.push({
                name: '',
                values: [{ value: '' }]
            });
        },
        /* 添加规格值 */
        addSizeValue (item) {
            item.values.push({ value: '' });
        },
        removeImg (index) {
            this.files.splice(index, 1);
        }
    }
};
</script>

<style lang='css' scoped>
.edit-view {
    background: white;
    box-sizing: border-box;
    padding: 30px 10px;
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
    left: 317px;
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
    position: relative;
}
.img-list .remove-icon {
    position: absolute;
    right: -5px;
    top: 0;
    cursor: pointer;
}
.img-list li img {
    max-width: 100px;
    display: inline-block;
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
.btn-item {
    margin-left: 10px;
}
</style>

<style>
.service-card img {
    margin: 0 auto;
}
</style>
