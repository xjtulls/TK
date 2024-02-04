import request from '@/utils/request'

// 查询商品分类列表
export function listProduct_category(query) {
    return request({
        url: '/mall/product_category/list',
        method: 'get',
        params: query
    })
}

// 查询所有商品分类列表
export function allProduct_categorys(query) {
    return request({
        url: '/mall/product_category/all/product_categorys',
        method: 'get',
        params: query
    })
}

// 查询所有商品分类列表
export function buildCategoryTreeSelect() {
    return request({
        url: '/mall/product_category/buildCategoryTreeSelect',
        method: 'get',
    })
}

// 查询商品分类详细
export function getProduct_category(id) {
    return request({
        url: '/mall/product_category/' + id,
        method: 'get'
    })
}

// 新增商品分类
export function addProduct_category(data) {
    return request({
        url: '/mall/product_category',
        method: 'post',
        data: data
    })
}

// 修改商品分类
export function updateProduct_category(data) {
    return request({
        url: '/mall/product_category',
        method: 'put',
        data: data
    })
}

// 删除商品分类
export function delProduct_category(id) {
    return request({
        url: '/mall/product_category/' + id,
        method: 'delete'
    })
}
