import request from '@/utils/request'

// 查询用户成长值列表
export function listMall_user_experience(query) {
    return request({
        url: '/mall/mall_user_experience/list',
        method: 'get',
        params: query
    })
}

// 查询所有用户成长值列表
export function allMall_user_experiences(query) {
    return request({
        url: '/mall/mall_user_experience/all/mall_user_experiences',
        method: 'get',
        params: query
    })
}

// 查询用户成长值详细
export function getMall_user_experience(id) {
    return request({
        url: '/mall/mall_user_experience/' + id,
        method: 'get'
    })
}

// 新增用户成长值
export function addMall_user_experience(data) {
    return request({
        url: '/mall/mall_user_experience',
        method: 'post',
        data: data
    })
}

// 修改用户成长值
export function updateMall_user_experience(data) {
    return request({
        url: '/mall/mall_user_experience',
        method: 'put',
        data: data
    })
}

// 删除用户成长值
export function delMall_user_experience(id) {
    return request({
        url: '/mall/mall_user_experience/' + id,
        method: 'delete'
    })
}


// 查询用户会员等级
export function queryUserLevelInfo() {
    return request({
        url: '/mall/mall_user_experience/queryUserLevelInfo',
        method: 'get'
    })
}

// 查询用户签到信息
export function queryUserSignInfo() {
    return request({
        url: '/mall/mall_user_experience/queryUserSignInfo',
        method: 'get'
    })
}