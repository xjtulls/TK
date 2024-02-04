import request from '@/utils/request'

// 查询评论列表
export function listMall_comment(query) {
  return request({
    url: '/mall/mall_comment/list',
    method: 'get',
    params: query
  })
}

// 查询所有评论列表
export function allMall_comments(query) {
  return request({
    url: '/mall/mall_comment/all/mall_comments',
    method: 'get',
    params: query
  })
}

// 查询评论详细
export function getMall_comment(id) {
  return request({
    url: '/mall/mall_comment/' + id,
    method: 'get'
  })
}

// 新增评论
export function addMall_comment(data) {
  return request({
    url: '/mall/mall_comment',
    method: 'post',
    data: data
  })
}

// 修改评论
export function updateMall_comment(data) {
  return request({
    url: '/mall/mall_comment',
    method: 'put',
    data: data
  })
}

// 删除评论
export function delMall_comment(id) {
  return request({
    url: '/mall/mall_comment/' + id,
    method: 'delete'
  })
}


export function queryProductComments(query) {
  return request({
    url: '/mall/mall_comment/queryProductComments',
    method: 'get',
    params: query
  })
}