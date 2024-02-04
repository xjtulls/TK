<template>
  <view class="user">
    <view class="header">
      <view style="height: 100%;display: flex">
        <view style="margin-top: 15%">
          <u-avatar @click="navigateTo('/pages/tab-bar/mine/avatar/index')" size="120"
                    :src="userInfo.avatar"></u-avatar>
        </view>
        <view style="margin-left: 3%;margin-top: 15%">
          <view class="user-name">
            {{ userInfo.nickName }}
          </view>
          <view style="font-size:25rpx;margin-top:2%;color: rgb(128,116,108)">uid:{{ userInfo.name }}</view>
        </view>
      </view>
    </view>
    <m-card>
      <view style="padding: 30rpx 0;display: flex;justify-content: space-around;text-align: center">
        <view>
          <view>{{ starArticles }}</view>
          <view style="font-size: 25rpx">收藏文章</view>
        </view>
        <view>
          <view>{{ starDoctors }}</view>
          <view style="font-size: 25rpx">关注医生</view>
        </view>
        <view>
          <view>{{ starGoods }}</view>
          <view style="font-size: 25rpx">收藏商品</view>
        </view>
      </view>
    </m-card>
    <m-card label="我的订单">
      <view>
        <view class="order">
          <view class="order-item" @click="navigateTo('/pages/tab-bar/order/index?status=1')">
            <view class="bag">
              <u-icon size="50" name="/static/images/待付款.png"></u-icon>
            </view>
            <view>待付款</view>
          </view>
          <view class="order-item" @click="navigateTo('/pages/tab-bar/order/index?status=3')">
            <view class="bag">
              <u-icon size="50" name="/static/images/待收货.png"></u-icon>
            </view>
            <view>待收货</view>
          </view>
          <view class="order-item" @click="navigateTo('/pages/tab-bar/order/index?status=4')">
            <view class="bag">
              <u-icon size="50" name="/static/images/待评价.png"></u-icon>
            </view>
            <view>已完成</view>
          </view>
          <view @click="navigateTo('/pages/tab-bar/order/index?status=4')" class="order-item">
            <view class="bag">
              <u-icon size="50" name="/static/images/售后.png"></u-icon>
            </view>
            <view>产品追溯</view>
          </view>
        </view>
      </view>
    </m-card>
    <m-card label="服务中心">
      <view>
        <view class="order">
          <view class="order-item" @click="navigateTo('/pages/tab-bar/order/index?status=1')">
            <view class="bag">
              <u-icon size="50" name="/static/images/分享有礼.png"></u-icon>
            </view>
            <view>分享有礼</view>
          </view>
          <view class="order-item" @click="navigateTo('/pages/tab-bar/order/index?status=3')">
            <view class="bag">
              <u-icon size="50" name="/static/images/地址管理.png"></u-icon>
            </view>
            <view>地址管理</view>
          </view>
          <view class="order-item" @click="navigateTo('/pages/tab-bar/cart/index')">
            <view class="bag">
              <u-icon size="50" name="/static/images/购物车.png"></u-icon>
            </view>
            <view>购物车</view>
          </view>
          <view @click="navigateTo('/pages/tab-bar/coupon/index')" class="order-item">
            <view class="bag">
              <u-icon size="50" name="/static/images/优惠券.png"></u-icon>
            </view>
            <view>优惠券</view>
          </view>
        </view>
      </view>
    </m-card>
    <m-card label="联系我们">
      <view>
        <view class="equity">
          <view class="equity-item" @click="navigateTo('/pages/tab-bar/company_contract/index')">
            <view class="bag">
              <u-icon size="50" name="/static/images/厂商入驻.png"></u-icon>
            </view>
            <view>厂商入住</view>
          </view>
          <view class="equity-item" @click="navigateTo('/pages/tab-bar/personal_invoice/index')">
            <view class="bag">
              <u-icon size="50" name="/static/images/个人发票.png"></u-icon>
            </view>
            <view>个人发票</view>
          </view>
          <view class="equity-item" @click="navigateTo('/pages/tab-bar/company_invoice/index')">
            <view class="bag">
              <u-icon size="50" name="/static/images/公司发票.png"></u-icon>
            </view>
            <view>公司发票</view>
          </view>
        </view>
      </view>
    </m-card>
    <view style="display: flex;justify-content: center;margin-top: 5%;padding-bottom: 20%">
      <u-button type="success" @click="hanldeUserUI">切换至客户端登录界面
      </u-button>
    </view>
  </view>
</template>
<script>
import {userTabbar,doctorTabbar} from '@/utils/tabbar.js'

import {getUserProfile} from "@/api/system/user";
import {queryUserLevelInfo} from "@/api/mall/mall_user_experience";
import UButton from "@/uview-ui/components/u-button/u-button.vue";
import {getMall_doctor} from "@/api/mall/mall_doctor";
import {allMall_star_articles} from "@/api/mall/mall_star_article";
import {allMall_star_doctors} from "@/api/mall/mall_star_doctor";
import {allMall_star_products} from "@/api/mall/mall_star_product";

export default {
  components: {UButton},
  data() {
    return {
      current: 3,
      tabBarList: this.$store.state.user.dynamicTabbar,

      experienceInfo: {},
      userInfo: {},
      starDoctors: 0,
      starArticles: 0,
      starGoods: 0
    };
  },
  onShow() {

  },
  mounted() {
    this.userInfo = this.$store.state.user
    queryUserLevelInfo().then(re => {
      this.experienceInfo = re.data
    })
    allMall_star_products({userId: this.$store.state.user.userId}).then(re => {
      this.starGoods = re.data.length
    })
    allMall_star_articles({userId: this.$store.state.user.userId}).then(re => {
      this.starArticles = re.data.length
    })
    allMall_star_doctors({userId: this.$store.state.user.userId}).then(re => {
      this.starDoctors = re.data.length
    })
  },
  methods: {
    hanldeUserUI() {
      uni.switchTab({
        url: "/pages/tab-bar/index",
      })
    },
    navigateTo(url) {
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.member-center {
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 2%;
  padding-bottom: 12%;
  width: 96%;
  margin: 2% 2% 0 2%;
  border-radius: 20rpx;
  background-color: rgb(46, 51, 70);
  height: 110rpx;
  color: rgb(250, 224, 142);

  .look-look {
    text-align: center;
    width: 120rpx;
    font-size: 25rpx;
    margin-left: 5%;
    color: rgb(46, 51, 70)
  }

  .progress {
    font-size: 22rpx;
    margin-top: 10rpx;
    width: 550rpx
  }
}

.look {
  text-align: center;
  width: 120rpx;
  color: white;
  height: 50rpx;
  font-size: 30rpx;
  margin-left: 60%;
  background-image: linear-gradient(45deg, #ff9700, #ed1c24);
  border-radius: 50rpx;
}


.title {
  padding: 3% 0 0 3%;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 3%
}

html,
body {
  overflow: auto;
}

.money {
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.user {
  .header {
    background-color: rgb(245, 249, 252);
    //background: linear-gradient(to right, rgb(251, 243, 232), rgb(253, 238, 217), rgb(248, 223, 182)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    padding: 0 30rpx 0 6%;
    height: 250rpx;
    //background-size: cover;
    border-bottom-left-radius: 30rpx;
    border-bottom-right-radius: 30rpx;
    //background-image: url("@/static/images/main-bg.png");
    //background-position: bottom;
    //background-repeat: no-repeat;
    //color: #ffffff;

    ///deep/ .u-icon,
    //.u-icon {
    //  margin-top: 106rpx;
    //}
  }

  .pointBox {
    width: 94%;
    margin: 2% 3%;
    background: #fff;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 24rpx 0 rgba($color: #f6f6f6, $alpha: 1);
  }

  .point {
    text-align: center;
    height: 160rpx;

    font-size: 24rpx;
    // #ifdef MP-WEIXIN
    padding: 24rpx;

    // #endif
    .u-col {
      view {
        color: $u-main-color;
        font-size: 28rpx;
      }

      view:last-child {
        //font-weight: bold;
        margin-top: 8rpx;
        color: #000000;
        font-size: 25rpx;
      }
    }
  }

  .order {
    height: 140rpx;
    text-align: center;
    font-size: 24rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 3%;
    //font-weight: bold;
    color: black;

    .order-item {
      position: relative;
      line-height: 2em;
      width: 96rpx;

      :first-child {
        font-size: 48rpx;
        margin-bottom: 10rpx;
      }
    }
  }

  .equity {
    height: 140rpx;
    text-align: center;
    font-size: 24rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 3%;
    //font-weight: bold;
    color: black;

    .equity-item {
      //position: relative;
      line-height: 2em;
      width: 120rpx;

      :first-child {
        font-size: 48rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}

.box {
  transform: translateY(-30rpx);
}

.user-name {
  display: flex;
  color: black;
  font-weight: bolder;
  font-size: 40rpx;
}

.bag {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  margin: 0 auto;
}

</style>
