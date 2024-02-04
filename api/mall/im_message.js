import request from '@/utils/request'

// 查询聊天记录列表
export function listIm_message(query) {
    return request({
        url: '/mall/im_message/list',
        method: 'get',
        params: query
    })
}

// 查询所有聊天记录列表
export function allIm_messages(query) {
    return request({
        url: '/mall/im_message/all/im_messages',
        method: 'get',
        params: query
    })
}

// 查询聊天记录详细
export function getIm_message(id) {
    return request({
        url: '/mall/im_message/' + id,
        method: 'get'
    })
}

// 新增聊天记录
export function addIm_message(data) {
    return request({
        url: '/mall/im_message',
        method: 'post',
        data: data
    })
}

// 修改聊天记录
export function updateIm_message(data) {
    return request({
        url: '/mall/im_message',
        method: 'put',
        data: data
    })
}

// 删除聊天记录
export function delIm_message(id) {
    return request({
        url: '/mall/im_message/' + id,
        method: 'delete'
    })
}

/**
 * 查询用户聊天记录好友列表
 * @param query
 * @returns {Promise<unknown>}
 */
export function queryChatUserMessage() {
    return request({
        url: '/mall/im_message/queryChatUserMessage',
        method: 'get',
    })
}

export function queryHistoryMessage(query) {
    return request({
        url: '/mall/im_message/queryHistoryMessage',
        method: 'get',
        params: query
    })
}