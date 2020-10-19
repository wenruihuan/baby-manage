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
          <el-select v-model="form.kind_name" @change="getBoxList(1)">
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.keyword" @change="getBoxList(1)" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
      </el-form>
      <div class="main-body">
        <el-table
          :data="data"
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
          <el-table-column label="创建时间" prop="" align="center"></el-table-column>
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
import { addMemberProducts } from '@/api/marketing'
export default {
  data() {
    return {
      form: {
        page_no: 1,
        kind_name: '',
        page_size: 10,
        keyword: ''
      },
      data: [],
      total: 0,
      goods_id: []
    }
  },
  created() {
    this.getTableData(1)
  },
  methods: {
    getTableData(page) {
      this.form.page_no = page
      getBoxList(this.form).then(res => {
        const { all_count, data } = res.data
        this.total = all_count
        this.data = data
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