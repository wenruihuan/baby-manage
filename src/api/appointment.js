import request from '../utils/request';
const IP = 'https://result.eolinker.com/BxxMFUV803ea48c63410d63327c3ad2f649e76860d89dfd?uri=';

// 获取预约列表
export const getAppointmentList = query => {
  return request({
    url: `${IP}/admin/booking/list`,
    method: 'get',
    params: query
  })
}

// 获取预约列表未读
export const getReadState = query => {
  return request({
    url: `${IP}/admin/booking/readState`,
    method: 'get',
    params: query
  })
}

// 获取取消预约
export const cancelBooking = params => {
  return request({
    url: `${IP}/admin/booking/cancel`,
    method: 'post',
    data: params
  })
}

// 获取预约评价列表
export const getAppointmentRateList = query => {
  return request({
    url: `${IP}/admin/rate/list`,
    method: 'get',
    params: query
  })
}