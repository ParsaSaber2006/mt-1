<template >
  <div>
    <card :title=" ' زمان بندی حضور - ' + this.advisor.name">
      <v-row class="pt-10" justify="center">
        <div
          v-for="(d, index) in 7"
          :key="d"
          class="pa-1"
        >
          <v-sheet
            rounded="xl"
            style="cursor: pointer"
            class="text-center pa-3 px-5"
            :color="dayColor[index]"
            elevation="1"
            @click="selectedDay = index.toString()"
            >{{ `${weekDays[index]}` }}
          </v-sheet>
        </div>
      </v-row>
      <v-row class="mt-8">
        <v-col v-for="(h, index) in 24" cols="2" :key="h" class="pa-1 ma-0">
          <v-sheet
            elevation="1"
            rounded="xl"
            class="pa-2 text-center"
            @click="selectFrame(index)"
            style="cursor: pointer"
            :color="
              dayPlan != null && dayPlan.includes(index)
                ? 'red'
                : 'grey-lighten-2'
            "
          >
            {{ `${index} تا ${index + 1}` }}
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col>
          <v-btn @click="submit" color="primary" :loading="loading" rounded
            >ذخیره</v-btn
          >
        </v-col>
      </v-row>
    </card>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "SchedulesEditor",
  props: ["advisor"],
  data() {
    return {
      formErrors: {},
      loading: false,
      initLoading: false,
      dateFrom: null,
      dateTo: null,
      plan: {},
      selectedDay: "0",
      weekDays: [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنج شنبه",
        "جمعه",
      ],
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    dayPlan() {
      this.advisor.schedules;
      let plan = JSON.parse(JSON.stringify(this.plan));
      if (plan.hasOwnProperty(this.selectedDay)) {
        return plan[this.selectedDay];
      }
      return [];
    },
    dayColor() {
      // selectedDay == index ? 'red' : 'grey-lighten-2'
      function hasTrue(day) {
        for (let i in day) {
          if (day[i]) return true;
        }
      }

      return [0, 1, 2, 3, 4, 5, 6].map((item) => {
        if (this.selectedDay == item) return "red";

        if (hasTrue(this.plan[item])) {
          return "red-lighten-4";
        }

        return "grey-lighten-4";
      });
    },
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: "مشاورین",
          disabled: false,
          to: { name: "admin.advisors" },
        },
        {
          title: "مشاور",
          disabled: false,
          to: {
            name: "admin.advisors.show",
            params: { advisor_id: this.advisor_id },
          },
        },
        {
          title: "زمان حضور",
          disabled: true,
          to: "",
        },
      ];
    },
  },
  methods: {
    async submit() {
      this.loading = true;
      this.formErrors = {};
      axios
        .put(`/api/advisors/${this.advisor.id}/setSchedule`, {
          plan: this.plan,
        })
        .then((res) => {
          emitter.emit("notif");
        })
        .catch((err) => {
          console.log(err.response);
          this.formErrors = err.response.data.errors;
        })
        .then(() => {
          this.loading = false;
        });
    },
    selectFrame(frameIndex) {
      let plan = this.plan; //JSON.parse(JSON.stringify(this.plan));

      if (plan[this.selectedDay] == null) {
        plan[this.selectedDay] = [];
      }

      const index = plan[this.selectedDay].indexOf(frameIndex);

      if (index !== -1) {
        plan[this.selectedDay].splice(index, 1);
        this.plan = plan;
        return;
      }
      plan[this.selectedDay].push(frameIndex);
      plan[this.selectedDay].sort((a, b) => a - b);
      this.plan = plan;
      return;
    },
  },
  async mounted() {
    this.initLoading = true;
    this.plan = this.advisor.schedule
    if (this.plan == null) {
      this.plan = {
        "0":[],
        "1":[],
        "2":[],
        "3":[],
        "4":[],
        "5":[],
        "6":[],
      }
    }
    this.initLoading = false;
  },
};
</script>