<template>
  <div class="order-list">
    <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    <div class="main-body">
      <div class="info-title">
        单个商品设置会员价
        <el-button type="primary" plain @click="handleAdd">添加商品</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%; margin-top: 20px;">
        <el-table-column label="商品名称" align="center" min-width="220">
          <template slot-scope="scope">
            <div class="product-info">
              <img :src="scope.row.img" alt="" width="50px" height="50px">
              <span>{{scope.row.shop_name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in columnCfg" :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="item.type === 'level'">
              <p>{{scope.row[item.prop].discount}}</p>
              <p>{{scope.row[item.prop].price}}</p>
            </div>
            <span v-else>{{scope.row[item.prop]|discountFormatter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <span style="color:#DDDDDD;margin: 0 5px;">|</span>
            <el-button type="text" @click="handleRemove(scope.row.id)">移除</el-button>
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
      :visible.sync="dialogShow"
      :title="dialogTitle"
      :close-on-click-modal="false"
    >
      <component
        :is="componentName"
        @success="handleSuccess"
        @cancel="handleCancel"
        :rowData="rowData"
        :memberLevels="memberLevels"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import breadcrumb from '@/components/common/address'
import AddProduct from './components/addProduct'
import EditProduct from './components/editProduct'
import dayjs from 'dayjs'
import { getMemberPriceList, addMemberProducts, setMemberProduct, removeMemberPrice, getMemberLevels } from '@/api/marketing'
const dateFormatStr = 'YYYY-MM-DD HH:mm:ss'
export default {
  name: 'OrderList',
  components: {
    breadcrumb,
    AddProduct,
    EditProduct
  },
  data() {
    return {
      breadcrumbList: [
        { name: '首页', router: 'dashboard' },
        { name: '会员价', router: 'MemberPrice' },
      ],
      form: {
        page_size: 20,
        page_no: 1
      },
      columnCfg: [
        {label: '售价', prop: 'price'},
        {label: '优惠方式', prop: 'type'}
      ],
      tableData: [],
      total: 0,
      dateArr: [],
      dialogShow: false,
      dialogTitle: '',
      componentName: '',
      rowData: {},
      memberLevels: []
    }
  },
  created() {
    // this.getTableData(1)
    this.getMemberLevels()
  },
  methods: {
    getMemberLevels() {
      getMemberLevels().then(res => {
        const { data = [] } = res.data
        if (res.code === 200) {
          this.memberLevels.push(...data)
          console.log('memberLevels', this.memberLevels)
          const temp = data.map(item => {
            return {
              label: item.name,
              prop: `${item.level_id}`,
              type: 'level'
            }
          })
          this.columnCfg.push(...temp)
          this.getTableData(1)
        }
      })
    },
    handleSearch() {
      this.getTableData(1)
    },
    getTableData(page) {
      this.form.page_no = page
      getMemberPriceList(this.form).then(res => {
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
    handleAdd() {
      this.componentName = 'addProduct'
      this.dialogShow = true
      this.dialogTitle = '添加商品'
    },
    handleEdit(rowData) {
      this.componentName = 'editProduct'
      this.dialogShow = true
      this.rowData = rowData
      this.dialogTitle = '设置会员价'
    },
    handleRemove(id) {
      const prm = {id: id}
      removeMemberPrice(prm).then(res => {
        if (res.code === 200) {
          this.$message.success('移除成功')
          this.getTableData(1)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleSuccess() {
      this.dialogShow = false
      this.getTableData(1)
    },
    handleCancel() {
      this.dialogShow = false
    }
  },
  filters: {
    discountFormatter(val) {
      console.log('val', val)
      const textObj = {
        target_discount: '优惠折扣',
        target_price: '指定价格'
      }
      if (val) {
        return textObj[val]
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .main-body {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    border: 0;
    margin-top: 20px;
    overflow: hidden;
  }
  .info-title {
    justify-content: space-between;
    padding-right: 20px;
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
  .product-info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .product-info img {
    margin-right: 10px;
  }

</style>
