<template>
  <view>
    <view class="cu-modal" style="z-index: 9999999999;" :class="newRuleShow?'show':''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white act-title">
          <view class="content" style="font-size: 18px;
	color: #333333;">使用规则
          </view>
        </view>
        <view class="bg-white" style="padding:20px;text-align: left;">
          <view style="margin-bottom: 20px;">
            <view style="font-size: 14px;
											margin-bottom: 4px;font-weight: bold;">1.订单取消、退款在优惠券有效期内可退回
            </view>
          </view>
          <view v-if="itemData.remark" style="margin-bottom: 20px;">
            <view style="font-size: 14px;
											margin-bottom: 4px;font-weight: bold;">2.使用须知：{{ itemData.remark }}
            </view>
          </view>
        </view>
        <view class="bg-white" style="display: flex;justify-content: center;">
          <view class="ok-i-see" @click='ruleShowOrClose'>我知道了</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 是否显示
    ruleShow: {
      type: Boolean,
      default: false
    },
    itemData: {
      type: Object,
      default: {}
    }

  },
  data() {
    return {
      newRuleShow: this.ruleShow
    }
  },
  methods: {
    ruleShowOrClose() {
      this.newRuleShow = !this.newRuleShow;
    }

  }
}
</script>

<style lang="scss" scoped>
.ok-i-see {
  margin: 0 20px 20px 20px;
  background: rgb(246,207,208);
  opacity: 1;
  width: 670rpx;
  border-radius: 48px;
  text-align: center;
  color: rgb(232,57,37);
  font-size: 32rpx;
  font-weight: bold;
  line-height: 76rpx;
}
</style>
