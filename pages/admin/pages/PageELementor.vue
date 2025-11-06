<template>
  <div>
    <builder v-if="!changing" :contents="elements" @save="save" :saving="loading" @fromFile="fromFile"/>
  </div>
</template>

<script>
export default {
  props: ["page_slug"],
  data: () => {
    return { loading: true, page: {}, elements: [], changing: false };
  },
  methods: {
    fromFile(content){
      this.elements = content
    },
    async save(elements) {
      this.loading = true;
      try {
        const { data } = await axios.put(
          `/api/pages/${this.page_slug}/content`,
          {
            elements,
          }
        );
        emitter.emit("notif");
      } catch {}
      this.loading = false;
    },
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