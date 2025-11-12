<template>
  <v-container>
    <v-row>
      <v-col>
        <card title="مدیریت مشاورین">
          <template v-slot:actions>
            <v-btn @click="creating = true" class="" rounded color="primary" prepend-icon="mdi-account-plus">
              ایجاد
            </v-btn>
          </template>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field rounded variant="outlined" label="جستجو" density="compact" v-model="search" clearable />
                </v-col>
              </v-row>
              <v-row>
                <v-col>

                  <v-data-table-server :headers="headers" :items="advisors" :search="search"
                    @update:options="getAdvisors" :items-length="totalItems" :loading="loading" :items-per-page-options="[
                      { value: 10, title: '10' },
                      { value: 50, title: '50' },
                      { value: 100, title: '100' },
                    ]" hover>
                    <template v-slot:item.name="{ item }">
                      <v-btn variant="text" color="primary" :to="{
                        name: 'admin.advisors.show',
                        params: { advisor_id: item.id },
                      }">{{ item.name }}</v-btn>
                    </template>
                    <template v-slot:item.image="{ item }">
                      <div class="py-2">
                        <v-img :src="item.img_url" width="60" aspect-ratio="1" cover class="rounded-circle" />
                      </div>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-btn variant="text" size="large" :to="{
                        name: 'admin.advisors.show',
                        params: { advisor_id: item.id },
                      }" class="ml-1"><v-icon>mdi-magnify</v-icon></v-btn>
                    </template>
                  </v-data-table-server>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </card>
      </v-col>
    </v-row>
    <create-advisor v-if="creating" @created="onCreateAdvisor" @cancel="creating = false"></create-advisor>
    <edit-advisor v-if="editAdvisor" :advisor_id="editable.id" @edited="onEditAdvisor"
      @cancel="editAdvisor = false"></edit-advisor>
    <profile-image v-if="editImage" :advisor_id="editable.id" @edited="onEditAdvisor"
      @cancel="editImage = false"></profile-image>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import EditAdvisor from "./Edit.vue";
import CreateAdvisor from "./Create.vue";
import ProfileImage from "./ProfileImage.vue";

export default {
  name: "advisors",
  components: { EditAdvisor, CreateAdvisor, ProfileImage },

  data() {
    return {
      editable: null,
      editAdvisor: false,
      editImage: false,
      creating: false,
      categories: [],
      advisors: [],
      search: "",
      loading: false,
      totalItems: 0,
      headers: [
        {
          key: "image",
        },
        {
          align: "start",
          key: "name",
          title: "نام",
        },
        {
          align: "start",
          key: "mobile",
          title: "موبایل",
        },
        { key: "actions", title: "عملیات" },
      ],
    };
  },
  watch: {
    search() {
      this.getAdvisors({ page: 1 })
    }
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  methods: {
    async getAdvisors({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      let params = {
        page,
        per_page: itemsPerPage,
      }

      if (this.search != '') {
        params.search = this.search;
      }

      const { data } = await axios.get("/api/advisors", {
        params,
      });

      this.totalItems = data.meta.total;
      this.advisors = data.data;

      this.loading = false;
    },
    onEditAdvisor(advisor) {
      this.editable = null;
      this.editImage = false;
      this.editAdvisor = false;
      this.getAdvisors();
    },
    onCreateAdvisor() {
      this.creating = null;
      this.getAdvisors();
    },
  },
};
</script>