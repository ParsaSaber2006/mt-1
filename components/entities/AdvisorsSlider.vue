<template>
  <div>
    <div v-if="advisors.length == 0" class="text-center">
      در حال فراخوانی ...
    </div>
    <div v-if="!categoryId">دسته بندی انتخاب نشده است</div>
    <div v-else>
      <v-slide-group ref="slider" direction="horizontal" v-if="this.size == 'large'" v-model="slider" center-active
      class="justify-center">
      <template v-slot:prev="{ select, next, prev }">
        <v-btn @click.prevent="slidePrev" class="px-0 py-10" size="large" variant="text">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
      <template v-slot:next="{ select, next, prev }">
        <v-btn @click.prevent="slideNext" class="px-0 py-10" size="large" variant="text">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <v-slide-group-item v-for="advisor in advisors" :key="advisor.id" v-slot="{ isSelected, toggle, selectedClass }">
        <v-sheet min-width="250" style="position: relative" class="ma-2 pa-3 rounded-xl " :class="{
          [selected_advisor_container_class]: isSelected,
          [advisor_container_class]: advisor_container_class,
        }">
          <span v-if="show_online_status" class="status-bullet"
            :class="isOnline(advisor) ? 'online' : 'offline'"></span>
          <v-row justify="center">
            <v-col cols="6" v-if="show_image">
              <v-img aspect-ratio="1" :src="advisor.img_url" cover class="rounded-circle border" />
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col>
                  <h3 class="text-h6">
                    <small class="ms-3" v-if="show_title">{{ advisor.title }} &nbsp;</small>
                    <strong>{{ advisor.name }}</strong>
                    <div class="text-subtitle-1 ms-3" v-if="show_job_title">
                      {{ advisor.job_title }}
                    </div>
                  </h3>

                  <div class="mt-2">
                    <v-chip color="grey-lighten-1" class="me-1" v-for="tag in advisor.tags" :key="tag"
                      density="compact">{{
                        tag }}</v-chip>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn color="primary" rounded block :variant="isSelected ? 'elevated' : 'tonal'" :to="{
                    name: 'advisor.show',
                    params: { advisorId: +advisor.id, categoryId: categoryId ?? 1, advisorName: advisor.name.slugify() },
                  }">شروع مشاوره</v-btn>
                </v-col>
              </v-row>
              <v-row v-if="show_stars">
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
      </v-slide-group-item>
    </v-slide-group>

    <v-slide-group v-if="this.size == 'small'" v-model="slider" :center-active="true" class="justify-center">
      <template v-slot:prev="{ select, next, prev }">
        <v-btn @click.prevent="slidePrev" class="px-0 py-10" size="large" variant="text">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
      <template v-slot:next="{ select, next, prev }">
        <v-btn @click.prevent="slideNext" class="px-0 py-10" size="large" variant="text">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <v-slide-group-item v-for="advisor in advisors" :key="advisor.id" v-slot="{ isSelected, toggle, selectedClass }">
        <v-sheet min-width="250" style="position: relative" class="ma-2 pa-3 rounded-xl" :class="{
          [selected_advisor_container_class]: isSelected,
          [advisor_container_class]: advisor_container_class,
        }">
          <span v-if="show_online_status" class="status-bullet"
            :class="isOnline(advisor) ? 'online' : 'offline'"></span>
          <v-row justify="center">
            <v-col cols="3" v-if="show_image">
              <v-img aspect-ratio="1" :src="advisor.img_url" cover class="rounded-circle border" />
            </v-col>
            <v-col cols="9">
              <v-row>
                <v-col>
                  <h3 class="text-h6">
                    <small class="ms-1" v-if="show_title">
                      {{ advisor.title }}<br />
                    </small>
                    <strong>{{ advisor.name }}</strong>
                    <div class="text-subtitle-1" v-if="show_job_title">
                      {{ advisor.job_title }}
                    </div>
                  </h3>

                  <div class="mt-2">
                    <v-chip color="grey-lighten-1" class="me-1" v-for="tag in advisor.tags" :key="tag"
                      density="compact">{{
                        tag }}</v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col class="text-center">
                  <v-btn color="primary" rounded block :variant="isSelected ? 'elevated' : 'tonal'" :to="{
                   name: 'advisor.show',
                    params: { advisorId: +advisor.id, categoryId: categoryId ?? 1, advisorName: advisor.name },
                  }">شروع مشاوره</v-btn>
                </v-col>
              </v-row>
              <v-row class="py-0 my-0" v-if="show_stars">
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
      </v-slide-group-item>
    </v-slide-group>
    </div>
  </div>
</template>

<script>
import { useAdvisorsStore } from "@/store/advisors";
import persianDate from "persian-date";

export default {
  name: "AdvisorsList",
  components: {},
  props: [
    "loading",
    "advisors",
    "categoryId",
    "autoplay",
    "speed",
    "size",
    "show_title",
    "show_job_title",
    "show_stars",
    "show_image",
    "show_online_status",
    "advisor_container_class",
    "selected_advisor_container_class"
  ],
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
      loading: false,
      page: 1,
      last_page: null,
      slider: 0,
      interval: null,
    };
  },
  methods: {
    startSliding() {
      this.interval = setInterval(() => {
        this.slideNext(true);
      }, this.speed * 1000);
    },
    stopSliding() {
      clearInterval(this.interval);
    },
    async slideNext(loop = false) {
      setTimeout(() => {
        this.slider++;
        if (this.slider > this.advisors.length - 1) {
          if (loop) this.slider = 0;
          else this.slider--;
        }
      }, 1);
    },
    slidePrev() {
      setTimeout(() => {
        this.slider--;
        if (this.slider < 0) {
          this.slider = 0;
        }
      }, 1);
    },
    isOnline(advisor) {
      let nowHour = new Date().getHours();
      let dayOfWeek = new persianDate().day() - 1;
      try {
        if (advisor.schedule[dayOfWeek].includes(nowHour)) return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    speed(newVal) {
      this.stopSliding();
      this.startSliding();
    },
    autoplay(newVal) {
      if (newVal) this.startSliding();
      else this.stopSliding();
    },
  },
  mounted() {
    if (this.autoplay) {
      this.startSliding();
    }
  },
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid #ddd;
}

.status-bullet {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>