<template>
  <div>
    <breadcrumbs :items="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col cols="12" sm="3" class="">
          <card class="mb-2">
            <div>
              <v-row justify="center">
                <v-col cols="8" class="text-center">
                  <v-img :src="advisor.img_url" class="rounded-circle border" aspect-ratio="1" cover></v-img>
                </v-col>
                <v-col cols="12">
                  <div>
                    <span class="text-h5">{{ advisor.name }}</span> &nbsp;
                    <div>{{ advisor.title }}</div>
                    <div>{{ advisor.job_title }}</div>
                    <div>{{ advisor.short_description }}</div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </card>

          <v-list class="rounded-xl mb-2" nav>
            <v-list-item v-for="component in componentsList" :key="component" class="rounded-xl" color="primary"
              density="compact" :active="currentComponent == component.name" @click="goTo(component.name)"
              :prepend-icon="component.icon">{{ component.title }}
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="9" class="">
          <v-fade-transition leave-absolute hide-on-leave>
            <component :is="currentComponent" :advisor="advisor" />
          </v-fade-transition>
        </v-col> </v-row></v-container>
  </div>
</template>


<script>
import { useAuthStore } from "@/store/auth";
import { useCategoriesStore } from "@/store/categories";
import Summary from "./Summary.vue";
import Edit from "./Edit.vue";
import ProfileImage from "./ProfileImage.vue";
import Schedules from "./Schedules.vue";
import WordpressSync from "./WordpressSync.vue";

export default {
  name: "show-advisor",
  components: { Summary, Edit, ProfileImage, Schedules, WordpressSync },
  props: ["advisor_id"],
  data() {
    return {
      loading: false,
      dialog: true,
      advisor: {},
      currentComponent: "Summary",
      componentsList: [
        {
          name: 'Summary',
          title: 'اطلاعات',
          icon: 'mdi-chart-line-stacked',
        },
        {
          name: 'ProfileImage',
          title: 'عکس کاربری',
          icon: 'mdi-account-box',
        },
        {
          name: 'Schedules',
          title: 'زمان بندی حضور',
          icon: 'mdi-account-convert',
        },
        {
          name: 'Edit',
          title: 'ویرایش',
          icon: 'mdi-account-edit',
        },
        {
          name: 'WordpressSync',
          title: 'همگام سازی وردپرس',
          icon: 'mdi-account-edit',
        }
      ],
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
          to: "/",
        },
        {
          title: "ناحیه کاربری",
          to: { name: "userarea" },
        },
        {
          title: "مدیریت مشاورین",
          disabled: false,
          to: { name: "admin.advisors" },
        },
      ];
    },
  },
  methods: {
    goTo(component) {
      this.currentComponent = component;
    },
    cancel() {
      this.$emit("cancel");
    },
    getAnalyze() {
      axios
        .get(`/api/advisors/${this.advisor.id}/calls/analyze`)
        .then((res) => {
          this.callsAnalyze = res.data.data;
        });
    },
    readableTime(seconds) {
      var num = seconds / 60;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return `${rhours}:${rminutes}`;
    },
    async getAdvisor() {
      this.loading = true;
      const { data } = await axios.get(`/api/advisors/${this.advisor_id}`);
      this.advisor = data.data;
      this.loading = false;
    },
  },
  async mounted() {
    this.getAdvisor();
  },
};
</script>