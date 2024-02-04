<template>
  <view class="shop-cart">
    <m-cart :list="cart" @add="add" @remove="remove" @sub="sub" @checkout="accounts">
    </m-cart>
  </view>
</template>

<script>
import MCart from '@/components/m-cart/index.vue'
import {decrease, delCartItem, getCart, increase} from "@/api/mall/mall_cart";

export default {
  data() {
    return {
      current: 2,
      tabBarList: this.$store.state.user.dynamicTabbar,

      cart: [],
    }
  },
  components: {
    MCart
  },
  mounted() {
    getCart().then(re => {
      this.cart = re.data
    })
    uni.pageScrollTo({
      scrollTop: 10,
      duration: 0,
    });
  },
  methods: {
    add(cartItemId) {
      increase(cartItemId)
    },
    sub(cartItemId) {
      decrease(cartItemId)
    },
    remove(cartItemIds) {
      delCartItem(cartItemIds)
    },
    accounts(e) {
      this.navigateTo("/pages/tab-bar/order/create_order?orderInfo=" + JSON.stringify(e))
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-cart {
  width: 750rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F5F5F5;
}
</style>
