import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      vitePluginForArco({
        style: 'css'
      }),
      AutoImport({
        resolvers: [ArcoResolver()]
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      })
    ],
    optimizeDeps: {
      include: [
        `monaco-editor/esm/vs/language/json/json.worker`,
        `monaco-editor/esm/vs/language/css/css.worker`,
        `monaco-editor/esm/vs/language/html/html.worker`,
        `monaco-editor/esm/vs/language/typescript/ts.worker`,
        `monaco-editor/esm/vs/editor/editor.worker`
      ]
    }
  }
})
