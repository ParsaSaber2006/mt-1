<template>
  <v-container class="home">
    <v-row>
      <v-col>
        <vueper-slides rtl :autoplay="data.autoplay" :duration="data.duration" :transition-speed="data.transition_speed" 
          :fixed-height="data.height + 'px'" :visible-slides="+data.slides_count.above" slide-multiple
          :gap="2" class="no-shadow" bullets-outside :breakpoints="{
            600: { visibleSlides: data.slides_count.mobile, slideMultiple: data.slides_count.mobile },
            1000: { visibleSlides: data.slides_count.tablet, slideMultiple: data.slides_count.tablet },
            1600: { visibleSlides: data.slides_count.desktop, slideMultiple: data.slides_count.desktop },
          }">
          <vueper-slide v-for="(advisor, i) in advisors" :key="i">
            <template #content>
              <div v-if="advisors.length == 0" class="text-center">
                در حال فراخوانی ...
              </div>
              <div v-if="!data.category_id">دسته بندی انتخاب نشده است</div>
              <div v-else class="h-100">
                <v-sheet style="position: relative" class="pa-5 rounded-xl h-100 " :class="{
                  [data.advisor_container_class]: data.advisor_container_class,
                }">
                  <span v-if="data.show_online_status" class="status-bullet"
                    :class="isOnline(advisor) ? 'online' : 'offline'"></span>
                  <v-row justify="center">
                    <v-col cols="6" v-if="data.show_image">
                      <v-img aspect-ratio="1" :src="advisor.img_url" cover class="rounded-circle border" />
                    </v-col>
                    <v-col cols="12">
                      <v-row>
                        <v-col>
                          <h3 class="text-h6">
                            <small class="ms-3" v-if="data.show_title">{{ advisor.title }} &nbsp;</small>
                            <strong>{{ advisor.name }}</strong>
                            <div class="text-subtitle-1 ms-3" v-if="data.show_job_title">
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
                          <v-btn color="primary" rounded block variant="tonal" :to="{
                            name: 'advisor.show',
                            params: { advisorId: +advisor.id, categoryId: data.category_id ?? 1, advisorName: advisor.name.slugify() },
                          }">شروع مشاوره</v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="data.show_stars">
                        <v-col>
                          <div class="text-grey text-center">
                            <span style="font-size: 10px; line-height: 10px">
                              مشاوره آنلاین: {{ advisor.advises_count }} | میانگین
                              امتیاز:
                              {{ advisor.score_avg }}
                              <v-rating disabled :length="5" :model-value="advisor.score_avg" size="x-small"
                                density="compact" color="grey" active-color="yellow-darken-1" class="ms-1" />
                            </span>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-sheet>
              </div>
            </template>
          </vueper-slide>
        </vueper-slides>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import persianDate from "persian-date";
import { markRaw } from "vue";
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { da } from "vuetify/locale";


export default {
  props: ["data"],
  components: { VueperSlides: markRaw(VueperSlides), VueperSlide: markRaw(VueperSlide) },
  data() {
    return {
      showCategoriesList: false,
      advisors: [],
      onlyOnline: false,
    };
  },
  watch: {
    "data.category_id": {
      deep: true,
      handler(newVal, oldVal) {
        this.getAdvisors();
      },
    },
    "data.count": {
      deep: true,
      handler(newVal, oldVal) {
        this.getAdvisors();
      },
    },
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
      const data = await axios.get("/api/advisors", {
        params: {
          category_id: this.data.category_id,
          per_page: this.data.count,
        },
      });
      this.advisors = data.data.data;
    },
  },
  created() {
    this.getAdvisors();
    this.onlyOnline = this.data.online;
  },
};
</script>
<style scoped></style>