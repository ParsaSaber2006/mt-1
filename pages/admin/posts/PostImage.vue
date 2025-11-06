<template >
      <card :loading="loading">
        <template v-slot:title>
          <v-container>
            <v-row>
              <v-col class="d-flex pa-0">
                ویرایش تصویر دسته بندی
                <v-spacer />
                <v-btn
                  color="gray"
                  @click="$emit('cancel')"
                  fab
                  elevation="0"
                  icon="mdi-window-close"
                  class="ma-0 pa-0"
                  size="x-small"
                >
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <v-divider></v-divider>
          <v-row justify="center">
            <v-col cols="12"  order="2">
              <v-img
                :src="post.img_url"
                cover
                class="pa-5 border"
              ></v-img>
            </v-col>
            <v-col  order="3">
              <v-file-input
                @update:modelValue="imageSelected"
                label="اینجا کلیک کنید"
                density="compact"
                rounded
                variant="outlined"
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
                >بارگزاری</v-btn
              >
            </v-col>
          </v-row>
      </card>
</template>


<script>
import { useAuthStore } from "@/store/auth";

export default {
  name: "post-image",
  components: {},
  props: ["post"],
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
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    imageSelected(file) {
      this.post.img_url = URL.createObjectURL(file);
      this.file = file;
    },
    async upload() {
      this.loading = true;
      let formData = new FormData();
      formData.append("image", this.file);
      await axios.post(`/api/posts/${this.post.slug}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      emitter.emit("notif")
      
      this.loading = false;
      this.$emit("edited");
    },
  },
  mounted() {
  },
};
</script>