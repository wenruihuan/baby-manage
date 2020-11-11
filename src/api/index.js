import request from '../utils/request';
const IP = 'https://result.eolinker.com/BxxMFUV803ea48c63410d63327c3ad2f649e76860d89dfd?uri=';


export const login = query => {
    return request({
        url: IP + `/admin/common/login`,
        method: 'post',
        params: query
    });
};

//获取店铺信息
export const shopInfo = query => {
    return request({
        url: `${IP}/admin/shop/info`,
        method: 'get',
        params: query
    });
};

// 获取店铺负责人
export const shopManagerInfo = query => {
    return request({
        url: IP + `/admin/shop/managerInfo`,
        method: 'get',
        params: query
    });
};
// 编辑店铺负责人信息
export const shopSaveManager = query => {
    return request({
        url: IP + `/admin/shop/saveManager`,
        method: 'post',
        params: query
    });
};

// 编辑店铺信息
export const shopSave = query => {
    return request({
        url: IP + `/admin/shop/save`,
        method: 'post',
        params: query
    });
};

// 获取员工列表
export const staffList = query => {
    return request({
        url: IP + `/admin/staff/list`,
        method: 'get',
        params: query
    });
};


// 添加（编辑）员工
export const staffSave = query => {
    return request({
        url: IP + `/admin/staff/save`,
        method: 'post',
        params: query
    });
};


// 禁用（恢复）员工账号
export const staffSetDisable = query => {
    return request({
        url: IP + `/admin/staff/setDisable`,
        method: 'post',
        params: query
    });
};
// 获取职位列表
export const positionList = query => {
    return request({
        url: IP + `/admin/position/list`,
        method: 'get',
        params: query
    });
};
// 删除职位
export const positionDelete = query => {
    return request({
        url: IP + `/admin/position/delete`,
        method: 'post',
        params: query
    });
};
// 获取角色列表
export const roleList = query => {
    return request({
        url: IP + `/admin/role/list`,
        method: 'get',
        params: query
    });
};
// 获取角色列表
export const roleAathList = query => {
    return request({
        url: IP + `/admin/role/authList`,
        method: 'get',
        params: query
    });
};

// 获取班次列表
export const worktimeList = query => {
    return request({
        url: IP + `/admin/worktime/list`,
        method: 'get',
        params: query
    });
};
// 获取员工排班列表
export const worktimeStaffList = query => {
    return request({
        url: IP + `/admin/worktime/staffList`,
        method: 'get',
        params: query
    });
};

// 添加（编辑）班次
export const worktimeSave = query => {
    return request({
        url: IP + `/admin/worktime/save`,
        method: 'post',
        params: query
    });
};
// 获取职位列表
export const positionSelectList = query => {
    return request({
        url: IP + `/admin/position/selectList`,
        method: 'get',
        params: query
    });
};

// .获取角色列表
export const roleSelectList = query => {
    return request({
        url: IP + `/admin/role/selectList`,
        method: 'get',
        params: query
    });
};

// .11.4.服务列表（开单页面）
export const serviceSelectList = query => {
    return request({
        url: IP + `/admin/service/selectList`,
        method: 'get',
        params: query
    });
};

// 7.10.开单页面用户列表搜索
export const worktableMemberInfo = query => {
    return request({
        url: IP + `/admin/worktable/memberInfo`,
        method: 'get',
        params: query
    });
};

// 3.1.4.获取服务分类列表
export const serviceKind = query => {
    return request({
        url: IP + `/admin/service/kind`,
        method: 'get',
        params: query
    });
};
// 7.4.常用服务列表
export const worktableCommonService = query => {
    return request({
        url: IP + `/admin/worktable/commonService`,
        method: 'get',
        params: query
    });
};

// 7.3.取单列表
export const worktableOrderList = query => {
    return request({
        url: IP + `/admin/worktable/orderList`,
        method: 'get',
        params: query
    });
};
// 7.6.获取用户的所有充值卡
export const worktableMemberAllRechargeCard = query => {
    return request({
        url: IP + `/admin/worktable/memberAllRechargeCard`,
        method: 'get',
        params: query
    });
};

// 11.21.获取技师下拉列表
export const staffTechnicianSelect = query => {
    return request({
        url: IP + `/admin/staff/technicianSelect`,
        method: 'get',
        params: query
    });
};
// 11.22.获取用户消费时可选权益
export const worktableRightSelect = query => {
    return request({
        url: IP + `/admin/worktable/rightSelect`,
        method: 'get',
        params: query
    });
};
// 11.7.获取包厢列表
export const boxSelectList = query => {
    return request({
        url: IP + `/admin/box/selectList`,
        method: 'get',
        params: query
    });
};
// 5.1.8. 所有卡项
export const memberAllCard = query => {
    return request({
        url: IP + `/mp/member/allCard`,
        method: 'get',
        params: query
    });
};
// 9.2.2.4.等级信息
export const memberLevelDetail = query => {
    return request({
        url: IP + `/admin/memberLevel/detail`,
        method: 'get',
        params: query
    });
};

// 9.4.1.开单设置列表（收款方式）
export const paymentList = query => {
    return request({
        url: IP + `/admin/payment/list`,
        method: 'get',
        params: query
    });
};


// 11.3.会员等级列表
export const memberLevelList = query => {
    return request({
        url: IP + `/admin/memberLevel/selectList`,
        method: 'get',
        params: query
    });
};

//4.2.5.获取会员列表
export const memberList = query => {
    return request({
        url: IP + `/admin/member/list`,
        method: 'get',
        params: query
    });
};

//11.10.获取健康管理师下来列表
export const hmSelectList = query => {
    return request({
        url: IP + `/admin/hm/selectList`,
        method: 'get',
        params: query
    });
};
