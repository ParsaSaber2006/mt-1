<script>
export default {
  props: ["data"],
  created() { },
};
</script>

<template>
   <div v-html="data.text"></div>
</template>

<style scoped></style>