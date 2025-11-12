<template >
  <v-container>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" persistent scrollable>
          <card :loading="loading" title="ایجاد مشاور جدید">
            <v-card-text>
              <v-container>
                <v-row class="pa-0 mb-5">
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="نام"
                      required
                      v-model="advisor.firstname"
                      :error-messages="formErrors.firstname"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="نام خانوادگی"
                      required
                      v-model="advisor.lastname"
                      :error-messages="formErrors.lastname"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="شماره مویایل"
                      required
                      v-model="advisor.mobile"
                      :error-messages="formErrors.mobile"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="رمز عبور"
                      required
                      v-model="advisor.password"
                      :error-messages="formErrors.password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pa-0 mb-5">
                  <v-col class="py-0 ma-0" cols="12" sm="12">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="توضیح مختصر در مورد مشاور"
                      required
                      v-model="advisor.description"
                      :error-messages="formErrors.description"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pa-0 mb-5">
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="عنوان"
                      required
                      v-model="advisor.title"
                      :error-messages="formErrors.title"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="عنوان شغلی"
                      required
                      v-model="advisor.job_title"
                      :error-messages="formErrors.job_title"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pa-0 mb-5">
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="فی ورودی"
                      required
                      v-model="advisor.entrance_fee"
                      :error-messages="formErrors.entrance_fee"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="فی هر دقیقه"
                      required
                      v-model="advisor.credit_ratio"
                      :error-messages="formErrors.credit_ratio"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pa-0 mb-5">
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="حداقل مکالمه (دقیقه)"
                      required
                      v-model="advisor.min_call_time"
                      :error-messages="formErrors.min_call_time"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-text-field
                      rounded
                      variant="outlined"
                      density="compact"
                      label="حداکثر مکالمه (دقیقه)"
                      required
                      v-model="advisor.max_call_time"
                      :error-messages="formErrors.max_call_time"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0 ma-0" cols="12" sm="6">
                    <v-select
                      rounded
                      variant="outlined"
                      v-model="advisor.category_ids"
                      :items="categories"
                      item-title="title"
                      item-value="value"
                      label="دسته بندی"
                      multiple
                      single-line
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h4 class="text-gray mb-2">درباره مشاور</h4>
                    <text-editor v-model="advisor.about"></text-editor>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      rounded
                      @click="createAdvisor"
                      :loading="loading"
                    >
                      ثبت
                    </v-btn>
                    <v-btn
                      color="primary"
                      rounded
                      variant="text"
                      @click="cancel"
                    >
                      انصراف
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from "../../../stores/auth";
import { useCategoriesStore } from "@/stores/categories";
import TextEditor from "@/components/appComponents/TextEditor.vue";

export default {
  name: "create-advisor",
  components: { TextEditor },
  data() {
    return {
      loading: false,
      dialog: true,
      advisor: {},
      formErrors: {},
      content: "",
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    categoriesStore() {
      return useCategoriesStore();
    },
    categories() {
      return this.categoriesStore.listedCategories;
    },
  },
  methods: {
    async createAdvisor() {
      this.loading = true;
      axios
        .post(`/api/advisors`, this.advisor)
        .then((res) => {
          this.$emit("created", this.advisor);
          emitter.emit("notif");
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.formErrors = error.response.data.errors;
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  async mounted() {},
};
</script>