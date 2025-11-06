<template>
  <div>

    <v-infinite-scroll :onLoad="loadMoreAdvisors" :mode="infinitMode" class="pb-30 px-2">

      <template v-for="advisor in advisors" :key="advisor.id">
        <v-sheet class="rounded-xl mb-2 d-flex pa-5 pb-1" elevation="0" style="position: relative;">
          <span class="status-bullet" :class="isOnline(advisor) ? 'online' : 'offline'"></span>
          <v-row justify="center">
            <v-col cols="4" sm="4" md="2">
              <v-img aspect-ratio="1" :src="advisor.img_url" cover class="rounded-circle border" />
            </v-col>
            <v-col cols="12" sm="8" md="10">
              <v-row class="text-center text-md-right">
                <v-col>
                  <h3 class="text-h6 ">
                    <small>{{ advisor.title }}</small>&nbsp;
                    <strong>{{ advisor.name }}</strong>
                  </h3>
                  <h6 class="text-subtitle-1 text-grey-darken-2">
                    {{ advisor.description }}
                  </h6>

                  <div class="mt-2">
                    <v-chip color="grey-darken-1" class="me-1 mb-1" v-for="tag in advisor.subcategories" :key="tag"
                      density="compact">{{ tag }}</v-chip>
                  </div>
                </v-col>



              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn color="primary" rounded block variant="outlined" :to="{
                    name: 'advisor.show',
                    params: { advisorId: +advisor.id, advisorName: advisor.name, categoryId: category_id },
                  }">شروع مشاوره</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-grey text-center">
                    <span style="font-size: 10px; line-height: 10px">
                      مشاوره آنلاین: {{ advisor.advises_count }} | میانگین
                      امتیاز:
                      {{ advisor.score_avg }}
                      <v-rating disabled :length="5" :model-value="advisor.score_avg" size="x-small" density="compact"
                        color="grey" active-color="yellow-darken-1" class="ms-1" />
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </template>
      <template v-slot:loading>
        <v-row justify="center" class="">
          <v-col cols="12">
            <v-skeleton-loader v-if="loading" type="card, card, card" />
          </v-col>
        </v-row>
      </template>
      <template v-slot:empty> </template>
    </v-infinite-scroll>
  </div>
</template>

<script>
import { useAdvisorsStore } from "@/store/advisors";
import persianDate from "persian-date";

export default {
  name: "AdvisorsList",
  components: {},
  props: ["category_id", "filter"],
  computed: {
    infinitMode() {
      return this.page > 2 ? "intersect" : "intersect";
    },
  },
  data: () => {
    return {
      selected_advisor: -1,
      categories: {},
      nowHour: 0,
      advisors: [],
      loading: false,
      page: 1,
      last_page: null,
    };
  },
  methods: {
    isOnline(advisor) {
      let nowHour = new Date().getHours();
      let dayOfWeek = new persianDate().day() - 1;
      try {
        if (advisor.schedule[dayOfWeek].includes(nowHour)) return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getAdvisors() {
      this.loading = true;
      const { data } = await axios.get("/api/advisors", {
        params: {
          category_id: this.category_id,
          ...this.filter,
          page: this.page,
        },
      });
      this.advisors.push(...data.data);
      this.last_page = data.meta.last_page;
      this.loading = false;
    },
    doFilter() {
      this.advisors = [];
      this.page = 1;
      this.last_page = null;
      this.getAdvisors();
    },
    async loadMoreAdvisors({ done }) {
      this.page++;

      if (this.last_page && this.page > this.last_page) {
        done("empty");
        return;
      }

      await this.getAdvisors();
      done("ok");
    },
  },
  mounted() {
    this.getAdvisors();
  },
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid #ddd;
}

.status-bullet {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>