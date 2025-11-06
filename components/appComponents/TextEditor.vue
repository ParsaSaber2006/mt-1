<template >
    <light-editor
      v-model="content"
      class="border rounded-x"
      style="min-height: 150px; padding: 5px"
    />
</template>

<script >

import { defineAsyncComponent } from 'vue';

export default {
  name: "TextEditor",
  props: ["modelValue"],
  components: {
    LightEditor: defineAsyncComponent({
      loader: async () => {
        const res = await import("@hannanmiah/light-editor");
        return res["LightEditor"];
      },
    }),
  },
  data: () => {
    return {
      content: "",
    };
  },
  watch: {
    content(newVal) {
      
      this.$emit("update:modelValue", newVal);
    },
  },
  mounted() {
    this.content = this.modelValue;
  },
};
</script>