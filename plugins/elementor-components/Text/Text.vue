<script>
export default {
  props: ["data"],
  created() { },
};
</script>

<template>
  <div v-html="data.text" :style="{ 'text-align': data.align }">

  </div>
</template>

<style scoped></style>