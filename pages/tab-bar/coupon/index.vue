<template>
  <view style="height: 100%;">
    <u-navbar :placeholder="true" title="优惠券" :titleStyle="{color:'#ffffff'}" :bgColor="background" :border="false">
      <view slot="left">
      </view>
    </u-navbar>

    <m-tabs v-model="current" :scroll="false" :tabs="tabs" @change="changeTab" activeColor="#ff6200"
            lineColor="#ff6200">
    </m-tabs>
    <u-empty v-if="couponList.length==0" src="/static/images/优惠券为空.png" text="没有更多了"></u-empty>
    <view v-else class="content-list">
      <view style="padding: 20rpx;">
        <m-coupon @couponClick="handleClick" :status="item.status" @showRule="showRule"
                  v-for="(item, index) in couponList"
                  :key="index"
                  :item="item"/>
      </view>
      <view style="height: 80vh;" class="x-c" v-if="couponList.length === 0">
        <u-empty text="暂无数据" icon-size="40"></u-empty>
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
import {queryReceiveCoupon, queryUnReceivedCoupon} from "@/api/mall/mall_coupon";
import {addMall_coupon_receive, queryReceiveCouponByStatus} from "@/api/mall/mall_coupon_receive";

export default {
  components: {MCouponRule, MCoupon, MTabs},
  onShow() {
    queryReceiveCouponByStatus({status: this.current}).then(re => {
      this.couponList = re.data
    })
  },
  filters: {},
  data() {
    return {
      itemData: {},
      couponShowRule: false,
      couponList: [],
      searchQuery: {
        type: 0, // 0未使用 1已使用 2 已失效
      },
      current: 0,
      tabs: ['未使用', '已使用', '已失效', '待领取'],
      background: '#C0191F',

    }
  },
  methods: {
    handleClick(e) {
      //未使用
      if (e.status === 0) {

      }
      //待领取
      if (e.status === 3) {
        addMall_coupon_receive(e).then(re => {
          uni.showToast({
            title: '领取成功',
            icon: 'none'
          })
          this.couponList.splice(this.couponList.indexOf(e), 1)
        })
      }
    },
    showRule(item) {
      let that = this;
      this.couponShowRule = true;
      this.itemData = item;
      if (that.$refs.couponRule) {
        that.$refs.couponRule.ruleShowOrClose();
      }
    },
    changeTab(index) {
      this.current = index;
      if (this.current === 3) {
        queryUnReceivedCoupon().then(re => {
          this.couponList = re.data
        })
      } else {
        queryReceiveCouponByStatus({status: index}).then(re => {
          this.couponList = re.data
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
