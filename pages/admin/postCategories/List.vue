<template>
  <v-container>
    <v-row>
      <v-col>
        <card title="مدیریت دسته بندی ها" :loading="loading">
          <template v-slot:actions>
            <v-btn @click="creating = true" color="primary" prepend-icon="mdi-plus">
              ایجاد دسته جدید
            </v-btn>
          </template>
          <v-card-text>
            <v-list class="border rounded-xl py-0">
              <v-list-item v-for="category in categories" :key="category.id" :to="{
                name: 'admin.posts.categories.edit',
                params: { category_id: category.id },
              }" :prepend-avatar="category.img_url">
                <v-list-item-title>
                  {{ category.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ category.short_description }}
                </v-list-item-subtitle>
                <v-divider class="my-2" />

                <template v-slot:append>
                  <v-btn color="grey-lighten-1" icon="mdi-magnify" variant="text" :to="{
                    name: 'admin.posts.categories.edit',
                    params: { category_id: category.id },
                  }"></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </card>
      </v-col>
    </v-row>

    <create-category v-if="creating" @created="onCreate" @cancel="creating = false" />

    <edit-category v-if="editing" :category_id="editable.id" @edited="onEdit" @cancel="
      editable = {};
    editing = false;
    " />
  </v-container>
</template>
<script>
import { useAuthStore } from "@/store/auth";
import { usePostCategoriesStore } from "@/store/postCategories";
import EditCategory from "./Edit.vue";
import CreateCategory from "./Create.vue";
import axios from "axios";

export default {
  name: "categories",
  components: { EditCategory, CreateCategory },

  data() {
    return {
      editable: {},
      editing: false,
      creating: false,
      editImage: false,
      categories: false,
      loading: false,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    categoriesStore() {
      return usePostCategoriesStore();
    },
    categories() {
      return this.categoriesStore.postCategories;
    }
  },
  methods: {
    async getCategories() {
      this.categoriesStore.getCategoiresFromServer();
    },
    onEdit(category) {
      this.editable = {};
      this.getCategories();
    },
    onCreate() {
      this.creating = null;
      this.getCategories();
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>