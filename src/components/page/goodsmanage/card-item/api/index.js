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

/* 获取卡项列表 */
export const getBoxList = query => {
    return request({
        url: `${IP}/admin/card/list`,
        method: 'get',
        params: query
    });
};

/* 删除卡项 */
export const removeCard = query => {
    return request({
        url: `${IP}/admin/card/delete`,
        method: 'post',
        data: query
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
        url: `${IP}/admin/card/setPublish`,
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

/* 卡项是否展示 */
export const setShow = query => {
    return request({
        url: `${IP}/admin/card/setShow`,
        method: 'post',
        data: query
    });
};

/* 卡项排序 */
export const setSort = query => {
    return request({
        url: `${IP}/admin/card/sort`,
        method: 'post',
        data: query
    });
};

/* 保存次卡 */
export const saveCika = query => {
    return request({
        url: `${IP}/admin/card/time/save`,
        method: 'post',
        data: query
    });
};

/* 获取服务列表 */
export const getServiceList = query => {
    return request({
        url: `${IP}/admin/service/list`,
        method: 'get',
        params: query
    });
};

/* 获取每种卡项默认图片 */
export const getDefaultPic = query => {
    return request({
        url: `${IP}/admin/card/defaultImg`,
        method: 'get',
        params: query
    });
};

/* 次卡 */
/* 次卡详情 */
export const getCikaDetial = query => {
    return request({
        url: `${IP}/admin/card/time/detail`,
        method: 'get',
        params: query
    });
};

/* 充值卡 */
/* 充值卡详情 */
export const getInsertDetail = query => {
    return request({
        url: `${IP}/admin/card/recharge/detail`,
        method: 'get',
        params: query
    });
};

/* 保存充值卡 */
export const saveRechargeCard = query => {
    return request({
        url: `${IP}/admin/card/recharge/save`,
        method: 'post',
        data: query
    });
};

/* 储蓄卡历史详情 */
export const getRechargeHistoryDetail = query => {
    return request({
        url: `${IP}/admin/card/recharge/historyDetail`,
        method: 'get',
        params: query
    });
};

/* 储蓄卡已售列表 */
export const getSoldList = query => {
    return request({
        url: `${IP}/admin/card/recharge/sell`,
        method: 'get',
        params: query
    });
};

/* 储蓄卡已售详情 */
export const getSoldDetail = query => {
    return request({
        url: `${IP}/admin/card/recharge/sellDetail`,
        method: 'get',
        params: query
    });
};

/* 二维码 */
export const previewQr = query => {
    return request({
        url: `${IP}/admin/card/recharge/previewQr`,
        method: 'post',
        data: query
    });
};