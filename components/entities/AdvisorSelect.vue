<template >
  <v-autocomplete
    v-model="selectedAdvisor"
    v-model:search="search"
    :loading="loading"
    :items="items"
    item-title="name"
    item-value="id"
    hide-no-data
    hide-details
    :label="label"
    clearable
    @click:clear="items = advisors"
  ></v-autocomplete>
</template>

<script >

import { useAdvisorsStore } from "@/store/advisors";

export default {
  name: "AdvisorSelect",
  props: ["modelValue", "label"],
  emits: ["update:modelValue"],
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      selectedAdvisor: null,
    };
  },
  computed: {
    advisorsStore() {
      return useAdvisorsStore();
    },
    advisors() {
      return this.advisorsStore.advisors;
    },
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    selectedAdvisor(val) {
      this.$emit("update:modelValue", val);
    },
  },
  methods: {
    querySelections(q) {
      this.loading = true;
      // Simulated ajax query
      this.items = this.advisors.filter((item) => {
        return (item || "").name.indexOf(q || "") > -1;
      });
      this.loading = false;
    },
  },
  mounted() {
    this.items = this.advisors || [];
  },
};
</script>
