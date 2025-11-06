<template>
  <v-row justify="center">
    <v-col class="py-0 ma-0" md="12">
      <card :loading="loading" title="همگام سازی با وردپرس">
        <v-card-text v-if="advisor">
          <v-container>
            <v-row>
              <v-col>
                <div class="mb-4">

                  <div><strong>شناسه مشاور در وردپرس :</strong> {{ synced_data.wp_advisor_id }}</div>
                  <div><strong>شناسه عکس مشاور در وردپرس : </strong> {{ synced_data.wp_media_id }}</div>
                  <div><strong>زمان آخرین همگام سازی با وردپرس : </strong> {{ synced_data.synced_at }}</div>

                </div>

                <v-btn @click="wpSync" color="primary" :disabled="loading" rounded class="me-1">
                  همگام سازی با وردپرس
                </v-btn>

                <v-btn @click="wpImageSync" color="primary" :disabled="loading" rounded>
                  همگام سازی عکس پروفایل
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </card>
    </v-col>
  </v-row>
</template>


<script>
import { useAuthStore } from "@/store/auth";
import { useCategoriesStore } from "@/store/categories";

export default {
  name: "edit-advisor",
  components: {},
  props: ["advisor"],
  data() {
    return {
      loading: false,
      synced_data: {},
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  methods: {
    async wpSync() {
      this.loading = true;
      const { data } = await axios.post(`/api/advisors/${this.advisor.id}/wpSync`);
      this.loading = false;
      this.getSyncedData();
    },
    async wpImageSync() {
      this.loading = true;
      const { data } = await axios.post(`/api/advisors/${this.advisor.id}/wpImageUpdate`);
      this.loading = false;
      this.getSyncedData();
    },
    async getSyncedData() {
      this.loading = true;
      const { data } = await axios.get(`/api/advisors/${this.advisor.id}/getSyncedData`);
      this.synced_data = data.data;
      this.loading = false;

    }
  },
  async mounted() {
    this.getSyncedData();
  },
};
</script>