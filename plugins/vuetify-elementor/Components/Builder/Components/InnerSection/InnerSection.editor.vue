<script>
import { useBuilderStore } from '../../../../stores/builderStore';
export default {
  props: ["data"],
  computed: {
    builderStore() {
      return useBuilderStore();
    }
  },
  mounted() {
    if (this.data.rows == null)
      this.data.rows = [this.builderStore.createRow()]
  }
};
</script>

<template>
  <div class="py-32"></div>
</template>
