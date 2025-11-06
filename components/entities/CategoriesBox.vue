<template>
  <v-container class="home pb-15 ">
    <v-row v-if="loading" justify="center" class="py-10">
      <v-col cols="4" align="center" class="py-16">
        <v-progress-linear color="primary" indeterminate></v-progress-linear>
      </v-col>
    </v-row>
    
    <v-list  style="overflow:hidden" v-if="categories.length && categories.length > 0"  class="bg-transparent">
      <v-list-item-group >
        <v-row >
          <v-col  v-for="(category, index) in categories" :key="index" :class="data"  >
            <v-list-item 
            
              class="pa-0"
              :to="{
                name: 'categories.show',
                params: { categoryId: category.id },
              }"
            >
              <div class="box ">
                <div class="box-content">
                  <img :src="category.img_url" class="box-image" />
                  <div class="box-text text-center" >
                    <strong>{{ category.name }}</strong>
                    <p cols="6" class="text-break  text justify text-subtitle-2">
                      {{ category.short_description && category.short_description.length > 150 ? category.short_description.slice(0, 150) + '...' : category.short_description }}
</p>
                  </div>
                </div>
              </div>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script >
import AdvisorCard from "./AdvisorCard.vue";
import { useCategoriesStore } from "@/store/categories";

export default {
  name: "CategoriesBox",
  props: ["ids",'data'],

  
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
  border-bottom: 0px solid #ddd;
}

.box {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 3px;

  
}

.box-content {
  display: flex;
  flex-direction: column;
  
}

.box-image {
  width: 100%;
  height: 130px;
  border-radius: 8px;
  object-fit: cover;
 
  padding:auto;
}

.box-text {
  margin-top: 5px;
  height:100px;
  
}
</style>