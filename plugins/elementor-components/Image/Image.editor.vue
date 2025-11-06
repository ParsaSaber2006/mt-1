<template>
  <div>

    <div class="element-control-field">
    <v-container>
<v-row>
    <v-col cols="12">
      <label for="image_url">Image Url</label>
      <input
        id="image_url"
        type="text"
        class="element-editor-input"
        v-model="data.image_url"
        readonly
      />
      <v-btn @click="showMediaBrowser = true">browse</v-btn>
      <media-browser v-model="showMediaBrowser" @select="mediaSelected" />
    </v-col>
    <v-col cols="12">
      <v-text-field type="text" label="پیوند " density="comapct" v-model="data.link"   variant="outlined" />
    </v-col>
    </v-row>
    </v-container>  
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data: () => {
    return {
      showMediaBrowser: false,
    };
  },
  methods: {
    mediaSelected(url) {
      this.data.image_url = url;
    },
  },
  created() {},
};
</script>
