<template>
  <div class="order-list">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="header-bar">
      <div class="header-bar-row">
        <el-form ref="form" :inline="true" :model="form" label-width="80">
          <el-row class="form-row">
            <el-form-item class="form-row-left">
              <el-button type="primary" @click="handleBilling">开单收银</el-button>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="form.keyword" placeholder="请输入手机号、退款编号"></el-input>
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
                <el-button :type="buttonTypes['all']? 'primary': ''" plain @click="handleClickDate('all')">全部</el-button>
                <el-button :type="buttonTypes[0]? 'primary': ''" plain @click="handleClickDate(0)">今天</el-button>
                <el-button :type="buttonTypes[3]? 'primary': ''" plain @click="handleClickDate(3)">近3天</el-button>
                <el-button :type="buttonTypes[7]? 'primary': ''" plain @click="handleClickDate(7)">近7天</el-button>
              </div>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="退款方式：" class="form-item">
              <el-select v-model="form.refund_way" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option label="原路返回" value="原路返回"></el-option>
                <el-option label="现金退款" value="现金退款"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退款门店：" class="form-item">
              <span>多多亲子岁月一店</span>
            </el-form-item>
            <el-form-item label="订单来源：" class="form-item">
              <el-select v-model="form.source" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option label="第三方支付" value="第三方支付"></el-option>
                <el-option label="店内消费" value="店内消费"></el-option>
                <el-option label="线上支付" value="线上支付"></el-option>
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
            <el-button type="text" @click="jumpToDetail(scope.row.order_id)">查看订单</el-button>
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
        keyword: '',
        end_time: '',
        refund_way: '',
        source: '',
        page_size: 20,
        page_no: 0
      },
      columnCfg: [
        {label: '退单编号', prop: 'refund_no', width: 180},
        {label: '操作时间', prop: 'create_time', width: 180},
        {label: '订单编号', prop: 'order_no', width: 200},
        {label: '退款门店', prop: 'shop_name'},
        {label: '订单金额（元）', prop: 'order_price'},
        {label: '退款金额（元）', prop: 'refund_price'},
        {label: '状态', prop: 'refund_status'},
      ],
      tableData: [],
      total: 0,
      dateArr: [],
      buttonTypes: {
        'all': false,
        0: false,
        3: false,
        7: false
      }
    }
  },
  created() {
    this.getTableData(0)
  },
  methods: {
    handleClickDate(num) {
      Object.keys(this.buttonTypes).forEach(item => {
        this.buttonTypes[item] = false
      })
      this.buttonTypes[num] = true

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
          this.form.end_time = now
          break
        case 7:
          this.form.start_time = dayjs().subtract(7, 'day').format(dateFormatStr)
          this.form.end_time = now
          break
      }
      this.dateArr = [this.form.start_time, this.form.end_time ]
    },
    handleSearch() {
      this.getTableData(0)
    },
    getTableData(page) {
      this.form.page_no = page
      getRefundList(this.form).then(res => {
        const { data, all_count } = res.data
        this.tableData = data
        this.total = all_count
      })
    },
    jumpToDetail(orderId) {
      this.$router.push(`/RefundDetail/${orderId}`)
    },
    handleCurChange(page) {
      this.getTableData(page)
    },
    handleDateChange(val) {
      this.form.start_time = val[0]
      this.form.end_time = val[1]
    },
    handleBilling() {
      this.$router.push('/workbench')
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