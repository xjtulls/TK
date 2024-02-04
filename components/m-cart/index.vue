<template>
  <view class="common-car">
    <u-navbar :background="{backgroundColor:'#f5f5f5'}" :is-back="false" title="购物车">
      <view @click.native="cut" class="slot-wrap">
        {{ isCut ? '编辑' : '完成' }}
      </view>
    </u-navbar>
    <view class="empty-shop-car" v-if="isEmpty">
      <u-empty src="/static/images/购物车为空.png" text="购物车竟然为空"></u-empty>
    </view>
    <view class="shop-car" v-else>
      <view class="store-box" v-for="(store,storeIndex) in cart" :key="storeIndex">
        <view class="store-header">
          <image src="/static/images/选中.png" v-if="store.checked === 2" class="checked-image" mode=""
                 @tap="storeCheck(storeIndex,store.checked)"></image>
          <image src="/static/images/未选中.png" v-else class="checked-image" mode=""
                 @tap="storeCheck(storeIndex,store.checked)">
          </image>
          <u-icon size="40" style="margin-left: 5%" name="/static/images/店铺.png"></u-icon>
          <text>{{ store.storeName }}</text>
          <image src="/static/images/right-arrow.png" class="label" mode=""></image>
        </view>
        <view class="goodsInfo" v-for="(item,itemIndex) in store.cartItems" :key="itemIndex">
          <image src="/static/images/选中.png" v-if="item.checked === 2" class="checked-image"
                 mode="" @tap="goodsCheck(storeIndex,itemIndex,item.checked)"></image>
          <image src="/static/images/未选中.png" v-else class="checked-image" mode=""
                 @tap="goodsCheck(storeIndex,itemIndex,item.checked)"></image>
          <view class="goodsInfo-right">
            <image :src="item.img" class="goods-image" mode=""></image>
            <view class="goodsInfo-box">
              <text class="goods-name">{{ item.productName }}</text>
              <text class="spe">规格：{{ item.skuName }}</text>
              <view class="goods-box">
                <m-price :size="35" :price="item.price"></m-price>
                <view class="goods-num-box">
                  <u-number-box v-model="item.number" @minus="sub(storeIndex,itemIndex,item.number,item)"
                                @plus="add(storeIndex,itemIndex,item.number,item)" input-width="50"
                                :step="1"></u-number-box>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!--        <view style="height: 50rpx"></view>-->
      </view>
      <view style="height: 100rpx"></view>
      <view class="statistics-box">
        <view class="statistics">
          <view class="statistics-left" v-if="statisticsIndex" @tap="allCheck">
            <image src="/static/images/选中.png" class="checked-image" mode="">
            </image>
            <text>全选</text>
          </view>
          <view class="statistics-left" v-else @tap="allCheck">
            <image src="/static/images/未选中.png" class="checked-image" mode="">
            </image>
            <text>全选</text>
          </view>
          <view class="statistics-right" v-if="isCut">
            <view>总计：</view>
            <m-price :size="40" :price="total"></m-price>
            <u-button @click="checkout" :custom="true">结算</u-button>
          </view>
          <view class="statistics-right" v-else>
            <u-button @click="remove" type="error">删除</u-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "commonCar",
  data() {
    return {
      isEmpty: true,
      iPhoneX: false,
      cart: {},
      statisticsIndex: false,
      total: 0,
      isCut: true
    }
  },
  props: {
    list: {
      type: [Object, Array],
      default: {}
    }
  },
  watch: {
    list(newVal) {
      if (newVal.length === 0) {
        this.isEmpty = true
      } else {
        this.cart = this.list
        this.isEmpty = false
      }
      this.total = 0
      this.statisticsIndex = false
    }
  },
  methods: {
    //商品选择 storeIndex,itemIndex,item.checked
    goodsCheck(storeIndex, itemIndex, itemChecked) {
      if (itemChecked === 1) {
        this.cart[storeIndex].cartItems[itemIndex].checked = 2
      } else {
        this.cart[storeIndex].cartItems[itemIndex].checked = 1
      }
      //判断是否该店铺全选
      let storeChecked = true
      this.cart[storeIndex].cartItems.map((item, index) => {
        if (item.checked === 1) {
          storeChecked = false
        }
      })
      if (storeChecked === false) {
        this.cart[storeIndex].checked = 1
      } else {
        this.cart[storeIndex].checked = 2
      }

      //判断是否全选
      let statisticsIndex = true
      this.cart.find((item, index) => {
        if (item.checked === 1) {
          statisticsIndex = false
        }
      })
      if (statisticsIndex === false) {
        this.statisticsIndex = false
      } else {
        this.statisticsIndex = true
      }
      this.statistics()
    },
    //店铺选择
    storeCheck(storeIndex, storeCheck) {
      if (storeCheck === 1) {
        this.cart[storeIndex].checked = 2
        this.cart[storeIndex].cartItems.find((item, index) => {
          item.checked = 2
        })
      } else {
        this.cart[storeIndex].checked = 1
        this.cart[storeIndex].cartItems.find((item, index) => {
          item.checked = 1
        })
      }
      //判断是否全选
      let statisticsIndex = true
      this.cart.find((item, index) => {
        if (item.checked === 1) {
          statisticsIndex = false
        }
      })
      if (statisticsIndex === false) {
        this.statisticsIndex = false
      } else {
        this.statisticsIndex = true
      }
      this.statistics()
    },
    //减少 storeIndex,itemIndex,item.number
    sub(storeIndex, itemIndex, number, item) {
      console.log("xxxx")
      if (number === 1) {
        return
      } else {
        this.cart[storeIndex].cartItems[itemIndex].number--
        this.$emit('sub', item.cartItemId)
      }
      this.statistics()
    },
    //增加
    add(storeIndex, itemIndex, number, item) {
      this.cart[storeIndex].cartItems[itemIndex].number++
      this.statistics()
      this.$emit('add', item.cartItemId)
    },
    //全选
    allCheck() {
      if (this.statisticsIndex) {
        this.cart.find((store, index) => {
          store.checked = 1
          store.cartItems.find((item, storeIndex) => {
            item.checked = 1
          })
        })
        this.statisticsIndex = false
      } else {
        this.cart.find((store, index) => {
          store.checked = 2
          store.cartItems.find((item, storeIndex) => {
            item.checked = 2
          })
        })
        this.statisticsIndex = true
      }
      this.statistics()
    },
    //统计
    statistics() {
      let total = 0
      this.cart.find((store, index) => {
        store.cartItems.find((item, storeIndex) => {
          if (item.checked === 2) {
            total = total + item.price * item.number
          }
        })
      })
      this.total = total.toFixed(2)
    },
    cut() {
      this.isCut = !this.isCut
      this.statisticsIndex = true
      this.allCheck()
    },
    checkout() {
      let judge = this.judgeSelect()
      if (judge) {
        const filteredItems = this.cart.flatMap(obj =>
            obj.cartItems.filter(item => item.checked === 2)
        );
        // const cartItemIds = filteredItems.map(item => item.cartItemId);
        this.$emit('checkout', filteredItems)
      } else {
        uni.showToast({
          title: '您当前未选择任何商品,结算失败',
          icon: 'none'
        })
      }
    },
    remove() {
      let cartItemIds = []
      let judge = this.judgeSelect()
      if (judge) {
        for (let store of this.cart) {
          if (store.checked === 2) {
            for (let item of store.cartItems) {
              cartItemIds.push(item.cartItemId);
            }
          } else {
            for (let item of store.cartItems) {
              if (item.checked === 2) {
                cartItemIds.push(item.cartItemId);
              }
            }
          }
        }
        const filteredData = this.cart.filter(item => item.checked !== 2);
        filteredData.forEach(item => {
          item.cartItems = item.cartItems.filter(cartItem => cartItem.checked !== 2);
        });
        this.cart = filteredData
        this.$emit('remove', cartItemIds)
        uni.showToast({
          title: '删除成功',
          icon: 'none'
        })
      } else {
        uni.showToast({
          title: '您当前未选择任何商品,删除失败',
          icon: 'none'
        })
      }
      if (this.cart.length === 0) {
        this.isEmpty = true
      }
    },
    judgeSelect() {
      let judge = false
      this.cart.find((item, index) => {
        item.cartItems.find((store, storeIndex) => {
          if (store.checked === 2) {
            judge = true
          }
        })
      })
      return judge
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/components/m-cart/index.scss";
</style>
