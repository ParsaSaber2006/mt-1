
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
        <v-checkbox
           
            v-model="this.data.type"
            color="indigo"
            label="نمایش به صورت باکس"
            hide-details
            @change="handleCheckboxChange"
          />
        <v-sheet    v-if="data.type" outlined color="grey-lighten-3" elevation="5" rounded="21">
          <v-text-field

          label="کلاس ستون های باکس"
          density="compact"
          
          type="text"
          class="element-editor-input"
          v-model="this.data.class_box"
          ref="colsField"
        />
        </v-sheet>
        

        
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