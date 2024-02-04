import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import {getInfo, login, logout} from '@/api/login'
import {getToken, removeToken, setToken} from '@/utils/auth'
import {smsLogin} from "@/api/login";
import {userTabbar} from '@/utils/tabbar.js'

const baseUrl = config.baseUrl

const user = {
    state: {
        dynamicTabbar: storage.get(constant.tabBar), // 动态tabbar
        token: getToken(),
        name: storage.get(constant.name),
        nickName: storage.get(constant.nickName),
        avatar: storage.get(constant.avatar),
        userId: storage.get(constant.userId),
        roles: storage.get(constant.roles),
        permissions: storage.get(constant.permissions)
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
            storage.set(constant.name, name)
        },
        SET_NICKNAME: (state, nickName) => {
            state.nickName = nickName
            storage.set(constant.nickName, nickName)
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
            storage.set(constant.userId, userId)
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
            storage.set(constant.avatar, avatar)
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
            storage.set(constant.roles, roles)
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
            storage.set(constant.permissions, permissions)
        },
        SET_TABBAR(state, payload) {
            state.dynamicTabbar = payload
            storage.set(constant.tabBar, payload)
        }
    },

    actions: {
        ChangeTabBar({commit}, payload) {
            commit('SET_TABBAR', payload)
        },
        // 登录
        Login({commit}, userInfo) {
            let username = null
            if (userInfo.username != null) {
                username = userInfo.username.trim()
            }
            let mobile = userInfo.mobile
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                login(username, password, code, uuid, mobile).then(res => {
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 短信登录
        SMSLogin({commit}, userInfo) {
            const mobile = userInfo.mobile.trim()
            // const smsCode = userInfo.smsCode
            // const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                smsLogin(mobile).then(res => {
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    const user = res.user
                    let nickName = user.nickName
                    let userId = user.userId
                    const avatar = (user.avatar === "" || user.avatar == null) ? require("@/static/images/默认头像.png") : user.avatar
                    const username = (user.userName === "" || user.userName == null) ? "" : user.userName
                    if (res.roles && res.roles.length > 0) {
                        commit('SET_ROLES', res.roles)
                        commit('SET_PERMISSIONS', res.permissions)
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }
                    commit('SET_NAME', username)
                    commit('SET_USERID', userId)
                    commit('SET_NICKNAME', nickName)
                    commit('SET_AVATAR', avatar)
                    commit('SET_TABBAR', userTabbar)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSIONS', [])
                    commit('SET_AVATAR', '')
                    commit('SET_TABBAR', [])
                    removeToken()
                    storage.clean()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
