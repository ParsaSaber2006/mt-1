<template>

  <v-dialog v-model="showDialogue" @afterLeave="onDialogLeave">
  
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-sheet class="" rounded="xl">
          <div class="text-end">
            <v-btn elevation="0" prepend-icon="mdi-close" class="ma-2" rounded size="small" color="grey-lighten-2"
              @click="showDialogue = false">انصراف</v-btn>
          </div>
          <v-stepper :items="['مدت مکالمه', 'کیف پول', 'تماس']" class="rounded-xl" color="primary" alt-labels>
            <template v-slot:item.1>
              <v-card flat>
                <div class="">
                  <div class="borderd pa-5 text-center text-primary">
                    <span class="text-h3"> {{ callTime }}</span> دقیقه
                  </div>
                  <v-slider show-ticks="always" v-model="callTime" :min="advisor.min_call_time"
                    :max="advisor.max_call_time" step="5" color="primary" class="mt-0">
                    <template v-slot:prepend>
                      <div class="text-primary">{{ advisor.min_call_time }}</div>
                    </template>
                    <template v-slot:append>
                      <span class="text-primary">{{ advisor.max_call_time }}</span>
                    </template>
                  </v-slider>
                  <div class="mb-1 text-grey-darken-2 text-center">
                    <v-chip class="mx-2" :color="this.auth.user.balance >= callTimeCost ? 'success' : 'warning'"
                      prepend-icon="mdi-human-greeting">
                      هزینه تماس: {{
                        callTimeCost.toLocaleString() }} تومان</v-chip>
                  </div>
                </div>
              </v-card>
            </template>
            <template v-slot:item.2>
              <v-container fluid class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="pa-4" elevation="4">
          <!-- <v-card-title class="text-h6 text-center">کد تخفیف</v-card-title> -->
       
          <v-row align="center" class="mt-2" dense>
            <v-col cols="8">
              <v-text-field
                v-model="discountCode"
                label="کد تخفیف"
                variant="outlined"
                dense
                hide-details="auto"
                :error="!!discountError"
                :error-messages="discountError"
                
              />
            </v-col>
            <v-col cols="4">
              <v-btn :color="mode? 'red' : 'success'" block @click="applyDiscount" >
              {{mode ? 'لغو' : 'اعمال'}}
              </v-btn>
              
            </v-col>
          </v-row>

          <v-alert
            v-if="message"
            :type="discountCode ? 'success' : 'error'"
            class="mt-3"
            density="compact"
            border="start"
          >
            {{ message }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
            </template>
            <template v-slot:item.3>
              <v-card flat>
                <div class="text-center mb-2">
                  <span class="borderd pa-2  text-center text-primary">
                    <v-icon>mdi-timer</v-icon>
                    <span class="text-h3"> {{ callTime }}</span> دقیقه
                  </span>
                </div>
                <div class="mb-4 text-grey-darken-2 text-center  ">
                  <span class="border-b-thin pb-3">
                    <v-chip class="mx-2" color="primary" prepend-icon="mdi-wallet">
                      موجودی کیف پول: {{ this.auth.user.balance.toLocaleString() }}
                      تومان</v-chip>
                  </span>
                </div>
                <div class="mb-1 text-grey-darken-2 text-center">
                  <v-chip class="mx-2" :color="this.auth.user.balance >= callTimeCost ? 'success' : 'warning'"
                    prepend-icon="mdi-account-check">
                    هزینه تماس: {{
                      callTimeCost.toLocaleString() }} تومان</v-chip>
                </div>
                <div v-if="this.auth.user.balance < callTimeCost" class="text-center mt-10">
                  کیف پول شما به اندازه کافی اعتبار ندارد.
                  <br>
                  برای شارژ کیف پول به مبلغ <v-chip color="primary" class="mx-2">{{ (callTimeCost -
                    this.auth.user.balance).toLocaleString() }} تومان</v-chip> روی کلید زیر کلیک کنید.

                  <div class="text-center pa-5 ">
                    <v-btn @click="increseBalance" rounded class="" color="primary" size="large">{{ paymentBtnText
                      }}</v-btn>
                  </div>
                  
                </div>
                <div v-else class="text-center">
                  شما اعتبار مورد نیاز برای شروع تماس را دارید.
                </div>
              </v-card>
            </template>

            <template v-slot:item.4>
              <v-card flat>
                <v-row class="justify-center">
                  <v-col cols="4" sm="3" class="text-center align-self-center">
                    <v-img :src="advisor.img_url" rounded="circle" aspect-ratio="1" cover class="border" />
                  </v-col>
                  <v-col cols="12" sm="9" class="text-center text-sm-start">
                    <h4>{{ advisor.name }}</h4>
                    <span class="text-subtitle-1">
                      {{ advisor.job_title }}
                    </span>
                  </v-col>
                  <v-col class="text-center" cols="12">
                    برای شروع تماس کلیک کنید
                    <v-btn rounded class="mt-2" :loading="calling || loading || statusLoading" :color="callBtnColor"
                      :disabled="callCenter.isBusy || !isOnline" append-icon="mdi-phone" elevation="0" block
                      @click="call(advisor.id)">{{ callBtnTxt }}</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </v-stepper>
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
import { useAuthStore } from "@/stores/auth";
import { useCallCenterStore } from "@/stores/callCenter";
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
      discountCode :"",
      discountedCost: null,
      mode:false,
      discountError: '',
      message : "",
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
    applyDiscount(){
    try{
      let value = this.callTimeCost - this.auth.user.balance
      const formData = {
        amount: value,
        code:this.discountCode
      };
      const request = this.mode==false ?  axios.post("/api/discounts/apply",formData) :   axios.post("/api/discounts/decline",formData) ;
      request.then((response)=>{

      this.discountedCost =this.mode === false ? response.data.final_amount  : null;
      this.discountError = "";
      this.mode == false ? this.message = "کد با موفقیت اعمال شد": this.message = "کد لغو شد";
      this.mode = !this.mode;
      setTimeout(() => {
        this.message = "";
      }, 3000);

      })
      .catch((error)=>{
        if(error.response.status ==422){
          this.discountedCost = null 
          console.log(error.response.data.errors)
          this.discountError = error.response.data.errors.code
        }
      })

    }catch(er){
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