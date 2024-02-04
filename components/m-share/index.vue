<template>
  <!-- 遮罩层 -->
  <u-popup @close="close" v-model="show" mode="bottom" border-radius="30" height="260rpx">

    <view class="share-title">
      <span>分享至</span>
    </view>
    <view class="share-list">
      <!-- #ifdef MP-WEIXIN -->
      <view class="share-item">
        <button class="share-btn" @click="weChatShare" open-type="share">
          <u-icon color="#04BE02" size="80" name="/static/images/微信.png"></u-icon>
          微信好友
        </button>
      </view>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS -->
      <view class="share-item" @click="handleShare(item)" v-for="(item, index) in list" :key="index">
        <u-icon :color="item.color" size="80" :name="item.icon"></u-icon>
        <view>{{ item.title }}</view>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <view class="share-item" @click="copyLink()">
        <u-icon color="#b4aee8" size="80" name="/static/images/分享.png"></u-icon>
        <view>{{ '复制链接' }}</view>
      </view>
      <!-- #endif -->
    </view>
  </u-popup>
</template>
<script>
import {h5Copy} from "@/utils/h5-copy";
import mpShare from "uview-ui/libs/mixin/mpShare.js";
import config from "@/config"

export default {
  mixins: [mpShare],
  data() {
    return {
      shareLink: null, //分享地址，也就是在h5中默认的复制地址
      show: true,
      list: [
        {
          color: "#04BE02",
          title: "微信好友",
          icon: "weixin-fill",
          type: 0,
        },
        {
          color: "#04BE02",
          title: "朋友圈",
          icon: "weixin-circle-fill",
          type: 1,
        },
      ],
    };
  },
  // 图片缩略图、 商品名称 、 type（product,shop,pintuan) 拼团商品分享以及店铺分享
  created() {
    if (this.type === 'product') {
      this.shareLink = config.shareProductLink + this.productId
    }
  },
  props: ["coverImage", "productName", "type", "productId"],
  methods: {
    setClipboard(val) {
      // #ifdef H5
      if (val === null || val === undefined) {
        val = "";
      } else val = val + "";
      const result = h5Copy(val);
      if (result === false) {
        uni.showToast({
          title: "不支持",
        });
      } else {
        uni.showToast({
          title: "复制成功",
          icon: "none",
        });
      }
      // #endif

      // #ifndef H5
      uni.setClipboardData({
        data: val,
        success: function () {
          uni.showToast({
            title: "复制成功!",
            duration: 2000,
            icon: "none",
          });
        },
      });
      // #endif
    },
    close() {
      this.$emit("close");
    },
    weChatShare() {
      this.$u.mpShare = {
        title: this.shareTitle(), // 默认为小程序名称，可自定义
        path: '', // 默认为当前页面路径，一般无需修改，QQ小程序不支持
        // 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
        // 支持PNG及JPG，默认为当前页面的截图
        imageUrl: this.coverImage || ''
      }
    },

    // h5复制链接
    // #ifdef H5
    copyLink() {
      this.setClipboard(this.shareLink)
    },
    // #endif

    shareTitle() {
      let shareTitle;
      if (this.type == "product") {
        shareTitle = `[好友推荐]${this.productName}快来跟我一起看看吧`;
      } else if (this.type == "store") {
        shareTitle = `[好友发现]${this.productName}快来跟我一起看看吧`;
      } else if (this.type == "pintuan") {
        shareTitle = `[好友邀请]${this.productName}快来跟我一起抢购吧!`;
      } else if (this.type == "kanjia") {
        shareTitle = `[好友邀请]请快来帮我砍一刀${this.productName}`;
      }
      return shareTitle;
    },

    // #ifdef APP-PLUS
    handleShare(val) {
      // console.log("12312312")
      if (val.type <= 1) {
        let scene; //  "WXSenceTimeline 朋友圈   WXSceneSession 微信好友"
        val.type == 1
            ? (scene = "WXSenceTimeline")
            : (scene = "WXSceneSession");
        uni.share({
          provider: "weixin",
          scene: scene,
          href: this.shareLink + this.productId,
          imageUrl: this.coverImage,
          type: 0,
          summary: this.productName,
          title: this.shareTitle(),
          success: function (res) {
            uni.showToast({
              title: "分享成功!",
              duration: 2000,
              icon: "none",
            });
            this.$emit("close");
          },
          fail: function (err) {
            uni.showToast({
              title: "分享失败!",
              duration: 2000,
              icon: "none",
            });
            this.$emit("close");
          },
        });
      }
    },
    // #endif
  },
};
</script>
<style lang="scss" scoped>
@import "./mp-share.scss";

.share-title {
  position: relative;
  height: 90rpx;
  font-size: 32rpx;
  line-height: 90rpx;
  text-align: center;

  > .share-close {
    position: absolute;
    right: 0;
    right: 20rpx;
    top: 30rpx;
  }
}

button:after {
  border: none;
}

.share-list {
  padding: 0 32rpx;
  display: flex;
  text-align: center;
  align-items: center;

  > .share-item {
    width: 25%;
    font-size: 24rpx;
    color: #666;

    > * {
      margin: 8rpx 0;
    }
  }
}
</style>