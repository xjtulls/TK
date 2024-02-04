<script>
import config from './config'
import {getToken} from '@/utils/auth'
import Vue from 'vue'
import store from "@/store";
import {userTabbar} from "@/utils/tabbar";

export default {
  created() {
    // #ifdef APP-PLUS
    plus.navigator.closeSplashscreen();
    // #endif
  },
  onLaunch: function () {
    this.initApp()
    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform === 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        ;
        // #endif
        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      }
    })
  },
  methods: {
    initConnect() {
      uni.connectSocket({
        url: config.websocketUrl + store.state.user.userId,
      })
      uni.onSocketMessage((re) => {
        this.$bus.$emit('message', re.data)
      })
    },
    // 初始化应用
    initApp() {
      // 初始化应用配置
      this.initConfig()
      // 检查用户登录状态
      // this.checkLogin()
      //websocket保活
      this.checkWebsocket()
    },
    initConfig() {
      this.globalData.config = config
      this.$store.dispatch('ChangeTabBar',userTabbar)
    },
    checkWebsocket() {
      setInterval(() => {
        if (getToken()) {
          uni.sendSocketMessage({
            data: 'PING',
            fail: err => {
              uni.connectSocket({
                url: config.websocketUrl + store.state.user.userId,
              })
              uni.onSocketMessage((re) => {
                this.$bus.$emit('message', re.data)
              })
            }
          })
        }
      }, 3000);

    },
    checkLogin() {
      if (!getToken()) {
        this.$tab.reLaunch('/pages/login/index')
      }
    }
  }
}
</script>

<style lang="scss">

.page {
  background-color: #F3F3F3;
  font-size: 28rpx;
}

@import "uview-ui/index.scss";
@import '@/static/scss/index.scss';
@import "static/style/base.scss";

</style>
