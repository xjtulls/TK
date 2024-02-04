<template>
  <view>
    <u-navbar :background="{backgroundColor:'#f5f5f5'}" :is-back="true" title="商城"></u-navbar>
    <view>
      <u-search :show-action="false"
                @icon="handleScanCode"
                search-icon="/static/images/扫码.png"
                bg-color="#FFFFFF" border-color="#ff7900"
                @clear="handleQuery"
                @change="handleQuery"
                @search="handleQuery"
                style="padding:5% 2% 0 2%;" shape="round"
                placeholder="请输入商品名称"
                v-model="queryParam.productName"></u-search>
    </view>
    <my-waterfall
        :status="waterfall.status"
        :list="waterfall.list"
        :reset="waterfall.reset"
        @click="onClick"
        @done="onDone"
    >
      <template>
        <view v-if="waterfall.status === 'await'">
          <view class="load-txt">上拉加载更多</view>
        </view>
        <view v-else-if="waterfall.status === 'loading'">
          <view class="load-txt">加载中</view>
        </view>
        <view v-else-if="waterfall.status === 'success'">
          <view class="load-txt">加载中</view>
        </view>
        <view v-else-if="waterfall.status === 'finish'">
          <view class="load-txt">没有更多了</view>
        </view>
        <view v-else-if="waterfall.status === 'empty'">
          <u-empty src="/static/images/数据为空.png" text="没有更多了"></u-empty>
        </view>
        <view v-else><!-- 别问我为什么要写一个 v-else 的空 view,不写H5平台就会有CSS生效的离谱BUG --></view>
      </template>
    </my-waterfall>
  </view>
</template>

<script>
import MyWaterfall from "@/components/waterfall/components/waterfall/waterfall-list.vue"
import {listMall_product} from "@/api/mall/mall_product";
import platform from "@/components/wu-ui-tools/libs/function/platform";

export default {
  components: {
    MyWaterfall
  },
  data() {
    return {
      current: 1,
      tabBarList: this.$store.state.user.dynamicTabbar,

      total: 0,
      cacheList: [],
      queryParam: {
        productName: null,
        load: true,
        pageNumSize: 10,
        pageNum: 1,
      },
      waterfall: {
        status: "",
        reset: false,
        list: []
      }
    }
  },
  mounted() {
    this.queryParam.productName=uni.getStorageSync('productName')
    this.getList();
  },
  onHide() {
    uni.removeStorageSync("productName")
  },
  // 触底触发
  onReachBottom() {
    this.getList();
  },
  methods: {
    platform() {
      return platform
    },
    handleScanCode() {
      console.log("xxx")
      uni.scanCode({
        success: function (res) {
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
        },
        fail: function (res) {
          console.log('条码类型：' + res);
        }
      });
    },
    handleQuery() {
      this.queryParam.pageNum = 1
      this.queryParam.load = true;
      this.waterfall.status = 'loading';
      this.cacheList = []
      this.total = 0
      this.getList()
    },
    onClick(data, index, tag) {
      this.$tab.navigateTo('/pages/tab-bar/product-detail/index?productId=' + data.id)
    },
    onDone() {
      this.waterfall.reset = false;
      if (this.cacheList.length >= this.total) {
        this.queryParam.load = false;
        this.waterfall.status = 'finish';
      } else {
        this.queryParam.load = true;
        this.queryParam.pageNum++;
        this.waterfall.status = 'await';
      }
    },
    getList() {
      if (!this.queryParam.load) {
        return;
      }
      // 设置状态为加载中
      this.waterfall.status = 'loading';
      listMall_product(this.queryParam).then(re => {
        this.total = re.total
        // 第一页数据执行以下代码
        if (this.queryParam.pageNum === 1) {
          // 设置组件状态为 重置，可供下拉刷新这类需要重置列表功能时使用
          this.waterfall.reset = true;
        }
        // 数据无效时处理
        if (!re.rows || re.rows.length < 1) {
          // 设置组件为 加载结束 状态
          this.waterfall.status = 'empty';
          return;
        }
        // 将数据赋值给瀑布流 list 属性
        this.waterfall.list = re.rows;
        // 设置组件为 加载成功 状态，此时瀑布流组件开始计算当前数据的布局
        this.waterfall.status = 'success';

        // 缓存当前数据给其他需要该数据的功能使用
        if (this.queryParam.pageNum === 1) {
          this.cacheList = re.rows;
        } else {
          this.cacheList = [...this.cacheList, ...re.rows];
        }
      })
    },
  }
}
</script>

<style lang="scss">

.load-txt {
  padding: 0 0 20rpx 0;
  text-align: center;
  color: #999;
  font-size: 24rpx;
}

.load-icon {
  align-items: center;
  width: 300rpx;
  height: 300rpx;
  margin: 0 auto 20rpx auto;
  display: block;
}

.status-change {
  position: fixed;
  right: 10rpx;
  top: 60%;
  width: 80rpx;
  height: 80rpx;
  z-index: 100;
  font-size: 24rpx;
  border-radius: 50%;
  background-color: #0089ff;
  color: #fff;
  line-height: 1;
  opacity: .33;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>