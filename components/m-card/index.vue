<template>
  <view class="my-card">
    <view v-if="label!=null" class="label">{{ label }}</view>
    <slot>
    </slot>
  </view>
</template>

<script>
export default {
  props: {
    label: {
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  padding-top: 3%;
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  color: #333333;
  line-height: 44rpx;
  margin-bottom: 22rpx;
}

.my-card {
  padding: 0 2%;
  width: 96%;
  margin: 2% 2% 0 2%;
  background-color: white;
  border-radius: 20rpx;
}
</style>
