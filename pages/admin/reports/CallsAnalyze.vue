<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <card>
            <v-form @submit.prevent="analyze">
              <v-row>
                <v-col cols="12" sm="6" class="pb-0">
                  <div class="text-subtitle-2">
                    مشاور مورد نظر خود را انتخاب کنید:
                  </div>
                  <v-autocomplete
                    density="comfort"
                    auto-select-first
                    :items="advisors"
                    v-model="form.advisor_id"
                    :loading="loadingSearchAdvisor"
                    item-title="name"
                    item-value="id"
                  />
                </v-col>
              </v-row>
              <v-row class="my-0">
                <v-col cols="12" sm="6" class="py-0">
                  <div class="text-subtitle-2">از تاریخ:</div>
                  <v-text-field density="comfort" v-model="form.since" />
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <div class="text-subtitle-2">تا تاریخ:</div>
                  <v-text-field density="comfort" v-model="form.to" />
                </v-col>
              </v-row>
              <v-row class="my-0">
                <v-col class="text-end py-0">
                  <v-btn type="submit" color="primary" :loading="loading"
                    >تحلیل</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <card>
            <v-table hover density="compact" class="text-h6">
              <thead>
                <tr>
                  <th>عنوان داده</th>
                  <th>مقدار</th>
                  <th>واحد</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>تعداد تماس ها</td>
                  <td>{{ analyzeData.calls_count }}</td>
                  <td>مورد</td>
                </tr>
                <tr>
                  <td>مجموع زمان تماس ها</td>
                  <td>{{ analyzeData.billsec_total }}</td>
                  <td>ساعت و دقیقه</td>
                </tr>
                <tr>
                  <td>میانگین زمان تماس ها</td>
                  <td>{{ analyzeData.billsec_avg }}</td>
                  <td>ساعت و دقیقه</td>
                </tr>
                <tr>
                  <td>کل مبلغ کارکرد</td>
                  <td>{{ analyzeData.calls_amount }}</td>
                  <td>تومان</td>
                </tr>
                <tr>
                  <td>هزینه تماس</td>
                  <td>{{ (+analyzeData.net_cost_total).toLocaleString() }}</td>
                  <td>تومان</td>
                </tr>
                <tr>
                  <td>میانگین امتیاز</td>
                  <td>{{ (+analyzeData.poll_score_avg).toFixed(2) }}</td>
                  <td></td>
                </tr>
              </tbody>
            </v-table>
          </card>
        </v-col>
      </v-row>
      <v-container>
        <v-row>
          <v-col>
            <strong>تعداد تماس ها: </strong> {{ analyzeData.calls_count }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>مجموع زمان تماس ها: </strong>
            {{ analyzeData.billsec_total }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <strong>کل مبلغ کارکرد: </strong>
            {{ analyzeData.calls_amount }}
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "calls-analyze",
  data() {
    return {
      loadingSearchAdvisor: false,
      advisors: [],
      form: {
        advisor_id: null,
        since: null,
        to: null,
      },
      analyzeData: {},
      loading: false,
    };
  },
  watch: {
    selectAdvisor(val) {
      val && val !== this.select && this.searchAdvisor(val);
    },
  },
  methods: {
    searchAdvisor: _.debounce(async function (advisor) {
      this.loadingSearchAdvisor = true;
      const { data } = await axios.get(`/api/advisors/search`, {
        params: { token: advisor },
      });

      let advisors = data.data;
      this.advisors = advisors.map((advisor) => {
        return {
          name: advisor.name,
          id: advisor.id,
        };
      });
      this.loadingSearchAdvisor = false;
    }, 500),
    async analyze() {
      this.loading = true;
      const { data } = await axios.get(`/api/reports/analyzeCalls`, {
        params: this.form,
      });
      this.analyzeData = data.data;
      this.loading = false;
    },
  },
  mounted() {
    this.searchAdvisor("");
  },
};
</script>