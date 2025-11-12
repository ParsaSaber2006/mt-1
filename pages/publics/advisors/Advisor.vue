<template>
  <div>
    <advisor-new-vission :advisorId="advisorId" :categoryId="categoryId"/>

   <div v-if="false">
     <breadcrumbs :items="breadcrumbs" class="rounded-pill" />
    <call-dialogue @onDialogLeave="showCallingDialog = false" v-if="advisor.id && showCallingDialog" :advisor="advisor"
      @close="showCallingDialog = false" :category_id="this.category?.id" />

    <v-fade-transition leave-absolute>
      <v-container v-if="loading">
        <v-skeleton-loader class="rounded-xl" type="ossein" height="1000" />
      </v-container>
    </v-fade-transition>

    <v-container v-if="!loading">
      <v-row class="pt-5">
        <v-col cols="12" sm="6" md="8">
          <v-card elevation="5" class="pt-8 rounded-xl" style="overflow: visible !important">
            <div class="text-center w-100" style="position: absolute; top: -25px">
              <v-img :src="advisor.img_url" class="rounded-circle border border-avatar mx-auto bg-white" cover
                style="z-index: 10000; margin-bottom: -28px" width="60px" height="60px"></v-img>
            </div>
            <div class="" style="
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 12px;
              ">
              <span class="status-bullet" :class="isOnline ? 'online' : 'offline'"></span>
              <v-chip density="compact" class="ms-1" :color="isOnline ? 'green' : ''">
                {{ isOnline ? "در دسترس" : "خارج از دسترس" }}
              </v-chip>
            </div>
            <v-card-text>
              <h1 class="text-center advisor-title">
                <strong> {{ advisor.title }} </strong>&nbsp;
                <span class="">{{ advisor.name }}</span>
              </h1>
              <h3 class="text-center advisor-subtitle mt-1">
                {{ advisor.job_title }}
              </h3>
              <div class="mt-2 text-center">
                <v-chip color="grey-lighten-1" class="me-1" v-for="tag in advisor.tags" density="compact">{{ tag
                  }}</v-chip>
              </div>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <div class="py-2 text-grey text-justify">
                      {{ advisor.description }}
                    </div>
                  </v-col>
                </v-row>
                <v-row class="border-t">
                  <v-col>
                    <div><small>درباره مشاور:</small></div>
                    <div class="px-10 advisor-about" v-html="advisor.about"></div>
                  </v-col>
                </v-row>
                <v-row justify="center" class="border-t">
                  <v-col cols="12">برنامه زمانی پاسخگویی: </v-col>
                  <template v-for="(h, day) in schedules" :key="day">
                    <v-col cols="6" sm="5" md="4" lg="3" v-if="h.length > 0">
                      <v-card class="border h-100 rounded-xl">
                        <div class="text-center py-2 bg-primary">
                          <strong>
                            {{ weekDays[day] }}
                          </strong>
                        </div>

                        <v-card-text>
                          <div class="text-center">
                            <v-chip class="me-1 my-1" v-for="hour in h" :key="hour">
                              ساعت {{ hour[0] }} تا {{ hour[1] }}
                            </v-chip>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </template>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>

         <Comments v-if="advisor.id" :advisor="advisor" class="d-none d-md-block"></Comments>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card elevation="5" class="pb-10 rounded-xl" style="overflow: visible">
            <div class="text-center w-100" style="position: absolute; margin-top: -20px">
              <v-icon class="bg-grey rounded-circle" style="
                  padding: 15px;
                  rotate: 270deg;
                  z-index: 10000;
                  margin-bottom: -28px;
                " width="50px">
                mdi-phone
              </v-icon>
            </div>
            <v-card-text>
              <v-table>
                <thead>
                  <tr>
                    <td class="2">
                      <small>حداقل و حداکثر میزان مکالمه</small>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="costs in callCost" :key="costs.time">
                    <td>{{ costs.time }} دقیقه</td>
                    <td align="left">
                      {{ costs.cost.toLocaleString() }} تومان
                    </td>
                  </tr>
                  <tr v-if="auth.isLogedIn">
                    <td align="right" colspan="2">
                      اعتبار شما:
                      {{ auth.user.balance.toLocaleString() }} تومان -
                      <v-btn variant="text" color="primary" density="compact" :to="{ name: 'wallet' }">افزایش
                        اعتبار</v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <v-row class="px-5 mt-2">
                <v-col class="pa-0 px-1" v-if="optionsStore.get('enable_reservation') ?? false">
                  <v-btn class="mt-2" color="primary" append-icon="mdi-calendar" elevation="0" variant="outlined" block
                    rounded @click="showReserve">
                    رزرو نوبت
                  </v-btn>
                </v-col>
                <v-col class="pa-0 px-1">
                  <v-btn rounded class="mt-2" :loading="calling || loading || statusLoading" :color="callBtnColor"
                    :disabled="callCenter.isBusy || !isOnline" append-icon="mdi-phone" elevation="0" block
                    @click="showCallDialog()">{{ callBtnTxt }}</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card elevation="5" class="mt-5 pb-2 rounded-xl" style="overflow: visible">
            <v-card-text class="text-center">
              <div style="font-size: 10px; line-height: 10px">
                <v-rating :length="5" :model-value="advisor.score_avg" size="small" density="compact" color="grey"
                  active-color="yellow-darken-1" />
              </div>
              <div>
                <strong>میانگین امتیاز: </strong>

                {{ advisor.score_avg }} از 5
              </div>
              <div>
                <strong>تعداد مشاوره های انجام شده: </strong>
                {{ advisor.advises_count }}
              </div>
            </v-card-text>
          </v-card>

          <Comments v-if="advisor.id" :advisor="advisor" class="d-md-none"></Comments>

          <v-card elevation="5" class="mt-5 pa-2 rounded-xl" style="overflow: visible">
            <v-card-title>خدمات مشاوره این مشاور</v-card-title>
            <v-card-text>
              <v-btn block class="rounded-xl mb-2" color="primary" variant="tonal"
                v-for="category in advisor.categories" :key="category.id" :to="{
                  name: 'categories.show',
                  params: { categoryId: category.id },
                }">
                <span class="">{{ category.name }}</span>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="snackbar.enable" :color="snackbar.color" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn icon="mdi-window-close" color="white" variant="text" @click="snackbar.enable = false">
        </v-btn>
      </template>
    </v-snackbar>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="6">
          <v-dialog max-width="800" v-model="showReserveDialoge">
            <request-for-call @close="showReserveDialoge = false" :advisor="advisor"></request-for-call>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
   </div>
  </div>
</template>

<script>
import persianDate from "persian-date";
import { useAuthStore } from "@/stores/auth";
import { useCallCenterStore } from "@/stores/callCenter";
import RequestForCall from "./RequestForCall.vue";
import CallDialogue from "./CallDialogue.vue";
import AdvisorNewVission from "./new/AdvisorNewVission.vue";
import Comments from "./Comments.vue";

export default {
  components: { RequestForCall, CallDialogue, Comments, AdvisorNewVission },
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
              categoryId: category?.id,
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
      if(!this.advisor.id) return {};
      let category = this.advisor.categories.find((item) => {
        return item.id == this.categoryId;
      });
      return category;
    },
  },

  methods: {
    showCallDialog(){
      if(this.auth.isLogedIn)
        this.showCallingDialog  = true;
      else{
        this.showError("ابتدا باید وارد شوید");
        this.auth.showLoginForm();
      }
        
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
        this.category.id
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