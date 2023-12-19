<script setup lang="ts">
import { useStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()
const { settings } = storeToRefs(store)
</script>

<template>
  <div class="container">
    <a-form :model="settings">
      <a-form-item :label="t('language')" field="language">
        <a-select
          v-model="$i18n.locale"
          :style="{ width: '120px' }"
          :placeholder="t('settingPage.languagePlaceholder')"
        >
          <a-option value="zh">简体中文</a-option>
          <a-option value="en">English</a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.container {
  padding: 24px;
}
</style>
