<template>
  <view>
    <u-navbar :is-back="true" title="评论列表"></u-navbar>
    <m-comment :comments="comments" @send="send" v-model="commentText" @lower="lower"/>
  </view>
</template>

<script>
import MComment from '@/components/m-comment/index.vue';
import {getCurrentTimeStr} from '@/utils/common'
import {addMall_comment, queryProductComments} from "@/api/mall/mall_comment";

export default {
  components: {
    MComment
  },
  data() {
    return {
      productId: null,
      comments: [],
      commentText: null
    };
  },
  onLoad(options) {
    this.productId = options.productId;
    queryProductComments({productId: this.productId}).then(res => {
      this.comments = res.data
    })
  },
  methods: {
    // 发送消息
    send(type, index, item, rootId) {
      if (type === 'SEND') {
        let comment = {
          id: this.generateUUID(),
          fromUserId: this.$store.state.user.userId,
          fromAvatar: this.$store.state.user.avatar,
          fromNickName: this.$store.state.user.nickName,
          content: this.commentText,
          createTime: getCurrentTimeStr(),
          children: [],
          productId: this.productId,
          rootId: null,
        }
        this.comments.push(comment);
        addMall_comment(comment).then(re => {
          console.log(re)
        })
      } else {
        let comment = {
          id: this.generateUUID(),
          fromUserId: this.$store.state.user.userId,
          fromAvatar: this.$store.state.user.avatar,
          fromNickName: this.$store.state.user.nickName,
          content: this.commentText,
          createTime: getCurrentTimeStr(),
          toNickName: item.fromNickName,
          toUserId: item.fromUserId,
          rootId: rootId,
          productId: this.productId,
          children: []
        }
        this.comments[index].children.push(comment);
        addMall_comment(comment).then(re => {
          console.log(re)
        })
      }
      this.commentText = null
    },
    generateUUID(len, binary) {
      len = !len ? 36 : len;
      binary = !binary ? 16 : binary;
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * binary | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(binary);
      }).substring(0, len)

    },
    lower() {
      this.showTip("到底啦");
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
