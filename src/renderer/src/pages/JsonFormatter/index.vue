<script setup lang="ts">
import Editor from '@renderer/components/Editor/index.vue'
import { useStore } from '@renderer/store'
import { copyToClipboard } from '@renderer/utils'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const store = useStore()
const { jsonCode: code, jsonResult: result } = storeToRefs(store)

const editor = ref()
const viewer = ref()

const editorRef = ref()
const containerRef = ref()
const height = ref(0)
const fullWidth = ref(0)

const getSize = () => {
  height.value = editorRef.value.clientHeight
  fullWidth.value = containerRef.value.clientWidth - 48
}

onMounted(() => {
  window.onresize = () => {
    getSize()
  }
  getSize()
})

const updateMonacoVal = (_val?: string) => {
  const val = _val || code.value
  result.value = val
  viewer.value?.onFormatDoc()
}

const onClearOutput = () => {
  code.value = ''
}
</script>

<template>
  <div ref="containerRef" class="container">
    <div class="block">
      <div class="edit-toolbar">
        <div class="title">{{ t('input') }}</div>
        <a-space>
          <a-button type="primary" size="mini" @click="onClearOutput">{{ t('clear') }}</a-button>
        </a-space>
      </div>
      <div ref="editorRef" class="editor">
        <Editor
          ref="editor"
          v-model="code"
          editor-id="js-editor"
          :height="height"
          :width="fullWidth / 2 - 10"
          language="json"
          @update:model-value="updateMonacoVal"
        />
      </div>
    </div>
    <div class="block">
      <div class="edit-toolbar">
        <div class="title">{{ t('output') }}</div>
        <a-space>
          <a-button type="primary" size="mini" @click="copyToClipboard(result)">{{
            t('copy')
          }}</a-button>
        </a-space>
      </div>
      <div class="editor">
        <Editor
          ref="viewer"
          v-model="result"
          language="json"
          editor-id="result-shower"
          :height="height"
          :width="fullWidth / 2 - 10"
          readonly
          @update:model-value="updateMonacoVal"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 24px;
  height: 100%;
  box-sizing: border-box;

  .block {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .editor {
    flex: 1;
    border: 1px solid #ccc;
  }

  .edit-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
