<template>
  <view class="container">
    <u-navbar :is-back="true" title="设置"></u-navbar>
    <m-card>
      <view class="person">
        <u-avatar @click="navigateTo('/pages/tab-bar/mine/avatar/index')" size="100" :src="userInfo.avatar || userImage"
                  mode="circle">
        </u-avatar>
        <view class="user-name">
          {{ userInfo.name }}
        </view>
        <!--        <u-icon color="#ccc" name="arrow-right"></u-icon>-->
      </view>
      <!-- #ifdef MP-WEIXIN -->
      <view style="height: 20rpx; width: 100%"></view>
      <!-- #endif -->
      <u-cell-item :title="`收货地址`" @click="navigateTo('/pages/tab-bar/address/index')"></u-cell-item>
      <u-cell-item :title="`编辑资料`" @click="navigateTo('/pages/tab-bar/mine/info/edit')"></u-cell-item>
      <u-cell-item title="重置密码"
                   @click="navigateTo('/pages/tab-bar/mine/pwd/index')"></u-cell-item>
    </m-card>
    <bottom-center-button @click.native="quiteLoginOut">退出登录</bottom-center-button>
  </view>
</template>

<script>
import UButton from "@/uview-ui/components/u-button/u-button.vue";

export default {
  components: {UButton},
  data() {
    return {
      userImage: "/static/missing-face.png",
      isCertificate: false,
      userInfo: {},
      fileSizeString: "0B",
    };
  },
  onShow() {
    this.userInfo = this.$store.state.user
  },
  methods: {
    navigateTo(url) {
      uni.navigateTo({
        url: url,
      });
    },
    /**
     * 退出登录
     */
    quiteLoginOut() {
      this.$modal.confirm('确定退出？').then(() => {
        uni.closeSocket();
        this.$store.dispatch('LogOut').then(() => {
          uni.navigateBack()
        })
      })
    },
  },

};
</script>

<style lang='scss' scoped>

.person {
  height: 150rpx;
  display: flex;
  padding: 0 20rpx;
  font-size: 28rpx;
  justify-content: space-between;
  align-items: center;
  //margin-bottom: 20rpx;

  .user-name {
    width: 500rpx;
    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;
    margin-left: 30rpx;
    line-height: 2em;
    font-size: 34rpx;
  }
}

.u-cell {
  height: 110rpx;
  /* line-height: 110rpx; */
  padding: 0 20rpx;
  align-items: center;
  color: #333333;
}

/deep/ .u-cell__value {
  color: #cccccc !important;
}

/deep/ .u-cell__right-icon-wrap {
  color: #cccccc !important;
}
</style>
