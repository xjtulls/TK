<template>
  <view class="container">
    <u-navbar :background="{backgroundColor:'#f5f5f5'}" :is-back="true" title="售后"></u-navbar>
    <m-card>
      <u-form border style="margin-left: 3%" :model="form" ref="uForm">
        <u-form-item label-width="200">
          <u-input type="textarea" placeholder="请您提供您遇到的产品问题" v-model="form.problem"/>
        </u-form-item>
        <u-form-item label-width="200">
          <u-input type="textarea" placeholder="请您提供产品使用前后的数据变化" v-model="form.difference"/>
        </u-form-item>
        <u-form-item label-width="200">
          <u-upload max-count="1" ref="image" :action="action" :auto-upload="true"
                    :file-list="images"></u-upload>
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
import config from "@/config";
import {addMall_doctor} from "@/api/mall/mall_doctor";
import {addMall_after_sale, delMall_after_sale, getMall_after_sale} from "@/api/mall/mall_after_sale";

export default {
  data() {
    return {
      orderId: null,
      action: config.baseUrl + '/common/upload/oss/LOCAL',
      images: [],
      form: {
        problem: "",
        difference: "",
        image: "",
      }
    }
  },
  onLoad(options) {
    this.orderId = options.orderId
    getMall_after_sale(this.orderId).then(re => {
      if (re.data == null) {
        this.form = {
          problem: "",
          difference: "",
          image: "",
        }
      } else {
        this.form = re.data
        this.images.push({url: this.form.image})
      }
    })
  },
  methods: {
    submit() {
      this.images = this.$refs.image.lists.filter(val => {
        return val.progress == 100;
      })
      this.form.image = this.images[0].response.url
      let ids = []
      ids.push(this.orderId)
      delMall_after_sale(ids).then(re => {
        this.form.orderId = this.orderId
        addMall_after_sale(this.form).then(re => {
          this.showTip("保存成功")
          // uni.navigateBack();
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
