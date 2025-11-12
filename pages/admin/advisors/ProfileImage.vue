<template >
  <div>
    <v-row>
      <v-col>
        <card :loading="loading" title="ویرایش عکس مشاور">
          <v-card-text>
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
          </v-card-text>
          <v-card-actions class=""> </v-card-actions>
        </card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "edit-advisor",
  components: {},
  props: ["advisor"],
  data() {
    return {
      loading: false,
      dialog: true,
      file: null,
      image_url: null,
      image_selected: false,
    };
  },
  computed: {
    auth() {
      return useAuthStore();
    },
    breadcrumbs() {
      return [
        {
          title: "صفحه اصلی",
          disabled: false,
          to: "/",
        },
        {
          title: "مشاورین",
          disabled: false,
          to: { name: "admin.advisors" },
        },
        {
          title: "مشاور",
          disabled: false,
          to: {
            name: "admin.advisors.show",
            params: { advisor_id: this.advisor_id },
          },
        },
        {
          title: "عکس پروفایل",
          disabled: true,
          to: "",
        },
      ];
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
      await axios.post(`/api/users/${this.advisor.id}/profileImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      emitter.emit("notif");
      this.loading = false;
      this.$emit("edited");
    },
  },
  mounted() {},
};
</script>