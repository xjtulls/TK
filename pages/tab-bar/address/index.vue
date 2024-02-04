<template>
  <view>
    <u-navbar :is-back="true" title="收货地址"></u-navbar>
    <u-empty v-if="siteList.length==0" src="/static/images/收货地址为空.png" text="没有更多了"></u-empty>
    <m-card v-else>
      <u-swipe-action
          v-for="(item, index) in siteList" :key="item.id" :index="index"
          @click="click(item)"
          :options="options"
      >
        <view class="item">
          <view class="top">
            <view class="name">{{ item.receiver }}</view>
            <view class="phone">{{ item.phone }}</view>
            <view v-if="item.defaultAddress" style="margin-left: 10%">
              <u-tag size="mini" text="默认" shape="circle"/>
            </view>
          </view>
          <view class="bottom">
            {{ item.area + item.address }}
            <u-icon @click="editAddress(item.id)" name="edit-pen" :size="40" color="#999999"></u-icon>
          </view>
        </view>
      </u-swipe-action>
    </m-card>
    <bottom-center-button @click.native="toAddSite">新增地址</bottom-center-button>
  </view>
</template>

<script>
import {getUserProfile} from "@/api/system/user";
import {allAddresss, delAddress} from "@/api/mall/mall_address";

export default {
  onShow() {
    getUserProfile().then(response => {
      this.user = response.data
      this.queryParam.createBy = this.user.userId
      allAddresss(this.queryParam).then(re => {
        this.siteList = re.data
      })
    })
  },
  data() {
    return {
      queryParam: {
        createBy: null,
      },
      user: {},
      siteList: [],
      btnWidth: 180,
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ]
    };
  },
  methods: {
    editAddress(id) {
      this.$tab.navigateTo('/pages/tab-bar/address/add?id=' + id)
    },
    toAddSite() {
      uni.navigateTo({
        url: '/pages/tab-bar/address/add'
      });
    },
    click(item) {
      this.$modal.confirm('确认删除？').then(() => {
        this.siteList.splice(this.siteList.indexOf(item), 1)
        delAddress(item.id).then(re => {
          this.$u.toast(`删除成功`);
        })
      })
    },
  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}

.item {
  //display: flex;
  padding: 20rpx;
}

.title {
  text-align: left;
  font-size: 28rpx;
  color: $u-content-color;
  margin-top: 20rpx;
}

.item {
  padding: 40rpx 40rpx;

  .top {
    display: flex;
    font-weight: bold;
    font-size: 34rpx;

    .phone {
      margin-left: 60rpx;
    }

    .tag {
      display: flex;
      font-weight: normal;
      align-items: center;

      text {
        display: block;
        width: 60rpx;
        height: 34rpx;
        line-height: 34rpx;
        color: #ffffff;
        font-size: 20rpx;
        border-radius: 6rpx;
        text-align: center;
        margin-left: 30rpx;
        background-color: rgb(49, 145, 253);
      }

      .red {
        background-color: red
      }
    }
  }

  .bottom {
    display: flex;
    margin-top: 30rpx;
    font-size: 28rpx;
    justify-content: space-between;
    color: #999999;
  }
}

.addSite {
  display: flex;
  justify-content: space-around;
  width: 600rpx;
  line-height: 100rpx;
  position: absolute;
  bottom: 30rpx;
  left: 80rpx;
  background-color: red;
  border-radius: 60rpx;
  font-size: 30rpx;

  .add {
    display: flex;
    align-items: center;
    color: #ffffff;

    .icon {
      margin-right: 10rpx;
    }
  }
}
</style>