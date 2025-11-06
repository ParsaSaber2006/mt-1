<template>
  <v-container class="pa-0 rounded-pill my-2" v-if="pages[route.name]">
    <v-row no-gutters>
      <v-col class="rounded-pill py-0">
        <v-breadcrumbs density="compact" :items="breadItems" color="grey-darken-4" class="py-0">
          <template v-slot:prepend>
            <v-icon size="small" icon="mdi-home" color="grey-darken-4"></v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  name: 'BreadcrumbsAuto',
  props: ["items"],
  data: () => {
    return {
      pages: {
        history: [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "تاریخچه تماس ها",
            disabled: true,
            to: "history",
          },
        ],
        "userarea": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
            disabled: true,
          },
        ],
        "admin.posts.categories.list": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "مدیریت  مقالات",
            to: "/admin/posts/list",
          },
          {
            title: "مدیریت دسته بندی مقالات",
            disabled: true,
          },
        ],
        "admin.posts.list": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "مدیریت مقالات",
            disabled: true,
            to: "/admin/posts.list",
          },
        ],
        "admin.advisors": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "مدیریت مشاورین",
            disabled: true,
            to: "/admin/advisors",
          },
        ],
        "admin.elementor": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "ویرایش محتوا",
            disabled: true,
            to: "/admin/elementor",
          },
        ],
        "admin.pages": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "صفحات",
            disabled: true,
            to: "/admin/pages",
          },
        ],
        "admin.pages.elementor": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "صفحات",
            disabled: false,
            to: "/admin/pages",
          },
          {
            title: "ویرایش محتوا",
            disabled: true,
            to: "/admin/elementor",
          },
        ],
        "admin.pages.edit": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "صفحات",
            disabled: false,
            to: "/admin/pages",
          },
          {
            title: "ویرایش صفحه",
            disabled: true,
            to: "/admin/elementor",
          },
        ],
        "admin.users": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "مدیریت کاربران",
            disabled: true,
            to: "/admin/users",
          },
        ],
        "admin.users.show": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "مدیریت کاربران",
            to: "/admin/users",
          },
          {
            title: "مدیریت کاربر",
            disabled: true,
          },
        ],
        "admin.applyAsAdvisorRequests": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "درخواست های همکاری مشاورین",
            disabled: true,
            to: "/admin/applyAsAdvisorRequests",
          },
        ],
        "admin.categories": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "مدیریت دسته بندی ها",
            disabled: true,
            to: "/admin/categories",
          },
        ],
        "admin.options.index": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "تنظیمات",
            disabled: true,
            to: "/admin/options",
          },
        ],
        "admin.calls": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "گزارش تماس ها",
            disabled: true,
            to: "/admin/calls",
          },
        ],
        "admin.reports.callsAnalyze": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: 'گزارشات',
            disabled: false,
            to: "/admin/reports"
          },
          {
            title: 'تحلیل تماس ها',
            disabled: true,
            to: "/admin/reports/callsAnalyze"
          }
        ],
        wallet: [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "کیف پول",
            disabled: true,
            to: "/wallet",
          },
        ],
        "advisor.calls": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "لیست تماس ها",
            disabled: true,
          },
        ],
        "advisor.myContacts": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "مخاطبین من",
            disabled: true,
          },
        ],
        "advisor.schedules": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "برنامه زمان بندی من",
            disabled: true,
          },
        ],
        "advisor.callRequests": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "درخواست های تماس",
            disabled: true,
          },
        ],
        collaborate: [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "همکاری با ما",
            disabled: true,
            to: "/collaborate",
          },
        ],
        profile: [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "پروفایل کاربر",
            disabled: true,
            to: "/profile",
          },
        ],
        applyAsAdvisor: [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "همکاری مشاور",
            disabled: true,
            to: "/applyAsAdvisor",
          },
        ],
        "marketer.affiliatedUsers": [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "ناحیه کاربری",
            to: "/userarea",
          },
          {
            title: "کاربران بازاریابی شده",
            disabled: true,
          },
        ],
      },
    };
  },
  computed: {
    breadItems() {
      let routeName = this.route.name;
      return this.pages[routeName];
    },
    route() {
      return useRoute();
    },
  },
  methods: {},
};
</script>