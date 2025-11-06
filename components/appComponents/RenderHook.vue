<!-- <template src="./home.html"></template> -->
<template >
  <div>
    <v-fade-transition>
      <render v-if="!loading" :contents="elements" />
    </v-fade-transition>
  </div>
</template>

<script>

export default {
  name: "RenderHook",
  props:['page_id'],
  data() {
    return {
      dialog: false,
      advisors: {},
      loading: false,
      elements: {},
    };
  },
  methods: {
    async getContents() {
      this.loading = true;
      const { data } = await axios.get("/api/pages/"+this.page_id);
      this.elements = JSON.parse(data.data.content);
      this.loading = false;
    },
  },
  mounted() {
    this.getContents();
  },
};
</script>