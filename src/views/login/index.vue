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
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="formdata.code"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <div class="commitDiv">
      <van-button type="info" @click="handleCommit" class="btn">提交</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'login',
  data () {
    return {
      formdata: {
        mobile: '13351234766',
        code: '123456'
      }
    }
  },
  methods: {
    async handleCommit () {
      console.log(this.formdata)
      try {
        let res = await login(this.formdata)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
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
