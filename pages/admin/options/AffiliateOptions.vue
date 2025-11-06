<template >
  <card :loading="loading" class="rounded">
    <v-card-text>
      <v-container>
        <v-row class="mb-2">
          <v-col>
            <h4 class="text-h6 text-primary">همکاری در فروش</h4>
            <v-divider class="mt-1" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 ma-0" cols="12" sm="6">
            <v-text-field
              density="compact"
              label="عنوان همکاری در فروش"
              v-model="siteOptions.affiliateTitle"
            />
          </v-col>
          <v-col class="py-0 ma-0" cols="12" sm="6">
            <v-text-field
              density="compact"
              label="لینک ارجاع"
              v-model="siteOptions.afterAffiliateLink"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 ma-0" cols="12" sm="6">
            <v-textarea
              density="compact"
              label="متن همکاری در فروش"
              v-model="siteOptions.affiliateText"
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
    optionsStore() {
      return useOptionsStore();
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
  },
  mounted() {
    this.getOptions();
  },
};
</script>