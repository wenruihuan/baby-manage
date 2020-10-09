<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-row>
                    <el-form-item prop="phone">
                        <el-input v-model="param.phone" placeholder="phone">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="13">
                        <el-form-item prop="code">
                            <el-input
                                    type="code"
                                    placeholder="code"
                                    v-model="param.code"
                                    @keyup.enter.native="submitForm()"
                            >
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-button type="primary" :disabled="codeState" :class="codeState ? 'active' : ''" @click="getCode" class="code-show">{{codeText}}</el-button>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-checkbox v-model="isAutomaticLogin">自动登录</el-checkbox>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import * as api from '../../api/index'
export default {
    data: function() {
        return {
            second: 3,
            isAutomaticLogin: false, // 是否自动登录
            codeState: false, // 是否可以点击获取验证码
            resetCode: true,
            codeText: '获取验证码',
            param: {
                phone: 'admin',
                password: '123123',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        /**
         * @description 获取验证码
         * @author wenruihuan
         * 2020/6/4
         */
        getCode () {
            if (!this.codeState) {
                this.resetTime();
            }
        },
        /**
         * @description 验证码倒计时
         * @author wenruihuan
         * 2020/6/4
         */
        resetTime () {
            let second = this.second;
            let timer = null;
            if (this.resetCode) {
                timer = setInterval(() => {
                    second -= 1;
                    if(second >0){
                        this.codeText = second + "秒后获取验证码"
                        this.resetCode =false;
                        this.codeState =true;
                    }else{
                        clearInterval(timer);
                        this.resetCode =true;
                        this.codeState =false;
                        this.codeText = "发送短信验证码"
                    }
                },1000);
            }
        },
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    const { data } = api.login(this.param)
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.code-show{
    width: 100%;
}
</style>
