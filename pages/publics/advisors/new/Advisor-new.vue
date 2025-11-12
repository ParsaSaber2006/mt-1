<template>
  <div>
    <breadcrumbs :items="breadcrumbs" class="rounded-pill" />
    <v-container>
      <v-sheet rounded="xl" class="py-5 px-15">
        <v-row>
          <v-col cols="1">
            <v-img src="/images/sample-profile.png"  aspect-ratio="1"  rounded="xl" class="border" cover></v-img>
          </v-col>
          <v-col >
            <h2 class="text-h5 "><sسtrong>حامد دولت آبادی</sسtrong></h2>
            <div class="text-h6 text-grey">روانکاو</div>
            <div class="text-h6 text-grey">شروع از 2،000،000 تومان</div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
import persianDate from "persian-date";
import { useAuthStore } from "@/stores/auth";
import { useCallCenterStore } from "@/stores/callCenter";

export default {
  components: { },
  metaInfo() {
    return { title: "صفحه اصلی" };
  },
  name: "advisor",
  props: ["advisorId", "categoryId"],
  inject: ["optionsStore"],
  data() {
    return {
      showReserveDialoge: false,
      loading: false,
      statusLoading: false,
      advisor: {},
      showCallingDialog: false,
      calling: false,
      snackbar: {
        enable: false,
        text: "",
        color: "red",
        timeout: 2000,
      },
      weekDays: [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنج شنبه",
        "جمعه",
      ],
      hours: {
        0: "twelve",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "one",
        14: "two",
        15: "three",
        16: "four",
        17: "five",
        18: "six",
        19: "seven",
        20: "eight",
        21: "nine",
        22: "ten",
        23: "eleven",
      },
      nowHour: 10,
    };
  },
  computed: {
    enable_reservation() {
      return this.optionsStore.get("enable_reservation");
    },
    isOnline() {
      let dayOfWeek = new persianDate().day() - 1;
      try {
        console.log(this.advisor.schedule);
        if (this.advisor.schedule[dayOfWeek].includes(this.nowHour))
          return true;
      } catch (error) {
        console.log(error);
      }
    },
    callBtnTxt() {
      return this.isOnline ? "برقراری تماس" : "وضعیت: آفلاین";
    },
    callBtnColor() {
      return this.isOnline ? "primary" : "grey";
    },
    auth: () => {
      return useAuthStore();
    },
    callCenter: () => {
      return useCallCenterStore();
    },
    schedules() {
      if (!this.advisor.schedule) {
        return {};
      }

      let schedule = this.advisor.schedule;
      let koltar = {};
      for (let p in schedule) {
        let plan = schedule[p];
        let per = null;
        let kol = [];
        for (let h in plan) {
          if (per == null) {
            per = [plan[+h]];
          }
          if (plan[h] != plan[+h + 1] - 1) {
            per.push(plan[+h] + 1);
            kol.push(per);
            per = null;
          }
        }
        koltar[p] = kol;
      }

      return koltar;
    },
    callCost() {
      const minCost =
        this.advisor.credit_ratio * this.advisor.min_call_time +
        this.advisor.entrance_fee;
      const maxCost =
        this.advisor.credit_ratio * this.advisor.max_call_time +
        this.advisor.entrance_fee;
      return [
        {
          time: this.advisor.min_call_time,
          cost: minCost,
        },
        {
          time: this.advisor.max_call_time,
          cost: maxCost,
        },
      ];
    },
    breadcrumbs() {
      if (!this.advisor.id)
        return [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "دسته بندی   ",
            disabled: false,
          },
        ];

      // console.log( "cats" ,this.advisor.categories.find((item)=>{item.id == this.categoryId}))
      let category = this.advisor.categories.find((item) => {
        return item.id == this.categoryId;
      });

      if (!category)
        category = {
          id: this.advisor.categories[0].id,
          name: this.advisor.categories[0].name,
        };

      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: category.name,
          to: {
            name: "categories.show",
            params: {
              categoryId: category.id,
            },
          },
        },
        {
          title: this.advisor.name,
          disabled: true,
        },
      ];
    },
    category() {
      return this.advisor.category_id;
    },
  },

  methods: {
    async getAdvisor() {
      this.loading = true;
      const { data } = await axios.get(`/api/advisors/${this.advisorId}`);
      this.advisor = data.data;
      this.loading = false;
      // this.analysOnline(this.advisor.schedule);
    },

    async call(advisorId) {
      if (!this.auth.isLogedIn) {
        this.showError("ابتدا باید وارد شوید");
        this.auth.showLoginForm();
        return false;
      }

      this.calling = true;
      const { success, message } = await this.callCenter.startCall(
        advisorId,
        this.auth.user.id
      );
      if (success) this.showSuccess(message);
      else this.showError(message);
      this.calling = false;
    },

    showError(message) {
      this.snackbar.text = message;
      this.snackbar.enable = true;
      this.snackbar.color = "red";
      this.snackbar.timeout = 3000;
    },

    showSuccess(message) {
      this.snackbar.text = message;
      this.snackbar.enable = true;
      this.snackbar.color = "green";
      this.snackbar.timeout = 5000;
    },

    showReserve() {
      if (!this.auth.isLogedIn) {
        emitter.emit("notif", { type: "error", text: "ابتدا باید وارد شوید" });
        this.auth.showLoginForm();
        return;
      }
      this.showReserveDialoge = true;
    },
  },
  mounted() {
    this.getAdvisor();
    this.nowHour = new Date().getHours();
    let self = this;
    setInterval(function () {
      self.nowHour = new Date().getHours();
    }, 10000);
  },
};
</script>

<style scoped>
.advisor-about {
  line-height: 3rem;
}

.advisor-title {
  font-size: 14px;
  color: #444;
}

.advisor-subtitle {
  font-size: 14px;
  color: #aaa;
}
</style>