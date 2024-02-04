<template>
  <view class="navigation">
    <view class="left">
      <view @click="goToChat" class="item">
        <u-icon name="chat" :size="40" :color="$u.color['contentColor']"></u-icon>
        <view class="text u-line-1">客服</view>
      </view>
      <view @click="navigateTo('/pages/tab-bar/cart/index')" class="item car">
        <u-badge class="car-num" :count="count" type="error" :offset="[-3, -6]"></u-badge>
        <u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
        <view class="text u-line-1">购物车</view>
      </view>
      <view @click="star" class="item">
        <u-icon name="star" :size="40" :color="$u.color['contentColor']"></u-icon>
        <view class="text u-line-1">收藏</view>
      </view>
    </view>
    <view class="right">
      <view @click="addCart" class="cart btn u-line-1">加入购物车</view>
      <view @click="buyNow" class="buy btn u-line-1">立即购买</view>
    </view>
  </view>
</template>

<script>
import {countCartItemNum} from "@/api/mall/mall_cart_item";

export default {
  data() {
    return {
      count: 0
    }
  },
  created() {
    countCartItemNum().then(re => {
      this.count = re.data
    })
  },
  methods: {
    refreshCount() {
      countCartItemNum().then(re => {
        this.count = re.data
      })
    },
    goToIndex() {
      //返回首页
      uni.switchTab({
        url: '/pages/tab-bar/index'
      });
    },
    goToChat() {
      this.$emit('chat')
    },
    star(){
      this.$emit('star')
    },
    goToCart() {
      //返回首页
      uni.switchTab({
        url: '/pages/tab-bar/cart'
      });
    },
    addCart() {
      this.$emit('addCart')
    },
    buyNow() {
      this.$emit('buyNow')

    }
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  padding: 20rpx 0;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  border: solid 2rpx #f2f2f2;
  background-color: #ffffff;

  .left {
    display: flex;
    font-size: 20rpx;

    .item {
      margin: 0 30rpx;

      &.car {
        text-align: center;
        position: relative;

        .car-num {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
        }
      }
    }
  }

  .right {
    margin-left: 4%;
    display: flex;
    font-size: 28rpx;
    align-items: center;

    .btn {
      //border-radius: 36rpx;
    }

    .cart {
      padding: 0 30rpx;
      color: #ffffff;
      line-height: 66rpx;
      border-top-left-radius: 36rpx;
      border-bottom-left-radius: 36rpx;
      background: linear-gradient(to right, #ffd01e, #ff8917); /* 从左到右的橙色渐变 */
      //margin-right: 30rpx;
    }

    .buy {
      padding: 0 30rpx;
      color: #ffffff;
      line-height: 66rpx;
      border-top-right-radius: 36rpx;
      border-bottom-right-radius: 36rpx;
      background: linear-gradient(to right, #ff6034, #ee0a24);
      margin-right: 0;
    }
  }
}
</style>
