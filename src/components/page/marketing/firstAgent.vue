<template>
  <div class="order-list">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="header-bar">
      <div class="header-bar-row">
        <el-form ref="form" :inline="true" :model="form" label-width="80">
          <el-row class="form-row">
            <el-form-item class="form-row-left">
              <el-button type="primary" @click="handleAdd">添加一级推广员</el-button>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="form.keyword" placeholder="请输入推广员姓名或手机号" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSearch">搜索</el-button>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="添加时间">
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
            <el-button type="text" @click="downloadCode(scope.row.name)">下载邀请码</el-button>
            <span v-if="scope.row.secondary === 0">|</span>
            <el-button type="text" v-if="scope.row.secondary === 0" @click="handleRemove(scope.row.id)">清退</el-button>
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
    <el-dialog 
      :title="dialogTitle" 
      :visible.sync="dialogShow"
      width="460px"
      :close-on-click-modal="false"
    >
      <component
        :is="dialogName"
        :params="dialogPrms"
        @success="handleAddSuccess"
        @cancel="handleAddCancel"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import breadcrumb from '@/components/common/address'
import QrcodeDialog from './components/qrcodeDialog'
import AddAgent from './components/addAgent'
import dayjs from 'dayjs'
import { getFirstAgentList, addFirstAgent, removeAgent } from '@/api/marketing'
const dateFormatStr = 'YYYY-MM-DD HH:mm:ss'
export default {
  name: 'OrderList',
  components: {
    breadcrumb,
    QrcodeDialog,
    AddAgent
  },
  data() {
    return {
      breadcrumbList: [
        { name: '首页', router: 'dashboard' },
        { name: '推广员列表', router: 'FirstAgent' },
      ],
      form: {
        start_date: '',
        end_date: '',
        keyword: '',
        page_size: 20,
        page_no: 1
      },
      columnCfg: [
        {label: '推广员', prop: 'name'},
        {label: '别名', prop: 'alias'},
        {label: '归属地', prop: 'city', width: 220},
        {label: '手机号码', prop: 'phone'},
        {label: '下级推广员', prop: 'secondary'},
        {label: '添加时间', prop: 'create_time'}
      ],
      tableData: [],
      total: 0,
      dateArr: [],
      dialogTitle: '',
      dialogShow: false,
      dialogName: '',
      dialogPrms: {}
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
      getFirstAgentList(this.form).then(res => {
        const { data = [], all_count } = res.data || {}
        this.tableData = data
        this.total = all_count
      })
    },
    handleCurChange(page) {
      this.getTableData(page)
    },
    handleDateChange(val) {
      this.form.start_date = val[0]
      this.form.end_date = val[1]
    },
    handleAdd() {
      this.dialogTitle = '添加一级推广员'
      this.dialogName = 'addAgent',
      this.dialogPrms = null
      this.dialogShow = true
    },
    downloadCode(name) {
      this.dialogTitle = '邀请码-一级推广员姓名'
      this.dialogName = 'qrcodeDialog',
      this.dialogPrms = {codeContent: name}
      this.dialogShow = true
    },
    handleRemove(id) {
      this.$confirm('是否确认清退该一级推广员？', '是否清退', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params ={id: id}
        removeAgent(params).then(res => {
          if (res.code === 200) {
            this.$message.success('清退成功')
            this.getTableData(this.form.page_no)
          }
        }).catch(err => {
          console.log(err)
        })
      })
    },
    handleAddSuccess() {
      this.getTableData(this.form.page_no)
      this.dialogShow = false
    },
    handleAddCancel() {
      this.dialogShow = false
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