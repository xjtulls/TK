<template>
  <view class="user">
    <u-navbar :is-back="false" title="分类"></u-navbar>
    <m-card label="慢病类">
      <view class="articles" style="flex-wrap: wrap;justify-content: flex-start;height: 300rpx">
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=1')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%BF%83%E8%84%91%E8%A1%80%E7%AE%A1.png"></u-icon>
<!-- 			<u-icon size="50" name="https://xxxxxxxxx"></u-icon> -->
			
          </view>
          <view>心脑血管</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=2')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%86%85%E5%88%86%E6%B3%8C%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>内分泌系统</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=3')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E7%A5%9E%E7%BB%8F%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>神经系统</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=4')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%91%BC%E5%90%B8%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>呼吸系统</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=5')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%85%8D%E7%96%AB%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>免疫系统</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=6')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E7%99%8C%E7%97%87%E8%82%BF%E7%98%A4.png"></u-icon>
          </view>
          <view>癌症肿瘤</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=7')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E8%BF%90%E5%8A%A8%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>运动系统</view>
        </view>
      </view>
    </m-card>
    <m-card label="亚健康">
      <view class="articles" style="flex-wrap: wrap;justify-content: flex-start;height: 300rpx">
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=8')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%85%8D%E7%96%AB%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>免疫系统</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=9')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%85%A8%E9%9D%A2%E8%90%A5%E5%85%BB.png"></u-icon>
          </view>
          <view>全面营养</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=10')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%8A%9F%E8%83%BD%E9%94%BB%E7%82%BC.png"></u-icon>
          </view>
          <view>功能锻炼</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=11')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E8%82%A5%E8%83%96.png"></u-icon>
          </view>
          <view>肥胖</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=12')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%BF%83%E8%84%91%E5%BA%B7%E5%A4%8D.png"></u-icon>
          </view>
          <view>心脑康复</view>
        </view>
      </view>
    </m-card>
    <m-card label="围产期">
      <view class="articles" style="flex-wrap: wrap;justify-content: flex-start;height: 300rpx">
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=13')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%AD%95%E6%A3%80.png"></u-icon>
          </view>
          <view>孕检</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=14')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E8%83%9A%E8%83%8E%E6%9C%9F.png"></u-icon>
          </view>
          <view>胚胎期</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=15')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E8%83%9A%E8%83%8E%E6%9C%9F.png"></u-icon>
          </view>
          <view>胎儿期</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=16')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E6%96%B0%E7%94%9F%E5%84%BF.png"></u-icon>
          </view>
          <view>新生儿</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=17')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E4%BA%A7%E5%90%8E.png"></u-icon>
          </view>
          <view>产后</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=18')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%A9%B4%E5%B9%BC%E6%97%B6%E6%9C%9F.png"></u-icon>
          </view>
          <view>婴幼时期</view>
        </view>
      </view>
    </m-card>
    <m-card label="生长发育">
      <view class="articles" style="flex-wrap: wrap;justify-content: flex-start;height: 300rpx">
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=19')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E6%99%BA%E5%8A%9B%E5%8F%91%E8%82%B2%E6%9C%9F.png"></u-icon>
          </view>
          <view>智力发育期</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=20')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E4%BD%93%E6%A0%BC%E5%8F%91%E8%82%B2%E6%9C%9F.png"></u-icon>
          </view>
          <view>体格发育期</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=21')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%8A%9F%E8%83%BD%E5%8F%91%E8%82%B2%E6%9C%9F.png"></u-icon>
          </view>
          <view>功能发育期</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=22')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%85%A8%E9%9D%A2%E8%90%A5%E5%85%BB.png"></u-icon>
          </view>
          <view>全面营养</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=23')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%85%8D%E7%96%AB%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>免疫预防</view>
        </view>
      </view>
    </m-card>
    <m-card label="抗衰老">
      <view class="articles" style="flex-wrap: wrap;justify-content: flex-start;height: 150rpx">
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=24')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%85%8D%E7%96%AB%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>免疫抗衰</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=25')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E7%A5%9E%E7%BB%8F%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>神经抗衰</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=26')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%86%85%E5%88%86%E6%B3%8C%E7%B3%BB%E7%BB%9F.png"></u-icon>
          </view>
          <view>内分泌抗衰</view>
        </view>
        <view style="width: 25%" @click="navigateTo('/pages/tab-bar/articles/index?topic=27')" class="articles-item">
          <view class="bag">
            <u-icon size="50" name="http://s4oe60dvb.hd-bkt.clouddn.com/%E5%9B%BE%E5%83%8F/%E5%85%A8%E9%9D%A2%E8%90%A5%E5%85%BB.png"></u-icon>
          </view>
          <view>营养素补充</view>
        </view>
      </view>
    </m-card>
    <u-tabbar
        v-model="current"
        :list="tabBarList"/>
  </view>
</template>
<script>

export default {
  data() {
    return {
      current: 1,
      tabBarList: this.$store.state.user.dynamicTabbar,

    };
  },

  methods: {},
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
  barticles-radius: 20rpx;
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
  barticles-radius: 50rpx;
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
    barticles-bottom-left-radius: 30rpx;
    barticles-bottom-right-radius: 30rpx;
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
    barticles-radius: 20rpx;
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

  .articles {
    height: 140rpx;
    text-align: center;
    font-size: 24rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 3%;
    //font-weight: bold;
    color: black;

    .articles-item {
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
  barticles-radius: 50%;
  margin: 0 auto;
}

</style>
