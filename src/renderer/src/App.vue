<script setup lang="ts">
import Icon from '@renderer/components/common/Icon/index.vue'
import { RouterView, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <a-layout has-sider class="layout">
    <a-layout-sider bordered :width="200" breakpoint="md" collapsible>
      <a-menu :style="{ width: '100%', height: '100%' }" breakpoint="md">
        <a-menu-item key="js-editor" @click="() => router.push('/js-editor')">
          <template #icon>
            <Icon type="icon-js" />
          </template>
          <span>{{ t('menu.jsEditor') }}</span>
        </a-menu-item>
        <a-menu-item key="json-formatter" @click="() => router.push('/json-formatter')">
          <template #icon>
            <Icon type="icon-json" />
          </template>
          <span>{{ t('menu.jsonFormatter') }}</span>
        </a-menu-item>
        <a-menu-item key="timestamp" @click="() => router.push('/timestamp')">
          <template #icon>
            <Icon type="icon-shijianchuo" />
          </template>
          <span>{{ t('menu.timestamp') }}</span>
        </a-menu-item>
        <a-menu-item key="setting" @click="() => router.push('/setting')">
          <template #icon>
            <Icon type="icon-shezhi" />
          </template>
          <span>{{ t('setting') }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less">
@import './assets/css/styles.less';

.layout {
  height: 100vh;
  width: 100vw;

  .layout-content {
    min-width: 400px;
  }
}
</style>
