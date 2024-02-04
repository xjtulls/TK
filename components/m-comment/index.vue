<template>
  <view class="comment">
    <u-empty src="/static/images/暂无评论.png" v-if="comments.length == 0" text="暂无评论，快来抢沙发吧"></u-empty>
    <scroll-view scroll-y="true" style="height: 90%;padding-bottom: 100rpx" @scrolltolower="lower">
      <m-card class="comment-item-main" v-for="(item, index) in comments">
        <view class="comment-item">
          <view class="left">
            <image :src="item.fromAvatar" class="img"></image>
          </view>
          <view class="content">
            <view class="title-name">{{ item.fromNickName }}</view>
            <view class="content-text">
              <text>{{ item.content }}</text>
            </view>
            <view class="content-btm">
              <text>{{ formatDateTime(item.createTime) }}</text>
              <text style="display: inline-block;margin-left: 5%" @click.stop="replyComment(item,index,item.id)">回复
              </text>
            </view>
          </view>
        </view>
        <view v-if="showReplyList.indexOf(item.id) !== -1">
          <view class="comment-item items" v-for="reply in item.children">
            <view class="left">
              <image :src="reply.fromAvatar" class="img"></image>
            </view>
            <view class="content">
              <view class="title-name">
                <view>{{ reply.fromNickName }}</view>
                <view>回复</view>
                <view v-if="reply.toNickName">{{ reply.toNickName }}</view>
              </view>
              <view class="content-text">
                <text style="font-weight: normal">{{ reply.content }}</text>
              </view>
              <view class="content-btm">
                <text>{{ formatDateTime(reply.createTime) }}</text>
                <text style="display: inline-block;margin-left: 5%" @click.stop="replyComment(reply,index,item.id)">
                  回复
                </text>
              </view>
            </view>
          </view>
        </view>
        <view class="spread" v-if="item.children.length > 0" @click="isShowReply(item.id, index)">
          <text>{{ showReplyList.indexOf(item.id) !== -1 ? '收起' : '展开' + item.children.length + '条回复' }}</text>
          <text :class="showReplyList.indexOf(item.id) !== -1 ? 'up' : 'down'"></text>
        </view>
      </m-card>
    </scroll-view>
    <view class="comment-btm">
      <input :adjust-position="true"
             :always-embed="true" type="text" :placeholder="placeholder" :focus="focus" :value="value" @input="input"/>
      <button type="primary" @click="send()">发送</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'comment',
  props: {
    comments: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: null
  },
  data() {
    return {
      type: "SEND",
      index: null,
      rootId: null,
      showReplyList: [],
      placeholder: '发条评论吧~',
      focus: false,
      comment: null,
    };
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
    // 展开、收起
    isShowReply(id, index) {
      if (this.showReplyList.indexOf(id) == -1) {
        this.showReplyList.push(id);
      } else {
        let index = this.showReplyList.indexOf(id);
        this.showReplyList.splice(index, 1);
      }
    },
    // 点赞
    commentLike(item) {
      this.$emit('comment-like', item.id);
    },
    hideKeyBoard() {
      uni.hideKeyboard();
      this.comment = null
      this.index = null
      this.placeholder = '发条评论吧'
      this.focus = false
    },
    // 回复评论
    replyComment(item, index, rootId) {
      this.rootId = rootId
      this.type = 'REPLY'
      this.index = index
      this.comment = item
      this.focus = true;
      this.placeholder = '回复@' + item.fromNickName;
    },
    // 发送评论
    send() {
      if (this.value == null) {
        this.showTip("请输入评论内容")
        return
      }
      this.$emit('send', this.type, this.index, this.comment, this.rootId);
      this.type = 'SEND'
      this.comment = null
      this.index = null
      this.rootId = null
      this.placeholder = '发条评论吧'
    },
    input(event) {
      this.$emit('input', event.target.value);
    },
    lower() {
      this.$emit('lower');
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  padding-top: 1%;
  height: 100%;
  width: 100%;
  //background-color: #fff;
  //overflow: scroll;
}

.comment-item-main {
  margin-bottom: 20rpx;
  padding: 5% 0 3% 0;

  .comment-item {
    display: flex;
    padding: 0 20rpx;

    .left {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      overflow: hidden;

      .img {
        width: 80rpx;
        height: 80rpx;
      }
    }

    .content {
      flex: 1;
      margin: 0 20rpx;

      .title-name {
        font-size: 30rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #bbbbbb;
        /* display: inline-block; */
        view {
          max-width: 150rpx;
          margin-right: 10rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .content-text {
        font-weight: bold;
        /* width: 480rpx; */
        font-size: 16px;
        margin: 20rpx 0;
      }

      .content-btm {
        color: #bbbbbb;
        margin-bottom: 20rpx;

        .btm-back {
          margin-left: 40rpx;
          //font-size: 16px;
        }
      }
    }

    .right {
      height: 70rpx;
    }
  }

  .spread {
    color: #bbbbbb;
    margin-left: 80rpx;
    height: 17px;
    position: relative;

    .down {
      width: 0;
      height: 0;
      position: absolute;
      margin-left: 5px;
      top: 7px;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-top: 8px solid #bbbbbb;
    }

    .up {
      width: 0;
      height: 0;
      position: absolute;
      margin-left: 5px;
      bottom: 4px;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
      border-bottom: 8px solid #bbbbbb;
      border-top: 8px solid transparent;
    }
  }
}

.items {
  margin-left: 80rpx;
}

.comment-btm {
  height: 100rpx;
  width: 100%;
  left: 0;
  right: 0;
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 2rpx solid #e0e0e0;

  input {
    height: 80rpx;
    width: 550rpx;
    border-radius: 20rpx;
    background-color: #f3f3f3;
    margin-left: 20rpx;
    margin-top: 10rpx;
    padding: 10rpx;
  }

  button {
    border-radius: 20%;
    line-height: 80rpx;
    height: 80rpx;
    margin-top: 10rpx;
  }
}
</style>
