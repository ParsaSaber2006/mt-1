<template>
  <QuillEditor
    v-model="content"
    theme="snow"
    class="border rounded-x"
    style="min-height: 150px; padding: 5px"
  />
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "TextEditor",
  props: ["modelValue"],
  components: {
    QuillEditor,
  },
  data() {
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
