<template >
  <v-container>
    <v-row>
      <v-col>
        <card title="تماس ها">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <calls-report  />
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
  components: {  },

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
      loading: false,
      callsList: {},
      totalItems: 0,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return this.auth.authenticatedUser;
    },
  },
  methods: {
    async getCallsList({ page, itemsPerPage, sortBy }) {
      this.loading = true;

      let sort = null;
      if (sortBy.length) {
        sort = {
          key: sortBy[0].key,
          order: sortBy[0].order,
        };
      }


      const { data } = await axios.get("/api/calls/list", {
        params: { page, per_page: itemsPerPage, sort },
      });
      console.log("fdsfsd");
      this.callsList = data.data;
      this.totalItems = data.meta?.total ?? 0;
      this.calls = data.data;
      this.loading = false;
    },
    async recorded(callId) {
      const res = await axios.get(`/api/calls/${callId}/download`);
    },
  },
  mounted() {},
};
</script>

<style >
.v-data-table-footer {
  direction: ltr !important;
  justify-content: center;
}
</style>