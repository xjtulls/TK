<template>
  <view class="container">
    <u-navbar :background="{backgroundColor:'#f5f5f5'}" :is-back="true" title="厂商入驻"></u-navbar>
    <m-card label="我们的联系方式">
      <u-form border style="margin-left: 3%" :model="form" ref="uForm">
        <u-form-item label-width="200" label="手机号码">
          <u-input disabled placeholder="18012175908"/>
        </u-form-item>
        <u-form-item label-width="200" label="邮箱">
          <u-input disabled placeholder="2233128678@qq.com"/>
        </u-form-item>
      </u-form>
    </m-card>
    <m-card label="合同和合作细节" style="padding-bottom: 20rpx">
      <u-button>查看合同</u-button>
      <u-button>发送邮箱</u-button>
    </m-card>
    <m-card label="您的联系方式">
      <u-form border style="margin-left: 3%" :model="form" ref="uForm">
        <u-form-item label-width="200" label="姓名">
          <u-input v-model="form.realName"/>
        </u-form-item>
        <u-form-item label-width="200" label="联系方式">
          <u-input v-model="form.phone"/>
        </u-form-item>
      </u-form>
    </m-card>
    <bottom-center-button @click.native="submit">保存</bottom-center-button>
  </view>
</template>

<script>

import UButton from "@/uview-ui/components/u-button/u-button.vue";
import {addMall_contract, delMall_contract, getMall_contract} from "@/api/mall/mall_contract";

export default {
  components: {UButton},
  data() {
    return {
      form: {realName: "", phone: ""}
    }
  },
  onShow() {
    getMall_contract(this.$store.state.user.userId).then(re => {
          if (re.data == null) {
            this.form = {realName: "", phone: ""}
          } else {
            if (re.data.status == 0) {
              this.showTip("等待审核")
            }
            if (re.data.status == 2) {
              this.showTip("审核未通过，请联系管理员")
            }
          }
        }
    )
  },
  methods: {
    submit() {
      let ids = []
      ids.push(this.$store.state.user.userId)
      delMall_contract(ids).then(re => {
        addMall_contract(this.form).then(re => {
          this.showTip("保存成功")
        })
      })
    }
  }
}
</script>

<style lang="scss">

page {
  background-color: #f5f5f5;
}

</style>
