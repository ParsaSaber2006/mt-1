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

    <render :contents="elements" v-if="!loading" />
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useNotifStore } from "@/store/notif";
import { useOptionsStore } from "@/store/options";
import { useMeta } from "vue-meta";

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
      const { data } = await axios.get("/api/pages/homepage");
      this.elements = JSON.parse(data.data.content);
      this.loading = false;
    },
  },
  mounted() {
    useMeta({
      title: "خانه",
    });
    this.getHomePageContents();
  },
};
</script>