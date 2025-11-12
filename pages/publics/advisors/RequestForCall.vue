<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-img :src="advisor.img_url"></v-img>
        </v-col>
        <v-col cols="8">
          <h3>
            <small class="text-grey">{{ advisor.title }}</small>
            {{ advisor.name }}
          </h3>
          <h4 class="mt-2">{{ advisor.job_title }}</h4>
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
                <td align="left">{{ costs.cost.toLocaleString() }} تومان</td>
              </tr>
              <tr v-if="auth.isLogedIn">
                <td align="right" colspan="2">
                  اعتبار شما:
                  {{ auth.user.balance.toLocaleString() }} تومان -
                  <v-btn variant="text" color="primary" density="compact" :to="{ name: 'wallet' }">افزایش اعتبار</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-chip-group v-model="selected_time" column filter class="d-block overflow-hidden">
            <div class="text-subtitle-1">
              انتخاب روز و ساعت مشاوره:
              <span class="text-primary">
                (روی یکی از گزینه های زیر کلیک کنید)
              </span>
            </div>
            <v-slide-y-transition>
              <div class="text-red" v-if="error_messages.reserve_plan">
                <strong>لطفا از لیست زیر یک مورد را انتخاب کنید</strong>
              </div>
            </v-slide-y-transition>

            <v-expansion-panels variant="popout">
              <v-expansion-panel v-for="(h, day) in advisorSchedule" :key="day" :title="weekDays[day]" :value="day">
                <v-expansion-panel-text>
                  <v-row>
                    <v-col v-for="hour in h" :key="hour" cols="6" sm="4"  md="3" class="text-center">
                    <v-chip class="me-1 my-1" :prepend-icon="'mdi-clock-time-' + hours[hour]" color="primary"
                      :value="`${day}:${hour}`" style="min-width: 80px" size="large">
                      {{ hour }} تا {{ +hour + 1 }}
                    </v-chip>
                  </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-table class="border mt-3" :style="{
              'border-color': error_messages.reserve_plan
                ? 'red !important'
                : '',
            }" v-if="false">
              <tbody>
                <template v-for="(h, day) in advisorSchedule" :key="day">
                  <tr v-if="h.length > 0" class="mt-10">
                    <td class="bsg-grey-lighten-4 text-center" style="vertical-align: middle">
                      {{ weekDays[day] }}
                    </td>
                    <td class="py-5">
                      <v-chip class="me-1 my-1" :prepend-icon="'mdi-clock-time-' + hours[hour]" color="primary"
                        v-for="hour in h" :key="hour" :value="`${day}:${hour}`" style="min-width: 80px" size="large">
                        {{ hour }} تا {{ +hour + 1 }}
                      </v-chip>
                    </td>
                  </tr>
                </template>
              </tbody>
            </v-table>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-subtitle-1 text-medium-emphasis">توضیحات:</div>
          <v-textarea rounded="xl"
            placeholder="در این قسمت می‌توانید توضیحات اولیه در مورد درخواست تماس را بنویسید. (غیر اجباری)"
            v-model="description" variant="outlined" rows="2"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-end">
          <v-btn color="orange" variant="outlined" rounded class="me-2" @click="$emit('close')">انصراف</v-btn>
          <v-btn color="primary" rounded @click="reqeustForCall" :loading="loading">ارسال درخواست رزرو
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useCallCenterStore } from "@/stores/callCenter";

export default {
  name: "ReserveForAdvisor",
  props: ["advisor"],

  data() {
    return {
      error_messages: {},
      selected_time: "",
      description: "",
      showDialoge: true,
      loading: false,
      statusLoading: false,
      isOnline: false,
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
    };
  },
  computed: {
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
    category() {
      return this.advisor.category_id;
    },
    advisorSchedule() {
      if (!this.advisor.schedule) {
        return {};
      }

      let plan = this.advisor.schedule;
      let planed = {};
      for (let p in plan) {
        planed[[p]] = plan[p];
      }

      return planed;
    },
  },

  methods: {
    async reqeustForCall() {
      this.loading = true;
      this.error_messages = {};
      try {
        const { data } = await axios.post(
          `/api/advisors/${this.advisor.id}/requestForCall`,
          {
            selected_time: this.selected_time,
            description: this.description,
          }
        );
        emitter.emit("notif");
        this.$emit("close");
      } catch (err) {
        if (err?.response.status == 422)
          this.error_messages = err?.response.data.errors;
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.advisor-about {
  line-height: 3rem;
}
</style>