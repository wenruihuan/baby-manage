<template>
    <div class="edit-view">
        <el-steps :active="activeStep" simple>
            <el-step title="编辑基本信息" icon="el-icon-edit"></el-step>
            <el-step title="详情介绍" ></el-step>
        </el-steps>
        <el-form class="edit-form" ref="boxForm" :model="form" label-width="80px" :rules="isEdit ? rules : {}">
            <el-form-item label="名称:" prop="name">
                <el-input v-if="isEdit" maxlength="100" v-model="form.name"></el-input>
                <span v-else>{{ form.name }}</span>
            </el-form-item>
            <el-form-item label="分类:" prop="kind_id">
                <el-select v-if="isEdit" class="category-select" v-model="form.kind_id" placeholder="选择商品分类">
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
                <el-select v-if="isEdit" class="category-select" v-model="form.tag_ids" placeholder="选择商品标签">
                    <el-option
                        v-for="item in tagList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <span v-else>{{ form.tag_names }}</span>
                <p class="tips" v-if="isEdit">一个商品可打多个标签，用于小程序端查找商品</p>
                <el-button v-if="isEdit" class="category-manage" type="text" @click="openServiceDialog">管理商品标签</el-button>
            </el-form-item>
            <el-form-item label="图片:" prop="img">
                <el-upload
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
            </el-form-item>
            <el-form-item label="单位:" prop="unit">
                <el-input v-if="isEdit" v-model="form.unit"></el-input>
                <span v-else>{{ form.unit }}</span>
            </el-form-item>
<!--            <el-form-item label="规格:" prop="unit">-->
<!--                <el-input v-if="isEdit" v-model="form.unit"></el-input>-->
<!--                <span v-else>{{ form.unit }}</span>-->
<!--            </el-form-item>-->
            <el-form-item label="成本价:" prop="cost_price">
                <el-input v-if="isEdit" v-model="form.cost_price">
                    <template slot="prepend">￥</template>
                </el-input>
                <span v-else>{{ form.cost_price }}</span>
            </el-form-item>
            <el-form-item label="售价:" prop="price">
                <el-input v-if="isEdit" v-model="form.price">
                    <template slot="prepend">￥</template>
                </el-input>
                <span v-else>{{ form.price }}</span>
            </el-form-item>
        </el-form>
        <div class="btn-group" v-if="isEdit">
            <el-button type="primary" @click="activeStep = 2">下一步</el-button>
        </div>
        <box-category v-if="boxCategoryVisible" ref="boxCategory" />
        <service-manage v-if="serviceVisible" ref="serviceManage" />
    </div>
</template>

<script>
import BoxCategory from './box-category';
import ServiceManage from './service-manage';

import {
    addOrEditBox,
    ERR_OK,
    getCategoryList,
    getDetail,
    getUploadToken, removeBox, setPublish
} from '@/components/page/goodsmanage/box/api';
import { getTagList } from '@/components/page/goodsmanage/goods/api';

export default {
    components: {
        BoxCategory,
        ServiceManage
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
                box_no: '',
                kind_id: '',
                kind_name: '',
                img: '',
                people_count: '',
                price: ''
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
            files: []
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
                        this.form = data.data;
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
        /* 保存 */
        handleSave () {
            this.$refs.boxForm.validate(async valid => {
                if (valid) {
                    try {
                        let { kind_name, ...obj } = this.form;
                        obj.img = this.files.join(',');
                        const data = await addOrEditBox(obj);
                        if (data.code === ERR_OK) {
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                        }
                    } catch (e) {
                        console.log(`handleSave error: ${e}`);
                    }
                }
            });
        },
        /* 上下架状态 */
        async setPublishStatus () {
            this.handleSave();
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
                console.log(`setPublishStatus error: ${e}`);
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
    width: 30%;
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
</style>
