<template>
  <view>
    <u-navbar :is-back="true" title="文章详情"></u-navbar>
    <m-card>
      <view style="display: flex">
        <view style="margin-top: 2%">
          <u-avatar size="120" :src="article.avatar"></u-avatar>
        </view>
        <view style="width:300px;margin-left: 5%;margin-top: 5%;position: relative">
          <text style="font-size: 35rpx;font-weight: bold">作者</text>
          <text style="margin-left:3%;font-size: 35rpx;font-weight: bold">{{ article.userName }}</text>
          <u-icon @click="starDoctor(article.createBy)" style="position: absolute;right: 20rpx;top: 5rpx" size="50"
                  name="/static/images/关注.png"></u-icon>
        </view>
      </view>
      <view style="font-size: 33rpx;font-weight: bold;padding-bottom: 3%">{{ article.title }}</view>
      <u-parse :html="article.content"></u-parse>
      <u-line style="margin-top: 3%" color="#999"/>
      <view style="display: flex;margin-top: 3%;padding-bottom: 2%">
        <view @click="starArticle()" style="display: flex;justify-content: center;align-items: center">
          <view>
            <u-icon size="40" name="heart"></u-icon>
          </view>
          <view>
            {{ stars }}
          </view>
        </view>
        <view @click="likeArticle()" style="display: flex;justify-content: center;align-items: center;margin-left: 10%">
          <view>
            <u-icon size="40" name="/static/images/点赞.png"></u-icon>
          </view>
          <view>
            {{ likes }}
          </view>
        </view>
        <view style="display: flex;justify-content: center;align-items: center;margin-left: 40%">
          <u-button @click="lookGoods" size="mini">自动浏览商品</u-button>
        </view>
      </view>
    </m-card>

    <u-popup height="400px" mode="bottom" v-model="show">
      <view style="padding-top: 50rpx"></view>
      <view style="margin-top: 3%" v-for="(product,index) in products">
        <view style="display: flex">
          <view style="margin-top: 2%">
            <image style="width: 180rpx;height: 180rpx" :src="product.coverImage"></image>
          </view>
          <view style="width:500rpx;margin-left: 5%;margin-top: 2%">
            <view style="width:400rpx;font-size: 35rpx;font-weight: bold">{{ product.productName }}</view>
            <view style="display: flex;margin-top: 2%;padding-bottom: 2%">
              <view style="display: flex;justify-content: center;align-items: center;margin-left: 80%">
                <u-button @click="goToGoods(product.id)" size="mini" type="primary">查看</u-button>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view style="margin-left:20%;display: flex;align-items: center;justify-content: flex-start">
        <view>
          <u-icon name="/static/images/选中.png" size="40"></u-icon>
        </view>
        <view>
          同意参与质量追溯，自愿选择购买
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>

import {allMall_doctors} from "@/api/mall/mall_doctor";
import UButton from "@/uview-ui/components/u-button/u-button.vue";
import {allMall_articles, getMall_article} from "@/api/mall/mall_article";
import {addMall_like_article, allMall_like_articles, listMall_like_article} from "@/api/mall/mall_like_article";
import {addMall_star_article, allMall_star_articles} from "@/api/mall/mall_star_article";
import {addMall_star_doctor} from "@/api/mall/mall_star_doctor";

export default {
  components: {UButton},
  onLoad(options) {
    this.id = options.id
    getMall_article(this.id).then(re => {
      this.article = re.data
      this.products = re.data.tableData
    })
    allMall_like_articles({articleId: this.id}).then(re => {
      this.likes = re.data.length
    })
    allMall_star_articles({articleId: this.id}).then(re => {
      this.stars = re.data.length
    })
  },
  data() {
    return {
      show: false,
      id: null,
      article: [],
      stars: 0,
      likes: 0,
      products: [],
    }
  },
  methods: {
    starDoctor(doctorId) {
      addMall_star_doctor({doctorId: doctorId})
      this.showTip("关注成功！")
    },
    starArticle() {
      addMall_star_article({articleId: this.id}).then(re => {
        allMall_star_articles({articleId: this.id}).then(re => {
          this.stars = re.data.length
        })
      })
      this.showTip("收藏成功！")
    },
    likeArticle() {
      addMall_like_article({articleId: this.id}).then(re => {
        allMall_like_articles({articleId: this.id}).then(re => {
          this.likes = re.data.length
        })
      })
      this.showTip("点赞成功！")

    },
    goToGoods(id) {
      this.show = false
      this.$tab.navigateTo('/pages/tab-bar/product-detail/index?productId=' + id)

    },
    lookGoods() {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>