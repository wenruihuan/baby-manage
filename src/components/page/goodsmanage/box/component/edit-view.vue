<template>
    <div class="edit-view">
        <el-form class="edit-form" ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="编号">
                <el-input v-model="form.box_no"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-input v-model="form.kind_id"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-input v-model="form.img"></el-input>
            </el-form-item>
            <el-form-item label="人数">
                <el-input v-model="form.people_count"></el-input>
            </el-form-item>
            <el-form-item label="价格">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button type="primary">保存</el-button>
            <el-button>上架</el-button>
            <el-button>删除</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                name: '',
                box_no: '',
                kind_id: '',
                img: '',
                people_count: '',
                price: ''
            }
        };
    },
    methods: {
        async getDetail (id = '') {
            if (id) {
                try {
                    const { data } = await request.get(`/admin/box/list?keyword=${ this.searchVal }&page_no=${ this.curPage }&kind_id=${ this.selected }`);
                    this.tableData = data.data;
                } catch (e) {
                    console.log(`getList error: ${e}`);
                }
            }
        }
    }
};
</script>

<style lang='css' scoped>
.edit-view {
    background: white;
    box-sizing: border-box;
    padding: 10px;
}
.edit-form {
    width: 30%;
    margin: 0 auto;
}
.btn-group {
    text-align: center;
}
</style>
