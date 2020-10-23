import request from '@/utils/request';

const IP = 'https://result.eolinker.com/BxxMFUV803ea48c63410d63327c3ad2f649e76860d89dfd?uri=';

export const ERR_OK = 200;

/* 获取上传token */
export const getUploadToken = query => {
    return request({
        url: `${IP}/admin/common/qiniuToken`,
        method: 'get',
        params: query
    });
};

/* 获取商品列表 */
export const getBoxList = query => {
    return request({
        url: `${IP}/admin/goods/list`,
        method: 'get',
        params: query
    });
};

/* 删除包厢 */
export const removeBox = query => {
    return request({
        url: `${IP}/admin/box/delete`,
        method: 'post',
        data: query
    });
};

/* 包厢详情 */
export const getDetail = query => {
    return request({
        url: `${IP}/admin/goods/detail`,
        method: 'get',
        params: query
    });
};

/* 添加/编辑包厢 */
export const addOrEditBox = query => {
    return request({
        url: `${IP}/admin/goods/save`,
        method: 'post',
        data: query
    });
};

/* 包厢上下架 */
export const setPublish = query => {
    return request({
        url: `${IP}/admin/goods/setPublish`,
        method: 'post',
        data: query
    });
};

/* 展示或者不展示 */
export const setShow = query => {
    return request({
        url: `${IP}/admin/goods/setShow`,
        method: 'post',
        data: query
    });
};

/* 获取包厢分类列表 */
export const getCategoryList = query => {
    return request({
        url: `${IP}/admin/goods/kind`,
        method: 'get',
        params: query
    });
};

/* 添加商品分类 */
export const addCategory = query => {
    return request({
        url: `${IP}/admin/goods/saveKind`,
        method: 'post',
        data: query
    });
};

/* 删除包厢分类 */
export const removeCategory = query => {
    return request({
        url: `${IP}/admin/goods/deleteKind`,
        method: 'post',
        data: query
    });
};

/* 获取标签列表 */
export const getTagList = query => {
    return request({
        url: `${IP}/admin/goods/tag`,
        method: 'get',
        params: query
    });
};

/* 保存标签 */
export const saveTag = query => {
    return request({
        url: `${IP}/admin/goods/saveTag`,
        method: 'post',
        data: query
    });
};

/* 删除标签 */
export const removeTag = query => {
    return request({
        url: `${IP}/admin/goods/deleteTag`,
        method: 'post',
        data: query
    });
};

/* 二维码预览 */
export const qrCodeView = query => {
    return request({
        url: `${IP}/admin/goods/previewQr`,
        method: 'post',
        data: query
    });
};