<template>
  <div>
    <elementor-drawer @save="save" :contents="contents" @fromFile="fromFile">
      <insert-new-element :step="step" @stepChange="gotoStep"></insert-new-element>
      <edit-element :step="step" @stepChange="gotoStep"></edit-element>
      <edit-section :step="step" @stepChange="gotoStep"></edit-section>
      <edit-row :step="step" @stepChange="gotoStep"></edit-row>
      <edit-col :step="step" @stepChange="gotoStep"></edit-col>
    </elementor-drawer>
  </div>
</template>
<script>
import ElementorDrawer from "./ElementorDrawer.vue";
import InsertNewElement from "./InsertNewElement.vue";
import EditElement from "./EditElement.vue";
import EditSection from "./EditSection.vue";
import EditRow from "./EditRow.vue";
import EditCol from "./EditCol.vue";
export default {
  components: {
    ElementorDrawer,
    InsertNewElement,
    EditElement,
    EditSection,
    EditRow,
    EditCol,
  },
  props:['contents'],
  data: () => {
    return {
      step: "insert-new-element",
    };
  },
  methods: {
    gotoStep(step) {
      this.step = step;
    },
    save() {
      this.$emit("save");
    },
    fromFile(content) {
      this.$emit("fromFile",content);
    },
  },
};
</script>