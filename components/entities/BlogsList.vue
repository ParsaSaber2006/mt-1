<template>

    <v-row v-if="!isSlide">
    
      <v-col cols="12" sm="6" md="3" v-for="(category, index) in categories" :key="index" class="pa-2">
        <v-card
          hover
          link
          class="h-100 d-flex flex-column rounded-lg"
          elevation="10"
          :to="`/posts/${category.slug}`"
        >
          <v-img :src="category.img_url" cover class="rounded-t-lg" height="185"> </v-img>
          <v-card-subtitle class="pt-4">
            {{ category.created_at_fa }}
          </v-card-subtitle>
          <v-card-title>{{ category.title }}</v-card-title>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" :to="`/posts/${category.slug}`">
              مشاهده مطلب
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  <v-container style="height: 450px; overflow-y: auto;" :class="checkView()" v-if="isSlide">
<v-sheet v-for="(item, index) in categories" :key="item">

    <v-card
      class="ma-3 "
      width="200"
      height="auto"
      elevation="10"
    >
      <v-img
        :src="item.img_url"
        height="120"
        class="mt-1"
        cover
      ></v-img>

      <v-card-title class="text-subtitle-2 text-center font-weight-bold">
        {{ item.title }}
      </v-card-title>

      <v-card-actions>
        <v-btn
          color="primary"
          variant="text"
          :to="`/posts/${item.slug}`"
          class="ml-auto mr-auto"
        >
          مشاهده ادامه مطلب
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</v-container>

</template>

<script>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify'

export default {
  name: 'BlogsList',
  props:['data','isSlide','count'],
  data() {
    return {
      categories: [],
      endpoint: '/api/posts/getsamepost',
      visibleCategories: [],
      startIndex: 0,
      batchSize: 3,
      flexbox:"d-flex flex-column align-center",
    };
  },
  watch: {
   'data':{
    handler: 'fetchCategories',
    immediate: true
   }
  },
  mounted() {
   
    this.fetchCategories();
    this.loadMoreCategories();
    this.checkView()
   
  },
  computed: {
    hasMoreCategories() {
      return this.startIndex < this.categories.length;
    },
  },
  
  methods: {
    fetchCategories() {
      if(this.data.length !=0 ){
        
      axios.get(this.endpoint, {
            params: {
              categories: this.data,
              count:this.count
            }
          })
        .then(response => {
          this.categories=response.data.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
    else{
      this.categories=[];
    }
  },
  checkView(){
      const { width, mobile } = useDisplay()
      console.log(width.value)
      if(width.value > 980){
        return "d-flex flex-column align-center";
      }else{
        return "d-flex flex-row align-center";
      }
    },
  loadMoreCategories() {
      const endIndex = Math.min(this.startIndex + this.batchSize, this.categories.length);
      this.visibleCategories = this.categories.slice(this.startIndex, endIndex);
      this.startIndex += this.batchSize;
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    },
    showMoreCategories() {
      this.loadMoreCategories();
    },
  }
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid #ddd;
}
</style>