<template>
  <div class="dialog-template">
    <div class="tool-bar">
      <el-form 
        :model="form"
        ref="ruleForm"
        inline
        class="form-row"
      >
        <el-form-item>
          <el-select v-model="form.kind_id" @change="getTableData(1)">
            <el-option
              v-for="item in goodsOptions"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.keyword" @input="getTableData(1)" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
      </el-form>
      <div class="main-body">
        <el-table
          :data="tableData"
          border
          style="width:100%"
          @selection-change="handleSelectChange"
          max-height="360"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="商品名称" align="center" min-width="120">
            <template slot-scope="scope">
              <div class="product-info">
                <img :src="scope.row.img" alt="" width="50px" height="50px">
                <span>{{scope.row.name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="售价" prop="price" align="center"></el-table-column>
          <el-table-column label="分类" prop="kind_name" align="center"></el-table-column>
          <el-table-column label="创建时间" prop="create_time" width="220" align="center" :formatter="timeFormatter"></el-table-column>
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
    <div class="footer-bar">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getBoxList } from '@/components/page/goodsmanage/goods/api'
import { addMemberProducts, getGoodsCateOptions, getGoodsList } from '@/api/marketing'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      form: {
        page_no: 1,
        kind_id: '',
        page_size: 10,
        keyword: ''
      },
      tableData: [],
      total: 0,
      goods_id: [],
      goodsOptions: []
    }
  },
  created() {
    this.getGoodsCateOptions()
    this.getTableData(1)
  },
  methods: {
    getGoodsCateOptions() {
      getGoodsCateOptions().then(res => {
        const { data } = res.data
        this.goodsOptions = data
      }).catch(err => {
        console.log(err)
      })
    },
    getTableData(page) {
      this.form.page_no = page
      getGoodsList(this.form).then(res => {
        const { all_count, data } = res
        this.total = all_count
        this.tableData = data
        console.log('data', this.tableData)
      }).catch(err => {
        console.log(err)
      })
    },
    handleCurChange(page) {
      this.getTableData(page)
    },
    handleSave() {
      const params = {goods_id: this.goods_id}
      addMemberProducts(params).then(res => {
        if (res.code === 200) {
          this.$message.success('添加商品成功')
          this.$emit('success')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleSelectChange(data) {
      this.goods_id = data.map(item => {
        return item.id
      })
    },
    timeFormatter(row, column, cellValue, index) {
      return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>
  .form-row {
    display: flex;
    justify-content: space-between;
  }
  .main-body {
    overflow: hidden;
  }
  .page-ctner {
    float: right;
    margin-top: 20px;
  }
  .footer-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding-right: 20px;
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