<template>
  <div class="order-list">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="header-bar">
      <div class="header-bar-row">
        <el-form ref="form" :inline="true" :model="form" label-width="80">
          <el-row class="form-row">
            <el-form-item class="form-row-left" label="推广员：">
              <el-select v-model="form.publicist">
                <el-option
                  v-for="item in secondAgentOptions"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="form.keyword" placeholder="请输入二级推广员姓名或手机号"></el-input>
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
                value-format="yyyy-MM-dd"
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
                <img :src="scope.row.head_img" alt="" width="50px" height="50px">
                <p class="avart-tag">{{scope.row.level_name}}</p>
              </div>
              <div class="member-name">
                <p class="title">{{scope.row.memeber_name}}</p>
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
import { getAgentData, getSecondAgentOptions, exportData } from '@/api/marketing'
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
        publicist: '',
        keyword: '',
        page_size: 20,
        page_no: 1
      },
      columnCfg: [
        {label: '会员信息', prop: 'memeber_name', width: 240},
        {label: '最近消费', prop: 'last_buy'},
        {label: '消费次数', prop: 'buy_time'},
        {label: '累计消费', prop: 'total_buy'},
        {label: '注册时间', prop: 'reg_time', width: 220},
        {label: '归属门店', prop: 'shop_name'},
        {label: '健康管理师', prop: 'hm_name'},
        {label: '推广员', prop: 'secondary_name'}
      ],
      tableData: [],
      total: 0,
      dateArr: [],
      secondAgentOptions: []
    }
  },
  created() {
    this.getSecondAgentOpions()
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
    getSecondAgentOpions() {
      getSecondAgentOptions().then(res => {
        const { data } = res
        this.secondAgentOptions = data
      }).catch(err => {
        console.log(err)
      })
    },
    handleCurChange(page) {
      this.getTableData(page)
    },
    handleDateChange(val) {
      this.form.start_time = val[0]
      this.form.end_time = val[1]
    },
    handleExport() {
      const params = {
        keyword: this.form.keyword,
        start_date: this.form.start_time,
        end_date: this.form.end_time,
        publicist_id: this.form.publicist
      }
      exportData(params).then(res => {
        const { code, msg, data } = res
        if (code === 200) {
          const { download } =data
          let blocked = false
          try {
            var wroxWin = window.open(download, '_blank')
            if (wroxWin == null) {
              blocked = true
            }
          } catch (ex) {
            blocked = true
          }
          if (blocked) {
            this.$alert('下载弹窗被您的浏览器阻止，请点击网址右侧，选择允许弹窗', '温馨提示')
          }
        } else {
          this.$message.error(msg)
        }
      })
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