<template>
  <v-container class="home">
    <v-row>
      <v-col>
        <AdvisorsSlider
          :advisors="advisors"
          :categoryId = "data.category_id"
          :autoplay="data.autoplay"
          :speed="data.speed"
          :size="data.size"
          :show_image="data.show_image"
          :show_title="data.show_title"
          :show_job_title="data.show_job_title"
          :show_stars="data.show_stars"
          :show_online_status="data.show_online_status"
          :advisor_container_class="data.advisor_container_class"
          :selected_advisor_container_class="data.selected_advisor_container_class"
        ></AdvisorsSlider>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AdvisorsSlider from "../../../components/entities/AdvisorsSlider.vue";

export default {
  props: ["data"],
  components: { AdvisorsSlider },
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