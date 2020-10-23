<template>
    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
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
        }
    }
};
</script>

<style scoped>

</style>