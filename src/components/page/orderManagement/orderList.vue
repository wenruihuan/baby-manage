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
              <el-select v-model="inputName">
                <el-option label="订单编号" value="order_no"></el-option>
                <el-option label="会员名" value="memeber_name"></el-option>
                <el-option label="会员手机号" value="memeber_phone"></el-option>
                <el-option label="技师" value="technician_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="inputValue" prefix-icon="el-icon-search" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSearch">搜索</el-button>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="下单时间：">
              <el-date-picker 
                type="daterange"
                range-separator="至"
                v-model="dateArr"
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
            <el-form-item label="下单门店：" class="form-item">
              <span>多多亲子岁月一店</span>
            </el-form-item>
            <el-form-item label="订单来源：" class="form-item">
              <el-select v-model="form.order_source">
                <el-option label="全部" value=""></el-option>
                <el-option label="第三方支付" value="第三方支付"></el-option>
                <el-option label="店内消费" value="店内消费"></el-option>
                <el-option label="线上支付" value="线上支付"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单类型：" class="form-item">
              <el-select v-model="form.type">
                <el-option label="全部" value=""></el-option>
                <el-option label="服务订单" value="service"></el-option>
                <el-option label="折扣卡订单" value="discount_card"></el-option>
                <el-option label="次卡订单" value="time_card"></el-option>
                <el-option label="充值卡订单" value="recharge_card"></el-option>
                <el-option label="充值订单" value="recharge"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="付款方式：" class="form-item">
              <el-select v-model="form.pay_type_id">
                <el-option
                  v-for="item in paymentOpts"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="main-body">
      <el-tabs type="card" v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="全部" name="all">
          <el-table :data="dataAll" border style="width: 100%">
            <el-table-column 
              v-for="item in columnCfg" :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              align="center"
            >
              <template slot-scope="scoped">
                <div v-if="item.prop === 'price'">
                  <span v-if="scoped.row.type === 'service'">{{scoped.row.price}}</span>
                  <span v-else>{{scoped.row.total_price}}</span>
                </div>
                <span v-else>{{scoped.row[item.prop]}}</span>
              </template>
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
            :total="totalAll"
            :page-sizes="[20]"
            @current-change="handleCurChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="unPay">
          <el-table :data="dataUnPay" border style="width: 100%">
            <el-table-column 
              v-for="item in columnCfg" :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              align="center"
            >
              <template slot-scope="scoped">
                <div v-if="item.prop === 'price'">
                  <span v-if="scoped.row.type === 'service'">{{scoped.row.price}}</span>
                  <span v-else>{{scoped.row.total_price}}</span>
                </div>
                <span v-else>{{scoped.row[item.prop]}}</span>
              </template>
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
            :total="totalUnPay"
            :page-sizes="[20]"
            @current-change="handleCurChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="done">
          <el-table :data="dataDone" border style="width: 100%">
            <el-table-column 
              v-for="item in columnCfg" :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              align="center"
            >
              <template slot-scope="scoped">
                <div v-if="item.prop === 'price'">
                  <span v-if="scoped.row.type === 'service'">{{scoped.row.price}}</span>
                  <span v-else>{{scoped.row.total_price}}</span>
                </div>
                <span v-else>{{scoped.row[item.prop]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <!-- todo: 2:已发货，待确认 -->
                <el-button  type="text" @click="jumpToOrderDetail(scope.row.order_id)">查看订单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page-ctner"
            :page-size="20"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalDone"
            :page-sizes="[20]"
            @current-change="handleCurChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="已取消" name="cancel">
          <el-table :data="dataCancel" border style="width: 100%">
            <el-table-column 
              v-for="item in columnCfg" :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              align="center"
            >
              <template slot-scope="scoped">
                <div v-if="item.prop === 'price'">
                  <span v-if="scoped.row.type === 'service'">{{scoped.row.price}}</span>
                  <span v-else>{{scoped.row.total_price}}</span>
                </div>
                <span v-else>{{scoped.row[item.prop]}}</span>
              </template>
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
            :total="totalCancel"
            :page-sizes="[20]"
            @current-change="handleCurChange"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import breadcrumb from '@/components/common/address'
import { getOrderList, getPaymentList } from '@/api/orderManagement'
const tabDataCfg = {
  all: { data: 'dataAll', total: 'totalAll', orderStatus: '' },
  unPay: { data: 'dataUnPay', total: 'totalUnPay', orderStatus: 0 },
  done: { data: 'dataDone', total: 'totalDone', orderStatus: 3 },
  cancel: { data: 'dataCancel', total: 'totalCancel', orderStatus: 5 }
}
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
        { name: '订单列表', router: 'OrderList' }
      ],
      inputName: 'order_no',
      inputValue: '',
      dateArr: [],
      paymentOpts: [],
      form: {
        page_no: 0,
        start_time: '',
        end_time: '',
        page_size: 20,
        order_source: '',
        pay_type_id: '',
        type: '',
        order_status: ''
      },
      columnCfg: [
        {label: '订单编号', prop: 'order_no', width: '200'},
        {label: '下单时间', prop: 'create_time'},
        {label: '购买项目', prop: 'order_name'},
        {label: '技师', prop: 'technician_name'},
        {label: '单价（元）', prop: 'price'},
        {label: '数量', prop: 'count'},
        {label: '订单来源', prop: 'order_source'},
        {label: '下单门店', prop: 'shop_name'},
        {label: '订单金额（元）', prop: 'total_price'},
        {label: '状态', prop: 'order_status'},
      ],
      activeTab: 'all',
      dataAll: [],
      dataUnPay: [],
      dataDone: [],
      dataCancel: [],
      totalAll: 0,
      totalUnPay: 0,
      totalDone: 0,
      totalCancel: 0
    }
  },
  created() {
    this.init()
    console.log(dayjs().startOf('day').format(dateFormatStr))
  },
  methods: {
    init() {
      this.getPaymentList()
      this.handleTabClick()
    },
    getPaymentList() {
      getPaymentList().then(res => {
        const { data } = res
        this.paymentOpts = data
      })
    },
    handleSearch() {
      this.getTableData(1)
    },
    handleTabClick() {
      this.form.order_status = tabDataCfg[this.activeTab].orderStatus
      if (this[tabDataCfg[this.activeTab].data].length === 0) {
        this.getTableData(1)
      }
    },
    getTableData(page) {
      this.form.page_no = page
      this.inputName && (this.form[this.inputName] = this.inputValue)
      getOrderList(this.form).then(res => {
        const { data, all_count } = res.data
        this[tabDataCfg[this.activeTab].total] = all_count
        this[tabDataCfg[this.activeTab].data] = data
      }).catch(err => {
        console.log(err)
      })
    },
    jumpToOrderDetail(orderId) {
      this.$router.push(`/orderDetail/${orderId}`)
    },
    handleCurChange(page) {
      this.getTableData(page)
    },
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
          this.form.end_time = now
          break
        case 7:
          this.form.start_time = dayjs().subtract(7, 'day').format(dateFormatStr)
          this.form.end_time = now
          break
      }
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