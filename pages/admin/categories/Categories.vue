<template>
  <v-container>
    <v-row>
      <v-col>
        <card title="مدیریت دسته بندی ها" :loading="loading">
          
          <template v-slot:actions>
            <v-btn @click="creating = true" color="primary" prepend-icon="mdi-plus" rounded>
              ایجاد دسته جدید
            </v-btn>
          
            <v-btn :to="{ name: 'admin.tagsCategories.list' }" color="primary" class="ms-1" rounded prepend-icon="mdi-tag">زیر
              دسته ها
            </v-btn>
          </template>
          <v-card-text>
            
            <v-list class="border rounded-xl py-0"  > 
              
              <v-list-item   v-for="category in categories" :key="category.id"    :to="{
                name: 'admin.categories.edit',
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
                    name: 'admin.categories.edit',
                    params: { category_id: category.id },
                  }"></v-btn>
                </template>
              </v-list-item>
            </v-list>

            <v-table density="compact" v-if="false">
              <thead>
                <tr>
                  <th>نام</th>
                  <th>توضیح کوتاه</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories" :key="category.id">
                  <td>{{ category.name }}</td>
                  <td>{{ category.short_description }}</td>
                  <td>
                    <v-btn :to="{
                      name: 'admin.categories.edit',
                      params: { category_id: category.id },
                    }" size="x-small" class="ml-1">ویرایش</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
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
import { useAuthStore } from "@/stores/auth";
import { useCategoriesStore } from "@/stores/categories";
import EditCategory from "./Edit.vue";
import CreateCategory from "./Create.vue";
  
export default {
  name: "categories",
  components: { EditCategory, CreateCategory },

  data() {
    return {
      editable: {},
      editing: false,
      creating: false,
      editImage: false,
    };
  },
  computed: {
    categoriesStore() {
      return useCategoriesStore();
    },
    categories() {
      return this.categoriesStore.categories;
    },
    loading() {
      return this.categoriesStore.loading;
    },
  },
  mounted() {
    // فقط زمانی که داده‌ها خالی هستند، درخواست به سرور ارسال می‌شود
    if (this.categories.length === 0) {
      this.categoriesStore.getCategoriesFromServer();
    }
  },
  methods: {
    onEdit(category) {
      this.editable = {};
      this.categoriesStore.getCategoriesFromServer(); // اگر نیاز به بارگذاری مجدد دارید اینجا می‌توانید از این متد استفاده کنید
    },
    onCreate() {
      this.creating = null;
      this.categoriesStore.getCategoriesFromServer(); // همینطور اینجا می‌توانید برای بارگذاری مجدد داده‌ها استفاده کنید
    },
  },
};

</script>