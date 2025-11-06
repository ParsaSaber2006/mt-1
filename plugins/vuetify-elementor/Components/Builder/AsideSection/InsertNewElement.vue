<template>
  <div>
    <components-list v-if="step == 'insert-new-element'"></components-list>
  </div>
</template>
  <script>
import ComponentsList from "../Components/ComponentsList.vue";

export default {
  props: ["step"],
  components: {
    ComponentsList,
  },
  computed: {},
  data: () => {
    return {};
  },
  methods: {},
};
</script>
