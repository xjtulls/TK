import request from '@/utils/request'

// 查询文章管理列表
export function listMall_article(query) {
  return request({
    url: '/mall/mall_article/list',
    method: 'get',
    params: query
  })
}

// 查询所有文章管理列表
export function allMall_articles(query) {
  return request({
    url: '/mall/mall_article/all/mall_articles',
    method: 'get',
    params: query
  })
}

// 查询文章管理详细
export function getMall_article(id) {
  return request({
    url: '/mall/mall_article/' + id,
    method: 'get'
  })
}

// 新增文章管理
export function addMall_article(data) {
  return request({
    url: '/mall/mall_article',
    method: 'post',
    data: data
  })
}

// 修改文章管理
export function updateMall_article(data) {
  return request({
    url: '/mall/mall_article',
    method: 'put',
    data: data
  })
}

// 删除文章管理
export function delMall_article(id) {
  return request({
    url: '/mall/mall_article/' + id,
    method: 'delete'
  })
}
