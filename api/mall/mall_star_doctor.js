import request from '@/utils/request'

// 查询mall_star_doctor列表
export function listMall_star_doctor(query) {
  return request({
    url: '/mall/mall_star_doctor/list',
    method: 'get',
    params: query
  })
}

// 查询所有mall_star_doctor列表
export function allMall_star_doctors(query) {
  return request({
    url: '/mall/mall_star_doctor/all/mall_star_doctors',
    method: 'get',
    params: query
  })
}

// 查询mall_star_doctor详细
export function getMall_star_doctor(id) {
  return request({
    url: '/mall/mall_star_doctor/' + id,
    method: 'get'
  })
}

// 新增mall_star_doctor
export function addMall_star_doctor(data) {
  return request({
    url: '/mall/mall_star_doctor',
    method: 'post',
    data: data
  })
}

// 修改mall_star_doctor
export function updateMall_star_doctor(data) {
  return request({
    url: '/mall/mall_star_doctor',
    method: 'put',
    data: data
  })
}

// 删除mall_star_doctor
export function delMall_star_doctor(id) {
  return request({
    url: '/mall/mall_star_doctor/' + id,
    method: 'delete'
  })
}
