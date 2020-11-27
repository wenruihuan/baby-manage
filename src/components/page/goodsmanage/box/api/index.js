import request from '@/utils/request';

export const ERR_OK = 200;

/* 获取上传token */
export const getUploadToken = query => {
    return request({
        url: `/admin/common/qiniuToken`,
        method: 'get',
        params: query
    });
};

/* 获取包厢列表 */
export const getBoxList = query => {
    return request({
        url: `/admin/box/list`,
        method: 'get',
        params: query
    });
};

/* 删除包厢 */
export const removeBox = query => {
    return request({
        url: `/admin/box/delete`,
        method: 'post',
        data: query
    });
};

/* 包厢详情 */
export const getDetail = query => {
    return request({
        url: `/admin/box/detail`,
        method: 'get',
        params: query
    });
};

/* 添加/编辑包厢 */
export const addOrEditBox = query => {
    return request({
        url: `/admin/box/save`,
        method: 'post',
        data: query
    });
};

/* 包厢上下架 */
export const setPublish = query => {
    return request({
        url: `/admin/box/setPublish`,
        method: 'post',
        data: query
    });
};

/* 获取商品分类列表 */
export const getCategoryList = query => {
    return request({
        url: `/admin/box/kind`,
        method: 'get',
        params: query
    });
};

/* 添加包厢分类 */
export const addCategory = query => {
    return request({
        url: `/admin/box/saveKind`,
        method: 'post',
        data: query
    });
};

/* 删除包厢分类 */
export const removeCategory = query => {
    return request({
        url: `/admin/box/deleteKind`,
        method: 'post',
        data: query
    });
};
