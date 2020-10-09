import request from '../utils/request';
const IP = 'http://127.0.0.1:7001';
export const fetchData = query => {
    return request({
        url: './table.json',
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
