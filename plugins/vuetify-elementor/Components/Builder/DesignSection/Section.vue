<template>
  <section
    class="elementor-section"
    :class="section.layout.classes"
    :style="section.layout.styles"
    :id="section.layout.id"
  >
    <v-container :fluid="section.layout.fluid">
      <elementor-rows :section="section" />
    </v-container>
  </section>
</template>

<script>
import ElementorRows from "./Rows.vue";

export default {
  props: ["sections", "section", "sectionIndex"],
  components: { ElementorRows },
  computed: {
    style() {
      return {
        backgroundColor: this.section.layout.bgColor,
      };
    },
  },
  methods: {},
};
</script>