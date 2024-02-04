import request from '@/utils/request'

// 查询浏览历史列表
export function listMall_browse_history(query) {
  return request({
    url: '/mall/mall_browse_history/list',
    method: 'get',
    params: query
  })
}

// 查询所有浏览历史列表
export function allMall_browse_historys(query) {
  return request({
    url: '/mall/mall_browse_history/all/mall_browse_historys',
    method: 'get',
    params: query
  })
}

// 查询浏览历史详细
export function getMall_browse_history(id) {
  return request({
    url: '/mall/mall_browse_history/' + id,
    method: 'get'
  })
}

// 新增浏览历史
export function addMall_browse_history(data) {
  return request({
    url: '/mall/mall_browse_history',
    method: 'post',
    data: data
  })
}

// 修改浏览历史
export function updateMall_browse_history(data) {
  return request({
    url: '/mall/mall_browse_history',
    method: 'put',
    data: data
  })
}

// 删除浏览历史
export function delMall_browse_history(id) {
  return request({
    url: '/mall/mall_browse_history/' + id,
    method: 'delete'
  })
}

export function queryUserBrowseHistory() {
  return request({
    url: '/mall/mall_browse_history/queryUserBrowseHistory',
    method: 'get',
  })
}

// 删除浏览历史
export function deleteMallBrowseHistoryByTime(times) {
  return request({
    url: '/mall/mall_browse_history/deleteMallBrowseHistoryByTime/' + times,
    method: 'delete'
  })
}