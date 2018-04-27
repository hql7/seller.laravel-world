<template>
  <div class="menu">
    <!--头部横导航-->
    <div class="nav-top">
      <router-link to="/index" tag="span">首页</router-link>
      <ul class="menu-user">
        <li><a :href="link.home" target="_blank">商城首页</a></li>
        <router-link to="/index" tag="li">商家中心</router-link>
        <li class="user">
          <p>{{user.name || 'admin'}}</p>
          <p>{{user.vip || '管理员'}}</p>
        </li>
        <li @click="outLogin"><i class="iconfont icon-fcstubiao24"></i>退出</li>
      </ul>
    </div>
    <!--左侧菜单导航-->
    <div class="nav-left">
      <router-link to="/index" tag="h1">为尔盈商城商家中心</router-link>
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeIndex"
        :default-openeds="activeArrey"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
        background-color="#2a3f54"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu v-for="item in menu" :key="item.id" :index="item.id">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group v-for="ite in item.child" :key="ite.id">
            <!--<template slot="title">{{ite.title}}</template>-->
            <el-menu-item :index="ite.id">
              <router-link :to="{name:ite.id}" tag="h3"> {{ite.title}}</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menu: [], // 菜单
        user: {
          name: '',
          vip: ''
        }, // 账号信息
        link: {}, // 链接信息
        activeIndex: this.$route.name, // 当前高亮
        activeArrey: [this.$route.name.split('-')[0]] // 当前展开
      }
    },
    watch: {
      $route() {
        this.activeIndex = this.$route.name;
        this.activeArrey = [this.$route.name.split('-')[0]]
      }
    },
    created() {
      this.getMenu();
      this.getUser();
      this.getLinkData();
    },
    methods: {
      // 请求菜单
      getMenu() {
        this.axios.post(this.getApi('seller/auth/menu')
        ).then(res => {
          if (res.data.code === 0) {
            this.menu = res.data.menu
          }
        })
      },
      // 读取管理员
      getUser() {
        this.user = this.getobjS('user')
      },
      // 退出登录
      outLogin() {
        this.axios.post(this.getApi('root/login-exit'),
        ).then(res => {
          this.$message(res.data.msg);
          if (res.data.code === 0) {
            this.$router.push('/login')
          }
        }).catch(err => {
          this.$message('请重试');
        })
      },
      // 获取链接信息
      getLinkData() {
        this.axios.post(this.getApi('root/auth/config_page'),
          `title=siteinfo`
        ).then(res => {
          if (res.data.code === 0) {
            this.link = Object.assign(this.link, res.data.kv)
          }
        })
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-left {
    width: 260px;
    height: 100%;
    background-color: #2a3f54;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .el-menu {
    width: 100%;
  }

  .nav-left > h1 {
    width: 259px;
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
  }

  .nav-top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 65px;
    line-height: 65px;
    font-size: 14px;
    background-color: #ededed;
    color: #2a3f54;
    box-shadow: 1px 2px 5px rgba(178, 178, 178, .35);
    padding-left: 290px;
    box-sizing: border-box;
  }

  .nav-top > span {
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: #4d6987;
  }

  .menu-user li {
    float: left;
    padding-left: 25px;
    padding-right: 25px;
    border-left: 1px solid #d3d3d3;
    text-align: center;
  }

  .menu-user {
    float: right;
    margin-right: 30px;
    height: 100%;
    cursor: pointer;
  }

  .user {
    padding: 7px 30px;
    line-height: 26px;
  }

  .menu-user i {
    font-size: 20px;
    line-height: 46px;
    margin-right: 5px;
    vertical-align: -2px;
  }
</style>
