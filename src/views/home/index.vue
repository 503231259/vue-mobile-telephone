<template>
  <div>
    <van-nav-bar
      title="首页"
    />
    <van-tabs v-model="activeChannelIndex">
      <van-tab :title="item.name" v-for="item in channel" :key="item.id">
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
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    async channelListGain () {
      let channelList1 = await channelList()
      console.log(channelList1.data.data.channels)
      this.channel = channelList1.data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>
