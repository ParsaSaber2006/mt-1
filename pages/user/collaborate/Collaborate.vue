<template >
  <v-container>
    <v-row>
      <v-col>
        <card title="همکاری در فروش" class="pb-5">
          <v-alert type="info" variant="tonal" class="mb-10">
            جهت همکاری با ما لینک زیر را کپی کنید و در شبکه های اجتماعی یا از هر
            طریق دیگر به اشتراک بگذارید.
          </v-alert>
          <div class="px-2">
            <div class="text-h6">آدرس همکاری در فروش:</div>
            <v-text-field dir="ltr" :value="link" readonly />
            <v-btn
              @click="copy"
              color="primary"
              prepend-icon="mdi-clipboard-text"
              >کپی کردن آدرس همکاری</v-btn
            >
            <v-btn
              @click="share"
              class="ms-2"
              color="primary"
              prepend-icon="mdi-share-variant"
              >اشتراک گذاری</v-btn
            >
          </div>
        </card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useOptionsStore } from "@/store/options";

export default {
  name: "collaborate",
  components: {},

  inject: {},
  data() {
    return {
      loading: false,
      imageUrl: null,
      file: null,
    };
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
    link() {
      return window.location.origin + "/affiliate?via=" + this.auth.user.id;
    },
    title() {
      return this.optionsStore.get("affiliateTitle", "");
    },
    text() {
      return this.optionsStore.get("affiliateText", "");
    },
    canShare() {
      return "share" in navigator;
    },
  },
  methods: {
    share() {
      if (navigator.share !== undefined) {
        navigator
          .share({
            title: this.title,
            text: this.text,
            url: this.link,
          })
          .then(() => console.log("Shared!"))
          .catch((err) => console.error(err));
      }
    },
    copy() {
      navigator.clipboard.writeText(
        window.location.origin + "/affiliate?via=" + this.auth.user.id
      );
    },
  },
  mounted() {},
};
</script>