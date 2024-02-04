<template>
  <view>
    <u-navbar :is-back="true" title="我的订单"></u-navbar>
    <view>
      <u-tabs active-color="#ff6200" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
      <view v-if="orderList.length>0" class="order" v-for="(store, index) in orderList">
        <view class="top">
          <view class="left">
            <u-icon name="/static/images/店铺.png" :size="30" color="rgb(94,94,94)"></u-icon>
            <view class="store">{{ store.storeName }}</view>
            <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
          </view>
          <view class="right">{{ item.orderStatusDesc }}</view>
        </view>
        <view class="item" v-for="(item, itemIndex) in store.orderItems">
          <view class="left">
            <image :src="item.skuImg" mode="aspectFill"></image>
          </view>
          <view class="content">
            <view class="title u-line-2">{{ item.productName }}</view>
            <view class="type">{{ item.skuName }}</view>
          </view>
          <view class="right">
            <m-price :size="25" :price="item.skuPrice"/>
            <view class="number">x{{ item.num }}</view>
          </view>
        </view>
        <view class="total">
          <view>
            实付款:
          </view>
          <m-price :size="30" :price="store.orderSubMoney"/>
        </view>
        <view class="time">下单时间:{{ store.orderTime }}</view>
        <view class="bottom">
          <u-button size="mini" v-if="item.orderStatus===1">去付款</u-button>
          <u-button size="mini" v-if="item.orderStatus===3">查看物流</u-button>
          <u-button size="mini" v-if="item.orderStatus===2">催促配送</u-button>
          <u-button size="mini" v-if="item.orderStatus===3">确认收货</u-button>
          <u-button @click="navigateTo('/pages/tab-bar/service/index?orderId='+store.orderId)" size="mini"
                    v-if="item.orderStatus===4">售后
          </u-button>
          <u-button size="mini" v-if="item.orderStatus===4">评价</u-button>
        </view>
      </view>
      <view style="margin-top: 50%" v-if="orderList.length===0">
        <u-empty src="/static/images/订单为空.png" text="未查询到订单信息"></u-empty>
      </view>
    </view>
  </view>
</template>

<script>
import {queryUserOrder} from "@/api/mall/mall_order";
import UButton from "@/uview-ui/components/u-button/u-button.vue";

export default {
  components: {UButton},
  data() {
    return {
      item: {},
      orderList: [],
      list: [
        {
          name: '待付款',
          orderStatus: 1,
          orderStatusDesc: "等待买家付款"
        },
        {
          name: '待发货',
          orderStatus: 2,
          orderStatusDesc: "等待卖家发货"
        },
        {
          name: '待收货',
          orderStatus: 3,
          orderStatusDesc: "等待买家收货"
        },
        {
          name: '待评价',
          orderStatus: 4,
          orderStatusDesc: "交易成功"
        }
      ],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      dx: 0,
    };
  },
  onLoad(options) {
    this.current = options.status - 1
    this.item = this.list[this.current]
    this.getOrderList();
  },
  computed: {},
  methods: {
    // 页面数据
    getOrderList() {
      this.orderList = []
      queryUserOrder({orderStatus: this.current + 1}).then(re => {
        this.orderList = re.data
      })
    },
    // tab栏切换
    change(index) {
      this.current = index;
      this.item = this.list[this.current]
      this.getOrderList()
    },
  }
};
</script>

<style>
/* #ifndef H5 */
page {
  height: 100%;
  background-color: #f2f2f2;
}

/* #endif */
</style>

<style lang="scss" scoped>
.order {
  width: 710rpx;
  background-color: #ffffff;
  margin: 20rpx auto;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  font-size: 28rpx;

  .top {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      .store {
        margin: 0 10rpx;
        font-size: 32rpx;
        font-weight: bold;
      }
    }

    .right {
      color: #ff6200;
    }
  }

  .item {
    display: flex;
    margin: 20rpx 0 0;

    .left {
      margin-right: 20rpx;

      image {
        width: 150rpx;
        height: 150rpx;
        border-radius: 10rpx;
      }
    }

    .content {
      width: 400rpx;

      .title {
        font-size: 28rpx;
        line-height: 50rpx;
      }

      .type {
        margin: 1% 0 0 0;
        font-size: 24rpx;
        color: $u-tips-color;
      }

      .delivery-time {
        color: #ff6200;
        font-size: 24rpx;
      }
    }

    .right {
      font-weight: bold;
      margin-left: 20rpx;
      //padding-top: 20rpx;
      text-align: right;

      .decimal {
        font-size: 24rpx;
        margin-top: 4rpx;
      }

      .number {
        font-weight: normal;
        margin-top: 20%;
        color: $u-tips-color;
        font-size: 26rpx;
      }
    }
  }

  .total {
    justify-content: flex-end;
    display: flex;
    margin-top: 20rpx;
    text-align: right;
    font-size: 25rpx;
  }

  .time {
    color: $u-tips-color;
    font-size: 24rpx;
  }

  .bottom {
    display: flex;
    //margin-top: 40rpx;
    padding: 0 10rpx;
    justify-content: flex-end;
    align-items: center;

    .btn {
      margin-right: 30rpx;
      line-height: 48rpx;
      width: 160rpx;
      border-radius: 26rpx;
      border: 2rpx solid $u-border-color;
      font-size: 28rpx;
      text-align: center;
      color: black;
    }

    .evaluate {
      color: $u-type-warning-dark;
      border-color: $u-type-warning-dark;
    }
  }
}

.centre {
  text-align: center;
  margin: 200rpx auto;
  font-size: 32rpx;

  image {
    width: 164rpx;
    height: 164rpx;
    border-radius: 50%;
    margin-bottom: 20rpx;
  }

  .tips {
    font-size: 24rpx;
    color: #999999;
    margin-top: 20rpx;
  }

  .btn {
    margin: 80rpx auto;
    width: 200rpx;
    border-radius: 32rpx;
    line-height: 64rpx;
    color: #ffffff;
    font-size: 26rpx;
    background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
  }
}

.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
}

.swiper-box {
  flex: 1;
}

.swiper-item {
  height: 100%;
}
</style>
