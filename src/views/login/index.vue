<template>
  <div>
    <van-nav-bar
      title="标题"
    />
    <van-cell-group>
      <van-field
        v-model="formdata.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
        v-validate="'required|digits:11'"
        name="mobile"
        :error-message="errors.first('mobile')"
      />
      <!-- <span>{{ errors.first('digits_field') }}</span> -->
      <van-field
        v-model="formdata.code"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <div class="commitDiv">
      <van-button
      type="info"
      @click="handleCommit"
      class="btn"
      :loading="isloading"
      >提交</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import { setUser } from '@/utils/auth.js'
export default {
  name: 'login',
  data () {
    return {
      formdata: {
        mobile: '13351234766',
        code: '246810'
      },
      isloading: false
    }
  },
  created () {
    // 覆盖验证信息提示为中文
    this.VerificationInformationPrompt()
  },
  methods: {
    async handleCommit () {
      console.log(this.formdata)
      try {
        let res = await login(this.formdata)
        // console.log(res.data.data)
        let data = res.data.data.token
        // token设置本地储存
        setUser(data)
        // token保存到vuex
        this.$store.commit('setUser', data)
      } catch (error) {
        console.log(error)
      }
    },
    // 验证信息提示
    VerificationInformationPrompt () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空',
            digits: '输入十一位'
          }
        }
      }
      // zh_CN是中文
      this.$validator.localize('zh_CN', dict)
    }
  }
}
</script>

<style lang="less" scoped>
.commitDiv {
  // width: 355px;
  padding: 10px;
  .btn {
    width: 100%;
  }
}
</style>
