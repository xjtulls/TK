import request from '@/utils/request'

// 查询公司发票列表
export function listMall_company_invoice(query) {
  return request({
    url: '/mall/mall_company_invoice/list',
    method: 'get',
    params: query
  })
}

// 查询所有公司发票列表
export function allMall_company_invoices(query) {
  return request({
    url: '/mall/mall_company_invoice/all/mall_company_invoices',
    method: 'get',
    params: query
  })
}

// 查询公司发票详细
export function getMall_company_invoice(userId) {
  return request({
    url: '/mall/mall_company_invoice/' + userId,
    method: 'get'
  })
}

// 新增公司发票
export function addMall_company_invoice(data) {
  return request({
    url: '/mall/mall_company_invoice',
    method: 'post',
    data: data
  })
}

// 修改公司发票
export function updateMall_company_invoice(data) {
  return request({
    url: '/mall/mall_company_invoice',
    method: 'put',
    data: data
  })
}

// 删除公司发票
export function delMall_company_invoice(userId) {
  return request({
    url: '/mall/mall_company_invoice/' + userId,
    method: 'delete'
  })
}
