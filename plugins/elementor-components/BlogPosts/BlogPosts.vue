<script>
import { ref } from 'vue';
import axios from 'axios';
import BlogsList from '@/components/entities/BlogsList.vue';

export default {
  components: {
    BlogsList
  },
  props: ['data'],
  methods: {
    async getPosts() {
      this.loading = true;
      
      const { data } = await axios.get('/api/posts', {
        params: {
          categories: this.data.categories
        }
      })
    }
  },

  mounted() {
    this.getPosts();
  }
};
</script>

<template>
 <v-container class="home"> 
    <v-row>
      <v-col>
        <v-sheet class="pa-4"> 
        
          <blogs-list  :data="[data.categories]" :count="data.count" :isSlide="false" class=""></blogs-list>

        </v-sheet>
      </v-col>
    
      
    </v-row> 
  </v-container>
</template>

<style scoped>
/* این قسمت را می‌توانید برای اعمال استایل‌ها موردنیاز تغییر دهید */
</style>