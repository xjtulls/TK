<template>
  <view class="container">
    <message v-if="current==0"/>
    <goods v-if="current==1"/>
    <cart v-if="current==2"/>
    <me v-if="current==3"/>
    <view style="width:100%;justify-content:space-around;background-color:#FFF;z-index:999;position:fixed; bottom: 0;display: flex">
      <view @click="change(0)" style="width: 180rpx;text-align: center">
        <u-icon :name="first_url" :size="45"></u-icon>
        <view>顾客</view>
      </view>
      <view @click="change(1)" style="width: 180rpx;text-align: center">
        <u-icon :name="second_url" :size="45"></u-icon>
        <view>商城</view>
      </view>
      <view @click="change(2)" style="width: 180rpx;text-align: center">
        <u-icon :name="third_url" :size="45"></u-icon>
        <view>推荐车</view>
      </view>
      <view @click="change(3)" style="width: 180rpx;text-align: center">
        <u-icon :name="fourth_url" :size="45"></u-icon>
        <view>我的</view>
      </view>
    </view>
  </view>
</template>

<script>

import UButton from "@/uview-ui/components/u-button/u-button.vue";
import {userTabbar, doctorTabbar} from '@/utils/tabbar.js'
import Message from "@/pages/tab-bar/doctor_users.vue";
import Goods from "@/pages/tab-bar/doctor_goods.vue";
import Me from "@/pages/tab-bar/doctor_me.vue";
import Cart from "@/pages/tab-bar/doctor_cart.vue";

export default {
  components: {UButton, Message, Goods, Cart, Me},
  data() {
    return {
      current: 0,
      list: doctorTabbar,

      first_url: "/static/images/顾客.png",
      second_url: "/static/images/商城.png",
      third_url: "/static/images/购物车.png",
      fourth_url: "/static/images/我的.png",

    }
  },
  onShow() {
  },
  methods: {
    change(index) {
      this.current = index
      if (index == 0) {
        this.first_url = "/static/images/顾客-选中.png"
        this.second_url = "/static/images/商城.png"
        this.third_url = "/static/images/购物车.png"
        this.fourth_url = "/static/images/我的.png"
      }
      if (index == 1) {
        this.first_url = "/static/images/顾客.png"
        this.second_url = "/static/images/商城-选中.png"
        this.third_url = "/static/images/购物车.png"
        this.fourth_url = "/static/images/我的.png"
      }
      if (index == 2) {
        this.first_url = "/static/images/顾客.png"
        this.second_url = "/static/images/商城.png"
        this.third_url = "/static/images/购物车-选中.png"
        this.fourth_url = "/static/images/我的.png"
      }
      if (index == 3) {
        this.first_url = "/static/images/顾客.png"
        this.second_url = "/static/images/商城.png"
        this.third_url = "/static/images/购物车.png"
        this.fourth_url = "/static/images/我的-选中.png"
      }
    }
  }
}
</script>

<style lang="scss">

page {
  background-color: #f5f5f5;
}

</style>
