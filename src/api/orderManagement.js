import request from '../utils/request';
// 获取订单列表
export const getOrderList = query => {
  return request({
    url: `/admin/order/list`,
    method: 'get',
    params: query
  })
}
// 获取订单详情
export const getOrderDetail = query => {
  return request({
    url: `/admin/order/detail`,
    method: 'get',
    params: query
  })
}
// 获取支付方式
export const getPaymentList = () => {
  return request({
    url: `/admin/payment/list`,
    method: 'get'
  })
}
// 获取服务退款详情
export const getServiceDetail = query => {
  return request({
    url: `admin/refund/service/detail`,
    method: 'get',
    params: query
  })
}
// 获取次卡退款详情
export const getTimeCardDetail = query => {
  return request({
    url: `/admin/refund/card/timeDetail`,
    method: 'get',
    params: query
  })
}
// 获取折扣卡退款详情
export const getDiscountCardDetail = query => {
  return request({
    url: `/admin/refund/card/discountDetail`,
    method: 'get',
    params: query
  })
}
// 获取储值卡退款详情
export const getRechargeCardDetail = query => {
  return request({
    url: `/admin/refund/card/rechargeDetail`,
    method: 'get',
    params: query
  })
}
// 获取充值退款详情
export const getRechargeDetail = query => {
  return request({
    url: `/admin/refund/recharge/detail`,
    method: 'get',
    params: query
  })
}

// 提交储值卡退款
export const refundRechargeCard = query => {
  return request({
    url: `/admin/refund/card/doRechargeRefund`,
    method: 'post',
    data: query
  })
}
// 提交折扣卡退款
export const refundDiscountCard= query => {
  return request({
    url: `/admin/refund/card/doDiscountRefund`,
    method: 'post',
    data: query
  })
}
// 提交服务退款
export const refundService = query => {
  return request({
    url: `/admin/refund/service/doRefund`,
    method: 'post',
    data: query
  })
}
// 提交次卡退款
export const refundTimeCard = query => {
  return request({
    url: `/admin/refund/card/doTimeRefund`,
    method: 'post',
    data: query
  })
}
// 提交充值退款
export const refundRecharge = query => {
  return request({
    url: `/admin/refund/recharge/doRechargeRefund`,
    method: 'post',
    data: query
  })
}

// 取消订单
export const cancelOrder = query => {
  return request({
    url: `/admin/order/cancel`,
    method: 'post',
    data: query
  })
}
// 获取退单列表
export const getRefundList = query => {
  return request({
    url: `/admin/order/refund/list`,
    method: 'get',
    params: query
  })
}
// 获取退单详情
export const getRefundDetail = query => {
  return request({
    url: `/admin/order/refund/detail`,
    method: 'get',
    params: query
  })
}

// 获取商品订单列表
export const getProductOrderList = query => {
  return request({
    url: `/admin/order/goods/list`,
    method: 'get',
    params: query
  })
}
// 获取商品订单详情
export const getProductOrderDetail = query => {
  return request({
    url: `/admin/order/goods/detail`,
    method: 'get',
    params: query
  })
}
// 获取快递公司下拉列表
export const getExpressComList = query => {
  return request({
    url: `/admin/express/selectList`,
    method: 'get',
    params: query
  })
}
// 商品发货
export const deliveryGoods = query => {
  return request({
    url: `/admin/order/goods/deliver`,
    method: 'post',
    data: query
  })
}
// 导出商品信息
export const exportGoodsOrder = query => {
  return request({
    url: `/admin/order/goods/export`,
    method: 'get',
    params: query
  })
}



