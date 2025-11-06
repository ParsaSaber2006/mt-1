

<template>
  <slider-maker v-model="this.data.links" @save="saveList"></slider-maker>
 

</template>

<script>
import SliderMaker from "./Maker/SliderMaker.vue";

export default {
  components: { SliderMaker },
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