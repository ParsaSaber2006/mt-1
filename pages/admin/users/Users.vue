<template>
  <v-container>
    <v-row>
      <v-col>
        <card title="مدیریت کاربران" :loading="loading">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field label="جستجو" density="compact" v-model="search" rounded variant="outlined" />
                  <v-data-table :headers="headers" :items="users" :search="search">
                    <template v-slot:item.name="{ item }">
                      <v-btn :to="{ name: 'admin.users.show', params: { user_id: item.id } }" variant="text"
                        color="primary">{{ item.name }}</v-btn>
                    </template>
                    <template v-slot:item.balance="{ item }">
                      {{ item.balance.toLocaleString() }}
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-btn class="ml-1 pa-2" rounded icon="mdi-magnify"
                        :to="{ name: 'admin.users.show', params: { user_id: item.id } }"></v-btn>
                    </template>
                    <template v-slot:item.roles="{ item }">

                      <v-btn size="xx-small" class="pa-1 px-2 mx-1"
                        :prepend-icon="item.roles.includes('advisor') ? 'mdi-check' : null"
                        :variant="item.roles.includes('advisor') ? 'elevated' : 'outlined'"
                        :color="item.roles.includes('advisor') ? 'red' : 'grey'" @click="toggleAdvisor(item.id)"
                        :disabled="loading" rounded><small>مشاور</small></v-btn>
                      <v-btn size="xx-small" class="pa-1 px-2 mx-1"
                        :prepend-icon="item.roles.includes('admin') ? 'mdi-check' : null"
                        :variant="item.roles.includes('admin') ? 'elevated' : 'outlined'"
                        :color="item.roles.includes('admin') ? 'blue' : 'grey'" @click="toggleAdmin(item.id)"
                        :disabled="loading" rounded><small>ادمین</small></v-btn>
                      <v-btn size="xx-small" class="pa-1 px-2 mx-1"
                        :prepend-icon="item.roles.includes('marketer') ? 'mdi-check' : null"
                        :variant="item.roles.includes('marketer') ? 'elevated' : 'outlined'"
                        :color="item.roles.includes('marketer') ? 'green' : 'grey'" @click="toggleMarketer(item.id)"
                        :disabled="loading" rounded><small>بازاریاب</small></v-btn>

                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </card>
      </v-col>
    </v-row>
    <edit-user v-if="editable" :user_id="editable.id" @edited="onEditUser" @cancel="editable = null"></edit-user>
    <edit-user-wallet v-if="editable_wallet" :user_id="editable_wallet.id" @cancel="
      onEditUser();
    editable_wallet = null;
    "></edit-user-wallet>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useUsersStore } from "@/store/users";
import EditUser from "./Edit.vue";

export default {
  name: "wallet",
  components: { EditUser },

  data() {
    return {
      editable: null,
      editable_wallet: null,
      loading: false,
      search: "",
      headers: [
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
        {
          align: "start",
          key: "balance",
          title: "اعتبار",
        },
        {
          align: "start",
          key: "created_at_fa_f",
          title: "تاریخ ثبت نام",
        },
        { key: "roles", title: "سطح دسترسی" },
      ],
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    usersStore() {
      return useUsersStore();
    },
    usersloading() {
      return this.usersStore.loading;
    },
    users() {
      return this.usersStore.users;
    },
  },
  watch: {
    usersloading(value) {
      this.loading = value;
    },
  },
  methods: {
    async toggleAdvisor(userId) {
      this.loading = true;
      await axios.post(`/api/users/${userId}/toggleAdvisor`);
      this.loading = false;

      emitter.emit("notif")

      this.getUsers();
    },
    async toggleAdmin(userId) {
      this.loading = true;
      await axios.post(`/api/users/${userId}/toggleAdmin`);
      this.loading = false;

      emitter.emit("notif")

      this.getUsers();
    },
    async toggleMarketer(userId) {
      this.loading = true;
      await axios.post(`/api/users/${userId}/toggleMarketer`);
      this.loading = false;

      emitter.emit("notif")

      this.getUsers();
    },
    onEditUser(user) {
      this.editable = null;
      this.getUsers();
    },
    getUsers() {
      this.usersStore.getUsersFromServer();
    },
  },
  mounted() { this.getUsers() },
};
</script>