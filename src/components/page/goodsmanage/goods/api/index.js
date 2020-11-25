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

/* 获取商品列表 */
export const getBoxList = query => {
    return request({
        url: `/admin/goods/list`,
        method: 'get',
        params: query
    });
};

/* 删除包厢 */
export const removeBox = query => {
    return request({
        url: `/admin/goods/delete`,
        method: 'post',
        data: query
    });
};

/* 包厢详情 */
export const getDetail = query => {
    return request({
        url: `/admin/goods/detail`,
        method: 'get',
        params: query
    });
};

/* 添加/编辑包厢 */
export const addOrEditBox = query => {
    return request({
        url: `/admin/goods/save`,
        method: 'post',
        data: query
    });
};

/* 包厢上下架 */
export const setPublish = query => {
    return request({
        url: `/admin/goods/setPublish`,
        method: 'post',
        data: query
    });
};

/* 展示或者不展示 */
export const setShow = query => {
    return request({
        url: `/admin/goods/setShow`,
        method: 'post',
        data: query
    });
};

/* 获取包厢分类列表 */
export const getCategoryList = query => {
    return request({
        url: `/admin/goods/kind`,
        method: 'get',
        params: query
    });
};

/* 添加商品分类 */
export const addCategory = query => {
    return request({
        url: `/admin/goods/saveKind`,
        method: 'post',
        data: query
    });
};

/* 删除包厢分类 */
export const removeCategory = query => {
    return request({
        url: `/admin/goods/deleteKind`,
        method: 'post',
        data: query
    });
};

/* 获取标签列表 */
export const getTagList = query => {
    return request({
        url: `/admin/goods/tag`,
        method: 'get',
        params: query
    });
};

/* 保存标签 */
export const saveTag = query => {
    return request({
        url: `/admin/goods/saveTag`,
        method: 'post',
        data: query
    });
};

/* 删除标签 */
export const removeTag = query => {
    return request({
        url: `/admin/goods/deleteTag`,
        method: 'post',
        data: query
    });
};

/* 二维码预览 */
export const qrCodeView = query => {
    return request({
        url: `/admin/goods/previewQr`,
        method: 'post',
        data: query
    });
};

/* 商品排序 */
export const setSort = query => {
    return request({
        url: `/admin/goods/sort`,
        method: 'post',
        data: query
    });
};
