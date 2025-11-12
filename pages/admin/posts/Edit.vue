<template >
  <div>
    <breadcrumbs :items="breadcrumbs" />
    <loading-wait :loading="loading" />
    <v-container v-if="post">
      <v-row justify="center">
        <v-col md="8">
          <card title="ویرایش مقاله">
            <v-card-text v-if="post">
              <v-container>
                <v-row class="pa-0 my-0">
                  <v-col class="py-0 ma-0" cols="12">
                    <v-text-field
                      density="compact"
                      rounded
                      variant="outlined"
                      label="نام"
                      required
                      v-model="post.title"
                      :error-messages="formErrors.title"
                    ></v-text-field>
                  </v-col>
                   <v-col class="py-0 ma-0" cols="12">
                    <v-select
                      density="compact"
                      rounded
                      variant="outlined"
                      label="کد دسته بندی"
                      required
                      item-title="name"
                      item-value="id"
                      :items="categories"
                      v-model="post.category_id"
                      :error-messages="formErrors.category_id"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h4 class="text-gray">توضیحات بیشتر</h4>
                    <text-editor v-model="post.body"></text-editor>
                  </v-col>
                </v-row>
              </v-container>
              <v-spacer></v-spacer>
              <v-btn
                @click="updatepost"
                :loading="loading"
                color="primary"
                rounded
              >
                ثبت
              </v-btn>
            </v-card-text>
          </card>
        </v-col>
        <v-col md="4">
          <post-image :post="post" />
        </v-col>
        
      </v-row>
      <v-row>
        <v-col cols="6" md="6">
          <v-btn
                @click="deletepost"
                :loading="loading"
                color="primary"
                rounded
              >
                حذف
              </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import postImage from "./PostImage.vue";

export default {
  name: "edit-post",
  components: { postImage },
  props: ["post_slug"],
  data() {
    return {
      loading: true,
      deleteLoding: false,
      post: null,
      imageUrl: null,
      formErrors: {},
      categories: [],
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: "دسته بندی ها",
          disabled: false,
          to: { name: "admin.posts" },
        },
        {
          title: this.post?.slug,
          disabled: true,
        },
      ];
    },
  },
  methods: {
    async updatepost() {
      this.loading = true;
      const { data } = await axios.put(
        `/api/posts/${this.post.slug}`,
        this.post
      );

      emitter.emit("notif");

      this.loading = false;
    },
    async deletepost(){
      this.loading = true;
      const { data } = await axios.post(
        `/api/posts/${this.post.slug}/delete`,
        this.post
      );

      emitter.emit("notif");

      this.loading = false;
    },
    cancel() {
      this.$emit("cancel");
    },
    async fetchpost() {
      this.loading = true;
      const { data } = await axios.get(`/api/posts/${this.post_slug}`);
      this.post = data.data;
      this.loading = false;
    },
    async getCategories() {
      const {data} = await axios.get('/api/categories',{
            params:{
                type:'posts'
            }
        })
      this.categories = data.data;
    },
  },
  async mounted() {
    this.fetchpost();
    this.getCategories();
  },
};
</script>