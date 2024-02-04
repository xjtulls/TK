<template>
  <view class="container">
    <u-navbar :background="{backgroundColor:'#f5f5f5'}" :is-back="true" title="个人发票"></u-navbar>
    <m-card>
      <u-form border style="margin-left: 3%" :model="form" ref="uForm">
        <u-form-item label-width="200" label="姓名">
          <u-input v-model="form.realName"/>
        </u-form-item>
        <u-form-item label-width="200" label="邮箱">
          <u-input v-model="form.email"/>
        </u-form-item>
      </u-form>
    </m-card>
    <bottom-center-button @click.native="submit">保存</bottom-center-button>
  </view>
</template>

<script>

import {
  addMall_personal_invoice,
  delMall_personal_invoice,
  getMall_personal_invoice
} from "@/api/mall/mall_personal_invoice";

export default {
  data() {
    return {
      form: {realName: "", email: ""}
    }
  },
  onLoad() {
    getMall_personal_invoice(this.$store.state.user.userId).then(re => {
          if (re.data == null) {
            this.form = {realName: "", email: ""}
          } else {
            this.form = re.data
          }
        }
    )
  },
  methods: {
    submit() {
      let ids = []
      ids.push(this.$store.state.user.userId)
      delMall_personal_invoice(ids).then(re => {
        addMall_personal_invoice(this.form).then(re => {
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
