<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'store',
                        title: '店铺',
                        subs: [
                            {
                                index: 'store',
                                title: '店铺信息'
                            },
                            {
                                index: '3-2',
                                title: '员工管理',
                                subs: [
                                    {
                                        index: 'EmployeesList',
                                        title: '员工列表'
                                    },
                                    {
                                        index: 'EmployeeScheduling',
                                        title: '员工排班'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-time',
                        index: 'AppointmentList',
                        title: '预约管理',
                        subs: [
                            {
                                index: 'AppointmentList',
                                title: '预约列表'
                            },
                            {
                                index: 'EvaluateList',
                                title: '预约列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'OrderList',
                        title: '订单管理',
                        subs: [
                            {
                                index: 'OrderList',
                                title: '订单列表'
                            },
                            {
                                index: 'ChargebackList',
                                title: '退单列表'
                            },
                            {
                                index: 'ProductOrderList',
                                title: '商品订单列表'
                            }
                        ]
                    },
                    {
                        title: '商品',
                        index: '3-3',
                        icon: 'el-icon-time',
                        subs: [
                            {
                                index: '/boxlist',
                                title: '包厢列表'
                            },
                            {
                                index: '/goodslist',
                                title: '商品列表'
                            },
                            {
                                index: '/servicelist',
                                title: '服务列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-tools',
                        index: 'Setting',
                        title: '设置',
                        subs: [
                            {
                                index: 'MiniProgramSetting',
                                title: '小程序设置',
                                subs: [
                                    {
                                        index: 'InformationSetting',
                                        title: '资讯列表'
                                    },
                                    {
                                        index: 'IndexSetting',
                                        title: '首页设置'
                                    }
                                ]
                            },
                            {
                                index: 'CustomerSetting',
                                title: '客户设置',
                                subs: [
                                    {
                                        index: 'MemberSetting',
                                        title: '会员设置'
                                    },
                                    {
                                        index: 'IntegralSetting',
                                        title: '积分设置'
                                    },
                                    {
                                        index: 'TagSetting',
                                        title: '标签设置'
                                    }
                                ]
                            },
                            {
                                index: 'AppointmentSetting',
                                title: '预约设置',
                                subs: [
                                    {
                                        index: 'GlobalSetting',
                                        title: '全局设置'
                                    },
                                    {
                                        index: 'TechnicianSetting',
                                        title: '技师设置'
                                    }
                                ]
                            },
                            {
                                index: 'BillingSetting',
                                title: '开单设置'
                            },
                            {
                                index: 'DistributionSetting',
                                title: '商品配送设置'
                            }
                        ]
                    }
                ]
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', (msg) => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }
    .sidebar > ul {
        height: 100%;
    }
</style>
