<script>
export default {
  props: ["data"],
  computed: {
    links() {
      return this.data.links;
    },
  },
  created() { },
};
</script>

<template>
 
<v-sheet
    class=""
    elevation="8"
    max-width="800"
  >
    <v-slide-group
      class="pa-4"
      selected-class="bg-primary"
      multiple
      show-arrows
    >
    
      <v-slide-group-item
        v-for ="(link, index) in links"
        :key="index" class=""
        v-slot="{ isSelected, toggle, selectedClass }"
        
      >
     
        <v-sheet 
        :class="link.card_class"
        max-width="350"
        class="mx-auto"
        
        @click="toggle"
        max-height="500"
        >
        <v-img
       :src=link.image_url
       height="350"
      :class="link.image_class"
    ></v-img>

    <v-card-title :class="link.title_class">
     {{link.title}}
    </v-card-title>

        </v-sheet>
      
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  
</template>

<style scoped></style>