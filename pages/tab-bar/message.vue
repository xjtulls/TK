<template>
  <view>
    <u-navbar :is-back="false" title="消息列表"></u-navbar>
    <u-empty v-if="chatUsers.length==0" src="/static/images/消息列表为空.png" text="暂无消息"></u-empty>
    <m-card v-else label="消息列表">
      <u-swipe-action :index="index"
                      v-for="(item, index) in chatUsers" :key="item.chatUserId"
                      @click="click(item)"
                      :options="options"
      >
        <view @click="handleChat(item)" style="display: flex;margin-bottom: 2%">
          <view style="border-radius:50rpx;">
            <u-avatar size="120" :src="item.chatUserAvatar"></u-avatar>
          </view>
          <view style="width: 100%">
            <view style="display: flex">
              <view class="store-name">{{ item.chatUserName }}</view>
              <view class="time"> {{ formatDateTime(item.lastMessageTime) }}</view>
            </view>
            <view class="last-message">
              {{ item.lastMessage }}
            </view>
          </view>
        </view>
      </u-swipe-action>
    </m-card>
    <u-tabbar
        v-model="current"
        :list="tabBarList"/>
  </view>
</template>

<script>

import UButton from "@/uview-ui/components/u-button/u-button.vue";
import config from '@/config'
import {queryChatUserMessage} from "@/api/mall/im_message";

export default {
  onLoad() {
    this.$bus.$on('message', msg => {
      let msgObj = JSON.parse(msg)
      let chatUser = this.chatUsers.find(obj => obj.chatUserId == msgObj.senderId)
      let lastMessage = ""
      if (msgObj.type == 'text') {
        lastMessage = msgObj.content
      }
      if (msgObj.type == 'image') {
        lastMessage = '[图片]'
      }
      if (msgObj.type == 'video') {
        lastMessage = '[视频]'
      }
      if (chatUser == null) {
        this.chatUsers.push({
          chatUserAvatar: msgObj.senderAvatar,
          chatUserId: msgObj.senderId,
          chatUserName: msgObj.senderNickName,
          lastMessage: lastMessage,
          lastMessageTime: msgObj.sendTime,
          chatting: false,
        })
      } else {
        chatUser.lastMessage = lastMessage
        chatUser.lastTime = msgObj.sendTime
        chatUser.chatting = false
      }
    })
  },
  data() {
    return {
      current: 2,
      tabBarList: this.$store.state.user.dynamicTabbar,

      baseUrl: config.baseUrl,
      chatUsers: [],
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ]
    }
  },
  components: {
    UButton
  },
  onShow() {
    queryChatUserMessage().then(re => {
      this.chatUsers = re.data
    })
  },
  methods: {
    formatDateTime(dateTimeString) {
      const inputDate = new Date(dateTimeString);
      const currentDate = new Date();
      const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];
      if (inputDate.toDateString() === currentDate.toDateString()) {
        // 如果是今天
        return `${inputDate.getHours().toString().padStart(2, "0")}:${inputDate.getMinutes().toString().padStart(2, "0")}`;
      } else if (this.isYesterday(inputDate, currentDate)) {
        // 如果是昨天
        return `昨天 ${inputDate.getHours().toString().padStart(2, "0")}:${inputDate.getMinutes().toString().padStart(2, "0")}`;
      } else if (inputDate.getFullYear() === currentDate.getFullYear() && this.getWeek(inputDate) === this.getWeek(currentDate)) {
        // 如果是本周内的某一天
        return `星期${daysOfWeek[inputDate.getDay()]}`;
      } else {
        // 如果不是今天、昨天，也不是本周内的某一天
        const year = inputDate.getFullYear().toString().substr(-2); // 获取年份的最后两位
        const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
        const day = inputDate.getDate().toString().padStart(2, "0");
        return `${year}/${month}/${day}`;
      }
    },
    getWeek(date) {
      const currentDate = new Date(date);
      currentDate.setHours(0, 0, 0, 0);
      currentDate.setDate(currentDate.getDate() + 4 - (currentDate.getDay() || 7));
      const yearStart = new Date(currentDate.getFullYear(), 0, 1);
      const weekNumber = Math.ceil((((currentDate - yearStart) / 86400000) + 1) / 7);
      return weekNumber;
    },
    isYesterday(inputDate, currentDate) {
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
      const yesterday = new Date(currentDate - oneDayInMilliseconds);
      return inputDate.toDateString() === yesterday.toDateString();
    },
    handleChat(item) {
      this.$tab.navigateTo('/pages/tab-bar/chat/index?chatUser='
          + JSON.stringify({
            chatUserId: item.chatUserId,
            chatUserName: item.chatUserName,
            chatUserAvatar: item.chatUserAvatar
          }))
    },
    click(item) {
      this.$modal.confirm('确认删除？').then(() => {
        this.chatUsers.splice(this.chatUsers.indexOf(item), 1)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.store-name {
  margin-top: 2%;
  width: 250rpx;
  font-size: 35rpx;
  margin-left: 5%;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}

.time {
  width: 250rpx;
  color: #d3d2d2;
  text-align: right;
  margin-left: 5%;
  font-size: 25rpx;
}

.last-message {
  margin-left: 5%;
  margin-top: 15rpx;
  font-size: 30rpx;
  width: 500rpx;
  color: #d3d2d2;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}

</style>
