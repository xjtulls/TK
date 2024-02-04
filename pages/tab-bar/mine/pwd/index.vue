<template>
  <view>
    <u-navbar :background="{backgroundColor:'#f5f5f5'}" :is-back="true" title="修改密码"></u-navbar>
    <m-card>
      <u-form style="margin-left: 3%" ref="form" :value="user" labelWidth="80px">
        <u-form-item label="旧密码" name="oldPassword">
          <u-input v-model="user.oldPassword" placeholder="请输入旧密码" type="password"/>
        </u-form-item>
        <u-form-item label="新密码" name="newPassword">
          <u-input v-model="user.newPassword" placeholder="请输入新密码" type="password"/>
        </u-form-item>
        <u-form-item label="确认密码" name="confirmPassword">
          <u-input v-model="user.confirmPassword" placeholder="请确认新密码" type="password"/>
        </u-form-item>
      </u-form>
    </m-card>
    <bottom-center-button @click.native="submit">保存</bottom-center-button>
  </view>
</template>

<script>
import {updateUserPwd} from "@/api/system/user"

export default {
  data() {
    return {
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      rules: {
        oldPassword: {
          rules: [{
            required: true,
            errorMessage: '旧密码不能为空'
          }]
        },
        newPassword: {
          rules: [{
            required: true,
            errorMessage: '新密码不能为空',
          },
            {
              minLength: 6,
              maxLength: 20,
              errorMessage: '长度在 6 到 20 个字符'
            }
          ]
        },
        confirmPassword: {
          rules: [{
            required: true,
            errorMessage: '确认密码不能为空'
          }, {
            validateFunction: (rule, value, data) => data.newPassword === value,
            errorMessage: '两次输入的密码不一致'
          }
          ]
        }
      }
    }
  },
  onReady() {
    this.$refs.form.setRules(this.rules)
  },
  methods: {
    submit() {
      // this.$refs.form.validate().then(res => {
      updateUserPwd(this.user.oldPassword, this.user.newPassword).then(response => {
        this.$modal.msgSuccess("修改成功")
        this.$store.dispatch('LogOut').then(() => {
          uni.navigateTo({
            url: "/pages/login",
          });
        })
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
