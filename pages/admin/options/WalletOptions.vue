<template >
  <card :loading="loading" class="rounded">
    <v-card-text>
      <v-container>
        <v-row class="mb-2">
          <v-col>
            <h4 class="text-h6 text-primary">عملیات شارژ و کیف پول</h4>
            <v-divider class="mt-1" />
          </v-col>
        </v-row>
        <v-row class="pa-0 my-0">
          <v-col class="py-0 ma-0" cols="12" sm="6">
            <v-text-field
              density="compact"
              label="مرچنت زرین پال"
              v-model="siteOptions.merchantId"
            />
          </v-col>
        </v-row>
        <v-row class="pa-0 my-0">
          <v-col class="py-0 ma-0" cols="12" sm="6">
            <v-text-field
              density="compact"
              label="حداقل مبغ قابل پرداخت"
              v-model="siteOptions.wallet_increase_min"
            />
          </v-col>
          <v-col class="py-0 ma-0" cols="12" sm="6">
            <v-text-field
              density="compact"
              label="حداکثر مبغ قابل پرداخت"
              v-model="siteOptions.wallet_increase_max"
            />
          </v-col>
          <v-col class="py-0 ma-0" cols="12" sm="6">
            <v-text-field
              density="compact"
              label="گام مبلغ قابل پرداخت"
              v-model="siteOptions.wallet_increase_step"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        variant="flat"
        @click="updateOptions"
        :loading="loading"
      >
        ثبت
      </v-btn>
    </v-card-actions>
  </card>
</template>


<script>
import { useAuthStore } from "@/store/auth";
import { useOptionsStore } from "@/store/options";
import MediaUploader from "./MediaUploader.vue";
import { useTheme } from "vuetify/lib/framework.mjs";

export default {
  name: "options",
  components: { MediaUploader },

  data() {
    return {
      loading: false,
      siteOptions: {},
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
    },
    optionsStore() {
      return useOptionsStore();
    },
    medias() {
      let obj = JSON.parse(JSON.stringify(this.optionsStore.options));
      return obj.medias;
    },
    theme() {
      return useTheme();
    },
    themes() {
      return this.theme.themes.value;
    },
  },
  methods: {
    async updateOptions() {
      this.loading = true;
      try {
        await this.optionsStore.update(this.siteOptions);
        emitter.emit("notif");
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    getOptions() {
      this.loading = true;
      let obj = JSON.parse(JSON.stringify(this.optionsStore.options));
      this.siteOptions = obj;
      this.medias = obj.medias;
      this.loading = false;
    },
    mediaUploaded() {},
    setTheme(theme) {
      this.theme.global.name.value = theme;
    },
  },
  mounted() {
    this.getOptions();
  },
};
</script>