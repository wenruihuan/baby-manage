<template>
  <div class="order-list">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="header-bar">
      <div class="header-bar-row">
        <el-form ref="form" :inline="true" :model="form" label-width="80">
          <el-row class="form-row">
            <el-form-item class="form-row-left" label="一级推广员：">
              <el-select v-model="form.publicist_id">
                <el-option 
                  v-for="item in firstAgentOptions"
                  :value="item.id"
                  :label="item.name"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="form.keyword" placeholder="请输入手机号、退款编号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSearch">搜索</el-button>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="加入时间">
              <el-date-picker 
                type="daterange"
                v-model="dateArr"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
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
          :formatter="item.formatter"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="downloadCode(scope.row.name)">下载邀请码</el-button>
            <span>&nbsp;|&nbsp;</span>
            <el-button type="text" v-if="scope.row.member_count === 0" @click="handleRemove(scope.row.id)"> | 清退</el-button>
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
      v-if="dialogShow"
      title="推广码-二级推广员姓名"
      width="460px"
      :visible.sync="dialogShow"
      :close-on-click-modal="false"
    >
     <qrcode-dialog :params="{codeContent: codeText}"></qrcode-dialog> 
    </el-dialog>
  </div>
</template>

<script>
import breadcrumb from '@/components/common/address'
import QrcodeDialog from './components/qrcodeDialog'
import dayjs from 'dayjs'
import { getFirstAgentOptions, getSecondAgentList, removeAgent } from '@/api/marketing'
const dateFormatStr = 'YYYY-MM-DD HH:mm:ss'
export default {
  name: 'OrderList',
  components: {
    breadcrumb,
    QrcodeDialog
  },
  data() {
    return {
      breadcrumbList: [
        { name: '首页', router: 'dashboard' },
        { name: '推广员列表', router: 'SecondAgent' },
      ],
      form: {
        start_date: '',
        end_date: '',
        publicist_id: '',
        keyword: '',
        page_size: 20,
        page_no: 1
      },
      columnCfg: [
        {label: '推广员', prop: 'name'},
        {label: '别名', prop: 'alias'},
        {label: '归属地', prop: 'city', width: 220},
        {label: '手机号码', prop: 'phone'},
        {label: '所属一级推广员', prop: 'parent_name'},
        {label: '推荐用户', prop: 'member_count'},
        {label: '加入时间', prop: 'create_time', formatter: this.dateFormatter}
      ],
      tableData: [],
      total: 0,
      dateArr: [],
      dialogShow: false,
      codeText: '',
      firstAgentOptions: []
    }
  },
  created() {
    this.getFirstAgentOptions()
    this.getTableData(1)
  },
  methods: {
    handleSearch() {
      this.getTableData(1)
    },
    getFirstAgentOptions() {
      getFirstAgentOptions().then(res => {
        const {data} = res
        this.firstAgentOptions = data
      }).catch(err => {
        console.log(err)
      })
    },
    getTableData(page) {
      this.form.page_no = page
      getSecondAgentList(this.form).then(res => {
        const { data=[], all_count } = res.data || {}
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
    downloadCode(name) {
      this.dialogShow = true
      this.codeText = name
    },
    handleRemove(id) {
      this.$confirm('是否确认清退该二级推广员？', '是否清退', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params = { id: id }
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
    dateFormatter(row, column, cellValue, index) {
      if (cellValue) {
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
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