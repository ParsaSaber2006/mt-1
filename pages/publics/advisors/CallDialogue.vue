<template>

  <v-dialog v-model="showDialogue" @afterLeave="onDialogLeave">

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-sheet class="" rounded="xl">
          <div class="text-end">
            <v-btn elevation="0" prepend-icon="mdi-close" class="ma-2" rounded size="small" color="grey-lighten-2"
              @click="showDialogue = false">انصراف</v-btn>
          </div>

          <div class="pa-10">
            <v-card flat>
              <v-row class="justify-center">
                <v-col cols="3" class="text-center align-self-center">
                  <v-img :src="advisor.img_url" rounded="circle" aspect-ratio="1" cover class="border" />
                </v-col>
                <v-col cols="12" class="text-center ">
                  <h4>{{ advisor.name }}</h4>
                  <span class="text-subtitle-1">
                    {{ advisor.job_title }}
                  </span>
                </v-col>
                <v-col cols="12">
                  <div class="text-center mt-10">
                    مدت زمان انتخاب شده: {{ selected_call_time }} دقیقه
                  </div>
                  <div class="text-center mt-2">اعتبار مورد نیاز:
                    {{ (advisor.credit_ratio * selected_call_time +
                      advisor.entrance_fee).toLocaleString() }} تومان
                  </div>
                  <div class="text-subtitle-1 text-grey-darken-3 text-center mt-4">
                    اعتبار شما:
                    <span class="text-orange-darken-4">{{ auth.user.balance.toLocaleString() }} تومان </span>
                    <v-btn append-icon="mdi-plus" variant="tonal" color="primary" density="compact" rounded
                      :to="{ name: 'wallet' }">افزایش
                      اعتبار</v-btn>
                  </div>
                </v-col>

                <v-col class="text-center" cols="12">
                  برای شروع تماس کلیک کنید
                  <v-btn rounded class="mt-2" :loading="calling || loading || statusLoading" :color="callBtnColor"
                    :disabled="callCenter.isBusy || !isOnline" append-icon="mdi-phone" elevation="0" block
                    @click="call(advisor.id)">{{ callBtnTxt }}</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>

        </v-sheet>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.enable" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn icon="mdi-window-close" color="white" variant="text" @click="snackbar.enable = false">
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import persianDate from "persian-date";
import { useAuthStore } from "@/store/auth";
import { useCallCenterStore } from "@/store/callCenter";
import RequestForCall from "./RequestForCall.vue";
import Cookies from "js-cookie";

export default {
  components: { RequestForCall },
  metaInfo() {
    return { title: "صفحه اصلی" };
  },
  name: "call-dialoge",
  props: ["advisor", "category_id", "selected_call_time"],
  inject: ['optionsStore'],
  data() {
    return {
      discountCode: "",
      discountedCost: null,
      mode: false,
      discountError: '',
      message: "",
      callTime: 0,
      paymentBtnText: "شارژ حساب",
      countDown: 3,
      showDialogue: true,
      calling: false,
      loading: false,
      statusLoading: false,
      snackbar: {
        enable: false,
        text: "",
        color: "red",
        timeout: 2000,
      },
      nowHour: 10,
    }
  },
  computed: {
    callTimeCost() {
      if (this.discountedCost !== null) return this.discountedCost;
      return (+this.advisor.entrance_fee) + (+this.advisor.credit_ratio * this.callTime)
    },
    enable_reservation() {
      return this.optionsStore.get('enable_reservation');
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
  },

  methods: {
    onDialogLeave() {
      this.$emit('onDialogLeave')
    },
    applyDiscount() {
      try {
        let value = this.callTimeCost - this.auth.user.balance
        const formData = {
          amount: value,
          code: this.discountCode
        };
        const request = this.mode == false ? axios.post("/api/discounts/apply", formData) : axios.post("/api/discounts/decline", formData);
        request.then((response) => {

          this.discountedCost = this.mode === false ? response.data.final_amount : null;
          this.discountError = "";
          this.mode == false ? this.message = "کد با موفقیت اعمال شد" : this.message = "کد لغو شد";
          this.mode = !this.mode;
          setTimeout(() => {
            this.message = "";
          }, 3000);

        })
          .catch((error) => {
            if (error.response.status == 422) {
              this.discountedCost = null
              console.log(error.response.data.errors)
              this.discountError = error.response.data.errors.code
            }
          })

      } catch (er) {
        console.log(er)
      }
    },
    async increseBalance() {

      if (this.loading) return false;
      this.loading = true;
      this.paymentBtnText = "در حال اتصال";
      let value = this.callTimeCost - this.auth.user.balance
      const formData = {
        amount: value,
      };
      try {
        const { data } = await axios.post("/api/purchase", formData);
        this.paymentBtnText = "تا لحظاتی دیگر";

        Cookies.set('redirectBackUrl', '/advisors/' + this.advisor.id)

        window.location = data.action;
      } catch (er) { }
      await this.auth.fetchUser();
      // this.loading = false;
    },


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
      console.log((this.advisor.credit_ratio * this.selected_call_time +
        this.advisor.entrance_fee), this.auth.user.balance)
      if ((this.advisor.credit_ratio * this.selected_call_time +
        this.advisor.entrance_fee) > this.auth.user.balance) {

        this.showError("اعتبار کافی ندارید");
        return false;
      }


      this.calling = true;
      const { success, message } = await this.callCenter.startCall(
        advisorId,
        this.auth.user.id,
        this.category_id
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
    this.callTime = this.advisor.min_call_time;
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