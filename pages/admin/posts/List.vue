<template >
  <v-container>
    <v-row>
      <v-col>
        
    <loading-wait :loading="loading" />
        <card v-if="!loading" title="مدیریت مقالات" :loading="loading">
          <template v-slot:actions>
            <v-btn
              @click="creating = true"
              color="primary"
              prepend-icon="mdi-plus"
            >
              ایجاد مقاله جدید
            </v-btn>
          </template>
          <v-card-text>
            <v-list class="border rounded-xl py-0">
              <v-list-item
                v-for="post in posts"
                :key="post.id"
                :to="{
                  name: 'admin.posts.edit',
                  params: { post_slug: post.slug },
                }"
                :prepend-avatar="post.img_url"
              >
              
                <v-list-item-title>
                  {{ post.title }}
                </v-list-item-title>
                <v-divider class="my-2" />

                <template v-slot:append>
                  <v-btn
                    color="grey-lighten-1"
                    icon="mdi-magnify"
                    variant="text"
                    :to="{
                      name: 'admin.posts.edit',
                      params: { post_slug: post.slug },
                    }"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </card>
      </v-col>
    </v-row>
  
    <create-post
      v-if="creating"
      @created="onCreate"
      @cancel="creating = false"
    />

    <edit-post
      v-if="editing"
      :post_id="editable.id"
      @edited="onEdit"
      @cancel="
        editable = {};
        editing = false;
      "
    />
  </v-container>
</template>
<script>
import { useAuthStore } from "@/store/auth";
import EditPost from "./Edit.vue";
import CreatePost from "./Create.vue";
import axios from "axios";

export default {
  name: "posts",
  components: { EditPost, CreatePost },

  data() {
    return {
      editable: {},
      editing: false,
      creating: false,
      editImage: false,
      posts: [],
      loading: false,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  methods: {
    async getposts() {
      const { data } = await axios.get("/api/posts");
      this.posts = data.data;
    }, 
    onEdit(post) {
      this.editable = {};
      this.getposts();
    },
    onCreate() {
      this.creating = null;
      this.getposts();
    },
  },
  mounted() {
    this.getposts();
  },
};
</script>