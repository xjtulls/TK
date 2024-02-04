import request from '@/utils/request'

// 查询商品列表列表
export function generateBuyNowParam(query) {
    return request({
        url: '/mall/product_sku/generateBuyNowParam',
        method: 'get',
        params: query
    })
}
