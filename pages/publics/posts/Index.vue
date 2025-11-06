<template>
  <v-container>
    <breadcrumbs :items="breadcrumbs" class="bg-white rounded-pill" />
    <loading-wait :loading="loading" />

    <v-row >
      <v-col cols="12" md="12">
       <v-card :class="onResize() ? 'w-100' : 'w-50 ml-auto mr-auto'">
          <v-card-title>
            <v-label>
              جستجو در مقالات 
            </v-label>
            <v-text-field v-model="searchText"  label="جستجو در عنوان و توضیحات"
              single-line hide-details></v-text-field>
            <v-btn color="primary" class="ma-1 border-md border-orange"  append-icon="mdi-magnify" rounded="xl" variant="plain"
              @click="getPosts(searchText)">
              جستجو
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6" md="3" class="hidden-sm-and-down " v-for="post in posts" :key="post.id">
        <v-card hover link class="h-100 d-flex flex-column rounded-lg  " elevation="10" :to="`/posts/${post.slug}`">
          <v-img :src="post.img_url" cover class="rounded-t-lg" height="150"> </v-img>
          <v-card-subtitle class="pt-4">
            {{ post.created_at_fa }}
          </v-card-subtitle>
          <v-card-title>{{ post.title }}</v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" :to="`/posts/${post.slug}`">
              مشاهده مطلب
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" class="hidden-md-and-up">
        <!-- <v-sheet elevation="8"> -->
          <v-slide-group v-model="posts" class="pa-0 " selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="post in posts" :key="post.id" >
              <v-card hover link class="h-100 rounded-lg ma-1 pa-1 " width="250"  elevation="10" 
                :to="`/posts/${post.slug}`">
                <v-img :src="post.img_url" cover class="rounded-t-lg" height="135" > </v-img>
                <v-card-subtitle class="pt-1">
                  {{ post.created_at_fa }}
                </v-card-subtitle>
                <v-card-title>{{ post.title }}</v-card-title>
                
                <v-card-actions>
                
                  <v-btn color="primary" variant="text" :to="`/posts/${post.slug}`">
                    مشاهده مطلب
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        <!-- </v-sheet> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <v-pagination v-model="currentPage" :length="totalPages" @update:model-value="fetchPosts"
            rounded="circle"></v-pagination>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  props: ["page_slug"],
  data: () => {
    return {
      loading: false,
      posts: {},
      currentPage: 1,
      totalPages: 0,
      categories: 0,
      searchText: '',
      isMobile: false
    };
  },
  computed: {
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: "مقالات",
          disabled: false,
        },
      ];
    },
   
  

  },
  methods: {
    async getPosts(searchText) {
      this.loading = true;
      const { data } = await axios.get(`/api/posts`, {
        params: {
          categories: this.categories,
          search: searchText
        }
      })
      
      this.totalPages = data.meta.last_page
      this.posts = data.data;
      this.loading = false;
    },
    async fetchPosts() {
      const { data } = await axios.get(`/api/posts?categories=${this.categories}&page=${this.currentPage}`)
      this.currentPage = data.meta.current_page
      this.posts = data.data
      this.totalPages = data.meta.last_page
    },
    getCategories() {
      const categories = this.$route.query.categories;
      if (categories) {
        this.categories = categories.split(',').map(Number);
      }
    },
    onResize () {
      window.addEventListener('resize', this.onResize, { passive: true })
      this.isMobile = window.innerWidth < 600
      return this.isMobile
    }
  },
  mounted() {
    this.getCategories();
    this.getPosts();
    this.onResize();
  },
};
</script>