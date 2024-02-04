import Vue from 'vue'
import App from './App'
//本地缓存
import store from './store'
Vue.prototype.$store = store
//插件
import plugins from './plugins'
Vue.use(plugins)
//权限校验
import './permission'

import uView from "uview-ui";
Vue.use(uView);

//导入全局 底部按钮样式
import BottomCenterButton from "@/components/bottom-center-button/index.vue";
Vue.component('bottom-center-button', BottomCenterButton);
//全局事件总线
Vue.prototype.$bus = new Vue()

//注册全局 卡片样式
import MCard from "@/components/m-card/index.vue";
Vue.component('m-card', MCard);

//注册全局 卡片样式
import MPrice from "@/components/m-price/index.vue";
Vue.component('m-price', MPrice);


//注册全局 滚动窗口
import MScrollY from "@/components/m-scroll-y/index.vue";
Vue.component('m-scroll-y', MScrollY);

Vue.config.productionTip = false

Vue.prototype.navigateTo = function (url) {
    uni.navigateTo({
        url,
    });
};

Vue.prototype.showTip = function (title) {
    uni.showToast({
        title: title,
        icon: 'none'
    })
};

App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()
