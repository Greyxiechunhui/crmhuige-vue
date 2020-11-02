<template>
  <div class="main-wrapper">
    <el-container>
      <el-aside width="200px">
        <div class="aside-title">
          <img src="@/assets/KOBE.jpg" alt="" width="35px">
          <span>CRM后台管理系统</span>
        </div>

        <!--
        default-active 默认选中哪一个选项 哪个选项上面有颜色
        background-color：菜单的背景色（仅支持 hex 格式）

        text-color	菜单的文字颜色（仅支持 hex 格式）

        active-text-color	当前激活菜单的文字颜色（仅支持 hex 格式）

        unique-opened	是否只保持一个子菜单的展开

        router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
        -->
        <el-scrollbar>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            router
          >

            <huige-item v-for="(item,index) in routerList" :key="index" :item="item"/>
            <!--<el-menu-item :index="item.path" v-for="(item,index) in routerList" :key="index"-->
                          <!--v-if="item.children==null||item.children.length==0">-->
              <!--<e-icon :icon-name="item.icon"/>-->
              <!--<span slot="title">{{item.menuName}}}</span>-->
            <!--</el-menu-item>-->

            <!--<el-submenu :index="item.path" v-for="(item,index) in routerList"-->
                        <!--:key="index" v-if="item.children!=null&&item.children.length>0">-->
              <!--<template slot="title">-->
                <!--<e-icon :icon-name="item.icon"/>-->
                <!--<span slot="title">{{item.menuName}}}</span>-->
              <!--</template>-->
              <!--<el-menu-item :index="item1.path" v-for="(item1,index) in item.children" :key="index">-->
                <!--<e-icon :icon-name="item1.icon"/>-->
                <!--<span slot="title">{{item1.menuName}}}</span>-->
              <!--</el-menu-item>-->
            <!--</el-submenu>-->


          </el-menu>
        </el-scrollbar>


      </el-aside>
      <el-container>
        <el-header>
            <span>
              JavaAkaRap战士田家英
            </span>
        </el-header>
        <el-main>
          <div class="main-box">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>


</template>

<script>
  import huigeItem from '../../components/huigeItem'
  export default {
    name: "index",
    components: {huigeItem},
    comments:{huigeItem},
    created() {
      this.routerList = JSON.parse(localStorage.getItem("router"));
    },
    data() {
      return {
        routerList: []
      }
    }
  }
</script>

<style scoped lang="scss">
  .main-wrapper {
    height: 100%;
  }

  .el-header {
    background-color: #4EC8CC;
    text-align: center;
    line-height: 60px;
    span {
      color: white;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .el-aside {
    color: #333;
    line-height: 200px;

    .el-scrollbar {
      height: calc(100% - 60px);

      /*.el-scrollbar__view,.el-menu{*/
      /*height: 100%;*/
      /*}*/
    }

    .aside-title {
      height: 60px;
      width: 100%;
      background-color: #4EC8CC;
      line-height: 60px;
      img {
        margin-left: 20px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 6px;
      }
      span {
        color: white;
        font-size: 16px;
        font-weight: 700;
      }
    }
  }

  .el-main {
    background-color: #eee;
    color: #333;
    padding: 10px;
    .main-box {
      width: 100%;
      background-color: white;
      padding: 20px;
      box-sizing: border-box;
    }
  }

  .el-container {
    height: 100%;
  }

</style>
