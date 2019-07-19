<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '95%' }"
  />
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
    }
  }
}
</script>
