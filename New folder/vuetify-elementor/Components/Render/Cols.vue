<template>
  <v-col
    v-for="col in row.cols"
    :key="col"
    :cols="col.layout?.width?.cols"
    :sm="col.layout?.width?.sm"
    :md="col.layout?.width?.md"
    :lg="col.layout?.width?.lg"
    :xl="col.layout?.width?.xl"
    :class="col.layout.classes"
    :id="col.layout.id"
    :style="col.layout.styles"
  >
    <elementor-col :col="col" :row="row" :section="section" />
  </v-col>
</template>

<script>
import ElementorCol from "./Col.vue";

export default {
  props: ["section", "row"],
  components: { ElementorCol },
  methods: {},
  computed: {},
};
</script>