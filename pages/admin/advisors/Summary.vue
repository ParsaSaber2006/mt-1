<template>
  <div>
    <v-container v-if="loading">
      <v-row justify="center" class="py-10">
        <v-col cols="4" align="center" class="py-16">
          <v-progress-linear color="primary" indeterminate></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!loading">
      <v-row v-if="!loading && advisor.id">
        <v-col cols="12" sm="3" md="3" class="pa-1">
          <info-box title="تعداد کل تماس ها" :icon_flip="true" color="red" :amount="advisor.advises_count + ' مورد'"
            icon="mdi-phone" />
        </v-col>
        <v-col cols="12" sm="3" md="3" class="pa-1">
          <info-box title="کل زمان مکالمات" :icon_flip="true" color="green"
            :amount="readableTime(callsAnalyze.billsec_total)" icon="mdi-phone-in-talk" />
        </v-col>
        <v-col cols="12" sm="3" md="3" class="pa-1">
          <info-box title="میانگین امتیاز" color="brown" :amount="advisor.score_avg?.toFixed(2)"
            icon="mdi-account-star" />
        </v-col>
        <v-col cols="12" sm="3" md="3" class="pa-1">
          <info-box title="مبلغ کارکرد" color="blue" icon="mdi-currency-usd"
            :amount="(+callsAnalyze.calls_amount)?.toLocaleString() + ' تومان'">
          </info-box>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <card title="تماس های مشاور" :loading="loading">
            <calls-report v-if="this.advisor.id" :fixed-filter-data="{ advisor_id: advisor.id }"
              :hidden-filter-items="['advisor_id']"></calls-report>
          </card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
      dialog: true,
      callsAnalyze: {},
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
          title: "مشاورین",
          disabled: false,
          to: { name: "admin.advisors" },
        },
        {
          title: "مشاور",
          disabled: true,
        },
      ];
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    async getAnalyze() {
      axios
        .get(`/api/advisors/${this.advisor.id}/calls/analyze`)
        .then((res) => {
          this.callsAnalyze = res.data.data;
        });
    },
    readableTime(seconds) {
      var num = seconds / 60;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return `${rhours}:${rminutes}`;
    },
  },
  async mounted() {


    setTimeout(()=>{this.getAnalyze();},3000)
  },
};
</script>