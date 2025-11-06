
<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="border border-md">
          
          <label for="Description">باکس</label>
          <v-text-field
            density="compact"
            v-model="current_link.card_class"
            label="کلاس "
          />
        
        </div>
        <br>
        <div class="border border-md">
          
          <v-text-field
            density="compact"
            v-model="current_link.title"
            label="عنوان"
            
          />
  
          <v-text-field
            density="compact"
            v-model="current_link.title_class"
            label="کلاس "
          />
        
        </div>
        <br>
        <div class="border border-md">

          <v-text-field
            density="compact"
            v-model="current_link.image_url"
            readonly
            label="عکس"
          >
            <template v-slot:append-inner>
              <v-btn
                variant="flat"
                prepend-icon="mdi-file"
                @click="showMediaBrowser = true"
                >تصاویر</v-btn
              >
            </template>

          </v-text-field>
          <v-text-field
            density="compact"
            v-model="current_link.image_class"
            label="کلاس "
          />
        </div>
        <media-browser v-model="showMediaBrowser" @select="mediaSelected" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" class="me-2"  @click="save">ذخیره</v-btn>
        <v-btn color="warning" @click="$emit('cancel')">انصراف</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  props: ["link","editingMode"],
  data() {
    return {
      showMediaBrowser: false,
      current_edit:false,
      current_link: {
        image_url: "",
        title: "",
        card_class:"",
        title_class:"",
        image_class:"",
       
      },
    
    };
  },
  methods: {
    save() {
      if(this.editingMode){
        this.$emit("update", this.current_link);
      }else{
        this.$emit("save", this.current_link);
      }
      
      // this.current_link = {};
      // this.$emit("update", this.current_link); // ارسال اطلاعات ویرایش شده به صفحه اول
      // this.current_link = {};
    },
    mediaSelected(url) {
      this.current_link.image_url = url;
    },
  },
  computed: {},
  mounted() {   
      this.current_link = this.link ;
      this.current_edit =this.editingMode;
  },
};
</script>

<style scoped>
</style>