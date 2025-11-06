<template >
  <div>
    <!-- <loading-wait :loading="loading" />
    <v-fade-transition leave-absolute >
      <render v-if="!loading" :contents="elements" />
    </v-fade-transition> -->

    <v-container>
      <v-fade-transition leave-absolute>
        <!-- <v-skeleton-loader v-if="loading" type="card" height="200" max-height="500" /> -->
        <v-skeleton-loader v-if="loading" type="ossein" height="1000" class="mb-5" />
        
      </v-fade-transition>
      
    </v-container>

    <render :contents="elements" v-if="true" />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useNotifStore } from "@/stores/notif";
import { useOptionsStore } from "@/stores/options";
import { useHead } from "#app";
import axios from "axios";

export default {
  name: "home",
  data: ()=> {
    return {
      dialog: false,
      advisors: {},
      loading: false,
      elements: {},
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    optionsStore() {
      return useOptionsStore();
    },
    notif() {
      return useNotifStore();
    },
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          to: "/",
        },
      ];
    },
  },
  methods: {
    async getHomePageContents() {
      this.loading = true;
      console.log(this.optionsStore.homepage);
      const { data } = await axios.get("http://127.0.0.1:8000/api/pages/homepage");
      this.elements = JSON.parse(data.content);
      this.loading = false;
    },
  },
  mounted() {
    useHead({
      title: "خانه",
    });
    this.getHomePageContents();
  },
};
</script>