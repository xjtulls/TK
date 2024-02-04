import request from '@/utils/request'

// 查询优惠券领取记录列表
export function listMall_coupon_receive(query) {
  return request({
    url: '/mall/mall_coupon_receive/list',
    method: 'get',
    params: query
  })
}

// 查询所有优惠券领取记录列表
export function allMall_coupon_receives(query) {
  return request({
    url: '/mall/mall_coupon_receive/all/mall_coupon_receives',
    method: 'get',
    params: query
  })
}

// 查询优惠券领取记录详细
export function getMall_coupon_receive(id) {
  return request({
    url: '/mall/mall_coupon_receive/' + id,
    method: 'get'
  })
}

// 新增优惠券领取记录
export function addMall_coupon_receive(data) {
  return request({
    url: '/mall/mall_coupon_receive',
    method: 'post',
    data: data
  })
}

// 修改优惠券领取记录
export function updateMall_coupon_receive(data) {
  return request({
    url: '/mall/mall_coupon_receive',
    method: 'put',
    data: data
  })
}

// 删除优惠券领取记录
export function delMall_coupon_receive(id) {
  return request({
    url: '/mall/mall_coupon_receive/' + id,
    method: 'delete'
  })
}
export function queryReceiveCouponByStatus(query) {
  return request({
    url: '/mall/mall_coupon_receive/queryReceiveCouponByStatus',
    method: 'get',
    params: query
  })
}