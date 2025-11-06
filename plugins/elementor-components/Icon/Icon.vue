<script>
export default {
  props: ["data"],
  created() { },
  computed:{
    style(){
      return {
        'font-size': (this.data.size ?? 50) +'px !important' 
      }
    }
  },
  data: () => {
    return {
    }
  }
};
</script>

<template>
  <a :href="data.link" target="_blank">
    <v-icon :color="data.color" :style="style">{{ data.icon }}</v-icon>
</a>
 
</template>

<style scoped></style>