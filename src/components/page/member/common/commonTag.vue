<template>
    <el-dialog
            :title="title"
            :visible.sync="isShow"
            width="510px">
            <div class="commonTag">
                <div class="row">
                    自定义标签：
                    <el-input
                        class="width200"
                        maxlength="8"
                        placeholder="请勿超出8个字"
                        v-model="TagVal"
                    ></el-input>
                    &nbsp;&nbsp;
                    <el-button @click="addTagFn">添加</el-button>
                </div>
                <div class="row">
                    <div>
                        <div class="name">
                            选择已有标签
                        </div>
                        <div class="list">
                            <div
                                v-for="(item, index) in memberTagList"
                                :key="index"
                                :class="item.select ? 'item active' : 'item'"
                                @click="currentTagVal(item)"
                            >
                                {{item.tag_name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="cancelTagVisible">确定</el-button>
            </span>
    </el-dialog>
</template>

<script>
import * as api from '../../../../api/index'
export default {
    name: 'commonTag',
    data () {
        return {
            isShow: true,
            TagVal: '',
            tagList: [],
            memberTagList: [],
            title: '添加标签'
        }
    },
    props: {
        selectNum: 0
    },
    created () {
        this.getMemberTag();
        if (this.selectNum > 0) {
            this.title = '添加标签 (已选' + this.selectNum +')'
        }
    },
    methods: {
        async getMemberTag () {
            const { data } = await api.memberTagList();
            this.memberTagList = data.data.map(m => {
                m.select = false;
                return m;
            });
        },
        async addTagFn () {
            if (this.TagVal) {
                let params = {
                    tag_id: '',
                    tag_name: this.TagVal,
                }
                const { data } = await api.memberTagSave(params);
                this.TagVal = '';
                this.$message.success('操作成功！');
                this.getMemberTag();
                console.log(data);
            } else {
                this.$message.error('标签不能为空！');
            }
        },
        // 隐藏弹窗
        cancelTagVisible () {
            this.$emit('change', this.tagList)
        },
        currentTagVal (item) {
            item.select = !item.select;
            this.memberTagList.map(m => {
                if(m.select) {
                    this.tagList.push(m.tag_id);
                }
            });
        },
    }
};
</script>

<style scoped>
.commonTag .row{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.commonTag .row .list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
}
.commonTag .row .list .item{
    display: inline-block;
    border: 1px solid #666;
    color: #333333;
    border-radius: 5px;
    line-height: 30px;
    padding: 2px 16px 2px 16px;
    cursor: pointer;
    margin-right: 10px;
}
.commonTag .row .list .item.active{
    color: #1890FF;
    background-color: rgba(22, 130, 230, 0.101960784313725);
    border-color: rgba(24, 144, 255, 1);
}
</style>
