<template>
  <div>
    <breadcrumbs :items="breadcrumbs" />
    <v-container>
      <v-row>
        
        <v-col cols="12" sm="4" class="">
          <v-list class="rounded-xl mb-2" nav>
            <v-list-item 
              v-for="component in componentsList" 
              :key="component"
              class="rounded-xl"
              color="primary"
              density="compact"
              :active="currentComponent == component.name"
              @click="goTo(component.name)"
              :prepend-icon="component.icon"
              >{{ component.title}}
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="8" class="">
          <v-fade-transition leave-absolute hide-on-leave>
            <component :is="currentComponent" :advisor="advisor" />
          </v-fade-transition>
        </v-col>
      </v-row></v-container>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/auth";
import { useCategoriesStore } from "@/stores/categories";
import NotApprovedComments from "./NotApprovedComments.vue";
import ArchivedComments from "./ArchivedComments.vue";

export default {
  name: "show-advisor",
  components: { NotApprovedComments, ArchivedComments },
  props: ["advisor_id"],
  data() {
    return {
      loading: false,
      dialog: true,
      advisor: {},
      currentComponent: "NotApprovedComments",
      componentsList: [
        {
          name: 'NotApprovedComments',
          title: 'کامنت های تایید نشده',
          icon: 'mdi-chart-line-stacked',
        },
        {
          name: 'ArchivedComments',
          title: 'کامنت های بایگانی شده',
          icon: 'mdi-account-box',
        },
      ],
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
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
          title: "نظرات و کامنت ها",
          disabled: false,
          to: { name: "admin.comments.list" },
        },
      ];
    },
  },
  methods: {
    goTo(component) {
      this.currentComponent = component;
    },
  },
};
</script>