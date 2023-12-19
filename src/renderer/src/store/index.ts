import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Languages } from '@renderer/types'

export const useStore = defineStore('counter', () => {
  const jsCode = ref('')
  const jsResult = ref('')
  const jsonCode = ref('')
  const jsonResult = ref('')
  const settings = ref<{
    language: Languages
  }>({
    language: 'zh'
  })

  return { jsCode, jsResult, jsonCode, jsonResult, settings }
})
