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
    <v-list>
      <v-list-item v-if="links.length === 0">
        <v-list-item-title>هیچ لینکی افزوده نشده است</v-list-item-title>
      </v-list-item>
      <v-list-item v-for="link in links" :key="link" :to="link.url" :prepend-avatar="link.image_url">
        <template v-slot:append>
          <v-btn color="grey-lighten-1" icon="mdi-chevron-left" variant="text"></v-btn>
        </template>
        <v-list-item-title>
          <strong> {{ link.title }} </strong>
        </v-list-item-title>
        <v-list-item-subtitle>
          <div>{{ link.description }}</div>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped></style>