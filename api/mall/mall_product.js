import request from '@/utils/request'

// 查询商品列表列表
export function listMall_product(query) {
    return request({
        url: '/mall/mall_product/list',
        method: 'get',
        params: query
    })
}

// 查询所有商品列表列表
export function allMall_products(query) {
    return request({
        url: '/mall/mall_product/all/mall_products',
        method: 'get',
        params: query
    })
}

// 查询商品列表详细
export function getMall_product(id) {
    return request({
        url: '/mall/mall_product/' + id,
        method: 'get'
    })
}

// 新增商品列表
export function addMall_product(data) {
    return request({
        url: '/mall/mall_product',
        method: 'post',
        data: data
    })
}

// 修改商品列表
export function updateMall_product(data) {
    return request({
        url: '/mall/mall_product',
        method: 'put',
        data: data
    })
}

// 删除商品列表
export function delMall_product(id) {
    return request({
        url: '/mall/mall_product/' + id,
        method: 'delete'
    })
}

export function querySku(query) {
    return request({
        url: '/mall/product_sku/sku',
        method: 'get',
        params: query
    })
}

export function queryProductByCategoryAndProductName(query) {
    return request({
        url: '/mall/mall_product/queryProductByCategoryAndProductName',
        method: 'get',
        params: query
    })
}