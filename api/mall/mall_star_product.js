import request from '@/utils/request'

// 查询mall_star_product列表
export function listMall_star_product(query) {
  return request({
    url: '/mall/mall_star_product/list',
    method: 'get',
    params: query
  })
}

// 查询所有mall_star_product列表
export function allMall_star_products(query) {
  return request({
    url: '/mall/mall_star_product/all/mall_star_products',
    method: 'get',
    params: query
  })
}

// 查询mall_star_product详细
export function getMall_star_product(id) {
  return request({
    url: '/mall/mall_star_product/' + id,
    method: 'get'
  })
}

// 新增mall_star_product
export function addMall_star_product(data) {
  return request({
    url: '/mall/mall_star_product',
    method: 'post',
    data: data
  })
}

// 修改mall_star_product
export function updateMall_star_product(data) {
  return request({
    url: '/mall/mall_star_product',
    method: 'put',
    data: data
  })
}

// 删除mall_star_product
export function delMall_star_product(id) {
  return request({
    url: '/mall/mall_star_product/' + id,
    method: 'delete'
  })
}
