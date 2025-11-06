

<template>
  <stepper-maker v-model="this.data.links" @save="saveList"></stepper-maker>
 

</template>

<script>
import StepperMaker from "./Maker/StepperMaker.vue";

export default {
  components: { StepperMaker },
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