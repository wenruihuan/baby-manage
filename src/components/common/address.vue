<template>
    <div class="address">
        <el-breadcrumb separator="/">
            <!--:to="{ path: `/${item.router}`}"-->
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbList"
                :key="index"
            >
                {{ item.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'pathAddress',
    props: {
        breadcrumbList: {
            default: [],
            type: Array
        }
    }
};
</script>

<style scoped>
.address{
    background: #fff;
    padding: 30px 20px;
    margin-bottom: 20px;
}
</style>
