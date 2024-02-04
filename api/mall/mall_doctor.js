import request from '@/utils/request'

// 查询医生入驻列表
export function listMall_doctor(query) {
  return request({
    url: '/mall/mall_doctor/list',
    method: 'get',
    params: query
  })
}

// 查询所有医生入驻列表
export function allMall_doctors(query) {
  return request({
    url: '/mall/mall_doctor/all/mall_doctors',
    method: 'get',
    params: query
  })
}

// 查询医生入驻详细
export function getMall_doctor(userId) {
  return request({
    url: '/mall/mall_doctor/' + userId,
    method: 'get'
  })
}

// 新增医生入驻
export function addMall_doctor(data) {
  return request({
    url: '/mall/mall_doctor',
    method: 'post',
    data: data
  })
}

// 修改医生入驻
export function updateMall_doctor(data) {
  return request({
    url: '/mall/mall_doctor',
    method: 'put',
    data: data
  })
}

// 删除医生入驻
export function delMall_doctor(userId) {
  return request({
    url: '/mall/mall_doctor/' + userId,
    method: 'delete'
  })
}
