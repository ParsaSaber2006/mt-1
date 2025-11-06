<script>
export default {
  props: ["data"],
};
</script>

<template>
  <v-container class="">
    <v-row>
      <v-col cols="12">
     
        <label for="Description">عرض</label>
        <input type="text" v-model="data.thickness" />
        <br>
        <label for="Description">رنگ</label>
        <input type="text" v-model="data.color" />
      </v-col>
    </v-row>
  </v-container>
</template>
