<template>
  <icon-font :type="type" :size="size" />
</template>

<script lang="ts" setup>
import { Icon } from '@arco-design/web-vue'

defineProps({
  type: {
    type: String,
    default: ''
  },
  size: {
    type: [String, Number],
    default: 16
  }
})

const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/c/font_4372235_l5mr5v55yg.js'
})
</script>
