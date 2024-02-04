<template>
  <view class="wrap">
    <u-navbar :is-back="true" title="新增地址"></u-navbar>
    <m-card>
      <u-form style="margin-left: 2%" label-width="200rpx" :model="form" ref="uForm">
        <u-form-item label="收货人">
          <u-input v-model="form.receiver" type="text" placeholder-class="line" placeholder="请填写收货人姓名"/>
        </u-form-item>
        <u-form-item label="手机号码">
          <u-input v-model="form.phone" type="text" placeholder-class="line" placeholder="请填写收货人手机号"/>
        </u-form-item>
        <u-form-item @click.native="showRegionPicker" label="所在地区">
          <u-input right-icon="right-icon" v-model="form.area" disabled type="text" placeholder-class="line"
                   placeholder="省市区县、乡镇等"/>
        </u-form-item>
        <u-form-item label="详细地址">
          <u-input v-model="form.address" type="textarea" placeholder-class="line" placeholder="街道、楼牌等"/>
        </u-form-item>
      </u-form>
      <view class="bottom">
        <view class="default">
          <view class="left">
            <view style="font-size: 20rpx;font-weight: bold">设置默认地址</view>
          </view>
          <view class="right">
            <u-switch v-model="form.defaultAddress" color="red"/>
          </view>
        </view>
      </view>
      <u-picker @confirm="selectAddress" mode="region" ref="uPicker" v-model="show"/>
      <bottom-center-button @click.native="saveAddress">保存收货地址</bottom-center-button>
    </m-card>
  </view>
</template>

<script>
import UButton from "@/uview-ui/components/u-button/u-button.vue";
import {addAddress, getAddress, updateAddress} from "@/api/mall/mall_address";
import {getMall_product, querySku} from "@/api/mall/mall_product";

export default {
  components: {UButton},
  async onLoad(option) {
    if (option.id != null) {
      getAddress(option.id).then(re => {
        this.form = re.data
      })
    }
  },
  data() {
    return {
      form: {
        area: null,
        defaultAddress: false,
      },
      show: false
    };
  },
  methods: {
    saveAddress() {
      if (this.form.id != null) {
        updateAddress(this.form).then(re => {
          this.$u.toast(`保存成功`);
          uni.navigateTo({
            url: "/pages/tab-bar/address/index",
          });
        })
      } else {
        addAddress(this.form).then(re => {
          this.$u.toast(`保存成功`);
          uni.navigateTo({
            url: "/pages/tab-bar/address/index",
          });
        })
      }

    },
    selectAddress(e) {
      this.form.area = e.province.label + "-" + e.city.label + "-" + e.area.label
    },
    showRegionPicker() {
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}

/deep/ .line {
  color: $u-light-color;
  font-size: 28rpx;
}

.wrap {
  background-color: #f2f2f2;

  .top {
    background-color: #ffffff;
    border-top: solid 2rpx $u-border-color;
    padding: 22rpx;

    .item {
      display: flex;
      font-size: 32rpx;
      line-height: 100rpx;
      align-items: center;
      border-bottom: solid 2rpx $u-border-color;

      .left {
        width: 180rpx;
      }

      input {
        text-align: left;
      }
    }

    .address {
      padding: 20rpx 0;

      textarea {
        // width: 100%;
        height: 150rpx;
        background-color: #f7f7f7;
        line-height: 60rpx;
        margin: 40rpx auto;
        padding: 20rpx;
      }
    }

    .site-clipboard {
      padding-right: 40rpx;

      textarea {
        // width: 100%;
        height: 150rpx;
        background-color: #f7f7f7;
        line-height: 60rpx;
        margin: 40rpx auto;
        padding: 20rpx;
      }

      .clipboard {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26rpx;
        color: $u-tips-color;
        height: 80rpx;

        .icon {
          margin-top: 6rpx;
          margin-left: 10rpx;
        }
      }
    }
  }

  .bottom {
    margin-top: 10rpx;
    padding: 0 20rpx;
    background-color: #ffffff;
    font-size: 28rpx;

    .tag {
      display: flex;

      .left {
        width: 160rpx;
      }

      .right {
        display: flex;
        flex-wrap: wrap;

        .tags {
          width: 140rpx;
          padding: 16rpx 8rpx;
          border: solid 2rpx $u-border-color;
          text-align: center;
          border-radius: 50rpx;
          margin: 0 10rpx 20rpx;
          display: flex;
          font-size: 28rpx;
          align-items: center;
          justify-content: center;
          color: $u-content-color;
          line-height: 1;
        }

        .plus {
          //padding: 10rpx 0;
        }
      }
    }

    .default {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;
      border-bottom: solid 2rpx $u-border-color;
      line-height: 64rpx;

      .tips {
        font-size: 24rpx;
      }

      .right {
      }
    }
  }
}
</style>
