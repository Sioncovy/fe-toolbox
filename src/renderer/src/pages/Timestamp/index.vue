<script setup lang="ts">
import dayjs from '@renderer/utils/time'
// import dayjs from 'dayjs'
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// 当前时间戳
const now = ref(0)
const timestamp = ref('')
const timeType = ref<'s' | 'ms'>('ms')
const timeType2 = ref<'s' | 'ms'>('ms')
const isPlay = ref(true)
const timezone = ref('')

// 类型为定时器
const time = ref<NodeJS.Timeout | null>(null)

const handleStart = () => {
  if (!isPlay.value && time.value && timeType.value) {
    clearInterval(time.value)
  } else {
    time.value = setInterval(() => {
      if (timeType.value === 's') {
        now.value = dayjs().unix()
      } else {
        now.value = dayjs().valueOf()
      }
    }, 1)
  }
}

onMounted(() => {
  handleStart()
})

watch(timeType, (val) => {
  if (val === 's') {
    now.value = dayjs().unix()
  } else {
    now.value = dayjs().valueOf()
  }
})
</script>

<template>
  <div class="container">
    <a-space>
      <div>{{ t('currentTime') }}:</div>
      <div :style="{ width: '120px' }">{{ now }}</div>
      <div>
        {{
          timeType === 'ms'
            ? dayjs(now).format('YYYY-MM-DD HH:mm:ss')
            : dayjs.unix(now).format('YYYY-MM-DD HH:mm:ss')
        }}
      </div>
      <a-select
        v-model="timeType"
        :style="{ width: '120px' }"
        :placeholder="t('timestampPage.timeTypePlaceholder')"
      >
        <a-option value="s">{{ t('second') }}</a-option>
        <a-option value="ms">{{ t('millisecond') }}</a-option>
      </a-select>
      <a-button
        @click="
          () => {
            isPlay = !isPlay
            handleStart()
          }
        "
        >{{ isPlay ? t('stop') : t('start') }}</a-button
      >
    </a-space>

    <a-space>
      <div>{{ t('timestampFormat') }}:</div>
      <a-input v-model="timestamp" />
      <a-select
        v-model="timeType2"
        :style="{ width: '120px' }"
        :placeholder="t('timestampPage.timeTypePlaceholder')"
      >
        <a-option value="s">{{ t('second') }}</a-option>
        <a-option value="ms">{{ t('millisecond') }}</a-option>
      </a-select>
      <a-select
        v-model="timezone"
        :style="{ width: '140px' }"
        :placeholder="t('timestampPage.timezonePlaceholder')"
      >
        <a-option value="">{{ t('local') }}</a-option>
        <a-option value="America/New_York">{{ t('city.ny') }}</a-option>
        <a-option value="Asia/Shanghai">{{ t('city.sh') }}</a-option>
        <a-option value="Europe/London">{{ t('city.ld') }}</a-option>
      </a-select>
      <div>
        {{
          timestamp &&
          (timeType2 === 'ms'
            ? dayjs(Number(timestamp))
                .tz(timezone || dayjs.tz.guess())
                .format('YYYY-MM-DD HH:mm:ss')
            : dayjs
                .unix(Number(timestamp))
                .tz(timezone || dayjs.tz.guess())
                .format('YYYY-MM-DD HH:mm:ss'))
        }}
      </div>
    </a-space>
  </div>
</template>

<style lang="less" scoped>
.container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
