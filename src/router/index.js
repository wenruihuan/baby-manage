import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/store',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/store/index.vue'),
                    meta: { title: '店铺' }
                },
                {
                    path: '/storeEdit',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/store/edit.vue'),
                    meta: { title: '店铺编辑' }
                },
                {
                    path: '/EmployeesList',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/store/employees/EmployeesList.vue'),
                    meta: { title: '员工列表' }
                },
                {
                    path: '/roleManagement/addRole',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/store/employees/roleManagement/addRole.vue'),
                    meta: { title: '员工列表' }
                },
                {
                    path: '/card-item',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/card-item'),
                    meta: { title: '卡项列表' },
                },
                {
                    path: '/cika',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/card-item/component/cika-edit.vue'),
                    meta: { title: '次卡' },
                },
                {
                    path: '/discount',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/card-item/component/discount-card.vue'),
                    meta: { title: '折扣卡' },
                },
                {
                    path: '/insert-card',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/card-item/component/insert-card.vue'),
                    meta: { title: '充值卡' },
                },
                {
                    path: '/servicelist',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/service'),
                    meta: { title: '服务列表' },
                },
                {
                    path: '/servicedetail',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/service/component/edit-view'),
                    meta: { title: '服务详情' },
                },
                {
                    path: '/boxlist',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/box'),
                    meta: { title: '包厢列表' },
                },
                {
                    path: '/boxdetail',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/box/component/edit-view'),
                    meta: { title: '包厢详情' },
                },
                {
                    path: '/goodslist',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/goods'),
                    meta: { title: '商品列表' },
                },
                {
                    path: '/goodsdetail',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/goodsmanage/goods/component/edit-view'),
                    meta: { title: '商品详情' },
                },
                {
                    path: '/AppointmentList',
                    component: () => import(/* webpackChunkName: "appointment" */ '../components/page/appointment/appointmentList.vue'),
                    meta: { title: '预约列表' }
                },
                {
                    path: '/EvaluateList',
                    component: () => import(/* webpackChunkName: "appointment" */ '../components/page/appointment/evaluateList.vue'),
                    meta: { title: '预约评价' }
                },
                {
                    path: '/OrderList',
                    component: () => import(/* webpackChunkName: "appointment" */ '../components/page/orderManagement/orderList.vue'),
                    meta: { title: '订单列表' }
                },
                {
                    path: '/OrderDetail/:id',
                    component: () => import(/* webpackChunkName: "appointment" */ '../components/page/orderManagement/orderDetail.vue'),
                    meta: { title: '订单详情' }
                },
                {
                    path: '/RefundList',
                    component: () => import(/* webpackChunkName: "appointment" */ '../components/page/orderManagement/refundList.vue'),
                    meta: { title: '退单列表' }
                },
                {
                    path: '/RefundDetail/:id',
                    component: () => import(/* webpackChunkName: "appointment" */ '../components/page/orderManagement/refundDetail.vue'),
                    meta: { title: '退单详情' }
                },
                {
                    path: '/ProductOrderList',
                    component: () => import(/* webpackChunkName: "appointment" */ '../components/page/orderManagement/productOrderList.vue'),
                    meta: { title: '商品订单列表' }
                },
                {
                    path: '/ProductOrderDetail',
                    component: () => import(/* webpackChunkName: "appointment" */ '../components/page/orderManagement/productOrderDetail.vue'),
                    meta: { title: '商品订单详情' }
                },
                {
                    path: '/EvaluateList',
                    component: () => import(/* webpackChunkName: "appointment" */ '../components/page/appointment/evaluateList.vue'),
                    meta: { title: '预约评价' }
                },
                {
                    path: '/InformationSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '../components/page/setting/informationSetting.vue'),
                    meta: { title: '资讯设置' }
                },
                {
                    path: '/IndexSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '../components/page/setting/indexSetting.vue'),
                    meta: { title: '首页设置' }
                },
                {
                    path: '/MemberSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '../components/page/setting/memberSetting.vue'),
                    meta: { title: '会员设置' }
                },
                {
                    path: '/IntegralSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '../components/page/setting/integralSetting.vue'),
                    meta: { title: '积分设置' }
                },
                {
                    path: '/TagSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '../components/page/setting/tagSetting.vue'),
                    meta: { title: '标签设置' }
                },
                {
                    path: '/GlobalSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '../components/page/setting/globalSetting.vue'),
                    meta: { title: '全局设置' }
                },
                {
                    path: '/TechnicianSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '../components/page/setting/technicianSetting.vue'),
                    meta: { title: '技师设置' }
                },
                {
                    path: '/BillingSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '../components/page/setting/billingSetting.vue'),
                    meta: { title: '开单设置' }
                },
                {
                    path: '/DistributionSetting',
                    component: () => import(/* webpackChunkName: "setting" */ '../components/page/setting/distributionSetting.vue'),
                    meta: { title: '商品配送设置' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                },
                {
                  path: '/FirstAgent',
                  component: () => import(/* webpackChunkName: "appointment" */ '../components/page/marketing/firstAgent.vue'),
                  meta: { title: '一级推广员列表' }
                },
                {
                  path: '/SecondAgent',
                  component: () => import(/* webpackChunkName: "appointment" */ '../components/page/marketing/secondAgent.vue'),
                  meta: { title: '二级推广员列表' }
                },
                {
                  path: '/AgentData',
                  component: () => import(/* webpackChunkName: "appointment" */ '../components/page/marketing/agentData.vue'),
                  meta: { title: '推广员数据' }
                },
                {
                  path: '/MemberPrice',
                  component: () => import(/* webpackChunkName: "appointment" */ '../components/page/marketing/memberPrice.vue'),
                  meta: { title: '会员价' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
