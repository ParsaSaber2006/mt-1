

<template>
  <panel-maker v-model="this.data.links" @save="saveList"></panel-maker>

  <v-row>
    <v-col cols="4">
        <label for="select" class="mb-2">نحوه باز شدن</label>
    </v-col>
    <v-col cols="8">
        <v-select v-model="data.variant" :items="['accordion', 'inset', 'popout']" dense></v-select>
    </v-col>
</v-row>
</template>


<script>
import PanelMaker from "./Maker/PanelMaker.vue";

export default {
  components: { PanelMaker },
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