<template>
  <div>
    <breadcrumbs :items="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col>
          <card :loading="createLoading" title="ایجاد زیردسته جدید">
            <v-card-text>
              <v-container>
                <v-row class="pa-0 my-0">
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field density="compact" rounded variant="outlined" label="نام" required
                      v-model="newtag.name" :error-messages="formErrors.name"></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="6">
                    <v-btn color="primary" @click="create" rounded variant="outlined" :loading="createLoading">
                      ثبت
                    </v-btn>
                  </v-col>
                </v-row>

              </v-container>
            </v-card-text>
          </card>

          <card title="لیست زیردسته ها" :loading="loading" class="mt-5">
            <v-card-text>
              <v-table class="w-100 border pa-10 rounded-lg">
                <tr v-for="(tag, index) in tags" :key="tag.id" >
                  <td class="pa-5">
                    {{ tag.name }}
                  </td>
                  <td class="text-end">
                    <v-btn color="warning" :loading="deleteLoading[index]" prepend-icon=""
                      @click="remove(tag.id, index)">حذف</v-btn>
                  </td>
                </tr>
              </v-table>
            </v-card-text>
          </card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios';
import { remove } from 'lodash';


export default {
  name: "categories",

  data() {
    return {
      tags: [],
      createLoading: false,
      loading: false,
      deleteLoading: [],
      newtag: {},
      formErrors: {},
    };
  },
  computed: {
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          to: "/",
        },
        {
          title: "ناحیه کاربری",
          to: { name: "userarea" },
        },
        {
          title: "دسته بندی مشاورین ",
          to: { name: "admin.categories" },
        },
        {
          title: "مدیریت زیر دسته بندی ها",
        },
      ];
    },
  },
  methods: {
    async getTags() {
      this.loading = true;
      const { data } = await axios.get('/api/tags', {
        params: {
          type: 'categories',
        }
      })
      this.tags = data.data;
      this.loading = false;
    },
    async create() {
      this.createLoading = true;
      this.newtag.type = 'categories';
      try {
        const { data } = await axios.post('/api/tags', this.newtag)
        this.getTags();
        this.newtag = {};
        emitter.emit("notif");
      }
      catch (err) {
        if (err.response.status == 422) {
          this.formErrors = err.response.data.errors
        }
      }

      this.createLoading = false;

    },
    async remove(tagId, index) {
      this.deleteLoading[index] = true;
      const { data } = await axios.delete(`/api/tags/${tagId}`, { type: 'categories' })
      this.tags.splice(index, 1)
      emitter.emit("notif");
      this.deleteLoading[index] = false;
    }
  },

  mounted() {
    this.getTags();
  }
};
</script>