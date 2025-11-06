<template>
  <v-row justify="center">
    <v-col class="py-0 ma-0" md="12">
      <card :loading="loading" title="ویرایش مشاور">
        <v-card-text v-if="advisor">
          <v-container>
            <v-row class="pa-0 mb-5">
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
            </v-row>
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
                  label="درصد سهم مشاور"
                  required
                  type="number"
                  hint="بین 0 تا 100"
                  v-model="advisor.advisor_percent"
                  :error-messages="formErrors.advisor_percent"
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
                  color="primary"
                  rounded
                  variant="outlined"
                  chips
                  closable-chips
                  v-model="advisor.category_ids"
                  :items="categories"
                  item-title="title"
                  item-value="value"
                  label="دسته بندی"
                  single-line
                  multiple
                  :error-messages="formErrors.category_ids"
                ></v-select>
              </v-col>
              <v-col class="py-0 ma-0" cols="12" sm="6">
                <v-select
                  color="primary"
                  label="زیردسته بندی"
                  multiple
                  v-model="advisor.subcategories"
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
                        <v-checkbox-btn
                          v-model="item.isActive"
                        ></v-checkbox-btn>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h4 class="text-gray mb-1">درباره مشاور</h4>
                <text-editor v-model="advisor.about"></text-editor>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  color="primary"
                  @click="updateAdvisor"
                  :loading="loading"
                  rounded
                >
                  ذخیره
                </v-btn>

                <v-btn @click="wpSync">
                  WpSync
                </v-btn>

                <v-btn @click="wpImageSync">
                  WpImageSync
                </v-btn>
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
import { useCategoriesStore } from "@/store/categories";

export default {
  name: "edit-advisor",
  components: {},
  props: ["advisor"],
  data() {
    return {
      loading: false,
      formErrors: {},
      availableTags: [],
    };
  },
  computed: {
    subcategories() {
      if (this.categoriesStore.loading) return [];
      if (this.advisor.category_ids == undefined) return [];
      if (this.advisor.category_ids.length == 0) return [];

      let items = [];

      this.advisor.category_ids.forEach((catIndex) => {
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
    auth() {
      return useAuthStore();
    },
    categoriesStore() {
      return useCategoriesStore();
    },
    categories() {
      return this.categoriesStore.listedCategories;
    },
    allCategories() {
      return this.categoriesStore.categories;
    },
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: "مشاورین",
          disabled: false,
          to: { name: "admin.advisors" },
        },
        {
          title: "مشاور",
          disabled: false,
          to: {
            name: "admin.advisors.show",
            params: { advisor_id: this.advisor_id },
          },
        },
        {
          title: "ویرایش",
          disabled: true,
          to: "",
        },
      ];
    },
  },
  methods: {
    async updateAdvisor() {
      this.loading = true;
      axios
        .put(`/api/advisors/${this.advisor.id}`, this.advisor)
        .then((res) => {
          this.formErrors = {};
          emitter.emit("notif");
        })
        .catch((err) => {
          this.formErrors = err.response.data.errors;
        })
        .then(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.$emit("cancel");
    },
    tagsCompute() {
      return this.allCategories.map((item) => {
        if (item.tags.length > 0) {
          this.availableTags.push(...item.tags);
        }
      });
    },
    async wpSync(){
      const data = await axios.post(`/api/advisors/${this.advisor.id}/wpSync`);
    },
    async wpImageSync(){
      const data = await axios.post(`/api/advisors/${this.advisor.id}/wpImageUpdate`);
    }
  },
  async mounted() {
    this.tagsCompute();
  },
};
</script>