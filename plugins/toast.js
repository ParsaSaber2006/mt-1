import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  rtl: true,
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: "bottom-center",
};

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;
  app.use(Toast, toastOptions);
});
