<template>
  <div class="col-layout">
    <elementor-elements :col="col" :row="row" :section="section">
    </elementor-elements>
    <div
      class="pa-2 col-drop-zone"
      @drop="dropElement($event, col)"
      @dragover.prevent
      @dragenter.prevent
    ></div>
  </div>
</template>

<script>
import { useSelectedElementsStore } from "../../../stores/selectedElementStore";
import { useComponentsStore } from "../../../stores/componentsStore";
import ElementorElements from "./Elements.vue";

export default {
  props: ["col", "row", "section"],
  components: { ElementorElements },
  computed: {
    selectedElementsStore() {
      return useSelectedElementsStore();
    },
    componentsStore() {
      return useComponentsStore();
    },
  },
  methods: {
    dropElement(ev, col2) {
      let data = ev.dataTransfer.getData("element2");
      if (!data) return;

      let elementEx = JSON.parse(data);

      col2.elements.push(elementEx);
      emitter.emit("elementor.editElement", { element: elementEx });
    },
  },
};
</script>

<style scoped>
.elementor-col:hover .col-drop-zone {
  display: block;
}

.col-drop-zone {
  outline: 1px dashed #888;
}
</style>