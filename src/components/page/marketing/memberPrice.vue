<template>
  <div class="order-list">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="main-body">
      <div class="info-title">
        单个商品设置会员价
        <el-button type="primary" plain>添加商品</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%; margin-top: 20px;">
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <div>
              <img src="" alt="">
              <span></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column 
          v-for="item in columnCfg" :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="downloadCode">下载邀请码</el-button>
            <span>|</span>
            <el-button type="text" @click="handleRepay">清退</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-ctner"
        :page-size="20"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[20]"
        @current-change="handleCurChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import breadcrumb from '@/components/common/address'
import dayjs from 'dayjs'
const dateFormatStr = 'YYYY-MM-DD HH:mm:ss'
export default {
  name: 'OrderList',
  components: {
    breadcrumb
  },
  data() {
    return {
      breadcrumbList: [
        { name: '首页', router: 'dashboard' },
        { name: '推广员列表', router: 'SecondAgent' },
      ],
      form: {
        start_time: '',
        end_time: '',
        // todo: 待定
        first_agent: '',
        input_value: '',
        page_size: 20,
        page_no: 0
      },
      columnCfg: [
        {label: '售价', prop: '1'},
        {label: '优惠方式', prop: '2'},
        {label: '多多会员', prop: '3', width: 220},
        {label: '亲子会员', prop: '4'},
        {label: '黄金会员', prop: '5'},
        {label: '铂金会员', prop: '6'},
        {label: '钻石会员', prop: '6'}
      ],
      tableData: [],
      total: 0,
      dateArr: []
    }
  },
  created() {
    this.getTableData(0)
  },
  methods: {
    handleSearch() {
      this.getTableData(0)
    },
    getTableData(page) {
      // todo: 入参待补全
      this.form.page_no = page
      // getChargeBackList(this.form).then(res => {
      //   const { data, all_count } = res
      //   this.tableData = data
      //   this.total = all_count
      // })
    },
    jumpToOrderDetail(orderId) {
      this.$router.push(`/RefundDetail/${orderId}`)
    },
    handleCurChange(page) {
      this.getTableData(page)
    },
    handleDateChange(val) {
      this.form.start_time = val[0]
      this.form.end_time = val[1]
    }
  }
}
</script>

<style lang="css" scoped>
  .main-body {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    border: 0;
    margin-top: 20px;
    overflow: hidden;
  }
  .info-title {
    justify-content: space-between;
    padding-right: 20px;
  }
  .page-ctner {
    float: right;
    margin-top: 20px;
  }
  .form-row {
    display: flex;
  }
  .form-row-left {
    flex: 1;
  }
  .form-item {
    margin-right: 120px;
  }
</style>