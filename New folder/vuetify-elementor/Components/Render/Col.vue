<template>
  <div class="col-layout">
    <elementor-elements :col="col" :row="row" :section="section">
    </elementor-elements>
  </div>
</template>

<script>
import ElementorElements from "./Elements.vue";

export default {
  props: ["col", "row", "section"],
  components: { ElementorElements },
  methods: {
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