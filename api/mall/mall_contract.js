import request from '@/utils/request'

// 查询厂商入驻列表
export function listMall_contract(query) {
  return request({
    url: '/mall/mall_contract/list',
    method: 'get',
    params: query
  })
}

// 查询所有厂商入驻列表
export function allMall_contracts(query) {
  return request({
    url: '/mall/mall_contract/all/mall_contracts',
    method: 'get',
    params: query
  })
}

// 查询厂商入驻详细
export function getMall_contract(userId) {
  return request({
    url: '/mall/mall_contract/' + userId,
    method: 'get'
  })
}

// 新增厂商入驻
export function addMall_contract(data) {
  return request({
    url: '/mall/mall_contract',
    method: 'post',
    data: data
  })
}

// 修改厂商入驻
export function updateMall_contract(data) {
  return request({
    url: '/mall/mall_contract',
    method: 'put',
    data: data
  })
}

// 删除厂商入驻
export function delMall_contract(userId) {
  return request({
    url: '/mall/mall_contract/' + userId,
    method: 'delete'
  })
}
