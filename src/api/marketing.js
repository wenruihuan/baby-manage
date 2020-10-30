import request from '../utils/request';
// 获取一级推广员列表
export const getFirstAgentList = query => {
  return request({
    url: `/admin/publicist/list`,
    method: 'get',
    params: query
  })
}
// 获取一级推广员下拉列表
export const getFirstAgentOptions = query => {
  return request({
    url: `/admin/publicist/topSelectList`,
    method: 'get',
    params: query
  })
}
// 获取二级推广员列表
export const getSecondAgentList = query => {
  return request({
    url: `/admin/publicist/secondList`,
    method: 'get',
    params: query
  })
}
// 获取二级推广员下拉列表
export const getSecondAgentOptions = query => {
  return request({
    url: `/admin/publicist/secondSelectlist`,
    method: 'get',
    params: query
  })
}
// 获取推广员贡献数据
export const getAgentData = query => {
  return request({
    url: `/admin/publicist/statistics`,
    method: 'get',
    params: query
  })
}
// 添加一级推广员
export const addFirstAgent = query => {
  return request({
    url: `/admin/publicist/save`,
    method: 'post',
    data: query
  })
}

// 清退推广员
export const removeAgent = query => {
  return request({
    url: `/admin/publicist/out`,
    method: 'post',
    data: query
  })
}
// 会员价列表
export const getMemberPriceList = query => {
  return request({
    url: `/admin/memberLevel/priceList`,
    method: 'get',
    params: query
  })
}
// 添加会员价商品
export const addMemberProducts = query => {
  return request({
    url: `/admin/memberLevel/addGoods`,
    method: 'post',
    data: query
  })
}
// 设置会员价商品
export const setMemberProduct = query => {
  return request({
    url: `/admin/memberLevel/setMemberPrice`,
    method: 'post',
    data: query
  })
}
// 移出会员价
export const removeMemberPrice = query => {
  return request({
    url: `/admin/memberLevel/deletePrice`,
    method: 'post',
    data: query
  })
}
// 导出推广员数据报表
export const exportData = query => {
  return request({
    url: '/admin/publicist/export',
    method: 'get',
    params: query
  })
}

// 获取会员等级列表
export const getMemberLevels = query => {
  return request({
    url: '/admin/member/level',
    method: 'get',
    params: query
  })
}
// 获取商品分类下拉列表
export const getGoodsCateOptions = query => {
  return request({
    url: '/admin/goods/selectKind',
    method: 'get',
    params: query
  })
}
// 获取商品列表
export const getGoodsList = query => {
  return request({
    url: '/admin/goods/selectList',
    method: 'get',
    params: query
  })
}



