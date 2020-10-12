<template>
    <div class="edit-view">
        <el-form class="edit-form" ref="boxForm" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="名称" prop="name" required>
                <el-input maxlength="100" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="编号" prop="box_no">
                <el-input v-model="form.box_no" placehodler="例如：bx001"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="kind_id" required>
                <el-select class="category-select" v-model="form.kind_id" placeholder="选择包厢分类">
                    <el-option
                        v-for="item in categoryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <p class="tips">一个商品对应一个分类，用于后台设置</p>
                <el-button class="category-manage" type="text" @click="openDialog">管理包厢分类</el-button>
            </el-form-item>
            <el-form-item label="图片" prop="img">
                <el-upload
                    action="http://up-z0.qiniu.com"
                    list-type="picture-card"
                    :data="uploadBody"
                    :before-upload="beforeUpload"
                    :on-success="handleUploadSuccess"
                    :before-remove="() => false"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
<!--                <el-input v-model="form.img"></el-input>-->
            </el-form-item>
            <el-form-item label="人数" prop="people_count" required>
                <el-input v-model="form.people_count"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="form.price">
                    <template slot="prepend">￥</template>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button @click="setPublishStatus">上架</el-button>
            <el-button>删除</el-button>
        </div>
        <box-category v-if="boxCategoryVisible" ref="boxCategory" />
    </div>
</template>

<script>
import BoxCategory from './box-category';
import {
    addOrEditBox,
    ERR_OK,
    getCategoryList,
    getDetail,
    getUploadToken
} from '@/components/page/goodsmanage/box/api';

export default {
    components: {
        BoxCategory
    },
    data () {
        return {
            uploadBody: {
                token: '',
                key: ''
            },
            form: {
                name: '',
                box_no: '',
                kind_id: '',
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
            categoryList: []
        };
    },
    created() {
        const id = this.$route.query.id;
        this.getDetail(id);
        this.getCategory();
        this.getUploadToken();
    },
    methods: {
        /* 获取上传图片的token */
        async getUploadToken () {
            try{
                const data = await getUploadToken();
                if (data.code === ERR_OK) {
                    this.uploadBody.token = data.data.uptoken;
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
            console.log(res);
            console.log(file);
        },
        /* 获取包厢分类下拉框 */
        async getCategory () {
            try {
                const data = await getCategoryList();
                if (data.code === ERR_OK) {
                    this.categoryList = data.data.data.map(item => ({
                        ...item,
                        id: Number(item.id)
                    }));
                }
            } catch (e) {
                console.log(`edit-view.vue getCategory error: ${e}`);
            }
        },
        /* 打开管理包厢分类的框 */
        openDialog () {
            this.boxCategoryVisible = true;
            this.$nextTick(() => {
                this.$refs.boxCategory.getCategoryList();
            });
        },
        /* 保存 */
        handleSave () {
            this.$refs.boxForm.validate(async valid => {
                if (valid) {
                    try {
                        const data = await addOrEditBox(this.form);
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
</style>
