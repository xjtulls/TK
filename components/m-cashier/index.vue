<template>
  <view>
    <!-- 支付方式列表 -->
    <view class="pay-way">
      <view class="pay-list">
        <view class="list" v-for="(item,index) in PayList"
              @click="onPayWay(item,index)"
              :key="index">
          <view class="pay-type">
            <image :src="item.icon" mode=""></image>
            <text>{{ item.name }}</text>
          </view>
          <view class="check">
            <text class="iconfont" :class="PayWay === index ? 'icon-checked action':'icon-check'"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      PayList: [
        {
          type: 1,
          icon: '/static/images/微信支付.png',
          name: '微信支付',
        }, {
          type: 2,
          icon: '/static/images/支付宝支付.png',
          name: '支付宝支付',
        }
      ],
      PayWay: null,
      CountDown: 1000,
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
    };
  },
  onLoad() {
  },
  methods: {
    /**
     * 支付方式切换点击
     */
    onPayWay(item, index) {
      this.PayWay = index;
      this.$emit("select", item.type)
    },
  }
}
</script>

<style scoped lang="scss">
@import '@/static/scss/FontStyle.css';

/* 支付方式 */
.pay-way {
  margin-left: 0;
  //width: 100%;
  background-color: #FFFFFF;
  padding-bottom: 150rpx;
  //margin-top: 220rpx;
  .pay-list {
    //不加宽度  微信小程序样式错乱
    width: 96%;
    padding: 0 2%;

    .list {
      margin-left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100rpx;
      border-bottom: 2rpx solid #f6f6f6;

      .pay-type {
        margin-left: 0;
        display: flex;
        align-items: center;

        image {
          width: 40rpx;
          height: 40rpx;
        }

        text {
          font-size: 28rpx;
          color: #222222;
          margin-left: 20rpx;
        }
      }

      .check {
        display: flex;
        align-items: center;

        text {
          font-size: 42rpx;
          color: #C0C0C0;
        }

        .action {
          color: #fd3e14;
        }
      }
    }
  }
}


</style>
