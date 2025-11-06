<template>
    <span class="media-item h-100 d-inline-block" @click="select">
        <img :src="media.original_url" alt="" class="w-100">
    </span>
</template>
<script>
export default {
    name: "Media",
    props: ["media"],
    data: function () {
        return {
            url: ""
        }
    },
    methods: {
        select() {
            this.$emit("select", this.media.original_url)
        }
    }
}
</script>
<style lang="scss">
.media-item {
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        padding: 2px;
        //border-bottom: 3px solid #ff4747;
        background-color: #f6d3d3;
    }
}

</style>
