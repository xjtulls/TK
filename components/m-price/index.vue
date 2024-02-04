<template>
  <view>
    <view class="amount" :style="{fontSize:size+'rpx',color:color}">
      <text class="currency" :style="{fontSize:(size-6)+'rpx',color:color}">
        <text v-if="minus">-</text>
        ￥
      </text>
      {{ price }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    price: {},
    minus: {
      default: false,
    },
    size: {
      default: 30
    },
    color: {
      default: '#FF5000'
    }
  }
};
</script>

<style lang="scss" scoped>
.amount {
  font-weight: bold; /* 设置金额数字的字体粗细 */
  color: #FF5000; /* 设置金额数字的文本颜色 */
  font-family: Arial, sans-serif; /* 设置金额数字的字体样式 */
  display: inline; /* 使金额在同一行内显示 */
}

.currency {
  color: #FF5000; /* 设置"￥"符号的文本颜色 */
  display: inline; /* 使"￥"符号在同一行内显示 */
  vertical-align: middle; /* 垂直居中对齐，确保"￥"符号和金额数字水平对齐 */
  margin-right: 0px; /* 添加一些右边距，以分隔"￥"符号和金额数字 */
}


</style>
