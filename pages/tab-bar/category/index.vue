<template>
  <view>
    <u-navbar :is-back="true" title="商品"></u-navbar>
    <u-search bg-color="#FFFFFF" border-color="#ff7900" @clear="getList(true)" @custom="getList(true)"
              style="padding:1% 5% 0 5%;" shape="round"
              placeholder="请输入商品名称"
              v-model="queryParam.productName"></u-search>
    <m-card>
      <u-dropdown active-color="#ff6200">
        <u-dropdown-item @change="getList(true)" v-model="queryParam.option" title="综合"
                         :options="options"></u-dropdown-item>
      </u-dropdown>
      <view @click="navigateTo('/pages/tab-bar/product-detail/index?productId=' + item.id)" class="item"
            v-for="(item, index) in results" :key="index">
        <view class="image">
          <u-image border-radius="25rpx" mode="aspectFill" width="200rpx" height="200rpx"
                   :src="item.cover_image"></u-image>
        </view>
        <view class="content">
          <view style="text-align: left;overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
            {{ item.product_name }}
          </view>
          <view class="money">
            <text style="font-size: 30rpx;font-weight: 500">￥</text>
            {{ item.bottom_price }}
          </view>
          <view class="store-name">
            <view style="width: 70%">
              {{ item.storeName }}
              <u-icon name="arrow-right" color="#999" size="20"></u-icon>
            </view>
            <view>
              <text class="browse-num">{{ item.browse_num }}人看过</text>
            </view>
          </view>
        </view>

      </view>
    </m-card>
    <u-loadmore :status="status"/>
  </view>
</template>

<script>

import {queryProductByCategoryAndProductName} from "@/api/mall/mall_product";

export default {
  data() {
    return {
      options: [{
        label: '浏览量优先',
        value: 1,
      },
        {
          label: '价格降序',
          value: 2,
        },
        {
          label: '价格升序',
          value: 3,
        }
      ],
      searchFlag: true,
      total: null,
      results: [],
      queryParam: {
        option: null,
        categoryId: null,
        productName: null,
        pageSize: 10,
        pageNum: 1,
      },
      status: 'loading',
    }
  },
  async onLoad(options) {
    this.queryParam.categoryId = options.categoryId;
    this.getList()
  },
  methods: {
    getList(clickEvent) {
      if (clickEvent) {
        this.searchFlag = true
        this.queryParam.pageNum = 1
        this.results = []
      }
      if (this.searchFlag === false) {
        this.status = 'no_more'
        return
      }
      queryProductByCategoryAndProductName(this.queryParam).then(re => {
        this.results = this.results.concat(re.rows)
        if (re.rows < this.queryParam.pageSize) {
          this.searchFlag = false
          this.status = 'no_more'
        } else {
          this.searchFlag = true
          this.queryParam.pageNum = this.queryParam.pageNum + 1
          this.status = 'load_more'
        }
      })
    },
  },
  onReachBottom() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>

.wrap {
  padding: 24rpx;
}

.item {
  display: flex;
  margin-top: 1%;
  padding: 1% 0;
  color: $u-content-color;
  font-size: 28rpx;

  .content {
    width: 70%;
    margin-left: 5%;
    font-weight: bold;
    font-size: 30rpx;
  }

  .money {
    margin-top: 5%;
    margin-left: 1%;
    font-weight: bold;
    font-size: 40rpx;
    color: #ff6200;

    .browse-num {
      margin-left: 5%;
      font-weight: normal;
      font-size: 25rpx;
      color: #999;
    }
  }

  .store-name {
    display: flex;
    margin-top: 5%;
    margin-left: 5%;
    font-weight: normal;
    font-size: 25rpx;
    color: #999;
  }

  .image {
    width: 30%;
    height: 200rpx;
  }
}
</style>