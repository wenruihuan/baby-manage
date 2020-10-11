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
              <el-select v-model="form.name">
                <el-option label="订单编号" :value="1"></el-option>
                <el-option label="会员名" :value="2"></el-option>
                <el-option label="会员手机号" :value="3"></el-option>
                <el-option label="技师" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-search" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button>搜索</el-button>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="下单时间：">
              <el-date-picker 
                type="daterange"
                range-separator="至"
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
              <el-select>
                <el-option label="全部" :value="0"></el-option>
                <el-option label="第三方支付" :value="1"></el-option>
                <el-option label="店内消费" :value="2"></el-option>
                <el-option label="线上支付" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单类型：" class="form-item">
              <el-select>
                <el-option label="全部" :value="0"></el-option>
                <el-option label="服务订单" :value="1"></el-option>
                <el-option label="卡项订单" :value="2"></el-option>
                <el-option label="充值订单" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="付款方式：" class="form-item">
              <el-select>
                <el-option label="全部" :value="0"></el-option>
                <el-option label="微信" :value="1"></el-option>
                <el-option label="支付宝" :value="2"></el-option>
                <el-option label="现金" :value="3"></el-option>
                <el-option label="卡内余额" :value="4"></el-option>
                <el-option label="其他自定义记账方式" :value="5"></el-option>
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
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="jumpToOrderDetail">查看订单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page-ctner"
            :page-size="20"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="30"
            :page-sizes="[20]"
            @current-change="handleCurChange"
            @prev-click="handlePrevClick"
            @next-click="handleNextClick"
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
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="jumpToOrderDetail">查看订单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page-ctner"
            :page-size="20"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="30"
            :page-sizes="[20]"
            @current-change="handleCurChange"
            @prev-click="handlePrevClick"
            @next-click="handleNextClick"
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
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="jumpToOrderDetail">查看订单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page-ctner"
            :page-size="20"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="30"
            :page-sizes="[20]"
            @current-change="handleCurChange"
            @prev-click="handlePrevClick"
            @next-click="handleNextClick"
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
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="jumpToOrderDetail">查看订单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page-ctner"
            :page-size="20"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="30"
            :page-sizes="[20]"
            @current-change="handleCurChange"
            @prev-click="handlePrevClick"
            @next-click="handleNextClick"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import breadcrumb from '@/components/common/address'
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
      form: {
        name: '',
        dateMention: 0
      },
      columnCfg: [
        {label: '订单编号', prop: '1', width: '200'},
        {label: '下单时间', prop: '2'},
        {label: '购买项目', prop: '3'},
        {label: '技师', prop: '4'},
        {label: '单价（元）', prop: '5'},
        {label: '数量', prop: '6'},
        {label: '订单来源', prop: '7'},
        {label: '下单门店', prop: '8'},
        {label: '订单金额（元）', prop: '9'},
        {label: '状态', prop: '10'},
      ],
      activeTab: 'all',
      tableDataAll: [],
      tableDataUnPay: [],
      tableData:[]
    }
  },
  created() {

  },
  methods: {
    handleTabClick() {},
    jumpToOrderDetail() {
    },
    handleCurChange() {},
    handlePrevClick() {
    },
    handleNextClick() {}
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