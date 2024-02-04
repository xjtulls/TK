import request from '@/utils/request'

// 查询mall_after_sale列表
export function listMall_after_sale(query) {
  return request({
    url: '/mall/mall_after_sale/list',
    method: 'get',
    params: query
  })
}

// 查询所有mall_after_sale列表
export function allMall_after_sales(query) {
  return request({
    url: '/mall/mall_after_sale/all/mall_after_sales',
    method: 'get',
    params: query
  })
}

// 查询mall_after_sale详细
export function getMall_after_sale(orderId) {
  return request({
    url: '/mall/mall_after_sale/' + orderId,
    method: 'get'
  })
}

// 新增mall_after_sale
export function addMall_after_sale(data) {
  return request({
    url: '/mall/mall_after_sale',
    method: 'post',
    data: data
  })
}

// 修改mall_after_sale
export function updateMall_after_sale(data) {
  return request({
    url: '/mall/mall_after_sale',
    method: 'put',
    data: data
  })
}

// 删除mall_after_sale
export function delMall_after_sale(orderId) {
  return request({
    url: '/mall/mall_after_sale/' + orderId,
    method: 'delete'
  })
}
