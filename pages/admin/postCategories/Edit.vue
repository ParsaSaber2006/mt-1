<template >
  <div>
    <breadcrumbs :items="breadcrumbs" />
    <v-container v-if="category">
      <v-row justify="center">
        <v-col md="8">
          <card title="ویرایش دسته بندی">
            <v-card-text v-if="category">
              <v-container>
                <v-row class="pa-0 my-0">
                  <v-col class="py-0 ma-0" cols="12">
                    <v-text-field
                      density="compact"
                      rounded
                      variant="outlined"
                      label="نام"
                      required
                      v-model="category.name"
                      :error-messages="formErrors.name"
                    ></v-text-field>
                    <v-text-field
                      density="compact"
                      rounded
                      variant="outlined"
                      label="توضیح مختصر"
                      required
                      v-model="category.short_description"
                      :error-messages="formErrors.short_description"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h4 class="text-gray">توضیحات بیشتر</h4>
                    <text-editor v-model="category.description"></text-editor>
                  </v-col>
                </v-row>
              </v-container>
              <v-spacer></v-spacer>
              <v-btn
                @click="updateCategory"
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
          <category-image :category_id="category.id" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn 
          color="primary"
          variant="outlined"
          @click="removeCategory"
          >حذف</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { useAuthStore } from "@/store/auth";
import CategoryImage from "./Image.vue";

export default {
  name: "edit-category",
  components: { CategoryImage },
  props: ["category_id"],
  data() {
    return {
      loading: true,
      deleteLoding: false,
      category: null,
      imageUrl: null,
      formErrors: {},
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
          to: { name: "admin.posts.categories" },
        },
        {
          title: "دسته بندی",
          disabled: true,
        },
      ];
    },
  },
  methods: {
    async updateCategory() {
      this.loading = true;
      const { data } = await axios.put(
        `/api/categories/${this.category.id}`,
        this.category
      );

      emitter.emit("notif");

      this.loading = false;
    },
    cancel() {
      this.$emit("cancel");
    },
    async fetchCategory() {
      this.loading = true;
      const { data } = await axios.get(`/api/categories/${this.category_id}`);
      this.category = data.data;
      this.loading = false;
    },
    async removeCategory() {
      this.deleteLoding = true;
      console.log(this.category.id)
      const { data } = await axios.delete(
        `/api/categories/${this.category.id}/removePost`
      );
      
      this.deleteLoding = false;
      emitter.emit("notif");
    },
  },
  async mounted() {
    this.fetchCategory();
  },
};
</script>