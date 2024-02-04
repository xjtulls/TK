<template>
  <view class="user">
    <u-navbar :is-back="false" title="健十商城"></u-navbar>
    <u-search :show-action="false"
              bg-color="#FFFFFF"
              border-color="#ff7900"
              @search="handleQuery"
              style="padding:5% 2% 0 2%;" shape="round"
              placeholder="科普"
              v-model="queryParam.productName"/>
    <u-notice-bar mode="horizontal" :list="notices"></u-notice-bar>
    <m-card>
      <u-swiper :list="images"></u-swiper>
    </m-card>
    <m-card label="产品追溯">
      <image style="width: 100%;height: 200rpx" @click="navigateTo('/pages/tab-bar/order/index?status=4')"
             src="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E4%BA%A7%E5%93%81%E8%BF%BD%E6%BA%AF.jpg"/>
    </m-card>
    <m-card label="热门话题">
      <view style="background-color: rgb(246,249,254);border-radius: 10%">
        <view style="margin-left: 2%;padding-top:5%;font-size: 35rpx;font-weight: bold">这样吃安全又健康</view>
        <view style="color: #999;margin-left: 5%;padding-bottom: 5%">
          <view style="margin-top: 3%">这样吃安全又健康</view>
          <view style="margin-top: 3%">这样吃安全又健康</view>
          <view style="margin-top: 3%">这样吃安全又健康</view>
        </view>
      </view>
    </m-card>
    <m-card>
      <view class="order" style="flex-wrap: wrap;justify-content: flex-start;margin-top: 3%">
        <view style="width: 20%" @click="switchTab" class="order-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E6%85%A2%E7%97%85%E7%B1%BB.png"></u-icon>
          </view>
          <view>慢病类</view>
        </view>
        <view style="width: 20%" @click="switchTab" class="order-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E4%BA%9A%E5%81%A5%E5%BA%B7.png"></u-icon>
          </view>
          <view>亚健康</view>
        </view>
        <view style="width: 20%" @click="switchTab" class="order-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E8%83%9A%E8%83%8E%E6%9C%9F.png"></u-icon>
          </view>
          <view>围产期</view>
        </view>
        <view style="width: 20%" @click="switchTab" class="order-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E7%94%9F%E9%95%BF%E5%8F%91%E8%82%B2.png"></u-icon>
          </view>
          <view>生长发育</view>
        </view>
        <view style="width: 20%" @click="switchTab" class="order-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%85%8D%E7%96%AB%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>抗衰老</view>
        </view>

      </view>
    </m-card>
    <m-card label="专业团队" style="background-color: #F3F3F3;position: relative;padding-bottom: 50rpx">
      <view @click="navigateTo('/pages/tab-bar/doctors/index')"
            style="position: absolute;right: 20rpx;top:30rpx;font-size: 25rpx">查看更多
      </view>
      <view style="display: flex;flex-wrap: wrap">
        <m-card @click.native="navigateTo('/pages/tab-bar/doctors/index')" v-for="(doctor,index) in doctors"
                style="width: 45%">
          <view style="display: flex">
            <view style="margin-top: 2%">
              <u-avatar size="100" :src="doctor.avatar"></u-avatar>
            </view>
            <view style="margin-left: 2%;margin-top: 2%">
              <view style="font-size: 30rpx;font-weight: bold">{{ doctor.realName }}</view>
              <view style="width: 200rpx; overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                {{ doctor.department }}
              </view>
            </view>
          </view>
          <view
              style="padding-bottom:2%;color:#999;width: 300rpx; overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
            {{ doctor.professionalField }}
          </view>
        </m-card>
      </view>
    </m-card>
    <u-tabbar
        v-model="current"
        :list="tabBarList"/>
  </view>
</template>

<script>

import {allMall_doctors} from "@/api/mall/mall_doctor";

export default {
  components: {},
  onShow() {
    allMall_doctors().then(re => {
      if (re.data.length > 0) {
        this.doctors = re.data.slice(0, 4);
      } else {
        this.doctors = re.data
      }
    })
  },
  data() {
    return {
      notices: ["测试版本，请勿涉及金额"],
      current: 0,
      tabBarList: this.$store.state.user.dynamicTabbar,
      queryParam: {},
      doctors: [],
      images: [{
        image: 'http://121.43.234.174:8080/profile/upload/2023/10/21/微信图片_20230916090228_20231021133821A002.jpg',
        title: '昨夜星辰昨夜风，画楼西畔桂堂东'
      },
        {
          image: 'http://121.43.234.174:8080/profile/upload/2023/10/21/微信图片_20230916090228_20231021133821A002.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'http://121.43.234.174:8080/profile/upload/2023/10/21/微信图片_20230916090228_20231021133821A002.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        }
      ],
    }
  },
  methods: {
    switchTab() {
      uni.switchTab({
        url: "/pages/tab-bar/category",
      })
    },
    handleQuery() {
      uni.setStorageSync('productName', this.queryParam.productName);
      uni.switchTab({
        url: "/pages/tab-bar/goods"
      })
    }
  }
}
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