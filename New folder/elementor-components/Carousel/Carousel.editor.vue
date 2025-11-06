

<template>
  <carousel-maker v-model="this.data.links" @save="saveList"></carousel-maker>
  <v-checkbox v-model="data.show_arrows" label="نشانگرها با آمدن ماوس ظاهر شوند"></v-checkbox>
</template>

<script>
import CarouselMaker from "./Maker/CarouselMaker.vue";

export default {
  components: { CarouselMaker },
  props: ["data"],
  data() {
    return {
      listDialog: false,
    };
  },
  methods: {
    openLinksDialog() {
      this.listDialog = true;
    },
  },
  created() {
  },
};
</script>