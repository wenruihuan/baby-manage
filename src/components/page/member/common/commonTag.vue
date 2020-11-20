<template>
    <el-dialog
            title="添加标签"
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
                    <el-button @click="addTagFn">添加</el-button>
                </div>
                <div class="row">
                    <div>
                        <div class="name">
                            选择已有标签
                        </div>
                        <div class="list">
                            <div
                                v-for="item in memberTagList"
                                :key="item.tag_id"
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
            memberTagList: []
        }
    },
    created () {
        this.getMemberTag();
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
            let params = {
                tag_id: '',
                tag_name: this.TagVal,
            }
            const { data } = await api.memberTagSave(params);
            console.log(data);
        },
        // 隐藏弹窗
        cancelTagVisible () {
            this.$parent.isShowCommonTag = false;
        },
        currentTagVal (item) {
            item.select = !item.select;
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
