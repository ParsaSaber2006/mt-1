<template >
  <div >
    <v-row v-if="initLoading">
      <v-col>
        <v-sheet elevation="2" class="pa-15 text-center">
          <div>در حال فراحوانی داده ها</div>
          <v-progress-linear
            class="mt-10"
            :width="1"
            color="primary"
            indeterminate
          ></v-progress-linear>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row justify="center" v-if="!initLoading"  class="my-5">
      <v-col class="pa-10" md="12">
        <schedules-editor :advisor="advisor" v-if="advisor != null" />
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "my-schedule",
  components: {},
  props: ["advisor"],
  data() {
    return {
      loading: false,
      initLoading: false,
      advisor: null,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
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
          title: "زمان حضور",
          disabled: true,
          to: "",
        },
      ];
    },
  },
  methods: {  
    async getAdvisor() {
      let advisor_id = this.auth.user.id;
      this.loading = true;
      const { data } = await axios.get(`/api/advisors/${advisor_id}`);
      this.advisor = data.data;
      this.loading = false;
    },
  },
  async created() {
    this.getAdvisor();
  },
};
</script>