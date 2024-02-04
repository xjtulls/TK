<template>
  <view class="grade">
    <u-navbar title="会员中心"></u-navbar>
    <view class="cont">
      <view class="people">
        <view class="image">
          <image :src="userInfo.avatar"/>
        </view>
        <view class="text">
          <text>{{ userInfo.nickName }}</text>
          <text>{{ experienceInfo.currentLevelLabel }}</text>
        </view>
      </view>
      <m-card label="成长值" class="experience">
        <u-line-progress :percent="percentage" activeColor="#ff6200" :showPercent="true"
                         height="36rpx"></u-line-progress>
        <view class="number">
          <text>{{ experienceInfo.currentLevelLabel }}</text>
          <text>
            成长值:{{
              (experienceInfo.currentExperienceValue) + '/' + (experienceInfo.nextLevelValue)
            }}
          </text>
          <text>{{ experienceInfo.nextLevelLabel }}</text>
        </view>
        <text class="title">累计签到{{ countConsecutiveTrueStatus(signs) }}天</text>
        <view class="gift">
          <view class="item" v-for="(item,index) in signs" :key="index">
            <view :class="item.status === true?'special':''">
              <image :src="item.status === true?'./static/images/已签到.png':'/static/images/未签到.png'"/>
            </view>
            <text>第{{ index + 1 }}天</text>
          </view>
        </view>
        <view @click="handleSign" class="button">
          <text v-if="!todayDone">立即签到</text>
          <text v-else>已签到</text>
        </view>
      </m-card>
      <m-card>
        <image style="width: 100%;height: 900px" src="/static/images/等级说明.png"/>
      </m-card>
    </view>
  </view>
</template>

<script>

import {addMall_user_experience, queryUserLevelInfo, queryUserSignInfo} from "@/api/mall/mall_user_experience";

export default {
  data() {
    return {
      experienceInfo: {},
      todayDone: false,
      userInfo: {},
      percentage: 0,
      signs: []
    }
  },
  onLoad() {
    this.userInfo = this.$store.state.user;
    this.getUserLevelInfo()
    queryUserSignInfo().then(re => {
      this.todayDone = re.data.todayDone
      this.signs = re.data.signs
    })
  },
  methods: {
    countConsecutiveTrueStatus(data) {
      let maxConsecutiveTrue = 0;
      let currentConsecutiveTrue = 0;

      for (let i = 0; i < data.length; i++) {
        if (data[i].status === true) {
          currentConsecutiveTrue++;
          maxConsecutiveTrue = Math.max(maxConsecutiveTrue, currentConsecutiveTrue);
        } else {
          currentConsecutiveTrue = 0;
        }
      }
      return maxConsecutiveTrue;
    },
    getUserLevelInfo() {
      queryUserLevelInfo().then(re => {
        this.experienceInfo = re.data
        this.percentage = Math.floor((this.experienceInfo.currentExperienceValue / this.experienceInfo.nextLevelValue) * 100);
        this.percentage = parseInt(this.percentage.toFixed(0));
      })
    },
    handleSign() {
      if (this.todayDone) {
        this.showTip("今日已签到")
      } else {
        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().slice(0, 10);
        for (const item of this.signs) {
          if (item.time === currentDateString) {
            item.status = true;
            addMall_user_experience({value: 20, source: 1}).then(re => {
              this.$nextTick(() => {
                this.getUserLevelInfo()
              })
            })
            this.todayDone = true
            this.showTip("签到成功 成长值 + 10")
          }
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/pages/tab-bar/member-center/index";
</style>