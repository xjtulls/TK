<template>
  <view class="container">
    <u-navbar :background="{backgroundColor:'#f5f5f5'}" :is-back="true" title="公司发票"></u-navbar>
    <m-card>
      <u-form border style="margin-left: 3%" :model="form" ref="uForm">
        <u-form-item label-width="200" label="公司名称">
          <u-input v-model="form.companyName"/>
        </u-form-item>
        <u-form-item label-width="200" label="公司地址">
          <u-input v-model="form.address"/>
        </u-form-item>
        <u-form-item label-width="200" label="单位电话">
          <u-input v-model="form.companyPhone"/>
        </u-form-item>
        <u-form-item label-width="200" label="银行名称">
          <u-input v-model="form.bankName"/>
        </u-form-item>
        <u-form-item label-width="200" label="账户">
          <u-input v-model="form.bankAccount"/>
        </u-form-item>
        <u-form-item label-width="200" label="邮箱">
          <u-input v-model="form.email"/>
        </u-form-item>
        <u-form-item label-width="200" label="纳税人识别号">
          <u-input v-model="form.identityNumber"/>
        </u-form-item>
      </u-form>
    </m-card>
    <bottom-center-button @click.native="submit">保存</bottom-center-button>
  </view>
</template>

<script>

import {
  addMall_company_invoice,
  delMall_company_invoice,
  getMall_company_invoice
} from "@/api/mall/mall_company_invoice";

export default {
  data() {
    return {
      form: {
        companyName: "",
        address: "",
        companyPhone: "",
        bankName: "",
        bankAccount: "",
        email: "",
        identityNumber: ""
      }
    }
  },
  onLoad() {
    getMall_company_invoice(this.$store.state.user.userId).then(re => {
          if (re.data == null) {
            this.form = {
              companyName: "",
              address: "",
              companyPhone: "",
              bankName: "",
              bankAccount: "",
              email: "",
              identityNumber: ""
            }
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
      delMall_company_invoice(ids).then(re => {
        addMall_company_invoice(this.form).then(re => {
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
