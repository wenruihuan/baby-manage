<template>
    <div>
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
        <div class="storeDetails common-box">
            <div class="info-box">
                <div class="title">店铺信息</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="店铺名称" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺logo" prop="img">
                        <el-upload
                                action="http://up-z0.qiniu.com"
                                class="avatar-uploader"
                                :data="uploadBody"
                                :show-file-list="false"
                                :before-upload="logoBeforeUpload"
                                :on-success="logoHandleUploadSuccess"
                        >
                            <img :src="ruleForm.logo" class="" width="80">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="店铺照片" prop="name">
                        <el-upload
                                class="avatar-uploader"
                                action="http://up-z0.qiniu.com"
                                :show-file-list="false"
                                :data="uploadBody"
                                :before-upload="imgBeforeUpload"
                                :on-success="imgHandleUploadSuccess">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <ul class="img-list" v-if="ruleForm.img.length > 0">
                            <li v-for="(item, index) in ruleForm.img"
                                :key="index"
                                class="img-item"
                            >
                                <span class="el-icon-circle-close remove-icon" @click="removeImg(index)"></span>
                                <img :src="item" alt=''>
                            </li>
                        </ul>
                    </el-form-item>
                    <el-form-item label="客服电话" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.tel"></el-input>
                        <div class="block-tips">
                            用于网店展示，短信提醒展示
                        </div>
                    </el-form-item>
                    <el-form-item label="营业时间" prop="name">
                        <el-input class="inline-input"v-model="ruleForm.service_time"></el-input>
                        <span class="block-tips">  仅做展示用，请根据门店实际营业时间填写</span>
                    </el-form-item>
                    <!--<el-form-item label=" ">
                        <el-time-picker
                                is-range
                                v-model="ruleForm.time"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>-->
                    <el-form-item label="店铺地址" prop="name">
                        <div class="item">
                            <el-cascader
                                    size="large"
                                    :options="options"
                                    v-model="region"
                                    @change="regionHandleChange">
                            </el-cascader>
                        </div>
                        <!--<el-select></el-select>-->
                        <div class="displayCenter">
                            <div>
                                <span>经度：</span>
                                <el-input class="width100" v-model="ruleForm.longitude"></el-input>
                            </div>
                            <div>
                                <span>纬度：</span>
                                <el-input class="width100" v-model="ruleForm.latitude"></el-input>
                            </div>
                        </div>
                        <div class="amap-page-container">
                            <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                            <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo mapBox" :events="events">
                                <el-amap-marker :position="markers.position" :visible="markers.visible" :vid="markers.index"></el-amap-marker>
                            </el-amap>
                        </div>
                    </el-form-item>
                    <el-form-item label="店铺介绍">
                        <el-input class="height150" type="textarea" :disabled="disabled" v-model="ruleForm.intr"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="shopSave">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from '../../../api/index'
import breadcrumb from '../../common/address'
import { getUploadToken } from '@/components/page/goodsmanage/goods/api';
// 地址选择器
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
    name: 'index',
    components: {
        breadcrumb
    },
    data () {
        return {
            uploadBody: {
                token: '',
                key: ''
            },
            uploadImg: {
                token: '',
                key: ''
            },
            files: [],
            form: {
                role_ids: [],
                img: ''
            },
            options: regionDataPlus,
            searchOption: {
                city: '',
                citylimit: true
            },
            events: {
                init: (o) => {
                    console.log(o.getCenter())
                    o.getCity(result => {
                        console.log(result)
                    })
                },
                'moveend': () => {
                },
                'zoomchange': () => {
                },
                'click': (e) => {
                        this.setMapNum(e.lnglat.lng, e.lnglat.lat);
                    }
            },
            zoom: 12,
            center: [121.5273285, 31.31515044],
            markers: {
                position: [121.5073285, 51.91715058],
                visible: true,
                index: 1,
                draggable: false,
                template: '<span>122222222221</span>',
            },
            imageUrl: '',
            disabled: false,
            // 面包屑信息
            breadcrumbList: [
                {
                    name: '首页',
                    router: 'dashboard'
                },
                {
                    name: '店铺信息',
                    router: 'store'
                }
            ],
            ruleForm: {
                fileListLogo: [],
                fileListPic: [],
                pass: '',
                checkPass: '',
                age: ''
            },
            rules: {
                name: [
                    { required: true, trigger: 'blur', message: '店铺名称不能为空' }
                ]
            }
        }
    },
    created () {
        this.getUploadToken();
        this.getShopInfo();
    },
    mounted: function() {
    },
    methods: {
        /* 获取上传图片的token */
        async getUploadToken () {
            try{
                const data = await getUploadToken();
                this.uploadBody.token = data.data.uptoken;
                this.baseUrl = data.data.baseUrl;
            } catch (e) {
                console.log(`getUploadToken error: ${e}`);
            }
        },

        /* 上传之前 */
        logoBeforeUpload (file) {
            this.uploadBody.key = file.name;
            return true;
        },
        /* 成功上传 */
        logoHandleUploadSuccess (res, file) {
            this.ruleForm.logo = `${ this.baseUrl }/${ file.name }`;
        },

        /* 上传之前 */
        imgBeforeUpload (file) {
            this.uploadBody.key = file.name;
            return true;
        },
        /* 成功上传 */
        imgHandleUploadSuccess (res, file) {
            console.log(this.baseUrl);
            console.log(file.name);
            this.ruleForm.img.push(`${ this.baseUrl }/${ file.name }`);
        },
        removeImg (index) {
            this.ruleForm.img.splice(index, 1);
        },
        onSearchResult (value) {
            console.log(value);
            this.setMapNum(value[0].lng, value[0].lat);
            this.ruleForm.address = value[0].address;
        },
        setMapNum (lng, lat) {
            this.$set(this, 'center',  [lng, lat]);
            this.$set(this.markers, 'position', [lng, lat]);
            this.ruleForm.longitude = lng;
            this.ruleForm.latitude = lat;
        },
        addMarker() {
            let marker = {
                position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
            };
            this.markers.push(marker);
        },
        handleAvatarSuccess () {},
        beforeAvatarUpload () {},
        async getShopInfo () {
            const { data } = await api.shopInfo();
            this.ruleForm = data;
        },
        async shopSave () {
            await api.shopSave(this.ruleForm);
            this.getShopInfo();
        },
        regionHandleChange (value, value1) {
            this.userInfoEdit.region = '';
            console.log(value);
            console.log(CodeToText[value[0]]);
            value.forEach(m => {
                this.userInfoEdit.region = this.userInfoEdit.region + CodeToText[m];
            })
        }
    }
};
</script>
<style>
.storeDetails .el-input{
    width: 200px;
}
.storeDetails .el-upload--text{
    width: 150px;
    height: 150px;
    line-height: 150px;
}
.storeDetails .el-upload--text img{
    width: 100%;
    height: 100%;
}
</style>
<style scoped>

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
        max-width: 150px;
        display: inline-block;
    }
.storeDetails .title{
    border-left: 5px solid #1890FF;
    text-indent: 20px;
    line-height: 20px;
    margin-bottom: 20px;
}
.storeDetails .block-tips{
    color: #d9d9d9;
}
.storeDetails .mapBox{
    width: 100%;
    height: 300px;
}
.storeDetails .inline-tips{
    color: #d9d9d9;
}
.displayCenter> div{
    margin-right: 20px;
    padding: 10px 0;
}
.amap-demo {
    width: 100%;
    height: 300px;
}

.search-box {
    position: absolute;
    top: 100px;
    left: 20px;
}

.amap-page-container {
    padding: 20px 0;
    position: relative;
}
</style>
