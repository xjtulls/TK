<template>
  <view>
    <scroll-view scroll-y="true" show-scrollbar='true' class="scroll-list-y">
      <slot></slot>
    </scroll-view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.scroll-list-y {
  white-space: nowrap;
  height: 700rpx;
  width: 100%;
  text-align: right;
}
</style>
