<template>
  <view>
    <u-navbar :is-back="true" title="订单信息"></u-navbar>
    <view>
      <m-card>
        <view class="order-content address-section">
          <text class="icon-address"></text>
          <view @click="showAddress=true" class="user">
            <view style="display: flex;align-items: center">
              <view>
                <u-icon size="60" name="/static/images/收货地址.png"></u-icon>
              </view>
              <view style="margin-left: 5%">
                <text class="name">{{ address.receiver }}</text>
                <text class="mobile">{{ address.mobile }}</text>
                <view class="address">{{ address.area }}</view>
                <view class="address">{{ address.address }}</view>
              </view>
              <view style="margin-left: 40%">
                <u-icon size="30" name="arrow-right"></u-icon>
              </view>
            </view>
          </view>
        </view>
      </m-card>
      <m-card>
        <view class="goods-section">
          <view id="store-goods" v-for="(store,index) in this.storeGoods">
            <view class="store-header ">
              <u-icon size="40" style="margin-left: 5%" name="/static/images/店铺.png"></u-icon>
              <text class="name">{{ store.storeName }}</text>
            </view>
            <!-- 商品列表 -->
            <view class="good-item" v-for="(good,goodIndex) in store.goods">
              <image :src="good.img"></image>
              <view class="right">
                <view style="display: flex">
                  <view style="width: 80%;font-size: 30rpx">
                    {{ good.productName }}
                  </view>
                  <view>
                    <m-price color="#000000" :size="30" :price="good.price"/>
                    <view style="text-align: right">x {{ good.number }}</view>
                  </view>
                </view>
                <view class="sku">{{ good.skuName }}</view>
              </view>
            </view>
            <u-cell-group :border="false">
              <u-cell-item @click="toggleMask(index)" title="优惠券" value="请选择优惠券"></u-cell-item>
              <u-cell-item :arrow="false" title="优惠金额">
                <template v-slot:right-icon>
                  <m-price :minus="true" :size="30" :price=" discountMoney(store)"/>
                </template>
              </u-cell-item>
              <u-cell-item :arrow="false" title="合计">
                <template v-slot:right-icon>
                  <m-price :size="30" :price=" calculateSingleStore(store)"/>
                </template>
              </u-cell-item>
              <u-cell-item :arrow="false" title="运费" value="免运费"></u-cell-item>
            </u-cell-group>
            <u-row gutter="16">
              <u-col span="12">
                <view style="padding: 20rpx 28rpx;text-align: left;color: #606266 ">备注
                  <u-input :height="100" type="textarea" v-model="store.remark" placeholder="请输入备注"/>
                </view>
              </u-col>
            </u-row>
          </view>
        </view>
      </m-card>
      <!--      支付选项-->
      <m-card>
        <m-cashiier @select="handlePayWay"/>
      </m-card>
      <!-- 底部 -->
      <view class="footer">
        <view style="display: flex;padding-left: 30upx;">
          <view style="font-weight: bold">合计</view>
          <m-price :size="40" :price="calculateMultiStore(this.storeGoods)"/>
        </view>
        <u-button @click="submit" custom>提交订单</u-button>
      </view>
      <!-- 优惠券面板 -->
      <u-popup v-model="showCoupon" mode="bottom" border-radius="14">
        <coupon-select :coupon-list="couponList" @choose="chooseCoupon"/>
      </u-popup>
      <u-popup v-model="showAddress" mode="bottom" border-radius="14">
        <m-address @choose="chooseAddress"/>
      </u-popup>
    </view>
  </view>
</template>

<script>
import UPopup from "@/uview-ui/components/u-popup/u-popup.vue";
import MAddress from "@/pages/tab-bar/order/address/index.vue";
import CouponSelect from "@/pages/tab-bar/order/coupon/index.vue";
import MCashiier from "@/components/m-cashier/index.vue";

import {getUserProfile} from "@/api/system/user";
import {allAddresss} from "@/api/mall/mall_address";
import {queryCanUseCoupon} from "@/api/mall/mall_coupon";
import {addMall_order} from "@/api/mall/mall_order";

export default {
  components: {UPopup, MAddress, CouponSelect, MCashiier},
  data() {
    return {
      totalMoney: 0,
      payWay: null,
      user: null,
      showAddress: false,
      showCoupon: false,
      currentStoreIndex: null,
      storeGoods: [],
      address: {},
      couponList: [],
      allCoupons: [],
    }
  },
  onLoad(option) {
    let storeIds = []
    let buyInfo = JSON.parse(option.orderInfo);
    for (const item of buyInfo) {
      storeIds.push(item.storeId)
      const storeName = item.storeName;
      let group = this.storeGoods.find(group => group.storeName === storeName);
      if (!group) {
        group = {
          storeName: storeName,
          storeId: item.storeId,
          goods: []
        };
        this.storeGoods.push(group);
      }
      group.goods.push(item);
    }
    storeIds = [...new Set(storeIds)];
    //查询所有店铺下的优惠券
    queryCanUseCoupon({storeIds: storeIds.join(",")}).then(re => {
      this.allCoupons = re.data
    })
    getUserProfile().then(response => {
      this.user = response.data
      allAddresss({createBy: this.user.userId}).then(re => {
        this.address = re.data.find(obj => obj.defaultAddress === true);
      })
    })
  },
  methods: {
    handlePayWay(e) {
      this.payWay = e
    },
    //显示优惠券面板
    toggleMask(storeIndex) {
      this.currentStoreIndex = storeIndex
      this.couponList = this.allCoupons[storeIndex]
      this.showCoupon = true
    },
    chooseCoupon(e) {
      if (e.checked === false) {
        this.storeGoods[this.currentStoreIndex].coupon = 0
        this.storeGoods[this.currentStoreIndex].couponId = null

      } else {
        //打折
        if (e.type == 1) {
          this.storeGoods[this.currentStoreIndex].coupon = (this.calculateSingleStoreNoDiscount(this.storeGoods[this.currentStoreIndex]) * parseFloat((e.value / 10).toFixed(2))).toFixed(2)
        } else {
          this.storeGoods[this.currentStoreIndex].coupon = parseFloat(e.value)
        }
        this.storeGoods[this.currentStoreIndex].couponId = e.couponId
      }
      if (e.checked !== false) {
        this.allCoupons[this.currentStoreIndex].forEach(item => {
          if (item !== e) {
            item.checked = false;
          }
        });
      }
      this.showCoupon = false
    },
    chooseAddress(e) {
      this.showAddress = false
      this.address = e
    },
    calculateSingleStoreNoDiscount(store) {
      let totalAmount = 0
      for (const goodsItem of store.goods) {
        // 解析价格和数量为浮点数
        const price = parseFloat(goodsItem.price);
        const number = parseFloat(goodsItem.number);
        // 计算每个商品的总金额并累加到总金额中
        const itemTotal = price * number;
        totalAmount += itemTotal;
      }
      totalAmount = totalAmount.toFixed(2);
      return totalAmount
    },
    discountMoney(store) {
      let discountMoney = 0
      if (store.coupon != null) {
        discountMoney = discountMoney + parseFloat(store.coupon)
      }
      return discountMoney.toFixed(2)
    },
    calculateSingleStore(store) {
      let totalAmount = 0
      for (const goodsItem of store.goods) {
        // 解析价格和数量为浮点数
        const price = parseFloat(goodsItem.price);
        const number = parseFloat(goodsItem.number);
        // 计算每个商品的总金额并累加到总金额中
        const itemTotal = price * number;
        totalAmount += itemTotal;
      }
      if (store.coupon != null) {
        totalAmount = totalAmount - store.coupon
      }
      totalAmount = totalAmount.toFixed(2);
      store.orderSubMoney = totalAmount
      return totalAmount
    },
    calculateMultiStore(stores) {
      let total = 0
      for (const store of stores) {
        total = total + parseFloat(this.calculateSingleStore(store))
      }
      this.totalMoney = total.toFixed(2)
      return total.toFixed(2)
    },
    submit() {
      if (this.payWay === null) {
        this.showTip('请选择支付方式！')
        return
      }
      this.showTip('订单创建成功！')
      let orderSource = null
      // #ifdef H5
      orderSource = 1
      // #endif
      // #ifdef MP-WEIXIN
      orderSource = 2
      // #endif
      addMall_order({
        orderType: 1,
        orderSource: orderSource,
        money: this.totalMoney,
        addressId: this.address.id,
        stores: this.storeGoods
      }).then(re => {
        uni.switchTab({url: "/pages/tab-bar/cart"})
      })
    },
    stopPrevent() {
    }
  }
}
</script>

<style lang="scss">

.address-section {
  padding: 15upx 0;
  background: #fff;
  position: relative;

  .order-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .icon-address {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90upx;
    color: #888;
    font-size: 44upx;
  }

  .user {
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 28upx;
    color: #303133;
  }

  .name {
    font-weight: bold;
    font-size: 34upx;
    margin-right: 24upx;
  }

  .mobile {
    font-weight: bold;
    font-size: 34upx;
    margin-right: 24upx;
  }

  .address {
    margin-top: 16upx;
    margin-right: 20upx;
    color: #909399;
  }

  .icon-you {
    font-size: 32upx;
    color: #909399;
    margin-right: 30upx;
  }

  .line-image {
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 5upx;
  }
}

.goods-section {
  margin-top: 16upx;
  background: #fff;
  padding-bottom: 1px;

  .store-header {
    display: flex;
    align-items: center;
    height: 84upx;
    padding: 0 0;
    position: relative;
  }

  .name {
    font-weight: bold;
    font-size: 30upx;
    color: #606266;
    margin-left: 24upx;
  }

  .good-item {
    display: flex;
    margin: 20upx 30upx;

    image {
      flex-shrink: 0;
      display: block;
      width: 140upx;
      height: 140upx;
      border-radius: 4upx;
    }

    .right {
      flex: 1;
      padding-left: 24upx;
      overflow: hidden;
    }

    .sku {
      font-size: 26upx;
      color: #909399;
    }
  }
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90upx;
  justify-content: space-between;
  font-size: 30upx;
  background-color: #fff;
  color: #606266;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);
}
</style>