
<template>
  <card>
    <edit-panel v-if="showEditForm" :link="editableLink" @save="saveLink" @cancel="showEditForm = false"></edit-panel>
    <v-list border rounded class="pa-1">

      <v-list-item v-if="!linkss || linkss.length == 0">
        <v-list-item-title class="text-center">هیچ لینکی افزوده نشده است.</v-list-item-title>
      </v-list-item>
      <v-list-item class="pa-2" v-for="(link, i) in linkss" :key="link" lines="two" :prepend-avatar="link.image_url">
        <template v-slot:append>
          <v-btn color="grey-lighten-1" icon="mdi-chevron-left" variant="text"></v-btn>
          <v-btn color="grey-lighten-1" icon="mdi-close" variant="text" @click="removeLink(i)"></v-btn>
        </template>
        <v-list-item-title>
          <strong>{{ link.title }}</strong>
        </v-list-item-title>
        <v-list-item-subtitle v-if="false">
          <div>{{ link.description }}</div>
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item class="text-center">
        <v-btn prepend-icon="mdi-plus" class="my-3" @click="showEditFormDialog">ایجاد لینک جدید</v-btn>
      </v-list-item>
    </v-list>
  </card>
</template>


<script>
import EditPanel from "./EditPanel.vue";
export default {
  components: { EditPanel },
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      dialog: true,
      editableLink: {},
      showEditForm: false,
      linkss: [],
    };
  },
  methods: {
    showEditFormDialog() {
      (this.editableLink = {}), (this.showEditForm = true);
    },
    saveLink(link) {
      this.linkss.push(link);
      this.showEditForm = false;
    },
    removeLink(index) {
      this.linkss.splice(index, 1);
    },
    save() {
      this.$emit("update:modelValue", this.linkss);
      this.$emit("close");
    },
  },
  computed: {},
  mounted() {
    this.linkss = this.modelValue;
  },
};
</script>

<style scoped></style>