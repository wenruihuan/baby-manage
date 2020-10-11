import request from '../../../../utils/request';

const IP = 'https://result.eolinker.com/BxxMFUV803ea48c63410d63327c3ad2f649e76860d89dfd?uri=';

/* 获取包厢列表 */
export const getBoxList = query => {
    return request({
        url: `${IP}/admin/box/list`,
        method: 'get',
        params: query
    });
};

/* 获取包厢分类列表 */
export const getCategoryList = query => {
    return request({
        url: `${IP}/admin/box/kind`,
        method: 'get'
    });
};
