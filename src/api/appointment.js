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