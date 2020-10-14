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

/* 获取服务列表 */
export const getBoxList = query => {
    return request({
        url: `${IP}/admin/service/list`,
        method: 'get',
        params: query
    });
};

/* 删除服务分类 */
export const removeBox = query => {
    return request({
        url: `${IP}/admin/service/deleteKind`,
        method: 'post',
        data: query
    });
};

/* 服务详情 */
export const getDetail = query => {
    return request({
        url: `${IP}/admin/service/detail`,
        method: 'get',
        params: query
    });
};

/* 添加/编辑服务 */
export const addOrEditBox = query => {
    return request({
        url: `${IP}/admin/service/save`,
        method: 'post',
        data: query
    });
};

/* 服务上下架 */
export const setPublish = query => {
    return request({
        url: `${IP}/admin/service/setPublish`,
        method: 'post',
        data: query
    });
};

/* 获取服务分类列表 */
export const getCategoryList = query => {
    return request({
        url: `${IP}/admin/service/kind`,
        method: 'get',
        params: query
    });
};

/* 获取服务标签列表 */
export const getServiceTags = query => {
    return request({
        url: `${IP}/admin/service/tag`,
        method: 'get',
        params: query
    });
};

/* 添加服务分类 */
export const addCategory = query => {
    return request({
        url: `${IP}/admin/service/saveKind`,
        method: 'post',
        data: query
    });
};

/* 删除服务分类 */
export const removeCategory = query => {
    return request({
        url: `${IP}/admin/service/deleteKind`,
        method: 'post',
        data: query
    });
};

/* 获取服务标签列表 */
export const getTagList = query => {
    return request({
        url: `${IP}/admin/service/tag`,
        method: 'get',
        params: query
    });
};

/* 保存服务标签 */
export const saveTag = query => {
    return request({
        url: `${IP}/admin/service/saveTag`,
        method: 'post',
        data: query
    });
};

/* 删除服务标签 */
export const removeTag = query => {
    return request({
        url: `${IP}/admin/service/deleteTag`,
        method: 'post',
        data: query
    });
};

/* 服务是否展示 */
export const setShow = query => {
    return request({
        url: `${IP}/admin/service/setShow`,
        method: 'post',
        data: query
    });
};

/* 服务排序 */
export const setSort = query => {
    return request({
        url: `${IP}/admin/service/sort`,
        method: 'post',
        data: query
    });
};