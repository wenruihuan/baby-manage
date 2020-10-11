<template>
  <div class="order-list">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="header-bar">
      <div class="header-bar-row">
        <el-form ref="form" :inline="true" :model="form" label-width="80">
          <el-row class="form-row">
            <el-form-item label="订购门店：" class="form-row-left">
              <span>多多亲子岁月一店</span>
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
            <el-form-item label="订购时间：">
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
            <el-form-item>
              <el-button>导出报表</el-button>
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
        <el-tab-pane label="待发货" name="unPay">
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
        <el-tab-pane label="已发货" name="done">
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
                <el-button type="text" @click="jumpToOrderDetail">查看地址</el-button>|
                <el-button type="text" @click="jumpToOrderDetail">发货</el-button>
                <el-button type="text" @click="jumpToOrderDetail">查看详情</el-button>
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
        { name: '商品订单列表', router: 'ProductOrderList' }
      ],
      form: {
        name: '',
        dateMention: 0
      },
      columnCfg: [
        {label: '商品订单编号', prop: '1', width: 220},
        {label: '订购时间', prop: '2'},
        {label: '订购门店', prop: '3'},
        {label: '商品', prop: '4'},
        {label: '数量', prop: '5'},
        {label: '订购人', prop: '6'},
        {label: '配送方式', prop: '7'},
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