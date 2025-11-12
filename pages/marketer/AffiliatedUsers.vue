<template >
  <v-container>
    <v-row>
      <v-col>
        <card title="کاربران ثبت نام شده بوسیله بازاریاب" :loading="loading">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-data-table-server
                    density="compact"
                    :headers="headers"
                    :items="affiliatedUsers"
                    @update:options="getAffiliatedUsers"
                    :items-length="totalItems"
                    :loading="loading"
                  >
                  </v-data-table-server>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useUsersStore } from "@/stores/users";

export default {
  name: "wallet",

  data() {
    return {
      loading: false,
      totalItems: 0,
      affiliatedUsers: [],
      headers: [
        {
          align: "start",
          key: "name",
          title: "نام",
        },
        {
          align: "start",
          key: "created_at_fa_f",
          title: "تاریخ ثبت نام",
        },
      ],
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
    },
    usersStore() {
      return useUsersStore();
    },
    usersloading() {
      return this.usersStore.loading;
    },
  },
  watch: {
    usersloading(value) {
      this.loading = value;
    },
  },
  methods: {
    async getAffiliatedUsers() {
      this.loading = true;
      const { data } = await axios.get(`/api/marketers/${this.user.id}/AffiliatedUsers`);
      this.affiliatedUsers = data.data.length == 0 ? [] : data.data;
      this.totalItems = data.meta.total;
      this.loading = false;
    },
  },
  mounted() {},
};
</script>