<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">交易明细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    交易明细
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  //   路由监听
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
      this.list = to.matched;
    },
  },
  mounted() {
    this.list = this.$route.matched;
    console.log(this.$route.matched);
  },
};
</script>