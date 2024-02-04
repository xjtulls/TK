<template>
  <view class="container">
    <m-card>
      <u-cell-group>
        <u-cell-item icon="account" title="昵称" :value="user.nickName" :arrow="false"></u-cell-item>
        <u-cell-item icon="phone" title="手机号码" :value="user.phonenumber" :arrow="false"></u-cell-item>
        <u-cell-item icon="email" title="邮箱" :value="user.email" :arrow="false"></u-cell-item>
        <u-cell-item icon="clock" title="注册日期" :value="user.createTime" :arrow="false"></u-cell-item>
      </u-cell-group>
    </m-card>
  </view>
</template>

<script>
import {getUserProfile} from "@/api/system/user"

export default {
  data() {
    return {
      user: {},
      roleGroup: "",
      postGroup: ""
    }
  },
  onLoad() {
    this.getUser()
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
</style>
