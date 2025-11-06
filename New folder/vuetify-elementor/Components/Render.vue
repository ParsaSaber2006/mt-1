<template>
  <main  >
   <elementor-sections :contents="contents" />
  </main>
</template>

<script>
import { mapStores } from "pinia";
import { useComponentsStore } from "../stores/componentsStore";
import { useSelectedElementsStore } from "../stores/selectedElementStore";
import ElementorSections from "./Render/Sections.vue"
export default {
  props: ["contents"],
  components:{ ElementorSections },
  computed: {
    ...mapStores(useComponentsStore, useSelectedElementsStore),
  },
  watch: {
    elements: {
      handler() {
        this.reorgnizeElements();
      },
      deep: true,
    },
  },
  mounted() {
    this.selectedElementsStore.$reset();

    this.reorgnizeElements();
  },
  beforeUnmount() {
    this.selectedElementsStore.$reset();
  },
  methods: {
    reorgnizeElements(elements) {
      if (elements && elements.length) {
        for (const element of elements) {
          const component = this.componentsStore.getElement(
            element.group,
            element.name
          );
          element.component = component;
        }
      }
      return elements;
    },
  },
};
</script>

<style>
</style>