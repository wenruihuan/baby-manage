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
                    <el-form class="edit-form" ref="boxForm" :model="form" label-width="100px" :rules="isEdit ? rules : {}">
                        <el-form-item label="名称:" prop="name">
                            <el-input class="card-input" v-if="isEdit" placeholder="长度为1-100个字" maxlength="100" v-model="form.name"></el-input>
                            <span v-else>{{ form.name }}</span>
                        </el-form-item>
                        <el-form-item label="充值金额:" prop="price">
                            <el-input class="card-input" v-if="isEdit" v-model="form.price">
                                <template slot="prepend">￥</template>
                            </el-input>
                            <p v-if="isEdit" class="tip">可支持原价购买所有服务和产品，及次卡</p>
                            <span v-else>￥{{ form.price }}</span>
                        </el-form-item>
                        <el-form-item label="赠送金额:" prop="gift_price">
                            <el-input class="card-input" v-if="isEdit" v-model="form.gift_price">
                                <template slot="prepend">￥</template>
                            </el-input>
                            <p class="tip" v-if="isEdit">保存后赠送金额不可修改，请谨慎填写</p>
                            <span v-else>￥{{ form.gift_price }}</span>
                        </el-form-item>
                        <el-form-item label="权益:" prop="access">
                            <edit-quanlity v-if="rightsList" :rights-list="rightsList" ref="editQuanlity" @save="saveRights" />
                        </el-form-item>
                        <el-form-item label="购卡赠送:" prop="send">
                            <send-card v-if="buyList" :buy-list="buyList" ref="buyCard" @save="saveBuyCard" />
                        </el-form-item>
                        <el-form-item label="有效时间:" prop="isInfinity">
                            <el-radio-group v-model="form.isInfinity" @change="changeValidity">
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
                <div class="content">
                    <div class="left">
                        <p class="card-start">卡片封面:</p>
                        <el-radio-group class="pic-choose" v-model="form.is_custom_cover" @change="changePic">
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
                    <div class="right-img-container">
                        <div class="img-container">
                            <img :src="form.img" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <edit-wechat ref="editWechat" :html="form.intr" v-if="form.intr !== null" v-show="activeStep === 2" />
            <div class="btn-group" v-if="isEdit">
                <el-button :type="activeStep === 1 ? 'primary' : 'default'" @click="nextStep">{{ activeStep === 1 ? '下一步' : '上一步' }}</el-button>
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
        </div>
    </div>
</template>

<script>
import editQuanlity from './edit-quanlity';
import sendCard from './send-card';
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
import BreadcrumbList from '@/components/common/address.vue';

export default {
    components: {
        editQuanlity,
        sendCard,
        editWechat,
        BreadcrumbList
    },
    data () {
        return {
            breadcrumbList: [
                { name: '添加/编辑卡项' }
            ],
            activeStep: 1,
            isEdit: true,
            form: {
                name: '',
                price: '',
                gifts_price: '',
                expire_day: '',
                is_show: '',
                isInfinity: 1,
                is_custom_cover: 0,
                validity: '',
                intr: null,
                img: ''
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
            isPublish: 0,
            baseUrl: '',
            uploadBody: {
                token: '',
                key: ''
            },
            defaultPic: '',
            customImg: ''
        };
    },
    created() {
        const id = this.$route.query.id;
        this.getUploadToken();
        this.getDefaultImg(id);
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
        async getDefaultImg (id) {
            try {
                const data = await getDefaultPic();
                if (data.code === ERR_OK) {
                    this.defaultPic = data.data.recharge;
                    if (!id) {
                        this.form.img = this.defaultPic;
                    }
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
                       data.data.data.isInfinity = this.form.validity == -1 ? 0 : 1;
                       this.form = data.data.data;
                       this.rightsList = this.form.right || [];
                       this.buyList = this.form.gifts || [];
                       this.customImg = this.form.img || '';
                   }
               } catch (e) {
                   console.log(`src/components/page/goodsmanage/card-item/component/insert-card.vue getInsertDetail error: ${e}`);
               }
            } else {
                this.rightsList = [];
                this.buyList = [];
                this.form.intr = '';
            }
        },
        /* 选择默认封面 */
        changePic (value) {
            if (value == 0) {
                this.form.img = this.defaultPic;
            } else {
                this.form.img = this.customImg || '';
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
            this.form.validity = this.form.isInfinity === 1 ? -1 : this.form.validity;
            saveRechargeCard(this.form).then(data => {
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
            this.isPublish = this.isPublish === '1' ? '0' : '1';
            this.form.intr = this.$refs.editWechat.content;
            saveRechargeCard(this.form).then(data => {
                const id = data.data.id || '';
                if (data.code === ERR_OK) {
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
                    const dom = document.getElementById("SERVICE_QRCODE");
                    if (dom) {
                        dom.innerHTML = '';
                    }
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
        /* 修改有效日期 */
        changeValidity (value) {
            this.form.isInfinity = value;
            this.form.validity = value === 1 ? '' : this.form.validity;
        },
        /* 暂时保存权益 */
        saveRights (list) {
            this.form.right = list;
            this.rightsList = list;
        },
        /* 暂时保存赠送权益 */
        saveBuyCard (list) {
            this.form.gifts = list;
            this.buyList = list;
        }
    }
};
</script>

<style lang="css" scoped>
.radio-label1 {
    margin-left: 15px;
}
.content {
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
.content {
    display: flex;
    justify-content: space-around;
    align-items: start;
}
.content .img-container img {
    max-width: 400px;
}
.right-img-container {
    width: 300px;
}
</style>
