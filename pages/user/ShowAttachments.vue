<template>
  <v-container>
    <v-row class="">
      <v-col v-if="attachments.length == 0">هیچ موردی یافت نشد</v-col>
      <v-col
        v-for="(attachment, i) in attachments"
        cols="12"
        sm="3"
        :key="attachment"
      >
        <v-sheet elevation="1" class="h-100 text-center rounded-lg border">
          <v-chip class="my-2">{{
            {
              profile_image: "عکس پرسنلی",
              national_card: "کارت ملی",
              job_confirm_doc: "تصویر تاییدیه شغلی",
            }[attachment.type]
          }}</v-chip>
          <v-img :src="attachment.url"></v-img>
          <v-btn
            icon="mdi-delete"
            color="red"
            class=""
            :loading="loading"
            density="compact"
            ssize="small"
            @click="deleteMe(attachment, i)"
          ></v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: { "item0": false },
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
      this.attachments = data.data || [];
      this.loading = false;
    },
    deleteMe(attachment, i) {
      this.loading = true;
      axios
        .delete(`/api/users/${this.user_id}/attachments`, {
          data: {
            type: attachment.type,
          },
        })
        .then((res) => {
          this.fetchAttachments();
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchAttachments();
  },
};
</script>