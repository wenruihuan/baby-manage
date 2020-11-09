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
              <el-select v-model="inputName">
                <el-option label="订单编号" value="order_no"></el-option>
                <el-option label="会员名" value="member_name"></el-option>
                <el-option label="会员手机号" value="member_phone"></el-option>
                <el-option label="订单状态" value="order_status"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="inputValue" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSearch">搜索</el-button>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="订购时间：">
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
            <el-form-item>
              <el-button @click="handleExport">导出报表</el-button>
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
              :show-overflow-tooltip="item.showOverflowTooltip"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.order_info.order_status === '2'" type="text" @click="jumpToOrderDetail(scope.row.order_info.order_id)">查看订单</el-button>
                <p v-if="scope.row.order_info.order_status === '1'">
                  <el-popover
                    placement="top-start"
                    width="400"
                    trigger="click">
                    <div class="pop-content">
                      <div class="popRow">
                        <p class="popRow-label">收件人：</p>
                        <p class="popRow-text">{{scope.row.express_info.receiver}}/+86 {{scope.row.express_info.phone}}</p>
                      </div>
                      <div class="popRow">
                        <p class="popRow-label">收件人地址：</p>
                        <p class="popRow-text">{{scope.row.express_info.region}} {{scope.row.express_info.detail_address}}</p>
                      </div>
                    </div>
                    <el-button slot="reference" type="text">查看地址</el-button> 
                  </el-popover>
                  <span>|</span>
                  <el-button type="text" @click="showSendDialog(scope.row.order_info.order_id)">发货</el-button>
                </p>
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
        <el-tab-pane label="待发货" name="toSend">
          <el-table :data="dataToSend" border style="width: 100%">
            <el-table-column 
              v-for="item in columnCfg" :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              :show-overflow-tooltip="item.showOverflowTooltip"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.order_info.order_status === '2'" type="text" @click="jumpToOrderDetail(scope.row.order_info.order_id)">查看订单</el-button>
                <p v-if="scope.row.order_info.order_status === '1'">
                  <el-popover
                    placement="top-start"
                    width="400"
                    trigger="click">
                    <div class="pop-content">
                      <div class="popRow">
                        <p class="popRow-label">收件人：</p>
                        <p class="popRow-text">{{scope.row.express_info.receiver}}/+86 12312312321</p>
                      </div>
                      <div class="popRow">
                        <p class="popRow-label">收件人地址：</p>
                        <p class="popRow-text">{{scope.row.express_info.region}} {{scope.row.express_info.region.detail_address}}</p>
                      </div>
                    </div>
                    <el-button slot="reference" type="text">查看地址</el-button> 
                  </el-popover>
                  <span>|</span>
                  <el-button type="text" @click="showSendDialog(scope.row.order_info.order_id)">发货</el-button>
                </p>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page-ctner"
            :page-size="20"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalToSend"
            :page-sizes="[20]"
            @current-change="handleCurChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="已发货" name="done">
          <el-table :data="dataDone" border style="width: 100%">
            <el-table-column 
              v-for="item in columnCfg" :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              :show-overflow-tooltip="item.showOverflowTooltip"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.order_info.order_status === '2'" type="text" @click="jumpToOrderDetail(scope.row.order_info.order_id)">查看订单</el-button>
                <p v-if="scope.row.order_info.order_status === '1'">
                  <el-popover
                    placement="top-start"
                    width="400"
                    trigger="click">
                    <div class="pop-content">
                      <div class="popRow">
                        <p class="popRow-label">收件人：</p>
                        <p class="popRow-text">{{scope.row.express_info.receiver}}/+86 12312312321</p>
                      </div>
                      <div class="popRow">
                        <p class="popRow-label">收件人地址：</p>
                        <p class="popRow-text">{{scope.row.express_info.region}}{{scope.row.express_info.detail_address}}</p>
                      </div>
                    </div>
                    <el-button slot="reference" type="text">查看地址</el-button> 
                  </el-popover>
                  <span>|</span>
                  <el-button type="text" @click="showSendDialog(scope.row.order_info.order_id)">发货</el-button>
                </p>
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
      </el-tabs>
    </div>
    <el-dialog
      title="发货"
      :close-on-click-modal="false"
      :visible.sync="dialogShow"
      @before-close="handleDialogClose"
    >
      <el-form ref="sendForm" :model="sendForm" :rules="formRules" label-width="100px">
        <el-form-item label="快递公司：" prop="express_company">
          <el-select 
            v-model="sendForm.express_company"
            filterable
            allow-create
            default-first-option
          ></el-select>
        </el-form-item>
        <el-form-item label="快递单号：" prop="express_no">
          <div style="width: 300px;">
            <el-input v-model="sendForm.express_no"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="footer-bar">
            <el-button type="primary" @click="handleDelivery">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import breadcrumb from '@/components/common/address'
import dayjs from 'dayjs'
import { getProductOrderList, deliveryGoods, exportGoodsOrder } from '@/api/orderManagement'
const tabDataCfg = {
  all: { data: 'dataAll', total: 'totalAll', orderStatus: '' },
  toSend: { data: 'dataToSend', total: 'totalToSend', orderStatus: 1 },
  done: { data: 'dataDone', total: 'totalDone', orderStatus: 2 },
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
        { name: '商品订单列表', router: 'ProductOrderList' }
      ],
      inputName: 'order_no',
      inputValue: '',
      form: {
        page_size: 20,
        page_no: 0,
        start_time: '',
        end_time: '',
        order_status: ''
      },
      columnCfg: [
        {label: '商品订单编号', prop: 'order_info.order_no', width: 220},
        {label: '订购时间', prop: 'order_info.create_time'},
        {label: '订购门店', prop: 'order_info.shop_name'},
        {label: '商品', prop: 'goods_info.name', showOverflowTooltip: true},
        {label: '数量', prop: 'goods_info.count'},
        {label: '订购人', prop: 'member_info.member_name'},
        {label: '配送方式', prop: 'express_info.express_name'},
        {label: '状态', prop: 'order_info.order_status'},
      ],
      activeTab: 'all',
      dataAll: [],
      dataToSend: [],
      dataDone: [],
      totalAll: 0,
      totalToSend: 0,
      totalDone: 0,
      dateArr: [],
      dialogShow: false,
      sendForm: {
        express_company: '',
        express_no: '',
        order_id: ''
      },
      formRules: {
        express_company: [
          { required: true, message: '请输入快递公司名称', trigger: 'change'}
        ],
        express_no: [
          { required: true, message: '请输入快递单号', trigger: 'blur'}
        ]
      }
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
    getTableData(page) {
      this.form.page_no = page
      this.inputName && (this.form[this.inputName] = this.inputValue)
      getProductOrderList(this.form).then(res => {
        const { data, all_count } = res.data
        this[tabDataCfg[this.activeTab].total] = all_count
        this[tabDataCfg[this.activeTab].data] = data
      })
    },
    handleSearch() {
      this.getTableData(0)
    },
    handleDateChange(val) {
      this.form.start_time = val[0]
      this.form.end_time = val[1]
    },
    handleTabClick() {
      if (this[tabDataCfg[this.activeTab].data].length === 0) {
        this.getTableData(0)
      }
    },
    jumpToOrderDetail(id) {
      this.$router.push(`/ProductOrderDetail/${id}`)
    },
    handleCurChange(page) {
      this.getTableData(page)
    },
    showSendDialog(orderId) {
      this.sendForm.order_id = orderId
      this.dialogShow = true
    },
    handleDelivery() {
      this.$refs.sendForm.validate((valid) => {
        if (valid) {
          deliveryGoods(this.sendForm).then(res => {
            if (res.code === 200) {
              this.$message.success('提交成功')
              this.dialogShow = false
              this.$refs.sendForm.resetFields()
              this.getTableData(1)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    handleDialogClose(done) {
      this.$refs.sendForm.resetFields()
      done()
    },
    handleExport() {
      this.inputName && (this.form[this.inputName] = this.inputValue)
      const params = Object.assign({}, this.form)
      delete params.page_no
      delete params.page_size
      exportGoodsOrder(params).then(res => {
        const {code, msg, data} = res
        if (code === 200) {
          const {download} = data
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
      }).catch(err => {
        console.log(err)
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
  .popRow {
    display: flex;
    align-items: center;
  }
  .popRow-label {
    width: 90px;
    text-align: right;
    flex-shrink: 0;
  }
  .popRow-text {
    flex: 1
  }
  .pop-content {
    padding: 10px 0;
  }
  .footer-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding-right: 20px;
  }
</style>