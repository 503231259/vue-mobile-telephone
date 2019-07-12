<template>
  <div>
    <van-nav-bar title="首页" fixed/>
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <van-tab v-for="item in channel" :key="item.id" :title="item.name">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
           v-model="loading"
           :finished="finished"
           finished-text="没有更多了"
           @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
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
export default {
  name: 'home',
  data () {
    return {
      activeChannelIndex: 0,
      // 上拉
      list: [],
      loading: false,
      finished: false,
      // 下拉
      isLoading: false,
      // 频道
      channel: []
    }
  },
  created () {
    this.channelListGain()
  },
  methods: {
    // 上拉下拉
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
        console.log(this.list)
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    // 获取频道列表
    async channelListGain () {
    // 获取频道列表
      let channelList1 = await channelList()
      // console.log(channelList1)
      this.channel = channelList1.data.data.channels
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
