<template>
  <view>
    <u-navbar :is-back="true" title="文章列表"></u-navbar>
    <view style="margin-top: 50%" v-if="articles.length===0">
      <u-empty src="/static/images/无历史记录.png" text="文章还没有发布哦"></u-empty>
    </view>
    <m-card v-for="(article,index) in articles">
      <view style="padding-top: 3%;font-size: 35rpx;font-weight: bold;margin-top: 2%">{{ article.title }}</view>
      <view style="color:#999;margin-top: 2%">{{ article.createTime }}</view>
      <u-line style="margin-top: 3%" color="#999"/>
      <view style="display: flex;margin-top: 3%;padding-bottom: 2%">
        <view style="display: flex;justify-content: center;align-items: center">
          <view>
            <u-icon size="40" name="heart"></u-icon>
          </view>
          <view>
            {{ article.stars }}
          </view>
        </view>
        <view style="display: flex;justify-content: center;align-items: center;margin-left: 10%">
          <view>
            <u-icon size="40" name="/static/images/点赞.png"></u-icon>
          </view>
          <view>
            {{article.likes}}
          </view>
        </view>
        <view style="display: flex;justify-content: center;align-items: center;margin-left: 50%">
          <u-button @click="navigateTo('/pages/tab-bar/article/index?id=' + article.id)" size="mini">详情</u-button>
        </view>
      </view>
    </m-card>
  </view>
</template>

<script>

import {allMall_doctors} from "@/api/mall/mall_doctor";
import UButton from "@/uview-ui/components/u-button/u-button.vue";
import {allMall_articles} from "@/api/mall/mall_article";

export default {
  components: {UButton},
  onLoad(options) {
    this.topic = options.topic
    allMall_articles({topic: this.topic}).then(re => {
      this.articles = re.data
    })

  },
  data() {
    return {
      topic: null,
      articles: [],
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>