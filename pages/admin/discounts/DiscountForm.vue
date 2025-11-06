<template>
  <v-container>
    <v-row>
      <v-col>
        <card>
          <v-card-text>
            <v-form ref="form" >
              <!-- کد تخفیف -->
              <v-text-field
                v-model="formData.code"
                label="کد تخفیف"
                variant="outlined"
                rounded
                density="compact"
                required
                :error-messages="formErrors.code"
                
              ></v-text-field>
              <!-- نوع تخفیف -->
              <v-select
                v-model="formData.type"
                :items="discountTypes"
                label="نوع تخفیف"
                variant="outlined"
                rounded
                item-value="value"
                item-title="name"
                density="compact"
                required
                :rules="[rules.required]"
                :error-messages="formErrors.type"
              ></v-select>

              <!-- مقدار تخفیف -->
              <v-text-field
                v-model="formData.value"
                label="مقدار تخفیف"
                variant="outlined"
                rounded
                density="compact"
                required
                type="number"
                :rules="[rules.required, rules.numeric, rules.percentageRule]"
                :error-messages="formErrors.value"
              ></v-text-field>

              <!-- حداقل مبلغ -->
              <v-text-field
                v-model="formData.min_amount"
                label="حداقل مبلغ قابل تخفیف"
                variant="outlined"
                rounded
                density="compact"
                type="number"
                :rules="[rules.numeric]"
                :error-messages="formErrors.min_amount"
              ></v-text-field>
              <!-- تاریخ شروع  -->
              <v-text-field
                v-model="formData.valid_from"
                label="تاریخ شروع"
                variant="outlined"
                rounded
                density="compact"
                required
                :rules="[rules.required]"
                :error-messages="formErrors.valid_from"
              ></v-text-field>

              <!-- تاریخ انقضا -->
              <v-text-field
                v-model="formData.valid_until"
                label="تاریخ انقضا"
                variant="outlined"
                rounded
                density="compact"
                required
                :rules="[rules.required]"
                :error-messages="formErrors.valid_until"
              ></v-text-field>

              <!-- حداکثر تعداد استفاده -->
              <v-text-field
                v-model="formData.max_use"
                label="حداکثر تعداد دفعات استفاده"
                variant="outlined"
                rounded
                density="compact"
                type="number"
                :rules="[rules.numeric]"
                :error-messages="formErrors.max_use"
              ></v-text-field>

              <!-- دکمه ارسال -->
              <v-btn
              :disabled="!isFormValid"
              color="primary"
              class="mt-4"
              @click="submitForm"
              rounded
            >
              ارسال
            </v-btn>

            </v-form>
          </v-card-text>
        </card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "discount-form",
  props: {
    mode: {
      type: String,
      default: "create", // یا "edit"
    },
    discountData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      valid: false,
      isFormValid: false,

      formData: {
        code: "",
        type: "",
        value: "",
        min_amount: null,
        valid_until: "",
        valid_from: "",
        max_use: null,
      },
      formErrors: {},
      discountTypes: [
        { name: "درصدی", value: "percentage" },
        { name: "مبلغ ثابت", value: "fixed" },
      ],
      rules: {
        required: (value) => !!value || "وارد کردن این فیلد ضروری است.",
        numeric: (value) =>
          !value ||
          /^[0-9]+(\.[0-9]{1,2})?$/.test(value) ||
          "فقط مقدار عددی وارد شود.",
        percentageRule: (value) => {
          if (this.formData.type === "percentage") {
            return (
              (value >= 0 && value <= 100) ||
              "مقدار درصدی باید عددی بین 0 و 100 باشد."
            );
          }
          return true;
        },
      },
    };
  },
  methods: {
    submitForm() {
      this.formErrors = {};

  if (this.$refs.form.validate()) {
    const request =
      this.mode === "edit"
        ? axios.put(`/api/discounts/${this.discountData.id}`, this.formData)
        : axios.post("/api/discounts", this.formData);

    request
      .then(() => {
        this.$emit("success")
        
      })
      .catch((error) => {
        
        this.formErrors = "";
        if(error.response.status ==422){
          console.log(error.response.data);
          this.formErrors = error.response?.data?.errors || {};
        
        this.$nextTick(() => {
          this.isFormValid = this.$refs.form.validate();
        });
        
      }
      });
  }
}

    },
  
  watch: {
    discountData: {
      handler(newVal) {
        this.formData = { ...this.formData, ...newVal };
      },
      immediate: true,
    },
    formData: {
    handler() {
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.isFormValid = this.$refs.form.validate();
        }
      });
    },
    deep: true,
  },
    
  },
};
</script>
