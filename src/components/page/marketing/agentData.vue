<template>
  <div class="order-list">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="header-bar">
      <div class="header-bar-row">
        <el-form ref="form" :inline="true" :model="form" label-width="80">
          <el-row class="form-row">
            <el-form-item class="form-row-left" label="推广员：">
              <el-select v-model="form.publicist">
                <el-option value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="form.keyword" placeholder="请输入手机号、退款编号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSearch">搜索</el-button>
            </el-form-item>
          </el-row>
          <el-row class="form-row">
            <el-form-item label="加入时间" class="form-row-left">
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
              <el-button @click="handleExport">导出报表</el-button>
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
          <template slot-scope="scope">
            <div class="member-info" v-if="item.prop === 'memeber_name'">
              <div class="avatar">
                <img src="" alt="" width="50px" height="50px">
                <p class="avart-tag">普通会员</p>
              </div>
              <div class="member-name">
                <p class="title">会员名</p>
                <p class="phone">{{scope.row.memeber_phone}}</p>
                <p class="code">编号{{scope.row.memeber_no}}</p>
              </div>
            </div>
            <span v-else>{{scope.row[item.prop]}}</span>
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
import { getAgentData } from '@/api/marketing'
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
        { name: '推广员数据', router: 'AgentData' },
      ],
      form: {
        start_time: '',
        end_time: '',
        // todo: 待定
        publicist: '',
        keyword: '',
        page_size: 20,
        page_no: 1
      },
      columnCfg: [
        {label: '会员信息', prop: 'memeber_name', width: 220},
        {label: '最近消费', prop: 'last_buy'},
        {label: '消费次数', prop: 'buy_time', width: 220},
        {label: '累计消费', prop: 'total_buy'},
        {label: '注册时间', prop: 'reg_time'},
        {label: '归属门店', prop: 'shop_name'},
        {label: '健康管理师', prop: 'hm_name'},
        {label: '推广员', prop: 'secondary_name'}
      ],
      tableData: [],
      total: 0,
      dateArr: []
    }
  },
  created() {
    this.getTableData(1)
  },
  methods: {
    handleSearch() {
      this.getTableData(1)
    },
    getTableData(page) {
      this.form.page_no = page
      getAgentData(this.form).then(res => {
        const { data = [], all_count } = res.data || {}
        this.tableData = data
        this.total = all_count
      })
    },
    handleCurChange(page) {
      this.getTableData(page)
    },
    handleDateChange(val) {
      this.form.start_time = val[0]
      this.form.end_time = val[1]
    },
    handleExport() {}
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
  .member-info {
    display: flex;
  }
  .member-name {
    text-align: left;
    margin-left: 10px;
  }
  .title {
    color: #409EFF
  }
  .avart-tag {
    background-color: #409EFF;
    color: #ffffff;
  }
</style>