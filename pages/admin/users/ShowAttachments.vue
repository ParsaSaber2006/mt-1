<template>
  <v-container>
    <v-row class="">
      <v-col
        v-for="attachment in attachments"
        cols="12"
        sm="3"
        :key="attachment"
      >
        {{ attachment.type }}
        <v-img :src="attachment.url"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Transactions from "./Transactions.vue";
import Summary from "./Summary.vue";
import Edit from "./Edit.vue";
export default {
  data() {
    return {
      loading: false,
      attachments: [],
    };
  },
  props: ["user_id"],
  computed: {},
  methods: {
    async fetchAttachments() {
      this.loading = true;
      const { data } = await axios.get(
        `/api/users/${this.user_id}/attachments`
      );
      this.attachments = data.data;
      this.loading = false;
    },
  },
  mounted() {
    this.fetchAttachments();
  },
};
</script>