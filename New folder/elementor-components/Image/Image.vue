<script>
export default {
  props: ["data", 'class'],
  created() { },
  methods: {
    click() {
      if (this.data.link) {
        window.location = this.data.link
      }
    }
  }
};
</script>

<template>
  <a :href="data.link" v-if="data.link">
    <v-img :src="data.image_url"  :class="$props.class"  lazy-src="/images/placeholder.jpeg"  />
  </a>
  <v-img v-else :src="data.image_url" :class="$props.class"   lazy-src="/images/placeholder.jpeg" />
</template>

<style scoped></style>