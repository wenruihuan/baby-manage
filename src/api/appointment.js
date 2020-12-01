import request from '../utils/request';

// 获取预约列表
export const getAppointmentList = query => {
    return request({
        url: '/admin/booking/list',
        method: 'get',
        params: query
    })
}

// 获取预约列表未读
export const getReadState = query => {
    return request({
        url: `/admin/booking/readState`,
        method: 'get',
        params: query
    })
}

// 获取取消预约
export const cancelBooking = params => {
    return request({
        url: `/admin/booking/cancel`,
        method: 'post',
        data: params
    })
}

// 获取技师下拉列表
export const getTechnicianList = query => {
    return request({
        url: `/admin/staff/technicianSelect`,
        method: 'get',
        params: query
    })
}

// 获取预约评价列表
export const getAppointmentRateList = query => {
    return request({
        url: `/admin/rate/list`,
        method: 'get',
        params: query
    })
}

// 根据手机号获取匹配的会员名
export const getMemberName = query => {
    return request({
        url: `/admin/booking/getName`,
        method: 'get',
        params: query
    })
}

// 服务sku级联选择器
export const getServiceList = query => {
    return request({
        url: `/admin/service/skuCascader`,
        method: 'get',
        params: query
    })
}

// 获取可选时间列表（指定服务或上门服务）
export const getTimeSelect = params => {
    return request({
        url: `/admin/booking/dateList`,
        method: 'post',
        data: params
    })
}

// 获取可选时间列表（指定技师版）
export const getTimeSelect1 = params => {
    return request({
        url: `/admin/booking/designatedDateList`,
        method: 'post',
        data: params
    })
}

// 添加（编辑）预约
export const saveBook = params => {
    return request({
        url: `/admin/booking/save`,
        method: 'post',
        data: params
    })
}

// 预约详情
export const bookDetail = query => {
    return request({
        url: `/admin/booking/detail`,
        method: 'get',
        params: query
    })
}

// 导出预约列表
export const exportBook = query => {
    return request({
        url: `/admin/booking/export`,
        method: 'get',
        params: query
    })
}
