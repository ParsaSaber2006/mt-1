<script>
export default {
  props: ["data"],
};
</script>

<template>
  <v-container class="">
    <v-row>
      <v-col cols="12">
        <v-text-field
          density="compact"
          id="title"
          type="text"
          class="element-editor-input"
          v-model="this.data.title"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
