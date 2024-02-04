<template>
  <view class="wrap">
    <u-navbar :is-back="true" title="验证码"></u-navbar>
    <view class="key-input">
      <view class="title">输入验证码</view>
      <view class="tips">验证码已发送至 +{{ phone }}</view>
      <u-message-input :focus="true" :value="inputCode" @change="change" @finish="finish" mode="bottomLine"
                       :maxlength="maxlength"></u-message-input>
      <text :class="{ error: error }">验证码错误，请重新输入</text>
      <view class="captcha">
        <text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到验证码点这里</text>
        <text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
      </view>
      <u-action-sheet @click="click" :list="actionList" v-model="showReGetCode"></u-action-sheet>
    </view>
  </view>
</template>

<script>
import {getSmsCode} from "@/api/login";

export default {
  data() {
    return {
      uuid: null,
      actionList: [{text: '重新获取验证码'},],
      showReGetCode: false,
      phone: null,
      maxlength: 4,
      inputCode: '',
      second: 3,
      show: false,
      error: false,
      realCode: null
    };
  },
  onLoad(option) {
    this.phone = option.phone
    this.realCode = option.code
    this.uuid = option.uuid
    this.getCode()
  },
  methods: {
    click(index) {
      this.getCode()
    },
    getCode() {
      getSmsCode(this.phone).then(re => {
        if (re.code == 200) {
          this.realCode = re.data.code;
          this.uuid = re.uuid
          this.showTip('信息发送成功！')
          this.second = 3
          this.show = false
          let interval = setInterval(() => {
            this.second--;
            if (this.second <= 0) {
              this.show = true;
              clearInterval(interval);
            }
          }, 1000);
        }
      })
    },
    noCaptcha() {
      this.showReGetCode = true
    },
    change() {
      this.error = false
    },
    finish(value) {
      if (value != this.realCode) {
        this.error = true
      } else {
        this.$store.dispatch("SMSLogin",
            {mobile: this.phone, smsCode: this.realCode, uuid: this.uuid}).then(() => {
          this.loginSuccess()
        }).catch(() => {
          console.log("登录失败")
        });
      }
    },
    // 登录成功后，处理函数
    loginSuccess() {
      this.$store.dispatch('GetInfo').then((res) => {
        uni.switchTab({url: '/pages/tab-bar/index'});
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 80rpx;
}

.box {
  margin: 30rpx 0;
  font-size: 30rpx;
  color: #555;
}

.key-input {
  padding: 30rpx 0;

  text {
    display: none;
  }

  .error {
    display: block;
    color: red;
    font-size: 30rpx;
    margin: 20rpx 0;
  }
}

.title {
  font-size: 50rpx;
  color: #333;
}

.key-input .tips {
  font-size: 30rpx;
  color: #333;
  margin-top: 20rpx;
  margin-bottom: 60rpx;
}

.captcha {
  color: $u-type-warning;
  font-size: 30rpx;
  margin-top: 40rpx;

  .noCaptcha {
    display: block;
  }

  .regain {
    display: block;
  }
}
</style>
