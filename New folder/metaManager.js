export default defineNuxtPlugin(() => {
  return {
    provide: {
      meta: {
        setTitle(title) {
          useHead({ title })
        },
        setMeta(description) {
          useHead({
            meta: [{ name: 'description', content: description }]
          })
        }
      }
    }
  }
})
