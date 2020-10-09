<template>
    <div class="appointment-list">
        <breadcrumb :breadcrumbList="breadcrumbList"></breadcrumb>
    </div>
</template>
<script>
import breadcrumb from '@/components/common/address';

export default {
    name: 'AppointmentList',
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
                    router: 'AppointmentList'
                },
                {
                    name: '预约列表',
                    router: 'AppointmentList'
                }
            ]
        };
    }
};
</script>