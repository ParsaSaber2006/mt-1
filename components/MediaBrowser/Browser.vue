<template>
    <div>
        <v-row class="row">
            <v-col v-for="(m) in medias" class="pa-1" :key="m" cols="4" sm="2">
                <media :media="m" @select="select"></media>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import Media from "./Media.vue";

export default {
    name: "Browser",
    components: {Media},
    data: function () {
        return {
            medias: {},
        }
    },
    methods: {
        getMedias() {
            axios.get("/api/media-browser")
                .then(response => {
                    this.medias = response.data.media;
                })
        },
        getCsrf() {

        },
        select(url){
            this.$emit("select",url);
        }
    },
    mounted() {
        this.getMedias();
    }
}
</script>
