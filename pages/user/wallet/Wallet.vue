<template >
  <v-container>
    <v-row>
      <v-col>
        <v-alert
          v-if="status == 'error'"
          type="error"
          closable
          class="mb-5 rounded-xl"
          variant="tonal"
        >
          عملیات پرداخت موفقیت آمیز نبود
        </v-alert>
        <v-alert
          v-if="status == 'success'"
          type="success"
          closable
          class="mb-5 rounded-xl"
          variant="tonal"
        >
          افزایش اعتبار با موفقیت انجام شد.
        </v-alert>
        <card icon="mdi-wallet" title="کیف پول" :loading="false">
          <v-card-text>
            <v-row>
              <v-col class="text-center">
                <v-chip dense color="green-darken-4" class="ml-2">
                  مانده اعتبار کیف پول: {{ user.balance.toLocaleString() ?? 0 }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="8" class="text-center">
                <div class="text-caption text-start">انتخاب مبلغ:</div>
                <v-slider
                  v-model="value"
                  color="primary"
                  :min="minAmount"
                  :max="maxAmount"
                  :step="stepAmount"
                  thumb-label
                  :disabled="form_lock"
                ></v-slider>
                <div class="mb-5">
                  افزایش اعتبار کیف پول به مبلغ:
                  <strong>{{ value.toLocaleString() }}</strong>
                  تومان
                </div>
                <div>
                  <v-row class="mt-10">
                    <v-col cols="8">
                      <v-text-field
                        v-model="discount_code"
                        rounded
                        variant="outlined"
                        density="compact"
                        label="کد تخفیف"
                        block
                        :disabled="form_lock"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-btn
                        @click="setDiscount"
                        color="grey"
                        rounded="xl"
                        :disabled="form_lock"
                        >اعمال کد تخفیف</v-btn
                      >
                    </v-col>
                  </v-row>
                </div>
                <div class="text-green my-5 mb-2">
                  مبلغ قابل پرداخت:
                  <span class="text-h6">
                    <!-- <number-animate :number="final_amount"></number-animate> -->
                    {{ final_amount }}
                  </span>
                  تومان
                </div>
                <v-btn
                  @click="increaseCredit"
                  class="mx-1"
                  size="large"
                  color="primary"
                  rounded
                >
                  {{ paymentBtnText }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <card title="فهرست تراکنش ها">
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>مبلغ</th>
                  <th>شرح تراکنش</th>
                  <th>تاریخ پرداخت</th>
                  <th>مانده</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="credit in credits"
                  :key="credit.id"
                  :class="{
                    'text-green': credit.amount > 0,
                    'text-red': credit.amount < 0,
                  }"
                >
                  <td>{{ credit.amount.toLocaleString() }}</td>
                  <td>{{ credit.type_fa }}</td>
                  <td>{{ credit.created_at_fa }}</td>
                  <td>{{ credit.user_balance.toLocaleString() }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAuthStore } from "../../../store/auth";
import { useOptionsStore } from "../../../store/options";

export default {
  name: "wallet",
  components: {},
  props: ["amount", "status"],
  data() {
    return {
      loading: false,
      credits: {},
      value: 50000,
      paymentBtnText: " اتصال به درگاه بانکی",
      countDown: 3,
      form_lock: false,
      discount_code: "",
      final_amount: 50000,
    };
  },
  watch: {
    value(newVal) {
      this.final_amount = newVal;
    },
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
    },
    options() {
      return useOptionsStore();
    },
    minAmount() {
      return this.options.options.wallet_increase_min ?? 50000;
    },
    maxAmount() {
      return this.options.options.wallet_increase_max ?? 500000;
    },
    stepAmount() {
      return this.options.options.wallet_increase_step ?? 50000;
    },
  },

  methods: {
    async increaseCredit() {
      if (this.loading) return false;
      this.loading = true;
      this.paymentBtnText = "در حال اتصال";
      const formData = {
        amount: this.value,
        discount_code: this.discount_code,
      };
      try {
        const { data } = await axios.post("/api/purchase", formData);
        this.paymentBtnText = "تا لحظاتی دیگر";
        window.location = data.action;
      } catch (er) {
        this.loading = false;
        this.paymentBtnText = "اتصال به درگاه بانکی";
      }
      await this.auth.fetchUser();
      // this.loading = false;
    },
    async getMyCredits() {
      const { data } = await axios.get(
        `/api/users/${this.user.id}/transactions`
      );
      this.credits = data.data;
    },
    setDiscount() {
      axios
        .post(`/api/discounts/${this.discount_code}/check`, {
          amount: this.value,
        })
        .then((res) => {
          if (res.data.success) {
            this.setDiscountSuccess(res.data);
          }
        });
    },
    setDiscountSuccess(data) {
      this.form_lock = true;
      console.log(data);
      this.final_amount = data.after_discount;
    },
  },

  mounted() {
    this.getMyCredits();
    this.value = this.options.options.wallet_increase_min ?? 50000;
  },
};
</script>