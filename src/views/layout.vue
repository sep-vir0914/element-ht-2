<template>
  <div class="app">
    <el-container>
      <!-- 头部布局容器 -->
      <el-header>Header</el-header>

      <!-- 主体布局容器 -->
      <el-container>
        <!-- 主体左边边导航布局容器 -->
        <NavMenu />
        <!-- 主体右边内容导航布局容器 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import NavMenu from "./comps/navMenu.vue";
export default {
  components: {
    NavMenu,
  },
};
</script>
<style>
.app {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>