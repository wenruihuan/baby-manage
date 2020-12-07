<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="activeMenu"
            :collapse="false"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            @select="handleSelect"
        >
            <template v-for="item in items">
                <el-popover
                    popper-class="menu-popper"
                    placement="right"
                    width="200"
                    trigger="click"
                    :transition="null"
                    :disabled="!item.subs || item.subs.length <= 0"
                >
                    <el-menu
                        :collapse="false"
                        background-color="#324157"
                        text-color="#bfcbd9"
                        active-text-color="#20a0ff"
                        :default-openeds="defaultOpen"
                        router
                    >
                        <template v-for="sub in subItem">
                            <template v-if="sub.subs">
                                <el-submenu class="el-submenu0" :index="sub.index" :key="sub.index">
                                    <template slot="title">
                                        <i :class="sub.icon"></i>
                                        <span slot="title">{{ sub.title }}</span>
                                    </template>
                                    <template v-for="subItem in sub.subs">
                                        <el-submenu class="el-submenu1" v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                            <template slot="title">{{ subItem.title }}</template>
                                            <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                                threeItem.title
                                            }}</el-menu-item>
                                        </el-submenu>
                                        <el-menu-item v-else class="el-submenu1" :index="subItem.index" :key="subItem.index">{{
                                            subItem.title
                                        }}</el-menu-item>
                                    </template>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="sub.index" :key="sub.index">
                                    <i :class="sub.icon"></i>
                                    <span slot="title">{{ sub.title }}</span>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-menu>
                    <el-menu-item :index="item.index" :key="item.index" slot="reference">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </el-popover>
                <!-- <template v-if="item.subs">
                    <el-submenu class="el-submenu0" :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu class="el-submenu1" v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else  class="el-submenu1" :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template> -->
                <!-- <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template> -->
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
                activeMenu: '',
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: '/dashboard',
                        title: '概况'
                    },
                    {
                        icon: 'el-icon-lx-home',
                        index: 'Store',
                        title: '店铺',
                        defaultOpen: ['Employee'],
                        subs: [
                            {
                                index: '/store',
                                title: '店铺信息'
                            },
                            {
                                index: 'Employee',
                                title: '员工管理',
                                subs: [
                                    {
                                        index: '/EmployeesList',
                                        title: '员工列表'
                                    },
                                    {
                                        index: '/EmployeeScheduling',
                                        title: '员工排班'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-time',
                        index: 'AppointmentList',
                        title: '预约',
                        subs: [
                            {
                                index: '/AppointmentList',
                                title: '预约列表'
                            },
                            {
                                index: '/EvaluateList',
                                title: '预约评价'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-time',
                        index: 'MemberList',
                        title: '会员',
                        subs: [
                            {
                                index: '/memberList',
                                title: '会员列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'OrderList',
                        title: '订单',
                        subs: [
                            {
                                index: '/orderList',
                                title: '订单列表'
                            },
                            {
                                index: '/refundList',
                                title: '退单列表'
                            },
                            {
                                index: '/productOrderList',
                                title: '商品订单列表'
                            }
                        ]
                    },
                    {
                        title: '商品',
                        index: 'Goods',
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
                            },
                            {
                                index: '/card-item',
                                title: '卡项列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-tools',
                        index: 'Setting',
                        title: '设置',
                        defaultOpen: ['MiniProgramSetting', 'CustomerSetting', 'AppointmentSetting'],
                        subs: [
                            {
                                index: 'MiniProgramSetting',
                                title: '小程序设置',
                                subs: [
                                    {
                                        index: '/InformationSetting',
                                        title: '资讯列表'
                                    },
                                    {
                                        index: '/IndexSetting',
                                        title: '首页设置'
                                    }
                                ]
                            },
                            {
                                index: 'CustomerSetting',
                                title: '客户设置',
                                subs: [
                                    {
                                        index: '/MemberSetting',
                                        title: '会员等级'
                                    },
                                    {
                                        index: '/IntegralSetting',
                                        title: '积分设置'
                                    },
                                    {
                                        index: '/TagSetting',
                                        title: '标签设置'
                                    }
                                ]
                            },
                            {
                                index: 'AppointmentSetting',
                                title: '预约设置',
                                subs: [
                                    {
                                        index: '/GlobalSetting',
                                        title: '全局设置'
                                    },
                                    {
                                        index: '/TechnicianSetting',
                                        title: '技师设置'
                                    }
                                ]
                            },
                            {
                                index: '/BillingSetting',
                                title: '开单设置'
                            },
                            {
                                index: '/DistributionSetting',
                                title: '商品配送设置'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-present',
                        index: 'Workbench',
                        title: '工台',
                        subs: [
                            {
                                index: '/workbench',
                                title: '开单'
                            }
                            // {
                            //     index: '/cashier',
                            //     title: '收银台'
                            // },
                            // {
                            //     index: '/recharge',
                            //     title: '充值'
                            // },
                            // {
                            //     index: '/activateCard',
                            //     title: '开卡'
                            // },
                            // {
                            //     index: '/collectionConfirmation',
                            //     title: '确认收款'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-present',
                        index: 'FirstAgent',
                        title: '营销',
                        subs: [
                            {
                                index: '/firstAgent',
                                title: '一级推广员列表'
                            },
                            {
                                index: '/secondAgent',
                                title: '二级推广员列表'
                            },
                            {
                                index: '/agentData',
                                title: '推广员数据'
                            },
                            {
                                index: '/memberPrice',
                                title: '会员价'
                            }
                        ]
                    }
                ],
                subItem: [],
                defaultOpen: []
            };
        },
        // computed: {
        //     onRoutes() {
        //         return this.$route.path.replace('/', '');
        //     }
        // },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            // bus.$on('collapse', msg => {
            //     this.collapse = msg;
            //     bus.$emit('collapse-content', msg);
            // });
            this.getActiveMenu();
        },
        methods: {
            getActiveMenu() {
                const url = this.$route.path;
                const list = this.items;
                list.forEach(m => {
                    if (m.index === url) {
                        this.activeMenu = m.index;
                    } else if (m.subs && m.subs.length > 0) {
                        m.subs.forEach(n => {
                            if (n.index === url) {
                                this.activeMenu = m.index;
                            } else if (n.subs && n.subs.length > 0) {
                                n.subs.forEach(o => {
                                    if (o.index === url) {
                                        this.activeMenu = m.index;
                                    }
                                });
                            }
                        });
                    }
                });
            },
            handleSelect(index) {
                const item = this.items.find(m => m.index === index);
                if (item && item.subs) {
                    this.$nextTick(() => {
                        this.subItem = item.subs;
                        this.defaultOpen = item.defaultOpen || [];
                    });
                } else {
                    this.subItem = [];
                    this.defaultOpen = [];
                    this.$router.replace({ path: item.index });
                }
            }
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
        overflow: initial;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 115px;
    }
    .sidebar > ul {
        height: 100%;
    }
    .el-submenu0 {
        position: relative;
    }
</style>
<style>
    /*.el-submenu0>ul{*/
    /*position: absolute;*/
    /*transition: 0.3s;*/
    /*left: 100%;*/
    /*z-index: 9;*/
    /*display: none;*/
    /*top: 0;*/
    /*}*/
    /*.el-submenu0:hover>ul{*/
    /*position: absolute;*/
    /*display: block;*/
    /*}*/
    .menu-popper {
        padding: 0;
        border: none;
    }
    .menu-popper /deep/ .popper__arrow {
        border-right-color: rgb(50, 65, 87) !important;
    }
    .menu-popper /deep/ .popper__arrow::after {
        border-right-color: rgb(50, 65, 87) !important;
    }
    .menu-popper /deep/ .el-menu {
        border-right: none !important;
    }
</style>
