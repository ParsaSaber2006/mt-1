<template>
  <div>
    <breadcrumbs :items="breadcrumbs" />
    <v-container>
      <v-row class="">
        <v-col cols="12" sm="3" class="">
          <v-list class="rounded-xl" nav>
            <v-list-item class="rounded-xl" density="compact" :to="{ name: 'admin.options.template' }" rounded>
              قالب و هویت
            </v-list-item>
            <v-list-item class="rounded-xl" density="compact" :to="{ name: 'admin.options.affiliate' }">
              همکاری در فروش
            </v-list-item>
            <v-list-item class="rounded-xl" density="compact" :to="{ name: 'admin.options.wallet' }">
              کیف پول
            </v-list-item>
            <v-list-item class="rounded-xl" density="compact" :to="{ name: 'admin.options.mainMenu' }">
              منو ها
            </v-list-item>
            <v-list-item class="rounded-xl" density="compact" :to="{ name: 'admin.options.integrationCodes' }">
              افزودن کد
            </v-list-item>
            <v-list-item class="rounded-xl" density="compact" :to="{ name: 'admin.options.wordpress' }">
              همگام سازی وردپرس
            </v-list-item>
            <v-list-item class="rounded-xl" density="compact" :to="{ name: 'admin.options.simotel' }">
              سیموتل
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="9" class="">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
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
          title: "تنظیمات",
          disabled: true,
          to: { name: "admin.options" },
        },
      ];
    },
  },
};
</script>