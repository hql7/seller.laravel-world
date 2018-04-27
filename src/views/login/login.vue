<template>
  <div id="login" class="login" @keyup.enter="submitForm('ruleForm')" v-loading="loading">
    <div class="login-form">
      <div class="login-form-img"></div>
      <div class="login-form-content">
        <h2>Lara-shop商家中心</h2>
        <el-form :model="ruleForm" :rules="rules" class="login-box" ref="ruleForm">
          <el-form-item prop="act" class="ipt-box">
            <label><i class="iconfont icon-yonghu1"></i></label>
            <input type="text" v-model="ruleForm.act" placeholder="请输入账号">
          </el-form-item>
          <el-form-item prop="pass" class="ipt-box">
            <label><i class="iconfont icon-password1"></i></label>
            <input type="password" v-model="ruleForm.pass" placeholder="请输入密码">
          </el-form-item>
          <el-form-item prop="code">
            <div class="ipt-box ipt-box-m">
              <label><i class="iconfont icon-yanzhengma"></i></label>
              <input type="text" v-model="ruleForm.code" placeholder="请输入验证码" class="login-form-yzm">
            </div>
            <div class="ipt-box ipt-box-s">
              <img :src="yzm_code" alt="验证码" @click="change_yzm" class="yzm_code">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="submitForm('ruleForm')"
                       class="login-btn">登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        yzm_code: this.getApi('coms/seller-code'),
        ruleForm: {
          act: 'qqq',
          pass: 'Admin{}123',
          code: ''
        },
        rules: {
          act: [
            {validator: this.va.vaAct, trigger: 'blur'}
          ],
          pass: [
            {min: 10, max: 18, message: '长度 10 到 18 个字符', trigger: 'blur'},
            {validator: this.va.vaPass, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 5, max: 5, message: '长度 5 个字符', trigger: 'blur'}
          ]
        },
        loading: false
      }
    },
    methods: {
      // 登录表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.axios.post(this.getApi('seller/login'),
              this.dafa({
                username: this.ruleForm.act,
                userpass: this.ruleForm.pass,
                yzm: this.ruleForm.code
              })
            ).then(res => {
              this.loading = false;
              this.$message(res.data.msg);
              if (res.data.code === 0) {
                this.setobjS('user', {login: true, name: res.data.name, vip: res.data.role_name, id: res.data.id});
                this.$router.push('/view');
              } else {
                this.change_yzm()
              }
            }).catch(err => {
              this.loading = false;
              this.$message('请重试');
            })
          }
        })
      },
      // 更新验证码
      change_yzm() {
        this.yzm_code = this.getApi('coms/seller-code') + '?code=' + Math.random()
        this.ruleForm.code = null
      },
    },
    components: {}
  }
</script>

<style scoped>
  .login {
    background: url("../../assets/img/login_bj.jpg") no-repeat;
    background-size: 100% 100%;
    position: fixed;
    width: 100%;
    height: 100%;
    min-width: 1400px;
  }

  .login-form {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 810px;
    height: 460px;
    border-radius: 2px;
    box-shadow: 2px 2px 5px rgba(28, 28, 28, .2), -2px -2px 5px rgba(28, 28, 28, .2);
  }

  .login-form > div {
    float: left;
    height: 100%;
  }

  .login-form-img {
    width: 345px;
    background: url("../../assets/img/login_bj_left.jpg") center no-repeat;
    background-size: 100% 100%;
  }

  .login-form-content {
    width: 465px;
    background-color: #fff;
    padding: 10px 7px;
    box-sizing: border-box;
  }

  .login-form-content > h2 {
    line-height: 64px;
    font-size: 26px;
    color: #333;
    padding-left: 35px;
    border-bottom: 1px dashed #e6e6e6;
    margin-bottom: 28px;
  }

  .login-box {
    padding: 0 35px;
    box-sizing: border-box;
  }

  .el-form-item {
    margin-bottom: 28px;
  }

  .ipt-box {
    height: 50px;
    line-height: 48px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 5px 5px 10px rgba(202, 202, 202, .4) inset, -5px -5px 10px rgba(202, 202, 202, .4) inset;
    box-sizing: border-box;
  }

  .ipt-box-m {
    width: 200px;
    float: left;
  }

  .ipt-box-s {
    width: 150px;
    float: right;
  }

  .ipt-box:hover {
    box-shadow: 5px 5px 10px rgba(64, 158, 255, .4) inset, -5px -5px 10px rgba(64, 158, 255, .4) inset;
  }

  .ipt-box label {
    float: left;
    display: inline-block;
    width: 60px;
    height: 48px;
    line-height: 48px;
    color: #cccccc;
    text-align: center;
  }

  .ipt-box i {
    font-size: 20px;
  }

  .ipt-box input {
    float: left;
    width: 318px;
    height: 48px;
    background-color: transparent;
    padding-left: 10px;
    border: none;
    box-sizing: border-box;
  }

  .ipt-box-m > input {
    width: 130px;
  }

  .yzm_code {
    float: right;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .login-btn {
    width: 100%;
    height: 55px;
    font-size: 20px;
    letter-spacing: 10px;
  }
</style>
