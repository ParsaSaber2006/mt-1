<template>
  <span v-for="element in col.elements">
    <component
      :class="element.layout.classes"
      :style="element.layout.styles"
      :id="element.layout.id"
      :is="{ ...fetchElement(element).render }"
      :data="element.data"
    />
  </span>
</template>

<script>
import { useSelectedElementsStore } from "../../stores/selectedElementStore";
import { useComponentsStore } from "../../stores/componentsStore";

export default {
  props: ["section", "row", "col"],
  methods: {
    fetchElement(element) {
      const el = this.componentsStore.getElement(element.group, element.name);
      return el;
    },
  },
  computed: {
    componentsStore() {
      return useComponentsStore();
    },
  },
};
</script>