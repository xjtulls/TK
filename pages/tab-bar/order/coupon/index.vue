<template>
  <view style="height: 100%;">
    <view class="content-list">
      <m-scroll-y v-if="couponList.length !== 0">
        <view style="padding: 20rpx;">
          <m-coupon @select="chooseCoupon(item)" :is-show-check="true" :status="item.status" @showRule="showRule"
                    v-for="(item, index) in couponList"
                    :key="index"
                    :item="item"/>
        </view>
      </m-scroll-y>
      <view v-else style="height: 700rpx;">
        <u-empty mode="coupon" icon-size="c"></u-empty>
      </view>
    </view>
    <m-coupon-rule ref="couponRule" v-if="couponShowRule" :itemData="itemData" :ruleShow="couponShowRule">
    </m-coupon-rule>
  </view>
</template>

<script>
import MCouponRule from '@/components/m-coupon-rule/index.vue'
import MCoupon from '@/components/m-coupon/index.vue'
import MTabs from '@/components/m-tabs/index.vue'

export default {
  props: {
    couponList: {}
  },
  components: {MCouponRule, MCoupon, MTabs},
  filters: {},
  data() {
    return {
      itemData: {},
      couponShowRule: false,
      background: '#C0191F',
    }
  },
  methods: {
    chooseCoupon(coupon) {
      coupon.checked = !coupon.checked
      this.$emit("choose", coupon)
    },
    showRule(item) {
      this.couponShowRule = true;
      this.itemData = item;
      if (this.$refs.couponRule) {
        this.$refs.couponRule.ruleShowOrClose();
      }
    },
  }
}
</script>