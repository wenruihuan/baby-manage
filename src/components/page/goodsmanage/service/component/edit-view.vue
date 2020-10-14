<template>
    <div class="edit-view">
        <el-form class="edit-form" ref="boxForm" :model="form" label-width="80px" :rules="isEdit ? rules : {}">
            <el-form-item label="名称:" prop="name">
                <el-input v-if="isEdit" maxlength="100" v-model="form.name"></el-input>
                <span v-else>{{ form.name }}</span>
            </el-form-item>
            <el-form-item label="分类:" prop="kind_id">
                <el-select v-if="isEdit" class="category-select" v-model="form.kind_id" placeholder="选择包厢分类">
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
                <el-select v-if="isEdit" class="category-select" v-model="form.tag_ids" placeholder="选择服务标签">
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
            <el-form-item label="规格:" prop="people_count">
                <el-input v-if="isEdit" v-model="form.people_count"></el-input>
                <span v-else>{{ form.people_count }}</span>
            </el-form-item>
            <el-form-item label="售价:" prop="price">
                <el-input v-if="isEdit" v-model="form.price">
                    <template slot="prepend">￥</template>
                </el-input>
                <span v-else>{{ form.price }}</span>
            </el-form-item>
            <el-form-item label="划线价:" prop="original_price">
                <el-input v-if="isEdit" v-model="form.original_price" placeholder="原价：￥99.99"></el-input>
                <span v-else>{{ form.original_price }}</span>
            </el-form-item>
            <el-form-item label="服务时长:" prop="service_time">
                <el-input v-if="isEdit" v-model="form.service_time">
                    <template slot="suffix">分钟</template>
                </el-input>
                <span v-else>{{ form.service_time }}分钟</span>
            </el-form-item>
            <el-form-item label="线上预约:" prop="is_needpay">
                <el-radio-group v-if="isEdit" v-model="form.is_needpay">
                    <el-radio :label="0">无需支付</el-radio>
                    <el-radio :label="1">需支付</el-radio>
                </el-radio-group>
                <span v-else>{{ form.is_needpay === '1' ? '需支付' : '无需支付' }}</span>
            </el-form-item>
            <el-form-item label="服务方式:" prop="is_todoor">
                <el-radio-group v-if="isEdit" v-model="form.is_todoor">
                    <el-radio :label="0">到店</el-radio>
                    <el-radio :label="1">上门</el-radio>
                </el-radio-group>
                <span v-else>{{ form.is_todoor === '1' ? '上门' : '到店' }}</span>
            </el-form-item>
            <el-form-item label="网店展示:" prop="is_show">
                <el-radio-group v-if="isEdit" v-model="form.is_show">
                    <el-radio :label="0">不展示</el-radio>
                    <el-radio :label="1">展示</el-radio>
                </el-radio-group>
                <span v-else>{{ form.is_show === '1' ? '展示' : '不展示' }}</span>
            </el-form-item>
        </el-form>
        <div class="btn-group" v-if="isEdit">
            <el-button type="primary" @click="handleSave">下一步</el-button>
        </div>
        <box-category v-if="boxCategoryVisible" ref="boxCategory" />
        <service-manage v-if="serviceManageVisible" ref="serviceManage" />
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
    getUploadToken, removeBox, setPublish,
    getServiceTags
} from '@/components/page/goodsmanage/service/api';

export default {
    components: {
        BoxCategory,
        ServiceManage
    },
    data () {
        return {
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
                img: '',
                price: '',
                is_todoor: '',
                service_time: '',
                need_pay: '',
                original_price: '',
                tag_ids: '',
                is_show: ''
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
            serviceManageVisible: false,
            categoryList: [],
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
                const data = await getCategoryList();
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
                        console.log(`service edit-view handleSave error: ${e}`);
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
</style>
