<template >
  <div>
    <v-row>
      <v-col>
        <card :loading="loading" title="بارگذاری مدارک">
          <v-card-text>
            <v-row>
              <v-col cols="8"> </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="8" sm="2" order="2">
                <v-img
                  :src="image_url"
                  cover
                  class="pa-5 border rounded-lg"
                  :aspect-ratio="1"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="8" md="8" order="3">
                <v-file-input
                  @update:modelValue="imageSelected"
                  label="اینجا کلیک کنید"
                  density="compact"
                  variant="outlined"
                  rounded
                >
                </v-file-input>

                <br />
                <v-select
                  v-model="attachment_type"
                  :items="attachment_types"
                  label="نوع سند"
                  density="compact"
                  rounded
                  variant="outlined"
                  item-value="type"
                  item-title="title"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="left">
                <v-btn
                  @click="upload"
                  :loading="loading"
                  color="primary"
                  rounded
                  :disabled="!file"
                  >ثبت</v-btn
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <div>
                  تصاویر بارگذاری شده:
                </div>
                <show-attachments
                  ref="showAttachments"
                  :user_id="user.id"
                ></show-attachments>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class=""> </v-card-actions>
        </card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import ShowAttachments from "./ShowAttachments.vue";

export default {
  name: "edit-advisor",
  components: { ShowAttachments },
  props: ["user"],
  data() {
    return {
      loading: false,
      dialog: true,
      file: null,
      attachment_type: "profile_image",
      attachment_types: [
        { type: "profile_image", title: "عکس پروفایل" },
        { type: "national_card", title: "تصویر کارت ملی" },
        { type: "job_confirm_doc", title: "سند تایید شغلی" },
      ],
      image_url: null,
      image_selected: false,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    imageSelected(file) {
      this.image_url = URL.createObjectURL(file);
      this.file = file;
    },
    async upload() {
      this.loading = true;
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("type", this.attachment_type);
      axios
        .post(`/api/users/${this.user.id}/attachments`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.loading = false;
          emitter.emit("notif");
        })
        .catch((errr) => {
          this.loading = false;
          emitter.emit("notif", { type: "error", text: "مشکلی پیش آمده است" });
        })
        .then(() => {
          this.$refs.showAttachments.fetchAttachments();
        });
    },
  },
  mounted() {},
};
</script>