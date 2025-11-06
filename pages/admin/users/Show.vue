<template>
  <div>
    <breadcrumbs :items="breadcrumbs" />
    <v-container>
      <v-row class="">
        <v-col cols="12" sm="3" class="">
          <v-list class="rounded-xl" nav>
            <v-list-item class="rounded-xl" color="primary" density="compact" :active="currentComponent == 'Summary'"
              @click="goTo('Summary')" prepend-icon="mdi-account">
              اطلاعات کاربر
            </v-list-item>
            <v-list-item class="rounded-xl" color="primary" :active="currentComponent == 'Transactions'"
              density="compact" @click="goTo('Transactions')" prepend-icon="mdi-chart-line">
              تراکنش های مالی
            </v-list-item>
            <v-list-item class="rounded-xl" color="primary" density="compact" :active="currentComponent == 'Edit'"
              @click="goTo('Edit')" prepend-icon="mdi-account-edit">
              ویرایش اطلاعات
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="9" class="">
          <card class="mb-2">
            <h3><v-icon>mdi-account</v-icon> {{ user?.name }}</h3>
          </card>
          <v-fade-transition leave-absolute hide-on-leave>
            <component :is="currentComponent" :user="user" @refreshUser="fetchUser()" class="" />
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Transactions from './Transactions.vue';
import Summary from './Summary.vue';
import Edit from './Edit.vue';
export default {

  data() {
    return {
      user: {},
      loading: false,
      currentComponent: "Summary",
    };
  },
  components: { Transactions, Summary, Edit },
  props: ['user_id'],
  computed: {
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: "ناحیه کاربری",
          disabled: false,
          to: { name: "userarea" },
        },
        {
          title: "مدیریت کاربران",
          to: { name: "admin.users" },
          disabled: false,
        },
      ];
    },
  },
  methods: {
    goTo(component) {
      this.currentComponent = component;
    },
    async fetchUser() {
      this.loading = true;
      const { data } = await axios.get(`/api/users/${this.user_id}?with=transactions`);
      this.user = data.data;
      this.imageUrl = this.user.profile_image;
      this.loading = false;
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>