<script>
export default {
  props: ["data"],
  computed: {
    links() {
      return this.data.links;
    },
  },
  created() { },
};
</script>

<template>
  <div>
    <v-carousel   :show-arrows="data.show_arrows?'hover':''">
  <v-carousel-item v-for="(link, index) in links" :key="index" class=""
    :src="link.image_url"
    cover
  ></v-carousel-item>
</v-carousel>

  </div>
  
</template>

<style scoped></style>