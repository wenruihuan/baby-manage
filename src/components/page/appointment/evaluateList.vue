<template>
    <div class="evaluate-list">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    </div>
</template>
<script>
import breadcrumb from '@/components/common/address';

export default {
    name: 'EvaluateList',
    components: {
        breadcrumb
    },
    data() {
        return {
            breadcrumbList: [
                {
                    name: '首页',
                    router: 'dashboard'
                },
                {
                    name: '预约管理',
                    router: 'EvaluateList'
                },
                {
                    name: '预约评价',
                    router: 'EvaluateList'
                }
            ]
        };
    }
};
</script>