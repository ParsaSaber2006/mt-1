import { useComponentsStore } from "./stores/componentsStore";
import PageBuilder from "./Components/PageBuilder.vue";
import Render from "./Components/Render.vue";

function createPageBuilder(vue, options) {
  vue.component("builder", PageBuilder);
  vue.component("render", Render);
}

function defineComponent(component) {
  const componentsStore = useComponentsStore();
  componentsStore.addComponent(component);
}

export { createPageBuilder, defineComponent };

export default defineNuxtPlugin(() => {})
