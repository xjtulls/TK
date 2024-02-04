import request from '@/utils/request'

// 查询mall列表
export function listMall_star_article(query) {
  return request({
    url: '/mall/mall_star_article/list',
    method: 'get',
    params: query
  })
}

// 查询所有mall列表
export function allMall_star_articles(query) {
  return request({
    url: '/mall/mall_star_article/all/mall_star_articles',
    method: 'get',
    params: query
  })
}

// 查询mall详细
export function getMall_star_article(userId) {
  return request({
    url: '/mall/mall_star_article/' + userId,
    method: 'get'
  })
}

// 新增mall
export function addMall_star_article(data) {
  return request({
    url: '/mall/mall_star_article',
    method: 'post',
    data: data
  })
}

// 修改mall
export function updateMall_star_article(data) {
  return request({
    url: '/mall/mall_star_article',
    method: 'put',
    data: data
  })
}

// 删除mall
export function delMall_star_article(userId) {
  return request({
    url: '/mall/mall_star_article/' + userId,
    method: 'delete'
  })
}
