<template>
  <div>
    <v-col v-if="!row.cols || row.cols.length == 0"></v-col>
    <elementor-cols :row="row" :section="section" />
  </div>
</template>

<script>
import ElementorCols from "./Cols.vue";

export default {
  props: ["row", "section"],
  components: { ElementorCols },
  computed: {
  },
  methods: {
  },
};
</script>