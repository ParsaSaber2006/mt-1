export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$filters = {
    secToMin(time, fullText = false) {
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return fullText
        ? `${minutes} دقیقه و ${seconds} ثانیه`
        : `${minutes}:${seconds}`;
    },

    dispositionToText(disposition) {
      return {
        ANSWERED: "پاسخ داده شده",
        "NOT ANSWERED": "بی پاسخ",
      }[disposition] ?? disposition;
    },
  };
});
