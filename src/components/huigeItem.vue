<template>
  <div class="huige">
    <el-menu-item :index="item.path" v-if="item.children==null||item.children.length==0">
      <e-icon :icon-name="item.icon"/>
      <span slot="title">{{item.menuName}}}</span>
    </el-menu-item>
    <el-submenu v-else :index="item.path">
      <template slot="title">
        <e-icon :icon-name="item.icon"/>
        <span slot="title">{{item.menuName}}}</span>
      </template>
      <huige-item v-for="(item1,index) in item.children" :key="index" :item="item1"/>
    </el-submenu>
  </div>
</template>

<script>
  export default {
    name: "huigeItem",

    props: ['item']
  }
</script>

<style scoped>

</style>
