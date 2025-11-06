<script>
export default {
  props: ["data"],
  computed: {
    links() {
      return this.data.links;
    },
  },
  data(){
    return {
      currentStepIndex: 0,
    }
  },

  created() { },
};
</script>



<template>
  
  <v-stepper :items="links" v-model="currentStepIndex">
    <template  v-for="(link, index) in links" :key="index" >
        <v-card flat v-if="index === currentStepIndex-1">
          <span :class="link.title_class">{{link.title}}</span>
        <span :class="link.desc_class">
          {{ link.description }}

        </span>
        </v-card>
    </template>
  </v-stepper>
</template>


      <!-- </v-stepper-step> -->
     
     
    <!-- </v-stepper-header> -->

    <!-- <v-stepper-items >
      <v-stepper-content  v-for="(link, index) in links" :key="index">
        <div :key="index">
          <v-card  class="pa-4 red lighten-4 bg-red" v-if="index === currentStepIndex">
            <v-card-title>
              <h3>{{ link.title }}</h3>
            </v-card-title>
            <v-card-text>
              <p>{{ link.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="currentStepIndex > 0" @click="currentStepIndex = currentStepIndex - 1">Previous</v-btn>
              <v-btn v-if="currentStepIndex < links.length - 1" @click="currentStepIndex = currentStepIndex + 1">Next</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <v-divider></v-divider>
      </v-stepper-content>
    </v-stepper-items> -->
  <!-- </v-stepper>
</template> -->



<style scoped>
.v-stepper-header::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px; /* ضخامت خط */
  background-color:grey; /* رنگ خط */
  z-index: -1;
}
.circle{
  width: 50px;
  height: 50px;
  border-radius:50%;
}
@media screen and (max-width: 600px) {
  .v-stepper-header {
    display: flex;
    flex-direction: column;
    width: 100%; /* تضمین نمایش در یک خط در حالت عمودی */
  }
  
  .v-stepper-step {
    flex: 1; /* اختصاص تمام عرض صفحه به هر آیتم */
  }
  
}</style>