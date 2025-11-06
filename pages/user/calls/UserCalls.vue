<template >
  <v-container>
    <v-row>
      <v-col>
        <card title="تماس های من" :loading="loading">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-table density="compact" class="text-center">
                    <thead>
                      <tr>
                        <th class="text-center"></th>
                        <th class="text-center">مشاور</th>
                        <th class="text-center">
                          مدت
                          <br>
                          (دقیقه و ثانیه)
                        </th>
                        <th class="text-center">تاریخ</th>
                        <th class="text-center">ساعت</th>
                        <th class="text-center">وضعیت</th>
                        <th class="text-center">نظرسنجی</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="call in callsList" :key="call.id">
                        <td width="1%">
                          <v-img
                            :src="call.advisor.img_url"
                            class="rounded-circle"
                            height="40"
                            width="40"
                          />
                        </td>
                        <td width="1%" class="py-2">
                          <v-btn
                            :to="{
                              name: 'advisor',
                              params: { advisorId: call.advisor.id },
                            }"
                            color="primary"
                            variant="tonal"
                            rounded
                            >{{ call.advisor.name }}</v-btn
                          >
                        </td>
                        <td dir="ltr">{{ $filters.secToMin(call.billsec) }}</td>
                        <td dir="ltr">
                          <v-chip density="compact">{{
                            call.created_at_fa.split(" ")[0]
                          }}</v-chip>
                        </td>
                        <td dir="ltr">
                          <v-chip density="compact">{{
                            call.created_at_fa.split(" ")[1]
                          }}</v-chip>
                        </td>
                        <td
                          :class="{
                            'text-green': call.disposition == 'ANSWERED',
                            'text-red': call.disposition != 'ANSWERED',
                          }"
                        >
                          <v-btn
                            density="compact"
                            :icon="
                              call.disposition == 'ANSWERED'
                                ? 'mdi-check'
                                : 'mdi-close'
                            "
                            size="small"
                            :color="
                              call.disposition == 'ANSWERED'
                                ? 'green'
                                : 'red'
                            "
                          />
                        </td>
                        <td>{{ call.poll_score }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAuthStore } from "@/store/auth";

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
      return this.auth.user;
    },
  },
  methods: {
    async getCallsList() {
      this.loading = true;
      const { data } = await axios.get(`/api/users/${this.user.id}/calls`);
      console.log(data);
      this.callsList = data.data;
      this.loading = false;
    },
  },
  mounted() {
    this.getCallsList();
  },
};
</script>