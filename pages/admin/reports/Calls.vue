<template >
  <v-container>
    <v-row>
      <v-col>
        <card title="تماس ها" :loading="loading">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-table density="compact">
                    <thead>
                      <tr>
                        <th>کاربر</th>
                        <th>مشاور</th>
                        <th>زمان</th>
                        <th>وضعیت</th>
                        <th>فی مکالمه</th>
                        <th>فی ورودی</th>
                        <th>کسر اعتبار</th>
                        <th>دانلود</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="call in callsList" :key="call.id">
                        <td>{{ call.user.name }}</td>
                        <td>{{ call.advisor.name }}</td>
                        <td>{{ call.billsec }}</td>
                        <td>{{ call.disposition }}</td>
                        <td>{{ call.credit_ratio }}</td>
                        <td>{{ call.entrance_fee }}</td>
                        <td>{{ call.deducted_amount }}</td>
                        <td>
                          <v-btn
                            v-if="call.recorded"
                            :href="`/api/calls/${call.id}/download`"
                            density="compact"
                            elevation="0"
                            ><v-icon>mdi-download</v-icon></v-btn
                          >
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" :loading="loading" @click="getCallsList"
              >Reload Calls List</v-btn
            >
          </v-card-actions>
        </card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "wallet",
  components: {},

  data() {
    return {
      loading: false,
      callsList: {},
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
    async getCallsList() {
      this.loading = true;
      const { data } = await axios.get("/api/calls/list");
      console.log(data);
      this.callsList = data.data;
      this.loading = false;
    },
    async recorded(callId) {
      const res = await axios.get(`/api/calls/${callId}/download`);
      console.log(res).data;
    },
  },
  mounted() {
    this.getCallsList();
  },
};
</script>