<template>
  <div>
    <div class="element-control-field">
      <v-row>
      <v-col cols="12">
     
        <label for="Description">آدرس ویدیو :</label>
        <v-text-field type="text" v-model="data.text" value="https://www.aparat.com/v/MxV5N" />
        <br>
        
        <v-checkbox label="نمایش تیتر ویدیو و آیکون های پلیر" v-model="data.title" color="orange" class="elevation-3" value="false"></v-checkbox>
        <v-checkbox label="پخش اولیه بی صدا باشد" v-model="data.mute"  color="orange" class="elevation-3" value="false" />
        <v-checkbox label="autoplayEmbedFilm" class="elevation-3" color="orange" v-model="data.autoplay" value="false" />
        <v-checkbox label="تمام صفحه" class="elevation-3" color="orange" v-model="data.fullscreen" value="true" />
      </v-col>
    </v-row>
    </div>
  </div>
  
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
