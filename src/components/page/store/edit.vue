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
                    <el-form-item label="店铺logo" prop="name">
                        <el-upload
                                v-model="ruleForm.logo"
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="店铺照片" prop="name">
                        <el-upload
                                v-model="ruleForm.img"
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <div v-if="ruleForm.img">
                            <span v-for="item in ruleForm.img.split(',')"><img :src="item" alt=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="客服电话" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.tel"></el-input>
                        <div class="block-tips">
                            用于网店展示，短信提醒展示
                        </div>
                    </el-form-item>
                    <el-form-item label="营业时间" prop="name">
                        <el-input class="inline-input"v-model="ruleForm.service_time"></el-input>
                        <span class="block-tips">  用于网店展示，短信提醒展示</span>
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
// 地址选择器
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
    name: 'index',
    components: {
        breadcrumb
    },
    data () {
        return {
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
        this.getShopInfo();
    },
    mounted: function() {
    },
    methods: {
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
</style>
<style scoped>
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
