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
