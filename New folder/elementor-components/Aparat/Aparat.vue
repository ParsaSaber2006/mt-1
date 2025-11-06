<script>
export default {
  props: ["data"],
  data(){
    return {
      videoUrl:''
    };
  },
  created() {this.extractVideoId(); }
  ,
  watch: {
    'data.text': 'extractVideoId'
  },
methods: {
    extractVideoId() {if (this.data.text) {
      const parts = this.data.text.split('/');
      this.videoUrl = parts[parts.length - 1];
    }
    }
  }
};
</script>

<template>

  <div class="h_iframe-aparat_embed_frame">
          <span style="display: block;padding-top: 57%">
          </span>
         
          <iframe
              :src="`https://www.aparat.com/video/video/embed/videohash/${videoUrl}/vt/frame?titleShow=${data.title}&muted=${data.mute}&autoplay=${data.autoplay}`"
              :allowFullScreen="data.fullscreen"
              :webkitallowfullscreen="data.fullscreen"
              :mozallowfullscreen="data.fullscreen">


          </iframe>
        </div>

        
</template>

<style scoped>
 
  .h_iframe-aparat_embed_frame{position:relative;}
  .h_iframe-aparat_embed_frame .ratio{display:block;width:100%;height:auto;}
  .h_iframe-aparat_embed_frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;}
  </style>