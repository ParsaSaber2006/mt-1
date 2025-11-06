<script>
import ElementorRowsDesigner from "../../DesignSection/Rows.vue";
import ElementorRowsRender from "../../../Render/Rows.vue";
export default {
  props: ["data"],
  data() {
    return {
      rootEl: null,
    };
  },
  components: { ElementorRowsDesigner, ElementorRowsRender },
  computed: {
    isDesignMode() {
      if (!this.rootEl) return false;

      return this.hasSomeParentTheClass(this.rootEl, "elementor-designer")
        ? true
        : false;
    },
  },
  methods: {
    hasSomeParentTheClass(element, classname) {
      if (element.tagName == "HTML") return false;

      if (element.className.split(" ").indexOf(classname) >= 0) return true;
      return (
        element.parentNode &&
        this.hasSomeParentTheClass(element.parentNode, classname)
      );
    },
  },
  mounted() {
    this.rootEl = this.$refs.rootDiv;
  },
};
</script>

<template>
  <div class="py-5" ref="rootDiv">
   

    <elementor-rows-designer 
      v-if="data.rows != null && isDesignMode"
      :section="{ rows: [...this.data.rows] }"
    ></elementor-rows-designer>
    <elementor-rows-render 
      v-if="data.rows != null && !isDesignMode"
      :section="{ rows: [...this.data.rows] }"
    ></elementor-rows-render>
  </div>
</template>

<style scoped></style>