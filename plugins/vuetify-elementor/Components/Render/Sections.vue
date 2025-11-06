<template>
  <div v-for="(section, index) in contents.sections" :key="index">
    <elementor-section :section="section" />
  </div>
</template>

<script>
import ElementorSection from "./Section.vue";

export default {
  props: ["contents"],
  components: { ElementorSection },
  data(){
    return {
      drag: false,
    };
  },
  methods: {},
  watch:{
    contents:{
      deep: true,
      handler(ct){
      }
    }
  },
  mounted(){
  }
};
</script>