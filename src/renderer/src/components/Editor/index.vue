<template>
  <div
    :id="editorId"
    class="editor-area"
    :style="{
      width: typeof width === 'number' ? width + 'px' : width,
      height: typeof height === 'number' ? height + 'px' : height
    }"
  />
</template>

<script lang="ts" setup>
import { defineEmits, onMounted, watch } from 'vue'
import useMonaco from './index'

defineOptions({
  name: 'MonacoEditor'
})

const emit = defineEmits(['update:modelValue', 'blur'])

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: '100%'
  },
  theme: {
    type: String,
    default: 'vs-light'
  },
  language: {
    type: String,
    default: 'javascript'
  },
  editorId: {
    type: String,
    default: 'editor'
  },
  editorOptions: {
    type: Object,
    default: () => ({})
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const { createEditor, updateVal, getEditor, onFormatDoc } = useMonaco(props.language)

const updateMonacoVal = (_val?: string) => {
  const val = _val || props.modelValue
  updateVal(val)
}

watch(
  () => props.modelValue,
  (val) => {
    val !== getEditor()?.getValue() && updateMonacoVal(val)
  }
)

onMounted(() => {
  const editor = createEditor(document.querySelector(`#${props.editorId}`), {
    theme: props.theme,
    readOnly: props.readonly,
    ...props.editorOptions
  })
  updateMonacoVal()
  if (editor) {
    editor.onDidChangeModelContent(() => {
      emit('update:modelValue', editor.getValue())
    })
    editor.onDidBlurEditorText(() => {
      emit('blur')
    })
  }
})

defineExpose({
  onFormatDoc
})
</script>
