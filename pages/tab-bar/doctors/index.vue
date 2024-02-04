<template>
  <view>
    <u-navbar :is-back="true" title="医生列表"></u-navbar>
    <m-card v-for="(doctor,index) in doctors">
      <view style="display: flex">
        <view style="margin-top: 2%">
          <u-avatar size="120" :src="doctor.avatar"></u-avatar>
        </view>
        <view style="margin-left: 5%;margin-top: 2%">
          <view style="font-size: 35rpx;font-weight: bold">{{ doctor.realName }}</view>
          <view style="font-size: 30rpx;font-weight: bold;width: 200rpx;margin-top: 3%">
            {{ doctor.companyName }}
          </view>
        </view>
      </view>
      <view style="color:#999;">
        {{ doctor.professionalField }}
      </view>
      <u-line style="margin-top: 2%" color="#999"/>
      <view style="display: flex;margin-top: 2%;padding-bottom: 2%">
        <view style="display: flex;justify-content: center;align-items: center">
          <view>
            <u-icon size="40" name="heart"></u-icon>
          </view>
          <view>
            {{ doctor.stars }}
          </view>
        </view>
        <view style="display: flex;justify-content: center;align-items: center;margin-left: 70%">
          <u-button @click="handleChat(doctor)" size="mini" type="primary">咨询</u-button>
        </view>
      </view>
    </m-card>
  </view>
</template>

<script>

import {allMall_doctors} from "@/api/mall/mall_doctor";
import UButton from "@/uview-ui/components/u-button/u-button.vue";

export default {
  components: {UButton},
  onShow() {
    allMall_doctors().then(re => {
      this.doctors = re.data
    })
  },
  data() {
    return {
      doctors: [],
    }
  },
  methods: {
    handleChat(doctor) {
      if (this.$store.state.user.userId == doctor.userId) {
        this.showTip("不可以和自己聊天哦~")
        return
      }
      this.$tab.navigateTo('/pages/tab-bar/chat/index?chatUser='
          + JSON.stringify({
            chatUserId: doctor.userId,
            chatUserName: doctor.userName,
            chatUserAvatar: doctor.avatar
          }))
    },
  }
}
</script>

<style lang="scss" scoped>

</style>