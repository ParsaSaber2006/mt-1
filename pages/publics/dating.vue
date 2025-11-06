<template>
    <v-container>
        <v-card elevation="10">
            <v-card-text>
                <v-text-field density="compact"
                    label="تاریخ اصلی"
                    v-model="date.asli"
                ></v-text-field>
                <v-text-field density="compact"
                    label="تاریخ جدید"
                    v-model="date.new"
                ></v-text-field>
                <v-text-field density="compact"
                    label="تاریخ قابل تبدیل"
                    v-model="date.entezar"
                ></v-text-field>
                <v-text-field density="compact"
                    label="نتیجه"
                    v-model="date.res"
                ></v-text-field>
                <div class="pa-5">
                    <v-btn @click="dating" :loading="loading">Calc</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>

export default {
  metaInfo() {
    return { title: "صفحه اصلی" };
  },

  data() {
    return {
      loading: false,
      date: {},
    };
  },
  methods: {
    async dating(){
      this.loading = true;
      
      try{
        const {data} = await axios.post("/api/dating",{date:this.date});
        this.date.res = data.date;
      }
      catch(err){

      }

      this.loading = false;
    }
  },
};
</script>