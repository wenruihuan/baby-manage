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
// 获取支付方式
export const getPaymentList = query => {
  return request({
    url: `${IP}/admin/payment/list`,
    method: 'get',
    params: query
  })
}

