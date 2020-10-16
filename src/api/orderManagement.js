import request from '../utils/request';
const IP = 'https://result.eolinker.com/BxxMFUV803ea48c63410d63327c3ad2f649e76860d89dfd?uri=';
// 获取订单列表
export const getOrderList = query => {
  return request({
    url: `${IP}/admin/order/list`,
    method: 'get',
    params: query
  })
}
// 获取订单详情
export const getOrderDetail = query => {
  return request({
    url: `${IP}/admin/order/detail`,
    method: 'get',
    params: query
  })
}
// 获取支付方式
export const getPaymentList = query => {
  return request({
    url: `${IP}/admin/payment/list`,
    method: 'get',
    params: query
  })
}
// 获取服务退款详情
export const getServiceDetail = query => {
  return request({
    url: `${IP}admin/refund/service/detail`,
    method: 'get',
    params: query
  })
}
// 获取次卡退款详情
export const getTimeCardDetail = query => {
  return request({
    url: `${IP}/admin/refund/card/timeDetail`,
    method: 'get',
    params: query
  })
}
// 获取折扣卡退款详情
export const getDiscountCardDetail = query => {
  return request({
    url: `${IP}/admin/refund/card/discountDetail`,
    method: 'get',
    params: query
  })
}
// 获取储值卡退款详情
export const getValueCardDetail = query => {
  return request({
    url: `${IP}/admin/refund/card/rechargeDetail`,
    method: 'get',
    params: query
  })
}
// 提交储值卡退款
export const refundValueCard = query => {
  return request({
    url: `${IP}/admin/refund/card/doRechargeRefund`,
    method: 'post',
    params: query
  })
}
// 提交折扣卡退款
export const refundDiscountCard= query => {
  return request({
    url: `${IP}/admin/refund/card/doDiscountRefund`,
    method: 'post',
    params: query
  })
}
// 提交服务退款
export const refundService = query => {
  return request({
    url: `${IP}/admin/refund/service/doRefund`,
    method: 'post',
    params: query
  })
}
// 提交次卡退款
export const refundTimeCard = query => {
  return request({
    url: `${IP}/admin/refund/card/doTimeRefund`,
    method: 'post',
    params: query
  })
}
// 获取退单列表
export const getRefundList = query => {
  return request({
    url: `${IP}/admin/order/refund/list`,
    method: 'get',
    params: query
  })
}
// 获取退单详情
export const getRefundDetail = query => {
  return request({
    url: `${IP}/admin/order/refund/detail`,
    method: 'get',
    params: query
  })
}

// 获取商品订单列表
export const getProductOrderList = query => {
  return request({
    url: `${IP}/admin/order/goods/list`,
    method: 'get',
    params: query
  })
}
// 获取商品订单详情
export const getProductOrderDetail = query => {
  return request({
    url: `${IP}/admin/order/goods/detail`,
    method: 'get',
    params: query
  })
}
// 商品发货
export const deliveryGoods = query => {
  return request({
    url: `${IP}/admin/order/goods/deliver`,
    method: 'post',
    params: query
  })
}
