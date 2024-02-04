import request from '@/utils/request'

// 查询购物车列表
export function listCart(query) {
    return request({
        url: '/mall/cart/list',
        method: 'get',
        params: query
    })
}

// 查询所有购物车列表
export function allCarts(query) {
    return request({
        url: '/mall/cart/all/carts',
        method: 'get',
        params: query
    })
}

// 查询购物车详细
export function getCart() {
    return request({
        url: '/mall/cart',
        method: 'get'
    })
}

// 新增购物车
export function addCart(data) {
    return request({
        url: '/mall/cart',
        method: 'post',
        data: data
    })
}

// 修改购物车
export function updateCart(data) {
    return request({
        url: '/mall/cart',
        method: 'put',
        data: data
    })
}

// 删除购物车
export function delCart(cartId) {
    return request({
        url: '/mall/cart/' + cartId,
        method: 'delete'
    })
}


// 修改购物车
export function increase(id) {
    return request({
        url: '/mall/cart_item/increase/' + id,
        method: 'put',
    })
}

// 修改购物车
export function decrease(id) {
    return request({
        url: '/mall/cart_item/decrease/' + id,
        method: 'put',
    })
}

// 删除购物车详情
export function delCartItem(cartItemId) {
    return request({
        url: '/mall/cart_item/' + cartItemId,
        method: 'delete'
    })
}