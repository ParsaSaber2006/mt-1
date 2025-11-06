
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          label="عنوان"
          density="compact"
          id="title"
          type="text"
          class="element-editor-input"
          v-model="this.data.title"
        />
        <v-text-field
          label="توضیحات"
          density="compact"
          id="title"
          type="text"
          class="element-editor-input"
          v-model="this.data.description"
        /> 
       
        <v-text-field
          label="عنوان لینک"
          density="compact"
          id="link"
          type="text"
          class="element-editor-input"
          v-model="this.data.linkTitle"
        /> 
        
        <v-text-field
          label="کلاس باکس"
          density="compact"
          id="card"
          type="text"
          class="element-editor-input"
          v-model="this.data.classCard"
        /> 
        

        
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["data"],
  methods: {
    handleCheckboxChange() {
      if (this.data.type) {
        this.$nextTick(() => {
          this.$refs.colsField.focus();
        });
      }
      this.$emit('updateCategoriesList', this.data.type);
    },
  },
};
</script>