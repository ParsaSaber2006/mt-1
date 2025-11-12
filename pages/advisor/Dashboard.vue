<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            {{ auth.user.online }}
            <v-switch
              :label="' وضعیت مشاور:  ' + (advisor_online ? 'آنلاین' : 'آفلاین')"
              color="success"
              :value="auth.user.online"
              :disabled="loading"
              :loading="loading"
              hide-details
              @change="onlineChanged"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import {useAuthStore} from "@/stores/auth";

export default {
  name: "advisor-dashboard",
  data: () => {
    return {
        loading: false,
        advisor_online: false,
    };
  },
  computed:{
    auth(){
      return useAuthStore();
    }
  },
  methods: { 
    async onlineChanged(){
      this.loading = true;
      try{
        
      const {data} = await axios.put(`/api/advisors/${this.auth.user.id}/toggleOnline`)
      }
      catch(err){

      }
      this.loading = false; 
    }
  },
  mounted(){
    this.advisor_online = this.auth.user.online;
  }
};
</script>
