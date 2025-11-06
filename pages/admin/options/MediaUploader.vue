<template >
  <div>
    <v-row justify="center">
      <v-col cols="8" sm="2" order="2">
        <v-img
          :src="image_url"
          cover
          class="pa-5 border"
          style="position: relative"
          :aspect-ratio="1"
        >
          <v-btn
            density="compact"
            @click="removeMedia"
            color="red"
            v-if="image_url"
            icon="mdi-delete"
            variant="elevated"
            style="position: absolute; bottom: 4px; right: 4px"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-img>
      </v-col>
      <v-col cols="12" sm="8" md="8" order="3">
        <h5>{{ title }}</h5>
        <v-file-input
          v-model="fileInputModel"
          @update:modelValue="imageSelected"
          label="اینجا کلیک کنید"
          density="compact"
          variant="outlined"
          rounded
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col align="left">
        <v-btn
          @click="upload"
          :loading="loading"
          color="primary"
          variant="flat"
          :disabled="!file"
          >ثبت</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script >
export default {
  props: ["name", "title", "thumb_url"],
  name: "image-uploader",

  data() {
    return {
      loading: false,
      dialog: true,
      file: null,
      image_url: null,
      fileInputModel: null,
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
      formData.append("name", this.name);
      await axios.post(`/api/options/medias`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      emitter.emit("notif", { text: "بارگزاری انجام شد" });
      this.loading = false;
      this.$emit("uploaded");
    },
    async removeMedia() {
      this.loading = true;

      try {
        await axios.delete(`/api/options/medias`, {
          data: { name: this.name },
        });

        this.image_url = null;
        this.file = null;
        this.fileInputModel = null;
      } catch {}

      emitter.emit("notif", { text: "حذف شد" });
      this.loading = false;
    },
  },
  mounted() {
    this.image_url = this.thumb_url;
  },
  watch: {
    thumb_url() {
      this.image_url = this.thumb_url;
    },
  },
};
</script>