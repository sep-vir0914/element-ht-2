<!--
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
-->
<template>
  <div>
    <!-- 筛选卡片 -->
    <el-card>
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
      <!-- 筛选表单区域 -->
      <div class="text item" :class="{ active: isActive }">
        <el-form
          label-width="90px"
          :model="formInline"
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item label="交易时间">
            <el-date-picker
              v-model="formInline.tradeTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="业务订单号" >
            <el-input
              v-model="formInline.businessOrderNo"
              placeholder="请输入业务订单号"
            ></el-input>
          </el-form-item>
          <!--  -->
          <el-form-item label="商户订单号">
            <el-input
              v-model="formInline.merchantOrderNo"
              placeholder="请输入商户订单号"
            ></el-input>
          </el-form-item>
          <!--  -->
          <el-form-item label="交易订单号">
            <el-input
              v-model="formInline.merchantOrderNo"
              placeholder="请输入交易订单号"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select
              v-model="formInline.orderStatus"
              placeholder="全部"
              name="orderStatus"
            >
              <el-option label="初始化" value="INIT"></el-option>
              <el-option label="支付中" value="PAYMENTS_CENTER"></el-option>
              <el-option label="支付完成" value="PAYMENTS_SUCCESS"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易类型">
            <el-select
              v-model="formInline.tradeType"
              placeholder="全部"
              name="tradeType"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select
              v-model="formInline.modesOfPayment"
              placeholder="全部"
              name="modesOfPayment"
            >
              <el-option label="银联" value="shanghai"></el-option>
              <el-option label="支付宝" value="beijing"></el-option>
              <el-option label="微信" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付类型">
            <el-select
              v-model="formInline.typeOfPayment"
              placeholder="全部"
              name="typeOfPayment"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i>查询</el-button>
            <el-button type="info" plain @click="resetFormInline"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 表格卡片 -->
    <el-card class="box-card-table">
      <el-button type="primary" size="medium" style="margin-bottom: 15px" plain>批量导出</el-button>
      <el-table :data="tableList" stripe style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column fixed prop="tradeTime" label="交易时间" width="150">
        </el-table-column>
        <el-table-column prop="merchantName" label="商户名称" width="120">
        </el-table-column>
        <el-table-column prop="businessOrderNo" label="业务订单号" width="150">
        </el-table-column>
        <el-table-column prop="orderType" label="订单类型" width="120">
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="localOrderNo" label="本地订单号" width="150">
        </el-table-column>
        <el-table-column prop="tradeType" label="交易类型" width="120">
        </el-table-column>
        <el-table-column
          prop="externalOrderNumber"
          label="外部订单号"
          width="170"
        >
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.orderStatus == 'INIT'">初始化</span>
            <span v-else-if="scope.row.orderStatus == 'PAYMENTS_CENTER'"
              >支付中</span
            >
            <span v-else-if="scope.row.orderStatus == 'PAYMENTS_SUCCESS'"
              >支付完成</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="transactionAmount" label="交易金额" width="120">
        </el-table-column>
        <el-table-column prop="payCharge" label="支付手续费" width="120">
        </el-table-column>
        <el-table-column prop="modesOfPayment" label="支付方式" width="120">
        </el-table-column>
        <el-table-column prop="typeOfPayment" label="支付类型" width="120">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="120">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.userId)" type="text" size="small"
              >查看</el-button
            >
            <el-button v-if="false" type="text" size="small">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10]"
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
  data () {
    return {
      // 筛选隐藏与显示
      isActive: false,
      activeNames: ['1'],
      formInline: {
        tradeTime: '', // 交易时间
        businessOrderNo: '', // 业务订单号
        externalOrderNumber: '', // 外部订单号
        localOrderNo: '', // 本地(平台)订单号
        merchantName: '', // 商户名称
        modesOfPayment: '', // 支付方式
        orderStatus: '', // 订单状态
        orderType: '', // 订单类型
        payCharge: '', // 支付手续费
        productName: '', // 商品名称
        tradeType: '', // 交易类型
        typeOfPayment: '', // 支付类型
        transactionAmount: '' // 交易金额
      },

      // 提交参数
      postInfo: {
        current: 1,
        size: 5
      },
      //   表格数据
      tableList: [],
      // 总条数
      total: 0,
      // 每页显示几条
      size: 0,
      // 当前页
      current: 0
    }
  },
  created () {
    this.getTableData()
    console.log(this.tableList)
  },
  methods: {
    onSubmit () {
      // 筛选
      this.getTableData()
    },
    // 表单重置行为
    resetFormInline () {
      this.formInline = {
        tradeTime: '', // 交易时间
        businessOrderNo: '', // 业务订单号
        externalOrderNumber: '', // 外部订单号
        localOrderNo: '', // 本地(平台)订单号
        merchantName: '', // 商户名称
        modesOfPayment: '', // 支付方式
        orderStatus: '', // 订单状态
        orderType: '', // 订单类型
        payCharge: '', // 支付手续费
        productName: '', // 商品名称
        tradeType: '', // 交易类型
        typeOfPayment: '', // 支付类型
        transactionAmount: '' // 交易金额
      }
      // this.getWhiteList()
    },
    // 显示与隐藏
    changeIsActive () {
      this.isActive = !this.isActive
    },
    // 获取表格数据/dealOrder/getDealOrderList
    async getTableData () {
      // this.$http.post('/dealOrder/getDealOrderList', {
      //   businessOrderNo: '',
      //   current: 1,
      //   externalOrderNumber: '',
      //   localOrderNo: '',
      //   merchantName: '',
      //   modesOfPayment: '',
      //   orderStatus: '',
      //   orderType: '',
      //   payCharge: '',
      //   productName: '',
      //   size: 5,
      //   tradeType: '',
      //   transactionAmount: ''
      // })
      await this.$http
        .post('/dealOrder/getDealOrderList', {
          // 筛选表单字段
          tradeTime: this.formInline.tradeTime, // 交易时间
          businessOrderNo: this.formInline.businessOrderNo, // 业务订单号
          orderStatus: this.formInline.orderStatus, // 订单状态
          tradeType: this.formInline.tradeType, // 交易类型
          modesOfPayment: this.formInline.modesOfPayment, // 支付方式
          typeOfPayment: this.formInline.typeOfPayment, // 支付类型
          // post表单页码 与条数字段
          current: this.postInfo.current,
          size: this.postInfo.size
        })
        .then((res) => {
          // console.log(res.data.result.records)
          this.tableList = res.data.result.records
          this.total = res.data.result.total
          this.size = res.data.result.size
          this.current = res.data.result.current
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 表格行为
    handleClick (userId) {
      console.log(userId)
      this.$router.push({
        path: `/orderDetails/${userId}`

      })
    },
    // 分页行为
    // 每页显示数据改变时触发
    handleSizeChange (nweSize) {
      console.log(nweSize)
      this.postInfo.size = nweSize
      this.getTableData()
    },
    // 页码值改变时触发
    handleCurrentChange (newCurrent) {
      console.log(newCurrent)
      this.postInfo.current = newCurrent
      this.getTableData()
      this.current = newCurrent
    }
  }
}
</script>
<style scoped>
/* 面包屑 */
.el-breadcrumb{
    line-height: 16px;
    margin-bottom: 10px;
}
.one{
    font-weight: 400;
    color: #606266;
}
.two{
    font-size: 16px;
    color: black;
}
/* 筛选卡片 */
.box-card {
  margin-top: 10px;
}
.active {
  display: none;
}
.el-input{
    width: 230px;
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
  content: '';
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
