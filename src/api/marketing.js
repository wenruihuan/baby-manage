import request from '../utils/request';
const IP = 'https://result.eolinker.com/BxxMFUV803ea48c63410d63327c3ad2f649e76860d89dfd?uri=';
// 获取一级推广员列表
export const getFirstAgentList = query => {
  return request({
    url: `${IP}/admin/publicist/list`,
    method: 'get',
    params: query
  })
}
// 获取二级推广员列表
export const getSecondAgentList = query => {
  return request({
    url: `${IP}admin/publicist/secondList`,
    method: 'get',
    params: query
  })
}
// 获取推广员贡献数据
export const getAgentData = query => {
  return request({
    url: `${IP}/admin/publicist/statistics`,
    method: 'get',
    params: query
  })
}
// 添加一级推广员
export const addFirstAgent = query => {
  return request({
    url: `${IP}/admin/publicist/statistics`,
    method: 'post',
    params: query
  })
}
// 清退推广员
export const removeAgent = query => {
  return request({
    url: `${IP}/admin/publicist/statistics`,
    method: 'post',
    params: query
  })
}
// 会员价列表
export const getMemberPriceList = query => {
  return request({
    url: `${IP}/admin/publicist/statistics`,
    method: 'get',
    params: query
  })
}
// 添加会员价商品
export const addMemberProducts = query => {
  return request({
    url: `${IP}/admin/publicist/statistics`,
    method: 'post',
    params: query
  })
}
// 设置会员价商品
export const setMemberProduct = query => {
  return request({
    url: `${IP}/admin/publicist/statistics`,
    method: 'post',
    params: query
  })
}
// 移出会员价
export const removeMemberPrice = query => {
  return request({
    url: `${IP}/admin/publicist/statistics`,
    method: 'post',
    params: query
  })
}

