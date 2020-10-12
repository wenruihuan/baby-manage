import request from '../utils/request';
const IP = 'https://result.eolinker.com/BxxMFUV803ea48c63410d63327c3ad2f649e76860d89dfd?uri=';

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

export const login = query => {
    return request({
        url: IP + `/admin/common/login`,
        method: 'post',
        params: query
    });
};
