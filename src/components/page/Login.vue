<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">
                <img src="../../assets/img/logo_pink.png" alt="">
            </div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <div class="item">
                    <el-form-item prop="phone">
                        <el-input v-model="param.phone" placeholder="系统账号"></el-input>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item prop="phone">
                        <el-input
                            type="code"
                            placeholder="验证码"
                            v-model="param.code"
                            @keyup.enter.native="submitForm()"
                        >
                        </el-input>
                        <span :disabled="codeState" :class="codeState ? 'active' : ''" @click="getCode" class="code-show">{{codeText}}</span>
                    </el-form-item>
                </div>
                <div class="item1">
                    <el-form-item>
                        <el-checkbox v-model="isAutomaticLogin">自动登录</el-checkbox>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button @click="submitForm()">登录</el-button>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="footer">copyright@2020南京控云网络科技有限公司</div>
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
            codeText: '发送验证码',
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
        async getCode () {
            const { data } = await api.sendCode({ phone: this.param.phone});
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
                        this.codeText = "发送验证码"
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
    .footer{
        position: fixed;
        bottom: 50px;
        color: #fff;
        font-size: 16px;
        width: 100%;
        left: 0;
        text-align: center;
    }
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/login-bg.png) no-repeat;
    background-size: cover;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #333;
    margin-bottom: 50px;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    box-sizing: border-box;
    margin-top: -190px;
    width: 600px;
    margin-left: -300px;
    padding: 40px;
    height: 385px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
}
.ms-content {
}
.ms-content .item{
}
.ms-content .item>div{
    display: flex;
    width: 100%;
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
<style>

    .ms-content .item .el-form-item__content{
        position: relative;
    }
    .ms-content .item .el-form-item__content span{
        position: absolute;
        right: 0;
        display: inline-block;
        width: auto;
        color: #FF8D8D;
        font-size: 15px;
        cursor: pointer;
    }
    .ms-content .item1 .login-btn button{
        width: 120px;
        height: 40px;
        background: #FF8D8D;
        border:1px solid #FF8D8D;
        border-radius: 21px;
        font-size: 15px;
        color: #fff;
    }
    .ms-content .item{
        margin-bottom: 20px;
    }
    .ms-content .item1{
        display: flex;
        justify-content: space-between;
    }
    .ms-content .item .el-form-item__content,
    .ms-content .item .el-input{
        width: 100%;
        height: 50px;
        line-height: 50px;
    }
    .ms-content .item .el-input input{
        font-size: 15px;
        border-radius: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        border: 0px solid #ddd;
        border-bottom: 1px solid #888D98;
    }
</style>
