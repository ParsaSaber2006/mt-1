<template>
  <div>
  
    <breadcrumbs :items="breadcrumbs" />
    <v-container>
      <card class="mb-5" title="اطلاعات کاربر">
        <v-row>
          <v-col>
            <strong>نام و نام خانوادگی: </strong>{{ userInfo.name }}
          </v-col>
        </v-row>
        <v-row>
          <v-col> <strong>شماره موبایل: </strong>{{ userInfo.mobile }} </v-col>
        </v-row>
      </card>

      <loading-wait
        :loading="loading && categoriesStore.loading"
      ></loading-wait>
      <v-form
        @submit.prevent="submitForm"
        ref="applyForm"
        validate-on="input"
        :disabled="!formEnabled"
        v-if="!loading && !categoriesStore.loading"
      >
        <card class="mb-5" title="فرم اطلاعات مشاور">
          <v-row class="pt-5">
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="نام"
                v-model="userInfo.firstname"
                :error-messages="formErrors.firstname"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="نام خانوادگی"
                v-model="userInfo.lastname"
                :error-messages="formErrors.lastname"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="کد ملی"
                :rules="[rules.required, rules.codemelli]"
                v-model="userInfo.national_code"
                :error-messages="formErrors.national_code"
                :counter="10"
                maxlength="10"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label=" نام پدر"
                v-model="userInfo.fathername"
                :error-messages="formErrors.fathername"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label=" شماره شناسنامه"
                v-model="userInfo.birth_cirtificate_no"
                :error-messages="formErrors.birth_cirtificate_no"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="تاریخ تولد"
                v-model="userInfo.birthdate"
                hint="مثل: 1360/01/01"
                persistent-hint
                :rules="[rules.required]"
                :error-messages="formErrors.birthdate"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="جنسیت"
                :items="[
                  { title: 'مرد', value: 1 },
                  { title: 'زن', value: 2 },
                ]"
                item-value="value"
                item-title="title"
                v-model="userInfo.gender"
                :error-messages="formErrors.gender"
                :rules="[rules.mustSelect]"
              />
            </v-col>
          </v-row>
        </card>
        <card class="mb-5" title="آدرس و اطلاعات تماس">
          <v-row class="pt-5">
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                readonly
                v-model="userInfo.mobile"
                density="compact"
                label="شماره موبایل"
                hint="شماره موبایل شما از این قسمت قابل تغییر نیست."
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                color="primary"
                :items="provinces"
                item-title="name"
                item-value="id"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="استان"
                v-model="userInfo.province_id"
                :error-messages="formErrors.province_id"
                :rules="[rules.mustSelect]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                color="primary"
                :items="cities"
                item-title="name"
                item-value="id"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="شهر"
                v-model="userInfo.city_id"
                :error-messages="formErrors.city_id"
                :rules="[rules.mustSelect]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="آدرس منزل"
                v-model="userInfo.home_address"
                :error-messages="formErrors.home_address"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="کد پستی"
                v-model="userInfo.home_postal_code"
                :error-messages="formErrors.home_postal_code"
                :counter="10"
                maxlength="10"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="شماره تماس اضطراری"
                v-model="userInfo.emergency_phone_number"
                :error-messages="formErrors.emergency_phone_number"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
        </card>
        <card class="mb-5" title="اطلاعات شغلی">
          <v-row class="pt-5">
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                type="email"
                density="compact"
                label="آدرس ایمیل"
                v-model="userInfo.email"
                :error-messages="formErrors.email"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="شغل"
                v-model="userInfo.job_title"
                hint="مثل: وکیل پایه یک، پزشک متخصص اطفال، برنامه نویس و ... "
                persistent-hint
                :error-messages="formErrors.job_title"
                :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="آدرس محل کار"
                v-model="userInfo.office_address"
                :error-messages="formErrors.office_address"
                :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="کد پستی محل کار"
                v-model="userInfo.office_postal_code"
                :error-messages="formErrors.office_postal_code"
                maxlength="10"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="شماره تماس ثابت"
                v-model="userInfo.office_phone_number"
                :error-messages="formErrors.office_phone_number"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
        </card>
        <card class="mb-5" title="اطلاعات تکمیلی">
          <v-row class="pt-5">
            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                variant="outlined"
                rounded="xl"
                density="compact"
                label="عنوان رسمی"
                hint="مثل: دکتر، مهندس، کارشناس و .."
                persistent-hint
                v-model="userInfo.title"
                :error-messages="formErrors.title"
                :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                variant="outlined"
                hint="یک پاراگراف مختصر در مورد سوابق و توانمندی های خودتان جهت درج در سامانه "
                persistent-hint
                :rules="[rules.required]"
                rounded="xl"
                density="compact"
                label="توانمندی‌ها و فعالیت ها"
                v-model="userInfo.about"
                :error-messages="formErrors.about"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                color="primary"
                label="دسته بندی"
                multiple
                v-model="userInfo.category_ids"
                :items="categories"
                variant="outlined"
                rounded="xl"
                chips
                closable-chips
                :rules="[rules.mustSelect]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                color="primary"
                label="زیردسته بندی"
                multiple
                v-model="userInfo.subcategories"
                :items="subcategories"
                rounded="xl"
                variant="outlined"
                chips
                closable-chips
              >
                <template #item="data">
                  <v-list-subheader
                    v-if="data.props.header"
                    class="text-primary mt-2"
                  >
                    <strong>{{ data.props.header }}</strong>
                  </v-list-subheader>
                  <v-divider v-if="data.props.header" />
                  <v-list-item v-else v-bind="data.props" title="">
                    <template #default>
                      <v-list-item-title>{{
                        data.item.raw.title
                      }}</v-list-item-title></template
                    >
                    <template #prepend="item">
                      <v-checkbox-btn v-model="item.isActive"></v-checkbox-btn>
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </card>

        <card class="mb-5">
          <v-row class="">
            <v-col class="" cols="12" sm="6">
              <v-text-field
                rounded
                variant="outlined"
                density="compact"
                label="فی ورودی"
                required
                v-model="userInfo.entrance_fee"
                :error-messages="formErrors.entrance_fee"
              ></v-text-field>
            </v-col>
            <v-col class="" cols="12" sm="6">
              <v-text-field
                rounded
                variant="outlined"
                density="compact"
                label="فی هر دقیقه"
                required
                v-model="userInfo.credit_ratio"
                :error-messages="formErrors.credit_ratio"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col class="" cols="12" sm="6">
              <v-text-field
                rounded
                variant="outlined"
                density="compact"
                label="درصد سهم مشاور"
                required
                type="number"
                hint="بین 0 تا 100"
                v-model="userInfo.advisor_percent"
                :error-messages="formErrors.advisor_percent"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col class="" cols="12" sm="6">
              <v-text-field
                rounded
                variant="outlined"
                density="compact"
                label="حداقل مکالمه (دقیقه)"
                required
                v-model="userInfo.min_call_time"
                :error-messages="formErrors.min_call_time"
              ></v-text-field>
            </v-col>
            <v-col class="" cols="12" sm="6">
              <v-text-field
                rounded
                variant="outlined"
                density="compact"
                label="حداکثر مکالمه (دقیقه)"
                required
                v-model="userInfo.max_call_time"
                :error-messages="formErrors.max_call_time"
              ></v-text-field>
            </v-col>
          </v-row>
        </card>
        <card title="مدارک " class="mb-5">
          <v-card-text>
            <v-row>
              <v-col>
                <show-attachments :user_id="user_id"></show-attachments>
              </v-col>
            </v-row>
          </v-card-text>
        </card>
        <card title="" class="mb-5">
          <v-row>
            <v-col cols="12" class="text-center">
              <v-slide-y-transition>
                <v-alert
                  type="error"
                  rounded="xl"
                  class="text-start mb-4"
                  variant="outlined"
                  v-if="!formIsValid || formHasErrors"
                  >برخی از موارد به درستی تکمیل نشده است، لطفا به پیام ها دقت
                  نمایید.</v-alert
                >
              </v-slide-y-transition>
              <v-btn
                :disabled="!formEnabled"
                type="submit"
                color="primary"
                class="px-10"
                :loading="submiting"
                rounded="xl"
                >ثبت اطلاعات و استخدام مشاور
              </v-btn>
            </v-col>
          </v-row>
        </card>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { useCategoriesStore } from "@/stores/categories";
import ShowAttachments from "./ShowAttachments.vue";

export default {
  name: "wallet",
  props: ["user_id"],
  components: { ShowAttachments },
  data() {
    return {
      submiting: false,
      loading: false,
      formIsValid: true,
      userInfo: {
        extra_info: {},
      },
      formErrors: {
        extra_info: {},
      },
      formHasErrors: false,
      formSubmited: false,
      provinces: [],
      rules: {
        required: (v) => !!v || "وارد کردن مقدار الزامی است.",
        mustCheck: (v) => !!v || "انتخاب گزینه الزامی است",
        mustSelect: (v) => {
          if (!v || v.length < 1) return "انتخاب گزینه الزامی است";
          return true;
        },
        phonenumber: (value) => {
          if (value?.length > 9 && /[0-9-]+/.test(value)) return true;
          return "شماره تلفن را کامل و صحیح وارد کنید";
        },
        codemelli: (input) => {
          if (!/^\d{10}$/.test(input)) return "کد ملی اشتباه وارد شده است";
          const check = +input[9];
          const sum =
            input
              .split("")
              .slice(0, 9)
              .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;

          if (sum < 2 ? check === sum : check + sum === 11) return true;

          return "کد ملی اشتباه وارد شده است";
        },
      },
    };
  },
  computed: {
    breadcrumbs: () => [
      {
        title: "صفحه اصلی",
        disabled: false,
        to: "/",
      },
      {
        title: "شناسه کاربری ",
        disabled: true,
      },
    ],
    categoriesStore() {
      return useCategoriesStore();
    },
    categories() {
      return this.categoriesStore.listedCategories;
    },
    auth() {
      return useAuthStore();
    },
    formIsValidate() {},
    subcategories() {
      if (this.userInfo.category_ids == undefined) return [];
      if (this.userInfo.category_ids.length == 0) return [];

      let items = [];

      this.userInfo.category_ids.forEach((catIndex) => {
        let category = this.categories.find((item) => catIndex == item.value);
        items.push({
          props: { header: category.title + ` (${category.tags.length})` },
        });
        let tags = category.tags.map((t) => {
          return { title: t, value: t };
        });
        items.push(...tags);
      });
      return items;
    },
    cities() {
      if (this.provinces.length == 0) return [];
      const province = this.provinces.find(
        (item) => item.id == this.userInfo.province_id
      );
      return province?.cities;
    },
    formEnabled() {
      return true;
    },
  },
  methods: {
    submitForm() {
      this.formErrors = {};
      this.formHasErrors = false;

      this.formIsValid = this.$refs.applyForm.isValid;
      if (!this.formIsValid) return false;

      this.submiting = true;
      axios
        .put(`/api/users/applyAsAdvisor`, {
          ...this.userInfo,
          user_id: this.user_id,
        })
        .then((res) => {
          this.formSubmited = true;
          emitter.emit("notif");
          this.$router.push({ name: "admin.applyAsAdvisorRequests" });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 422) {
            this.formErrors = err.response.data.errors;
            this.formHasErrors = true;
          }
        })
        .then(() => {
          this.submiting = false;
        });
    },
    async getUserFullData() {
      const { data } = await axios.get(
        `/api/users/${this.user_id}?fulldata=true`
      );
      this.userInfo = data.data;
    },
    async getProvinces() {
      const { data } = await axios.get("/api/provinces");
      this.provinces = data.data;
    },
  },
  async mounted() {
    this.loading = true;
    await this.getProvinces();
    await this.getUserFullData();
    // this.categoriesStore.getCategoriesFromServer(); 
    this.loading = false;
  },
};
</script>