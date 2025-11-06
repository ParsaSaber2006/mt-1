<template>
  <div>
    <breadcrumbs :items="breadcrumbs" class="bg-white rounded-pill" />
    <!-- <loading-wait :loading="loading" /> -->

    <v-container>
      <v-fade-transition leave-absolute> 
        <!-- <v-skeleton-loader v-if="loading" type="card" height="200" max-height="500" /> -->
        <v-skeleton-loader v-if="loading" type="ossein" height="1000"  />
      </v-fade-transition>
    </v-container>

    <render :contents="elements" v-if="!loading" />


  </div>
</template>

<script>
import Render from "@/plugins/vuetify-elementor/Components/Render.vue";
export default {
  props: ["page_slug"],
  data: () => {
    return {
      loading: true,
      page: {},
      elements: [],
    };
  },
  computed: {
    breadcrumbs() {
      if (!this.page.id)
        return [
          {
            title: "صفحه اصلی",
            disabled: false,
            to: "/",
          },
          {
            title: "مشاهده صفحه   ",
            disabled: false,
          },
        ];
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: this.page.title,
          disabled: true,
        },
      ];
    },
  },
  methods: {
    async getPage() {
      this.loading = true;
      const { data } = await axios.get(`/api/pages/${this.page_slug}`);
      this.page = data.data;

      this.elements = JSON.parse(this.page.content);
      this.loading = false;
    },
  },
  mounted() {
    this.getPage();
  },
};
</script>
<style scoped>
.v-skeleton-loader__card {
  height: 100%;
}
</style>