<template >
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col class="text-end" cols="12">
        <v-btn icon density="compact" elevation="0" @click="share">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "ShareRibbon"
}
</script>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";

const auth = useAuthStore();
const route = useRoute();

const currentUrl = computed(() => {
  return window.location.origin + route.fullPath + "?via=" + auth.user.id;
});

function share() {
  if (navigator.share !== undefined) {
    navigator
      .share({
        url: currentUrl.value,
      })
      .then(() => console.log("Shared!"))
      .catch((err) => console.error(err));
  }
}
</script>
<!-- 
<script >
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
export default {
  props: ["items"],
  name: "breadcrumbs",
  data: () => {
    return {};
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    optionsStore() {
      return useOptionsStore();
    },
    user() {
      return this.auth.user;
    },
    route() {
      return useRoute();
    },
    currentUrl() {
      console.log(this.route);
      return window.location.origin + "/affiliate?via=" + this.auth.user.id;
    },
  },
  methods: {
    
  },
}; 
</script>-->