<template>
  <view class="container">
    <u-navbar :is-back="true" title="商品详情"></u-navbar>
    <view class="carousel">
      <swiper indicator-dots circular=true duration="400">
        <swiper-item class="swiper-item" v-for="(src,index) in imgList" :key="index">
          <view class="image-wrapper">
            <image
                :src="src"
                class="loaded"
                mode="aspectFill"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <m-card>
      <view class="introduce-section">
        <text class="title">{{ product.productName }}</text>
        <view class="price-box">
          <text class="price-tip">¥</text>
          <text class="price">{{ product.bottomPrice }}</text>
        </view>
        <view class="bot-row">
          <view style="width: 30%">销量: {{ product.saleNum }}</view>
          <view style="width: 30%">浏览量: {{ product.browseNum }}</view>
          <view style="width: 15%;margin-left: 25%">
            <u-icon color="orange" @click="enableShare=true" name="share"></u-icon>
            <text @click="enableShare=true">分享</text>
          </view>
        </view>
      </view>
    </m-card>
    <m-card>
      <u-cell-group>
        <u-cell-item icon="/static/images/店铺.png" title="店铺" :value="product.storeName" :arrow="true"
                     arrow-direction="right"></u-cell-item>
        <u-cell-item icon="car-fill" title="快递免邮费" :arrow="true" arrow-direction="right"></u-cell-item>
        <u-cell-item icon="heart" title="15天价保 退货运费险 7天无理由退货" :arrow="true"
                     arrow-direction="right"></u-cell-item>
        <u-cell-item @click="skuShow=true" icon="grid" title="选择分类" :arrow="true"
                     arrow-direction="right"></u-cell-item>
      </u-cell-group>
    </m-card>
    <m-card @click.native="navigateTo('/pages/tab-bar/comment/index?productId='+product.id)"
            :label="'宝贝评价('+comments.length+'+)'">
      <view v-if="comments.length>0" style="padding-bottom: 3%"
            v-for="(comment, index) in comments.slice(0, 2)" :key="index">
        <view style="display: flex;justify-content: flex-start;">
          <view style="border-radius:50rpx;">
            <u-avatar size="60" :src="comment.fromAvatar"></u-avatar>
          </view>
          <view style="margin-left: 2%;font-weight: bold;font-size: 30rpx">
            {{ comment.fromNickName }}
          </view>
        </view>
        <view style="margin-top: 3%;margin-left:3%;font-weight: bold;font-size: 28rpx">
          {{ comment.content }}
        </view>
      </view>
      <view v-if="comments.length==0" style="text-align:center;font-weight:bold;padding: 5%">去提问</view>
    </m-card>
    <view class="detail-desc">
      <view class="d-header">
        <text>图文详情</text>
      </view>
      <view>
        <view style="width:100%">
          <img v-for="src in desc" style="width:100%;display:block;"
               :src="src"/>
        </view>
      </view>
    </view>

    <shares v-if="enableShare" :product-id="product.id" :cover-image="product.coverImage"
            :product-name="product.productName" type="product"
            @close="enableShare = false"/>

    <sku v-model="skuShow"
         :data="skus"
         :themeColor="[226, 35, 26]"
         :defaultCover="product.coverImage"
         btnConfirmText="购买" notSelectSku="请选择完整的商品信息"
         @confirm="skuConfirm"
         @addCart="addCart"/>
    <SubmitOrderBottom ref="bottomTab"
                       @chat="handleChat"
                       @star="star"
                       @addCart="skuShow=true" @buyNow="skuShow=true"/>
  </view>
</template>

<script>
import SubmitOrderBottom from '@/components/submit-order-bottom/index.vue';
import Sku from "@/components/wu-sku/wu-sku.vue"
import {getMall_product, querySku} from "@/api/mall/mall_product";
import {addCart} from "@/api/mall/mall_cart";
import {generateBuyNowParam} from "@/api/mall/mall_sku";
import shares from "@/components/m-share/index"; //分享
import MComment from '@/components/m-comment/index.vue';
import {queryProductComments} from "@/api/mall/mall_comment";
import {addMall_star_product} from "@/api/mall/mall_star_product";

export default {
  components: {
    SubmitOrderBottom, Sku, shares, MComment
  },
  data() {
    return {
      productId: null,
      comments: [],
      enableShare: false,
      param: {
        num: 0,
        skuId: null
      },
      product: {},
      // 是否显示组件
      skuShow: false,
      // sku列表
      skus: [],
      imgList: [],
      desc: [],
    };
  },
  onShow() {
    queryProductComments({productId: this.productId}).then(res => {
      this.comments = res.data
    })
  },
  onLoad(options) {
    //接收传值,id里面放的是标题，因为测试数据并没写id
    let productId = options.productId;
    this.productId = productId
    getMall_product(productId).then(re => {
      this.product = re.data
      if (this.product.sliderImage.length > 0) {
        this.imgList = this.product.sliderImage.split(',')
      }
      //       if (this.product.detailImage > 0) {
      if (this.product.detailImage != null) {
        this.desc = this.product.detailImage.split(',')
      }
    })

    querySku({productId: productId}).then(re => {
      this.skus = re.data
    })
  },
  methods: {
    skuConfirm(e) {
      //不写的话，所有滑动组件用不了
      this.skuShow = false
      generateBuyNowParam({skuId: e.sku.id, num: e.num}).then(re => {
        let array = []
        array.push(re.data)
        this.navigateTo("/pages/tab-bar/order/create_order?orderInfo=" + JSON.stringify(array))
      })
    },
    star() {
      addMall_star_product({productId: this.productId})
      this.showTip("收藏成功~")
    },
    handleChat() {
      if (this.$store.state.user.userId == this.product.storeId) {
        this.showTip("不可以和自己聊天哦~")
        return
      }
      this.$tab.navigateTo('/pages/tab-bar/chat/index?chatUser='
          + JSON.stringify({
            chatUserId: this.product.storeId,
            chatUserName: this.product.storeName,
            chatUserAvatar: this.product.storeAvatar
          }))
    },
    addCart(e) {
      this.param.num = e.num
      this.param.skuId = e.sku.id
      addCart(this.param).then(re => {
        this.$refs.bottomTab.refreshCount()
        uni.showToast({
          title: '加入购物车成功！',
          icon: 'none'
        })
      })
    },
  },

}
</script>

<style lang='scss'>
page {
  background: #f8f8f8;
  padding-bottom: 160upx;
}

.icon-you {
  font-size: 28upx + 2upx;
  color: #888;
}

.carousel {
  height: 722upx;
  position: relative;

  swiper {
    height: 100%;
  }

  .image-wrapper {
    width: 100%;
    height: 100%;
  }

  .swiper-item {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 750upx;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }
  }

}

/* 标题简介 */
.introduce-section {
  background: #fff;
  padding: 20upx 30upx;

  .title {
    font-size: 32upx;
    color: #303133;
    height: 50upx;
    line-height: 50upx;
  }

  .price-box {
    display: flex;
    align-items: baseline;
    height: 64upx;
    padding: 10upx 0;
    font-size: 26upx;
    color: #fa436a;
  }

  .price {
    font-size: 32upx + 2upx;
  }

  .m-price {
    margin: 0 12upx;
    color: #909399;
    text-decoration: line-through;
  }

  .coupon-tip {
    align-items: center;
    padding: 4upx 10upx;
    background: #fa436a;
    font-size: 24upx;
    color: #fff;
    border-radius: 6upx;
    line-height: 1;
    transform: translateY(-4upx);
  }

  .bot-row {
    display: flex;
    align-items: center;
    height: 50upx;
    font-size: 24upx;
    color: #909399;

    text {
      flex: 1;
    }
  }
}

/*  详情 */
.detail-desc {
  background: #fff;
  margin-top: 16upx;

  .d-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80upx;
    font-size: 28upx + 2upx;
    color: #303133;
    position: relative;

    text {
      padding: 0 20upx;
      background: #fff;
      position: relative;
      //z-index: 1;
      z-index: 0;
    }

    &:after {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%);
      width: 300upx;
      height: 0;
      content: '';
      border-bottom: 1px solid #ccc;
    }
  }
}

.cu-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1110;
  opacity: 0;
  outline: 0;
  text-align: center;
  -ms-transform: scale(1.185);
  transform: scale(1.185);
  backface-visibility: hidden;
  perspective: 2000upx;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease-in-out 0s;
  pointer-events: none;
}

.cu-modal::before {
  content: "\200B";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.cu-modal.show {
  opacity: 1;
  transition-duration: 0.3s;
  -ms-transform: scale(1);
  transform: scale(1);
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
}

.cu-dialog {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
  width: 750upx;
  max-width: 100%;
  background-color: #f8f8f8;
  border-radius: 10upx;
  overflow: hidden;
}

</style>