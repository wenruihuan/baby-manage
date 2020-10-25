import request from '../utils/request';

/* 获取上传token */
export const getUploadToken = query => {
    return request({
        url: `/admin/common/qiniuToken`,
        method: 'get',
        params: query
    });
};

// 获取文章列表
export const getArticleList = query => {
  return request({
    url: `/admin/mp/articleList`,
    method: 'get',
    params: query
  })
}

// 设置文章发布状态
export const updateArticleStatus = params => {
  return request({
    url: `/admin/mp/articlePublish`,
    method: 'post',
    data: params
  })
}

// 删除文章
export const deleteArticle = params => {
  return request({
    url: `/admin/mp/articleDelete`,
    method: 'post',
    data: params
  })
}

// 添加（编辑）文章
export const saveArticle = params => {
  return request({
    url: `/admin/mp/articleSave`,
    method: 'post',
    data: params
  })
}

// 获取banner
export const getBanner = query => {
  return request({
    url: `/admin/mp/getBanner`,
    method: 'get',
    params: query
  })
}

// 获取推荐服务
export const getRecommendService = query => {
  return request({
    url: `/admin/mp/getRecommendService`,
    method: 'get',
    params: query
  })
}

// 获取推荐商品
export const getRecommendGoods = query => {
  return request({
    url: `/admin/mp/getRecommendGoods`,
    method: 'get',
    params: query
  })
}