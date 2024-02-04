<template>
  <view class="container">
    <u-navbar :background="{backgroundColor:'#f5f5f5'}" :is-back="true" title="编辑资料"></u-navbar>
    <m-card>
      <u-form border style="margin-left: 3%" :model="user" ref="uForm">
        <u-form-item label-width="200" label="用户昵称">
          <u-input v-model="user.nickName"/>
        </u-form-item>
        <u-form-item label-width="200" label="手机号码">
          <u-input v-model="user.phonenumber"/>
        </u-form-item>
        <u-form-item label-width="200" label="邮箱">
          <u-input v-model="user.email"/>
        </u-form-item>
        <u-form-item label-width="200" label="性别">
          <u-input v-model="user.sexLabel" type="select" @click="showSex = true"/>
        </u-form-item>
      </u-form>
      <u-select @confirm="confirmSelect" v-model="showSex" :list="sexOption"></u-select>

    </m-card>
    <bottom-center-button @click.native="submit">保存</bottom-center-button>
  </view>
</template>

<script>
import {getUserProfile, updateUserProfile} from "@/api/system/user"

export default {
  data() {
    return {
      showSex: false,
      user: {
        sexLabel: null,
        nickName: "",
        phonenumber: "",
        email: "",
        sex: ""
      },
      sexOption: [{
        label: '男',
        value: "0"
      }, {
        label: '女',
        value: "1"
      }],
      rules: {
        nickName: {
          rules: [{
            required: true,
            errorMessage: '用户昵称不能为空'
          }]
        },
        phonenumber: {
          rules: [{
            required: true,
            errorMessage: '手机号码不能为空'
          }, {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            errorMessage: '请输入正确的手机号码'
          }]
        },
        email: {
          rules: [{
            required: true,
            errorMessage: '邮箱地址不能为空'
          }, {
            format: 'email',
            errorMessage: '请输入正确的邮箱地址'
          }]
        }
      }
    }
  },
  onLoad() {
    this.getUser()
  },
  onReady() {
    // this.$refs.form.setRules(this.rules)
  },
  methods: {
    confirmSelect(e) {
      this.user.sexLabel = e[0].label
      this.user.sex = e[0].value
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        if (this.user.sex == 0) {
          this.user.sexLabel = '男'
        } else {
          this.user.sexLabel = '女'
        }
      })
    },
    submit(ref) {
      // this.$refs.form.validate().then(res => {
      updateUserProfile(this.user).then(response => {
        this.$modal.msgSuccess("修改成功")
        this.$store.commit('SET_NICKNAME', this.user.nickName); // 调用 increaseBy mutation，并传递参数 5
      })
      // })
    }
  }
}
</script>

<style lang="scss">

page {
  background-color: #f5f5f5;
}

</style>
