<template>
  <view>
    <u-navbar :is-back="true" :title="chatUserName"></u-navbar>
    <view @tap="getHistoryMsg"/>
    <view @click="hideKeyBoardAndTool" :style="{paddingBottom:paddingBottom+'rpx'}">
      <view v-for="(item,index) in messages" :key="index" :id="`msg-${item.id}`">
        <view class="message flex_col" :class="item.senderId === currentUserId ? 'send':'receive' ">
          <image :src="item.senderId === currentUserId ?currentUserAvatar :chatUserAvatar"
                 mode="aspectFill" class="avatar"></image>
          <view class="content">
            <image v-if="item.type==='image'" @click="previewImage(item.content)" class="content-image" mode="widthFix"
                   :src="item.content"/>
            <video v-else-if="item.type==='video'" class="content-video" :show-progress="false"
                   :src="item.content"/>
            <text v-else> {{ item.content }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view style="display: flex;justify-content: flex-start;margin-top: 1%">
        <input class="input" v-model="content"
               :confirm-hold="true"
               :adjust-position="true"
               :always-embed="true"
               @focus="handleFocus"
               confirm-type="send"
               @confirm="send"
               placeholder="请输入聊天内容"/>
        <u-icon style="padding: 0 20rpx" size="60rpx" name="/static/images/表情.png"/>
        <u-icon @click="handleMore" size="60rpx" name="/static/images/加号.png"/>
      </view>
      <uni-transition :duration="0" :show="showToolBar">
          <view class="tool-bar-wrap">
            <view @click="handleTool(tool.type)" class="tool-item" v-for="(tool,index) in toolList">
              <view>
                <u-icon :name="tool.icon" size="60"></u-icon>
              </view>
              <view> {{ tool.title }}
              </view>
            </view>
          </view>
      </uni-transition >
    </view>
  </view>
</template>

<script>

import UButton from "@/uview-ui/components/u-button/u-button.vue";
import {getCurrentTimeStr} from '@/utils/common';
import UIcon from "@/uview-ui/components/u-icon/u-icon.vue";
import {queryHistoryMessage} from "@/api/mall/im_message";
import UInput from "@/uview-ui/components/u-input/u-input.vue";
import config from '@/config'
import UniTransition from '@/components/uni-transition/uni-transition.vue';

export default {
  components: {UInput, UIcon, UButton,UniTransition},
  onLoad(options) {
    let jb = JSON.parse(options.chatUser)
    this.chatUserId = jb.chatUserId
    this.chatUserName = jb.chatUserName
    this.chatUserAvatar = jb.chatUserAvatar
    this.currentUserId = this.$store.state.user.userId
    this.currentUserAvatar = this.$store.state.user.avatar
    this.$bus.$on('message', msg => {
      let msgObj = JSON.parse(msg)
      if (msgObj.senderId == this.chatUserId) {
        //接收到的消息
        let message = {
          id: new Date().getTime(),
          senderId: this.chatUserId,
          receiverId: this.currentUserId,
          sendTime: msgObj.sendTime,
          content: msgObj.content,
          type: msgObj.type,
          senderAvatar: this.chatUserAvatar,
          receiverAvatar: this.currentUserAvatar,
        }
        this.messages.push(message);
        this.$nextTick(() => {
          uni.pageScrollTo({
            scrollTop: 99999,
            duration: 0
          })
        })
      }
    })
  },
  data() {
    return {
      paddingBottom: 155,
      toolBarHeight: 160,
      showToolBar: false,
      focusStatus: false,
      chatUserId: null,
      chatUserName: null,
      chatUserAvatar: null,
      currentUserId: null,
      currentUserAvatar: null,
      messages: [],
      toolList: [
        {icon: "photo-fill", title: "照片", type: 'image'},
      ],
      queryParam: {
        pageNum: 1,
        pageSize: 20,
      },
      searchFlag: true,
      content: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getHistoryMsg();
    });
  },
  onPageScroll(e) {
    if (e.scrollTop < 5) {
      this.getHistoryMsg();
    }
  },
  methods: {
    previewImage(url) {
      uni.previewImage({
        current: 0,
        urls: [url]
      });
    },
    hideKeyBoardAndTool() {
      this.paddingBottom = 155
      this.showToolBar = false
      uni.hideKeyboard();
    },
    handleFocus() {
      //注意高度
      this.showToolBar = false
      this.paddingBottom = 155
    },
    handleMore() {
      this.showToolBar = !this.showToolBar
      this.paddingBottom = 155
      if (this.showToolBar === true) {
        this.paddingBottom = this.paddingBottom + this.toolBarHeight
        this.showToolBar = true
        this.$nextTick(() => {
          uni.pageScrollTo({
            scrollTop: 99999,
            duration: 0
          })
        })
      }
    },
    send() {
      if (this.content === null) {
        this.showTip('请输入消息内容')
        return
      }
      //发送消息
      this.sendMessage("text", this.content)
    },
    handleTool(type) {
      if (type == 'image') {
        this.chooseImage()
      }
    },
    chooseImage() {
      uni.chooseImage({
        sourceType: ['album', 'camera'],
        sizeType: ['compressed'],
        success: chooseImages => {
          uni.showLoading({
            title: '发送中...'
          });
          this.showToolBar = false;
          this.paddingBottom = 155
          for (let image of chooseImages.tempFilePaths) {
            uni.uploadFile({
              name: "file",
              url: config.baseUrl + '/common/upload/oss/LOCAL',
              filePath: image,
              success: (re) => {
                let res = JSON.parse(re.data)
                this.sendMessage("image", res.url)
              },
              fail: (re) => {
                console.log(re)
              },
              complete: function () {
                uni.hideLoading();
              }
            });
          }
        }
      })
    },
    sendMessage(type, content) {
      let message = {
        id: new Date().getTime(),
        senderId: this.$store.state.user.userId,
        receiverId: this.chatUserId,
        sendTime: getCurrentTimeStr(),
        content: content,
        type: type,
        senderAvatar: this.$store.state.user.avatar,
        receiverAvatar: this.chatUserAvatar,
        senderNickName: this.$store.state.user.nickName,
      }
      uni.sendSocketMessage({
        data: JSON.stringify(message),
        fail: err => {
          this.showTip("发送失败！请您稍后再试")
        },
        success: res => {
          this.messages.push(message);
          this.$nextTick(() => {
            this.content = null;
            uni.pageScrollTo({
              scrollTop: 999999,
              duration: 0
            });
          })
        }
      })
    },
    getHistoryMsg() {
      this.queryParam.chatUserId = this.chatUserId
      if (this.searchFlag === false) {
        return;
      }
      this.searchFlag = false;
      queryHistoryMessage(this.queryParam).then(re => {
        let results = re.rows
        if (results.length > 0) {
          results.reverse()
          let selector = '';
          if (this.queryParam.pageNum > 1) {
            selector = `#msg-${this.messages[0].id}`;
          }
          this.messages = [...results, ...this.messages];
          this.$nextTick(() => {
            if (this.queryParam.pageNum === 1) {
              uni.pageScrollTo({
                scrollTop: 999999,
                duration: 0,
              });
            } else {
              this.setPageScrollTo(selector);
            }
            if (results.length < this.queryParam.pageSize) {
              this.searchFlag = false
            } else {
              this.queryParam.pageNum++
              setTimeout(() => {
                this.searchFlag = true
              }, 1000);
            }
          })
        }
      })
    },
    setPageScrollTo(selector) {
      let view = uni.createSelectorQuery().in(this).select(selector);
      view.boundingClientRect((res) => {
        uni.pageScrollTo({
          scrollTop: res.top - 30,
          duration: 0
        });
      }).exec();
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/pages/tab-bar/chat/index.scss";
</style>