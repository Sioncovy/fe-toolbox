import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    children: [
      {
        path: 'json-formatter',
        name: 'json-formatter',
        component: () => import('@renderer/pages/JsonFormatter/index.vue')
      },
      {
        path: 'js-editor',
        name: 'js-editor',
        component: () => import('@renderer/pages/JSEditor/index.vue')
      },
      {
        path: 'timestamp',
        name: 'timestamp',
        component: () => import('@renderer/pages/Timestamp/index.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@renderer/pages/Setting/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
