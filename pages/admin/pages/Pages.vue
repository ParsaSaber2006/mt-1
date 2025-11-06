<template >
  <div>
    <loading-wait :loading="loading" />
    <v-container>
      <v-row>
        <v-col>
          <card title="صفحات" :loading="loading">
            <template v-slot:actions>
              <v-btn
                @click="creating = true"
                class=""
                color="primary"
                prepend-icon="mdi-plus"
                rounded
              >
                ایجاد
              </v-btn>
            </template>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="جستجو"
                      density="compact"
                      v-model="search"
                      rounded
                      variant="outlined"
                    />
                    <v-data-table
                      :headers="headers"
                      :items="pages"
                      :search="search"
                    >
                      <template v-slot:item.title="{ item }">
                        <div class="py-2">
                          {{ item.title }}
                        </div>
                      </template>
                      <template v-slot:item.homepage="{ item }">
                        <div class="py-2 ">
                          <v-icon color="primary" v-if="options.get('homepage') == item.slug">mdi-home</v-icon>
                        </div>
                      </template>
                      <template v-slot:item.type="{ item }">
                        <div class="py-2 " v-if="item.type == 'page'">
                          <v-icon color="blue-lighten-2" title="page" >mdi-file-document</v-icon>
                        </div>
                        <div class="py-2 " v-if="item.type == 'hook'">
                          <v-icon color="green-lighten-2" title="hook">mdi-hook</v-icon>
                        </div>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-btn
                          variant="text"
                          size="large"
                          :to="{
                            name: 'admin.pages.elementor',
                            params: { page_slug: item.slug },
                          }"
                          class="ml-1"
                          ><v-icon>mdi-shape-outline</v-icon>
                        </v-btn>
                        <v-btn
                          variant="text"
                          size="large"
                          :to="{
                            name: 'admin.pages.edit',
                            params: { page_slug: item.slug },
                          }"
                          class="ml-1"
                          ><v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </card>
        </v-col>
      </v-row>
      <create-page
        v-if="creating"
        @created="onCreatePage"
        @cancel="creating = false"
      ></create-page>
    </v-container>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import CreatePage from "./Create.vue";
import { useOptionsStore } from "@/store/options";

export default {
  name: "pages",
  components: { CreatePage },

  data() {
    return {
      creating: false,
      search: "",
      loading: false,
      pages: [],
      headers: [
        {
          align: "start",
          key: "homepage",
          width: "1%"
        },
        {
          align: "start",
          key: "title",
          title: "عنوان",
        },
        {
          align: "start",
          key: "slug",
          title: "آدرس",
        },
        {
          align: "start",
          key: "type",
          title: "نوع",
        },
        { key: "actions", title: "عملیات" },
      ],
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    options(){
      return useOptionsStore();
    }
  },
  methods: {
    async getPages() {
      const { data } = await axios.get("/api/pages");
      this.pages = data.data;
    },
    onCreatePage() {
      this.creating = null;
      this.getPages();
    },
  },
  mounted() {
    this.getPages();
  },
};
</script>