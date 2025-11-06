<template>
    <div>
       <div class="dropzone"></div>
    </div>
</template>
<script>
import Media from "./Media.vue";
import Dropzone from "dropzone";

export default {
    name: "Uploader",
    components: {Media},
    data: function () {
        return {
        }
    },
    methods: {
        select() {

        },
    },
    mounted() {
        let options = {
            url: "/api/media-browser",
            // addRemoveLinks: true,
            // maxFilesize: 5,
            // dictDefaultMessage: '<span class="text-center"><span class="font-lg visible-xs-block visible-sm-block visible-lg-block"><span class="font-lg"><i class="fa fa-caret-right text-danger"></i> Drop files <span class="font-xs">to upload</span></span><span>&nbsp&nbsp<h4 class="display-inline"> (Or Click)</h4></span>',
            // dictResponseError: 'Error uploading file!',
        };
        let myDropzone = new Dropzone(".dropzone",options);
        myDropzone.on("success", (file, response) => {
            // addImage(response.url, response.media_id);
        });
    }
}
</script>
