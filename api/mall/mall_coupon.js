import request from '@/utils/request'


// 查询所有优惠券列表
export function queryUnReceivedCoupon(query) {
  return request({
    url: '/mall/coupon/queryUnReceivedCoupon',
    method: 'get',
    params: query
  })
}

export function queryCanUseCoupon(query) {
  return request({
    url: '/mall/coupon/queryCanUseCoupon',
    method: 'get',
    params: query
  })
}
