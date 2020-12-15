<template>
    <div>
        <BreadcrumbList :breadcrumbList="breadcrumbList" />
        <div class="cika-container">
            <el-steps :active="activeStep" simple>
                <el-step title="编辑基本信息" icon="el-icon-edit"></el-step>
                <el-step title="详情介绍" ></el-step>
            </el-steps>
            <div class="content-container" v-show="activeStep === 1">
                <div class="title">
                    <span class="text">卡信息</span>
                </div>
                <div class="content">
                    <div class="card-opt">
                        <el-card class="box" shadow="never" :style="{ border: form.unlimit === 0 ? '1px solid #409EFF' : '' }">
                            <div class="box-card" @click="handleClickCard(0)">
                                <p class="main">有限次卡</p>
                                <p class="tip">支持创建多个服务集合的有限次数的次卡</p>
                            </div>
                        </el-card>
                        <el-card class="box" shadow="never" :style="{ border: form.unlimit === 1 ? '1px solid #409EFF' : '' }">
                            <div class="box-card" @click="handleClickCard(1)">
                                <p class="main">不限次卡</p>
                                <p class="tip">支持创建多个服务集合的不限次数的次卡</p>
                            </div>
                        </el-card>
                    </div>
                    <el-form class="edit-form" ref="boxForm" :model="form" label-width="100px" :rules="isEdit ? rules : {}">
                        <el-form-item label="名称:" prop="name">
                            <el-input class="card-input" v-if="isEdit" maxlength="100" v-model="form.name"></el-input>
                            <span v-else>{{ form.name }}</span>
                        </el-form-item>
                        <el-form-item label="售价:" prop="price">
                            <el-input class="card-input" v-if="isEdit" v-model="form.price">
                                <template slot="prepend">￥</template>
                            </el-input>
                            <span v-else>{{ form.price }}</span>
                        </el-form-item>
                        <el-form-item label="权益:" prop="access">
                            <edit-service v-if="rightsList" :rights-list="rightsList" :unlimit="form.unlimit" ref="editService" @save="saveRights" />
                        </el-form-item>
                        <el-form-item label="购卡赠送:" prop="send">
                            <edit-service v-if="buyList" :rights-list="buyList" type="send" ref="sendService" @save="saveSends" />
                        </el-form-item>
                        <el-form-item label="有效时间:" prop="isInfinity">
                            <el-radio-group v-model="form.isInfinity">
                                <el-radio :label="1">永久有效</el-radio>
                                <el-radio :label="0">
                                    <el-input style="width: 90px" :disabled="form.isInfinity === 1" v-model="form.validity" placeholder="自定义"></el-input>
                                    <span style="margin-left: 5px;">天</span>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="show-online" label="网店展示:" prop="is_show">
                            <el-radio-group v-model="form.is_show">
                                <el-radio :label="0">不展示</el-radio>
                                <el-radio class="radio-label1" :label="1">展示</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="title">
                    <span class="text">卡样式</span>
                </div>
                <div class="content1">
                    <div class="left">
                        <p class="card-start">卡片封面</p>
                        <el-radio-group class="pic-choose" v-model="form.is_custom_cover" @change="handleChangeImg">
                            <el-radio :label="0">默认背景图</el-radio>
                            <el-radio :label="1">
                                <span>自定义图片</span>
                                <el-upload
                                    :show-file-list="false"
                                    action="http://up-z0.qiniu.com"
                                    list-type="picture-card"
                                    :data="uploadBody"
                                    :before-upload="beforeUpload"
                                    :on-success="handleUploadSuccess"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <p class="tip2">1.网点展示如右图, 请按照该规范制作图片上传</p>
                                <p class="tip2">2.建议尺寸：750 x 90像素，小于1M</p>
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <div class="right">
                        <div class="img-container">
                            <img :src="form.img" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <edit-wechat ref="editWechat" :html="form.intr" v-if="form.intr !== null" v-show="activeStep === 2" />
            <div class="btn-group">
                <el-button :type="activeStep === 1 ? 'primary' : 'default'" @click="nextStep">{{ activeStep === 1 ? '下一步' : '上一步' }}</el-button>
                <el-button v-if="activeStep === 2" type="primary" @click="handleSave">保存</el-button>
                <el-button class="btn-item" v-if="activeStep === 2" @click="setPublishStatus">{{ isPublish ? '下架' : '上架' }}</el-button>
                <el-popover
                    ref="popover"
                    v-if="activeStep === 2"
                    placement="top"
                    width="128"
                    trigger="click"
                    :popper-options="{ boundariesElement: 'viewport', removeOnDestroy: true }"
                >
                    <div id="SERVICE_QRCODE" class="service-card"></div>
                    <el-button class="btn-item" slot="reference" @click="handleView">预览</el-button>
                </el-popover>
                <el-button class="btn-item" v-if="activeStep === 2" @click="handleRemove">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import editWechat from '@/components/page/goodsmanage/card-item/component/edit-wechat';
import editService from './edit-service';
import buyCard from './buy-card';
import {
    ERR_OK,
    getTimeDetial,
    getDefaultPic, setPublish, removeCard, saveTimeCard, getTimeQrcode
} from '../api';
import QRCode from 'qrcodejs2';
import { getUploadToken } from '@/components/page/goodsmanage/goods/api';
import BreadcrumbList from '@/components/common/address.vue';

export default {
    components: {
        BreadcrumbList,
        editService,
        buyCard,
        editWechat
    },
    data () {
        return {
            breadcrumbList: [
                { name: '添加/编辑卡项' }
            ],
            activeStep: 1,
            isPublish: false,
            isEdit: true,
            form: {
                name: '',
                price: '',
                validity: '',
                unlimit: '',
                is_publish: '',
                is_show: '',
                isInfinity: 1,
                is_custom_cover: 0,
                img: '',
                intr: null,
                right: [],
                gifts: []
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入售价', trigger: 'blur' }
                ],
                expire_day: [
                    { required: true, message: '请选择有效时间', trigger: 'change' }
                ]
            },
            /* 权益list */
            rightsList: null,
            /* 赠送list */
            buyList: null,
            defaultPic: '',
            /* 权益list */
            baseUrl: '',
            uploadBody: {
                token: '',
                key: ''
            },
            qrCode: '',
            customImg: ''
        };
    },
    created() {
        const id = this.$route.query.id;
        this.getTimeDetail(id);
        this.getDefaultImg(id);
        this.getUploadToken();
    },
    methods: {
        /* 切换图片 */
        handleChangeImg (value) {
            if (value == 0) {
                this.form.img = this.defaultPic;
            } else {
                this.form.img = this.customImg;
            }
        },
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
        /* 获取默认图片 */
        async getDefaultImg (id) {
            try {
                const data = await getDefaultPic();
                if (data.code === ERR_OK) {
                    this.defaultPic = data.data.time;
                    if (!id) {
                        this.form.img = this.defaultPic;
                    }
                }
            } catch (e) {
                console.log(`src/components/page/goodsmanage/card-item/component/cika-edit.vue error: ${e}`);
            }
        },
        /* 详情 */
        async getTimeDetail (id = '') {
           if (id) {
               try {
                   const data = await getTimeDetial({ id });
                   if (data.code === ERR_OK) {
                       this.form.intr = '';
                       data.data.isInfinity = data.data.validity == -1 ? 0 : 1;
                       this.form = data.data;
                       this.rightsList = this.form.right || [];
                       this.buyList = this.form.gifts || [];
                       this.isPublish = this.form.is_publish == 1;
                       this.customImg = this.form.img || '';
                   }
               } catch (e) {
                   console.log(`/page/goodsmanage/card-item/component/cika-edit.vue getTimeDetail error: ${e}`);
               }
           } else {
               this.rightsList = [];
               this.buyList = [];
               this.form.intr = '';
           }
        },
        /* 点击card触发 */
        handleClickCard (value) {
            this.form.unlimit = value;
        },
        /* 上传之前 */
        beforeUpload (file) {
            this.uploadBody.key = file.name;
            return true;
        },
        /* 成功上传 */
        handleUploadSuccess (res, file) {
            this.form.img = `${ this.baseUrl }/${ file.name }`;
            this.customImg = this.form.img;
        },
        nextStep () {
            if (this.activeStep === 2) {
                this.activeStep = 1;
                return false;
            }
            this.$refs.boxForm.validate(async valid => {
                if (valid && this.activeStep === 1) {
                    this.activeStep = 2;
                }
            });
        },
        /* 保存 */
        handleSave () {
            this.form.intr = this.$refs.editWechat.content;
            const right = this.form.right.map(item => ( this.form.unlimit === 1 ? { ...item, time: -1 } : item ));
            this.form.validity = this.form.isInfinity === 1 ? -1 : this.form.validity;
            saveTimeCard({ ...this.form, right }).then(data => {
                if (data.code === ERR_OK) {
                    this.$message({
                        type: 'success',
                        message: data.msg
                    });
                    this.$router.push('/card-item');
                }
            });
        },
        /* 设置上下架状态 */
        setPublishStatus () {
            this.isPublish = this.isPublish === 1;
            this.form.intr = this.$refs.editWechat.content;
            saveTimeCard(this.form).then(data => {
                const id = data.data.id || '';
                if (data.code === ERR_OK) {
                    setPublish({ id, is_publish: this.isPublish ? 1 : 0 }).then(data => {
                        if (data.code === ERR_OK) {
                            this.$message({
                                type: 'success',
                                message: data.msg
                            });
                        }
                    });
                }
            });
        },
        /* 二维码预览 */
        async handleView () {
            try {
                this.form.intr = this.$refs.editWechat.content;
                const data = await getTimeQrcode(this.form);
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
                console.log(`/goodsmanage/card-item/component/time-card.vue handleView error: ${ e }`);
            }
        },
        /* 删除 */
        async handleRemove () {
            const id = this.$route.query.id;
            if (id) {
                try {
                    const data = await removeCard({ id });
                    if (data.code === ERR_OK) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                    }
                } catch (e) {
                    console.log(`src/components/page/goodsmanage/card-item/component/time-card.vue handleRemove error: ${e}`);
                }
            }
        },
        saveRights (list) {
            this.rightsList = list;
            this.form.right = list;
        },
        saveSends (list) {
            this.buyList = list;
            this.form.gifts = list;
        }
    }
};
</script>

<style lang="css" scoped>
.radio-label1 {
    margin-left: 15px;
}
.content, .content1 {
    padding: 10px 50px;
    overflow: auto;
}
.card-start {
    margin-bottom: 10px;
    margin-left: 21px;
    color: #606266;
}
.pic-choose {
    flex-direction: column;
    align-items: flex-start!important;
}
.pic-choose .el-radio:first-child {
    margin-bottom: 15px;
}
.show-online {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.show-online /deep/ .el-form-item__content {
    margin-left: 0!important;
}
.cika-container {
    padding: 30px 15px;
    background: white;
}
.cika-container .content-container {
    margin-top: 20px;
    background: white;
}
.cika-container .content-container .title {
    background: #eeeeee;
    height: 30px;
    line-height: 30px;
    padding: 10px;
}
.cika-container .content-container .title .text {
    position: relative;
    padding-left: 10px;
}
.cika-container .content-container .title .text:before {
    width: 3px;
    height: 100%;
    content: ' ';
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0px;
    background: dodgerblue;
}
.card-opt {
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-opt .box {
    margin-right: 15px;
    cursor: pointer;
}
.box-card {
    text-align: center;
}
.box-card .main {
    font-size: 18px;
    line-height: 30px;
}
.box-card .tip {
    color: #dddddd;
    font-size: 13px;
}
.edit-form {
    margin-top: 20px;
}
.card-input {
    width: 300px;
}
/deep/ .el-radio-group {
    display: flex;
    justify-content: flex-start;
}
/deep/ .el-upload {
    width: 100px;
    height: 100px;
    margin-top: 5px;
}
/deep/ .el-upload .el-icon-plus {
    position: relative;
    top: -16px;
}
.tip2 {
    line-height: 25px;
    margin-top: 5px;
    font-size: 12px;
    color: #999999;
}
/deep/ .el-radio-group {
    align-items: center;
}
.btn-group {
    text-align: center;
}
.btn-item {
    margin-left: 10px;
}
.tip {
    margin-left: 5px;
    color: #dddddd;
    font-size: 12px;
}
.content1 {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: start;
}
.content1 .img-container img {
    max-width: 400px;
}
</style>

<style>
.service-card img {
    margin: 0 auto;
}
</style>
