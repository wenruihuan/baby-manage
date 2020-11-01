<template>
    <div class="cika-container">
        <el-steps :active="activeStep" simple>
            <el-step title="编辑基本信息" icon="el-icon-edit"></el-step>
            <el-step title="详情介绍" ></el-step>
        </el-steps>
        <div class="content-container">
            <div class="title">
                <span class="text">卡信息</span>
            </div>
            <div class="content">
                <div class="card-opt">
                    <el-card class="box" shadow="never">
                        <div class="box-card">
                            <p class="main">有限次卡</p>
                            <p class="tip">支持创建多个服务集合的有限次数的次卡</p>
                        </div>
                    </el-card>
                    <el-card class="box" shadow="never">
                        <div class="box-card">
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
                        <edit-service v-if="rightsList" :rights-list="rightsList" ref="editService" />
                    </el-form-item>
                    <el-form-item label="购卡赠送:" prop="send">
                        <edit-service v-if="buyList" :rights-list="buyList" ref="sendService" />
                    </el-form-item>
                    <el-form-item label="有效时间:" prop="isInfinity">
                        <el-radio-group v-if="isEdit" v-model="form.isInfinity">
                            <el-radio label="1">永久有效</el-radio>
                            <el-radio label="0">
                                <el-input style="width: 90px" :disabled="form.isInfinity === 1" v-model="form.day" placeholder="自定义"></el-input>
                                <span style="margin-left: 5px;">天</span>
                            </el-radio>
                        </el-radio-group>
                        <span v-else>{{ form.is_needpay === '1' ? '需支付' : '无需支付' }}</span>
                    </el-form-item>
                    <el-form-item label="网店展示:" prop="is_show">
                        <el-radio-group v-if="isEdit" v-model="form.is_show">
                            <el-radio label="0">不展示</el-radio>
                            <el-radio label="1">展示</el-radio>
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
                    <el-radio-group v-model="form.isDefaultPic">
                        <el-radio label="0">默认背景图</el-radio>
                        <el-radio label="1">
                            <span>自定义图片</span>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <p class="tip2">1.网点展示如右图, 请按照该规范制作图片上传</p>
                            <p class="tip2">2.建议尺寸：750 x 90像素，小于1M</p>
                        </el-radio>
                    </el-radio-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import editService from './edit-service';
import buyCard from './buy-card';
import { serviceList } from '@/components/page/goodsmanage/card-item/mock';
import {
    ERR_OK,
    getTimeDetial,
    getDefaultPic,
} from '../api';

export default {
    components: {
        editService,
        buyCard
    },
    data () {
        return {
            activeStep: 1,
            isEdit: true,
            form: {
                name: '',
                price: '',
                validity: '',
                unlimit: '',
                is_publish: '',
                is_show: '',
                isInfinity: 1,
                is_custom_cover: '1',
                img: '',
                intr: '',
                right: [],
                gifts: []
            },
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
            defaultPic: '',
        };
    },
    created() {
        const id = this.$route.query.id;
        this.getTimeDetail(id);
        this.getDefaultImg();
    },
    methods: {
        /* 获取默认图片 */
        async getDefaultImg () {
            try {
                const data = await getDefaultPic();
                if (data.code === ERR_OK) {
                    this.defaultPic = data.data.time;
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
                       data.data.isInfinity = this.form.validity ? 0 : 1;
                       this.form = data.data;
                       this.rightsList = this.form.right || [];
                       this.buyList = this.form.gifts || [];
                   }
               } catch (e) {
                   console.log(`/page/goodsmanage/card-item/component/cika-edit.vue getTimeDetail error: ${e}`);
               }
           } else {
               this.rightsList = [];
               this.buyList = [];
           }
        }
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
</style>
