import request from '../utils/request';

/* 获取上传token */
export const getUploadToken = query => {
    return request({
        url: `/admin/common/qiniuToken`,
        method: 'get',
        params: query
    });
};

// 获取文章列表
export const getArticleList = query => {
  return request({
    url: `/admin/mp/articleList`,
    method: 'get',
    params: query
  })
}

// 设置文章发布状态
export const updateArticleStatus = params => {
  return request({
    url: `/admin/mp/articlePublish`,
    method: 'post',
    data: params
  })
}

// 删除文章
export const deleteArticle = params => {
  return request({
    url: `/admin/mp/articleDelete`,
    method: 'post',
    data: params
  })
}

// 添加（编辑）文章
export const saveArticle = params => {
  return request({
    url: `/admin/mp/articleSave`,
    method: 'post',
    data: params
  })
}

// 获取banner
export const getBanner = query => {
  return request({
    url: `/admin/mp/getBanner`,
    method: 'get',
    params: query
  })
}

// 保存banner
export const saveBanner = params => {
  return request({
    url: `/admin/mp/saveBanner`,
    method: 'post',
    data: params
  })
}

// 获取推荐服务
export const getRecommendService = query => {
  return request({
    url: `/admin/mp/getRecommendService`,
    method: 'get',
    params: query
  })
}

// 保存推荐服务
export const saveService = params => {
  return request({
    url: `/admin/mp/saveRecommendService`,
    method: 'post',
    data: params
  })
}

// 获取服务分类列表
export const getServiceClassification = query => {
  return request({
    url: `/admin/service/selectKind`,
    method: 'get',
    params: query
  })
}

// 获取服务列表
export const getServiceList = query => {
  return request({
    url: `/admin/service/selectList`,
    method: 'get',
    params: query
  })
}

// 获取推荐商品
export const getRecommendGoods = query => {
  return request({
    url: `/admin/mp/getRecommendGoods`,
    method: 'get',
    params: query
  })
}

// 保存推荐商品
export const saveGoods = params => {
  return request({
    url: `/admin/mp/saveRecommendGoods`,
    method: 'post',
    data: params
  })
}

// 获取商品分类列表
export const getGoodsClassification = query => {
  return request({
    url: `/admin/goods/selectKind`,
    method: 'get',
    params: query
  })
}

// 获取商品列表
export const getGoodsList = query => {
  return request({
    url: `/admin/goods/selectList`,
    method: 'get',
    params: query
  })
}

// 获取积分设置页信息
export const getPoint = query => {
  return request({
    url: `/admin/point/getConfig`,
    method: 'get',
    params: query
  })
}

// 保存积分说明
export const savePointMessage = params => {
  return request({
    url: `/admin/point/messageSave`,
    method: 'post',
    data: params
  })
}

// 保存积分规则
export const savePointRules = params => {
  return request({
    url: `/admin/point/save`,
    method: 'post',
    data: params
  })
}

// 获取标签列表
export const getMemberTagList = query => {
  return request({
    url: `/admin/memberTag/list`,
    method: 'get',
    params: query
  })
}

// 标签删除
export const deleteTag = params => {
  return request({
    url: `/admin/memberTag/delete`,
    method: 'post',
    data: params
  })
}

// 添加（编辑）会员标签
export const saveTag = params => {
  return request({
    url: `/admin/memberTag/save`,
    method: 'post',
    data: params
  })
}

// 获取开单设置列表
export const getPayment = query => {
  return request({
    url: `/admin/payment/list`,
    method: 'get',
    params: query
  })
}

// 添加（编辑）自定义记账
export const savePayment = params => {
  return request({
    url: `/admin/payment/save`,
    method: 'post',
    data: params
  })
}

// 获取配送设置
export const getExpress = query => {
  return request({
    url: `/admin/express/getConfig`,
    method: 'get',
    params: query
  })
}

// 保存配送设置
export const saveExpress = params => {
  return request({
    url: `/admin/express/save`,
    method: 'post',
    data: params
  })
}

// 获取等级列表
export const getMemberLevel = query => {
  return request({
    url: `/admin/memberLevel/list`,
    method: 'get',
    params: query
  })
}

// 删除等级
export const deleteMemberLevel = params => {
  return request({
    url: `/admin/memberLevel/delete`,
    method: 'post',
    data: params
  })
}

// 获取等级信息
export const getMemberDetail = query => {
  return request({
    url: `/admin/memberLevel/detail`,
    method: 'get',
    params: query
  })
}

// 新增（编辑）等级
export const saveMemberLevel = params => {
  return request({
    url: `/admin/memberLevel/save`,
    method: 'post',
    data: params
  })
}

// 获取卡列表（不分页版）
export const getCardList = query => {
  return request({
    url: `/admin/card/listNoPage`,
    method: 'get',
    params: query
  })
}

// 获取全局预约设置
export const getGlobalData = query => {
  return request({
    url: `/admin/booking/getGlobal`,
    method: 'get',
    params: query
  })
}

// 保存全局预约设置
export const saveGlobal = params => {
  return request({
    url: `/admin/booking/saveGlobal`,
    method: 'post',
    data: params
  })
}