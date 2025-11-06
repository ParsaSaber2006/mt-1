<template >
  <v-container class="">
    <v-row v-if="loading" justify="center" class="py-10">
      <v-col cols="4" align="center" class="py-16">
        <v-progress-linear color="primary" indeterminate></v-progress-linear>
      </v-col>
    </v-row>
    <v-list v-if="categories.length && categories.length > 0">
      <v-list-item
        class="pa-2"
        v-for="category in categories"
        :key="category"
        :prepend-avatar="category.img_url"
        :to="{
          name: 'categories.show',
          params: { categoryId: category.id },
        }"
      >
        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-left"
            variant="text"
          ></v-btn>
        </template>
        <v-list-item-title>
          <strong>
            {{ category.name }}
          </strong>
        </v-list-item-title>
        <v-list-item-subtitle>
          <div>{{ category.short_description }}</div>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script >
import AdvisorCard from "./AdvisorCard.vue";
import { useCategoriesStore } from "@/store/categories";

export default {
  name: "CategoriesList",
  props: ["ids"],
  components: {
    AdvisorCard,
  },
  computed: {
    categoriesStore() {
      return useCategoriesStore();
    },
    categories() {
      if (this.ids == null) return this.categoriesStore.categories;
      const categories = [];
      this.ids.forEach((id) => {
        let cat = this.categoriesStore.categories.find(
          (element) => element.id == id
        );
        if (cat) {
          categories.push(cat);
        }
      });

      return categories;

      console.log("ca", this.categoriesStore.categories);
      return this.categoriesStore.categories.filter((category) => {
        return this.ids.includes(category.id.toString());
      });
    },
    loading() {
      return this.categoriesStore.loading;
    },
  },
  data: () => {
    return {
      selected_advisor: -1,
    };
  },
  methods: {
    advisorSelected(advisorId) {
      this.selected_advisor = advisorId;
    },
    cancelAdvisorSelected() {
      this.selected_advisor = null;
    },
  },
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid #ddd;
}
</style>