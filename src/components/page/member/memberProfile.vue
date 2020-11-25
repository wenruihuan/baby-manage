<template>
    <div class="member_profile">
        <div class="box1">
            <div class="info-title">
                会员信息
                &nbsp;&nbsp;&nbsp;
                <span
                    class="mainColor editBtn"
                    v-if="!baseState"
                    @click="baseState = true"
                >
                    <i class="el-icon-edit"></i>编辑
                </span>
                <el-button
                    class="mainColor editBtn"
                    v-if="baseState"
                    @click="baseInfoSave"
                >保存
                </el-button>
            </div>
            <div class="row">
                <div class="item">
                    <span class="label">头像:</span>
                    <div v-if="!baseState" class="contentBox">
                        <img :src="userInfo.head_img" width="60">
                    </div>
                    <div v-else class="contentBox avatar">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="item">
                    <span class="label">姓名：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.name}}</p>
                        <el-input v-else v-model="userInfo.name"></el-input>
                    </div>
                </div>
                <div class="item">
                    <span class="label">联系电话：</span>
                    <div class="contentBox">
                        <p>{{userInfo.phone}}</p>
                    </div>
                </div>
                <div class="item">
                    <span class="label">归属门店：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.shop_name}}</p>
                        <el-input v-else v-model="userInfo.shop_name"></el-input>
                    </div>
                </div>
                <div class="item">
                    <span class="label">备注名：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.remark_name}}</p>
                        <el-input v-else v-model="userInfo.remark_name"></el-input>
                    </div>
                </div>
                <div class="item">
                    <span class="label">客户编号：</span>
                    <div class="contentBox">
                        <p>{{userInfo.member_no}}</p>
                    </div>
                </div>
                <div class="item">
                    <span class="label">健康管理师：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.hm_name}}</p>
                        <el-select class="width200" v-else v-model="userInfo.hm_id" placeholder="选择健康管理师">
                            <el-option
                                    v-for="(item, index) in hmSelectList"
                                    :key="index"
                                    :label="item.hm_name"
                                    :value="item.hm_id"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <span class="label">性别：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.sex}}</p>
                        <el-select class="width200" v-else v-model="userInfo.sex" placeholder="请选择性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <span class="label">客户来源：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.source}}</p>
                        <el-select class="width200" v-else v-model="userInfo.source" placeholder="请选择会员来源">
                            <el-option label="线下录入" value="线下录入"></el-option>
                            <el-option label="线上注册" value="线上注册"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <span class="label">生日：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.birthday}}</p>
                        <el-input v-else v-model="userInfo.birthday"></el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="box1">
            <div class="info-title">
                基本信息
                &nbsp;&nbsp;&nbsp;
                <span
                        class="mainColor editBtn"
                        v-if="!baseState"
                        @click="baseState = true"
                >
                    <i class="el-icon-edit"></i>编辑
                </span>
                <el-button
                        class="mainColor editBtn"
                        v-if="baseState"
                        @click="baseInfoSave"
                >保存
                </el-button>
            </div>
            <div class="row">
                <div class="item">
                    <span class="label">微信号：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.wx_id}}</p>
                        <el-input v-else v-model="userInfo.wx_id"></el-input>
                    </div>
                </div>
                <div class="item">
                    <span class="label">地址：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.address}}</p>
                        <el-input v-else v-model="userInfo.address"></el-input>
                    </div>
                </div>
                <div class="item">
                    <span class="label">备注：</span>
                    <div class="contentBox">
                        <p v-if="!baseState">{{userInfo.remark}}</p>
                        <el-input v-else v-model="userInfo.remark"></el-input>
                    </div>
                </div>
            </div>
        </div>
        <!--        妈妈档案-->
        <div class="box1">
            <div class="info-title">
                健康档案
                &nbsp;&nbsp;&nbsp;
                <span
                    class="mainColor editBtn"
                    v-if="!motherInfoState && isArchivesQueryAuth"
                    @click="motherInfoState = true"
                >
                    <i class="el-icon-edit"></i>编辑
                </span>
            </div>
            <div class="row row1" style="padding: 0 20px;" v-if="!motherInfo">
                <el-button @click="motherInfo = {}">创建档案</el-button>
            </div>
            <div v-else class="row" style="padding: 0 20px;" >
                <!--假数据模块，单纯显示-->
                <div class="fake" v-if="!isPermission">
                    <div class="bg"><el-button @click="getPermissionState">点此授权查看</el-button></div>
                    <div class="item">
                        <span class="label">生产日期：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">身高：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">体重：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">BMI：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">内脂指数：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">健康指数：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">脂肪率：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">脂肪含量：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">基础代谢：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                </div>

                <!--妈妈的基本信息-->
                <div class="real" v-if="isPermission && motherInfo">
                    <div class="item">
                        <span class="label">生产日期：</span>
                        <div class="contentBox">
                            <el-date-picker
                                v-if="motherInfoState"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                class="width250"
                                type="date"
                                placeholder="选择日期"
                                v-model="motherInfo.production_date">
                            </el-date-picker>
                            <p v-else>{{motherInfo.production_date}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">身高：</span>
                        <div class="contentBox">
                            <el-input v-if="motherInfoState" class="width200" v-model="motherInfo.height"></el-input>
                            <p v-else>{{motherInfo.height}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">体重：</span>
                        <div class="contentBox">
                            <el-input v-if="motherInfoState" class="width200" v-model="motherInfo.weight"></el-input>
                            <p v-else>{{motherInfo.weight}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">BMI：</span>
                        <div class="contentBox">
                            <el-input v-if="motherInfoState" class="width200" v-model="motherInfo.BMI"></el-input>
                            <p v-else>{{motherInfo.BMI}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">内脂指数：</span>
                        <div class="contentBox">
                            <el-input v-if="motherInfoState" class="width200" v-model="motherInfo.internal_fat_index"></el-input>
                            <p v-else>{{motherInfo.internal_fat_index}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">健康指数：</span>
                        <div class="contentBox">
                            <el-input v-if="motherInfoState" class="width200" v-model="motherInfo.health_index"></el-input>
                            <p v-else>{{motherInfo.health_index}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">脂肪率：</span>
                        <div class="contentBox">
                            <el-input v-if="motherInfoState" class="width200" v-model="motherInfo.fat_rate"></el-input>
                            <p v-else>{{motherInfo.fat_rate}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">脂肪含量：</span>
                        <div class="contentBox">
                            <el-input v-if="motherInfoState" class="width200" v-model="motherInfo.fat_content"></el-input>
                            <p v-else>{{motherInfo.fat_content}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">基础代谢：</span>
                        <div class="contentBox">
                            <el-input v-if="motherInfoState" class="width200" v-model="motherInfo.basal_metabolism"></el-input>
                            <p v-else>{{motherInfo.basal_metabolism}}</p>
                        </div>
                    </div>
                    <div class="operation" v-if="motherInfoState">
                        <el-button @click="saveMotherBaseRecordFn">保存记录</el-button>
                    </div>
                    <div class="more" v-if="!motherInfoMore">
                        <span class="mainColor" @click="getMotherInfoMore">查看更多<i class="el-icon-arrow-down"></i></span>
                    </div>
                </div>

                <!--妈妈的其他信息-->
                <div class="motherInfoMore" v-if="motherInfoMore">
                    <div class="bodySize" v-if="isPermission && motherInfo">
                        <div class="info-title" style="background: none;">身体尺寸测量数据</div>
                        <div class="nodata" v-if="body_size_measurement_data.length < 1">
                            <img src="../../../assets/img/nodata_icon.png" alt="" width="150">
                        </div>
                       <!-- <div v-else>
                            &lt;!&ndash;     <el-table
                                         :data="body_size_measurement_data"
                                         style="width: 100%"
                                         ref="multipleTable"
                                 >
                                     <el-table-column
                                             prop="date"
                                             label="日期"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="left_arm"
                                             label="左手臂（cm）"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="right_arm"
                                             label="右手臂（cm）"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="up_navel"
                                             label="脐上（cm）"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="middle_navel"
                                             label="脐中（cm）"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="down_navel"
                                             label="脐下（cm）"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="hipline"
                                             label="臀围（cm）"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="left_thigh"
                                             label="左大腿（cm）"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="right_thigh"
                                             label="右大腿（cm）"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="left_calf"
                                             label="左小腿（cm）"
                                     ></el-table-column>
                                     <el-table-column
                                             prop="right_calf"
                                             label="右小腿（cm）"
                                     ></el-table-column>
                                 </el-table>&ndash;&gt;
                        </div>-->
                        <div id="motherBodySize"></div>
                        <div style="margin: 50px auto">
                            <div class="alignRight">
                                <el-button @click="saveBodyMeasurementItemBtn">保存记录</el-button>
                            </div>
                            <el-table
                                    class="maginHeight20"
                                    :data="addBodySizeItem"
                                    style="width: 100%"
                                    ref="multipleTable"
                            >
                                <el-table-column
                                        prop="date"
                                        label="日期"
                                        width="250"
                                >
                                    <template slot-scope="scope">
                                        <el-date-picker
                                                value-format="yyyy-MM-dd"
                                                format="yyyy-MM-dd"
                                                class="width250"
                                                type="date"
                                                placeholder="选择日期"
                                                v-model="scope.row.date">
                                        </el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="left_arm"
                                        label="左手臂（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.left_arm"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="right_arm"
                                        label="右手臂（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.right_arm"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="up_navel"
                                        label="脐上（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.up_navel"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="middle_navel"
                                        label="脐中（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.middle_navel"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="down_navel"
                                        label="脐下（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.down_navel"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="hipline"
                                        label="臀围（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.hipline"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="left_thigh"
                                        label="左大腿（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.left_thigh"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="right_thigh"
                                        label="右大腿（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.right_thigh"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="left_calf"
                                        label="左小腿（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.left_calf"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="right_calf"
                                        label="右小腿（cm）"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width70" v-model="scope.row.right_calf"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div>
                                <el-button @click="addBodySizeItemBtn">添加行</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="bodySize" v-if="isPermission && motherInfo">
                        <div class="info-title" style="background: none;">身体指标测量数据</div>
                        <div class="nodata" v-if="body_measurement_data.length < 1">
                            <img src="../../../assets/img/nodata_icon.png" alt="" width="150">
                        </div>
                        <div v-else>
                            <div id="motherMeasurementSize"></div>
                            <!--   <el-table
                                   :data="body_measurement_data"
                                   style="width: 100%"
                                   ref="multipleTable"
                               >
                                   <el-table-column
                                       prop="date"
                                       label="日期"
                                   ></el-table-column>
                                   <el-table-column
                                       prop="weight"
                                       label="体重"
                                   ></el-table-column>
                                   <el-table-column
                                       prop="internal_fat_index"
                                       label="内脂指数"
                                   ></el-table-column>
                                   <el-table-column
                                       prop="fat_rate"
                                       label="脂肪率"
                                   ></el-table-column>
                                   <el-table-column
                                       prop="basal_metabolism"
                                       label="基础代谢（卡路里）"
                                   ></el-table-column>
                                   <el-table-column
                                       prop="health_index"
                                       label="健康指数"
                                   ></el-table-column>
                               </el-table>-->
                        </div>
                        <div style="margin: 50px auto">
                            <div class="alignRight">
                                <el-button @click="saveBodyMeasurementItemBtn">保存记录</el-button>
                            </div>
                            <el-table
                                class="maginHeight20"
                                :data="addBodyMeasurementItem"
                                style="width: 100%"
                                ref="multipleTable"
                            >
                                <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="250"
                                >
                                    <template slot-scope="scope">
                                        <el-date-picker
                                            value-format="yyyy-MM-dd"
                                            format="yyyy-MM-dd"
                                            class="width250"
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="scope.row.date">
                                        </el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="weight"
                                    label="体重"
                                    width="100"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width85" v-model="scope.row.weight"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="internal_fat_index"
                                    label="内脂指数"
                                    width="100"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width85" v-model="scope.row.internal_fat_index"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="fat_rate"
                                    label="脂肪率"
                                    width="100"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width85" v-model="scope.row.fat_rate"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="basal_metabolism"
                                        label="基础代谢（卡路里）"
                                >
                                    <template slot-scope="scope">
                                        <el-input  v-model="scope.row.basal_metabolism"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="health_index"
                                        label="健康指数"
                                        width="100"
                                >
                                    <template slot-scope="scope">
                                        <el-input class="width85" v-model="scope.row.health_index"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div>
                                <el-button @click="addBodyMeasurementItemBtn">添加行</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--        宝宝档案-->
        <div v-if="motherInfo" class="box1">
            <div class="info-title">
                宝宝档案
                &nbsp;&nbsp;&nbsp;
                <span
                        class="mainColor editBtn"
                        v-if="!babyInfoState && isArchivesQueryAuth"
                        @click="babyInfoState = true"
                >
                    <i class="el-icon-edit"></i>编辑
                </span>
            </div>
            <div class="row" style="padding: 0 20px;">
                <!--假数据模块，单纯显示-->
                <div class="fake" v-if="!isPermission">
                    <div class="bg"><el-button @click="getPermissionState">点此授权查看</el-button></div>
                    <div class="item">
                        <span class="label">宝宝姓名：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">宝宝生日：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">宝宝性别：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">生产方式：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">生产情况：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">出生身长：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">出生体重：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">出生胸围：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">出生头围：</span>
                        <div class="contentBox">
                            <el-input class="width200"></el-input>
                        </div>
                    </div>
                </div>

                <!--宝宝的基本信息-->
                <div class="real" v-if="isPermission && babyBaseInfo">
                    <div class="item">
                        <span class="label">宝宝姓名：</span>
                        <div class="contentBox">
                            <el-input v-if="babyInfoState" class="width200" v-model="babyBaseInfo.name"></el-input>
                            <p v-else>{{babyBaseInfo.birthday}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">宝宝生日：</span>
                        <div class="contentBox">
                            <el-date-picker
                                    v-if="babyInfoState"
                                    value-format="yyyy-MM-dd"
                                    format="yyyy-MM-dd"
                                    class="width250"
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="babyBaseInfo.birthday">
                            </el-date-picker>
                            <p v-else>{{babyBaseInfo.birthday}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">宝宝性别：</span>
                        <div class="contentBox">
                            <el-select v-if="babyInfoState" class="width200" v-model="babyBaseInfo.sex" placeholder="请选择活动区域">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                            <p v-else>{{babyBaseInfo.sex}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">生产方式：</span>
                        <div class="contentBox">
                            <el-input v-if="babyInfoState" class="width200" v-model="babyBaseInfo.sex"></el-input>
                            <p v-else>{{babyBaseInfo.sex}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">生产情况：</span>
                        <div class="contentBox">
                            <el-input v-if="babyInfoState" class="width200" v-model="babyBaseInfo.production_situation"></el-input>
                            <p v-else>{{babyBaseInfo.production_situation}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">出生身长：</span>
                        <div class="contentBox">
                            <el-input v-if="babyInfoState" class="width200" v-model="babyBaseInfo.height"></el-input>
                            <p v-else>{{babyBaseInfo.height}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">出生体重：</span>
                        <div class="contentBox">
                            <el-input v-if="babyInfoState" class="width200" v-model="babyBaseInfo.weight"></el-input>
                            <p v-else>{{babyBaseInfo.weight}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">出生胸围：</span>
                        <div class="contentBox">
                            <el-input v-if="babyInfoState" class="width200" v-model="babyBaseInfo.bust"></el-input>
                            <p v-else>{{babyBaseInfo.bust}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <span class="label">出生头围：</span>
                        <div class="contentBox">
                            <el-input v-if="babyInfoState" class="width200" v-model="babyBaseInfo.head_circumference"></el-input>
                            <p v-else>{{babyBaseInfo.head_circumference}}</p>
                        </div>
                    </div>
                    <div class="operation"  v-if="babyInfoState">
                        <el-button @click="saveBabyBaseRecordFn">保存记录</el-button>
                    </div>
                    <div class="more" v-if="!babyInfoMore">
                        <span class="mainColor" @click="getBabyInfoMore">查看更多<i class="el-icon-arrow-down"></i></span>
                    </div>
                </div>
                {{babyDataList}}
                <!--宝宝的其他信息-->
                <div class="bodySize" v-if="isPermission && babyBaseInfo">
                    <div class="info-title" style="background: none;">身体尺寸测量数据</div>
                    <div class="nodata" v-if="babyRecordList.length < 1">
                        <img src="../../../assets/img/nodata_icon.png" alt="" width="150">
                    </div>
                    <div v-else>
                        <el-table
                                :data="babyRecordList"
                                style="width: 100%"
                                ref="multipleTable"
                        >
                            <el-table-column
                                    prop="date"
                                    label="日期"
                            ></el-table-column>
                            <el-table-column
                                    prop="height"
                                    label="身高（cm）"
                            ></el-table-column>
                            <el-table-column
                                    prop="weight"
                                    label="体重（kg）"
                            ></el-table-column>
                            <el-table-column
                                    prop="bust"
                                    label="胸围（cm）"
                            ></el-table-column>
                            <el-table-column
                                    prop="head_circumference"
                                    label="头围（cm）"
                            ></el-table-column>
                        </el-table>
                    </div>
                    <div style="margin: 50px auto">
                        <div class="alignRight">
                            <el-button @click="saveBodySizeItemBtn">保存记录</el-button>
                        </div>
                        <el-table
                            class="maginHeight20"
                            :data="addBabyItem"
                            style="width: 100%"
                            ref="multipleTable"
                        >
                            <el-table-column
                                prop="date"
                                label="日期"
                                width="250"
                            >
                                <template slot-scope="scope">
                                    <el-date-picker
                                        value-format="yyyy-MM-dd"
                                        format="yyyy-MM-dd"
                                        class="width250"
                                        type="date"
                                        placeholder="选择日期"
                                        v-model="scope.row.date">
                                    </el-date-picker>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="height"
                                label="身高（cm）"
                            >
                                <template slot-scope="scope">
                                    <el-input class="width70" v-model="scope.row.height"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="weight"
                                    label="体重（cm）"
                            >
                                <template slot-scope="scope">
                                    <el-input class="width70" v-model="scope.row.weight"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="bust"
                                    label="胸围（cm）"
                            >
                                <template slot-scope="scope">
                                    <el-input class="width70" v-model="scope.row.bust"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="head_circumference"
                                    label="头围（cm）"
                            >
                                <template slot-scope="scope">
                                    <el-input class="width70" v-model="scope.row.head_circumference"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            <el-button @click="addBabyItemBtn">添加行</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            class="authQr-dialog"
            title="扫码授权"
            :visible.sync="authQrDialog"
            width="400px"
            height="400"
        >
                <div class="box">
                    <img :src="authQrData.QR_url">
                    <p>扫码授权</p>
                    <p>{{countDown}}秒后刷新</p>
                </div>
        </el-dialog>
    </div>
</template>

<script>
import * as api from '../../../api/index'
export default {
    name: 'memberProfile',
    data () {
        return {
            num: 0,
            authQrDialog: false,
            motherInfoState: false, //妈妈档案编辑状态
            motherInfoMore: false, //妈妈档案查看更多
            babyInfoMore: false, //宝宝档案查看更多
            babyInfoState: false, //宝宝档案编辑状态
            ArchivesQueryAuthCountDown: null, //获取权限倒计时
            countDown: 1, //二维码更新倒计时时间
            width: 0,
            baseState: false, // 基础信息编辑状态
            imageUrl: '',
            member_id: '',
            userInfo: {},
            authQrData: {}, // 扫码返回数据
            addBodySizeObj:{
                date: '',
                left_arm: '',
                right_arm: '',
                up_navel: '',
                middle_navel: '',
                down_navel: '',
                hipline: '',
                left_thigh: '',
                right_thigh: '',
                left_calf: '',
                right_calf: ''
            },
            addBodySizeItem: [
                {
                    date: '',
                    left_arm: '',
                    right_arm: '',
                    up_navel: '',
                    middle_navel: '',
                    down_navel: '',
                    hipline: '',
                    left_thigh: '',
                    right_thigh: '',
                    left_calf: '',
                    right_calf: ''
                }
            ],
            babyDataList: [], //宝宝总数据
            addBodyMeasurementObj:{
                date: '',
                weight: '',
                internal_fat_index: '',
                fat_rate: '',
                basal_metabolism: '',
                health_index: ''
            },
            addBodyMeasurementItem: [
                {
                    date: '',
                    weight: '',
                    internal_fat_index: '',
                    fat_rate: '',
                    basal_metabolism: '',
                    health_index: ''
                }
            ],
            archivesSaveRecordData: {}, //保存新增的麻麻数据
            addBabyItem: [
                {
                    date: '',
                    height: '',
                    weight: '',
                    bust: '',
                    head_circumference: ''
                }
            ],
            isPermission: false,
            isArchivesQueryAuth: false, //授权码状态，如果为false 则三秒后再次判断
            motherInfo: undefined,
            babyBaseInfo: undefined,
            hmSelectList: [],
            babyRecordList: [],
            body_measurement_data: [],
            body_size_measurement_data: [],
        }
    },
    created() {
        this.member_id = this.$route.query.memberId;
        this.getUserInfoBox();
        this.getHmSelectList();
    },
    methods: {
        motherChart (data, Dom) {
            let xAxisData = data.map(m => { return m.date });
            let seriesData = {
                left_arm: [],
                right_arm: [],
                up_navel: [],
                middle_navel: [],
                down_navel: [],
                hipline: [],
                left_thigh: [],
                right_thigh: [],
                left_calf: [],
                right_calf: []
            }

            data.forEach(m => {
                seriesData.left_arm.push(m.left_arm);
                seriesData.right_arm.push(m.right_arm);
                seriesData.up_navel.push(m.up_navel);
                seriesData.middle_navel.push(m.middle_navel);
                seriesData.down_navel.push(m.down_navel);
                seriesData.hipline.push(m.hipline);
                seriesData.left_thigh.push(m.left_thigh);
                seriesData.right_thigh.push(m.right_thigh);
                seriesData.left_calf.push(m.left_calf);
                seriesData.right_calf.push(m.right_calf);
            });
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(Dom));
            // 绘制图表
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:  ['左手臂', '右手臂', '脐上', '脐中', '脐下', '臀围', '左大腿', '右大腿', '左小腿', '右小腿']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxisData
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '左手臂',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.left_arm
                    },
                    {
                        name: '右手臂',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.right_arm
                    },
                    {
                        name: '脐上',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.up_navel
                    },
                    {
                        name: '脐中',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.middle_navel
                    },
                    {
                        name: '脐下',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.down_navel
                    },
                    {
                        name: '臀围',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.hipline
                    },
                    {
                        name: '左大腿',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.left_thigh
                    },
                    {
                        name: '右大腿',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.right_thigh
                    },
                    {
                        name: '左小腿',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.left_calf
                    },
                    {
                        name: '右小腿',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.right_calf
                    }
                ]
            };
            myChart.setOption(option);
        },
        motherChart1 (data, Dom) {
            let xAxisData = data.map(m => { return m.date });
            let seriesData = {
                weight: [],
                internal_fat_index: [],
                fat_rate: [],
                basal_metabolism: [],
                health_index: []
            }

            data.forEach(m => {
                seriesData.weight.push(m.weight);
                seriesData.internal_fat_index.push(m.internal_fat_index);
                seriesData.fat_rate.push(m.fat_rate);
                seriesData.basal_metabolism.push(m.basal_metabolism);
                seriesData.health_index.push(m.health_index);
            });
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(Dom));
            // 绘制图表
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:  ['体重', '脂肪率', '基础代谢（卡路里）', '健康指数']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxisData
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '体重',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.weight
                    },
                    {
                        name: '脂肪率',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.internal_fat_index
                    },
                    {
                        name: '基础代谢（卡路里）',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.basal_metabolism
                    },
                    {
                        name: '健康指数',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.health_index
                    }
                ]
            };
            myChart.setOption(option);
        },
        babyChart (data, Dom) {
            let xAxisData = data.map(m => { return m.date });
            let seriesData = {
                left_arm: [],
                right_arm: [],
                up_navel: [],
                middle_navel: [],
                down_navel: [],
                hipline: [],
                left_thigh: [],
                right_thigh: [],
                left_calf: [],
                right_calf: []
            }

            data.forEach(m => {
                seriesData.left_arm.push(m.left_arm);
                seriesData.right_arm.push(m.right_arm);
                seriesData.up_navel.push(m.up_navel);
                seriesData.middle_navel.push(m.middle_navel);
                seriesData.down_navel.push(m.down_navel);
                seriesData.hipline.push(m.hipline);
                seriesData.left_thigh.push(m.left_thigh);
                seriesData.right_thigh.push(m.right_thigh);
                seriesData.left_calf.push(m.left_calf);
                seriesData.right_calf.push(m.right_calf);
            });
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(Dom));
            // 绘制图表
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:  ['左手臂', '右手臂', '脐上', '脐中', '脐下', '臀围', '左大腿', '右大腿', '左小腿', '右小腿']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxisData
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '左手臂',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.left_arm
                    },
                    {
                        name: '右手臂',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.right_arm
                    },
                    {
                        name: '脐上',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.up_navel
                    },
                    {
                        name: '脐中',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.middle_navel
                    },
                    {
                        name: '脐下',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.down_navel
                    },
                    {
                        name: '臀围',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.hipline
                    },
                    {
                        name: '左大腿',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.left_thigh
                    },
                    {
                        name: '右大腿',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.right_thigh
                    },
                    {
                        name: '左小腿',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.left_calf
                    },
                    {
                        name: '右小腿',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: seriesData.right_calf
                    }
                ]
            };
            myChart.setOption(option);
        },
        addBodySizeItemBtn () {
            this.addBodySizeItem.push(this.addBodySizeObj);
        },
        async saveBodySizeItemBtn () {
            // this.archivesSaveRecordData.body_size_measurement_data = this.addBodySizeItem;
            // this.archivesSaveRecordData.body_measurement_data = this.addBodyMeasurementItem;
            // const { data } = await api.archivesSaveRecord();
        },
        addBodyMeasurementItemBtn () {
            this.addBodyMeasurementItem.push(this.addBodyMeasurementObj);
        },
        addBabyItemBtn () {
            this.babyRecordList.push(JSON.parse(JSON.stringify(this.addBabyItem[0])));
        },
        // 4.1.2.1.添加（编辑）妈妈档案记录
        async saveBodyMeasurementItemBtn () {
            this.archivesSaveRecordData.body_size_measurement_data = this.addBodySizeItem;
            this.archivesSaveRecordData.body_measurement_data = this.addBodyMeasurementItem;
            const { data } = await api.archivesSaveRecord(this.archivesSaveRecordData);
        },
        // // 4.1.2.4.获取妈妈档案记录
        async getArchivesRecord () {
            const { data } = await api.archivesRecord({ member_id: this.member_id});
            this.body_size_measurement_data = data.body_size_measurement_data;
            this.body_measurement_data = data.body_measurement_data;
        },
        //4.1.1.1.获取宝宝档案记录
        async getArchivesBabyRecord (index) {
            const { data } = await api.archivesBabyRecord({ baby_id: this.userInfo.member_archives_baby_ids[index]});
            // this.babyRecordList = data;
            console.log(data);
            // this.babyDataList[index].babyRecordList = data;
            // console.log(this.babyDataList);
        },
        // 基本信息编辑保存
        async baseInfoSave () {
            this.baseState = false;
            // const { data } = await
        },
        // 判断是否有权限阅览数据
        getPermissionState () {
            if (this.isArchivesQueryAuth) {
                this.isPermission = true;
            } else {
                this.authQrDialog = true;
                this.authQrFn();
            }
        },
        getMotherInfoMore () {
            this.motherInfoMore = true;
            setTimeout(() => {
                this.motherChart(this.body_size_measurement_data, 'motherBodySize');
                this.motherChart1(this.body_measurement_data, 'motherMeasurementSize');
                // this.motherChart(this.body_measurement_data, 'motherMeasurementSize');
            },300)
        },
        getBabyInfoMore () {
            this.motherInfoMore = true;
            setTimeout(() => {
                this.babyChart(this.body_size_measurement_data, 'motherBodySize');
            },300)
        },
        //4.3.3.会员详情
        async getUserInfoBox () {
            const { data } = await api.memberDetail({ id: this.userId});
            this.userInfo = data;
            this.userInfo.member_name = data.name;
            this.userInfo.member_phone = data.phone;
            if (!this.isArchivesQueryAuth) {
                this.getArchivesQueryAuth();
            };
        },
        // 4.1.1.查看档案查询扫码授权状态
        async getArchivesQueryAuth () {
            const { data } = await api.archivesQueryAuth();
            // this.isArchivesQueryAuth = data.result;
            //此判断仅用于测试，正式数据对接时请删除
            if (this.num === 0) {
                this.isArchivesQueryAuth = false;
                this.num++;
            }
            // 判断查看档案查询扫码授权状态，如果为false则显示扫码弹窗，否则调用宝宝和妈妈的数据
            if (!this.isArchivesQueryAuth) {
                setTimeout(() => {
                    this.getArchivesQueryAuth();
                }, 3000);
            } else {
                this.getArchivesBase();
                this.getArchivesRecord();
                this.userInfo.member_archives_baby_ids.forEach((m, index) => {
                    this.getArchivesBabyBase(index);
                    this.getArchivesBabyRecord(index);
                })
            }
        },
        // 4.1.2.3.获取妈妈档案基本信息
        async getArchivesBase () {
            let params = {
                member_id: this.member_id
            }
            const { data } = await api.archivesBase(params);
            this.motherInfo = data;
        },
        // 4.1.1.2.获取宝宝档案基本信息
        async getArchivesBabyBase (index) {
            let params = {
                member_archives_baby_id: this.userInfo.member_archives_baby_ids[index]
            };
            const { data } = await api.archivesBabyBase(params);
            console.log(data);
            this.babyDataList[index].babyBaseInfo = data;
        },
        async saveMotherBaseRecordFn () {
            const data = await api.archivesSaveBase(this.motherInfo);
            this.$message.success(data.msg);
        },
        async saveBabyBaseRecordFn () {
            const data = await api.archivessaveBabyBase(this.babyBaseInfo);
            this.$message.success(data.msg);
        },
        // 4.1.2.获取授权二维码
        async authQrFn () {
            const { data } = await api.archivesAuthQr({ member_id: this.member_id });
            this.authQrData = data;
            let authQrCountDown = null;
            if (this.isArchivesQueryAuth) {
                this.$alert('测试授权流程，目前当进入第二次倒计时，前端直接设置成已获取权限');
                clearInterval(authQrCountDown);
                this.authQrDialog = false;
                this.isArchivesQueryAuth = true;
            } else {
                authQrCountDown = setInterval(() => {
                    this.countDown--;
                    if (this.countDown === 0 || this.countDown < 0) {
                        this.authQrFn();
                        this.countDown = 3;
                        clearInterval(authQrCountDown);
                        this.isArchivesQueryAuth = true;
                    };
                }, 1000)
            }
        },
        beforeAvatarUpload () {},
        handleAvatarSuccess () {},
        // 获取健康师列表
        async getHmSelectList () {
            const  { data } = await api.hmSelectList();
            this.hmSelectList = data;
        },
    }
};
</script>

<style scoped>
.member_profile{
    background: #fff;
    padding: 30px;
}
.member_profile .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.member_profile .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.member_profile .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
.member_profile .avatar {
    width: 60px;
    height: 60px;
    display: block;
}
#motherBodySize{
    width: 100%;
    height: 500px;
}
#motherMeasurementSize{
    width: 100%;
    height: 500px;
}
.member_profile .box1 {
    padding: 20px 0;
}
.member_profile .row1 {
    min-height: 300px;
    align-items: center;
    justify-content: center;
    justify-items: center;
}
.member_profile .row {
    display: flex;
    flex-wrap: wrap;
}
.member_profile .row .item{
    display: flex;
    align-items: center;
    width: 33.3%;
    padding: 10px 0;
}
.member_profile .motherInfoMore{
    width: 100%;
}
.member_profile .row  .fake,
.member_profile .row .real {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.member_profile .row  .fake .bg{
    position: absolute;
    background: rgba(255,255,255,0.8);
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.member_profile .row  .fake .item,
.member_profile .row .real .item {
    display: flex;
    align-items: center;
    width: 33.3%;
    padding: 10px 0;
}
.member_profile .row .item span.label{
    width: 158px;
    text-align: right;
    margin-right: 20px;
    color: #D9D9D9;
}
.member_profile .row .real .more{
    text-align: center;
    width: 100%;
    cursor: pointer;
    margin: 50px auto;
}
.member_profile .row .real .operation{
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
}
.member_profile .nodata {
    text-align: center;
    padding: 50px 0;
    width: 100%;
}
.member_profile .bodySize{
    width: 100%;
}
.member_profile .nodata p{
    text-align: center;
    line-height: 50px;
}
.member_profile .nodata i{
    font-size: 100px;
    color: #E3E6EB;
}
.authQr-dialog{
    text-align: center;
    height: 530px;
}
.authQr-dialog{
    display: flex;
    padding: 30px;
}
.authQr-dialog img{
    width: 150px;
    height: 150px;
}
.authQr-dialog p{
    line-height: 40px;
}
</style>
<style>
    .member_profile .avatar .el-upload--text{
        width: 100%;
        height: 100%;
    }
    .authQr-dialog .el-dialog__body{
        border-bottom: 0px solid #fff!important;
    }
</style>
