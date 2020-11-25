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

/* 获取卡项列表 */
export const getBoxList = query => {
    return request({
        url: `/admin/card/list`,
        method: 'get',
        params: query
    });
};

/* 删除卡项 */
export const removeCard = query => {
    return request({
        url: `/admin/card/delete`,
        method: 'post',
        data: query
    });
};

/* 删除服务分类 */
export const removeBox = query => {
    return request({
        url: `/admin/service/deleteKind`,
        method: 'post',
        data: query
    });
};

/* 服务详情 */
export const getDetail = query => {
    return request({
        url: `/admin/service/detail`,
        method: 'get',
        params: query
    });
};

/* 添加/编辑服务 */
export const addOrEditBox = query => {
    return request({
        url: `/admin/service/save`,
        method: 'post',
        data: query
    });
};

/* 服务上下架 */
export const setPublish = query => {
    return request({
        url: `/admin/card/setPublish`,
        method: 'post',
        data: query
    });
};

//
/* 折扣卡二维码预览 */
export const getQrCode = query => {
    return request({
        url: `/admin/card/discount/previewQr`,
        method: 'post',
        data: query
    });
};

/* 获取服务分类列表 */
export const getCategoryList = query => {
    return request({
        url: `/admin/service/kind`,
        method: 'get',
        params: query
    });
};

/* 获取服务标签列表 */
export const getServiceTags = query => {
    return request({
        url: `/admin/service/tag`,
        method: 'get',
        params: query
    });
};

/* 添加服务分类 */
export const addCategory = query => {
    return request({
        url: `/admin/service/saveKind`,
        method: 'post',
        data: query
    });
};

/* 删除服务分类 */
export const removeCategory = query => {
    return request({
        url: `/admin/service/deleteKind`,
        method: 'post',
        data: query
    });
};

/* 获取服务标签列表 */
export const getTagList = query => {
    return request({
        url: `/admin/service/tag`,
        method: 'get',
        params: query
    });
};

/* 保存服务标签 */
export const saveTag = query => {
    return request({
        url: `/admin/service/saveTag`,
        method: 'post',
        data: query
    });
};

/* 删除服务标签 */
export const removeTag = query => {
    return request({
        url: `/admin/service/deleteTag`,
        method: 'post',
        data: query
    });
};

/* 卡项是否展示 */
export const setShow = query => {
    return request({
        url: `/admin/card/setShow`,
        method: 'post',
        data: query
    });
};

/* 卡项排序 */
export const setSort = query => {
    return request({
        url: `/admin/card/sort`,
        method: 'post',
        data: query
    });
};

/* 保存次卡 */
export const saveCika = query => {
    return request({
        url: `/admin/card/time/save`,
        method: 'post',
        data: query
    });
};

/* 获取服务列表 */
export const getServiceList = query => {
    return request({
        url: `/admin/service/list`,
        method: 'get',
        params: query
    });
};

// 获取服务分类列表
export const getServiceKind = query => {
    return request({
        url: `/admin/service/kind`,
        method: 'get',
        params: query
    });
};

/* 获取每种卡项默认图片 */
export const getDefaultPic = query => {
    return request({
        url: `/admin/card/defaultImg`,
        method: 'get',
        params: query
    });
};

/* 次卡 */
/* 次卡详情 */
export const getTimeDetial = query => {
    return request({
        url: `/admin/card/time/detail`,
        method: 'get',
        params: query
    });
};

/* 保存次卡 */
export const saveTimeCard = query => {
    return request({
        url: `/admin/card/time/save`,
        method: 'post',
        data: query
    });
};

/* 获取次卡的已售列表 */
export const getTimeSoldList = query => {
    return request({
        url: `/admin/card/time/sell`,
        method: 'get',
        params: query
    });
};

/* 获取次卡的已售详情 */
export const getTimeSoldDetail = query => {
    return request({
        url: `/admin/card/time/sellDetail`,
        method: 'get',
        params: query
    });
};

/* 获取次卡的历史列表 */
export const getTimeHisList = query => {
    return request({
        url: `/admin/card/time/history`,
        method: 'get',
        params: query
    });
};

/* 获取次卡的历史详情 */
export const getTimeHisDetail = query => {
    return request({
        url: `/admin/card/time/historyDetail`,
        method: 'get',
        params: query
    });
};
/* 次卡预览 */
export const getTimeQrcode = query => {
    return request({
        url: `/admin/card/time/previewQr`,
        method: 'post',
        data: query
    });
};

/* 折扣卡 */
// 获取折扣卡详情
export const getDiscountDetail = query => {
    return request({
        url: `/admin/card/discount/detail`,
        method: 'get',
        params: query
    });
};

// 保存折扣卡
export const saveDiscount = query => {
    return request({
        url: `/admin/card/discount/save`,
        method: 'post',
        data: query
    });
};

// 获取折扣卡已售列表
export const getDiscountSoldList = query => {
    return request({
        url: `/admin/card/discount/sell`,
        method: 'get',
        params: query
    });
};

// 获取折扣卡已售列表
export const getDiscountSoldDetail = query => {
    return request({
        url: `/admin/card/discount/sellDetail`,
        method: 'get',
        params: query
    });
};

// 获取折扣历史表
export const getDiscountHisList = query => {
    return request({
        url: `/admin/card/discount/history`,
        method: 'get',
        params: query
    });
};

// 获取折扣历史详情
export const getDiscountHisDetail = query => {
    return request({
        url: `/admin/card/discount/historyDetail`,
        method: 'get',
        params: query
    });
};

/* 充值卡 */
/* 充值卡详情 */
export const getInsertDetail = query => {
    return request({
        url: `/admin/card/recharge/detail`,
        method: 'get',
        params: query
    });
};

/* 保存充值卡 */
export const saveRechargeCard = query => {
    return request({
        url: `/admin/card/recharge/save`,
        method: 'post',
        data: query
    });
};

/* 储蓄卡历史列表 */
export const getRechargeHistoryList = query => {
    return request({
        url: `/admin/card/recharge/history`,
        method: 'get',
        params: query
    });
};

/* 储蓄卡历史详情 */
export const getRechargeHistoryDetail = query => {
    return request({
        url: `/admin/card/recharge/historyDetail`,
        method: 'get',
        params: query
    });
};

/* 储蓄卡已售列表 */
export const getSoldList = query => {
    return request({
        url: `/admin/card/recharge/sell`,
        method: 'get',
        params: query
    });
};

/* 储蓄卡已售详情 */
export const getSoldDetail = query => {
    return request({
        url: `/admin/card/recharge/sellDetail`,
        method: 'get',
        params: query
    });
};

/* 二维码 */
export const previewQr = query => {
    return request({
        url: `/admin/card/recharge/previewQr`,
        method: 'post',
        data: query
    });
};

/* 获取新增充值卡时可选权益（树形数据） */
export const getRechargeRight = query => {
    return request({
        url: `/admin/card/recharge/right`,
        method: 'get',
        params: query
    });
};

/*  获取卡列表（不分页版） */
export const getCardQuanlityList = query => {
    return request({
        url: `/admin/card/listNoPage`,
        method: 'get',
        params: query
    });
};

/* 使卡失效 */
export const setInvalid = query => {
    return request({
        url: `/admin/card/setInvalid`,
        method: 'post',
        data: query
    });
};

/* 修改有效期 */
export const setExpires = query => {
    return request({
        url: `/admin/card/setExpires`,
        method: 'post',
        data: query
    });
};
