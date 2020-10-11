import request from '../utils/request';
const IP = 'https://result.eolinker.com/BxxMFUV803ea48c63410d63327c3ad2f649e76860d89dfd?uri=';
export const shopInfo = query => {
    return request({
        url: `${IP}/admin/shop/info`,
        method: 'get',
        params: query
    });
};

export const login = query => {
    return request({
        url: IP + `/admin/common/login`,
        method: 'post',
        params: query
    });
};
