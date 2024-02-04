import request from '@/utils/request'

// 查询个人发票列表
export function listMall_personal_invoice(query) {
  return request({
    url: '/mall/mall_personal_invoice/list',
    method: 'get',
    params: query
  })
}

// 查询所有个人发票列表
export function allMall_personal_invoices(query) {
  return request({
    url: '/mall/mall_personal_invoice/all/mall_personal_invoices',
    method: 'get',
    params: query
  })
}

// 查询个人发票详细
export function getMall_personal_invoice(userId) {
  return request({
    url: '/mall/mall_personal_invoice/' + userId,
    method: 'get'
  })
}

// 新增个人发票
export function addMall_personal_invoice(data) {
  return request({
    url: '/mall/mall_personal_invoice',
    method: 'post',
    data: data
  })
}

// 修改个人发票
export function updateMall_personal_invoice(data) {
  return request({
    url: '/mall/mall_personal_invoice',
    method: 'put',
    data: data
  })
}

// 删除个人发票
export function delMall_personal_invoice(userId) {
  return request({
    url: '/mall/mall_personal_invoice/' + userId,
    method: 'delete'
  })
}
