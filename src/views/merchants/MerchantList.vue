<template>
  <div>
    <!-- 筛选卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选条件</span>
        <span
          style="float: right; padding: 3px 0; color: #999; font-size: 14px"
          @click="changeIsActive"
        >
          <span v-if="isActive === false"
            ><i class="el-icon-arrow-up"></i>收起筛选</span
          >
          <span v-else><i class="el-icon-arrow-down"></i>展开筛选</span>
        </span>
      </div>
      <div class="text item" :class="{ active: isActive }">
        <!-- 筛选条件form表单 -->
        <el-form
          ref="formInline"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="修改时间">
            <el-date-picker
              v-model="formInline.afterTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="商户名称">
            <el-input
              v-model="formInline.name"
              placeholder="商户名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="商户号">
            <el-input
              v-model="formInline.phone"
              placeholder="商户号"
            ></el-input>
          </el-form-item>
          <!-- clearable 清空选择按钮  filterable支持模糊查询-->
          <el-form-item label="状态">
            <el-select
              v-model="formInline.statusValue"
              placeholder="请选择"
              style="width: 200px"
            >
              <el-option value="1" label="有效"></el-option>
              <el-option value="0" label="无效"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="onSubmit"
              ><i class="el-icon-search"></i>查询</el-button
            >
            <el-button type="info" plain @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 表格卡片 -->
    <el-card class="box-card-table">
      <!-- 批量导出 按钮 -->
      <el-button
        type="primary"
        @click="dialog = true"
        size="medium"
        style="margin-bottom: 15px"
        ><i class="el-icon-plus"></i> 新增商户</el-button
      >
      <!-- :data="" -->
      <el-table :data="dataList" stripe style="width: 100%">
        <el-table-column fixed prop="name" label="ID" width="150">
        </el-table-column>
        <el-table-column prop="idCard" label="商户简介" width="300">
        </el-table-column>
        <el-table-column prop="phone" label="商户全称" width="120">
        </el-table-column>
        <el-table-column prop="commercialName" label="商户类型" width="150">
        </el-table-column>
        <el-table-column prop="commerciaId" label="审核状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.commerciaId === 1">审核成功</span>
            <span v-if="scope.row.commerciaId === 0">待应用</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="状态" width="150">
        </el-table-column>
        <el-table-column prop="alterTime" label="创建时间" width="150">
        </el-table-column>
        <el-table-column prop="addName" label="修改时间" width="150">
        </el-table-column>
        <!-- <el-table-column prop="isOurEmployees" label="是否门店员工" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.isOurEmployees === 1">是</span>
            <span v-if="scope.row.isOurEmployees === 0">否</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editorWhiteItem(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deltSubmit(scope.row)" size="small"
              >审核</el-button
            >
            <el-button type="text" @click="deltSubmit(scope.row)" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 新增商户抽屉 -->
    <!-- 关闭前的操作 :before-close="handleClose"  direction="ltr"打开方向-->
    <el-drawer
      title="我嵌套了 Form !"
      :visible.sync="dialog"
      custom-class="demo-drawer"
      ref="drawer"
      size="80%"
    >
      <div class="demo-drawer__content">
        
        <div class="demo-drawer__footer">
          
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 筛选表单
      formInline: {
        name: "",
        phone: "",
        idCard: "",
        statusValue: "",
      },
      // 筛选隐藏与显示
      isActive: false,

      //   白名单表格数据
      dataList: [
        {
          name: "2021121514251234",
          idCard:
            "杭州车小哥简介杭州车小哥简介杭州车小哥简介杭州车小哥简介杭州车小哥简介杭州车小哥简介杭州车小哥简介",
          phone: "杭州车小哥",
          commercialName: "个体工商户",
          commerciaId:1,
          addTime: "状态",
          alterTime: "2021-12-15 00:00:00",
          addName: "2021-12-15 00:00:00",
        },
      ],
      total: 0,
      size: 0,
      current: 0,
    //   添加商户抽屉状态
    dialog:false,
    };
  },
  created() {},
  methods: {
    // 表单筛选行为
    onSubmit() {},
    // 添加商户抽屉

   
    // 显示与隐藏
    changeIsActive() {
      this.isActive = !this.isActive;
    },

    // 表单重置行为
    resetForm() {
      this.formInline = {
        name: "",
        phone: "",
      };
    },
    // 表格行为

    // 分页行为
    // 每页显示数据改变时触发
    handleSizeChange(nweSize) {
      console.log(nweSize);
      this.postInfo.size = nweSize;
    },
    // 页码值改变时触发
    handleCurrentChange(newCurrent) {
      console.log(newCurrent);
      this.postInfo.current = newCurrent;
      this.current = newCurrent;
    },
  },
};
</script>
<style scoped>
/* 头部标题 */
.title-top {
  font-size: 16px;
  color: #000;
}
/* 筛选卡片 */
.box-card {
  margin-top: 10px;
}
.active {
  display: none;
}
/* 卡片样式 */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
/* 表格卡片 */
.box-card-table {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
