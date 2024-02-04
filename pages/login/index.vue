<template>
  <view class="wrap">
    <view class="top"></view>
    <view class="content">
      <view
          style="margin-left:40%;margin-bottom:5%;display:flex;justify-content: center;width: 20%;background-color: white;border-radius: 50%">
        <u-image width="120" height="120" src="/static/images/logo.png"></u-image>
      </view>
      <view class="title">欢迎登录健十商城</view>
      <u-form style="width: 100%">
        <u-form-item label="手机">
          <u-input v-model="phone"/>
        </u-form-item>
        <u-form-item v-if="loginType=='password'" label="密码">
          <u-input type="password" v-model="password"/>
        </u-form-item>
      </u-form>
      <view v-if="loginType=='sms'" class="tips">未注册的手机号验证后自动创建账号</view>
      <view @click="smsLogin" v-if="loginType=='sms'" class="bottom-center-button">
        手机号一键登录
      </view>
      <view @click="passwordLogin" v-else class="bottom-center-button">
        登录
      </view>
      <u-button style="margin-top: 5%;width: 600rpx" @click="notLogin">
        暂不登录
      </u-button>
      <view class="alternative">
        <view v-if="loginType=='sms'" class="password" @click="loginType='password'">密码登录</view>
        <view v-if="loginType=='password'" class="password" @click="loginType='sms'">验证码登录</view>
      </view>
    </view>
    <view class="bottom">
      <view>
        <u-icon @click="check" :name="url" size="50"></u-icon>
      </view>
      <view class="hint">
        登录代表同意
        <view style="display: inline-block" @click="handleUserAgrement" class="link">健十商城用户协议，</view>
        <view style="display: inline-block" @click="handlePrivacy" class="link">隐私政策，</view>
        并授权使用您的健十商城评账号信息（如昵称、头像、收获地址）以便您统一管理
      </view>
    </view>
  </view>
</template>

<script>
import UButton from "@/uview-ui/components/u-button/u-button.vue";
import config from "@/config"

export default {
  components: {UButton},
  data() {
    return {
      url: '/static/images/未选中.png',
      checked: false,
      password: null,
      loginType: 'sms',
      phone: '18012175908'
    }
  },
  computed: {},
  methods: {
    handlePrivacy() {
      let user = 'http://' + config.clientIp + '/user_agreement'
      this.navigateTo(`/pages/tab-bar/common/webview/index?url=` + user)
    },
    // 用户协议
    handleUserAgrement() {
      let user = 'http://' + config.clientIp + '/privacy_agreement'
      this.navigateTo(`/pages/tab-bar/common/webview/index?url=` + user)
    },
    check() {
      this.checked = !this.checked
      if (this.checked) {
        this.url = '/static/images/选中.png'
      } else {
        this.url = '/static/images/未选中.png'
      }
    },
    notLogin() {
      uni.navigateBack()
    },
    passwordLogin() {
      if (this.password == null) {
        this.showTip("密码不能为空！")
        return
      }
      if (this.$u.test.mobile(this.phone)) {
        this.$store.dispatch("Login", {mobile: this.phone, password: this.password})
            .then(() => {
              this.loginSuccess()
            })
      } else {
        this.showTip('请输入正确的手机号！')
      }
    },
    // 登录成功后，处理函数
    loginSuccess() {
      this.$store.dispatch('GetInfo').then((res) => {
        uni.switchTab({url: '/pages/tab-bar/index'});
      });
    },

    smsLogin() {
      if (!this.checked) {
        this.showTip('请勾选协议！')
        return
      }
      if (this.$u.test.mobile(this.phone)) {
        this.$store.dispatch("SMSLogin",
            {mobile: this.phone}).then(() => {
          this.loginSuccess()
        }).catch(() => {
          console.log("登录失败")
        });
      } else {
        this.showTip('请输入正确的手机号！')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom-center-button {
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  width: 600rpx;
  //height: 80rpx;
  line-height: 80rpx;
  background: linear-gradient(to right, #FFA500, #ff6200); /* 从左到右的橙色渐变 */
  border-radius: 60rpx;
  font-size: 30rpx;
}

.wrap {
  font-size: 28rpx;

  .content {
    width: 600rpx;
    margin: 30% auto 0;

    .title {
      text-align: left;
      font-size: 55rpx;
      font-weight: 500;
      margin-bottom: 50rpx;
    }

    input {
      text-align: left;
      margin-bottom: 10rpx;
      padding-bottom: 6rpx;
    }

    .tips {
      color: $u-type-info;
      margin-bottom: 60rpx;
      margin-top: 8rpx;
    }

    .getCaptcha {
      background-color: rgb(253, 243, 208);
      color: $u-tips-color;
      border: none;
      font-size: 30rpx;
      padding: 12rpx 0;

      &::after {
        border: none;
      }
    }

    .alternative {
      color: $u-tips-color;
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
    }
  }

  .bottom {
    margin-left: 5%;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 20%;

    .hint {
      //display: flex;
      padding: 20rpx 10rpx;
      font-size: 20rpx;
      color: $u-tips-color;

      .link {
        //width: 300rpx;
        color: $u-type-warning;
      }
    }
  }
}
</style>
