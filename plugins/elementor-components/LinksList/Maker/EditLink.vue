
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          density="compact"
          v-model="current_link.title"
          label="Title"
        />
        <v-text-field
          density="compact"
          v-model="current_link.url"
          label="Url"
        />
        <v-text-field
          density="compact"
          v-model="current_link.description"
          label="Description"
        />
        <v-text-field
          density="compact"
          v-model="current_link.image_url"
          readonly
          label="image"
        >
          <template v-slot:append-inner>
            <v-btn
              variant="flat"
              prepend-icon="mdi-file"
              @click="showMediaBrowser = true"
              >تصاویر</v-btn
            >
          </template>
        </v-text-field>
        <media-browser v-model="showMediaBrowser" @select="mediaSelected" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" class="me-2" @click="save">ذخیره</v-btn>
        <v-btn color="warning" @click="$emit('cancel')">انصراف</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  props: ["link"],
  data() {
    return {
      showMediaBrowser: false,
      current_link: {
        url: "",
        image_url: "",
        icon: "",
        title: "",
        description: "",
      },
    };
  },
  methods: {
    save() {
      this.$emit("save", this.current_link);
      this.current_link = {};
    },
    mediaSelected(url) {
      this.current_link.image_url = url;
    },
  },
  computed: {},
  mounted() {
    this.current_link = this.link;
  },
};
</script>

<style scoped>
</style>