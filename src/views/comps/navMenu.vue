<template>
  <!-- 主体左边边导航布局容器 -->
  <el-aside width="200px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      unique-opened
      router
    >
      <!-- 无子级菜单 -->
      <el-menu-item index="/home">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 带有子级的菜单 -->
      <el-submenu index="/white">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>白名单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/white/whiteList">白名单列表</el-menu-item>
          <el-menu-item index="/white/addList">新增白名单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/merchant">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>商户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/merchant/merchantList">商户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/trading">
        <template slot="title">
          <i class="el-icon-wallet"></i>
          <span>交易管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/trading/tradingDetail">交易明细</el-menu-item>
          <el-menu-item index="/trading/tradingRefund">退款管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<style>
.el-aside {
  background-color: #545c64;
  color: #333;
  line-height: 200px;
}
.el-menu-vertical-demo{
  text-align: left;
}
</style>