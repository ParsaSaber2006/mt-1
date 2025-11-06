<script>
export default {
  props: ["data"],
  created() {},
  data: () => {
    return {};
  },
};
</script>

<template>
  <v-btn
    :color="data.color"
    :to="data.action.type == 'innerUrl' ? data.action.href : '' "
    :href="data.action.type != 'innerUrl' ? data.action.href : '' "
    :variant="data.type"
    :rounded="data.rounded"
    >{{ data.text }}</v-btn
  >
</template>

<style scoped></style>