<template>
  <v-container class="home">
    <v-row>
      <v-col class="pa-0">
        <v-sheet class="pa-0">
          <h3>{{ data.title }}</h3>
          <h4 class="text-grey">
            {{ data.description }}
          </h4>
          <template v-if="data.type">
            <categories-box :data="data.class_box"></categories-box>
          </template>
          <template v-else>
            <categories-list></categories-list>
          </template>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      showCategoriesList: false,
    };
  },
  methods: {
    handleCheckboxChange() {
      this.showCategoriesList = !this.data.type;
      this.$emit('updateCategoriesList', this.showCategoriesList);
    },

  },
  created() { }
};
</script>
