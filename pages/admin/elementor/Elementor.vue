<template>
  <div>
    <builder :contents="elements" @save="save" :saving="loading" />
  </div>
</template>

<script>
export default {
  data: () => {
    return { loading: false, elements: [] };
  },
  methods: {
    async save(contents) {
      this.loading = true;
      try {
        const { data } = await axios.post("/api/elementor", { contents });
        emitter.emit("notif");
      } catch {}
      this.loading = false;
    },
    async getElements() {
      this.loading = true;
      const { data } = await axios.get("/api/elementor");
      console.log(data)
      this.elements = data.contents;
      this.loading = false;
    },
  },
  mounted() {
    this.getElements();
  },
};
</script>