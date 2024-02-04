<template>
  <view>
    <view class="bottom-center-button">
      <view class="content">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.bottom-center-button {
  display: flex;
  justify-content: space-around;
  width: 600rpx;
  line-height: 80rpx;
  position: absolute;
  bottom: 30rpx;
  left: 80rpx;
  background: linear-gradient(to right, #FFA500, #ff6200); /* 从左到右的橙色渐变 */
  border-radius: 60rpx;
  font-size: 30rpx;

  .content {
    display: flex;
    align-items: center;
    color: #ffffff;
  }
}
</style>
