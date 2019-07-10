import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化时从本地存储获取数据
    user: auth.getUser()
  },
  mutations: {
    setUser (state, data) {
      // 设置本地存储
      auth.setUser(data)
      // 更新user数据
      state.user = data
    }
  },
  actions: {
  }
})
