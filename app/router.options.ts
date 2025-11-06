// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

export default {
  routes: (_routes) => [
    {
      name: 'hme',
      path: '/',
      component: () => import('../pages/publics/home/Home.vue')
      // component: () => import('../pages/index.vue')
    },
  ],
} satisfies RouterConfig