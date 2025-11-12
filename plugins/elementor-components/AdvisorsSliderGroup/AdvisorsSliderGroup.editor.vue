<template>
  <v-container>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-select
          rounded
          variant="outlined"
          density="compact"
          v-model="this.data.size"
          :items="[
            { title: 'بزرگ', value: 'large' },
            { title: 'کوچک', value: 'small' },
          ]"
          item-title="title"
          item-value="value"
          label="اندازه اسلاید"
          single-line
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-select
          rounded
          variant="outlined"
          density="compact"
          v-model="this.data.category_id"
          :items="categories"
          item-title="title"
          item-value="value"
          label="دسته بندی"
          single-line
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-checkbox
          v-model="this.data.show_image"
          label="فعال بودن عکس"
          rounded
          variant="outlined"
          density="compact"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-checkbox
          v-model="this.data.show_title"
          label="فعال بودن عنوان"
          rounded
          variant="outlined"
          density="compact"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-checkbox
          v-model="this.data.show_job_title"
          label="فعال بودن عنوان شغلی"
          rounded
          variant="outlined"
          density="compact"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-checkbox
          v-model="this.data.show_stars"
          label="فعال بودن امتیاز و تعداد مشاوره"
          rounded
          variant="outlined"
          density="compact"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-checkbox
          v-model="this.data.show_online_status"
          label="فعال بودن وضعیت آنلاین"
          rounded
          variant="outlined"
          density="compact"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-text-field
          v-model="this.data.count"
          label="تعداد اسلاید ها"
          rounded
          variant="outlined"
          density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-checkbox
          v-model="this.data.autoplay"
          label="چرخش خودکار"
          rounded
          variant="outlined"
          density="compact"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <div>{{ " زمان چرخش : " + this.data.speed + " ثانیه" }}</div>
        <v-slider
          v-model="this.data.speed"
          :disabled="!this.data.autoplay"
          rounded
          type="number"
          min="1"
          step="1"
          max="50"
          variant="outlined"
          density="compact"
        ></v-slider>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-textarea
          v-model="this.data.advisor_container_class"
          rounded
          variant="outlined"
          density="compact"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row class="my-0 py-0">
      <v-col class="my-0 py-0">
        <v-textarea
          v-model="this.data.selected_advisor_container_class"
          rounded
          variant="outlined"
          density="compact"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useCategoriesStore } from "@/stores/categories";

export default {
  props: ["data"],
  created() {},
  computed: {
    categoriesStore() {
      return useCategoriesStore();
    },
    categories() {
      return this.categoriesStore.listedCategories;
    },
  },
  methods: {
    handleCheckboxChange() {
      if (this.data.type) {
        this.$nextTick(() => {
          this.$refs.colsField.focus();
        });
      }
      this.$emit("updateCategoriesList", this.data.type);
    },
  },
};
</script>