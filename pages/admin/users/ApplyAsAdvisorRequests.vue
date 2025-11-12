<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <card :loading="loading" title="درخواست های همکاری به عنوان مشاور">
          <v-table>
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>کد ملی</th>
                <th>شماره موبایل</th>
                <th>دسته بندی</th>
                <th>زیر دسته بندی</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in applyRequests" :key="user">
                <td>{{ user.name }}</td>
                <td>{{ user.national_code }}</td>
                <td>{{ user.mobile }}</td>
                <td>
                  <v-chip v-for="category in user.categories" size="x-small" color="primary" class="ma-1">
                    {{ category.name }}
                  </v-chip>
                </td>
                <td><v-chip v-for="sub in user.subcategories" size="x-small" class="ma-1">{{ sub }}</v-chip></td>
                <td class="text-center">
                  <v-btn class="my-1" color="success" size="small" prepend-icon="mdi-check"> تایید</v-btn>
                  <v-btn class="ms-1 my-1" color="warning" size="small" prepend-icon="mdi-check"> لغو</v-btn>
                  <v-btn class="ms-1 my-1" color="primary" size="small" prepend-icon="mdi-magnify"
                  :to="{
                    name: 'admin.showAdvisorApplyRequest',
                    params: {user_id: user.id}
                  }"> مشاهده
                    جزییات</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "apply-as-advisor-requests",
  components: {},
  props: ["user_id"],
  data() {
    return {
      loading: false,
      applyRequests: null,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  methods: {
    async fetchApplyRequests() {
      this.loading = true;
      const { data } = await axios.get('/api/users/applyAsAdvisorRequests');
      this.applyRequests = data.data
      this.loading = false;
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  async mounted() {
    this.fetchApplyRequests();
  },
};
</script>