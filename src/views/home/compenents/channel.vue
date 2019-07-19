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
    <!-- 头 -->
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
  </van-popup>
</template>

<script>
export default {
  name: 'homeChannel',
  data () {
    return {
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
    font-size: 30px;
  }
  .asd{
    font-size: 30px;
  }
</style>
