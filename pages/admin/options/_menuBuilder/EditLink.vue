
<template>
 {{ editingMode }}
  <v-container class="home">
    <v-row>
      <v-col>
        <v-text-field v-model="current_link.title" label="Title" />
        <v-text-field v-model="current_link.url" label="Url" />
        <v-text-field v-model="current_link.description" label="Description" />
        <v-text-field v-model="current_link.icon"  label="Icon" />
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
  props: ["link","editingMode"],
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
      if(!this.editingMode){
      this.$emit("save", this.current_link);
      this.current_link = {};
      }
      else{
        this.$emit("update", this.current_link);
        
      }
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