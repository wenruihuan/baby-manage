<template>
  <div class="order-list">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="header-bar">
      <div class="header-bar-row">
        <el-form ref="form" :inline="true" :model="form" label-width="80">
          <el-row class="form-row">
            <el-form-item class="form-row-left">
              <el-button type="primary">开单收银</el-button>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-search" placeholder="请输入手机号、退款编号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSearch">搜索</el-button>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="操作时间">
              <el-date-picker 
                type="daterange"
                v-model="dateArr"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="handleDateChange"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <div class="btn-list">
                <el-button @click="handleClickDate('all')">全部</el-button>
                <el-button @click="handleClickDate(0)">今天</el-button>
                <el-button @click="handleClickDate(3)">近3天</el-button>
                <el-button @click="handleClickDate(7)">近7天</el-button>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="退款方式：" class="form-item">
              <el-select v-model="form.refund_type_id">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="原路返回" :value="1"></el-option>
                <el-option label="现金退款" :value="2"></el-option>
                <el-option label="其他" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退款门店：" class="form-item">
              <span>多多亲子岁月一店</span>
            </el-form-item>
            <el-form-item label="订单来源：" class="form-item">
              <el-select v-model="form.order_source">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="第三方支付" :value="1"></el-option>
                <el-option label="店内消费" :value="2"></el-option>
                <el-option label="线上支付" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="main-body">
      <el-table :data="tableData" border style="width: 100%">
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
            <el-button type="text" @click="jumpToOrderDetail(scope.row.order_id)">查看订单</el-button>
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
import { getRefundList } from '@/api/orderManagement'
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
        { name: '订单管理', router: 'OrderList' },
        { name: '退单列表', router: 'RefundList' }
      ],
      form: {
        start_time: '',
        end_time: '',
        // todo: 待定
        refund_type_id: '',
        order_source: '',
        page_size: 20,
        page_no: 0
      },
      columnCfg: [
        {label: '退单编号', prop: '1'},
        {label: '操作时间', prop: '2'},
        {label: '订单编号', prop: '3', width: 220},
        {label: '退款门店', prop: '4'},
        {label: '订单金额（元）', prop: '5'},
        {label: '退款金额（元）', prop: '6'},
        {label: '状态', prop: '10'},
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
    handleClickDate(num) {
      const now = dayjs().format(dateFormatStr)
      switch(num) {
        case 'all':
          this.form.start_time = ''
          this.form.end_time = ''
          break
        case 0:
          this.form.start_time = dayjs().startOf('day').format(dateFormatStr)
          this.form.end_time = now
          break
        case 3: 
          this.form.start_time = dayjs().subtract(3, 'day').format(dateFormatStr)
          this.form.start_time = now
          break
        case 7:
          this.form.start_time = dayjs().subtract(7, 'day').format(dateFormatStr)
          this.form.start_time = now
          break
      }
    },
    handleSearch() {
      this.getTableData(0)
    },
    getTableData(page) {
      // todo: 入参待补全
      this.form.page_no = page
      getRefundList(this.form).then(res => {
        const { data, all_count } = res
        this.tableData = data
        this.total = all_count
      })
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
  .header-bar, .main-body {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    border: 0;
    margin-top: 20px;
    overflow: hidden;
  }
  .btn-list {
    padding-left: 20px;
  }
  .btn-list .el-button {
    margin: 0 15px;
    border: none;
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