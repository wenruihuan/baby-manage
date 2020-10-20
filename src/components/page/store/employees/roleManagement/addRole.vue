<template>
    <div class="add-role">
        <div class="info-title">角色信息</div>
        <div class="info">
            <div class="info-box">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="归属门店" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="name">
                        <el-input :disabled="disabled" v-model="ruleForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="name">
                        <el-input type="textarea" :disabled="disabled" v-model="ruleForm.tel"></el-input>
                    </el-form-item>

                </el-form>
            </div>
        </div>
        <div class="info-title">配置权限</div>
        <div class="info-item">
            <div v-for="(item, index) in roleAathList" :key="item.id">
                <el-collapse accordion>
                    <el-collapse-item>
                        <template slot="title">
                            <el-checkbox :indeterminate="isIndeterminate[index]" v-model="checkAll[index]" @change="(value) => handleCheckAllChange(value, index)">{{item.label}}</el-checkbox>
                        </template>
                        <div class="check-box" v-show="!item.show">
                            <el-checkbox-group v-model="checkedCitiesList[index]" @change="(value) => handleCheckedCitiesChange(value, index)">
                                <el-checkbox v-for="city in item.children" :label="city.id" :key="city.id">{{city.label}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class="footer-btn">
            <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
    </div>
</template>

<script>
    import * as api from '../../../../../api/index'
    export default {
        name: 'addRole',
        data () {
            return {
                disabled: false,
                checkAll: [
                    false,
                    false
                ],
                checkedCitiesList: [
                    [],
                    [],
                    [],
                    [],
                ],
                checkedCities: [
                ],
                roleAathList: [],
                isIndeterminate: [],
                ruleForm: {}
            }
        },
        created () {
            this.getRoleAthList();
        },
        methods: {
            async getRoleAthList () {
                const { data } = await api.roleAathList()
                this.roleAathList = data;
            },
            handleCheckAllChange (val, index) {
                const citiesList = this.roleAathList[index].children.map((m) => {
                    return m.id;
                });
                this.$set(this.checkedCitiesList, index, val ? citiesList : []);
                this.$set(this.isIndeterminate, index, false);
            },
            handleCheckedCitiesChange (value, index) {
                const checkedCount = this.checkedCitiesList[index].length;
                this.$set(this.checkAll, index, checkedCount === this.roleAathList[index].children.length);
                this.$set(this.isIndeterminate, index, checkedCount > 0 && checkedCount < this.roleAathList[index].children.length);
            },
            handleCheckedCitiesChange1(item, value) {
                this.$set(this.checkedCities, [item.label], value);
            },
            handleSave () {}
        }
    };
</script>

<style scoped>
.add-role{
    margin: 20px;
    background: #fff;
    padding: 20px;
}
.info-box{
    margin-top: 20px;
}
.info-item /deep/.el-collapse-item__wrap,
.info-item /deep/.el-collapse{
    border: 0px solid #000;
}
.info-item /deep/.el-collapse-item__header{
    background: #EBEEF5;
    padding: 0 20px;
    margin-bottom: 20px;
}
.info-item{
    padding: 30px;
}
.info-item>div{

    margin-bottom: 30px;
}
.info-item .check-box{
    padding: 0 20px;
}
.info-item .name{
    position: relative;
    background: #EBEEF5;
    padding: 10px;
}
.info-item .name span{
    position: absolute;
    right: 20px;
    display: block;
    top: 50%;
    margin-top: -5px;
    cursor: pointer;
}
.footer-btn {
    display: flex;
    justify-content: center;
    padding: 15px;
}
</style>
