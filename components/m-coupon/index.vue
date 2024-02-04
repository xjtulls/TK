<template>
  <view>
    <view class="coupon-item x-bc">
      <!-- 右上角提示     -->
      <view class="box-con" v-if="item.topRightTip">
        <view class="box-text">{{ item.topRightTip }}</view>
      </view>
      <view class="coupon-money" :class="[{grayBackground:(status === 1 || status === 2)}]">
        <view v-if="item.type==2" class="item-left">
          <text style="font-size: 16px;">￥
          </text>
          <text style="font-size: 28px;">{{ item.value }}
          </text>
        </view>
        <view v-else class="item-left">
          <text style="font-size: 28px;">{{ item.value }}
          </text>
          <text style="font-size: 16px;">折
          </text>
        </view>
        <view class="demand">满{{ item.limitThreshold }}可用</view>
      </view>
      <view class="coupon-detail" :class="[{backgroundRight:(status === 1 || status === 2) }]">
        <view style="margin-bottom: 12rpx;">
          <text :class="[{grayBackground:(status === 1 || status === 2)}]" class="source">
            {{ item.source == 1 ? '平台券' : item.storeName }}
          </text>
          <text style="font-size: 12px;color: #333333;" class="coupon-title">{{ item.limitScope | formatLimitScope }}
          </text>
        </view>
        <view class="x-bc" style="margin:0 20rpx 12rpx 0;">
          <text style="font-size: 12px;color: #666666;">{{ item.limitTime.substring(0, 10) }}&nbsp;到期
          </text>
          <view v-if="isShowCheck&&(item.status===0||item.status===3)">
            <image @click="couponSelect(item)" class="selectImg" :src="item.checked? selectStr: unSelectStr"></image>
          </view>
          <view v-else>
            <u-button @click="couponClick(item)" type="error" v-if="status===0" class="coupon-button">
              使用
            </u-button>
            <u-button @click="couponClick(item)" type="error" v-if="status===3" class="coupon-button">
              领取
            </u-button>
          </view>
        </view>
        <view style="margin-bottom: 12rpx;color: #999999;font-size: 12px;text-decoration: underline;">
          <text @click.stop="ruleShowOrClose()">使用规则</text>
        </view>
      </view>
      <!-- 印章效果 -->
      <view class="seal" v-if="status === 1 || status === 2" style="position: absolute;right: 10rpx;bottom: 10rpx;">
        <view class="seal-son">
					<span
              style="position: absolute;top: 30rpx;text-align: center;font-size: 30rpx;transform: rotate(-12deg);left: 8rpx;color: #D2D2D2;font-weight: 900;">{{
              status === 1 ? '已使用' : '已失效'
            }}</span>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import UButton from "@/uview-ui/components/u-button/u-button.vue";

export default {
  components: {UButton},
  data() {
    return {
      // 未选中图片
      unSelectStr: '/static/images/未选中.png',
      // 选中图片
      selectStr: '/static/images/选中.png',
      ruleShow: false
    }
  },
  props: {
    // 是否有勾选框
    isShowCheck: {
      type: Boolean,
      default: false
    },
    // 状态 0未使用，1已使用，2已过期,3待领取
    status: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    //优惠券数据
    item: {
      type: Object
    },
  },
  filters: {
    formatLimitScope: function (type) {
      /**
       适用场景 0新客注册 1消费返卷 2优惠活动**/
      const statusMap = {
        1: '无限制',
        2: '限该店铺内指定商品可用',
        3: '限该店铺内指定类目商品可用'
      }
      return statusMap[type]
    }
  },
  methods: {
    // 查看优惠券使用规则
    ruleShowOrClose() {
      this.$emit('showRule', this.item);
    },
    couponSelect() {
      this.$emit("select")
    },
    couponClick(item) {
      this.$emit('couponClick', item)
    }

  }
}
</script>

<style lang='scss' scoped>
@import '@/static/style/mixin/text-overflow.scss';

.coupon-button {
  width: 60px;
  height: 50rpx;
  font-size: 25rpx;
  //background-color: #ff6200;
  color: #fff;
  text-align: center;
  border-radius: 12px;
}

.source {
  margin-right: 4px;
  background: rgb(246, 207, 208);
  color: rgb(232, 57, 37);
  float: left;
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 6px;
}

.selectImg {
  width: 40rpx;
  height: 40rpx;
}

.backgroundRight {
  background-color: #F5F4F5;
}

.grayBackground {
  background: linear-gradient(132deg, #D2D2D2 0%, #D2D2D2 100%) !important;;
}

.coupon-item {
  color: rgb(232, 57, 37);
  width: 100%;
  height: 110px;
  border-radius: 10upx;
  margin-top: 22upx;
  //border: 1px solid #FFFFFF;
  position: relative;
  background: rgb(250, 232, 230);

  .coupon-money {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    width: 232upx;
    height: 100%;
    border-style: none dotted none none;
    border-color: #eeeeee;
    /* background: ; */

    .item-left {
      width: 100%;
      font-weight: 400;
      margin-bottom: 6px;
    }

    .demand {
      font-size: 12px;
    }


  }


  .box-con {
    width: 85px;
    height: 88px;
    overflow: hidden;
    position: absolute;
    top: -3px;
    right: -3px;

    .box-text {
      font-size: 12px;
      color: white;
      text-align: center;
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      position: relative;
      padding: 2px 0;
      left: 37px;
      top: 4px;
      width: 65px;
      background-color: rgb(232, 57, 37);
      //#FFA500, #ff6200
      //background-image: -webkit-gradient(linear, left top, left bottom, from(#ff6200), to(#ff6200));
      //background-image: -webkit-linear-gradient(top, #ff6200, #ff6200);
      //background-image: -moz-linear-gradient(top, #ff6200, #ff6200);
      //background-image: -ms-linear-gradient(top, #ff6200, #ff6200);
      //background-image: -o-linear-gradient(top, #ff6200, #ff6200);
      -webkit-box-shadow: 0px 0px 3px #ff6200;
      -moz-box-shadow: 0px 0px 3px #ff6200;
      box-shadow: 0px 0px 3px #ff6200;

      &:before,
      :after {
        content: "";
        position: absolute;
        bottom: -3px;
      }

      &:before {
        left: 0;
      }

      &:after {
        right: 0;
      }

    }
  }


}

.coupon-detail {
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding-left: 20px;
  height: 100%;

  .coupon-title {
    @include text-overflow("", 2);
  }
}

.coupon-item:after {
  width: 40upx;
  height: 20upx;
  position: absolute;
  left: 212upx;
  top: -1px;
  border-radius: 0 0 40upx 40upx;
  content: "";
  display: block;
  background: #F5F5F7;
  border: 1px solid #eeeeee;
  border-top: 0px;
}

.coupon-item:before {
  width: 40upx;
  height: 20upx;
  position: absolute;
  left: 212upx;
  bottom: -1px;
  border-radius: 40upx 40upx 0 0;
  content: "";
  display: block;
  background: #F5F5F7;
  border: 1px solid #eeeeee;
  border-bottom: 0px;
}

.seal {
  width: 130rpx;
  height: 130rpx;
  border: solid 6rpx #D2D2D2;
  border-radius: 100%;
  background-color: #F5F4F5;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.seal-son {
  width: 110rpx;
  height: 110rpx;
  border: solid 2rpx #D2D2D2;
  border-radius: 100%;
  background-color: #F5F4F5;
  position: relative;
}
</style>
