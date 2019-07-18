<template>
  <div>
    <van-nav-bar title="首页" fixed/>
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <van-tab
      v-for="channelItem in channel"
      :key="channelItem.id"
      :title="channelItem.name"
      >
        <van-pull-refresh
        v-model="channelItem.downPullLoading"
        @refresh="onRefresh"
        :success-text="channelItem.downPullSuccessText"
        :success-duration="1000"
        >
          <van-list
           v-model="channelItem.upPullLoading"
           :finished="channelItem.upPulFinished"
           finished-text="没有更多了"
           @load="onLoad"
          >
            <van-cell
              v-for="item in activeChannel.articles"
              :key="item.art_id"
              :title="item.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
// 引入频道列表接口
import { channelList } from '@/api/channel.js'
import { getArticles } from '@/api/article'
export default {
  name: 'home',
  data () {
    return {
      activeChannelIndex: 0,
      // 上拉
      list: [], // 循环的数据
      loading: false,
      finished: false,
      // 下拉
      isLoading: false,
      // 频道
      channel: []
    }
  },
  created () {
    // console.log('123')
    this.channelListGain()
  },

  computed: {
    // 当前频道的内容
    activeChannel () {
      return this.channel[this.activeChannelIndex]
    }
  },

  watch: {
    // 监听Vuex的user
    '$store.state.user' () {
      console.log('a')
      // 改变,重新获取频道列表
      this.channelListGain()
      // 上拉组件是有触发条件的,就是loading为true,就会自动加载数据填满屏幕
      this.activeChannel.upPullLoading = true
    }
  },

  methods: {
    /**
     * 上拉加载更多,push数据
     * 请求数据
     */
    async onLoad () {
      // 缓冲时间
      await this.$sleep(800)
      let data = null
      // 获取数据,里面有个假设的时间戳
      data = await this.loadArticles()
      // 判断有没有数据了,条件是没有时间戳和没有数据
      if (!data.pre_timestamp && !data.results.length) {
        // 没有数据后,设置数据加载完毕,给出提示
        this.activeChannel.upPullFinished = true
        // 取消loading
        this.activeChannel.upPullLoading = false
        return
      }
      // console.log(data)
      // 解决初始化,没有数据的时候,返回的数据有时间戳,但是没有数据时
      // 为啥没有数据,因发送的事件戳不正确
      if (data.pre_timestamp && !data.results.length) {
        // 用后台返回的真时间戳去请求数据和下一次的事件戳
        this.activeChannel.timestamp = data.pre_timestamp
        data = await this.loadArticles()
      }
      // console.log(data.results)
      // 改变时间戳,用于下次请求用的时间戳
      this.activeChannel.timestamp = data.pre_timestamp
      // 当前的频道列表赋值
      this.activeChannel.articles.push(...data.results)
      // 数据加载完,取消loading
      this.activeChannel.upPullLoading = false
    },

    /**
     * 下拉刷新数据,重置列表数据
     */
    async onRefresh () {
      /**
       * 备份一下现在有的事件戳,
       * 因:如果没有数据的话,还是要用到这个时间戳用来刷新下一页数据的
       */
      const timestamp = this.activeChannel.timestamp
      // 备份完毕后,修改时间戳为当前时间
      this.activeChannel.timestamp = Date.now()
      // 发送请求的时间戳是当前时间的
      const data = await this.loadArticles()
      // console.log(data)
      if (data.results.length) {
        // 如果有新的数据,就覆盖原来的数据
        this.activeChannel.articles = data.results
        // 把新的数据中的时间戳更新
        this.activeChannel.timestamp = data.pre_timestamp
        this.activeChannel.downPullSuccessText = '更新成功'
        // 当刷新不满一屏,继续加载数据
        this.onload()
      } else {
        this.activeChannel.downPullSuccessText = '已是最新数据'
      }
      // 下拉刷新结束,取消loading状态
      this.activeChannel.downPullLoading = false
      /**
       * 下拉刷新后,恢复原来上拉的时间戳,上拉的时候就直接用了(获取下一页)
       * 不论下拉刷新有没有数据,都要把保存的时间戳恢复过来,
       */
      this.activeChannel.timestamp = timestamp
    },

    /**
     * 获取频道列表
     */
    async channelListGain () {
      // 获取用户登录信息
      let { user } = this.$store.state
      // 用来后期扩展满足我们需求的元素
      let channel = []

      if (user) {
        // 用户登录,获取用户的频道列表
        let channelList1 = await channelList()
        channel = channelList1.channels
      } else {
        // 获取没登录的本地存储
        let localChannels = JSON.parse(window.localStorage.getItem('channels'))
        // 先看没登录用户有没有本地存储
        if (localChannels) {
          channel = localChannels
        } else {
          // 没有本地存储,获取未登录的频道列表
          let channelList2 = await channelList()
          // console.log(channelList2)
          channel = channelList2.channels
        }
      }
      /**
       * 对原始数据做改造
       * 修改channel,将这个数据结构修改为满做我们使用的需求
       */
      channel.forEach(item => {
        // 注意: 添加的属性都是当前频道
        item.articles = [] // 用来储存当前文章的列表
        item.timestamp = Date.now() // 时间戳
        item.downPullLoading = false // 控制当前频道的下拉刷新loading状态
        item.upPullLoading = false // 控制当前频道上拉加载loading状态
        item.upPullFinished = false // 控制当前频道数据是否加载完毕
      })
      this.channel = channel
    },

    /**
     * 拿到下一页数据
     */
    async loadArticles () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId, // 频道
        timestamp, // 时间戳
        withTop: 1 // 置顶
      })
      // console.log(data)
      return data
    }
  }
}
</script>

<style lang="less" scoped>
.channel-tabs {
  margin-bottom: 100px;
}
// 深度作用选择器：https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 100px;
}
</style>
