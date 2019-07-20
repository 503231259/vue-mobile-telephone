<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '95%' }"
  >
    <div @click="$emit('input',false)">
      <van-icon name="clear" />
    </div>
    <!-- 我的频道 -->
    <div>
      <div class="fontSize">
        <div>
          <span>我的频道</span>
          <span>点击进入频道</span>
        </div>
        <div>
          <button>编辑</button>
        </div>
      </div>
      <div>
        <van-grid
        :column-num="4"
        :gutter="10"
        clickable
        >
          <van-grid-item
            v-for="(item, index) in channel"
            :key="item.id"
          >
            <span
            slot="text"
            class="asd"
            :class="{ red: index === activeChannelIndex, }"
            >{{ item.name }}
            </span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- /我的频道 -->

    <!-- 所有频道 -->
    <div>
      <div class="fontSize">
          <span>所有频道</span>
      </div>
      <div>
        <van-grid
        :column-num="4"
        :gutter="10"
        clickable
        >
          <van-grid-item
            v-for=" item in recommendChannels "
            :key="item.id"
          >
            <span
            slot="text"
            class="asd"
            >{{ item.name }}
            </span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- /所有频道 -->
  </van-popup>
</template>

<script>
import { channelAll } from '@/api/channel'
export default {
  name: 'homeChannel',
  data () {
    return {
      channelAlldata: []
    }
  },
  props: {
    value: {
      type: Boolean,
      defaylt: false
    },
    channel: {
      type: Array,
      defaylt: () => []
    },
    activeChannelIndex: {
      type: Number,
      defaylt: 0
    }
  },

  created () {
    this.channelAll()
  },

  computed: {
    recommendChannels () {
      // 保存用户频道的id
      let itemID = this.channel.map(item => item.id)

      // 返回一个过滤好的数组
      return this.channelAlldata.filter(item => {
        // 循环 channelAlldata 每一项,回调函数的return返回boolean值,需求是循环到用户频道返回false,其他的为true
        // 用id为条件
        return !itemID.includes(item.id)
      })
    }
  },

  methods: {
    // 获取所有频道列表
    async channelAll () {
      let data = await channelAll()
      // console.log(data)
      this.channelAlldata = data.channels
    }
  }
}
</script>
<style lang="less" scoped>
.fontSize {
  font-size: 40px;
  display: flex;
  justify-content: space-between;
}
.red {
  color: red;
  font-size: 30px;
}
.fontSize /deep/ span {
    font-size: 25px;
  }
  .asd{
    font-size: 25px;
  }
</style>
