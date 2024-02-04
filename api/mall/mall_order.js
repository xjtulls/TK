import request from '@/utils/request'

// 查询订单列表
export function listMall_order(query) {
  return request({
    url: '/mall/mall_order/list',
    method: 'get',
    params: query
  })
}

// 查询所有订单列表
export function allMall_orders(query) {
  return request({
    url: '/mall/mall_order/all/mall_orders',
    method: 'get',
    params: query
  })
}

// 查询订单详细
export function getMall_order(id) {
  return request({
    url: '/mall/mall_order/' + id,
    method: 'get'
  })
}

// 新增订单
export function addMall_order(data) {
  return request({
    url: '/mall/mall_order',
    method: 'post',
    data: data
  })
}

// 修改订单
export function updateMall_order(data) {
  return request({
    url: '/mall/mall_order',
    method: 'put',
    data: data
  })
}

// 删除订单
export function delMall_order(id) {
  return request({
    url: '/mall/mall_order/' + id,
    method: 'delete'
  })
}

// 查询订单列表
export function queryUserOrder(query) {
  return request({
    url: '/mall/mall_order/queryUserOrder',
    method: 'get',
    params: query
  })
}