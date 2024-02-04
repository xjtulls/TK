import request from '@/utils/request'

// 查询sss列表
export function listMall_like_article(query) {
  return request({
    url: '/mall/mall_like_article/list',
    method: 'get',
    params: query
  })
}

// 查询所有sss列表
export function allMall_like_articles(query) {
  return request({
    url: '/mall/mall_like_article/all/mall_like_articles',
    method: 'get',
    params: query
  })
}

// 查询sss详细
export function getMall_like_article(userId) {
  return request({
    url: '/mall/mall_like_article/' + userId,
    method: 'get'
  })
}

// 新增sss
export function addMall_like_article(data) {
  return request({
    url: '/mall/mall_like_article',
    method: 'post',
    data: data
  })
}

// 修改sss
export function updateMall_like_article(data) {
  return request({
    url: '/mall/mall_like_article',
    method: 'put',
    data: data
  })
}

// 删除sss
export function delMall_like_article(userId) {
  return request({
    url: '/mall/mall_like_article/' + userId,
    method: 'delete'
  })
}
