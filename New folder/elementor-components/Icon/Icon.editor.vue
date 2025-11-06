<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field type="text" label="آیکون" density="comapct" v-model="data.icon"   variant="outlined" />
      </v-col>
       <v-col cols="12">
        <v-text-field type="text" label="رنگ" density="comapct" v-model="data.color"   variant="outlined" />
      </v-col>
       <v-col cols="12">
        <v-text-field type="number" label="اندازه" density="comapct" v-model="data.size"   variant="outlined" />
      </v-col>
       <v-col cols="12">
        <v-text-field type="text" label="پیوند " density="comapct" v-model="data.link"   variant="outlined" />
      </v-col>
     
    </v-row>
   
  </v-container>
</template>

<script>
export default {
  props: ["data"],
  data: () => {
    return {
    };
  },
  methods: {
  },
  created() { },
};
</script>
