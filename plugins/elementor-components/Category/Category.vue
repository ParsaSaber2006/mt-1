<template>
  <div>
    <render-hook page_id="category-top" />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="4" md="4" class="px-1">
          <div style2="position: sticky; top: 80px">
            <card class="mb-2">
              <div class="">
                <v-img :src="category.img_url" class="rounded"  lazy-src="/images/placeholder.jpeg"  />
              </div>
              <h2 class="text-primary mt-2">
                {{ category.name }}
              </h2>
              <div class="mt-2">
                {{ category.short_description }}
              </div>
            </card>
            <card class="" v-if="true">
              <v-card-title> جستجو </v-card-title>
              <v-card-text>
                <v-select
                  clearable
                  label="حوزه مشاوره"
                  :items="category.tags"
                  density="compact"
                  rounded
                  variant="outlined"
                  multiple
                  v-model="filter.tags"
                />
                <v-select
                  v-if="false"
                  label="شهر"
                  density="compact"
                  rounded
                  variant="outlined"
                  :items="['تهران', 'مشهد']"
                />
                <v-text-field
                  clearable
                  rounded
                  density="compact"
                  variant="outlined"
                  label="جستجو"
                  hint="نام مشاور مورد نظر خود را وارد کنید"
                  v-model="filter.search"
                />
                <v-select
                  label="مرتب سازی"
                  clearable
                  :items="[
                    {
                      title: 'بیشترین امتیاز',
                      value: 'score_avg',
                    },
                    {
                      title: 'بیشترین مشاوره',
                      value: 'advises_count',
                    },
                  ]"
                  rounded
                  item-value="value"
                  item-title="title"
                  density="compact"
                  variant="outlined"
                  v-model="filter.sort"
                />
                <v-btn
                  class=""
                  rounded
                  block
                  @click="getAdvisors"
                  color="primary"
                  >اعمال فیلتر</v-btn
                >
              </v-card-text>
            </card>
            <render-hook page_id="category-side" />
          </div>
          <!-- <h4 class="mt-2 pa-2" v-html="category.description"></h4> -->
        </v-col>
        <v-col cols="12" sm="8" md="8" class="">
          <v-row v-if="loading" justify="center" class="py-10">
            <v-col cols="4" align="center" class="py-16">
              <v-progress-linear
                color="primary"
                indeterminate
              ></v-progress-linear>
            </v-col>
          </v-row>
          <advisors-list
            ref="advisorsList"
            :category_id="category.id"
            v-if="!loading"
            :filter="filter"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  metaInfo() {
    return { title: "دسته بندی" };
  },
  name: "category",
  props: ["data"],

  data() {
    return {
      loading: false,
      category: {},
      filter: {},
    };
  },
  computed: {
    categoryId() {
      return this.data.categoryId;
    },
  },
  methods: {
    async getCategory() {
      this.loading = true;
      const { data } = await axios.get(`/api/categories/${this.categoryId}`);
      this.category = data.data;
      this.loading = false;
    },
    getAdvisors() {
      this.$refs.advisorsList.doFilter();
    },
  },
  mounted() {
    this.getCategory();
  },
};
</script>

<style scoped>
.advisor-about {
  line-height: 3rem;
}
</style>