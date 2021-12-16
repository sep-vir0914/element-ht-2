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
          <el-form-item>
            <el-button type="primary" style="border-radius: 0"
              >添加时间</el-button
            >
            <el-button
              type="primary"
              plain
              style="margin-left: 0; margin-right: 10px; border-radius: 0"
              >修改时间</el-button
            >
            <el-date-picker
              v-show="false"
              v-model="formInline.addTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
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
          <el-form-item label="姓名">
            <el-input
              v-model="formInline.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              v-model="formInline.phone"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input
              v-model="formInline.idCard"
              placeholder="请输入身份证号"
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
          <el-form-item label="所属商户">
            <el-select
              v-model="formInline.commerciaValue"
              filterable
              placeholder="请选择或输入"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
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
      <el-button type="primary" plain>批量导出</el-button>
      <!-- :data="" -->
      <el-table :data="dataList" stripe style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column fixed prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="150">
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" width="120">
        </el-table-column>
        <el-table-column prop="commercialName" label="所属商户全称" width="150">
        </el-table-column>
        <el-table-column prop="commerciaId" label="所属商户平台ID" width="150">
        </el-table-column>
        <el-table-column prop="addTime" label="添加时间" width="150">
        </el-table-column>
        <el-table-column prop="alterTime" label="修改时间" width="150">
        </el-table-column>
        <el-table-column prop="addName" label="添加人姓名" width="150">
        </el-table-column>
        <el-table-column prop="status" label="白名单状态" width="150">
        </el-table-column>

        <!-- <el-table-column prop="isOurEmployees" label="是否门店员工" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.isOurEmployees === 1">是</span>
            <span v-if="scope.row.isOurEmployees === 0">否</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editorWhiteItem(scope.row)"
              >编辑</el-button
            >

            <el-button type="text" @click="deltSubmit(scope.row)" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 所属商户选择框
      options: [
        {
          value: null,
          label: "全部",
        },
        {
          value: "选项1",
          label: "黄金糕黄金糕黄金糕黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      // 筛选表单
      formInline: {
        name: "",
        phone: "",
        idCard: "",
        statusValue: "",
        commerciaValue: "",
      },
      // 筛选隐藏与显示
      isActive: false,

      //   白名单表格数据
      dataList: [
        {
          name: "张三",
          idCard: "410726123456789529",
          phone: "15545456213",
          commercialName: "杭州车小哥科技",
          commerciaId: "202112151228000",
          addTime: "2021-12-15 00:00:00",
          alterTime: "2021-12-15 00:00:00",
          addName: "赵四",
          status: 1,
        },
      ],
      total: 0,
      size: 0,
      current: 0,
    };
  },
  created() {},
  methods: {
    // 表单筛选行为
    onSubmit() {},
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

    // // 表格删除操作  行为
    // deltSubmit (info) {
    //   console.log(info)
    //   this.delDialogVisible = true
    //   this.delFrom.id = info.id
    //   this.delFrom.idCard = info.idCard
    //   this.delFrom.name = info.name
    //   this.delFrom.phone = info.phone
    //   this.delFrom.isOurEmployees = info.isOurEmployees
    // },
    // // 删除方法
    // async delete () {
    //   await this.$http
    //     .post('/whiteList/delWhiteList', this.delFrom)
    //     .then((res) => {
    //       console.log(res)
    //       this.getWhiteList()
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    // // 确定删除
    // delWhiteItem () {
    //   this.delDialogVisible = false
    //   this.delete()
    // }
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
