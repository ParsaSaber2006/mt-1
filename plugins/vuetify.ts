import { defineNuxtPlugin } from 'nuxt/app'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import themes from './vuetifyThemes' 

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes,               
        },
  })

  nuxtApp.vueApp.use(vuetify)
})
