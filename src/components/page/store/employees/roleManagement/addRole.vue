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
        <div class="info">
            <div class="info-box" v-for="(item, index) in roleAathList" :key="item.id">
                <div class="item">
                    <el-checkbox
                        :indeterminate="isIndeterminate[item.label]"
                        v-model="checkAll[item.label]"
                        @change="handleCheckAllChange"
                    >
                        {{item.label}}
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    {{checkedCities[item.label]}}
                    <el-checkbox-group
                        v-model="checkedCities[item.label]"
                        @change="handleCheckedCitiesChange"
                    >
                        <el-checkbox
                            @change="handleCheckedCitiesChange1(item, items.id)"
                            v-for="items in item.children"
                            :label="items.id"
                            :key="items.id"
                        >
                            {{items.label}}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '../../../../../api/index'
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: 'addRole',
        data () {
            return {
                checkAll: {},
                disabled: false,
                checkedCities: {},
                roleAathList: [],
                cities: cityOptions,
                isIndeterminate: {},
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
                this.roleAathList.forEach(item => {
                    this.checkedCities[item.label] = [];
                    this.isIndeterminate[item.label] = true;
                    this.checkAll[item.label] = false;
                });
                console.log(this.isIndeterminate);
            },
            handleCheckAllChange(val) {
                console.log(val);
                let options = val.children.map(item => item.id);
                this.checkedCities[val.label] = options ? options : [];
                this.isIndeterminate[val.label] = false;
            },
            handleCheckedCitiesChange1(item, value) {
                console.log(value)
                this.$set(this.checkedCities, [item.label], value);
                // this.checkedCities[item.label].push(value);
                // console.log(this.checkedCities[item.label]);
            },
            handleCheckedCitiesChange(value) {
                // let checkedCount = value.children.length;
                // console.log(this.checkedCities[value.label]);
                console.log(value);
                console.log(value1);
                this.checkedCities[value.label].push(value);
                // console.log(this.checkedCities[value.label].indexOf(value));
                // if (this.checkedCities[value.label].indexOf(value) > -1) {
                //     console.log(this.checkedCities[value.label]);
                //     this.checkedCities[value.label].shift(value);
                //     console.log(this.checkedCities[value.label]);
                // } else {
                //     console.log(333);
                //     this.checkedCities[value.label].push(value);
                // }
                // console.log(checkedCount);
                // console.log(checkedCount);
                // console.log(this.checkedCities[value.label].length);
                // this.checkAll[value.label] = checkedCount === this.checkedCities[value.label].length;
                // this.isIndeterminate[value.label] = checkedCount > 0 && checkedCount < this.checkedCities[value.label].length;
            }
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
</style>
