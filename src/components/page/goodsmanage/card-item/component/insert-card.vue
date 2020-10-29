<template>
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
                <el-form class="edit-form" ref="boxForm" :model="form" label-width="100px" :rules="isEdit ? rules : {}">
                    <el-form-item label="名称:" prop="name">
                        <el-input class="card-input" v-if="isEdit" maxlength="100" v-model="form.name"></el-input>
                        <span v-else>{{ form.name }}</span>
                    </el-form-item>
                    <el-form-item label="充值金额:" prop="price">
                        <el-input class="card-input" v-if="isEdit" v-model="form.price">
                            <template slot="prepend">￥</template>
                        </el-input>
                        <p v-if="isEdit" class="tip">可支持原价购买所有服务和产品，及次卡</p>
                        <span v-else>￥{{ form.price }}</span>
                    </el-form-item>
                    <el-form-item label="赠送金额:" prop="gifts_amount">
                        <el-input class="card-input" v-if="isEdit" v-model="form.gifts_amount">
                            <template slot="prepend">￥</template>
                        </el-input>
                        <p class="tip" v-if="isEdit">保存后赠送金额不可修改，请谨慎填写</p>
                        <span v-else>￥{{ form.gifts_amount }}</span>
                    </el-form-item>
                    <el-form-item label="权益:" prop="access">
                        <edit-quanlity v-if="rightsList" :rights-list="rightsList" ref="editQuanlity" />
                    </el-form-item>
                    <el-form-item label="购卡赠送:" prop="send">
                        <send-card v-if="buyList" :buy-list="buyList" ref="buyCard" />
                    </el-form-item>
                    <el-form-item label="有效时间:" prop="isInfinity">
                        <el-radio-group v-if="isEdit" v-model="isInfinity">
                            <el-radio :label="1">永久有效</el-radio>
                            <el-radio :label="0">
                                <el-input style="width: 90px" :disabled="!form.validity" v-model="form.validity" placeholder="自定义"></el-input>
                                <span style="margin-left: 5px;">天</span>
                            </el-radio>
                        </el-radio-group>
                        <span v-else>{{ form.validity }}</span>
                    </el-form-item>
                    <el-form-item label="网店展示:" prop="is_show">
                        <el-radio-group v-if="isEdit" v-model="form.is_show">
                            <el-radio :label="0">不展示</el-radio>
                            <el-radio :label="1">展示</el-radio>
                        </el-radio-group>
                        <span v-else>{{ form.is_show === '1' ? '展示' : '不展示' }}</span>
                    </el-form-item>
                </el-form>
            </div>
            <div class="title">
                <span class="text">卡样式</span>
            </div>
            <div class="content">
                <div class="left">
                    <el-radio-group v-model="form.is_custom_cover">
                        <el-radio :label="0">默认背景图</el-radio>
                        <el-radio :label="1">
                            <span>自定义图片</span>
                            <el-upload
                                v-if="isEdit"
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
                        <img :src="form.img  || defaultPic" alt="">
                    </div>
                </div>
            </div>
        </div>
        <edit-wechat ref="editWechat" :html="form.intr" v-if="form.intr !== null" v-show="activeStep === 2" />
        <div class="btn-group" v-if="isEdit">
            <el-button :type="activeStep === 1 ? 'primary' : 'default'" @click="activeStep = activeStep === 1 ? 2 : 1">{{ activeStep === 1 ? '下一步' : '上一步' }}</el-button>
            <el-button v-if="activeStep === 2" type="primary" @click="handleSave">保存</el-button>
            <el-button class="btn-item" v-if="activeStep === 2" @click="setPublishStatus">{{ isPublish ? '下架' : '上架' }}</el-button>
            <el-popover
                v-if="activeStep === 2"
                placement="top-start"
                width="260"
                trigger="click"
            >
                <div id="SERVICE_QRCODE"></div>
                <el-button class="btn-item" slot="reference" @click="handleView">预览</el-button>
            </el-popover>
            <el-button class="btn-item" v-if="activeStep === 2" @click="handleRemove">删除</el-button>
        </div>
    </div>
</template>

<script>
import editQuanlity from './edit-quanlity';
import sendCard from './send-card';
import { serviceList } from '@/components/page/goodsmanage/card-item/mock';
import {
    ERR_OK,
    getDefaultPic,
    getInsertDetail, previewQr,
    removeCard,
    saveRechargeCard, setPublish
} from '@/components/page/goodsmanage/card-item/api';
import editWechat from '@/components/page/goodsmanage/card-item/component/edit-wechat';
import { getUploadToken } from '@/components/page/goodsmanage/goods/api';
import QRCode from 'qrcodejs2';

export default {
    components: {
        editQuanlity,
        sendCard,
        editWechat
    },
    data () {
        return {
            activeStep: 1,
            isEdit: true,
            form: {
                name: '',
                price: '',
                gifts_amount: '',
                expire_day: '',
                is_show: '',
                is_custom_cover: 0,
                validity: '',
                intr: null,
                img: ''
            },
            isInfinity: 1,
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请选择分类', trigger: 'blur' }
                ],
                expire_day: [
                    { required: true, message: '请选择有效时间', trigger: 'change' }
                ]
            },
            /* 权益list */
            rightsList: null,
            /* 赠送list */
            buyList: null,
            isPublish: 0,
            baseUrl: '',
            uploadBody: {
                token: '',
                key: ''
            },
            defaultPic: ''
        };
    },
    created() {
        const id = this.$route.query.id;
        this.getUploadToken();
        this.getDefaultImg();
        this.getInsertDetail(id);
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
        /* 获取默认图片 */
        async getDefaultImg () {
            try {
                const data = await getDefaultPic();
                if (data.code === ERR_OK) {
                    this.defaultPic = data.data.recharge;
                }
            } catch (e) {
                console.log(`src/components/page/goodsmanage/card-item/component/cika-view.vue error: ${e}`);
            }
        },
        async getInsertDetail (card_id = '') {
            if (card_id) {
               try {
                   const data = await getInsertDetail({ card_id });
                   if (data.code === ERR_OK) {
                       this.form.intr = '';
                       this.form = data.data;
                       this.rightsList = data.data.right || [];
                       this.buyList = data.data.gifts || [];
                       this.isInfinity = data.data.validity ? 0 : 1;
                   }
               } catch (e) {
                   console.log(`src/components/page/goodsmanage/card-item/component/insert-card.vue getInsertDetail error: ${e}`);
               }
            } else {
                this.rightsList = [];
                this.form.intr = '';
            }
        },
        /* 上传之前 */
        beforeUpload (file) {
            this.uploadBody.key = file.name;
            return true;
        },
        /* 成功上传 */
        handleUploadSuccess (res, file) {
            this.form.img = `${ this.baseUrl }/${ file.name }`;
        },
        /* 保存 */
        handleSave () {
            this.form.intr = this.$refs.editWechat.content;
            saveRechargeCard(this.form).then(data => {
                if (data.code === ERR_OK) {
                    this.$message({
                        type: 'success',
                        message: data.msg
                    });
                }
            });
        },
        /* 设置上下架状态 */
        setPublishStatus () {
            this.isPublish = this.isPublish === '1' ? '0' : '1';
            this.form.intr = this.$refs.editWechat.content;
            saveRechargeCard(this.form).then(data => {
                if (data.code === ERR_OK) {
                    const id = this.$route.query.id;
                    setPublish({ id, is_publish: this.isPublish  }).then(data => {
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
                const data = await previewQr(this.form);
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
                }
            } catch (e) {
                console.log(`/goodsmanage/card-item/component/insert-card.vue handleView error: ${ e }`);
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
                    console.log(`src/components/page/goodsmanage/card-item/component/insert-card-view.vue handleRemove error: ${e}`);
                }
            }
        },
    }
};
</script>

<style lang="css" scoped>
.cika-container {
    padding: 10px 15px;
    background: white;
}
.cika-container .content-container {
    margin-top: 20px;
}
.cika-container .content-container .title {
    background: #eeeeee;
    height: 30px;
    line-height: 30px;
    padding: 10px;
}
.cika-container .content-container .title .text {
    position: relative;
    padding-left: 5px;
}
.cika-container .content-container .title .text:before {
    width: 3px;
    height: 100%;
    content: ' ';
    display: inline-block;
    position: absolute;
    left: 0;
    top: -2px;
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
    width: 100%;
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
.content {
    display: flex;
    justify-content: space-around;
    align-items: start;
}
.content .img-container img {
    max-width: 100%;
}
</style>
