<template>
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
                    <v-text-field density="compact" rounded variant="outlined" label="نام" required
                      v-model="category.name" :error-messages="formErrors.name"></v-text-field>
                    <v-text-field density="compact" rounded variant="outlined" label="توضیح مختصر" required
                      v-model="category.short_description"
                      :error-messages="formErrors.short_description"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-select density="compact" rounded variant="outlined" :items="allTags" item-value="name"
                      item-title="name" multiple v-model="category.tags" label="انتخاب زیر دسته ها" chips
                      closable-chips />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h4 class="text-gray">توضیحات بیشتر</h4>
                    <text-editor v-model="category.description"></text-editor>
                  </v-col>
                </v-row>
                <v-row class="pa-0 my-0">
                  <v-col class="py-0 ma-0" cols="12">
                    <v-text-field density="compact" rounded variant="outlined" label="زمان های مشاوره" required
                      v-model="category.call_times" :error-messages="formErrors.call_times"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-spacer></v-spacer>
              <v-btn @click="updateCategory" :loading="loading" color="primary" rounded>
                ثبت
              </v-btn>
            </v-card-text>
          </card>
        </v-col>
        <v-col md="4">
          <category-image :category_id="category.id" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="optionsStore.options.wp_sync_enabled">
      <v-row>
        <v-col>
          <card :loading="wp_loading">
            <div class="mb-4">

              <div><strong>شناسه دسته بندی در وردپرس :</strong> {{ wp_synced_data.wp_category_id }}</div>
              <div><strong>زمان آخرین همگام سازی با وردپرس : </strong> {{ wp_synced_data.synced_at }}</div>

            </div>
            <v-btn @click="wpSync" color="info" class="me-2" rounded :disabled="wp_loading">
              همگام سازی با وردپرس
            </v-btn>

          </card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <card v-if="category">
            <div class="text-center">

              <v-btn @click="removeCategory" prepend-icon="mdi-folder-remove" color="error" rounded>
                حذف دسته بندی
              </v-btn>
            </div>
          </card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="category">
      <v-row>
        <v-col>
          <card title="لیست مشاورین " :overlay="deleteLoding">
            <div v-if="!category.advisors" class="mb-5">هیچ مشاوری به این دسته اضافه نشده است.</div>
            <v-table v-if="!loading">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>موبایل</th>
                  <th>تعداد تماس</th>
                  <th>میانگین امتیاز</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="advisor in category.advisors" :key="advisor.id">
                  <td width="10">
                    <v-img :src="advisor.img_url" class="rounded-circle" width="50" height="50" />
                  </td>
                  <td>
                    <v-btn color="primary" variant="outlined" :to="{
                      name: 'admin.advisors.show',
                      params: { advisor_id: advisor.id },
                    }">{{ advisor.name }}</v-btn>
                  </td>
                  <td>{{ advisor.mobile }}</td>
                  <td>{{ advisor.advises_count }}</td>
                  <td>{{ advisor.score_avg }}</td>
                  <td>
                    <v-btn @click="remove(advisor.id)" color="warning" class="px-0" variant="outlined"
                      size="small"><v-icon class="px-0 mx-0">mdi-account-remove</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </card>
        </v-col>
      </v-row>


    </v-container>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/auth";
import CategoryImage from "./CategoryImage.vue";

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
      allTags: [],
      wp_synced_data: {},
      wp_loading: false,
    };
  },
  inject: ['optionsStore'],
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
          title: "ناحیه کاربری",
          to: { name: "userarea" },
        },
        {
          title: "دسته بندی ها",
          disabled: false,
          to: { name: "admin.categories" },
        },
        {
          title: "دسته بندی",
          disabled: true,
        },
      ];
    },
  },
  methods: {
    removeCategory() {

      if (!confirm('آیا مطمئن هستید؟'))
        return false;

      axios.delete(`/api/categories/${this.category_id}`);
      emitter.emit("notif");
      window.location = ('/admin/categories')

    },
    async updateCategory() {
      this.loading = true;
      this.category.type = "advisors";
      const { data } = await axios.put(
        `/api/categories/${this.category.id}`,
        this.category
      );
      this.$emit("edited", this.category);
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
    async remove(advisorId) {
      this.deleteLoding = true;
      const { data } = await axios.delete(
        `/api/categories/${this.category.id}/removeAdvisor`,
        {
          data: {
            advisor_id: advisorId,
          },
        }
      );
      this.category.advisors = this.category.advisors.filter(
        (item) => item.id != advisorId
      );
      this.deleteLoding = false;
      emitter.emit("notif");
    },
    async getAllTags() {
      const { data } = await axios.get("/api/tags", {
        params: {
          type: 'categories',
        }
      })
      this.allTags = data.data;

    },
    async wpSync() {
      this.wp_loading = true;
      const data = await axios.post(`/api/categories/${this.category_id}/wpSync`);
      this.wp_loading = false;
      this.getWpSyncedData();

    },

    async getWpSyncedData() {
      this.wp_loading = true;
      const { data } = await axios.get(`/api/categories/${this.category_id}/wpSync`);
      this.wp_synced_data = data.data;
      this.wp_loading = false;

    }
  },
  async mounted() {
    this.getAllTags();
    this.fetchCategory();
    this.getWpSyncedData();
  },
};
</script>