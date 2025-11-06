
<template>
  <card>
    <edit-stepper 
  v-if="showEditForm" 
  :link="editableLink" 
  :editing-mode="editingMode"
  @update="updateLink" 
  @save="saveLink" 
  @cancel="showEditForm = false"
></edit-stepper>
{{  }}
    <v-list border rounded class="pa-1">

      <v-list-item v-if="!linkss || linkss.length == 0">
        <v-list-item-title class="text-center">هیچ مرحله ای افزوده نشده است.</v-list-item-title>
      </v-list-item>
      <v-list-item class="pa-2" v-for="(link, i) in linkss" :key="link" lines="two" :prepend-avatar="link.image_url">
        <template v-slot:append>
          <v-btn color="grey-lighten-1" icon="mdi-chevron-left" variant="text" @click="showEditFormDialog(link)"></v-btn>
          <v-btn color="grey-lighten-1" icon="mdi-close" variant="text" @click="removeLink(i)"></v-btn>
        </template>
        <v-list-item-title>
          <strong>{{ link.title }}</strong>
        </v-list-item-title>
        
      </v-list-item>
      <v-list-item class="text-center">
        <v-btn prepend-icon="mdi-plus" class="my-3" @click="showAddFormDialog">ایجاد مرحله جدید</v-btn>
      </v-list-item>
    </v-list>
  </card>
</template>


<script>
import EditStepper from "./EditStepper.vue";
export default {
  components: { EditStepper },
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      dialog: true,
      editableLink: {},
      editingMode:false,
      showEditForm: false,
      linkss: [],
    };
  },
    methods: {
    showEditFormDialog(link) {
      (this.editableLink = link),(this.editingMode=true), (this.showEditForm = true);
    },
    showAddFormDialog() {
      (this.editableLink = {}), (this.showEditForm = true);
    },
    saveLink(link) {
      this.linkss.push(link);
      this.showEditForm = false;
    },
    removeLink(index) {
      this.linkss.splice(index, 1);
    },
    // save() {
    //   this.$emit("update:modelValue", this.linkss);
    //   this.$emit("close");
    // },
    save() {
    this.$emit("update", this.current_link); // ارسال اطلاعات ویرایش شده به صفحه اول
    this.current_link = {}; // پاک کردن اطلاعات ورودی‌ها
  },

    updateLink(updatedLink) {
     
    const index = this.linkss.findIndex((link) => link === this.editableLink);
    
    if (index !== -1) {
      // this.$set(this.linkss, index, updatedLink);
      this.linkss[index] = updatedLink;
      this.showEditForm = false;
    }
   
  },
  },
  computed: {},
  mounted() {
    this.linkss = this.modelValue;
  },
};
</script>

<style scoped></style>