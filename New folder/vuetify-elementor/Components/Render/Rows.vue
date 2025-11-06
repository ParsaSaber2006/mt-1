<template>
      <div v-for="row in section.rows">
        <elementor-row :row="row" :section="section" />
      </div>
</template>

<script>
import ElementorRow from "./Row.vue";
import draggable from "vuedraggable";

export default {
  props: ["section"],
  components: { ElementorRow },
  methods: {
   
  },
};
</script>