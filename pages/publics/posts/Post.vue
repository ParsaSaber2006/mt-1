<template>
  <v-container>
    <breadcrumbs :items="breadcrumbs" class="bg-white rounded-pill" />
    <loading-wait :loading="loading" />
    <v-sheet class=" pa-1" elevation="1" v-if="!loading">
      <v-row>
        <v-col cols="12" md="8">
          <v-label text="تاریخ انتشار این مقاله "> {{ getDate(post.created_at_fa) }}</v-label>
         
          <v-img :src="post.img_url" class="rounded-s-xl w-50 ml-auto mr-auto" />
          <v-card elevation="0" class="rounded-xl bg-transparent">
            <v-card-title class="text-right mt-2">
              {{ post.title }}
            </v-card-title>
            <v-card-text class="text-justify mt-2" v-html="post.body"></v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="text-center ">
          <v-sheet class="pa-0 ma-0 border ">
            <h5 class="mt-3">آخرین مقالات این دسته</h5>
            <blogs-list :data="[post.category_id]" :isSlide="true"></blogs-list>
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>

  </v-container>
</template>

<script>

import BlogsList from '@/components/entities/BlogsList.vue';
import { useRouter } from 'vue-router'

export default {
  props: ["post_slug"],
  data: () => {
    return {
      loading: false,
      post: {},
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
        // {
        //   title: "مقالات",
        //   disabled: false,
        //   // to: this.getPreviousRoute(),
        //   to:'/posts'
        // },
        {
          title: this.post.title,
          disabled: true,
        },
      ];
    },
  },



  methods: {
    async getPost() {
      this.loading = true;
      const { data } = await axios.get(`/api/posts/${this.post_slug}`);
      this.post = data.data;
      this.loading = false;
    },
    getPreviousRoute() {
      const router = useRouter()
      return router.options.history.state.back
    },
    convertToFarsiNumber(str) {
      const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return str.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
    }
    ,
    getDate(dateTimeString) {
      if (typeof dateTimeString === 'string') {
        const [dateOnly] = dateTimeString.split(' ');
        const persianDate = this.convertToFarsiNumber(dateOnly);
        return persianDate;
      } else {
        return '';
      }
    },
    
  },
  mounted() {
    this.getPost();
  },
};
</script>