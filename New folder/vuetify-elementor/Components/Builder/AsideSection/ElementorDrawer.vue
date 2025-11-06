<template>
  <div>
    <v-navigation-drawer
      :rail="rail"
      permanent
      :width="wide ? 600 : 300"
      rail-width="40"
      :expand-on-hover="rail"
    >
      <v-list-item prepend-icon="mdi-shape-outline" class="sticky-item">
        <template v-slot:append>
          <v-btn
            density="compact"
            variant="text"
            icon="mdi-floppy"
            @click="save"
            :loading="saving"
          ></v-btn>
          <v-btn
            density="compact"
            variant="text"
            icon="mdi-arrow-expand-horizontal"
            :active="wide"
            @click.stop="wide = !wide"
            class="ms-1"
          ></v-btn>
          <v-btn
            density="compact"
            variant="text"
            icon="mdi-pin"
            :active="!rail"
            @click.stop="rail = !rail"
            class="ms-1"
          ></v-btn>
          <v-btn
            density="compact"
            variant="text"
            icon="mdi-download"
            @click.stop="downloadJson"
            class="ms-1"
          ></v-btn>
          <v-btn
            density="compact"
            variant="text"
            icon="mdi-upload"
            @click.stop="uploadJson"
            class="ms-1"
          ></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <slot />
    </v-navigation-drawer>
    <a id="downloadAnchorElemJson" style="display: none"></a>
    <input
      type="file"
      ref="file"
      style="display: none"
      @change="readJsonFile"
    />
  </div>
</template>
<script>
export default {
  components: {},
  inject: ["saving"],
  props: ["contents"],
  data: () => {
    return {
      rail: false,
      railed: false,
      pined: true,
      wide: false,
      step: "list",
      content: "",
      rtl: true,
    };
  },
  methods: {
    save() {
      this.$emit("save");
    },
    downloadJson() {
      var obj = this.contents;

      // Convert the object to a JSON string
      var jsonString = JSON.stringify(obj, null, 2);

      // Encode the JSON string with UTF-8 encoding
      var encodedUri = encodeURIComponent(jsonString);

      // Create a Blob from the encoded URI
      var blob = new Blob([encodedUri], {
        type: "application/json;charset=utf-8",
      });

      // Create a download URL
      var url = URL.createObjectURL(blob);

      // Create a download link
      var downloadLink = document.getElementById("downloadAnchorElemJson");
      downloadLink.href = url;
      downloadLink.download = "file.json"; // Set your desired file name
      downloadLink.click();

      return;

      let storageObj = Object();
      storageObj = this.contents;
      var dataStr =
        "data:application/json;charset=utf-8," +
        encodeURI(JSON.stringify(storageObj));
      var dlAnchorElem = document.getElementById("downloadAnchorElemJson");
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "page_contents.json");
      dlAnchorElem.click();
    },
    uploadJson() {
      this.$refs.file.click();
    },
    readJsonFile() {
      let file = this.$refs.file.files[0];
      const reader = new FileReader();
      if (file.name.includes(".json")) {
        console.log(file);
        reader.onload = (res) => {
          this.content = res.target.result;
          console.log("asdasd", JSON.parse(decodeURIComponent(res.target.result)));
          this.$emit("fromFile", JSON.parse(decodeURIComponent(res.target.result)));
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsBinaryString(file);
      } else {
        console.log("check the console for file output");
        /*   reader.onload = (res) => {
          console.log(res.target.result);
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file); */
      }
    },
  },
};
</script>

<style lang="scss">
</style>