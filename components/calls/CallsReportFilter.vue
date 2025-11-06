<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" v-if="isItemVisible('date_from')">
        <v-text-field density="compact" v-model="filter.date_from" label="از تاریخ" rounded variant="outlined"
          color="primary"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" v-if="isItemVisible('date_to')">
        <v-text-field density="compact" v-model="filter.date_to" label="تا تاریخ" rounded variant="outlined"
          color="primary"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" v-if="isItemVisible('disposition')">
        <v-select density="compact" :items="dispositionItems" v-model="filter.disposition" label="وضعیت تماس"
          item-title="title" item-value="value" rounded variant="outlined" color="primary" />
      </v-col>
      <v-col cols="12" sm="6" v-if="isItemVisible('advisor_id')">
        <advisor-select density="compact" v-model="filter.advisor_id" label="انتخاب مشاور" rounded variant="outlined"
          color="primary"></advisor-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-end">
        <v-btn @click="doFilter" color="primary" :loading="loading" rounded>فیلتر</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CallsReportFilter",
  props: {
    hiddenFilterItems: {
      default: [],
    },
    loading: {
      type: Boolean
    }
  },
  data: () => {
    return {
      dispositionItems: [
        {
          title: "همه تماس ها",
          value: null,
        },
        {
          title: "پاسخ داده شده",
          value: "ANSWERED",
        },
        {
          title: "بدون پاسخ",
          value: "NOT ANSWERED",
        },
        {
          title: "از دست رفته",
          value: "FAILED",
        },
        {
          title: "مشغول",
          value: "BUSY",
        },
      ],

      filter: {
        date_from: null,
        date_to: null,
        disposition: null,
        user_id: null,
        advisor_id: null,
      },
    };
  },
  methods: {
    doFilter() {
      this.$emit("onFilter", this.filter);
    },
    isItemVisible(item) {
      return this.hiddenFilterItems.includes(item) ? false : true;
    },
  },
  mounted(){
  }
};
</script>