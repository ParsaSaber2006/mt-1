<template>
  <v-container>
    <v-row>
      <v-col>
   
        <v-select
          v-model="data.categories"
          :items="categories"
          item-title="name"
          item-value="id"
          label="دسته بندی"
          chips
          :hint="` کد دسته بندی : ${data.categories}` "
        ></v-select>
      </v-col>

     
    </v-row>
    <v-row>
      <v-col cols="12" md="8" >
        <h5>تعداد آیتم دسته</h5>
        <v-text-field
        type="number"
        v-model="data.count"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { usePostCategoriesStore } from '@/stores/postCategories';

export default {
  props: ["data"],
  data: () => ({

  }),
  created() {
    
  },
  computed: {
    categoriesStore() {
      return usePostCategoriesStore();
    },
   categories(){
    return this.categoriesStore.postCategories; 
  
   }
  },

};
</script>