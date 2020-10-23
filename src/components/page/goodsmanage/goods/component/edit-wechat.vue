<template>
    <div class="wechat-edit-container">
        <div class="view">
            <div class="wechat-bg">
                <img width="100%" src="../../img/wechat-bg.jpg" alt="">
                <div class="title-area">
                    <p>基本信息区</p>
                    <p>固定样式、显示商品主图、价格等信息</p>
                </div>
                <div class="content-area WECHAT_EDIT" v-html="content"></div>
            </div>
        </div>
        <div class="edit">
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
    components: {
        quillEditor
    },
    data () {
        return {
            content: '',
            editorOption: {
                placeholder: 'Hello World'
            }
        };
    }
}
</script>

<style lang="css" scoped>
.wechat-edit-container {
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
.wechat-edit-container .view {
    width: 39%;
    height: 600px;
    padding: 10px;
    box-sizing: border-box;
}
.view .wechat-bg {
    width: 350px;
    height: 100%;
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    border: 1px solid #dddddd;
}
.view .wechat-bg .title-area {
    height: 120px;
    text-align: center;
    color: #999999;
    line-height: 30px;
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
    top: -3px;
}
.view .wechat-bg .content-area {
    width: 100%;
    height: calc(100% - 210px);
    overflow: auto;
    position: absolute;
    left: 0;
    top: 206px;
    background: white;
}
.content-area img {
    width: 100% !important;
}
.view .title-area {
    background: #eeeeee;

}
.edit {
    width: 48%;
}
</style>

<style lang="css">
.WECHAT_EDIT img {
    max-width: 100%;
}
.WECHAT_EDIT ul, ol {
    padding-left: 1.5em;
}
</style>