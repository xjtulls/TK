import request from '@/utils/request'

// 查询商品列表列表
export function countCartItemNum() {
  return request({
    url: '/mall/cart_item/countCartItemNum',
    method: 'get',
  })
}
