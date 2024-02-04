<template>
  <view>
    <u-navbar :is-back="true" title="我的足迹">
      <view @click.native="operate=!operate" class="slot-wrap">
        {{ operate ? '管理' : '完成' }}
      </view>
    </u-navbar>
    <m-card v-if="historys.length>0" v-for="(history,index) in historys">
      <view>
        <view class="time">
          <view>
            <image @click="history.checked=!history.checked" v-if="operate===false" class="time-check"
                   :src="history.checked?'/static/images/选中.png':'/static/images/未选中.png'"/>
          </view>
          <view style="text-align: center;margin-bottom: 5rpx;margin-left: 2%"> {{ history.time }}
          </view>
        </view>
        <view class="history-list">
          <view
              style="width: 33%;"
              v-for="(product,index) in history.products">
            <image @click="navigateTo('/pages/tab-bar/product-detail/index?productId=' + product.id)"
                   border-radius="20rpx" mode="aspectFill" style="width: 100%;height:  200rpx"
                   :src="product.coverImage"></image>
            <view class="price">￥{{ product.bottomPrice }}</view>
          </view>
        </view>
      </view>
    </m-card>
    <view style="margin-top: 50%" v-if="historys.length===0">
      <u-empty src="/static/images/无历史记录.png" text="未查询到数据"></u-empty>
    </view>
    <view v-if="operate===false" class="footer">
      <view class="selectALl" @click="handleSelect">
        <u-button @click="handleSelect" plain size="medium" type="default">
          <text v-if="selectAll">全选</text>
          <text v-else>取消</text>
        </u-button>
      </view>
      <u-button @click="deleteSelected" plain size="medium" type="error">删除</u-button>
    </view>
  </view>
</template>

<script>


import {deleteMallBrowseHistoryByTime, queryUserBrowseHistory} from "@/api/mall/mall_browse_history";

export default {
  created() {
    queryUserBrowseHistory().then(re => {
      this.historys = re.data
    })
  },
  data() {
    return {
      selectAll: true,
      operate: true,
      historys: []
    };
  },
  methods: {
    deleteSelected() {
      const checkeds = this.historys.filter(obj => obj.checked);
      if (checkeds.length === 0) {
        uni.showToast({
          title: '请选择需要删除的日期',
          icon: 'none'
        })
        return
      }
      const times = checkeds.map(obj => obj.time)
      deleteMallBrowseHistoryByTime(times)
      this.historys = this.historys.filter(obj => !obj.checked);
      uni.showToast({
        title: '删除成功',
        icon: 'none'
      })
    },
    handleSelect() {
      this.selectAll = !this.selectAll
      if (this.selectAll) {
        for (let record of this.historys) {
          record.checked = false
        }
      } else {
        for (let record of this.historys) {
          record.checked = true
        }
      }
    },
  }
};
</script>

<style lang="scss" scoped>

.time-check {
  width: 48rpx;
  height: 48rpx;
}

.slot-wrap {
  padding: 5rpx 0;
  justify-content: center;
  width: 100rpx;
  color: black;
  //background-color: #ff7900;
  display: flex;
  align-items: center;
  margin-left: 82%;
  border-radius: 20rpx;
  /* 如果您想让slot内容占满整个导航栏的宽度 */
  /* flex: 1; */
  /* 如果您想让slot内容与导航栏左右有空隙 */
  /* padding: 0 30rpx; */
}

.time {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  font-weight: bold;
  padding-top: 5%;
  padding-bottom: 5%
}

.history-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap
}

.price {
  text-align: center;
  font-weight: bold;
  color: #ff6200;
  font-size: 30rpx;
  padding-bottom: 5%;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 995;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90upx;
  justify-content: flex-end;
  font-size: 30upx;
  background-color: #FFFFFF;
  color: black;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

}
</style>