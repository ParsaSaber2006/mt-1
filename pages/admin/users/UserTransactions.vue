<template >
  <v-container>
    <v-row>
      <v-col>
        <card title="مدیریت کاربران" :loading="loading">
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
                    :items="users"
                    :search="search"
                  >
                  
                  <template v-slot:item.balance="{ item }">
                    {{ item.balance.toLocaleString() }}
                  </template>
                    <template v-slot:item.actions="{ item }">
                      <v-btn
                        size="xx-small"
                        class="ml-1 px-2"
                        rounded
                        variant="outlined"
                        icon="mdi-account-edit"
                        @click="editable = item"
                      ></v-btn>
                    </template>
                    <template v-slot:item.roles="{ item }">
                     
                      <v-btn
                        size="xx-small"
                        class="pa-1 px-2 mx-1"
                        :prepend-icon="item.roles.includes('advisor') ? 'mdi-check' : null"
                        :variant="item.roles.includes('advisor') ? 'elevated' : 'outlined'"
                        :color="item.roles.includes('advisor') ? 'red' : 'grey'"
                        @click="toggleAdvisor(item.id)"
                        :disabled="loading "
                        rounded
                        ><small>مشاور</small></v-btn
                      >
                      <v-btn
                        size="xx-small"
                        class="pa-1 px-2 mx-1"
                        :prepend-icon="item.roles.includes('admin') ? 'mdi-check' : null"
                        :variant="item.roles.includes('admin') ? 'elevated' : 'outlined'"
                        :color="item.roles.includes('admin') ? 'blue' : 'grey'"
                        @click="toggleAdmin(item.id)"
                        :disabled="loading "
                        rounded
                        ><small>ادمین</small></v-btn
                      >
                      <v-btn
                        size="xx-small"
                        class="pa-1 px-2 mx-1"
                        :prepend-icon="item.roles.includes('marketer') ? 'mdi-check' : null"
                        :variant="item.roles.includes('marketer') ? 'elevated' : 'outlined'"
                        :color="item.roles.includes('marketer') ? 'green' : 'grey'"
                        @click="toggleMarketer(item.id)"
                        :disabled="loading "
                        rounded
                        ><small>بازاریاب</small></v-btn
                      >
                    
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </card>
      </v-col>
    </v-row>
    <edit-user
      v-if="editable"
      :user_id="editable.id"
      @edited="onEditUser"
      @cancel="editable = null"
    ></edit-user>
    <edit-user-wallet
      v-if="editable_wallet"
      :user_id="editable_wallet.id"
      @cancel="
        onEditUser();
        editable_wallet = null;
      "
    ></edit-user-wallet>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useUsersStore } from "@/stores/users";
import EditUser from "./Edit.vue";
import EditUserWallet from "./EditWallet.vue";

export default {
  name: "wallet",
  components: { EditUser, EditUserWallet },
  props:['user_id'],
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
        { key: "roles", title: "سطح دسترسی" },
        { key: "actions", title: "عملیات" },
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
    getUser() {
      const 
      {data};
    },
  },
  mounted() {},
};
</script>


دور زدن #نت‌_ملی ( اینترانت به اینترنت )

#پروکسی ایران  

پورت 80 یا 8080 پروکسی http 

پورت 1080 . 2080 پروکسی socks5 

باقی پورت‌ها عموما Socks4

217.66.223.230:5678
5.160.85.83:3629
80.210.56.169:4153
5.160.85.83:3629
80.210.56.169:4153
185.178.220.126:32000
80.71.112.52:55243
5.160.91.130:3128
185.3.215.228:5678
37.32.40.178:8080
77.104.97.2:8080
31.25.92.5:44949
5.202.159.34:5678
5.61.27.214:3128
5.222.7.130:3128
31.47.37.43:8080
46.21.93.18:8080
46.32.18.121:8080
46.209.2.82:8080
46.225.243.18:8080
78.38.100.66:8080
78.38.244.93:3128
78.157.55.33:3127
78.157.55.57:3127
78.157.55.61:3127
80.191.171.44:8080
80.191.193.2:3128
80.191.247.178:8080
80.253.138.243:8080
81.12.115.2:3129
84.241.46.191:3127
91.98.103.38:8080
94.183.190.99:8080
109.201.1.2:3127
151.232.51.97:8080
151.233.120.1:8080
164.138.18.20:8080
178.173.161.226:8888
178.252.178.33:8080
188.34.14.11:8080
188.136.199.130:8080
213.233.161.195:3128
217.66.212.138:8080
217.146.222.90:8080
217.219.86.38:8080
217.219.89.130:3128
91.106.64.209:9812
178.252.184.142:8080
217.219.89.130:80
185.72.27.98:8080
80.191.162.2:514
37.32.40.178:8080
185.171.54.34:4153
185.46.217.198:2580
80.191.40.41:5678
185.161.39.17:5678
176.65.242.30:5678
178.252.129.210:5678
185.237.10.185:9812
185.23.128.181:3128
46.209.196.146:8080
80.191.46.60:1515
91.221.240.254:1515
185.23.128.181:3128
80.71.112.125:55243
77.104.75.97:5678
86.109.54.33:5678
217.66.223.111:5678
81.29.245.164:3128
81.12.104.39:3629
178.252.129.210:5678
46.209.100.250:5678
185.161.39.17:5678
188.136.162.151:5678
193.151.134.134:1080
5.160.85.83:3629
2.179.193.146:80
31.24.205.70:4153
194.36.174.151:1080
80.191.46.59:1080
46.209.118.53:5678
185.201.50.50:9999
217.219.76.40:4153
93.126.56.30:4153
176.65.242.30:5678
185.171.54.34:4153
93.126.62.193:4153
185.125.252.241:1080
81.12.104.38:3629
78.38.67.80:4145
185.171.54.30:4153
88.135.45.125:4153
80.71.112.51:55243
185.171.54.35:4153
31.25.92.5:44949
188.136.162.30:4153
185.136.194.174:5678
92.242.221.219:5678
80.191.185.156:5678
185.46.217.198:2580
217.219.91.159:4153
80.191.40.41:5678
88.135.41.57:4153
217.218.233.164:1080
217.219.91.170:4153
185.171.54.29:4153
81.12.104.40:3629
185.22.31.227:4153