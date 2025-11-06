<template>
  <div>
    
    <v-container v-if="!auth.isLogedIn">
      <v-row>
        <v-col class="mt-20">
          <v-alert type="info" variant="outlined" color="primary" class="py-10">
            برای دسترسی به این صفحه باید ابتدا به عنوان کاربر وارد سیستم شوید. و
            یا در صورتی که تاکنون ثبت نام نکرده اید ثبت نام کنید.
            <div class="text-center mt-5">
              <v-btn
                class="me-2"
                density="compact"
                rounded
                variant="outlined"
                color="primary"
                @click="auth.showLoginForm()"
              >
                ورود</v-btn
              >
            </div>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <card class="mb-5" title="اطلاعات کاربری شما">
        <v-row>
          <v-col> <strong>نام و نام خانوادگی: </strong>{{ user.name }} </v-col>
        </v-row>
        <v-row>
          <v-col> <strong>شماره موبایل: </strong>{{ user.mobile }} </v-col>
        </v-row>
      </card>

      <render-hook page_id="apply-advisor-top" />
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
                v-model="user.mobile"
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

        
      <attachments class="mb-5" :user="user"></attachments>


        <render-hook page_id="apply-advisor-middle" />
        <card title="">
          <v-row>
            <v-col cols="12" class="">
              <v-textarea
                label="قوانین و مقررات"
                rounded="xl"
                name=""
                id=""
                cols="30"
                rows="10"
                class=""
                variant="outlined"
                :model-value="optionsStore.get('apply_advisor_rules', '')"
              >
              </v-textarea>
              <v-checkbox
                label="تمام قوانین و مقررات سایت را می پذیرم"
                color="primary"
                :rules="[rules.mustCheck]"
              ></v-checkbox>
            </v-col>
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

              <div class="">
                لطفا اطلاعات را با دقت بررسی کنید، بعد از ارسال اطلاعات امکان
                ویرایش وجود ندارد.
              </div>
              <br />
              <v-btn
                :disabled="!formEnabled"
                type="submit"
                color="primary"
                class="px-10"
                :loading="submiting"
                rounded="xl"
                >ثبت نام
              </v-btn>
            </v-col>
          </v-row>
        </card>
        <render-hook page_id="apply-advisor-bottom" />
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useCategoriesStore } from "@/store/categories";
import { useOptionsStore } from "@/store/options";
import Attachments from "./Attachments.vue";

export default {
  name: "wallet",
  components: { Attachments },
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
    optionsStore() {
      return useOptionsStore();
    },
    categoriesStore() {
      return useCategoriesStore();
    },
    categories() {
      return this.categoriesStore.listedCategories;
    },
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.user;
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
      return !this.userInfo.request_for_advisor_apply && !this.formSubmited;
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
        .post(`/api/users/applyAsAdvisor`, { ...this.userInfo })
        .then((res) => {
          this.formSubmited = true;
          emitter.emit("notif");
        })
        .catch((err) => {
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
        `/api/users/${this.user.id}?fulldata=true`
      );
      this.userInfo = data.data;
      console.log(this.userInfo)
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
    
    this.loading = false;
  },
};
</script>