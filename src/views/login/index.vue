<template>
  <div class="login-wrapper">
    <div class="login-box animated rotateInDownRight">
      <div class="login">
        <div class="login-top">
          <img src="@/assets/admin-logo.png" class="logo-img" alt="">
          <span class="page-title">没吊事瞎球写</span>
        </div>
        <div class="login-center clearfix">
          <div class="login-center-img"><img src="@/assets/name.png"/></div>
          <div class="login-center-input">
            <input type="text" name="key" v-model="form.userName" placeholder="请输入账号"/>
            <div class="login-center-input-text">账号</div>
          </div>
        </div>
        <div class="login-center clearfix">
          <div class="login-center-img"><img src="@/assets/password.png"/></div>
          <div class="login-center-input">
            <input type="password" name="password" v-model="form.password" placeholder="请输入密码"/>
            <div class="login-center-input-text">密码</div>
          </div>
        </div>
        <el-button type="primary" :loading="loading" @click="doLogin">登录</el-button>
      </div>
    </div>

  <!--棍子特效-->
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
  </div>


</template>

<script>

  import login from '../../api/login'
  import token from '../../utils/token'

  export default {
    data: () => {
      return {
        form: {},
        loading: false
      }
    },
    methods: {
      async doLogin() {
        this.loading = true;
        let result = await login.login(this.form);
        token.setToken(result);
        this.getUserInfo();

      },

      //返回用户信息 用户菜单 和用户的按钮权限
      async getUserInfo(){
        let result = await login.getUserInfo()
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("router",JSON.stringify(result.router));
        localStorage.setItem("perm",JSON.stringify(result.perm));

        this.$router.push("/main/index")
      }

    }

  }
</script>

<style scoped lang="scss">


  .login-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    margin-left: auto;
    margin-right: auto;
    background-image: url("../../assets/bg.jpg");

    .login {
      z-index: 2;
      position: absolute;
      width: 350px;
      border-radius: 5px;
      height: 500px;
      background: white;
      box-shadow: 0px 0px 5px #333333;
      top: 50%;
      left: 50%;
      margin-top: -250px;
      margin-left: -175px;
      transition: all 1s;
      -moz-transition: all 1s; /* Firefox 4 */
      -webkit-transition: all 1s; /* Safari 和 Chrome */
      -o-transition: all 1s; /* Opera */
    }

    .login-top {
      font-size: 24px;
      margin-top: 100px;
      padding-left: 40px;
      box-sizing: border-box;
      color: #666;
      margin-bottom: 50px;
    }

    .login-center {
      width: 100%;
      box-sizing: border-box;
      padding: 0 40px;
      margin-bottom: 30px;
    }

    .login-center-img {
      width: 20px;
      height: 20px;
      float: left;
      margin-top: 5px;
    }

    .login-center-img > img {
      width: 100%;
    }

    .login-center-input {
      float: left;
      width: 230px;
      margin-left: 15px;
      height: 30px;
      position: relative;
    }

    .login-center-input input {
      z-index: 2;
      transition: all 0.5s;
      padding-left: 10px;
      color: #666;
      width: 100%;
      height: 30px;
      font-size: 16px;
      border: 0;
      border-bottom: 1px solid #cccccc;
      border-top: 1px solid #ffffff;
      border-left: 1px solid #ffffff;
      border-right: 1px solid #ffffff;
      box-sizing: border-box;
      outline: none;
      position: relative;
    }

    .login-center-input input:focus {
      border: 1px solid dodgerblue;
    }

    .login-center-input-text {
      background: white;
      padding: 0 5px;
      position: absolute;
      z-index: 0;
      opacity: 0;
      height: 20px;
      top: 50%;
      margin-top: -10px;
      font-size: 14px;
      left: 5px;
      color: dodgerblue;
      line-height: 20px;
      transition: all 0.5s;
      -moz-transition: all 0.5s; /* Firefox 4 */
      -webkit-transition: all 0.5s; /* Safari 和 Chrome */
      -o-transition: all 0.5s; /* Opera */
    }

    .login-center-input input:focus ~ .login-center-input-text {
      top: 0;
      z-index: 3;
      opacity: 1;
      margin-top: -15px;
    }

    .login.active {
      -webkit-animation: login-small 0.8s;
      animation: login-small 0.8s;
      animation-fill-mode: forwards;
      -webkit-animation-fill-mode: forwards
    }

    .clearfix:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }

    /* 样式调整 */
    .login-box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      width: inherit;
      height: 100%;
      pointer-events: none;
    }

    .login {
      height: auto;
      padding: 50px 50px;
      position: static;
      margin: 0 auto !important;
      pointer-events: all;
    }

    .login-top {
      margin-top: 0px;
      margin-bottom: 30px;
    }

    .logo-img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
      position: relative;
      top: -3px;
      border-radius: 50%;
      margin-left: -10px;
      margin-right: 10px;
    }

    .el-button {
      width: 270px;
      margin: 0 auto;
      display: block;
    }
  }


</style>
