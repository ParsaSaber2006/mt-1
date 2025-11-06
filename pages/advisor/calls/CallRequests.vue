<template >
  <div>
    <v-container v-if="loading">
      <v-row justify="center" class="py-10">
        <v-col cols="4" align="center" class="py-16">
          <v-progress-linear color="primary" indeterminate></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!loading">
      <v-row>
        <v-col> تعداد کل درخواست ها: {{ callRequests.length }} </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="callReq in callRequests"
          :key="callReq"
          cols="12"
          sm="6"
          md="4"
          class="py-1"
        >
          <v-sheet class="pa-1 pt-3">
            <div class="text-h6">{{ callReq.user.name }}</div>
            <div>
              زمان تماس:
              {{
                readableSelectedTime(
                  callReq.selected_day,
                  callReq.selected_hour
                )
              }}
            </div>
            <div class="pa-3 pt-5">
              <v-btn
                block
                class="mdi-rotate-135"
                prepend-icon="mdi-phone"
                color="primary"
                variant="tonal"
                @click="call(callReq.contact_id)"
                >تماس</v-btn
              >
            </div>
            <div class="text-subtitle-2 text-medium-emphasis">
              زمان ایجاد درخواست: {{ callReq.created_at }}
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
  
  <script>
import { useAuthStore } from "@/store/auth";

export default {
  name: "advisor-callRequests",
  data() {
    return {
      loading: false,
      callRequests: {},
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    async getCallRequests() {
      this.loading = true;
      const { data } = await axios.get(
        `/api/advisors/${this.user.id}/callRequests`
      );
      this.callRequests = data.data;
      this.loading = false;
    },
    readableSelectedTime(selectedDay, selectedHour) {
      const day = [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنج شنبه",
        "جمعه",
      ][selectedDay];
      const hour = "ساعت " + selectedHour + " تا " + (+selectedHour + 1);

      return day + " " + hour;
    },
  },
  async mounted() {
    this.getCallRequests();
  },
};
</script>