<template >
    <v-row>
      <v-col>
        <card  title="مدیریت کیف پول کاربر" :loading="loading">
          <v-card-title>افزایش/کاهش مانده کیف پول</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    rounded
                    density="compact"
                    variant="outlined"
                    v-model="newtransaction.amount"
                    label="مبلغ"
                    :error-messages="newTransactionErrors.amount"
                  />
                </v-col>
                <v-col>
                  <v-select
                    item-value="value"
                    item-title="name"
                    rounded
                    density="compact"
                    variant="outlined"
                    :error-messages="newTransactionErrors.operation_type"
                    v-model="newtransaction.operation_type"
                    label="عملیات"
                    :items="[
                      { name: 'افزایش', value: 'increase' },
                      { name: 'کاهش', value: 'decrease' },
                    ]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    rounded
                    density="compact"
                    variant="outlined"
                    v-model="newtransaction.comment"
                    label="توضیح"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    @click="doTrsansaction"
                    color="primary"
                    rounded
                    :loading="loading"
                  >
                    ثبت مبلغ
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>

            <v-card-title>تراکنش ها</v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  <v-table>
                    <thead>
                      <tr>
                        <th>مبلغ</th>
                        <th>بابت</th>
                        <th>تاریخ و ساعت</th>
                        <th>مانده</th>
                        <th>شرح</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="transaction in user?.transactions"
                        :key="transaction"
                      >
                        <td
                        dir="ltr"
                          :class="{
                            'text-red': transaction.amount < 0,
                            'text-green': transaction.amount > 0,
                          }"
                        >
                          {{ transaction.amount }}
                        </td>
                        <td>{{ transaction.type_fa }}</td>
                        <td>{{ transaction.created_at_fa }}</td>
                        <td>{{ transaction.user_balance }}</td>
                        <td>{{ transaction.comment }}</td>
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
</template>

<script>
import { useAuthStore } from "@/store/auth";
import EditUser from "./Edit.vue";

export default {
  name: "wallet",
  components: { EditUser },
  props: ["user"],
  data() {
    return {
      editable_wallet: null,
      loading: false,
      search: "",
      newtransaction: {
        operation_type: "increase",
      },
      newTransactionErrors: {},
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  watch:{
    user_id(){
      alert(this.user_id)
    },
  },
  methods: {
    doTrsansaction() {
      this.loading = true;

      axios
        .post(`/api/users/${this.user.id}/transactions`, this.newtransaction)
        .then((res) => {
          this.newtransaction = {
            operation_type: "increase",
          };
          this.newTransactionErrors = {};
          this.$emit("refreshUser")
          emitter.emit("notif");
          // this.user = res.data.data;
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status == 422) {
            console.log(error.response.data.errors);
            this.newTransactionErrors = error.response.data.errors;
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
  },
};
</script>
