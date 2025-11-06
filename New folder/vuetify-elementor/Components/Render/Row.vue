<template>
  <v-row :class="row.layout.classes" :style="row.layout.styles" :id="row.layout.id">
    <elementor-cols :row="row" :section="section" />
  </v-row>
</template>

<script>
import ElementorCols from "./Cols.vue";

export default {
  props: ["row", "section"],
  components: { ElementorCols },
  computed: {
    style() {
      return {
        backgroundColor: this.row.layout.bgColor,
        padding:
          this.row.layout.padding.top +
          "px " +
          this.row.layout.padding.right +
          "px " +
          this.row.layout.padding.bottom +
          "px " +
          this.row.layout.padding.left +
          "px",
        margin:
          this.row.layout.margin.top +
          "px " +
          this.row.layout.margin.right +
          "px " +
          this.row.layout.margin.bottom +
          "px " +
          this.row.layout.margin.left +
          "px",
      };
    },
  },
  methods: {},
};
</script>