import Vue from 'vue'
import App from './App.vue'// 根界面
import router from './router'// 路由
import store from './store'// vuex
import Vant from 'vant'// vant-ui
import 'vant/lib/index.css'// vant,css样式文件
import 'amfe-flexible'// 设置rem基准
import './style/index.less'// 全局样式
import zhCN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, {// 表单验证
  Validator
} from 'vee-validate'

Vue.use(VeeValidate)

Validator.localize('zh_CN', zhCN)

Vue.use(Vant)// 挂载vant-ui

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
