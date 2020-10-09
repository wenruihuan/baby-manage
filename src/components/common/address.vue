<template>
    <div class="address">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbList"
                :to="{ path: `/${item.router}`}"
                :key="index"
            >
                {{ item.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'address',
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
