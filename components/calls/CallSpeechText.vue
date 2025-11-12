<template>
  <v-dialog v-model="dialog" persistent>
    <card :loading="loading">
      <v-card-title>متن مکالمه انجام شده</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>{{ speech_text }}</v-col>
          </v-row>
          <v-skeleton-loader type="card" v-if="loading"></v-skeleton-loader>
          <v-row v-if="!speech_text">
            <v-col>
              <v-alert variant="outlined" rounded="xl" type="info"
                >تا کنون عملیات استخراج متن از صوت مکالمه برای این تماس انجام
                نشده است. لطفا روی دکمه اتصال به هوش مصنوعی کلیک کنید. 
                <br>
               عملیات استخراج متن، ممکن است از ده ثانیه تا  دقیقه زمان ببرد. (با توجه به امکان تعدد درخواست های هوش مصنوعی)
               <br>
               لطفا بعد از ثبت درخواست این پنجره را ببندید و چند دقیقه دیگر دوباره تلاش کنید.

                
              </v-alert>
              <div class="text-center mt-3">
                  <v-btn
                    @click="requestAsr"
                    variant="outlined"
                    color="info"
                    rounded
                    prepend-icon = "mdi-robot"
                    :loading="request_loading"
                    >اتصال به هوش مصنوعی
                  </v-btn>
                </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="close" rounded prepend-icon="mdi-close" variant="outlined" color="grey">بستن</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </card>
  </v-dialog>
</template>
<script>
import { useAuthStore } from "@/stores/auth";
import CallsReportFilter from "./CallsReportFilter.vue";

export default {
  name: "CallSpeechText",
  props: ["call"],
  data() {
    return {
      loading: false,
      request_loading: false,
      dialog: true,
      speech_text: " ",
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.authenticatedUser;
    },
  },
  methods: {
    async getSpeechText() {
      this.loading = true;
      const { data } = await axios.get(`/api/calls/${this.call.id}/speechText`);
      if (data.data.exists) {
        this.speech_text = data.data.speech_text;
      } else this.speech_text = null;

      this.loading = false;
    },
    async requestAsr() {
      this.request_loading = true;
      const { data } = await axios.get(
        `/api/calls/${this.call.id}/requestSpeechText`
      );
      if (data.success) {
      }
      this.request_loading = false;
    },
    close(){
      this.$emit("close")
    }
  },
  mounted() {
    this.getSpeechText();
  },
};
</script>

<style>
.v-data-table-footer {
  direction: ltr !important;
  justify-content: center;
}
</style>