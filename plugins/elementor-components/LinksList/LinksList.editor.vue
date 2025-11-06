

<template>
  <list-maker v-model="this.data.links" @save="saveList"></list-maker>
</template>

<script>
import ListMaker from "./Maker/ListMaker.vue";

export default {
  components: { ListMaker },
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