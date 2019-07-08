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
    <van-button type="info" @click="handleCommit">提交</van-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      formdata: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async handleCommit () {
      let res = await axios({
        method: 'POST',
        url: 'http://toutiao.course.itcast.cn/app/v1_0/authorizations',
        data: this.formdata
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
