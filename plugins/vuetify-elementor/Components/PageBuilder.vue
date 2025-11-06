<template>
  <div class="elementor-designer">
    <elementor-aside
      @save="save"
      @fromFile="fromFile"
      :contents="contents"
    ></elementor-aside>
    <v-btn @click="rtl = !rtl">dir: {{ rtl ? "rtl" : "ltr" }}</v-btn>
    <v-btn @click="resetContents">resetContents</v-btn>
    <div v-if="contents && contents.sections">
      <v-locale-provider :rtl="rtl">
        <elementor-sections :contents="contents" />
      </v-locale-provider>
    </div>
  </div>
</template>
<script>
import { useBuilderStore } from "../stores/builderStore";
import { useSelectedElementsStore } from "../stores/selectedElementStore";
import ElementorSections from "./Builder/DesignSection/Sections.vue";
import ElementorAside from "./Builder/AsideSection/Aside.vue";
import { computed } from "vue";

export default {
  components: {
    ElementorSections,
    ElementorAside,
  },
  props: ["contents", "saving"],
  provide() {
    return {
      saving: computed(() => this.saving),
    };
  },
  data: () => {
    return {
      rtl: true,
      colof: {},
    };
  },
  computed: {
    selectedElementsStore() {
      return useSelectedElementsStore();
    },
    builderStore() {
      return useBuilderStore();
    },
  },
  watch: {
    contents: {
      deep: true,
      handler(newV, oldV) {},
    },
  },
  methods: {
    resetContents() {
      this.contents.sections = [];
      this.contents.sections.push(this.builderStore.createSection());
    },
    save() {
      this.$emit("save", this.contents);
    },
    fromFile(content) {
      this.$emit("fromFile", content)
    },
  },
};
</script>

<style lang="scss">
.elementor-section,
.elementor-row,
.elementor-col,
.elementor-element {
  position: relative;
}

.elementor-actions {
  position: absolute;
  display: block;
  visibility: hidden;
  z-index: 999999999;
}

.elementor-section > .elementor-actions {
  background-color: rgba($color: blue, $alpha: 0.5);
  top: -20px;
  left: 0;
}

.elementor-row > .elementor-actions {
  background-color: rgba($color: #ff0077, $alpha: 0.5);
  top: 0px;
  left: 10px;
}

.elementor-col > .elementor-actions {
  background-color: rgba($color: #44bb44, $alpha: 0.5);
  right: 0px;
  top: -20px;
}

.elementor-element > .elementor-actions {
  background-color: rgba($color: #cc8811, $alpha: 0.5);
  right: 50px;
  top: -20px;
}

.elementor-section:hover {
  outline: 1px dashed blue;
}

.elementor-row:hover {
  outline: 1px dotted #ff0077;
}

.elementor-col:hover {
  outline: 1px dashed #44bb44;
}

.elementor-element:hover {
  outline: 2px dashed #cc8811;
}

.elementor-element:hover .elementor-element-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
}

.elementor-section:hover > .elementor-actions,
.elementor-row:hover > .elementor-actions,
.elementor-col:hover > .elementor-actions,
.elementor-element:hover > .elementor-actions {
  padding: 0px;
  visibility: visible;
}
</style>