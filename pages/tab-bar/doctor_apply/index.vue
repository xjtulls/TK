<template>
  <view class="container">
    <u-navbar :background="{backgroundColor:'#f5f5f5'}" :is-back="true" title="医生入驻"></u-navbar>
    <m-card>
      <u-form border style="margin-left: 3%" :model="form" ref="uForm">
        <u-form-item label-width="200" label="姓名">
          <u-input v-model="form.realName"/>
        </u-form-item>
        <u-form-item label-width="200" label="职称">
          <u-input v-model="form.title"/>
        </u-form-item>
        <u-form-item label-width="200" label="专业领域">
          <u-input v-model="form.professionalField"/>
        </u-form-item>
        <u-form-item label-width="200" label="科室">
          <u-input v-model="form.department"/>
        </u-form-item>
        <u-form-item label-width="200" label="单位名称">
          <u-input v-model="form.companyName"/>
        </u-form-item>
        <u-form-item label-width="200" label="毕业院校">
          <u-input v-model="form.colleagueName"/>
        </u-form-item>
        <u-form-item label-width="200" label="身份证">
          <u-input v-model="form.idCard"/>
        </u-form-item>
        <u-form-item label-width="200" label="简历">
          <u-upload max-count="1" ref="resume" :action="action" :auto-upload="true" :file-list="resumeList"></u-upload>
        </u-form-item>
        <u-form-item label-width="200" label="职称证书">
          <u-upload max-count="1" ref="professionalCertificate" :action="action" :auto-upload="true"
                    :file-list="professionalCertificateList"></u-upload>
        </u-form-item>
        <u-form-item label-width="200" label="执业证书">
          <u-upload max-count="1" ref="practiceCertificate" :action="action" :auto-upload="true"
                    :file-list="practiceCertificateList"></u-upload>
        </u-form-item>
      </u-form>
    </m-card>
    <view style="display: flex;justify-content: center;margin-top: 5%">
      <u-button style="width: 60%" @click.native="submit">保存</u-button>
    </view>
  </view>
</template>

<script>

import {
  addMall_company_invoice,
  delMall_company_invoice,
  getMall_company_invoice
} from "@/api/mall/mall_company_invoice";
import {addMall_doctor, getMall_doctor} from "@/api/mall/mall_doctor";
import config from '@/config'
import UButton from "@/uview-ui/components/u-button/u-button.vue";

export default {
  components: {UButton},
  data() {
    return {
      action: config.baseUrl + '/common/upload/oss/LOCAL',
      resumeList: [],
      professionalCertificateList: [],
      practiceCertificateList: [],
      form: {
        realName: "",
        title: "",
        professionalField: "",
        department: "",
        companyName: "",
        colleagueName: "",
        resume: "",
        professionalCertificate: "",
        practiceCertificate: "",
        idCard: ""
      }
    }
  },
  onLoad() {
    getMall_doctor(this.$store.state.user.userId).then(re => {
          if (re.data == null) {
            this.form = {
              realName: "",
              title: "",
              professionalField: "",
              department: "",
              companyName: "",
              colleagueName: "",
              resume: "",
              professionalCertificate: "",
              practiceCertificate: "",
              idCard: ""
            }
          } else {
            this.form = re.data
            this.resumeList.push({url: this.form.resume})
            this.professionalCertificateList.push({url: this.form.professionalCertificate})
            this.practiceCertificateList.push({url: this.form.professionalCertificate})
          }
        }
    )
  },
  methods: {
    submit() {
      this.resumeList = this.$refs.resume.lists.filter(val => {
        return val.progress == 100;
      })
      this.professionalCertificateList = this.$refs.professionalCertificate.lists.filter(val => {
        return val.progress == 100;
      })
      this.practiceCertificateList = this.$refs.practiceCertificate.lists.filter(val => {
        return val.progress == 100;
      })
      this.form.resume = this.resumeList[0].response.url
      this.form.professionalCertificate = this.professionalCertificateList[0].response.url
      this.form.practiceCertificate = this.practiceCertificateList[0].response.url
      addMall_doctor(this.form).then(re => {
        this.showTip("保存成功")
        uni.navigateBack();
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
