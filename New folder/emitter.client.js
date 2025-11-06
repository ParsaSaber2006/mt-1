// plugins/emitter.client.js
import mitt from 'mitt'
import { useToast } from 'vue-toastification'

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  const emitter = mitt()
  const toast = useToast()

  app.config.globalProperties.$mitt = emitter
  app.config.globalProperties.appDemoMode = window.APP_DEMO_MODE ?? false

  // 📣 تعریف توابع اطلاع‌رسانی
  const alert = (text = '', type = 'success', timeout = 2000) => {
    toast(text, { type, timeout })
  }

  const success = (text, timeout) => alert(text, 'success', timeout)
  const error = (text, timeout) => alert(text, 'error', timeout)
  const info = (text, timeout) => alert(text, 'info', timeout)
  const warning = (text, timeout) => alert(text, 'warning', timeout)

  // 🧩 اتصال به window (اختیاری)
  window.emitter = emitter

  // 📢 ثبت listener برای eventهای سراسری
  emitter.on('notif', (notification = {}) => {
    alert(
      notification.text ?? 'با موفقیت انجام شد',
      notification.type ?? 'success'
    )
  })

  // 📦 در اختیار همه‌ی اپ
  return {
    provide: {
      emitter,
      notify: { alert, success, error, info, warning },
    },
  }
})
