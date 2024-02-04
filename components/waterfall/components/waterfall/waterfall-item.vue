<template>
  <view class="waterfall-item-container">
    <view class="waterfall-item" @tap="onTap">
      <image :src="params.coverImage" mode="widthFix" @load="emitHeight" @error="emitHeight"></image>
      <view class="content">
        <view class="product-name">
<!--          <view class="label">天猫</view>-->
          {{ params.productName }}
        </view>
        <view class="money">
          <text style="font-size: 25rpx;font-weight: 500">￥</text>
          {{ params.bottomPrice }}
          <text class="browse-num">{{ params.browseNum }}人看过</text>
        </view>
        <view class="shop-name">{{ params.storeName }}
          <u-icon name="arrow-right" color="#999" size="20"></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "helangWaterfallItem",
  options: {
    virtualHost: true
  },
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    tag: {
      type: String | Number,
      default: ''
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {};
  },
  methods: {
    // 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
    emitHeight(e) {
      const query = uni.createSelectorQuery().in(this);
      query.select('.waterfall-item-container').boundingClientRect(data => {
        let height = Math.floor(data.height);
        this.$emit("height", height, this.$props.tag);
      }).exec();
    },
    onTap() {
      this.$emit("click", this.$props.index, this.$props.tag);
    }
  }
}
</script>

<style lang="scss" scoped>
.waterfall-item {
  //padding: 16rpx;
  padding-bottom: 16rpx;
  background-color: #fff;
  border-radius: 4px;
  font-size: 28rpx;
  color: #666;

  image {
    display: block;
    width: 100%;
    // 默认设置一个图片的大约值
    height: 350rpx;
  }

  .content {
    margin-left: 20rpx;
    font-weight: 550;
    margin-top: 16rpx;

    .product-name {
      padding-bottom: 2%;
    }

    .money {
      font-size: 35rpx;
      color: #ff6200;
      margin-top: 8rpx;

      .browse-num {
        margin-left: 5%;
        font-weight: normal;
        font-size: 25rpx;
        color: #999;
      }
    }

    .label {
      margin-right: 2%;
      display: inline-block;
      background-color: #fa3534;
      color: #fff;
      font-size: 18rpx;
      //padding: 4rpx 16rpx;
    }

    .shop-name {
      padding-top: 2%;
      width: 60%;
      //border-radius: 15rpx;
      //background-color: #f5f5f5;
      font-weight: 500;
      font-size: 25rpx;
      color: #999;
    }
  }
}
</style>
