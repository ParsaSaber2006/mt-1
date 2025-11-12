<template>
  <v-container>
    <v-row>
      <v-col>
        <v-expansion-panels class="mb-2">
          <v-expansion-panel title="فیلتر تماس ها" class="border rounded-lg" elevation="0">
            <v-expansion-panel-text>
              <calls-report-filter @onFilter="doFilter" :hiddenFilterItems="hiddenFilterItems" :loading="loading"
                :fixedFilterData="fixedFilterData" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    
    <v-data-table-server class="border rounded-lg" v-model:expanded="expanded" show-expand density="compact"
      :headers="headers" :items="calls" @update:options="getCallsList" :items-length="totalItems" :loading="loading"
      hover v-if="isMounted">
      <template v-slot:item.deducted_amount="{ item }">{{ item.deducted_amount?.toLocaleString() }}
      </template>
      <template v-slot:item.disposition="{ item }">
        <call-status-icon class="pa-0 px-1" :disposition="item.disposition" />
      </template>
      <template v-slot:item.billsec="{ item }">{{ item.billsec?.toLocaleString() }}
      </template>
      <template v-slot:item.created_at="{ item }">
        <v-chip density="compact" class="me-2 pa-0" variant="text">
          {{ item.created_at_fa.split(" ")[0] }}
        </v-chip>
        <v-chip density="compact" class="pa-0" variant="text">{{
          item.created_at_fa.split(" ")[1]
          }}</v-chip>
      </template>
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <div><strong>کد تماس:</strong> {{ item.id }}</div>
                  <div>
                    <strong>وضعیت تماس: </strong>
                    {{ item.disposition }}
                  </div>
                  <div>
                    <strong>دسته بندی: </strong>
                    {{ item.category.name }}
                  </div>
                  <div>
                    <strong>مشاور: </strong>
                    {{ item.advisor.name }}
                  </div>
                  <div>
                    <strong>مراجع: </strong>
                    {{ item.user.name }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div>
                    <strong>مدت زمان تماس:</strong>
                    {{ (item.billsec ?? 0).toLocaleString() }}
                    ثانیه
                  </div>
                  <div>
                    <strong>مبلغ کسر از اعتبار: </strong>
                    {{ (item.deducted_amount ?? 0).toLocaleString() }}
                    تومان
                  </div>
                  <div>
                    <strong>تاریخ تماس: </strong>
                    {{ item.created_at_fa.split(" ")[0] }}
                  </div>
                  <div>
                    <strong> زمان تماس: </strong>
                    {{ item.created_at_fa.split(" ")[1] }}
                  </div>
                  <div>
                    <strong> امتیاز : </strong>
                    {{ item.poll_score }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <slot name="action" :call="item.raw" />
                  <v-btn v-if="item.recorded" :href="`/api/calls/${item.id}/download`" density="compact" elevation="0"
                    prepend-icon="mdi-download" color="grey-lighten-2">
                    دانلود تماس ضبط شده
                  </v-btn>
                  <v-btn v-if="item.recorded" @click="speechText(item)" density="compact" elevation="0"
                    prepend-icon="mdi-download" color="grey-lighten-2" class="ms-1">
                    استخراج متن (هوش مصنوعی)
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </td>
        </tr>
      </template>
    </v-data-table-server>
    <div class="my-2">
      <v-btn @click="downloadCallsList">دانلود اکسل</v-btn>
    </div>
    <call-speech-text @close="selectedCall = null" v-if="selectedCall" :call="selectedCall" />
  </v-container>
</template>
<script>
import { useAuthStore } from "@/stores/auth";
import CallsReportFilter from "./CallsReportFilter.vue";
import CallSpeechText from "./CallSpeechText.vue";

export default {
  name: "CallsReport",
  components: { CallsReportFilter, CallSpeechText },
  props: {
    callBackOption: { type: Boolean },
    hiddenFilterItems: { type: Array, default: [] },
    fixedFilterData: { type: Object, default: {} },
  },
  data() {
    return {
      expanded: [],
      headers: [
        {
          align: "start",
          key: "disposition",
        },
        {
          align: "start",
          sortable: false,
          key: "category.name",
          title: "دسته بندی",
        },
        {
          align: "start",
          sortable: false,
          key: "user.name",
          title: "مراجع",
        },
        {
          key: "advisor.name",
          title: "مشاور",
          sortable: false,
        },
        {
          key: "billsec",
          title: "مدت",
        },
        {
          align: "center",
          key: "created_at",
          title: "تاریخ و ساعت",
        },
        { key: "actions", title: "", sortable: false },
      ],
      calls: [],
      selectedCall: null,
      loading: false,
      callsList: {},
      totalItems: 0,
      filterFormData: {
        date_from: null,
        date_to: null,
        disposition: null,
        user_id: null,
        advisor_id: null,
      },
      dataTableOptions: {},
      isMounted: false,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.authenticatedUser;
    },
    filterData() {
      return { ...this.filterFormData, ...this.fixedFilterData };
    },
  },
  methods: {
    async speechText(call) {
      if (this.selectedCall != null) this.selectedCall = null;
      else this.selectedCall = call;
    },
    async getCallsList({ page, itemsPerPage, sortBy }) {
      this.dataTableOptions = { page, itemsPerPage, sortBy };
      this.loading = true;
      let sort = null;
      if (sortBy.length) {
        sort = {
          key: sortBy[0].key,
          order: sortBy[0].order,
        };
      }

      const { data } = await axios.get("/api/calls/list", {
        params: {
          page,
          per_page: itemsPerPage,
          sort,
          filter: this.filterData,
        },
      });
      // console.log(data.meta);
      this.callsList = data.data;
      this.totalItems = data.meta?.total ?? 0;

      this.calls = data.data;
      this.loading = false;
    },
    async downloadCallsList() {
      this.loading = true;
      const { data } = await axios.get("/api/calls/list/download/excel", {
        responseType: 'blob',
        params: {
          filter: this.filterData,
        },
      }).then(response => {
        // Create a URL for the blob object
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'calls.xlsx'); // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
        .catch(error => {
          console.error('Error downloading the file:', error);
        })
        .then(() => {
          this.loading = false;
        });

    },
    async recorded(callId) {
      const res = await axios.get(`/api/calls/${callId}/download`);
    },
    getFilteredData() {
      let options = this.dataTableOptions;
      options.page = 1;
      this.getCallsList(options);
    },
    doFilter(filterData) {
      this.filterFormData = filterData;
      this.getFilteredData();
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>

<style>
.v-data-table-footer {
  direction: ltr !important;
  justify-content: center;
}
</style>